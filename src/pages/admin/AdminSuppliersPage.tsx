import React from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminSuppliersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminSuppliersPage: React.FC<AdminSuppliersPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-suppliers" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Quản lý Nhà cung cấp</h1>
          <p className="text-xs text-stone-500">Thiết lập thông tin đối tác, nhà cung cấp nguyên vật liệu cho hệ thống quán.</p>
          <div className="pt-2">
            <button 
              onClick={() => onShowToast?.('Mở form thêm nhà cung cấp')}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Thêm NCC
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden animate-in fade-in duration-300">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Tên Nhà Cung Cấp</th>
                  <th className="p-4">Người liên hệ</th>
                  <th className="p-4">Số điện thoại</th>
                  <th className="p-4">Mặt hàng</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50">
                  <td className="p-4 font-bold text-stone-900">CTY TNHH Cà Phê Trung Nguyên</td>
                  <td className="p-4">Anh Bình</td>
                  <td className="p-4 font-mono">0901234567</td>
                  <td className="p-4">Cà phê hạt, bột</td>
                  <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Hoạt động</span></td>
                  <td className="p-4 text-right"><button className="text-primary font-bold hover:underline">Sửa</button></td>
                </tr>
              </tbody>
            </table>
        </div>
      </main>
    </div>
  );
};
