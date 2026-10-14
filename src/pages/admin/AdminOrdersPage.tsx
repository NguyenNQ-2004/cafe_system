import React, { useState } from 'react';
import { PageRoute, OrderStatus, OrderType } from '../../types';
import { useDb } from '../../data/DbContext';
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STYLE,
  ORDER_TYPE_LABEL,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
  PAYMENT_STATUS_STYLE,
  describeCustomization,
  fmtDateTime,
  fmtMoney,
  orderCustomerName,
  orderItemsOf,
  paymentOf,
  userName
} from '../../data/dbUtils';
import { AdminLayout, Badge, Modal, StatCard, inputCls } from './AdminUi';

interface AdminOrdersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
  onOpenBill?: (orderId: number) => void;
}

const STATUSES = Object.keys(ORDER_STATUS_LABEL) as OrderStatus[];

export const AdminOrdersPage: React.FC<AdminOrdersPageProps> = ({ onNavigate, onShowToast, onOpenBill }) => {
  const { db, transact, setOrderStatus, cancelOrder } = useDb();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | OrderType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [detailId, setDetailId] = useState<number | null>(null);

  const shippers = db.users.filter(u => u.position === 'SHIPPER' && u.status === 'ACTIVE');
  const q = search.trim().toLowerCase();
  const orders = [...db.orders]
    .filter(o => typeFilter === 'all' || o.order_type === typeFilter)
    .filter(o => statusFilter === 'all' || o.status === statusFilter)
    .filter(o => {
      if (!q) return true;
      const phone = o.customer_id ? db.users.find(u => u.id === o.customer_id)?.phone ?? '' : o.recipient_phone ?? '';
      return o.order_code.toLowerCase().includes(q) || phone.includes(q) || orderCustomerName(db, o).toLowerCase().includes(q);
    })
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const detail = db.orders.find(o => o.id === detailId);
  const revenue = db.orders.filter(o => o.status === 'COMPLETED').reduce((s, o) => s + o.final_amount, 0);

  return (
    <AdminLayout
      route="admin-orders"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="orders, order_items, payments"
      title="Quản lý đơn hàng"
      subtitle="Toàn bộ đơn tại quán, mang đi và giao hàng."
      stats={
        <>
          <StatCard label="Tổng đơn" value={db.orders.length} />
          <StatCard label="Đang xử lý" value={db.orders.filter(o => !['COMPLETED', 'CANCELLED'].includes(o.status)).length} tone="primary" />
          <StatCard label="Đã hủy" value={db.orders.filter(o => o.status === 'CANCELLED').length} tone="danger" />
          <StatCard label="Doanh thu đơn hoàn thành" value={fmtMoney(revenue)} tone="success" />
        </>
      }
    >
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">search</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn, tên hoặc SĐT khách..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="h-9 px-3 rounded-xl border border-stone-200 text-xs">
          <option value="all">Tất cả hình thức</option>
          {(Object.keys(ORDER_TYPE_LABEL) as OrderType[]).map(t => (
            <option key={t} value={t}>{ORDER_TYPE_LABEL[t]}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} className="h-9 px-3 rounded-xl border border-stone-200 text-xs">
          <option value="all">Tất cả trạng thái</option>
          {STATUSES.map(s => (
            <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">Mã đơn</th>
                <th className="p-4">Thời gian</th>
                <th className="p-4">Hình thức</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Thu ngân / Shipper</th>
                <th className="p-4 text-right">Thành tiền</th>
                <th className="p-4">Thanh toán</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map(o => {
                const pay = paymentOf(db, o.id);
                return (
                  <tr key={o.id} className={`hover:bg-stone-50/50 ${o.status === 'CANCELLED' ? 'opacity-60' : ''}`}>
                    <td className="p-4 font-bold text-stone-900 font-mono">{o.order_code}</td>
                    <td className="p-4 text-stone-500">{fmtDateTime(o.created_at)}</td>
                    <td className="p-4">
                      <Badge className="bg-stone-100 text-stone-700 border border-stone-200">{ORDER_TYPE_LABEL[o.order_type]}</Badge>
                      {o.table_number && <span className="ml-1 text-stone-500">Bàn {o.table_number}</span>}
                    </td>
                    <td className="p-4 text-stone-700">{orderCustomerName(db, o)}</td>
                    <td className="p-4 text-stone-500">
                      {userName(db, o.cashier_id, 'Online')}
                      {o.shipper_id && <span className="block">Ship: {userName(db, o.shipper_id)}</span>}
                    </td>
                    <td className="p-4 text-right font-mono font-bold">{fmtMoney(o.final_amount)}</td>
                    <td className="p-4">
                      {pay && (
                        <>
                          <span className="block">{PAYMENT_METHOD_LABEL[pay.payment_method]}</span>
                          <Badge className={PAYMENT_STATUS_STYLE[pay.status]}>{PAYMENT_STATUS_LABEL[pay.status]}</Badge>
                        </>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge className={ORDER_STATUS_STYLE[o.status]}>{ORDER_STATUS_LABEL[o.status]}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => setDetailId(o.id)} className="text-primary font-bold hover:underline">Xem</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <Modal title={`Đơn hàng ${detail.order_code}`} onClose={() => setDetailId(null)} wide>
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl">
              <span>Hình thức: <strong>{ORDER_TYPE_LABEL[detail.order_type]}</strong></span>
              <span>Thời gian: <strong>{fmtDateTime(detail.created_at)}</strong></span>
              <span>Khách hàng: <strong>{orderCustomerName(db, detail)}</strong></span>
              <span>Thu ngân: <strong>{userName(db, detail.cashier_id, 'Đặt online')}</strong></span>
              {detail.table_number && <span>Bàn: <strong>{detail.table_number}</strong></span>}
              {detail.delivery_address && (
                <span className="col-span-2">
                  Giao tới: <strong>{detail.recipient_name} • {detail.recipient_phone} • {detail.delivery_address}</strong>
                </span>
              )}
              {detail.order_note && <span className="col-span-2">Ghi chú: {detail.order_note}</span>}
              {detail.cancel_reason && <span className="col-span-2 text-rose-700">Lý do hủy: {detail.cancel_reason}</span>}
            </div>

            <table className="w-full text-left">
              <thead className="text-stone-500 text-[10px] uppercase border-b border-stone-200">
                <tr>
                  <th className="py-2">Món</th>
                  <th className="py-2 text-center">SL</th>
                  <th className="py-2 text-right">Đơn giá</th>
                  <th className="py-2 text-right">Thành tiền</th>
                  <th className="py-2 text-center">Đã pha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orderItemsOf(db, detail.id).map(it => (
                  <tr key={it.id}>
                    <td className="py-2">
                      <strong>{it.product_name_at_time}</strong>
                      <span className="block text-[10px] text-stone-400">{describeCustomization(it.customization)}</span>
                    </td>
                    <td className="py-2 text-center font-mono">{it.quantity}</td>
                    <td className="py-2 text-right font-mono">{fmtMoney(it.unit_price)}</td>
                    <td className="py-2 text-right font-mono font-bold">{fmtMoney(it.subtotal)}</td>
                    <td className="py-2 text-center">{it.is_prepared ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl font-mono">
              <span>total_amount: {fmtMoney(detail.total_amount)}</span>
              <span>discount_amount: -{fmtMoney(detail.discount_amount)}</span>
              <span>delivery_fee: {fmtMoney(detail.delivery_fee)}</span>
              <strong className="text-primary">final_amount: {fmtMoney(detail.final_amount)}</strong>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="space-y-1 block">
                <span className="font-bold text-stone-600">Trạng thái đơn (status)</span>
                <select
                  value={detail.status}
                  onChange={e => {
                    const status = e.target.value as OrderStatus;
                    if (status === 'CANCELLED') {
                      const reason = prompt('Lý do hủy đơn:');
                      if (reason) cancelOrder(detail.id, reason);
                    } else {
                      setOrderStatus(detail.id, status);
                    }
                    onShowToast?.(`Đã cập nhật trạng thái ${detail.order_code}.`);
                  }}
                  className={inputCls}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s} - {ORDER_STATUS_LABEL[s]}</option>
                  ))}
                </select>
              </label>
              {detail.order_type === 'ONLINE' && (
                <label className="space-y-1 block">
                  <span className="font-bold text-stone-600">Shipper (shipper_id)</span>
                  <select
                    value={detail.shipper_id ?? ''}
                    onChange={e => {
                      transact(tx => tx.update('orders', detail.id, { shipper_id: e.target.value ? Number(e.target.value) : null }));
                      onShowToast?.('Đã cập nhật shipper.');
                    }}
                    className={inputCls}
                  >
                    <option value="">-- Chưa gán --</option>
                    {shippers.map(s => (
                      <option key={s.id} value={s.id}>{s.full_name}</option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <div className="flex justify-end">
              <button onClick={() => onOpenBill?.(detail.id)} className="px-4 py-2 rounded-xl bg-primary text-white font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">receipt</span>
                Xem hóa đơn
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
};
