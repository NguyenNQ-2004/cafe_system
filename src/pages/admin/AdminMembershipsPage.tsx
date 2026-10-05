import React from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminMembershipsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminMembershipsPage: React.FC<AdminMembershipsPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-memberships" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Hạng Thành Viên & Loyalty</h1>
          <p className="text-xs text-stone-500">Cấu hình các hạng thẻ (Đồng, Bạc, Vàng, Kim Cương) và tỷ lệ tích điểm thưởng.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-stone-200 rounded-xl p-5 bg-white shadow-2xs hover:border-primary transition-colors cursor-pointer group">
              <h3 className="font-black text-stone-400 text-lg group-hover:text-primary transition-colors">SILVER (Bạc)</h3>
              <p className="text-xs mt-2 font-bold text-stone-700">Mức chi tiêu: Dưới 1.000.000đ</p>
              <p className="text-xs text-stone-500 mt-1">Tỷ lệ tích điểm: 1%</p>
            </div>
            <div className="border border-stone-200 rounded-xl p-5 bg-white shadow-2xs hover:border-primary transition-colors cursor-pointer group">
              <h3 className="font-black text-amber-500 text-lg group-hover:text-primary transition-colors">GOLD (Vàng)</h3>
              <p className="text-xs mt-2 font-bold text-stone-700">Mức chi tiêu: 1.000.000đ - 5.000.000đ</p>
              <p className="text-xs text-stone-500 mt-1">Tỷ lệ tích điểm: 3%</p>
            </div>
            <div className="border border-stone-200 rounded-xl p-5 bg-white shadow-2xs hover:border-primary transition-colors cursor-pointer group">
              <h3 className="font-black text-purple-600 text-lg group-hover:text-primary transition-colors">DIAMOND (Kim cương)</h3>
              <p className="text-xs mt-2 font-bold text-stone-700">Mức chi tiêu: Trên 5.000.000đ</p>
              <p className="text-xs text-stone-500 mt-1">Tỷ lệ tích điểm: 5%</p>
            </div>
        </div>
      </main>
    </div>
  );
};
