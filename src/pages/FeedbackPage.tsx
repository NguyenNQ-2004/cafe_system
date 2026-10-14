import React, { useState } from 'react';
import { PageRoute, ReviewType } from '../types';
import { useDb } from '../data/DbContext';
import {
  ORDER_STATUS_LABEL,
  REVIEW_STATUS_LABEL,
  REVIEW_STATUS_STYLE,
  REVIEW_TYPE_LABEL,
  fmtDateTime,
  getSetting,
  nowSql
} from '../data/dbUtils';

interface FeedbackPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenChat?: () => void;
  onShowToast?: (msg: string) => void;
}

// Chủ đề nhanh chỉ để gợi ý nội dung, được ghép vào customer_reviews.content
const COMPLAINT_TOPICS = ['Sai món / sai size', 'Hương vị chưa đạt', 'Giao trễ / đổ vỡ', 'Thái độ phục vụ', 'Thiếu dụng cụ kèm theo'];

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ onNavigate, onOpenChat, onShowToast }) => {
  const { db, session, transact } = useDb();
  const myOrders = db.orders
    .filter(o => o.customer_id === session.customerId && o.status !== 'CANCELLED')
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const myReviews = db.customer_reviews
    .filter(r => r.customer_id === session.customerId)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  const [orderId, setOrderId] = useState<number | ''>(myOrders[0]?.id ?? '');
  const [issueType, setIssueType] = useState<ReviewType>('RATING');
  const [rating, setRating] = useState(5);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) {
      onShowToast?.('Bạn cần có đơn hàng để gửi đánh giá hoặc khiếu nại.');
      return;
    }
    if (!content.trim()) {
      onShowToast?.('Vui lòng nhập nội dung đánh giá hoặc phản ánh.');
      return;
    }
    transact(tx =>
      tx.insert('customer_reviews', {
        customer_id: session.customerId,
        order_id: Number(orderId),
        issue_type: issueType,
        rating: issueType === 'RATING' ? rating : null,
        content: issueType === 'COMPLAINT' && topic ? `[${topic}] ${content.trim()}` : content.trim(),
        status: 'PENDING',
        admin_response: null,
        created_at: nowSql()
      })
    );
    setContent('');
    setTopic('');
    onShowToast?.('Đã gửi thành công! Cửa hàng sẽ phản hồi sớm nhất.');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 py-3 mb-2 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Trang chủ</button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-stone-800 font-semibold">Đánh giá & Phản ánh</span>
        </div>

        <div className="bg-gradient-to-r from-stone-900 via-primary to-stone-900 rounded-2xl p-6 text-white mb-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Đánh giá & Chăm sóc khách hàng</h1>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                  Gửi đánh giá sao hoặc khiếu nại cho từng đơn hàng. Quản lý cửa hàng sẽ phản hồi trực tiếp tại đây.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${getSetting(db, 'store_hotline').replace(/\s/g, '')}`}
                className="px-4 py-2.5 rounded-xl bg-white text-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow hover:bg-stone-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Hotline {getSetting(db, 'store_hotline')}
              </a>
              <button
                onClick={onOpenChat}
                className="px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-md text-white border border-white/25 font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-white/25 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Chat trực tuyến
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form tạo customer_reviews */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-stone-100 pb-4 mb-6">
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">rate_review</span>
                  Gửi đánh giá / khiếu nại
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Đơn hàng *</label>
                  <select
                    value={orderId}
                    onChange={e => setOrderId(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-primary bg-stone-50 font-medium"
                  >
                    {myOrders.length === 0 && <option value="">Chưa có đơn hàng</option>}
                    {myOrders.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.order_code} - {fmtDateTime(o.created_at)} - {ORDER_STATUS_LABEL[o.status]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Loại yêu cầu *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['RATING', 'COMPLAINT'] as const).map(t => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setIssueType(t)}
                        className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                          issueType === t ? 'border-primary bg-primary/5 text-primary font-bold shadow-xs' : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{t === 'RATING' ? 'star' : 'report'}</span>
                        {REVIEW_TYPE_LABEL[t]}
                      </button>
                    ))}
                  </div>
                </div>

                {issueType === 'RATING' ? (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Số sao (1 - 5) *</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button type="button" key={star} onClick={() => setRating(star)} className="text-2xl transition-transform hover:scale-110 focus:outline-none">
                          <span className={`material-symbols-outlined ${star <= rating ? 'text-amber-400' : 'text-stone-300'}`}>star</span>
                        </button>
                      ))}
                      <span className="text-xs text-stone-500 font-medium ml-2">{rating}/5</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Vấn đề gặp phải</label>
                    <div className="flex flex-wrap gap-2">
                      {COMPLAINT_TOPICS.map(t => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTopic(topic === t ? '' : t)}
                          className={`px-3 py-1.5 rounded-full border text-xs transition-all ${
                            topic === t ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Nội dung *</label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder={issueType === 'RATING' ? 'Chia sẻ cảm nhận của bạn về món và dịch vụ...' : 'Mô tả chi tiết sự cố bạn gặp phải...'}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-primary placeholder:text-stone-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-sm hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Gửi {REVIEW_TYPE_LABEL[issueType].toLowerCase()}
                </button>
              </form>
            </div>
          </div>

          {/* Danh sách customer_reviews của khách */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
                  Phiếu đã gửi ({myReviews.length})
                </h3>
              </div>
              <div className="space-y-4">
                {myReviews.length === 0 && <p className="text-xs text-stone-400 text-center">Bạn chưa gửi đánh giá nào.</p>}
                {myReviews.map(r => {
                  const order = db.orders.find(o => o.id === r.order_id);
                  return (
                    <div
                      key={r.id}
                      className={`p-4 rounded-xl border transition-all ${
                        r.status === 'PENDING' ? 'border-amber-200 bg-amber-50/30 shadow-xs' : 'border-stone-200 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-stone-900">#{r.id}</span>
                            <span className="text-[10px] text-stone-500 font-medium">({order?.order_code})</span>
                          </div>
                          <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-0.5">
                            {REVIEW_TYPE_LABEL[r.issue_type]}
                            {r.rating !== null && <span className="text-amber-500 ml-1">{'★'.repeat(r.rating)}</span>}
                          </h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${REVIEW_STATUS_STYLE[r.status]}`}>
                          {REVIEW_STATUS_LABEL[r.status]}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700">{r.content}</p>
                      {r.admin_response && (
                        <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-xs text-stone-700 mt-2">
                          <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-900 mb-1">
                            <span className="material-symbols-outlined text-[14px]">support_agent</span>
                            Phản hồi từ cửa hàng
                          </div>
                          <p className="text-[11px] leading-relaxed">{r.admin_response}</p>
                        </div>
                      )}
                      <div className="pt-2 mt-2 border-t border-stone-200/50 text-[11px] text-stone-500">Gửi lúc: {fmtDateTime(r.created_at)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
