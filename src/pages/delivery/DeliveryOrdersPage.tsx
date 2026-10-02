import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { DeliverySidebar } from './DeliverySidebar';

interface DeliveryOrdersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const DeliveryOrdersPage: React.FC<DeliveryOrdersPageProps> = ({ onNavigate, onShowToast }) => {
  const [checklist, setChecklist] = useState({
    seal: true,
    tools: true,
    bill: true,
  });

  const handleDeliverySuccess = () => {
    const confirmed = confirm(
      'Xác nhận đã nhận đủ 219.000đ tiền mặt COD và giao túi hàng #BAG-04 cho khách Nguyễn Văn An?'
    );
    if (confirmed) {
      onShowToast?.(
        'Giao thành công đơn #ORD-89241! Số dư COD ví shipper tăng lên: 1.669.000đ. Đang chuyển sang đơn tiếp theo #ORD-89245.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <DeliverySidebar currentRoute="delivery-orders" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Top Header */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-xs">
                <span className="material-symbols-outlined text-[28px]">sports_motorsports</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-stone-900">Đỗ Văn Hùng</h1>
                  <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-xs font-bold">
                    ID: DX-902
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">two_wheeler</span>
                    Wave Alpha • 29E2-882.14
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 flex-wrap">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Sẵn sàng nhận đơn mới (Online)
                  </span>
                  <span>•</span>
                  <span>Đội tàu: Central Hub #01</span>
                  <span>•</span>
                  <span className="font-mono">Ca sáng: 07:00 - 15:30</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={() => onShowToast?.('Đang mở bản đồ điều hướng lộ trình tối ưu qua 3 điểm giao hàng...')}
                className="px-3.5 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-container shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">directions_bike</span>
                <span>Lộ trình tối ưu</span>
              </button>
              <button
                onClick={() => onNavigate('delivery-report')}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span>Báo sự cố đơn (PAGE 18)</span>
              </button>
              <button
                onClick={() => onNavigate('delivery-cod')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">payments</span>
                <span>Đối soát COD</span>
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-stone-100">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Đã giao ca này</span>
              <span className="text-lg font-bold text-stone-900 font-mono mt-0.5 block">14 đơn</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Đang chở trên xe</span>
              <span className="text-lg font-bold text-primary font-mono mt-0.5 block">02 đơn ưu tiên</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Tỷ lệ đúng giờ</span>
              <span className="text-lg font-bold text-emerald-700 font-mono mt-0.5 block">98.5% (▲ +1.2%)</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Tiền mặt COD cầm ví</span>
              <span className="text-lg font-bold text-primary font-mono mt-0.5 block">1.450.000₫</span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Queue & Turn-by-Turn Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Order Queue (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Spotlight Order #ORD-89241 */}
            <div className="bg-white rounded-2xl border-2 border-primary/40 shadow-sm p-5 space-y-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />

              <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono font-bold text-xs">
                    #ORD-89241
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                    Đang giao trên đường
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px] uppercase animate-pulse">
                    Ưu tiên cao
                  </span>
                </div>
                <div className="flex items-center gap-1 text-primary text-xs font-bold font-mono">
                  <span className="material-symbols-outlined text-[16px]">alarm</span>
                  <span>Hạn chót: 10:15 (Còn 12 phút)</span>
                </div>
              </div>

              {/* Customer & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                <div className="sm:col-span-8 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900">Nguyễn Văn An</span>
                    <a
                      href="tel:0908123456"
                      className="px-2 py-0.5 rounded bg-stone-100 text-primary font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">call</span>
                      <span>0908 123 456</span>
                    </a>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    <strong>Địa chỉ:</strong> Tầng 8, Tòa Landmark 81, 720A Điện Biên Phủ, P.22, Bình Thạnh
                  </p>
                  <p className="text-primary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">straighten</span>
                    Cách quán 2.4 km • Thời gian đi: ~8 phút
                  </p>
                </div>

                <div className="sm:col-span-4 bg-stone-50 p-3 rounded-xl border border-stone-200 text-right">
                  <span className="text-[10px] text-stone-400 block font-bold uppercase">Thu tiền mặt (COD)</span>
                  <span className="text-xl font-black text-primary font-mono block">219.000₫</span>
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded inline-block mt-1">
                    Chưa thu
                  </span>
                </div>
              </div>

              {/* Packing item breakdown */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-stone-600">
                  <span className="font-semibold flex items-center gap-1 text-amber-800">
                    <span className="material-symbols-outlined text-[16px]">local_mall</span>
                    Túi giữ nhiệt: <strong>#BAG-04 (Seal #9941)</strong>
                  </span>
                  <span>3 món nước & bánh</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px]">
                  <div className="p-2 bg-white rounded-lg border border-stone-200">
                    1x Cà phê Muối (L)
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-200">
                    1x Trà Sen Vàng Hạt Dẻ
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-200">
                    1x Basque Cheesecake
                  </div>
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href="tel:0908123456"
                    className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-700">call</span>
                    <span>Gọi khách</span>
                  </a>
                  <button
                    onClick={() => onShowToast?.('Đã cập nhật trạng thái: Tài xế đã tới sảnh điểm giao!')}
                    className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
                    <span>Đã đến nơi</span>
                  </button>
                  <button
                    onClick={() => onNavigate('delivery-report')}
                    className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 font-semibold border border-rose-200"
                  >
                    Báo sự cố
                  </button>
                </div>

                <button
                  onClick={handleDeliverySuccess}
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  <span>Giao thành công & Thu tiền (219k)</span>
                </button>
              </div>
            </div>

            {/* Order #ORD-89245 (Prepaid) */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-800">#ORD-89245</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">
                    ĐANG GIAO (CHỜ LƯỢT 2)
                  </span>
                </div>
                <span className="text-emerald-700 font-bold">Đã TT VietQR (0đ COD)</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <div>
                  <p className="font-bold text-stone-900">Hoàng Thu Thảo • 0982 771 902</p>
                  <p className="text-stone-500">45 Lê Duẩn, P. Bến Nghé, Quận 1 (Cổng sau MPlaza)</p>
                </div>
                <button
                  onClick={() => onShowToast?.('Đã bắt đầu lộ trình đơn #ORD-89245')}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-primary hover:text-white font-semibold transition-colors"
                >
                  Bắt đầu giao
                </button>
              </div>
            </div>

            {/* Order #ORD-89250 (Ready at Bar) */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-800">#ORD-89250</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                    SẴN SÀNG LẤY TẠI QUẦY BAR
                  </span>
                </div>
                <span className="text-primary font-bold">KDS vừa xong 3p</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <div>
                  <p className="font-bold text-stone-900">Võ Minh Quân • Túi #BAG-07</p>
                  <p className="text-stone-500">Chi nhánh Tràng Tiền ➔ 120 Pasteur, Quận 1 (1.1 km)</p>
                </div>
                <button
                  onClick={() => onShowToast?.('Đã quét mã nhận túi #BAG-07 tại quầy bar!')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800"
                >
                  Quét nhận đơn
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: GPS Map, Turn by Turn & Checklist (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* GPS Simulation Map */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              {/* Map header */}
              <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold text-stone-900">Điều hướng GPS #ORD-89241</span>
                </div>
                <span className="font-mono font-bold text-primary">2.4 km • Còn ~8 phút</span>
              </div>

              {/* Map image with simulated HUD */}
              <div
                className="w-full h-64 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFUdnPxH-P4BQCghKDqyYeu_ENB4IAby7Yhlj20jPPsWWjQs3fCB3l3uAa1qIvnxJvB2wJUS__9UhZCCBoseQaUVxT4C22LYbM9ZZ8S5Q5qUElrvR1hQi7dfZu4XcyEAylFQg9u7yXl7CJA8O09g_ezmSC4ui2dxRcUh0ZmIH5auoQvPMoE0woZLBxIhqIFZ1R5LZ1sHCXe2pGkYwO6XYi0iS0lItpxF6HhyMd5yLsyCA-jJtjwc-H')`,
                }}
              >
                {/* HUD turn by turn */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-stone-200 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="material-symbols-outlined text-primary text-[24px]">turn_slight_right</span>
                    <div>
                      <span className="text-[10px] text-stone-500 block">250m nữa rẽ phải vào</span>
                      <strong className="text-stone-900 font-bold block truncate max-w-[180px]">
                        Đường Nguyễn Hữu Cảnh
                      </strong>
                    </div>
                  </div>
                  <button
                    onClick={() => onShowToast?.('Đang mở ứng dụng Google Maps chỉ đường...')}
                    className="px-2.5 py-1.5 rounded-lg bg-primary text-white font-bold text-[11px]"
                  >
                    Google Maps
                  </button>
                </div>
              </div>

              {/* Customer note callout */}
              <div className="p-3.5 bg-amber-50 text-amber-950 border-t border-amber-200 text-xs space-y-1">
                <span className="font-bold flex items-center gap-1 text-amber-900">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">sticky_note_2</span>
                  Ghi chú từ khách hàng:
                </span>
                <p className="text-[11px] leading-relaxed">
                  "Gửi bảo vệ sảnh hầm B1, gọi điện thoại trước 3 phút khi đến để em xuống nhận đồ ạ. Tránh để đá tan."
                </p>
              </div>

              {/* Quality Checklist */}
              <div className="p-4 space-y-2 text-xs">
                <span className="font-bold text-stone-800 uppercase text-[10px] tracking-wider block">
                  Checklist trước khi bàn giao (3/3 Đạt)
                </span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.seal}
                      onChange={e => setChecklist({ ...checklist, seal: e.target.checked })}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    <span>Túi giữ nhiệt niêm phong còn nguyên tem #9941</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.tools}
                      onChange={e => setChecklist({ ...checklist, tools: e.target.checked })}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    <span>Kèm đủ muỗng gỗ, ống hút cỏ bọc giấy & khăn lạnh</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.bill}
                      onChange={e => setChecklist({ ...checklist, bill: e.target.checked })}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    <span>Hóa đơn bán lẻ COD (219.000₫) kẹp ngoài mặt túi</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Hotline Dispatcher Callout */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[18px]">headset_mic</span>
                </div>
                <div>
                  <p className="font-bold text-stone-900">Điều phối viên: Trần Nam</p>
                  <p className="text-stone-500 text-[11px]">Kênh hỗ trợ sự cố khẩn cấp trên tuyến</p>
                </div>
              </div>
              <a
                href="tel:19006886"
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-primary font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                Hotline
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
