import React, { useState } from 'react';
import { PageRoute, UserProfile } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface ProfilePageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onShowToast }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<'rewards' | 'history' | 'benefits' | 'account'>('rewards');
  const [redeemedVouchers, setRedeemedVouchers] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    birthday: user.birthday,
    gender: user.gender,
    address: user.address,
  });

  const rewards = [
    {
      id: 'r1',
      title: 'Voucher Giảm 15.000đ cho đơn từ 60.000đ',
      points: 100,
      badge: 'Phổ biến',
      expiry: 'HSD: 30 ngày kể từ ngày đổi',
      icon: 'local_activity',
      available: true
    },
    {
      id: 'r2',
      title: 'Free 01 Bánh Croissant Bơ Pháp khi mua đồ uống',
      points: 180,
      badge: 'Best match',
      expiry: 'HSD: 14 ngày kể từ ngày đổi',
      icon: 'bakery_dining',
      available: true
    },
    {
      id: 'r3',
      title: 'Voucher Giảm 50.000đ hóa đơn cà phê rang xay',
      points: 300,
      badge: 'Hạng Vàng',
      expiry: 'HSD: 45 ngày',
      icon: 'card_giftcard',
      available: true
    },
    {
      id: 'r4',
      title: 'Ly giữ nhiệt Aura Eco Tumbler 500ml Edition',
      points: 600,
      badge: 'Quà tặng hiện vật',
      expiry: 'Nhận tại quầy Aura bất kỳ',
      icon: 'coffee',
      available: false
    }
  ];

  const pointHistories = [
    {
      id: 'h1',
      date: '20/10/2024 15:30',
      action: 'Tích điểm đơn hàng #AUR-86410',
      points: '+116',
      type: 'plus',
      balance: '450 pts'
    },
    {
      id: 'h2',
      date: '14/10/2024 08:20',
      action: 'Tích điểm đơn hàng #AUR-81209',
      points: '+65',
      type: 'plus',
      balance: '334 pts'
    },
    {
      id: 'h3',
      date: '10/10/2024 19:10',
      action: 'Đổi E-Voucher Freeship 25k #VCH-FS25',
      points: '-150',
      type: 'minus',
      balance: '269 pts'
    },
    {
      id: 'h4',
      date: '02/10/2024 11:18',
      action: 'Hoàn điểm huỷ đơn hàng #AUR-79012',
      points: '+145',
      type: 'plus',
      balance: '419 pts'
    },
    {
      id: 'h5',
      date: '24/09/2024 09:00',
      action: 'Thưởng sinh nhật thành viên Gold',
      points: '+100',
      type: 'plus',
      balance: '274 pts'
    }
  ];

  const handleRedeem = (id: string, cost: number, title: string) => {
    if (user.points < cost) {
      onShowToast?.('Bạn chưa đủ điểm tích luỹ để đổi phần quà này!');
      return;
    }
    setUser(prev => ({ ...prev, points: prev.points - cost }));
    setRedeemedVouchers(prev => [...prev, id]);
    onShowToast?.(`Đã đổi thành công quà: "${title}". Kiểm tra tại Giỏ hàng hoặc Ví voucher!`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
    onShowToast?.('Cập nhật hồ sơ hội viên thành công!');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 py-3 mb-2 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">
            Trang chủ
          </button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-stone-800 font-semibold">Tài khoản & Aura Privilege Club</span>
        </div>

        {/* Top Hero: Member Card & Quick Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Card Digital VIP */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#730815] via-[#900b1a] to-[#45020a] p-6 sm:p-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -mb-16 w-48 h-48 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 backdrop-blur-md border border-amber-300/30 flex items-center justify-center text-amber-300">
                    <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold tracking-wide text-amber-200 uppercase">
                      Aura Privilege Club
                    </h2>
                    <p className="text-xs text-white/70">Thành viên thân thiết cấp cao</p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[15px]">stars</span>
                  Hạng {user.tier}
                </div>
              </div>

              {/* Middle: User & Points */}
              <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-widest font-mono">Chủ thẻ</p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight">{user.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm tracking-wider text-white/80">{user.memberId}</span>
                    <button 
                      onClick={() => onShowToast?.('Đã sao chép mã hội viên!')}
                      className="text-white/60 hover:text-white"
                      title="Sao chép mã"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                  </div>
                </div>

                <div className="sm:text-right bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/15">
                  <p className="text-xs text-amber-200 uppercase tracking-wider font-semibold">Điểm tích luỹ Aura</p>
                  <p className="text-3xl font-extrabold text-white tracking-tight">
                    {user.points} <span className="text-base font-normal text-amber-300">pts</span>
                  </p>
                  <p className="text-[11px] text-white/70 mt-0.5">≈ {(user.points * 100).toLocaleString('vi-VN')}₫ trừ trực tiếp hóa đơn</p>
                </div>
              </div>

              {/* Bottom: Progress to Next Tier */}
              <div className="pt-2 border-t border-white/15">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-white/80">
                    Cần <strong className="text-amber-300">350 điểm</strong> nữa để thăng hạng <strong>Kim Cương</strong>
                  </span>
                  <span className="font-mono text-amber-200">450 / 800</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/30 overflow-hidden p-0.5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200 shadow-sm"
                    style={{ width: '56.25%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Barcode & Counter Scanning card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/70 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">qr_code_2</span>
                  Mã tích điểm tại quầy
                </h3>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                  Tự động làm mới
                </span>
              </div>

              <div className="bg-stone-50 border border-dashed border-stone-300 rounded-xl p-4 flex flex-col items-center justify-center my-2">
                {/* Simulated Barcode */}
                <div className="w-full flex justify-center items-center py-2 px-3 bg-white rounded-lg shadow-inner">
                  <div className="flex items-center justify-center gap-[3px] h-14 w-full max-w-[200px]">
                    {[4,2,6,1,3,7,2,5,3,1,6,4,2,3,5,2,4,7,3,2,6,1,4,5,2].map((w, idx) => (
                      <div 
                        key={idx} 
                        className="bg-stone-900 h-full rounded-xs" 
                        style={{ width: `${w * 1.5}px` }} 
                      />
                    ))}
                  </div>
                </div>
                <p className="font-mono text-xs tracking-[0.25em] text-stone-700 mt-2 font-bold">
                  893456799810
                </p>
                <p className="text-[11px] text-stone-500 mt-1 text-center">
                  Đưa thu ngân quét mã để tích điểm hoặc áp dụng ưu đãi hội viên
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                Bảo mật mã OTP 1-time
              </span>
              <button 
                onClick={() => onShowToast?.('Mã quét đã được làm mới an toàn!')}
                className="text-primary hover:underline font-medium flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                Làm mới
              </button>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-white rounded-xl border border-stone-200/80 p-1.5 mb-6 shadow-xs flex flex-wrap gap-1">
          {[
            { id: 'rewards', label: 'Đổi quà & Ưu đãi', icon: 'redeem' },
            { id: 'history', label: 'Lịch sử tích điểm', icon: 'history' },
            { id: 'benefits', label: 'Đặc quyền thứ hạng', icon: 'military_tech' },
            { id: 'account', label: 'Thông tin tài khoản', icon: 'manage_accounts' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Rewards Store */}
        {activeTab === 'rewards' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Gian hàng đổi điểm Aura Rewards</h3>
                <p className="text-xs text-stone-500">Đổi điểm tích luỹ lấy voucher giảm giá và quà tặng thương hiệu</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500">Số điểm hiện có:</span>
                <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-bold">
                  {user.points} pts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewards.map(item => {
                const isRedeemed = redeemedVouchers.includes(item.id);
                const canAfford = user.points >= item.points;

                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="font-bold text-stone-900 text-sm line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 mb-4">{item.expiry}</p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-stone-500">Điểm cần:</span>
                        <p className="font-extrabold text-primary text-base">{item.points} pts</p>
                      </div>

                      <button
                        onClick={() => handleRedeem(item.id, item.points, item.title)}
                        disabled={isRedeemed || !canAfford || !item.available}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isRedeemed
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : canAfford && item.available
                            ? 'bg-primary text-white hover:bg-primary-container shadow-xs active:scale-95'
                            : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        {isRedeemed ? 'Đã đổi' : !item.available ? 'Hết hàng' : canAfford ? 'Đổi ngay' : 'Thiếu điểm'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Point History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-stone-900 text-base">Lịch sử biến động điểm thưởng</h3>
                <p className="text-xs text-stone-500">Theo dõi chi tiết các lần tích và tiêu điểm của bạn</p>
              </div>
              <button 
                onClick={() => onShowToast?.('Đã xuất báo cáo sao kê điểm về email của bạn!')}
                className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                Xuất sao kê
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {pointHistories.map(h => (
                <div key={h.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      h.type === 'plus' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <span className="material-symbols-outlined text-lg">
                        {h.type === 'plus' ? 'add_circle' : 'remove_circle'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{h.action}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{h.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-base font-bold ${
                      h.type === 'plus' ? 'text-emerald-600' : 'text-stone-900'
                    }`}>
                      {h.points}
                    </p>
                    <p className="text-[11px] text-stone-400">Số dư: {h.balance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Tier Benefits */}
        {activeTab === 'benefits' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Silver */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">workspace_premium</span>
              </div>
              <h4 className="font-bold text-base text-stone-900">Hạng Bạc (Silver)</h4>
              <p className="text-xs text-stone-500 mb-4">Dành cho khách hàng mới gia nhập</p>
              <div className="text-sm font-bold text-stone-800 pb-3 border-b border-stone-100 mb-4">
                0 - 299 Điểm tích lũy
              </div>
              <ul className="space-y-3 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                  <span>Tích luỹ 5% trên mỗi hóa đơn thanh toán</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                  <span>Tặng E-voucher 20.000đ mừng gia nhập</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                  <span>Nhận tin ưu đãi độc quyền qua ứng dụng</span>
                </li>
              </ul>
            </div>

            {/* Gold (Current) */}
            <div className="bg-gradient-to-b from-amber-50/50 to-white rounded-2xl border-2 border-amber-400 p-6 shadow-md relative">
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-bold uppercase">
                Hạng hiện tại của bạn
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">stars</span>
              </div>
              <h4 className="font-bold text-base text-stone-900">Hạng Vàng (Gold)</h4>
              <p className="text-xs text-stone-500 mb-4">Dành cho tín đồ cà phê Aura thân thiết</p>
              <div className="text-sm font-bold text-amber-700 pb-3 border-b border-amber-200 mb-4">
                300 - 799 Điểm tích lũy
              </div>
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2 font-medium">
                  <span className="material-symbols-outlined text-amber-600 text-[16px]">check_circle</span>
                  <span>Tích luỹ 10% trên mỗi đơn hàng</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <span className="material-symbols-outlined text-amber-600 text-[16px]">check_circle</span>
                  <span>Tặng 01 bánh ngọt miễn phí vào tháng sinh nhật</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <span className="material-symbols-outlined text-amber-600 text-[16px]">check_circle</span>
                  <span>Miễn phí nâng cấp kích cỡ ly (Upsize) thứ 3 hàng tuần</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <span className="material-symbols-outlined text-amber-600 text-[16px]">check_circle</span>
                  <span>Ưu tiên pha chế và xử lý đơn hỏa tốc</span>
                </li>
              </ul>
            </div>

            {/* Diamond */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">diamond</span>
              </div>
              <h4 className="font-bold text-base text-stone-900">Hạng Kim Cương (Diamond)</h4>
              <p className="text-xs text-stone-500 mb-4">Đặc quyền tối thượng dành riêng cho VIP</p>
              <div className="text-sm font-bold text-purple-700 pb-3 border-b border-stone-100 mb-4">
                Từ 800 Điểm trở lên
              </div>
              <ul className="space-y-3 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-purple-600 text-[16px]">check_circle</span>
                  <span>Tích luỹ 15% không giới hạn giá trị</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-purple-600 text-[16px]">check_circle</span>
                  <span>Miễn phí giao hàng trọn đời mọi đơn từ 50k</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-purple-600 text-[16px]">check_circle</span>
                  <span>Mời tham dự workshop thử nếm cà phê đặc sản cao cấp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-purple-600 text-[16px]">check_circle</span>
                  <span>Đường dây nóng CSKH hỗ trợ riêng biệt 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Account Information */}
        {activeTab === 'account' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Avatar & Identity */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs text-center flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow-md"
                />
                <button 
                  onClick={() => onShowToast?.('Tính năng đổi ảnh đại diện đang kết nối thư viện ảnh!')}
                  className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary-container"
                  title="Đổi ảnh đại diện"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                </button>
              </div>

              <h4 className="font-bold text-lg text-stone-900">{user.name}</h4>
              <p className="text-xs text-stone-500 font-mono mt-0.5">{user.memberId}</p>

              <div className="mt-4 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold">
                Thành viên Aura từ {user.joinDate}
              </div>

              <div className="w-full mt-6 pt-6 border-t border-stone-100 space-y-3 text-left text-xs">
                <div className="flex justify-between items-center text-stone-600">
                  <span>Trạng thái tài khoản:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Đã xác thực
                  </span>
                </div>
                <div className="flex justify-between items-center text-stone-600">
                  <span>Xác thực 2 yếu tố (2FA):</span>
                  <span className="text-stone-900 font-semibold">{user.twoFactorEnabled ? 'Bật (SMS OTP)' : 'Tắt'}</span>
                </div>
              </div>
            </div>

            {/* Right: Editable Details Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
              <div className="flex justify-between items-center pb-4 mb-5 border-b border-stone-100">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Thông tin cá nhân & Địa chỉ</h3>
                  <p className="text-xs text-stone-500">Quản lý dữ liệu để nhận quà sinh nhật và giao hàng nhanh</p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3.5 py-1.5 rounded-lg border border-primary text-primary text-xs font-bold hover:bg-primary/5 transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Chỉnh sửa
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-stone-500 text-xs font-medium hover:text-stone-800"
                  >
                    Hủy bỏ
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Họ và tên</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-primary disabled:bg-stone-50 disabled:text-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Số điện thoại</label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-primary disabled:bg-stone-50 disabled:text-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Địa chỉ Email</label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-primary disabled:bg-stone-50 disabled:text-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Ngày sinh nhật (Nhận quà VIP)</label>
                    <input
                      type="date"
                      disabled={!isEditing}
                      value={formData.birthday}
                      onChange={e => setFormData({ ...formData, birthday: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-primary disabled:bg-stone-50 disabled:text-stone-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Địa chỉ nhận hàng mặc định</label>
                  <textarea
                    rows={2}
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-primary disabled:bg-stone-50 disabled:text-stone-600 resize-none"
                  />
                </div>

                {isEditing && (
                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all"
                    >
                      Lưu thông tin
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
