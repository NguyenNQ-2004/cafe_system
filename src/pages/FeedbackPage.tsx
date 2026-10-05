import React, { useState } from 'react';
import { PageRoute, FeedbackTicket } from '../types';
import { INITIAL_FEEDBACK_TICKETS } from '../data/mockData';

interface FeedbackPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenChat?: () => void;
  onShowToast?: (msg: string) => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ 
  onNavigate, 
  onOpenChat, 
  onShowToast 
}) => {
  const [tickets, setTickets] = useState<FeedbackTicket[]>(INITIAL_FEEDBACK_TICKETS);
  const [selectedOrder, setSelectedOrder] = useState('#AUR-86410');
  const [category, setCategory] = useState('wrong_size');
  const [rating, setRating] = useState<number>(3);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'chat'>('phone');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim()) {
      onShowToast?.('Vui lòng nhập nội dung góp ý hoặc phản ánh của bạn!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newTicket: FeedbackTicket = {
        id: `#FB-${Math.floor(1000 + Math.random() * 9000)}`,
        orderId: selectedOrder,
        title: category === 'wrong_size' ? 'Sai kích thước hoặc tùy chọn ly' : 
               category === 'quality' ? 'Chất lượng hương vị chưa đạt chuẩn' : 
               category === 'delivery' ? 'Giao hàng chậm / Khâu vận chuyển' : 'Ý kiến đóng góp dịch vụ',
        createdAt: 'Vừa xong - Hôm nay',
        status: 'processing',
        statusLabel: 'Đã tiếp nhận',
        progressPercent: 25,
        agentName: 'Thanh Trúc (Trưởng ca CSKH)',
        agentNote: 'Bộ phận CSKH Aura đã tiếp nhận và đang liên hệ cửa hàng chi nhánh để giải quyết ngay cho bạn.'
      };

      setTickets([newTicket, ...tickets]);
      setFeedbackContent('');
      setUploadedPhotos([]);
      setIsSubmitting(false);
      onShowToast?.('Đã gửi phản ánh thành công! Chuyên viên CSKH Aura sẽ phản hồi trong 15 phút.');
    }, 600);
  };

  const handleSimulatePhotoUpload = () => {
    const sampleImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmpTys3KoN-gBpIZ2NHZpRJuTwcv-5IYk5GLa4_0uVM_hhieERDkGhxBxjxrEkep1JSAnjV_4SPCgWBVKnMb6fwivTCsPDIZrULPy7mL5ADYCvY6PIwelzBqc3MDBhcvjIWD8AIfWl4SwKLbsFrj0d1ysYfNX_B5EnxoRyDrgKDFgvdcyO-Ms8_F5cd-FImpqdFCuvDZb5yW0IJIY2nfBTxVlU5v0Ss4rTwrmL4ZtFkSiyLaAxWJKC';
    if (uploadedPhotos.length >= 3) {
      onShowToast?.('Bạn chỉ có thể đính kèm tối đa 3 ảnh chụp!');
      return;
    }
    setUploadedPhotos([...uploadedPhotos, sampleImg]);
    onShowToast?.('Đã đính kèm ảnh minh họa đơn hàng.');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 py-3 mb-2 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">
            Trang chủ
          </button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-stone-800 font-semibold">Trung tâm hỗ trợ & Phản ánh khách hàng</span>
        </div>

        {/* Top Emergency Care Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-primary to-stone-900 rounded-2xl p-6 text-white mb-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Aura Customer Care & Service Hub
                </h1>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                  Cam kết bảo vệ quyền lợi người thưởng thức cà phê: 100% đổi mới hoặc hoàn tiền ngay lập tức nếu chất lượng đồ uống không đạt sự hài lòng của quý khách.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:19006868"
                className="px-4 py-2.5 rounded-xl bg-white text-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow hover:bg-stone-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Hotline 1900 6868 (Miễn cước)
              </a>
              <button
                onClick={onOpenChat}
                className="px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-md text-white border border-white/25 font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-white/25 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Chat trực tuyến ngay
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Feedback submission form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-stone-100 pb-4 mb-6">
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">rate_review</span>
                  Gửi phản ánh dịch vụ / Đổi trả món
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Đội ngũ kiểm soát chất lượng Aura sẽ liên hệ trực tiếp với bạn trong tối đa 15 phút
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Chọn đơn hàng liên quan */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Chọn đơn hàng cần khiếu nại hoặc góp ý
                  </label>
                  <select
                    value={selectedOrder}
                    onChange={e => setSelectedOrder(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-primary bg-stone-50 font-medium"
                  >
                    <option value="#AUR-86410">Đơn hàng #AUR-86410 (Hôm nay 15:30 - Bạc Xỉu Kem Trứng, Croissant)</option>
                    <option value="#AUR-81209">Đơn hàng #AUR-81209 (14/10 - Cold Brew Cam Quế)</option>
                    <option value="store_experience">Trải nghiệm trực tiếp tại cửa hàng (Không qua app)</option>
                    <option value="other">Góp ý phát triển hệ thống & thực đơn chung</option>
                  </select>
                </div>

                {/* 2. Chủ đề vấn đề */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Vấn đề bạn gặp phải là gì?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'wrong_size', label: 'Sai kích cỡ / Món', icon: 'local_drink' },
                      { id: 'quality', label: 'Hương vị / Nhiệt độ', icon: 'coffee' },
                      { id: 'delivery', label: 'Giao trễ / Đổ vỡ', icon: 'moped' },
                      { id: 'attitude', label: 'Thái độ phục vụ', icon: 'sentiment_dissatisfied' },
                      { id: 'packaging', label: 'Thiếu ống hút/đồ ăn', icon: 'inventory_2' },
                      { id: 'other', label: 'Vấn đề khác', icon: 'help_outline' },
                    ].map(cat => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                          category === cat.id
                            ? 'border-primary bg-primary/5 text-primary font-bold shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                        <span className="text-center">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Đánh giá số sao trải nghiệm */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Mức độ hài lòng với lần phục vụ này
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                      >
                        <span 
                          className={`material-symbols-outlined ${
                            star <= rating ? 'text-amber-400 font-filled' : 'text-stone-300'
                          }`}
                        >
                          star
                        </span>
                      </button>
                    ))}
                    <span className="text-xs text-stone-500 font-medium ml-2">
                      {rating === 1 && 'Rất không hài lòng'}
                      {rating === 2 && 'Không hài lòng'}
                      {rating === 3 && 'Tạm ổn / Cần cải thiện'}
                      {rating === 4 && 'Hài lòng'}
                      {rating === 5 && 'Tuyệt vời'}
                    </span>
                  </div>
                </div>

                {/* 4. Nội dung chi tiết */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Mô tả chi tiết sự cố bạn đã gặp
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackContent}
                    onChange={e => setFeedbackContent(e.target.value)}
                    placeholder="Ví dụ: Ly trà sen vàng của tôi bị nhầm thành size M thay vì L như đã đặt trên hóa đơn. Cần hỗ trợ đổi hoặc hoàn tiền..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-primary placeholder:text-stone-400 resize-none"
                  />
                </div>

                {/* 5. Đính kèm ảnh minh chứng */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Hình ảnh hóa đơn / sản phẩm thực tế (Tối đa 3 ảnh)
                  </label>
                  <div className="flex items-center gap-3">
                    {uploadedPhotos.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-stone-200">
                        <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, idx) => idx !== i))}
                          className="absolute top-1 right-1 w-4 h-4 bg-stone-900/80 rounded-full text-white flex items-center justify-center text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {uploadedPhotos.length < 3 && (
                      <button
                        type="button"
                        onClick={handleSimulatePhotoUpload}
                        className="w-16 h-16 rounded-xl border-2 border-dashed border-stone-300 hover:border-primary flex flex-col items-center justify-center text-stone-400 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                        <span className="text-[9px] mt-0.5 font-medium">Thêm ảnh</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 6. Kênh phản hồi ưu tiên */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Bạn muốn CSKH liên hệ lại qua kênh nào?
                  </label>
                  <div className="flex items-center gap-4 text-xs">
                    {[
                      { id: 'phone', label: 'Gọi trực tiếp (Khuyên dùng)' },
                      { id: 'email', label: 'Gửi Email báo cáo' },
                      { id: 'chat', label: 'Nhắn qua App Chat' },
                    ].map(method => (
                      <label key={method.id} className="flex items-center gap-1.5 cursor-pointer text-stone-700 font-medium">
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={contactMethod === method.id}
                          onChange={() => setContactMethod(method.id as any)}
                          className="accent-primary"
                        />
                        {method.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-sm hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    {isSubmitting ? 'Đang gửi phản ánh...' : 'Gửi phản ánh tới bộ phận Chăm sóc khách hàng'}
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                    Aura bảo mật hoàn toàn danh tính khách hàng khi xử lý phản ánh nội bộ
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Ticket tracker & Support history (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Ticket list */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
                  Phiếu hỗ trợ đã tạo ({tickets.length})
                </h3>
                <span className="text-[11px] text-stone-500">Cập nhật thời gian thực</span>
              </div>

              <div className="space-y-4">
                {tickets.map(ticket => {
                  const isProcessing = ticket.status === 'processing';

                  return (
                    <div
                      key={ticket.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isProcessing 
                          ? 'border-amber-200 bg-amber-50/30 shadow-xs' 
                          : 'border-stone-200 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-stone-900">{ticket.id}</span>
                            <span className="text-[10px] text-stone-500 font-medium">({ticket.orderId})</span>
                          </div>
                          <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-0.5">
                            {ticket.title}
                          </h4>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isProcessing 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {ticket.statusLabel}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="my-2.5">
                        <div className="flex justify-between items-center text-[10px] text-stone-500 mb-1">
                          <span>Tiến độ xử lý</span>
                          <span className="font-bold">{ticket.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isProcessing ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${ticket.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {ticket.agentNote && (
                        <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/60 text-xs text-stone-700 mt-2 mb-3">
                          <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-900 mb-1">
                            <span className="material-symbols-outlined text-[14px]">support_agent</span>
                            {ticket.agentName || 'Chuyên viên Aura Care'}
                          </div>
                          <p className="text-[11px] leading-relaxed">{ticket.agentNote}</p>
                        </div>
                      )}

                      {ticket.resolution && (
                        <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-xs text-stone-700 mt-2 mb-3">
                          <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-900 mb-1">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Kết quả bồi hoàn
                          </div>
                          <p className="text-[11px] leading-relaxed">{ticket.resolution}</p>

                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-stone-200/50 text-[11px] text-stone-500">
                        <span>Tạo lúc: {ticket.createdAt}</span>
                        {isProcessing && (
                          <button
                            onClick={onOpenChat}
                            className="text-primary font-bold hover:underline flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">chat</span>
                            Chat với nhân viên phụ trách
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Aura Quality Commitment */}
            <div className="bg-stone-900 rounded-2xl p-6 text-white shadow-xs">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined">verified</span>
                Quy chuẩn dịch vụ vàng tại Aura
              </h3>
              <ul className="space-y-3 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[16px] shrink-0">check</span>
                  <span>Đổi mới ly miễn phí trong vòng 30 phút nếu cà phê không đúng độ ngọt/đá bạn mong muốn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[16px] shrink-0">check</span>
                  <span>Hoàn tiền 100% về tài khoản nếu tài xế làm đổ vỡ đồ uống trong quá trình vận chuyển.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[16px] shrink-0">check</span>
                  <span>Bộ phận Giám sát Trải nghiệm lắng nghe 24/7 qua tổng đài và mục Chat trong ứng dụng.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
