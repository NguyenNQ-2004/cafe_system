import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminSettingsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-settings" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Cài đặt Hệ thống & Cửa hàng
          </h1>
          <p className="text-xs text-stone-500">
            Quản lý thông tin chuỗi, cấu hình thuế, phí vận chuyển và kết nối các cổng thanh toán.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <h2 className="font-bold text-sm text-stone-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">store</span>
              Thông tin cửa hàng
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-500 mb-1">Tên thương hiệu</label>
                <input type="text" value="Aura Café" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-stone-500 mb-1">Hotline</label>
                <input type="text" value="1900 1234" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-stone-500 mb-1">Địa chỉ trụ sở</label>
                <input type="text" value="28 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <button className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold w-full mt-2 hover:bg-stone-800 transition-colors">
                Lưu thay đổi
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <h2 className="font-bold text-sm text-stone-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
                Cấu hình Thanh toán
              </h2>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-3 p-3 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-50 transition-colors">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <div className="flex-1">
                    <p className="font-bold text-stone-900">Tiền mặt & Thu hộ (COD)</p>
                    <p className="text-stone-500 text-[10px]">Thanh toán trực tiếp tại quầy hoặc khi nhận hàng</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-50 transition-colors">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <div className="flex-1">
                    <p className="font-bold text-stone-900">VietQR Pro</p>
                    <p className="text-stone-500 text-[10px]">Tự động đối soát chuyển khoản ngân hàng</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
