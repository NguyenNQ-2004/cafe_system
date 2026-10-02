import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { DeliverySidebar } from './DeliverySidebar';

interface DeliveryProblemPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const DeliveryProblemPage: React.FC<DeliveryProblemPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedOrder, setSelectedOrder] = useState('ORD-89241');
  const [reason, setReason] = useState('no-answer');
  const [proposals, setProposals] = useState({
    returnStore: true,
    wait10m: false,
    leaveGuard: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast?.(
      `Đã gửi báo cáo sự cố cho đơn #${selectedOrder}! Điều phối viên Trần Nam đang thẩm tra và phản hồi trong 3 phút.`
    );
    setTimeout(() => {
      onNavigate('delivery-orders');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <DeliverySidebar currentRoute="delivery-report" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Breadcrumb & Title */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <span>Phân hệ Giao hàng</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span>Danh sách đơn</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary font-bold">Báo cáo sự cố</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Báo cáo Sự cố Vận chuyển & Giao nhận Đơn hàng
              </h1>
            </div>

            <button
              onClick={() => onNavigate('delivery-orders')}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 border border-stone-200"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Quay lại Đơn được phân công</span>
            </button>
          </div>

          {/* Urgent banner */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-rose-900 block">
                  Chế độ xử lý sự cố cấp tốc
                </span>
                <span className="text-xs text-rose-800">
                  Báo cáo gửi đi sẽ tự động kích hoạt thông báo đỏ đến Điều phối viên và Quầy Barista liên quan.
                </span>
              </div>
            </div>
            <span className="px-3 py-1 bg-white rounded-lg text-primary font-bold text-xs border border-rose-200 shadow-2xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">timer</span>
              SLA Phản hồi: &lt; 3 phút
            </span>
          </div>
        </div>

        {/* 2 Columns: Form & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5 text-xs">
              {/* 1. Chọn mã đơn */}
              <div>
                <label className="block font-bold text-sm text-stone-900 mb-1.5">
                  1. Chọn mã đơn hàng gặp sự cố
                </label>
                <select
                  value={selectedOrder}
                  onChange={e => setSelectedOrder(e.target.value)}
                  className="w-full h-11 px-3.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:border-primary"
                >
                  <option value="ORD-89241">#ORD-89241 - Nguyễn Văn An - Landmark 81 (Tòa L3 - Sảnh A)</option>
                  <option value="ORD-89243">#ORD-89243 - Lê Thảo Nhi - Sunwah Tower (Tầng 12)</option>
                  <option value="ORD-89245">#ORD-89245 - Công ty Golden Gate - Saigon Pearl Ruby 2</option>
                </select>

                <div className="mt-2.5 p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Chi tiết đơn hàng:</span>
                    <strong className="text-stone-800">3 món (2 Cà phê Muối, 1 Croissant Hạnh Nhân)</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 block text-[10px]">Tiền thu COD:</span>
                    <strong className="text-primary font-mono text-sm font-bold">219.000₫ (Tiền mặt)</strong>
                  </div>
                </div>
              </div>

              {/* 2. Nguyên nhân */}
              <div>
                <label className="block font-bold text-sm text-stone-900 mb-1">
                  2. Phân loại nguyên nhân sự cố phát sinh
                </label>
                <p className="text-stone-500 mb-2">Vui lòng chọn nguyên nhân chính xác để điều phối viên có hướng xử lý tối ưu:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'no-answer', title: 'Khách không nghe máy', desc: 'Đã gọi tối thiểu 3 cuộc cách nhau 5 phút tại sảnh' },
                    { id: 'customer-refused', title: 'Khách từ chối nhận', desc: 'Lý do giao muộn giờ hoặc đổi ý đột xuất' },
                    { id: 'wrong-address', title: 'Sai địa chỉ / Không tìm thấy', desc: 'Ghi nhầm số nhà, ngõ cụt ngoài bán kính' },
                    { id: 'spilled-damage', title: 'Hư hỏng / Đổ vỡ thức uống', desc: 'Sự cố bung nắp ép, đổ khay ly khi phanh gấp' },
                    { id: 'bike-breakdown', title: 'Hỏng xe / Thời tiết giông bão', desc: 'Xe chết máy, thủng săm hoặc ngập nước' },
                    { id: 'quality-complaint', title: 'Khiếu nại món ngay lúc nhận', desc: 'Sai topping, nguội bánh hoặc tan hết đá' },
                  ].map(item => (
                    <label
                      key={item.id}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        reason === item.id
                          ? 'bg-primary/5 border-primary text-primary font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        checked={reason === item.id}
                        onChange={() => setReason(item.id)}
                        className="accent-primary w-4 h-4 mt-0.5"
                      />
                      <div>
                        <span className="block leading-tight">{item.title}</span>
                        <span className="text-[10px] text-stone-500 font-normal block mt-0.5">{item.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Call log */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">call_log</span>
                    Nhật ký cuộc gọi xác thực với khách (Tự động ghi nhận)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Đủ điều kiện hoàn đơn
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2 bg-white rounded-lg border border-stone-200 flex justify-between">
                    <span>1. 10:10 AM (Thời lượng 30s)</span>
                    <span className="text-rose-600 font-bold">Không nhấc máy</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-200 flex justify-between">
                    <span>2. 10:15 AM (Thời lượng 5s)</span>
                    <span className="text-amber-800 font-bold">Báo bận (Busy tone)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-200 flex justify-between">
                    <span>3. 10:20 AM (Thời lượng 0s)</span>
                    <span className="text-rose-600 font-bold">Thuê bao không liên lạc được</span>
                  </div>
                </div>
              </div>

              {/* 4. Evidence */}
              <div>
                <label className="block font-bold text-sm text-stone-900 mb-1.5">
                  3. Ảnh chụp bằng chứng hiện trường & Đơn hàng
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm2m63J1XAsSE0MMuVH20l_Z6MnNgTzu50J1mVRV1qOTrvQT_NBOa7CfI-Xk_r_CN0FtiS_BjZDe3AaMR84Au2I5oBC8Kfc68q8JEIpE3v9mnQjS3VD3Wgn5iQmKDyuh20q1C4X5-Fk24Gwn6SVvINt-o6zwWP_k1Dowce1wtGeUpu1chQ32wrlFxrnX1J10D2n4hWKAmZTI5KFYG60adSBULxj3Ty6Ul0IfaEo5i5ABJHC0twHF7o"
                      alt="Call log proof"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <span className="text-[10px] text-stone-500 mt-1 font-mono">IMG_8924_calls.jpg (1.8 MB)</span>
                  </div>

                  <div
                    onClick={() => onShowToast?.('Đang kết nối camera chụp ảnh gói hàng tại sảnh...')}
                    className="p-4 bg-stone-50 hover:bg-stone-100 rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center cursor-pointer text-center"
                  >
                    <span className="material-symbols-outlined text-[28px] text-primary mb-1">add_a_photo</span>
                    <span className="font-bold text-stone-800">Chụp ảnh túi hàng tại điểm giao</span>
                    <span className="text-[10px] text-stone-400 mt-0.5">Chụp rõ tem hóa đơn dán ngoài ly</span>
                  </div>
                </div>
              </div>

              {/* 5. Driver proposals */}
              <div>
                <label className="block font-bold text-sm text-stone-900 mb-1.5">
                  4. Đề xuất phương án xử lý từ Tài xế
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={proposals.returnStore}
                        onChange={e => setProposals({ ...proposals, returnStore: e.target.checked })}
                        className="accent-primary w-4 h-4 rounded"
                      />
                      <span className="font-semibold text-stone-800">Mang hàng hoàn về chi nhánh quầy Bar gần nhất</span>
                    </div>
                    <span className="text-stone-500 font-mono text-[11px]">Chi nhánh Q.Bình Thạnh (1.2 km)</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={proposals.wait10m}
                        onChange={e => setProposals({ ...proposals, wait10m: e.target.checked })}
                        className="accent-primary w-4 h-4 rounded"
                      />
                      <span className="font-semibold text-stone-800">Chờ thêm 10 phút tại sảnh theo yêu cầu bảo vệ</span>
                    </div>
                    <span className="text-primary font-bold text-[11px]">+10.000đ phụ phí</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send_time_extension</span>
                  <span>GỬI BÁO CÁO CHO ĐIỀU PHỐI VIÊN XỬ LÝ KHẨN CẤP</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: History & Hotline (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            {/* History */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">find_replace</span>
                  Lịch sử sự cố trong tuần (2)
                </span>
                <span className="text-emerald-700 font-bold">Đã chốt</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-stone-900">
                    <span>#INC-891</span>
                    <span className="text-emerald-700 font-sans text-[10px]">Hoàn tất</span>
                  </div>
                  <p className="text-stone-600">Khách đổi địa chỉ giao từ Q.1 sang Bình Thạnh (quá 3.5 km).</p>
                  <span className="block text-emerald-700 font-bold text-[10px]">
                    ✓ Đã duyệt cộng 25.000đ phụ phí ship vào ví tài xế
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-stone-900">
                    <span>#INC-874</span>
                    <span className="text-emerald-700 font-sans text-[10px]">Đã giải quyết</span>
                  </div>
                  <p className="text-stone-600">Đổ vỡ 1 ly Trà đào do phanh gấp tránh xe tải.</p>
                  <span className="block text-stone-600 text-[10px]">
                    ✓ Barista pha lại ly mới miễn phí, miễn trách nhiệm tài xế
                  </span>
                </div>
              </div>
            </div>

            {/* Hotline card */}
            <div className="bg-gradient-to-br from-primary to-primary-container text-white p-5 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
                </div>
                <div>
                  <span className="text-[10px] text-amber-200 uppercase font-bold tracking-wider block">
                    Hỗ trợ khẩn cấp trên tuyến
                  </span>
                  <strong className="text-sm block">Hotline Đội trưởng Giao hàng</strong>
                </div>
              </div>
              <p className="text-white/80 text-[11px] leading-relaxed">
                Dùng trong trường hợp tai nạn va chạm, khách có thái độ đe dọa, hoặc không nhận diện được địa chỉ trong thời tiết xấu.
              </p>
              <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/70 block">Đội trưởng: Nguyễn Hoàng Long</span>
                  <span className="font-mono font-bold text-base text-amber-300">0988 999 111</span>
                </div>
                <a
                  href="tel:0988999111"
                  className="px-3 py-1.5 rounded-lg bg-white text-primary font-bold text-xs"
                >
                  GỌI NGAY
                </a>
              </div>
            </div>

            {/* Shield policy */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
              <p className="text-[11px] text-stone-600 leading-snug">
                <strong>Chính sách bảo vệ tài xế:</strong> Tài xế gọi đủ 3 cuộc cách nhau 5 phút và có ảnh chụp hiện trường sẽ được miễn 100% trách nhiệm bồi thường tiền hàng.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
