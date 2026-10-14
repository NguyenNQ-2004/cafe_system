import React, { useState } from 'react';
import { PageRoute, OrderStatus, OrderType, PaymentMethod } from '../../types';
import { useDb } from '../../data/DbContext';
import { ORDER_STATUS_LABEL, ORDER_TYPE_LABEL, PAYMENT_METHOD_LABEL, fmtDate, fmtMoney, fmtNumber, isLowStock } from '../../data/dbUtils';
import { AdminLayout, StatCard } from './AdminUi';

interface AdminDashboardPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate, onShowToast }) => {
  const { db } = useDb();
  const dates = [...new Set(db.orders.map(o => o.created_at.slice(0, 10)))].sort();
  const [dateFilter, setDateFilter] = useState<'all' | string>('all');

  const orders = db.orders.filter(o => dateFilter === 'all' || o.created_at.startsWith(dateFilter));
  const valid = orders.filter(o => o.status !== 'CANCELLED');
  const completed = orders.filter(o => o.status === 'COMPLETED');
  const revenue = completed.reduce((s, o) => s + o.final_amount, 0);
  const aov = completed.length ? revenue / completed.length : 0;

  // Doanh thu theo ngày (đơn hoàn thành)
  const byDate = dates.map(d => ({
    date: d,
    amount: db.orders.filter(o => o.status === 'COMPLETED' && o.created_at.startsWith(d)).reduce((s, o) => s + o.final_amount, 0)
  }));
  const maxDay = Math.max(1, ...byDate.map(d => d.amount));

  const byType = (Object.keys(ORDER_TYPE_LABEL) as OrderType[]).map(t => ({
    type: t,
    count: valid.filter(o => o.order_type === t).length,
    amount: valid.filter(o => o.order_type === t).reduce((s, o) => s + o.final_amount, 0)
  }));

  const validIds = new Set(valid.map(o => o.id));
  const pays = db.payments.filter(p => validIds.has(p.order_id) && p.status === 'SUCCESS');
  const byMethod = (Object.keys(PAYMENT_METHOD_LABEL) as PaymentMethod[]).map(m => ({
    method: m,
    amount: pays.filter(p => p.payment_method === m).reduce((s, p) => s + p.amount, 0)
  }));
  const paidTotal = Math.max(1, byMethod.reduce((s, m) => s + m.amount, 0));

  // Top sản phẩm theo số lượng bán (order_items của đơn không bị hủy)
  const qtyByProduct = new Map<string, number>();
  db.order_items
    .filter(i => validIds.has(i.order_id))
    .forEach(i => qtyByProduct.set(i.product_name_at_time, (qtyByProduct.get(i.product_name_at_time) ?? 0) + i.quantity));
  const top = [...qtyByProduct.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topMax = Math.max(1, ...top.map(t => t[1]));

  const lowStock = db.ingredients.filter(isLowStock);
  const pendingReviews = db.customer_reviews.filter(r => r.status === 'PENDING');
  const draftPos = db.purchase_orders.filter(p => p.status === 'DRAFT');

  return (
    <AdminLayout
      route="admin-overview"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="orders, order_items, payments"
      title="Tổng quan vận hành"
      subtitle="Số liệu tính trực tiếp từ dữ liệu đơn hàng, thanh toán và kho."
      actions={
        <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="h-9 px-3 rounded-xl border border-stone-200 bg-stone-50">
          <option value="all">Toàn bộ thời gian</option>
          {dates.map(d => (
            <option key={d} value={d}>Ngày {fmtDate(d)}</option>
          ))}
        </select>
      }
      stats={
        <>
          <StatCard label="Doanh thu (đơn hoàn thành)" value={fmtMoney(revenue)} tone="primary" />
          <StatCard label="Số đơn" value={orders.length} hint={`${completed.length} hoàn thành • ${orders.filter(o => o.status === 'CANCELLED').length} hủy`} />
          <StatCard label="Giá trị TB / đơn" value={fmtMoney(aov)} />
          <StatCard label="Đang xử lý" value={orders.filter(o => !['COMPLETED', 'CANCELLED'].includes(o.status)).length} tone="success" />
        </>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-stone-900">Doanh thu theo ngày</h3>
          <div className="flex items-end gap-3 h-48 border-b border-stone-200 pb-2">
            {byDate.map(d => (
              <div key={d.date} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                <span className="text-[10px] font-mono text-stone-500">{fmtNumber(Math.round(d.amount / 1000))}k</span>
                <div
                  className={`w-full max-w-[56px] rounded-t-lg ${d.date === dateFilter ? 'bg-primary' : 'bg-primary/60'}`}
                  style={{ height: `${Math.max(4, (d.amount / maxDay) * 100)}%` }}
                />
                <span className="text-[10px] font-mono text-stone-500">{fmtDate(d.date).slice(0, 5)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {byType.map(t => (
              <div key={t.type} className="p-3 bg-stone-50 rounded-xl">
                <span className="text-[10px] text-stone-400 block font-bold uppercase">{ORDER_TYPE_LABEL[t.type]}</span>
                <span className="font-bold text-stone-900 font-mono">{fmtMoney(t.amount)}</span>
                <span className="block text-stone-500">{t.count} đơn</span>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-stone-100">
            <h3 className="font-bold text-sm text-stone-900">Top món bán chạy</h3>
            <button onClick={() => onNavigate('admin-products')} className="text-primary text-xs font-bold hover:underline">Sản phẩm →</button>
          </div>
          {top.length === 0 && <p className="text-xs text-stone-400">Chưa có dữ liệu bán hàng.</p>}
          <div className="space-y-3.5 text-xs">
            {top.map(([name, qty], idx) => (
              <div key={name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{idx + 1}</span>
                    <strong className="text-stone-800">{name}</strong>
                  </div>
                  <span className="font-mono text-stone-700">{qty} phần</span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${(qty / topMax) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-sm text-stone-900">Thanh toán thành công theo phương thức</h3>
          {byMethod.map(m => (
            <div key={m.method} className="space-y-1">
              <div className="flex justify-between">
                <span>{PAYMENT_METHOD_LABEL[m.method]}</span>
                <strong className="font-mono">{fmtMoney(m.amount)}</strong>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-700 h-full" style={{ width: `${(m.amount / paidTotal) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-sm text-stone-900">Đơn theo trạng thái</h3>
          {(Object.keys(ORDER_STATUS_LABEL) as OrderStatus[]).map(s => (
            <div key={s} className="flex justify-between p-2 bg-stone-50 rounded-lg">
              <span>{ORDER_STATUS_LABEL[s]}</span>
              <strong className="font-mono">{orders.filter(o => o.status === s).length}</strong>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-sm text-stone-900">Cần xử lý</h3>
          <button onClick={() => onNavigate('admin-restock')} className="w-full flex justify-between p-2.5 bg-rose-50 text-rose-800 rounded-lg hover:bg-rose-100">
            <span>Nguyên liệu dưới mức tối thiểu</span>
            <strong className="font-mono">{lowStock.length}</strong>
          </button>
          <button onClick={() => onNavigate('admin-restock')} className="w-full flex justify-between p-2.5 bg-stone-50 rounded-lg hover:bg-stone-100">
            <span>Đề xuất nhập hàng chờ duyệt</span>
            <strong className="font-mono">{draftPos.length}</strong>
          </button>
          <button onClick={() => onNavigate('admin-complaints')} className="w-full flex justify-between p-2.5 bg-amber-50 text-amber-900 rounded-lg hover:bg-amber-100">
            <span>Đánh giá / khiếu nại chờ xử lý</span>
            <strong className="font-mono">{pendingReviews.length}</strong>
          </button>
          {lowStock.map(i => (
            <p key={i.id} className="text-stone-500">
              • {i.name}: {fmtNumber(i.current_stock)}/{fmtNumber(i.min_stock_level)} {i.unit}
            </p>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
