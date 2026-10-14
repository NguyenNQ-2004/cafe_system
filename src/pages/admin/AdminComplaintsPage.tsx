import React, { useState } from 'react';
import { PageRoute, CustomerReview, ReviewStatus, ReviewType } from '../../types';
import { useDb } from '../../data/DbContext';
import { REVIEW_STATUS_LABEL, REVIEW_STATUS_STYLE, REVIEW_TYPE_LABEL, fmtDateTime } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, Modal, StatCard, inputCls } from './AdminUi';

interface AdminComplaintsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminComplaintsPage: React.FC<AdminComplaintsPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [statusFilter, setStatusFilter] = useState<'ALL' | ReviewStatus>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | ReviewType>('ALL');
  const [editing, setEditing] = useState<{ r: CustomerReview; status: 'RESOLVED' | 'REJECTED'; response: string } | null>(null);

  const reviews = [...db.customer_reviews]
    .filter(r => (statusFilter === 'ALL' || r.status === statusFilter) && (typeFilter === 'ALL' || r.issue_type === typeFilter))
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  const ratings = db.customer_reviews.filter(r => r.issue_type === 'RATING' && r.rating !== null);
  const avgRating = ratings.length ? (ratings.reduce((s, r) => s + (r.rating ?? 0), 0) / ratings.length).toFixed(1) : '—';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    transact(tx => tx.update('customer_reviews', editing.r.id, { status: editing.status, admin_response: editing.response.trim() }));
    onShowToast?.(`Đã phản hồi phiếu #${editing.r.id}.`);
    setEditing(null);
  };

  return (
    <AdminLayout
      route="admin-complaints"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="customer_reviews"
      title="Đánh giá & khiếu nại"
      subtitle="Tiếp nhận đánh giá sao (RATING) và khiếu nại (COMPLAINT) theo từng đơn hàng, phản hồi trực tiếp tới khách."
      stats={
        <>
          <StatCard label="Tổng phiếu" value={db.customer_reviews.length} />
          <StatCard label="Chờ xử lý" value={db.customer_reviews.filter(r => r.status === 'PENDING').length} tone="danger" />
          <StatCard label="Khiếu nại" value={db.customer_reviews.filter(r => r.issue_type === 'COMPLAINT').length} />
          <StatCard label="Điểm đánh giá TB" value={`${avgRating} ★`} tone="primary" />
        </>
      }
      actions={
        <>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="h-9 px-3 rounded-xl border border-stone-200 bg-stone-50">
            <option value="ALL">Tất cả loại</option>
            <option value="RATING">Đánh giá</option>
            <option value="COMPLAINT">Khiếu nại</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} className="h-9 px-3 rounded-xl border border-stone-200 bg-stone-50">
            <option value="ALL">Tất cả trạng thái</option>
            {(Object.keys(REVIEW_STATUS_LABEL) as ReviewStatus[]).map(s => (
              <option key={s} value={s}>{REVIEW_STATUS_LABEL[s]}</option>
            ))}
          </select>
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">Mã</th>
                <th className="p-4">Đơn hàng</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Loại</th>
                <th className="p-4">Đánh giá</th>
                <th className="p-4">Nội dung</th>
                <th className="p-4">Phản hồi</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-stone-400">Không có phiếu phù hợp.</td>
                </tr>
              )}
              {reviews.map(r => {
                const c = db.users.find(u => u.id === r.customer_id);
                const o = db.orders.find(x => x.id === r.order_id);
                return (
                  <tr key={r.id} className="hover:bg-stone-50/60 align-top">
                    <td className="p-4 font-mono font-bold text-stone-600">#{r.id}</td>
                    <td className="p-4 font-mono font-bold text-primary">{o?.order_code}</td>
                    <td className="p-4">
                      <strong className="text-stone-900 block">{c?.full_name}</strong>
                      <span className="text-[11px] font-mono text-stone-400">{c?.phone}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={r.issue_type === 'RATING' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}>{REVIEW_TYPE_LABEL[r.issue_type]}</Badge>
                    </td>
                    <td className="p-4">
                      {r.rating !== null ? (
                        <span className="text-amber-500 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                      ) : (
                        <span className="text-stone-400 font-mono">--</span>
                      )}
                    </td>
                    <td className="p-4 max-w-xs text-stone-800">
                      {r.content}
                      <span className="block text-[10px] text-stone-400 mt-1">{fmtDateTime(r.created_at)}</span>
                    </td>
                    <td className="p-4 max-w-xs text-stone-600">{r.admin_response ?? '—'}</td>
                    <td className="p-4">
                      <Badge className={REVIEW_STATUS_STYLE[r.status]}>{REVIEW_STATUS_LABEL[r.status]}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setEditing({ r, status: r.status === 'REJECTED' ? 'REJECTED' : 'RESOLVED', response: r.admin_response ?? '' })}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto"
                      >
                        <span className="material-symbols-outlined text-[14px]">reply</span>
                        {r.status === 'PENDING' ? 'Xử lý' : 'Sửa phản hồi'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <Modal title={`Phản hồi phiếu #${editing.r.id}`} onClose={() => setEditing(null)}>
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-500 text-[10px] uppercase block">Ý kiến khách hàng ({REVIEW_TYPE_LABEL[editing.r.issue_type]}):</span>
              <p className="text-stone-800 font-medium italic">"{editing.r.content}"</p>
            </div>
            <Field label="Trạng thái xử lý" column="status">
              <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value as 'RESOLVED' | 'REJECTED' })} className={inputCls}>
                <option value="RESOLVED">RESOLVED - Đã giải quyết</option>
                <option value="REJECTED">REJECTED - Từ chối</option>
              </select>
            </Field>
            <Field label="Nội dung phản hồi *" column="admin_response">
              <textarea rows={4} required value={editing.response} onChange={e => setEditing({ ...editing, response: e.target.value })} className={inputCls} />
            </Field>
            <FormActions onCancel={() => setEditing(null)} submitLabel="Gửi phản hồi" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
