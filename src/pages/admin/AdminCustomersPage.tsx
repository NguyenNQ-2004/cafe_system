import React, { useState } from 'react';
import { PageRoute, User } from '../../types';
import { useDb } from '../../data/DbContext';
import { USER_STATUS_LABEL, fmtDate, fmtMoney, fmtNumber, nowSql, userCode } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, Modal, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminCustomersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

const EMPTY = { full_name: '', phone: '', email: '', birthday: '', address: '', initialPoints: 0 };

export const AdminCustomersPage: React.FC<AdminCustomersPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact, adjustPoints } = useDb();
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState<typeof EMPTY | null>(null);

  const customers = db.users.filter(u => u.role === 'CUSTOMER');
  const ordersOf = (id: number) => db.orders.filter(o => o.customer_id === id);
  const spentOf = (id: number) => ordersOf(id).filter(o => o.status === 'COMPLETED').reduce((s, o) => s + o.final_amount, 0);

  const q = searchTerm.trim().toLowerCase();
  const filtered = customers.filter(
    c => c.full_name.toLowerCase().includes(q) || c.phone.includes(q) || (c.email ?? '').toLowerCase().includes(q)
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (db.users.some(u => u.phone === form.phone.trim())) {
      onShowToast?.('Số điện thoại đã tồn tại (users.phone là UNIQUE).');
      return;
    }
    const created = transact(tx =>
      tx.insert('users', {
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        password_hash: 'pending_hash',
        birthday: form.birthday || null,
        address: form.address.trim() || null,
        role: 'CUSTOMER',
        status: 'ACTIVE',
        position: null,
        base_salary: 0,
        hire_date: null,
        total_points: 0,
        created_at: nowSql()
      })
    );
    // Điểm tặng khởi tạo được ghi thành loyalty_transactions (EARN, order_id NULL)
    if (form.initialPoints > 0) adjustPoints(created.id, form.initialPoints);
    setForm(null);
    onShowToast?.(`Đã thêm khách hàng "${created.full_name}".`);
  };

  const toggleLock = (c: User) => {
    const status = c.status === 'LOCKED' ? 'ACTIVE' : 'LOCKED';
    transact(tx => tx.update('users', c.id, { status }));
    onShowToast?.(`${c.full_name}: ${USER_STATUS_LABEL[status]}.`);
  };

  return (
    <AdminLayout
      route="admin-customers"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="users (role = CUSTOMER)"
      title="Quản lý khách hàng"
      subtitle="Thông tin khách hàng, điểm tích lũy và tổng chi tiêu từ đơn hàng đã hoàn thành."
      actions={
        <PrimaryButton icon="person_add" onClick={() => setForm({ ...EMPTY })}>
          Thêm khách hàng
        </PrimaryButton>
      }
      stats={
        <>
          <StatCard label="Tổng khách hàng" value={customers.length} />
          <StatCard label="Đang hoạt động" value={customers.filter(c => c.status === 'ACTIVE').length} tone="success" />
          <StatCard label="Tổng điểm lưu hành" value={fmtNumber(customers.reduce((s, c) => s + c.total_points, 0))} tone="primary" />
          <StatCard label="Doanh thu từ thành viên" value={fmtMoney(customers.reduce((s, c) => s + spentOf(c.id), 0))} />
        </>
      }
    >
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">search</span>
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, số điện thoại hoặc email..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-primary"
          />
        </div>
        <span className="text-xs text-stone-400 font-medium">{filtered.length} khách hàng</span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">Mã KH</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Số điện thoại</th>
                <th className="p-4">Email</th>
                <th className="p-4">Ngày sinh</th>
                <th className="p-4 text-center">Điểm (total_points)</th>
                <th className="p-4 text-center">Số đơn</th>
                <th className="p-4 text-right">Tổng chi tiêu</th>
                <th className="p-4">Ngày tạo</th>
                <th className="p-4 text-center">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-stone-50/60">
                  <td className="p-4 font-mono font-bold text-stone-500">{userCode(c.id)}</td>
                  <td className="p-4">
                    <strong className="text-stone-900 block">{c.full_name}</strong>
                    {c.address && <span className="text-[10px] text-stone-400">{c.address}</span>}
                  </td>
                  <td className="p-4 font-mono">{c.phone}</td>
                  <td className="p-4 text-stone-500">{c.email ?? '—'}</td>
                  <td className="p-4">{fmtDate(c.birthday)}</td>
                  <td className="p-4 text-center font-mono font-bold text-primary">{fmtNumber(c.total_points)}</td>
                  <td className="p-4 text-center font-mono">{ordersOf(c.id).length}</td>
                  <td className="p-4 text-right font-mono font-bold text-stone-900">{fmtMoney(spentOf(c.id))}</td>
                  <td className="p-4">{fmtDate(c.created_at)}</td>
                  <td className="p-4 text-center">
                    <Badge className={c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}>{USER_STATUS_LABEL[c.status]}</Badge>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => onNavigate('admin-memberships')} className="text-primary font-bold hover:underline">Điểm</button>
                    <button onClick={() => toggleLock(c)} className={`font-semibold hover:underline ${c.status === 'LOCKED' ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {c.status === 'LOCKED' ? 'Mở khóa' : 'Khóa'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {form && (
        <Modal title="Thêm khách hàng" onClose={() => setForm(null)}>
          <form onSubmit={handleAdd} className="space-y-3">
            <Field label="Họ và tên *" column="full_name">
              <input required maxLength={120} value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Số điện thoại *" column="phone">
                <input required maxLength={20} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Ngày sinh" column="birthday">
                <input type="date" value={form.birthday} onChange={e => setForm({ ...form, birthday: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <Field label="Email" column="email">
              <input type="email" maxLength={150} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Địa chỉ" column="address">
              <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Điểm tặng khởi tạo" column="loyalty_transactions (EARN)">
              <input type="number" min={0} value={form.initialPoints} onChange={e => setForm({ ...form, initialPoints: Number(e.target.value) })} className={inputCls} />
            </Field>
            <FormActions onCancel={() => setForm(null)} submitLabel="Lưu khách hàng" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
