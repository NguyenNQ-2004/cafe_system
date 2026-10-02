import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminVouchersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminVouchersPage: React.FC<AdminVouchersPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-vouchers" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Khuyến mãi & Voucher
          </h1>
          <p className="text-xs text-stone-500">
            Thiết lập các chương trình giảm giá, tặng mã khuyến mãi cho khách hàng và theo dõi hiệu quả chiến dịch.
          </p>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => onShowToast?.('Chức năng "Tạo Voucher mới" đang được phát triển!')}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo Voucher mới
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Đang chạy</span>
                <h3 className="font-bold text-sm mt-2 text-stone-900">AURAFREESHIP</h3>
                <p className="text-xs text-stone-500">Miễn phí giao hàng đơn từ 150k</p>
              </div>
              <span className="material-symbols-outlined text-stone-300">local_shipping</span>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-between text-xs mt-2">
              <span className="text-stone-500">Đã dùng: <strong className="text-stone-900">142/500</strong></span>
              <button 
                onClick={() => onShowToast?.('Chức năng "Chỉnh sửa Voucher" đang được phát triển!')}
                className="text-primary font-bold hover:underline"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 opacity-60">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-stone-100 text-stone-500 text-[10px] font-bold rounded uppercase">Đã kết thúc</span>
                <h3 className="font-bold text-sm mt-2 text-stone-900">MUA1TANG1</h3>
                <p className="text-xs text-stone-500">Khuyến mãi khai trương tháng 9</p>
              </div>
              <span className="material-symbols-outlined text-stone-300">card_giftcard</span>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-between text-xs mt-2">
              <span className="text-stone-500">Đã dùng: <strong className="text-stone-900">890/1000</strong></span>
              <button 
                onClick={() => onShowToast?.('Chức năng "Xem thống kê" đang được phát triển!')}
                className="text-stone-400 font-bold hover:underline"
              >
                Xem thống kê
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
