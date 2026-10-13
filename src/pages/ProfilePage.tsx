import React, { useState } from 'react';
import { PageRoute } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface ProfilePageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (message: string) => void;
}

const pointHistories = [
  { id: 'h1', date: '20/10/2026 15:30', action: 'Tích điểm đơn hàng #AUR-86410', points: '+116', balance: '450 điểm', type: 'plus' },
  { id: 'h2', date: '14/10/2026 08:20', action: 'Tích điểm đơn hàng #AUR-81209', points: '+65', balance: '334 điểm', type: 'plus' },
  { id: 'h3', date: '10/10/2026 19:10', action: 'Đổi điểm cho đơn hàng #AUR-12435', points: '-150', balance: '269 điểm', type: 'minus' },
  { id: 'h4', date: '02/10/2026 11:18', action: 'Hoàn điểm đơn hàng #AUR-79012', points: '+145', balance: '419 điểm', type: 'plus' },
];

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'loyalty' | 'security'>('info');

  const [formData, setFormData] = useState({
    name: INITIAL_USER.name,
    phone: INITIAL_USER.phone,
    email: INITIAL_USER.email,
    birthday: INITIAL_USER.birthday,
    gender: INITIAL_USER.gender,
    address: INITIAL_USER.address
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast?.('Đã cập nhật thông tin cá nhân thành công!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      onShowToast?.('Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.');
      return;
    }
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    onShowToast?.('Đổi mật khẩu tài khoản thành công!');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-4">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 py-2 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Trang chủ</button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-stone-800 font-semibold">Tài khoản cá nhân</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-bold">Screen 2 • UC05</span>
        </div>

        {/* User Card Hero */}
        <section className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-7 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={INITIAL_USER.avatar}
                  alt={formData.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-primary/20 shadow-md bg-stone-100"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-0.5 shadow-xs">
                  <span className="material-symbols-outlined text-[10px]">phone_iphone</span>
                  SĐT
                </span>
              </div>
              <div className="space-y-0.5">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">{formData.name}</h1>
                <p className="text-xs text-stone-500 font-mono flex items-center gap-2">
                  <span>{formData.phone}</span>
                  <span>•</span>
                  <span>Mã TV: {INITIAL_USER.memberId}</span>
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">phone_iphone</span>
                    Tích điểm theo SĐT
                  </span>
                  <span className="text-xs text-stone-400">Tham gia từ: {INITIAL_USER.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="sm:text-right bg-stone-50 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-stone-100">
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider block">Điểm thưởng Aura</span>
              <p className="text-3xl font-black text-primary font-mono">{INITIAL_USER.points} <span className="text-sm font-semibold">điểm</span></p>
              <p className="text-xs text-stone-500 mt-0.5">Tương đương <strong>{(INITIAL_USER.points * 100).toLocaleString('vi-VN')}₫</strong> giảm trừ</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-stone-100 mt-6 pt-2 gap-2 text-xs font-bold overflow-x-auto">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              Thông tin cá nhân (Profile)
            </button>
            <button
              onClick={() => setActiveTab('loyalty')}
              className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'loyalty' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">loyalty</span>
              Điểm tích lũy & Lịch sử (Loyalty)
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Bảo mật & Đổi mật khẩu
            </button>
          </div>
        </section>

        {/* Tab 1: Personal Information Form (UC05: View and update personal information) */}
        {activeTab === 'info' && (
          <section className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Thông tin cá nhân</h2>
              <p className="text-xs text-stone-500">Cập nhật hồ sơ để nhận quà tặng sinh nhật và phục vụ giao hàng chuẩn xác.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Số điện thoại (Tài khoản) *</label>
                  <input
                    type="text"
                    disabled
                    value={formData.phone}
                    className="w-full px-3.5 py-2.5 border border-stone-200 bg-stone-50 rounded-xl outline-none text-stone-500 font-mono"
                    title="Số điện thoại là định danh tài khoản, không thể thay đổi."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Địa chỉ Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Ngày sinh (Nhận quà sinh nhật)</label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Địa chỉ giao hàng mặc định</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..."
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Các trường đánh dấu (*) là bắt buộc</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-xs flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Lưu thay đổi hồ sơ
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Tab 2: Loyalty & Points (Screen 29) */}
        {activeTab === 'loyalty' && (
          <section className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden animate-in fade-in duration-200">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center gap-3">
              <div>
                <h2 className="font-bold text-stone-900 text-base">Lịch sử tích & đổi điểm thưởng theo Số Điện Thoại</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Điểm thưởng được gắn trực tiếp vào SĐT <strong>{formData.phone}</strong>. Cứ mỗi 100 điểm tương đương 10.000₫ khi thanh toán đơn hàng.
                </p>
              </div>
              <button
                onClick={() => onShowToast?.('Đã xuất lịch sử điểm tích lũy thành công!')}
                className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                Xuất file
              </button>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {pointHistories.map(item => (
                <article key={item.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50/70 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                      item.type === 'plus' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <span className="material-symbols-outlined text-lg">{item.type === 'plus' ? 'add_circle' : 'remove_circle'}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-900 truncate">{item.action}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right ml-3 shrink-0">
                    <p className={`text-sm font-bold font-mono ${item.type === 'plus' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.points}
                    </p>
                    <p className="text-[10px] text-stone-400">Số dư: {item.balance}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Security & Change Password (UC04) */}
        {activeTab === 'security' && (
          <section className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Bảo mật & Đổi mật khẩu</h2>
              <p className="text-xs text-stone-500">Đổi mật khẩu định kỳ để bảo vệ tài khoản thành viên của bạn.</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  required
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-xs"
                >
                  Cập nhật mật khẩu mới
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};
