import React from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminShiftsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminShiftsPage: React.FC<AdminShiftsPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-shifts" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Cấu hình ca làm việc</h1>
          <p className="text-xs text-stone-500">Định nghĩa các ca làm việc chuẩn (Sáng, Chiều, Tối) trong hệ thống.</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Danh sách Ca làm việc</h2>
            <button 
              onClick={() => onShowToast?.('Mở popup tạo ca làm việc...')}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-stone-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Tạo ca làm
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* Shift Card */}
            <div className="border border-stone-200 rounded-xl p-4 flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-primary transition-colors">Ca Sáng</h3>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Active</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 text-xs mb-3">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>07:00 - 12:00</span>
              </div>
              <p className="text-[11px] text-stone-500 mb-4 line-clamp-2">Ca sáng chuẩn, cần 1 thu ngân và 1 barista.</p>
              <div className="mt-auto pt-3 border-t border-stone-100 flex justify-end">
                <button className="text-xs font-bold text-primary hover:underline">Chỉnh sửa</button>
              </div>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-primary transition-colors">Ca Chiều</h3>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Active</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 text-xs mb-3">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>12:00 - 17:00</span>
              </div>
              <p className="text-[11px] text-stone-500 mb-4 line-clamp-2">Ca chiều, khách thường đông vào tầm 13h - 14h.</p>
              <div className="mt-auto pt-3 border-t border-stone-100 flex justify-end">
                <button className="text-xs font-bold text-primary hover:underline">Chỉnh sửa</button>
              </div>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-primary transition-colors">Ca Tối</h3>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Active</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 text-xs mb-3">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>17:00 - 22:00</span>
              </div>
              <p className="text-[11px] text-stone-500 mb-4 line-clamp-2">Ca tối cần dọn dẹp và chốt sổ cuối ngày.</p>
              <div className="mt-auto pt-3 border-t border-stone-100 flex justify-end">
                <button className="text-xs font-bold text-primary hover:underline">Chỉnh sửa</button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
