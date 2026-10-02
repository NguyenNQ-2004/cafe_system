import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminOrdersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminOrdersPage: React.FC<AdminOrdersPageProps> = ({ onNavigate, onShowToast }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-orders" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Quản lý Đơn hàng toàn hệ thống</h1>
          <p className="text-xs text-stone-500">Xem, tìm kiếm và xử lý toàn bộ đơn hàng (Tại quán, Mang đi, Giao hàng) của tất cả chi nhánh.</p>
          <div className="flex gap-2 pt-2">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">search</span>
              <input type="text" placeholder="Tìm theo mã đơn, SĐT khách..." className="w-full pl-9 pr-4 py-2 bg-stone-100 border-none rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-stone-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Lọc
            </button>
            <button 
              onClick={() => onShowToast?.('Đang xuất file Excel...')}
              className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-stone-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất Excel
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Danh sách đơn hàng (Hôm nay)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Mã Đơn</th>
                  <th className="p-4">Thời gian</th>
                  <th className="p-4">Loại hình</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">#AUR-89241</td>
                  <td className="p-4 text-stone-500">14:32</td>
                  <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold border border-blue-100">Giao hàng</span></td>
                  <td className="p-4 text-stone-600">0912xxx999</td>
                  <td className="p-4 font-mono font-bold">179,000đ</td>
                  <td className="p-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">Đang giao</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => onShowToast?.('Mở chi tiết đơn hàng...')} className="text-primary font-bold hover:underline">Xem</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">#AUR-89240</td>
                  <td className="p-4 text-stone-500">14:15</td>
                  <td className="p-4"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-[10px] font-bold border border-purple-100">Dùng tại quán</span></td>
                  <td className="p-4 text-stone-600">Khách lẻ</td>
                  <td className="p-4 font-mono font-bold">85,000đ</td>
                  <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Hoàn thành</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => onShowToast?.('Mở chi tiết đơn hàng...')} className="text-primary font-bold hover:underline">Xem</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">#AUR-89239</td>
                  <td className="p-4 text-stone-500">13:50</td>
                  <td className="p-4"><span className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-[10px] font-bold border border-stone-200">Mang đi (Takeaway)</span></td>
                  <td className="p-4 text-stone-600">0988xxx123</td>
                  <td className="p-4 font-mono font-bold">120,000đ</td>
                  <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Hoàn thành</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => onShowToast?.('Mở chi tiết đơn hàng...')} className="text-primary font-bold hover:underline">Xem</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors opacity-50">
                  <td className="p-4 font-bold text-stone-900">#AUR-89238</td>
                  <td className="p-4 text-stone-500">13:10</td>
                  <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold border border-blue-100">Giao hàng</span></td>
                  <td className="p-4 text-stone-600">0902xxx456</td>
                  <td className="p-4 font-mono font-bold">45,000đ</td>
                  <td className="p-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold">Đã hủy</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => onShowToast?.('Mở chi tiết đơn hàng...')} className="text-primary font-bold hover:underline">Xem</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Filter */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col p-5">
            <h3 className="font-bold text-stone-900 text-sm mb-4">Lọc Đơn Hàng</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-600">Trạng thái</label>
                <select className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm">
                  <option>Tất cả trạng thái</option>
                  <option>Chờ xử lý</option>
                  <option>Đang pha chế</option>
                  <option>Đang giao hàng</option>
                  <option>Hoàn thành</option>
                  <option>Đã hủy</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-600">Nguồn đơn</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50"><input type="checkbox" className="accent-primary" defaultChecked /> Dùng tại quán</label>
                  <label className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50"><input type="checkbox" className="accent-primary" defaultChecked /> Mang đi</label>
                  <label className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50"><input type="checkbox" className="accent-primary" defaultChecked /> Đặt giao hàng</label>
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex gap-3">
              <button onClick={() => setIsFilterOpen(false)} className="flex-1 px-4 py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs hover:bg-stone-200">Hủy</button>
              <button onClick={() => { setIsFilterOpen(false); onShowToast?.('Đã áp dụng bộ lọc!'); }} className="flex-1 px-4 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-amber-600">Áp dụng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
