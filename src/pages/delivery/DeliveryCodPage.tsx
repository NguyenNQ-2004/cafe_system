import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { DeliverySidebar } from './DeliverySidebar';

interface DeliveryCodPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const DeliveryCodPage: React.FC<DeliveryCodPageProps> = ({ onNavigate, onShowToast }) => {
  const [remitMethod, setRemitMethod] = useState<'cash' | 'qr'>('cash');
  const [driverPin, setDriverPin] = useState('8821');
  const [isZClosed, setIsZClosed] = useState(false);

  const handleCloseZDelivery = () => {
    setIsZClosed(true);
    onShowToast?.(
      'Bàn giao ca thành công! Đã chốt phiếu Z-DELIVERY #902-2410 và ghi nhận két quầy thu ngân Trần Mai Ly.'
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <DeliverySidebar currentRoute="delivery-cod" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Top Header */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap text-xs text-stone-500">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Chốt ca giao hàng
                </span>
                <span>•</span>
                <span>Hôm nay: 24/10/2024</span>
                <span>•</span>
                <span>Ca Toàn Thời Gian (07:00 - 16:00)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Đối soát Tiền thu hộ COD & Doanh thu Ca (DX-902)
              </h1>
              <p className="text-xs text-stone-500">
                Kiểm đếm doanh thu thu hộ thực tế, đối soát với đơn hàng hoàn tất trước khi bàn giao cho thu ngân chốt ca.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={() => onShowToast?.('Đang in phiếu đối soát COD K80...')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>In K80</span>
              </button>
              <button
                onClick={() => onShowToast?.('Đã xuất file đối soát PDF ca ship')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>Xuất PDF</span>
              </button>
            </div>
          </div>

          {/* KPI metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-3 border-t border-stone-100">
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Tiền COD Thực Thu</span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-0.5 block">1.450.000₫</span>
              <span className="text-[11px] text-stone-500 mt-1 block">7 đơn tiền mặt</span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Khách Thanh Toán Online</span>
              <span className="text-2xl font-black text-stone-600 font-mono mt-0.5 block">1.620.000₫</span>
              <span className="text-[11px] text-stone-500 mt-1 block">VietQR / Thẻ (0đ COD)</span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Hoa Hồng & Phí Ship Ca</span>
              <span className="text-2xl font-black text-amber-800 font-mono mt-0.5 block">280.000₫</span>
              <span className="text-[11px] text-stone-500 mt-1 block">14 đơn × 20.000₫</span>
            </div>

            <div className="p-3.5 bg-primary text-white rounded-xl shadow-xs">
              <span className="text-[10px] uppercase font-bold text-white/80 block">Phải nộp về két</span>
              <span className="text-2xl font-black text-white font-mono mt-0.5 block">1.450.000₫</span>
              <span className="text-[11px] text-amber-200 font-semibold mt-1 block">
                {isZClosed ? '✓ Đã bàn giao nộp két' : 'Chờ nộp két đóng ca'}
              </span>
            </div>
          </div>
        </div>

        {/* Dual Column: Table & Remittance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100 flex-wrap gap-2 text-xs">
                <div>
                  <h3 className="font-bold text-sm text-stone-900">Danh Sách Đơn Hàng Đối Soát Trong Ca</h3>
                  <span className="text-stone-500 text-[11px]">Tổng số 14 đơn đã giao (100% hoàn tất)</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  ✓ Số liệu khớp 100%
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-stone-200 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">Mã đơn</th>
                      <th className="py-2.5 px-3">Khách hàng</th>
                      <th className="py-2.5 px-3">Địa chỉ giao</th>
                      <th className="py-2.5 px-3">Hình thức</th>
                      <th className="py-2.5 px-3 text-right">Tiền COD</th>
                      <th className="py-2.5 px-3 text-right">Phí tài xế</th>
                      <th className="py-2.5 px-3 text-center">Thu tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-bold text-primary">#ORD-89240</td>
                      <td className="py-2.5 px-3 font-sans font-semibold">Phạm Bảo Trâm</td>
                      <td className="py-2.5 px-3 font-sans text-stone-500">120 Hoàng Hoa Thám</td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 text-[10px]">Tiền mặt COD</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900">250.000₫</td>
                      <td className="py-2.5 px-3 text-right text-stone-600">20.000₫</td>
                      <td className="py-2.5 px-3 text-center text-emerald-700 font-sans font-bold text-[10px]">Đã thu</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-bold text-primary">#ORD-89235</td>
                      <td className="py-2.5 px-3 font-sans font-semibold">Lê Minh Trí</td>
                      <td className="py-2.5 px-3 font-sans text-stone-500">28 Phố Tràng Tiền</td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 text-[10px]">Tiền mặt COD</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900">380.000₫</td>
                      <td className="py-2.5 px-3 text-right text-stone-600">20.000₫</td>
                      <td className="py-2.5 px-3 text-center text-emerald-700 font-sans font-bold text-[10px]">Đã thu</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-bold text-primary">#ORD-89231</td>
                      <td className="py-2.5 px-3 font-sans font-semibold">Vũ Đức Minh</td>
                      <td className="py-2.5 px-3 font-sans text-stone-500">88 Thảo Điền</td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 text-[10px]">VietQR (Đã TT)</span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-stone-400">0₫</td>
                      <td className="py-2.5 px-3 text-right text-stone-600">25.000₫</td>
                      <td className="py-2.5 px-3 text-center text-blue-700 font-sans text-[10px]">Đã chuyển</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-bold text-primary">#ORD-89228</td>
                      <td className="py-2.5 px-3 font-sans font-semibold">Hoàng Kim Ngân</td>
                      <td className="py-2.5 px-3 font-sans text-stone-500">Landmark 81</td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 text-[10px]">Tiền mặt COD</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900">410.000₫</td>
                      <td className="py-2.5 px-3 text-right text-stone-600">20.000₫</td>
                      <td className="py-2.5 px-3 text-center text-emerald-700 font-sans font-bold text-[10px]">Đã thu</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-bold text-primary">#ORD-89220</td>
                      <td className="py-2.5 px-3 font-sans font-semibold">Nguyễn Tuấn</td>
                      <td className="py-2.5 px-3 font-sans text-stone-500">45 Lê Duẩn</td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 text-[10px]">Tiền mặt COD</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900">410.000₫</td>
                      <td className="py-2.5 px-3 text-right text-stone-600">20.000₫</td>
                      <td className="py-2.5 px-3 text-center text-emerald-700 font-sans font-bold text-[10px]">Đã thu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Denomination Tally */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex justify-between items-center text-xs">
                <h4 className="font-bold text-sm text-stone-900">Bảng Kê Mệnh Giá Tiền Mặt Bàn Giao</h4>
                <span className="text-stone-400">Kiểm đếm nhanh trước thu ngân</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between">
                  <span className="font-semibold text-stone-800">500.000₫</span>
                  <span className="font-bold text-primary">2 tờ</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between">
                  <span className="font-semibold text-stone-800">200.000₫</span>
                  <span className="font-bold text-primary">2 tờ</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between">
                  <span className="font-semibold text-stone-800">50.000₫</span>
                  <span className="font-bold text-primary">1 tờ</span>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 flex justify-between font-sans">
                  <span className="font-bold text-stone-900">Tổng cộng</span>
                  <span className="font-bold text-primary font-mono">1.450.000₫</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Handover Execution Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">Xác Nhận Nộp Tiền</h3>
                  <span className="text-[10px] text-stone-400">Bàn giao quỹ ca COD cho thu ngân</span>
                </div>
              </div>

              {/* Method tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRemitMethod('cash')}
                  className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                    remitMethod === 'cash' ? 'bg-white text-primary shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">payments</span>
                  <span>Tiền mặt POS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRemitMethod('qr')}
                  className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                    remitMethod === 'qr' ? 'bg-white text-primary shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                  <span>QR Quỹ Cty</span>
                </button>
              </div>

              {remitMethod === 'cash' ? (
                <div className="space-y-3">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Thu ngân tiếp nhận:</span>
                    <strong className="text-sm font-bold text-stone-900 block">Trần Mai Ly</strong>
                    <span className="text-[11px] text-stone-500 font-mono block">Mã: NV-8821 • Quầy POS 02 Tràng Tiền</span>
                  </div>

                  <div className="p-3 bg-stone-100 rounded-xl flex justify-between items-center font-mono">
                    <span className="font-sans font-bold text-stone-700">Tiền mặt bàn giao:</span>
                    <span className="text-lg font-black text-primary">1.450.000₫</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mã PIN Shipper (Đỗ Văn Hùng)</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={driverPin}
                      onChange={e => setDriverPin(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-300 font-mono text-center font-bold tracking-widest"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Quẹt thẻ / NFC Thu ngân xác nhận</label>
                    <input
                      type="text"
                      readOnly
                      value="RFID-8821-VERIFIED"
                      className="w-full h-10 px-3 rounded-xl bg-stone-100 border border-stone-200 font-mono text-xs text-emerald-700 font-bold"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-2">
                  <span className="text-[11px] font-semibold text-stone-600">Quét mã nộp tiền vào TK Quỹ Aura Café</span>
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center border border-stone-200 shadow-2xs">
                    <span className="material-symbols-outlined text-[80px] text-stone-800">qr_code_2</span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-primary">DX902 COD 2410</div>
                  <div className="text-sm font-black font-mono text-stone-900">1.450.000₫</div>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseZDelivery}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>CHỐT BÀN GIAO TIỀN CA (Z-DELIVERY)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast?.('Đang in biên lai bàn giao tiền COD 2 liên...')}
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold border border-stone-200 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>In biên lai nộp tiền 2 liên</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
