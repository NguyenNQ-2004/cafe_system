import React, { useState, useEffect } from 'react';
import { PageRoute } from '../../types';
import { PosHeader } from './PosHeader';

interface PosShiftPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const PosShiftPage: React.FC<PosShiftPageProps> = ({ onNavigate, onShowToast }) => {
  const THEORETICAL_CASH = 4920000;

  const [denoms, setDenoms] = useState<{ [key: number]: number }>({
    500000: 6,
    200000: 6,
    100000: 5,
    50000: 3,
    20000: 2,
    10000: 3,
  });

  const [shiftNotes, setShiftNotes] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(4 * 3600 + 45 * 60 + 22);

  // Cash movement modal
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [cashType, setCashType] = useState<'out' | 'in'>('out');
  const [cashAmount, setCashAmount] = useState('');
  const [cashReason, setCashReason] = useState('');
  const [cashLogs, setCashLogs] = useState([
    { time: '06:30:15', type: 'in', label: 'Tiền mở ca', reason: 'Bàn giao tiền lẻ ban đầu từ Quản lý Ca', staff: 'Lê Anh Tuấn (QL)', amount: 1500000 },
    { time: '08:15:40', type: 'out', label: 'Chi khẩn cấp', reason: 'Chi mua 02 bao đá tinh khiết dự phòng (HĐ #092)', staff: 'Trần Mai Ly', amount: -50000 },
    { time: '08:45:10', type: 'in', label: 'Nạp bù quỹ', reason: 'Hoàn ứng quỹ mua đá từ Quản lý (Đủ hóa đơn)', staff: 'Lê Anh Tuấn (QL)', amount: 50000 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}h ${m}m ${s}s`;
  };

  // Calculations
  const totalSheets = Object.values(denoms).reduce((a, b) => a + b, 0);
  const grandTotal = Object.entries(denoms).reduce(
    (acc, [val, count]) => acc + parseInt(val, 10) * count,
    0
  );
  const diff = grandTotal - THEORETICAL_CASH;

  const handleDenomChange = (val: number, count: number) => {
    setDenoms({ ...denoms, [val]: Math.max(0, count || 0) });
  };

  const handleResetDenoms = () => {
    setDenoms({ 500000: 0, 200000: 0, 100000: 0, 50000: 0, 20000: 0, 10000: 0 });
    onShowToast?.('Đã làm mới số lượng tờ tiền.');
  };

  const handlePrintXReport = () => {
    onShowToast?.('Đang kết xuất Báo cáo Giữa ca (X-Report) ra máy in nhiệt K80...');
  };

  const handleCloseShift = () => {
    const confirmed = confirm(
      'Xác nhận chốt Ca Sáng (06:30 - 14:30) và xuất Báo cáo Z-Report? Sau khi chốt ca, hệ thống sẽ chuyển sang màn hình Bàn Giao Ca.'
    );
    if (confirmed) {
      onShowToast?.('Chốt ca thành công! Đang chuyển tiếp sang Biên bản bàn giao...');
      setTimeout(() => {
        onNavigate('pos-handover');
      }, 1000);
    }
  };

  const handleAddCashMovement = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(cashAmount, 10);
    if (!amt || amt <= 0) {
      onShowToast?.('Vui lòng nhập số tiền phát sinh hợp lệ.');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', { hour12: false });
    const isOut = cashType === 'out';

    setCashLogs([
      {
        time: timeStr,
        type: cashType,
        label: isOut ? 'Chi khẩn cấp' : 'Nạp bổ sung',
        reason: cashReason || 'Nghiệp vụ két tiền',
        staff: 'Trần Mai Ly (Xác thực)',
        amount: isOut ? -amt : amt,
      },
      ...cashLogs,
    ]);

    setIsCashModalOpen(false);
    setCashAmount('');
    setCashReason('');
    onShowToast?.('Đã ghi nhận biến động két tiền thành công!');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
      <PosHeader currentRoute="pos-shift" onNavigate={onNavigate} onShowToast={onShowToast} />

      {/* Breadcrumb & Operational Action Bar */}
      <div className="w-full bg-stone-100 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <span>Vận hành Quầy</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-stone-900 font-bold">Quản lý Ca & Đối soát Két</span>
          <span className="px-2 py-0.5 rounded bg-white font-mono text-[10px] text-stone-600 border border-stone-200">
            Màn hình 13 - POS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintXReport}
            className="h-9 px-3 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 border border-stone-200 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-500">print</span>
            <span>In Báo cáo Giữa ca (X-Report)</span>
          </button>
          <button
            onClick={() => onShowToast?.('Đã tạm khóa màn hình thu ngân POS 02.')}
            className="h-9 px-3 rounded-xl bg-white hover:bg-stone-50 text-amber-800 text-xs font-semibold flex items-center gap-1.5 border border-stone-200 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">pause_circle</span>
            <span>Tạm khóa ca</span>
          </button>
          <button
            onClick={handleCloseShift}
            className="h-9 px-4 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">lock_reset</span>
            <span>Chốt ca & In Z-Report [F10]</span>
          </button>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 py-4 space-y-5">
        {/* Active Shift Status Banner */}
        <div className="w-full bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
          <div className="flex items-center gap-4 pl-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[28px]">storefront</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-stone-900">Ca Sáng (06:30 - 14:30)</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Đang hoạt động (Active)
                </span>
                <span className="text-xs text-stone-400 font-mono">Mã ca: #SHIFT-20241024-01</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 flex-wrap">
                <span>
                  Thu ngân: <strong className="text-stone-900 font-semibold">Trần Mai Ly</strong> (NV-8821)
                </span>
                <span>•</span>
                <span>Terminal: POS 02 - Quầy Bar Tràng Tiền</span>
                <span>•</span>
                <span>Thứ Năm, 24/10/2024</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200/60">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-stone-400 uppercase font-semibold">Thời gian đã mở ca</span>
              <span className="text-base font-black text-primary font-mono">{formatTimer(elapsedSeconds)}</span>
              <span className="text-[10px] text-stone-400">Bắt đầu lúc 06:30:00</span>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-stone-400 uppercase font-semibold">Tổng giao dịch ca</span>
              <span className="text-base font-black text-stone-900 font-mono">89 đơn</span>
              <span className="text-[10px] text-emerald-600 font-bold">100% hoàn tất</span>
            </div>
          </div>
        </div>

        {/* Dual Column Layout: Left Revenue Matrix + Right Denomination Counting */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* LEFT COLUMN: Revenue Matrix (7 cols) */}
          <div className="xl:col-span-7 space-y-4">
            {/* Revenue Summary Card */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
                  <h3 className="font-bold text-sm text-stone-900">
                    Đối soát Doanh thu Theo Kênh Thanh Toán
                  </h3>
                </div>
                <span className="text-[10px] bg-stone-100 text-primary font-bold px-2 py-0.5 rounded">
                  Đồng bộ tự động
                </span>
              </div>

              {/* Total Revenue Hero Card */}
              <div className="mt-3 p-4 bg-gradient-to-r from-primary/10 via-stone-50 to-white rounded-xl border border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                    Tổng Doanh Thu Toàn Ca
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-primary font-mono">11.600.000</span>
                    <span className="text-sm font-bold text-primary">₫</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-center text-xs">
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[10px] text-stone-400 block">Đơn đã giao</span>
                    <strong className="font-mono text-stone-900">89</strong>
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[10px] text-stone-400 block">Giá trị TB / đơn</span>
                    <strong className="font-mono text-stone-900">130.337₫</strong>
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[10px] text-stone-400 block">Hủy / Hoàn</span>
                    <strong className="font-mono text-emerald-600">0₫</strong>
                  </div>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">Phương thức thanh toán</th>
                      <th className="py-2.5 px-3 text-center">Số GD</th>
                      <th className="py-2.5 px-3 text-right">Tỷ trọng</th>
                      <th className="py-2.5 px-3 text-right">Tổng thực thu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-sans">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                          </div>
                          <div>
                            <strong className="text-stone-900 block text-xs">Tiền mặt tại quầy (Cash)</strong>
                            <span className="text-[10px] text-stone-400 font-sans">Thu trực tiếp vào két tiền</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-sans font-semibold">28 đơn</td>
                      <td className="py-2.5 px-3 text-right text-stone-500 font-sans">29.5%</td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-xs sm:text-sm">3.420.000₫</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-sans">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                          </div>
                          <div>
                            <strong className="text-stone-900 block text-xs">Chuyển khoản VietQR Pro</strong>
                            <span className="text-[10px] text-stone-400 font-sans">Tự động đối soát qua Webhook MB</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-sans font-semibold">39 đơn</td>
                      <td className="py-2.5 px-3 text-right text-stone-500 font-sans">44.6%</td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-xs sm:text-sm">5.180.000₫</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-sans">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">credit_card</span>
                          </div>
                          <div>
                            <strong className="text-stone-900 block text-xs">Thẻ Ngân Hàng (POS Terminal)</strong>
                            <span className="text-[10px] text-stone-400 font-sans">Visa / Mastercard / NAPAS Smart</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-sans font-semibold">14 đơn</td>
                      <td className="py-2.5 px-3 text-right text-stone-500 font-sans">18.5%</td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-xs sm:text-sm">2.150.000₫</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-sans">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">loyalty</span>
                          </div>
                          <div>
                            <strong className="text-stone-900 block text-xs">Ví Aura Rewards & Voucher</strong>
                            <span className="text-[10px] text-stone-400 font-sans">Trừ điểm thẻ thành viên & E-voucher</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-sans font-semibold">8 đơn</td>
                      <td className="py-2.5 px-3 text-right text-stone-500 font-sans">7.4%</td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-xs sm:text-sm">850.000₫</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Theoretical Cash Formula Box */}
              <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Công thức kiểm soát tiền mặt trong két (Theoretical Safe Cash)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block">1. Tiền bàn giao đầu ca:</span>
                    <span className="font-bold font-mono text-stone-900">1.500.000₫</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block">2. Thu tiền mặt bán lẻ:</span>
                    <span className="font-bold font-mono text-emerald-600">+3.420.000₫</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block">3. Biến động rút két ròng:</span>
                    <span className="font-bold font-mono text-amber-800">0₫</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-200">
                  <span className="font-bold text-xs sm:text-sm text-stone-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">calculate</span>
                    Tiền mặt lý thuyết phải có trong két:
                  </span>
                  <span className="text-lg font-black text-primary font-mono">4.920.000₫</span>
                </div>
              </div>
            </div>

            {/* Cash In / Out Log */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">swap_vertical_circle</span>
                  <h3 className="font-bold text-sm text-stone-900">Nhật ký Rút / Nạp Két Trong Ca</h3>
                </div>
                <button
                  onClick={() => setIsCashModalOpen(true)}
                  className="h-8 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">add_circle</span>
                  <span>Ghi nhận chi/nạp két</span>
                </button>
              </div>

              <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">Thời gian</th>
                      <th className="py-2.5 px-3">Loại nghiệp vụ</th>
                      <th className="py-2.5 px-3">Nội dung chi / nạp</th>
                      <th className="py-2.5 px-3">Người duyệt</th>
                      <th className="py-2.5 px-3 text-right">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {cashLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-stone-50">
                        <td className="py-2 px-3 text-stone-500 text-[11px]">{log.time}</td>
                        <td className="py-2 px-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.type === 'in' ? 'bg-blue-100 text-blue-900' : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {log.label}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-sans text-stone-800 text-[11px]">{log.reason}</td>
                        <td className="py-2 px-3 font-sans text-stone-500 text-[11px]">{log.staff}</td>
                        <td
                          className={`py-2 px-3 text-right font-bold text-xs ${
                            log.amount >= 0 ? 'text-emerald-700' : 'text-primary'
                          }`}
                        >
                          {log.amount > 0 ? `+${log.amount.toLocaleString('vi-VN')}₫` : `${log.amount.toLocaleString('vi-VN')}₫`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Denomination Counter & Discrepancy (5 cols) */}
          <div className="xl:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">cloud_upload</span>
                  <h3 className="font-bold text-sm text-stone-900">Kiểm Đếm Tiền Mặt Đóng Ca</h3>
                </div>
                <button
                  onClick={handleResetDenoms}
                  className="text-xs text-stone-500 hover:text-primary flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                  Nhập lại
                </button>
              </div>

              <p className="text-xs text-stone-500 mt-2 mb-3">
                Thu ngân đếm thực tế số tờ tiền trong két theo từng mệnh giá. Hệ thống sẽ tự động nhân tổng và đối soát với số liệu lý thuyết.
              </p>

              {/* Denomination Input Rows */}
              <div className="space-y-1.5 font-mono text-xs">
                {[
                  { denom: 500000, label: '500.000₫', color: 'bg-cyan-700' },
                  { denom: 200000, label: '200.000₫', color: 'bg-amber-700' },
                  { denom: 100000, label: '100.000₫', color: 'bg-emerald-700' },
                  { denom: 50000, label: '50.000₫', color: 'bg-purple-700' },
                  { denom: 20000, label: '20.000₫', color: 'bg-blue-700' },
                  { denom: 10000, label: '10.000₫', color: 'bg-yellow-800' },
                ].map(d => {
                  const count = denoms[d.denom] || 0;
                  const rowSubtotal = d.denom * count;
                  return (
                    <div
                      key={d.denom}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60"
                    >
                      <div className="flex items-center gap-2 w-28">
                        <span className={`w-2.5 h-2.5 rounded-full ${d.color}`} />
                        <span className="font-bold text-stone-900">{d.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 font-sans">
                        <span className="text-stone-400 text-xs">x</span>
                        <input
                          type="number"
                          min="0"
                          value={count}
                          onChange={e => handleDenomChange(d.denom, parseInt(e.target.value, 10))}
                          className="w-16 h-8 text-center rounded-lg bg-white border border-stone-300 font-mono font-bold text-xs"
                        />
                        <span className="text-stone-400 text-xs">tờ =</span>
                      </div>

                      <div className="w-28 text-right font-bold text-stone-900">
                        {rowSubtotal.toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Counted Box */}
              <div className="mt-4 p-3.5 bg-stone-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">
                    Tổng tiền thực tế kiểm đếm
                  </span>
                  <span className="text-xs text-stone-600 font-mono">Tổng cộng {totalSheets} tờ tiền</span>
                </div>
                <span className="text-xl font-black text-stone-900 font-mono">
                  {grandTotal.toLocaleString('vi-VN')}₫
                </span>
              </div>

              {/* Discrepancy Card */}
              <div
                className={`mt-3 p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  diff === 0
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : diff > 0
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[24px]">
                    {diff === 0 ? 'verified' : diff > 0 ? 'arrow_circle_up' : 'warning'}
                  </span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm">
                      {diff === 0
                        ? 'Khớp két 100% (Hoàn hảo)'
                        : diff > 0
                        ? 'Thừa tiền trong két (Thực tế > POS)'
                        : 'Thiếu tiền trong két (Thực tế < POS)'}
                    </p>
                    <p className="text-[10px] opacity-80 mt-0.5">
                      {diff === 0
                        ? 'Tiền kiểm đếm thực tế khớp chính xác với phần mềm POS'
                        : 'Cần giải trình lý do chênh lệch khi bàn giao ca'}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] uppercase font-bold block opacity-70">Chênh lệch:</span>
                  <span className="text-base font-bold">
                    {diff === 0 ? '0₫' : `${diff > 0 ? '+' : ''}${diff.toLocaleString('vi-VN')}₫`}
                  </span>
                </div>
              </div>

              {/* Shift Notes */}
              <div className="mt-4 space-y-1.5">
                <label className="block text-[11px] font-bold text-stone-600 uppercase">
                  Ghi chú bàn giao ca (Tùy chọn)
                </label>
                <textarea
                  rows={2}
                  value={shiftNotes}
                  onChange={e => setShiftNotes(e.target.value)}
                  placeholder="Ví dụ: Máy in nhiệt khay bill số 2 hơi mờ, đã nạp thêm 1 cuộn giấy; két dư 10k..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Confirm Button */}
              <div className="mt-4 pt-2">
                <button
                  type="button"
                  onClick={handleCloseShift}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  <span>Xác nhận & Chốt Ca Làm Việc (Z-Report)</span>
                </button>
                <span className="block text-[10px] text-stone-400 text-center mt-2">
                  Hành động sẽ khóa phiên POS 02 và xuất biên bản bàn giao sang ca tiếp theo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Drawer Movement Modal */}
      {isCashModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Ghi nhận Biến động Tiền Két
              </h3>
              <button onClick={() => setIsCashModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCashMovement} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer font-bold ${
                    cashType === 'out'
                      ? 'bg-primary/5 border-primary text-primary'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="modal-type"
                    checked={cashType === 'out'}
                    onChange={() => setCashType('out')}
                    className="accent-primary"
                  />
                  <span>Rút tiền mặt (Chi)</span>
                </label>
                <label
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer font-bold ${
                    cashType === 'in'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="modal-type"
                    checked={cashType === 'in'}
                    onChange={() => setCashType('in')}
                    className="accent-emerald-600"
                  />
                  <span>Nạp thêm quỹ (Thu)</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Số tiền phát sinh (VND) *</label>
                <input
                  type="number"
                  required
                  value={cashAmount}
                  onChange={e => setCashAmount(e.target.value)}
                  placeholder="Ví dụ: 100000"
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Lý do thu / chi *</label>
                <input
                  type="text"
                  required
                  value={cashReason}
                  onChange={e => setCashReason(e.target.value)}
                  placeholder="Ví dụ: Mua đá bào, bao bì gấp..."
                  className="w-full h-10 px-3 rounded-xl border border-stone-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCashModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 font-semibold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold shadow-xs hover:bg-primary-container"
                >
                  Xác nhận ghi két
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
