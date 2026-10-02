import React, { useState } from 'react';
import { PageRoute, DbUser } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminUsersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ onNavigate, onShowToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<DbUser> | null>(null);

  const handleOpenModal = (user: any = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    onShowToast?.(editingUser ? 'Cập nhật nhân viên thành công!' : 'Đã thêm nhân viên mới!');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-users" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Quản lý Tài khoản & Nhân sự</h1>
          <p className="text-xs text-stone-500">Quản lý phân quyền, tạo tài khoản cho nhân viên (Thu ngân, Pha chế, Shipper) và theo dõi lịch sử truy cập.</p>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Thêm nhân viên mới
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Danh sách nhân viên</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Họ và tên</th>
                  <th className="p-4">Chức vụ</th>
                  <th className="p-4">Tài khoản (SĐT)</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">Nguyễn Văn A</td>
                  <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">Thu ngân</span></td>
                  <td className="p-4 text-stone-600">0987654321</td>
                  <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Đang làm việc</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenModal({ full_name: 'Nguyễn Văn A', role: 'CASHIER', phone: '0987654321' })} className="text-primary font-bold hover:underline">Sửa</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">Trần Thị B</td>
                  <td className="p-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">Pha chế (KDS)</span></td>
                  <td className="p-4 text-stone-600">0912345678</td>
                  <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Đang làm việc</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenModal({ full_name: 'Trần Thị B', role: 'BARISTA', phone: '0912345678' })} className="text-primary font-bold hover:underline">Sửa</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">Lê Văn C</td>
                  <td className="p-4"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-[10px] font-bold">Shipper</span></td>
                  <td className="p-4 text-stone-600">0909090909</td>
                  <td className="p-4"><span className="px-2 py-1 bg-stone-100 text-stone-500 rounded text-[10px] font-bold">Nghỉ phép</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenModal({ full_name: 'Lê Văn C', role: 'DELIVERY_STAFF', phone: '0909090909' })} className="text-primary font-bold hover:underline">Sửa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Nhân viên */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-stone-50">
              <h3 className="font-bold text-stone-900 text-sm">
                {editingUser ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Họ và tên</label>
                <input required defaultValue={editingUser?.full_name} type="text" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" placeholder="VD: Nguyễn Văn A" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Số điện thoại (Tài khoản đăng nhập)</label>
                <input required defaultValue={editingUser?.phone} type="tel" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" placeholder="VD: 0987654321" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Mật khẩu</label>
                <input required={!editingUser} type="password" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" placeholder={editingUser ? "(Bỏ trống nếu không đổi)" : "Nhập mật khẩu"} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Chức vụ / Phân quyền</label>
                <select defaultValue={editingUser?.role} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm">
                  <option value="CASHIER">Thu ngân (POS)</option>
                  <option value="BARISTA">Pha chế (KDS)</option>
                  <option value="DELIVERY_STAFF">Giao hàng (Shipper)</option>
                  <option value="ADMIN">Quản lý (Admin)</option>
                  <option value="STAFF">Nhân viên (Staff)</option>
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs hover:bg-stone-200">
                  Hủy bỏ
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-amber-600">
                  {editingUser ? 'Lưu thay đổi' : 'Tạo tài khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
