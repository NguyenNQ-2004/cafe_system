import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminPurchasesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminPurchasesPage: React.FC<AdminPurchasesPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-purchases" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Quản lý Nhập hàng & Nhà cung cấp
          </h1>
          <p className="text-xs text-stone-500">
            Tạo đơn đặt hàng (PO), theo dõi công nợ nhà cung cấp và lịch sử nhập kho nguyên vật liệu.
          </p>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => onShowToast?.('Chức năng "Tạo phiếu nhập" đang được phát triển!')}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo phiếu nhập (PO)
            </button>
            <button 
              onClick={() => onShowToast?.('Chức năng "Quản lý NCC" đang được phát triển!')}
              className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-stone-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">store</span>
              Quản lý Nhà cung cấp
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Lịch sử phiếu nhập gần đây</h2>
          </div>
          <div className="p-12 text-center flex flex-col items-center justify-center text-stone-400">
            <span className="material-symbols-outlined text-4xl mb-3 opacity-20">inventory</span>
            <p className="text-sm font-medium">Chưa có dữ liệu nhập hàng</p>
            <p className="text-xs mt-1">Dữ liệu sẽ hiển thị khi bạn tạo phiếu nhập mới.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
