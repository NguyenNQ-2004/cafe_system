import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { useDb } from '../../data/DbContext';
import { fmtDateTime, fmtMoney, fmtNumber, getSettingNumber, pointsToMoney } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, Modal, StatCard, inputCls } from './AdminUi';

interface AdminMembershipsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminMembershipsPage: React.FC<AdminMembershipsPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact, adjustPoints } = useDb();
  const customers = db.users.filter(u => u.role === 'CUSTOMER');

  // Quy tắc lấy từ shop_settings
  const [rules, setRules] = useState({
    points_earn_unit: getSettingNumber(db, 'points_earn_unit', 1000),
    points_step: getSettingNumber(db, 'points_step', 10),
    points_step_value: getSettingNumber(db, 'points_step_value', 2000)
  });
  const [searchPhone, setSearchPhone] = useState(customers[0]?.phone ?? '');
  const [activeId, setActiveId] = useState<number | null>(customers[0]?.id ?? null);
  const [adjust, setAdjust] = useState<{ type: 'add' | 'subtract'; points: number } | null>(null);

  const active = db.users.find(u => u.id === activeId);

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    if (rules.points_earn_unit <= 0 || rules.points_step <= 0 || rules.points_step_value < 0) {
      onShowToast?.('Giá trị quy tắc không hợp lệ.');
      return;
    }
    transact(tx => {
      tx.setSetting('points_earn_unit', String(rules.points_earn_unit));
      tx.setSetting('points_step', String(rules.points_step));
      tx.setSetting('points_step_value', String(rules.points_step_value));
    });
    onShowToast?.('Đã lưu quy tắc tích điểm vào shop_settings.');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = searchPhone.replace(/\s/g, '');
    const found = customers.find(c => c.phone === phone);
    if (found) {
      setActiveId(found.id);
    } else {
      setActiveId(null);
      onShowToast?.(`Không tìm thấy khách hàng có SĐT ${phone}.`);
    }
  };

  const handleAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!active || !adjust || adjust.points <= 0) return;
    if (adjust.type === 'subtract' && adjust.points > active.total_points) {
      onShowToast?.('Không thể trừ nhiều hơn số điểm hiện có (chk_user_points).');
      return;
    }
    adjustPoints(active.id, adjust.type === 'add' ? adjust.points : -adjust.points);
    onShowToast?.(`Đã ${adjust.type === 'add' ? 'cộng' : 'trừ'} ${adjust.points} điểm cho ${active.full_name}.`);
    setAdjust(null);
  };

  // Nhật ký: tính số dư sau giao dịch theo từng khách, lùi dần từ users.total_points
  const logs = [...db.loyalty_transactions].sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : b.id - a.id));
  const running = new Map(customers.map(c => [c.id, c.total_points]));
  const logsWithBalance = logs.map(l => {
    const balanceAfter = running.get(l.customer_id) ?? 0;
    running.set(l.customer_id, balanceAfter - l.points_change);
    return { ...l, balanceAfter };
  });

  const totalPoints = customers.reduce((s, c) => s + c.total_points, 0);
  const lastOrder = active ? db.orders.filter(o => o.customer_id === active.id).sort((a, b) => (a.created_at < b.created_at ? 1 : -1))[0] : undefined;
  const spent = active ? db.orders.filter(o => o.customer_id === active.id && o.status === 'COMPLETED').reduce((s, o) => s + o.final_amount, 0) : 0;

  return (
    <AdminLayout
      route="admin-memberships"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="loyalty_transactions, users.total_points, shop_settings"
      title="Tích điểm theo số điện thoại"
      subtitle="Khách hàng được nhận diện bằng số điện thoại; điểm tích khi đơn hoàn thành và đổi điểm để giảm giá."
      stats={
        <>
          <StatCard label="Khách hàng có điểm" value={customers.filter(c => c.total_points > 0).length} />
          <StatCard label="Tổng điểm lưu hành" value={fmtNumber(totalPoints)} tone="primary" />
          <StatCard label="Giá trị quy đổi" value={fmtMoney(pointsToMoney(db, totalPoints))} />
          <StatCard label="Giao dịch điểm" value={db.loyalty_transactions.length} />
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form onSubmit={handleSaveRules} className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-3">Quy tắc tích & đổi điểm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Chi tiêu để được 1 điểm (VNĐ)" column="points_earn_unit">
              <input type="number" min={1} value={rules.points_earn_unit} onChange={e => setRules({ ...rules, points_earn_unit: Number(e.target.value) })} className={inputCls} />
            </Field>
            <Field label="Bậc đổi điểm (điểm)" column="points_step">
              <input type="number" min={1} value={rules.points_step} onChange={e => setRules({ ...rules, points_step: Number(e.target.value) })} className={inputCls} />
            </Field>
            <Field label="Giá trị mỗi bậc (VNĐ)" column="points_step_value">
              <input type="number" min={0} value={rules.points_step_value} onChange={e => setRules({ ...rules, points_step_value: Number(e.target.value) })} className={inputCls} />
            </Field>
          </div>
          <p className="text-stone-500">
            Ví dụ: đơn {fmtMoney(100000)} được tích {Math.floor(Math.floor(100000 / (rules.points_earn_unit || 1)) / (rules.points_step || 1)) * (rules.points_step || 1)} điểm;
            đổi {rules.points_step} điểm được giảm {fmtMoney(rules.points_step_value)}.
          </p>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-container shadow-xs flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">save</span>
              Lưu quy tắc
            </button>
          </div>
        </form>

        <section className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-3">Tra cứu & điều chỉnh điểm</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={searchPhone}
              onChange={e => setSearchPhone(e.target.value)}
              placeholder="Nhập số điện thoại..."
              className="flex-1 px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary text-xs font-mono"
            />
            <button type="submit" className="px-3 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800">Tra cứu</button>
          </form>
          {active && (
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3 text-xs">
              <div>
                <h3 className="font-bold text-stone-900 text-sm">{active.full_name}</h3>
                <p className="text-[11px] text-stone-500 font-mono">{active.phone} • {active.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">Điểm hiện có</span>
                  <p className="text-base font-black text-primary font-mono">{fmtNumber(active.total_points)}</p>
                  <span className="text-[10px] text-stone-500">= {fmtMoney(pointsToMoney(db, active.total_points))}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">Tổng chi tiêu</span>
                  <p className="text-base font-bold text-stone-900 font-mono">{fmtMoney(spent)}</p>
                  <span className="text-[10px] text-stone-500">{lastOrder ? `Đơn gần nhất ${fmtDateTime(lastOrder.created_at)}` : 'Chưa có đơn'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setAdjust({ type: 'add', points: 10 })} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
                  Cộng điểm
                </button>
                <button onClick={() => setAdjust({ type: 'subtract', points: 10 })} className="flex-1 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-bold">
                  Trừ điểm
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-100">
          <h2 className="font-bold text-stone-900 text-sm sm:text-base">Nhật ký tích & đổi điểm</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-bold border-b border-stone-200">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Thời gian</th>
                <th className="p-3.5">Khách hàng</th>
                <th className="p-3.5">Loại</th>
                <th className="p-3.5 text-right">Điểm biến động</th>
                <th className="p-3.5 text-right">Số dư sau</th>
                <th className="p-3.5">Đơn hàng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {logsWithBalance.map(l => {
                const c = db.users.find(u => u.id === l.customer_id);
                const order = db.orders.find(o => o.id === l.order_id);
                return (
                  <tr key={l.id} className="hover:bg-stone-50/70">
                    <td className="p-3.5 font-mono font-bold text-stone-400">#{l.id}</td>
                    <td className="p-3.5 text-stone-500 font-mono">{fmtDateTime(l.created_at)}</td>
                    <td className="p-3.5">
                      <strong className="text-stone-900 block">{c?.full_name}</strong>
                      <span className="font-mono text-stone-400">{c?.phone}</span>
                    </td>
                    <td className="p-3.5">
                      <Badge className={l.transaction_type === 'EARN' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                        {l.transaction_type === 'EARN' ? 'EARN - Tích điểm' : 'REDEEM - Đổi điểm'}
                      </Badge>
                    </td>
                    <td className={`p-3.5 text-right font-mono font-bold ${l.points_change > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {l.points_change > 0 ? `+${l.points_change}` : l.points_change}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-stone-900">{fmtNumber(l.balanceAfter)}</td>
                    <td className="p-3.5 text-stone-500">{order ? order.order_code : 'Điều chỉnh thủ công'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {adjust && active && (
        <Modal title={adjust.type === 'add' ? 'Cộng điểm thủ công' : 'Trừ điểm thủ công'} onClose={() => setAdjust(null)}>
          <form onSubmit={handleAdjust} className="space-y-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl space-y-1">
              <p>Khách hàng: <strong>{active.full_name}</strong> ({active.phone})</p>
              <p>Số dư hiện tại: <strong className="font-mono text-primary">{fmtNumber(active.total_points)} điểm</strong></p>
            </div>
            <Field label="Số điểm" column={adjust.type === 'add' ? 'EARN (points_change > 0)' : 'REDEEM (points_change < 0)'}>
              <input type="number" min={1} value={adjust.points} onChange={e => setAdjust({ ...adjust, points: Number(e.target.value) })} className={inputCls} />
            </Field>
            <FormActions onCancel={() => setAdjust(null)} submitLabel={`Xác nhận ${adjust.type === 'add' ? 'cộng' : 'trừ'} điểm`} />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
