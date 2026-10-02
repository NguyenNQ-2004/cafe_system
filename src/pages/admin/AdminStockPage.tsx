import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminStockPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminStockPage: React.FC<AdminStockPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('hub01');
  const [stockFilter, setStockFilter] = useState('all');

  const stockItems = [
    {
      sku: 'ING-CF-001',
      name: 'Cà phê hạt Arabica Cầu Đất (Rang vừa)',
      desc: 'Vùng trồng Trạm Hành, Lâm Đồng • Túi Van 1 chiều',
      cat: 'Hạt Cà phê',
      actual: '12.5 kg',
      min: '25.0 kg',
      unit: 'kg',
      price: 280000,
      totalVal: 3500000,
      velocity: '1.8 ngày',
      status: 'critical',
      statusLabel: 'NGUY CẤP',
    },
    {
      sku: 'ING-CF-002',
      name: 'Cà phê hạt Robusta Pleiku (Rang đậm)',
      desc: 'Sơ chế Honey • Đậm vị truyền thống phin',
      cat: 'Hạt Cà phê',
      actual: '65.0 kg',
      min: '30.0 kg',
      unit: 'kg',
      price: 140000,
      totalVal: 9100000,
      velocity: '7.5 ngày',
      status: 'safe',
      statusLabel: 'An toàn',
    },
    {
      sku: 'ING-MLK-001',
      name: 'Sữa đặc có đường Ông Thọ đỏ (Lon 380g)',
      desc: 'Vinamilk Official • Thùng 48 lon',
      cat: 'Sữa & Kem',
      actual: '140 lon',
      min: '50 lon',
      unit: 'Lon',
      price: 24500,
      totalVal: 3430000,
      velocity: '12 ngày',
      status: 'safe',
      statusLabel: 'An toàn',
    },
    {
      sku: 'ING-MLK-004',
      name: 'Sữa tươi tiệt trùng không đường Barista Grade',
      desc: 'Bảo quản lạnh 2-4°C • Chuyên tạo bọt Cappuccino/Latte',
      cat: 'Sữa & Kem',
      actual: '18 hộp',
      min: '40 hộp',
      unit: 'Hộp 1L',
      price: 35000,
      totalVal: 630000,
      velocity: '1.2 ngày',
      status: 'critical',
      statusLabel: 'NGUY CẤP',
    },
    {
      sku: 'ING-TEA-002',
      name: 'Trà Ô Long Búp Lộc Xanh',
      desc: 'Bảo Lộc, Lâm Đồng • Túi bạc hút chân không 1kg',
      cat: 'Trà lá',
      actual: '18.2 kg',
      min: '10.0 kg',
      unit: 'kg',
      price: 450000,
      totalVal: 8190000,
      velocity: '15 ngày',
      status: 'safe',
      statusLabel: 'An toàn',
    },
    {
      sku: 'ING-PAC-005',
      name: 'Ly giấy Take-away Size L kèm nắp nóng',
      desc: 'Giấy tráng PLA sinh học tự phân huỷ 16oz',
      cat: 'Bao bì & Vật tư',
      actual: '1.200 cái',
      min: '500 cái',
      unit: 'Cái',
      price: 1200,
      totalVal: 1440000,
      velocity: '9 ngày',
      status: 'safe',
      statusLabel: 'An toàn',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-stock" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded uppercase">
                  Kho Vận & Tồn Trữ
                </span>
                <span>• Thời gian thực (Real-time Sync)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Tổng quan Tồn kho & Trạng thái Nguyên liệu (Stock Overview)
              </h1>
              <p className="text-xs text-stone-500">
                Giám sát mức tồn kho thời gian thực tại các kho chi nhánh, định mức an toàn tối thiểu và giá trị tồn kho toàn chuỗi.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={() => onShowToast?.('Đang kết xuất báo cáo tồn kho PDF và Excel...')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>Xuất báo cáo PDF/Excel</span>
              </button>
              <button
                onClick={() => onNavigate('admin-ingredients')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">outbox</span>
                <span>Tạo phiếu xuất kho</span>
              </button>
              <button
                onClick={() => onShowToast?.('Đã tạo phiếu Restock khẩn cho 4 mặt hàng dưới định mức an toàn!')}
                className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add_alert</span>
                <span>Tạo yêu cầu restock khẩn (+)</span>
              </button>
            </div>
          </div>

          {/* Warehouse Selector */}
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">warehouse</span>
              <strong className="text-stone-800">Kho Đang Xem:</strong>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'hub01', label: 'Kho trung tâm Hub 01' },
                { id: 'cn01', label: 'Kho CN 01 Tràng Tiền' },
                { id: 'cn02', label: 'Kho CN 02 Hoàng Hoa Thám' },
                { id: 'cn03', label: 'Kho CN 03 Lê Duẩn' },
              ].map(w => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWarehouse(w.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-colors ${
                    selectedWarehouse === w.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-stone-400 font-mono">Đồng bộ 3 phút trước</span>
          </div>
        </div>

        {/* 5 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold block">Tổng Giá Trị Tồn</span>
            <span className="text-xl font-black text-stone-900 font-mono block">384.500.000₫</span>
            <span className="text-[11px] text-primary font-bold font-mono">+4.2% vs tuần trước</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold block">Mã SKU Quản Lý</span>
            <span className="text-xl font-black text-stone-900 font-mono block">68</span>
            <span className="text-[11px] text-stone-500">Liên kết POS Barista</span>
          </div>
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 shadow-2xs space-y-1 text-rose-900">
            <span className="text-[10px] uppercase font-bold block text-rose-600">Dưới Mức An Toàn</span>
            <span className="text-xl font-black font-mono block text-rose-700">4 SKU</span>
            <span className="text-[11px] text-rose-700 font-bold">Cần nhập gấp &lt; 24h</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold block">Tồn Kho Chuẩn</span>
            <span className="text-xl font-black text-emerald-700 font-mono block">56 mã</span>
            <span className="text-[11px] text-emerald-700 font-semibold">Đạt 82.3% an toàn</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold block">Tồn Dư / Vòng Chậm</span>
            <span className="text-xl font-black text-amber-800 font-mono block">8 mã</span>
            <span className="text-[11px] text-stone-500">Luân chuyển &gt; 30d</span>
          </div>
        </div>

        {/* Donut and Critical Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Donut Chart (4 cols) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h3 className="font-bold text-sm text-stone-900">Phân Bổ Giá Trị Tồn</h3>
                <span className="text-stone-400">Theo ngành hàng</span>
              </div>
              <p className="text-stone-500 text-[11px] mt-1">Tỷ lệ vốn lưu động đóng băng theo danh mục.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f5f5f4" strokeWidth="4.2" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#900b1a" strokeWidth="4.2" strokeDasharray="38 62" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#904d00" strokeWidth="4.2" strokeDasharray="26 74" strokeDashoffset="-38" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#555f71" strokeWidth="4.2" strokeDasharray="21 79" strokeDashoffset="-64" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#bdc7dc" strokeWidth="4.2" strokeDasharray="15 85" strokeDashoffset="-85" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Tổng Vốn</span>
                  <span className="font-bold text-sm text-stone-900">100%</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-primary" />
                  <span>Cà phê hạt: <strong>38%</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-amber-800" />
                  <span>Sữa & Kem: <strong>26%</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-stone-500" />
                  <span>Trà & Syrup: <strong>21%</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-stone-300" />
                  <span>Bao bì & Ly: <strong>15%</strong></span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex justify-between text-[11px]">
              <span className="text-stone-500">Nguyên liệu lớn nhất:</span>
              <strong className="text-primary">Arabica Cầu Đất (38.4tr)</strong>
            </div>
          </div>

          {/* Velocity & Alerts (8 cols) */}
          <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-stone-900">Tốc Độ Tiêu Thụ & Dự Báo Cạn Kho</h3>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                    4 mặt hàng cấp bách
                  </span>
                </div>
                <span className="text-stone-400 font-mono">Dữ liệu 7 ngày qua</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-rose-700">#ING-CF-001</span>
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">
                    Cạn trong 1.8 ngày
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Arabica Cầu Đất (Rang vừa)</h4>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Tồn: <strong className="text-rose-700 font-mono">12.5 kg</strong></span>
                  <span>Tối thiểu: <strong className="font-mono text-stone-800">25.0 kg</strong></span>
                </div>
                <button
                  onClick={() => onShowToast?.('Đã tạo lệnh PO đặt 50kg Arabica Cầu Đất từ Đắk Lắk Farm Co-op')}
                  className="w-full py-1.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-container"
                >
                  Duyệt Restock ngay
                </button>
              </div>

              <div className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-rose-700">#ING-MLK-004</span>
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">
                    Cạn trong 1.2 ngày
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Sữa tươi thanh trùng Barista</h4>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Tồn: <strong className="text-rose-700 font-mono">18 hộp</strong></span>
                  <span>Tối thiểu: <strong className="font-mono text-stone-800">40 hộp</strong></span>
                </div>
                <button
                  onClick={() => onShowToast?.('Đã tạo lệnh PO bổ sung 120 hộp sữa từ Dalat Milk Supply')}
                  className="w-full py-1.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-container"
                >
                  Duyệt Restock ngay
                </button>
              </div>
            </div>

            {/* In-transit incoming batch */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                <div>
                  <strong className="text-stone-900 block">Lô hàng tiếp theo từ DakLak Farm</strong>
                  <span className="text-stone-500 text-[11px]">Dự kiến giao Hub 01 vào 08:30 sáng mai (120kg hạt rang & 300L sữa)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px]">
                Đang vận chuyển
              </span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Mã SKU</th>
                  <th className="py-2.5 px-3">Tên Nguyên Vật Liệu</th>
                  <th className="py-2.5 px-3">Phân Loại</th>
                  <th className="py-2.5 px-3 text-right">Tồn Thực Tế</th>
                  <th className="py-2.5 px-3 text-right">Min An Toàn</th>
                  <th className="py-2.5 px-3 text-center">ĐVT</th>
                  <th className="py-2.5 px-3 text-right">Giá Bình Quân</th>
                  <th className="py-2.5 px-3 text-right">Tổng Giá Trị</th>
                  <th className="py-2.5 px-3 text-center">Vận Tốc</th>
                  <th className="py-2.5 px-3 text-center">Trạng Thái</th>
                  <th className="py-2.5 px-3 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {stockItems.map(item => (
                  <tr key={item.sku} className="hover:bg-stone-50">
                    <td className="py-2.5 px-3 font-bold text-primary">{item.sku}</td>
                    <td className="py-2.5 px-3 font-sans">
                      <strong className="text-stone-900 block text-xs">{item.name}</strong>
                      <span className="text-[10px] text-stone-400">{item.desc}</span>
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px]">
                        {item.cat}
                      </span>
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold ${
                      item.status === 'critical' ? 'text-rose-600' : 'text-emerald-700'
                    }`}>
                      {item.actual}
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-500">{item.min}</td>
                    <td className="py-2.5 px-3 text-center font-sans text-stone-500">{item.unit}</td>
                    <td className="py-2.5 px-3 text-right text-stone-700">{item.price.toLocaleString('vi-VN')}₫</td>
                    <td className="py-2.5 px-3 text-right font-bold text-stone-900">{item.totalVal.toLocaleString('vi-VN')}₫</td>
                    <td className={`py-2.5 px-3 text-center font-bold ${
                      item.status === 'critical' ? 'text-rose-600' : 'text-stone-700'
                    }`}>
                      {item.velocity}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.statusLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-sans">
                      <button
                        onClick={() => onNavigate('admin-ingredients')}
                        className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-[11px]"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
