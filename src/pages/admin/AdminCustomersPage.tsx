import React from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminCustomersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminCustomersPage: React.FC<AdminCustomersPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-customers" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Quản lý Khách hàng (CRM)</h1>
          <p className="text-xs text-stone-500">Danh sách tất cả khách hàng đã đăng ký thành viên trên hệ thống.</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden animate-in fade-in duration-300">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Số điện thoại</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Ngày đăng ký</th>
                  <th className="p-4 text-right">Chi tiêu tổng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50">
                  <td className="p-4 font-bold text-stone-900">Hoàng Kim</td>
                  <td className="p-4 font-mono">0987654321</td>
                  <td className="p-4">kim@gmail.com</td>
                  <td className="p-4">12/05/2026</td>
                  <td className="p-4 text-right font-bold text-primary">2,500,000đ</td>
                </tr>
              </tbody>
            </table>
        </div>
      </main>
    </div>
  );
};
