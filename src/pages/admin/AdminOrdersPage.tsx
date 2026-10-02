import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminOrdersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminOrdersPage: React.FC<AdminOrdersPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-orders" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Quản lý Đơn hàng toàn hệ thống
          </h1>
          <p className="text-xs text-stone-500">
            Xem, tìm kiếm và xử lý toàn bộ đơn hàng (Tại quán, Mang đi, Giao hàng) của tất cả chi nhánh.
          </p>
          <div className="flex gap-2 pt-2">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">search</span>
              <input type="text" placeholder="Tìm theo mã đơn, SĐT khách..." className="w-full pl-9 pr-4 py-2 bg-stone-100 border-none rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <button 
              onClick={() => onShowToast?.('Chức năng "Lọc đơn hàng" đang được phát triển!')}
              className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-stone-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Lọc
            </button>
            <button 
              onClick={() => onShowToast?.('Chức năng "Xuất Excel" đang được phát triển!')}
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
          <div className="p-12 text-center flex flex-col items-center justify-center text-stone-400">
            <span className="material-symbols-outlined text-4xl mb-3 opacity-20">receipt_long</span>
            <p className="text-sm font-medium">Đang tải dữ liệu đơn hàng...</p>
          </div>
        </div>
      </main>
    </div>
  );
};
