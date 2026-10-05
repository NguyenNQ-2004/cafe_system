import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminAttendancePageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminAttendancePage: React.FC<AdminAttendancePageProps> = ({ onNavigate, onShowToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleEdit = (data: any) => {
    setEditingData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-attendance" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Quản lý Chấm công</h1>
          <p className="text-xs text-stone-500">Theo dõi thời gian vào/ra ca và trạng thái làm việc thực tế của nhân viên.</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b border-stone-100 flex flex-wrap gap-3 justify-between items-center bg-stone-50/50">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-sm text-stone-800">Bảng chấm công ngày hôm nay</h2>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-primary" />
            </div>
            <button 
              onClick={() => onShowToast?.('Đang kết xuất báo cáo chấm công ra Excel...')}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Xuất Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Nhân viên</th>
                  <th className="p-4">Ca làm việc</th>
                  <th className="p-4">Giờ Check-in</th>
                  <th className="p-4">Giờ Check-out</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Thao tác Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">Nguyễn Văn A</td>
                  <td className="p-4">Ca Sáng (07:00 - 12:00)</td>
                  <td className="p-4 text-stone-900 font-mono">06:55</td>
                  <td className="p-4 text-stone-400 font-mono">--:--</td>
                  <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">PRESENT (Đúng giờ)</span></td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => handleEdit({ name: 'Nguyễn Văn A', checkIn: '06:55', checkOut: '' })} className="text-primary font-bold hover:underline">Sửa giờ</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">Trần Thị B</td>
                  <td className="p-4">Ca Sáng (07:00 - 12:00)</td>
                  <td className="p-4 text-amber-600 font-mono">07:15</td>
                  <td className="p-4 text-stone-400 font-mono">--:--</td>
                  <td className="p-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">LATE (Đi muộn)</span></td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => handleEdit({ name: 'Trần Thị B', checkIn: '07:15', checkOut: '' })} className="text-primary font-bold hover:underline">Sửa giờ</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">Lê Văn C</td>
                  <td className="p-4">Ca Chiều (12:00 - 17:00)</td>
                  <td className="p-4 text-stone-400 font-mono">--:--</td>
                  <td className="p-4 text-stone-400 font-mono">--:--</td>
                  <td className="p-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold">ABSENT (Vắng)</span></td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => handleEdit({ name: 'Lê Văn C', checkIn: '', checkOut: '' })} className="text-primary font-bold hover:underline">Sửa giờ</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-stone-50">
              <h3 className="font-bold text-stone-900 text-sm">Chỉnh sửa giờ chấm công</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); onShowToast?.('Cập nhật giờ thành công!'); }} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Nhân viên</label>
                <input disabled defaultValue={editingData?.name} type="text" className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm font-bold text-stone-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">Giờ Check-in</label>
                  <input type="time" defaultValue={editingData?.checkIn} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">Giờ Check-out</label>
                  <input type="time" defaultValue={editingData?.checkOut} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Lý do điều chỉnh (Admin)</label>
                <input required type="text" placeholder="VD: Quên bấm thẻ" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs hover:bg-stone-200">
                  Hủy
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-amber-600">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
