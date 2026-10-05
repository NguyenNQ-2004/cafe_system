import React from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminComplaintsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminComplaintsPage: React.FC<AdminComplaintsPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-complaints" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Xử lý Khiếu nại (Complaints)</h1>
          <p className="text-xs text-stone-500">Tiếp nhận và phản hồi các đánh giá, khiếu nại từ khách hàng về chất lượng dịch vụ.</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden animate-in fade-in duration-300">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Nội dung</th>
                <th className="p-4">Đánh giá</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Phản hồi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/50">
                <td className="p-4 font-mono font-bold text-stone-500">#FB102</td>
                <td className="p-4 font-bold text-stone-900">Hoàng Kim</td>
                <td className="p-4 max-w-[200px] truncate">Trà đào hôm nay hơi chua...</td>
                <td className="p-4"><span className="text-amber-500 text-[14px]">⭐⭐</span></td>
                <td className="p-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold">Chờ xử lý</span></td>
                <td className="p-4 text-right"><button onClick={() => onShowToast?.('Mở form phản hồi khách hàng')} className="text-primary font-bold hover:underline">Trả lời</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
