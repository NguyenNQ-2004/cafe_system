import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminDashboardPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate, onShowToast }) => {
  const [timeRange, setTimeRange] = useState<'today' | '7days' | 'month'>('today');

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-overview" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Top Header Card */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Bàn làm việc</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary font-bold">Tổng quan điều hành</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync 2.8s
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Tổng quan Vận hành & Báo cáo Chuỗi
              </h1>
              <p className="text-xs text-stone-500">
                Giám sát hiệu suất bán hàng đa kênh, trạng thái quầy pha chế KDS và cảnh báo kho toàn hệ thống.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200">
                <button
                  onClick={() => setTimeRange('today')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    timeRange === 'today' ? 'bg-white text-primary shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  Hôm nay (24/10)
                </button>
                <button
                  onClick={() => setTimeRange('7days')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    timeRange === '7days' ? 'bg-white text-primary shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  7 ngày qua
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    timeRange === 'month' ? 'bg-white text-primary shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  Tháng này
                </button>
              </div>

              <button
                onClick={() => onShowToast?.('Đang xuất báo cáo tổng quan định dạng Excel và PDF...')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>Xuất báo cáo</span>
              </button>

              <button
                onClick={() => onShowToast?.('Có 2 cảnh báo khẩn cấp: Tồn kho Arabica CN 03 dưới 5kg và 1 khiếu nại chưa xử lý.')}
                className="px-3.5 py-2 bg-primary text-white hover:bg-primary-container font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                <span>Cảnh báo khẩn</span>
                <span className="px-1.5 py-0.2 bg-white/20 rounded-full font-mono text-[10px]">2</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 uppercase font-bold text-[10px]">Doanh thu tích lũy hôm nay</span>
                <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-primary font-mono mt-1">42.850.000₫</p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs">
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-[11px]">
                ▲ +14.2%
              </span>
              <span className="text-stone-500">vs cùng giờ hôm qua (37.5M)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 uppercase font-bold text-[10px]">Sản lượng đơn hàng</span>
                <span className="material-symbols-outlined text-blue-600 text-[20px]">receipt_long</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-stone-900 font-mono mt-1">685 đơn</p>
            </div>
            <div className="grid grid-cols-3 gap-1 mt-3 pt-2 border-t border-stone-100 text-center font-mono text-[11px]">
              <div className="p-1 rounded bg-emerald-50 text-emerald-800">
                <strong>640</strong> xong
              </div>
              <div className="p-1 rounded bg-amber-50 text-amber-800">
                <strong>32</strong> làm
              </div>
              <div className="p-1 rounded bg-rose-50 text-rose-800">
                <strong>13</strong> hủy
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 uppercase font-bold text-[10px]">Giá trị TB đơn (AOV)</span>
                <span className="material-symbols-outlined text-amber-700 text-[20px]">analytics</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-stone-900 font-mono mt-1">62.500₫</p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-semibold">+4.200₫ vs Target</span>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px]">Top combo 2 ly</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 uppercase font-bold text-[10px]">Đúng hạn KDS & Giao hàng</span>
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">timer</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono mt-1">96.8%</p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100 text-xs text-stone-500">
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '96.8%' }} />
              </div>
              <span className="text-[11px]">KDS TB: 4.2 phút • Đạt chuẩn SLA</span>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Chart & Top 5 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* Left Chart (8 cols) */}
          <div className="xl:col-span-8 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm text-stone-900">
                  Nhịp độ doanh thu theo khung giờ (07:00 - 21:00)
                </h3>
                <span className="text-xs text-stone-500">So sánh Tại quầy POS (62%) vs Delivery App (38%)</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-primary" />
                  <span className="text-stone-700 font-medium">Tại quầy (62%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-700" />
                  <span className="text-stone-700 font-medium">Delivery (38%)</span>
                </div>
              </div>
            </div>

            {/* SVG Wave Chart */}
            <div className="relative w-full h-64 pt-2">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 760 200">
                <defs>
                  <linearGradient id="gradPosAdmin" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#900b1a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#900b1a" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="gradDelivAdmin" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#b45309" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="40" x2="760" y2="40" stroke="#f5f5f4" strokeWidth="1" />
                <line x1="0" y1="90" x2="760" y2="90" stroke="#f5f5f4" strokeWidth="1" />
                <line x1="0" y1="140" x2="760" y2="140" stroke="#f5f5f4" strokeWidth="1" />
                <line x1="0" y1="180" x2="760" y2="180" stroke="#e7e5e4" strokeWidth="1" />

                <polygon
                  fill="url(#gradDelivAdmin)"
                  points="40,165 95,150 150,120 205,80 260,95 315,110 370,100 425,85 480,75 535,90 590,115 645,130 700,145 700,180 40,180"
                />
                <polyline
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="2"
                  points="40,165 95,150 150,120 205,80 260,95 315,110 370,100 425,85 480,75 535,90 590,115 645,130 700,145"
                />

                <polygon
                  fill="url(#gradPosAdmin)"
                  points="40,155 95,90 150,35 205,65 260,85 315,105 370,90 425,50 480,60 535,80 590,100 645,120 700,140 700,180 40,180"
                />
                <polyline
                  fill="none"
                  stroke="#900b1a"
                  strokeWidth="3"
                  points="40,155 95,90 150,35 205,65 260,85 315,105 370,90 425,50 480,60 535,80 590,100 645,120 700,140"
                />

                <circle cx="150" cy="35" r="4" fill="#900b1a" stroke="#ffffff" strokeWidth="2" />
                <circle cx="425" cy="50" r="4" fill="#900b1a" stroke="#ffffff" strokeWidth="2" />
              </svg>
              <div className="flex justify-between px-2 pt-2 text-[10px] font-mono text-stone-400">
                <span>07:00</span>
                <span>08:00</span>
                <span className="font-bold text-primary">09:00 (5.8M)</span>
                <span>11:00</span>
                <span>13:00</span>
                <span className="font-bold text-primary">15:30 (4.5M)</span>
                <span>17:00</span>
                <span>19:00</span>
                <span>21:00</span>
              </div>
            </div>

            {/* 3 periods summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-stone-100">
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-[10px] text-stone-400 block font-bold">Khung sáng (07:00 - 11:00)</span>
                <span className="font-bold text-stone-900 font-mono">18.420.000₫ (43%)</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-[10px] text-stone-400 block font-bold">Khung chiều (11:00 - 17:00)</span>
                <span className="font-bold text-stone-900 font-mono">16.330.000₫ (38%)</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-[10px] text-stone-400 block font-bold">Khung tối (17:00 - 21:00)</span>
                <span className="font-bold text-stone-900 font-mono">8.100.000₫ (19%)</span>
              </div>
            </div>
          </div>

          {/* Right Top 5 (4 cols) */}
          <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h3 className="font-bold text-sm text-stone-900">Top 5 món bán chạy nhất</h3>
                <span className="text-xs text-stone-400 font-mono">Hôm nay</span>
              </div>

              <div className="space-y-3.5 my-3 text-xs">
                {[
                  { name: 'Cà phê Muối Aura', cups: 186, share: '28.4%', pct: 82, num: 1 },
                  { name: 'Bạc Xỉu Kem Trứng', cups: 142, share: '21.2%', pct: 65, num: 2 },
                  { name: 'Trà Ô Long Mãng Cầu', cups: 115, share: '17.8%', pct: 52, num: 3 },
                  { name: 'Croissant Bơ Tỏi', cups: 98, share: '14.1%', pct: 44, num: 4 },
                  { name: 'Cold Brew Cam Quế', cups: 74, share: '11.5%', pct: 33, num: 5 },
                ].map(it => (
                  <div key={it.num} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                          {it.num}
                        </span>
                        <strong className="text-stone-800">{it.name}</strong>
                      </div>
                      <span className="font-mono text-stone-700">
                        {it.cups} ly <span className="text-[10px] text-stone-400">({it.share})</span>
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${it.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl flex items-center justify-between text-xs text-stone-600 border border-stone-200">
              <span>Signature: 67.4% doanh thu</span>
              <button onClick={() => onNavigate('admin-products')} className="text-primary font-bold hover:underline">
                Chi tiết món →
              </button>
            </div>
          </div>
        </div>

        {/* 4 Branches Health Monitor */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                Giám sát 4 Chi nhánh theo thời gian thực (Branch Health Monitor)
              </h3>
              <p className="text-xs text-stone-500">Tải đơn KDS, năng lực phục vụ và cảnh báo tức thời</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              4/4 Đang mở cửa
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-stone-200 text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Chi nhánh & Khu vực</th>
                  <th className="py-2.5 px-3 text-right">Doanh thu ngày</th>
                  <th className="py-2.5 px-3 text-center">Sản lượng đơn</th>
                  <th className="py-2.5 px-3">Tình trạng quầy KDS</th>
                  <th className="py-2.5 px-3 text-center">Trạng thái vận hành</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                <tr className="hover:bg-stone-50">
                  <td className="py-2.5 px-3 font-sans">
                    <strong className="text-stone-900 block text-xs">CN 01 - Tràng Tiền (Flagship)</strong>
                    <span className="text-[10px] text-stone-400">Hoàn Kiếm, Hà Nội</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-sm">16.200.000₫</td>
                  <td className="py-2.5 px-3 text-center font-sans">240 đơn</td>
                  <td className="py-2.5 px-3 font-sans text-amber-700">Trễ 2 ly (&gt;7 phút)</td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Tốt / Bình thường
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-2.5 px-3 font-sans">
                    <strong className="text-stone-900 block text-xs">CN 02 - Hoàng Hoa Thám</strong>
                    <span className="text-[10px] text-stone-400">Ba Đình, Hà Nội</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-sm">8.900.000₫</td>
                  <td className="py-2.5 px-3 text-center font-sans">135 đơn</td>
                  <td className="py-2.5 px-3 font-sans text-emerald-700">Ổn định (&lt;3.5 phút)</td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Tốt / Bình thường
                    </span>
                  </td>
                </tr>
                <tr className="bg-amber-50/50 hover:bg-amber-50">
                  <td className="py-2.5 px-3 font-sans">
                    <strong className="text-stone-900 block text-xs">CN 03 - Lê Duẩn</strong>
                    <span className="text-[10px] text-stone-400">Quận 1, TP. Hồ Chí Minh</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-sm">11.500.000₫</td>
                  <td className="py-2.5 px-3 text-center font-sans">190 đơn</td>
                  <td className="py-2.5 px-3 font-sans text-amber-800 font-bold">Arabica kho &lt; 5kg</td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                      Cảnh báo kho
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-2.5 px-3 font-sans">
                    <strong className="text-stone-900 block text-xs">CN 04 - Thảo Điền</strong>
                    <span className="text-[10px] text-stone-400">TP. Thủ Đức, TP. Hồ Chí Minh</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-stone-900 text-sm">6.250.000₫</td>
                  <td className="py-2.5 px-3 text-center font-sans">120 đơn</td>
                  <td className="py-2.5 px-3 font-sans text-emerald-700">Bình thường (4 phút)</td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Tốt / Bình thường
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
