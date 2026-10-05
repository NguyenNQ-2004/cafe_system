import React from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminSchedulesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminSchedulesPage: React.FC<AdminSchedulesPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-schedules" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Lịch phân ca nhân viên</h1>
          <p className="text-xs text-stone-500">Quản lý và sắp xếp lịch làm việc cho từng nhân viên theo ca.</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Lịch phân ca tuần này</h2>
            <button 
              onClick={() => onShowToast?.('Chức năng thêm lịch phân ca đang được phát triển...')}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Phân ca mới
            </button>
          </div>
          <div className="p-8 text-center text-stone-500 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[48px] text-stone-300 mb-3">calendar_month</span>
            <p className="text-sm font-medium">Lịch làm việc tuần này chưa được sắp xếp.</p>
            <p className="text-xs mt-1">Sử dụng nút "Phân ca mới" để bắt đầu xếp lịch cho nhân viên.</p>
          </div>
        </div>

      </main>
    </div>
  );
};
