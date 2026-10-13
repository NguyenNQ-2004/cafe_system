import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminMembershipsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface PhoneLoyaltyRule {
  spendPerPoint: number;       // VD: 10000 VND = 1 diem
  pointValueVnd: number;       // VD: 1 diem = 100 VND giam tru
  minPointsToRedeem: number;   // VD: toi thieu 50 diem moi duoc doi
  maxRedeemPercent: number;    // VD: toi da 50% gia tri don
  pointsExpiryMonths: number;  // Han dung 12 thang
  autoRegisterOnPhone: boolean;// Tu dong tao tk khi nhap SDT
}

interface LoyaltyLog {
  id: string;
  time: string;
  phone: string;
  customerName: string;
  orderId: string;
  type: 'EARN' | 'REDEEM' | 'MANUAL_ADD' | 'MANUAL_SUB';
  points: number;
  balanceAfter: number;
  note: string;
}

export const AdminMembershipsPage: React.FC<AdminMembershipsPageProps> = ({ onNavigate, onShowToast }) => {
  // Rules State
  const [rules, setRules] = useState<PhoneLoyaltyRule>({
    spendPerPoint: 10000,
    pointValueVnd: 100,
    minPointsToRedeem: 50,
    maxRedeemPercent: 50,
    pointsExpiryMonths: 12,
    autoRegisterOnPhone: true
  });

  // Search by Phone State
  const [searchPhone, setSearchPhone] = useState('0908 123 456');
  const [activeCustomer, setActiveCustomer] = useState<{
    phone: string;
    name: string;
    email: string;
    points: number;
    totalSpent: number;
    lastVisit: string;
  } | null>({
    phone: '0908 123 456',
    name: 'Nguyễn Văn An',
    email: 'van.an.nguyen@example.com',
    points: 450,
    totalSpent: 4250000,
    lastVisit: 'Hôm nay, 10:24'
  });

  // Manual Adjust Modal
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustType, setAdjustType] = useState<'add' | 'subtract'>('add');
  const [adjustPoints, setAdjustPoints] = useState<number>(50);
  const [adjustReason, setAdjustReason] = useState('Tặng điểm sinh nhật');

  // Transaction Logs
  const [logs, setLogs] = useState<LoyaltyLog[]>([
    {
      id: 'LOG-991',
      time: '14/10/2026 10:24',
      phone: '0908 123 456',
      customerName: 'Nguyễn Văn An',
      orderId: '#AUR-89241',
      type: 'EARN',
      points: 18,
      balanceAfter: 450,
      note: 'Tích điểm đơn hàng 179.000₫'
    },
    {
      id: 'LOG-990',
      time: '14/10/2026 09:15',
      phone: '0988 234 891',
      customerName: 'Hoàng Kim',
      orderId: '#AUR-89230',
      type: 'REDEEM',
      points: -100,
      balanceAfter: 790,
      note: 'Dùng 100 điểm giảm 10.000₫ tại quầy POS'
    },
    {
      id: 'LOG-989',
      time: '13/10/2026 16:40',
      phone: '0912 345 678',
      customerName: 'Trần Bảo Ngọc',
      orderId: '#AUR-89195',
      type: 'EARN',
      points: 32,
      balanceAfter: 310,
      note: 'Tích điểm đơn giao tận nơi 320.000₫'
    },
    {
      id: 'LOG-988',
      time: '12/10/2026 14:00',
      phone: '0900 000 004',
      customerName: 'Lê Minh Anh',
      orderId: 'MANUAL',
      type: 'MANUAL_ADD',
      points: 50,
      balanceAfter: 120,
      note: 'Admin tặng điểm tri ân khách hàng thân thiết'
    }
  ]);

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast?.('Đã lưu cấu hình quy tắc tích điểm theo Số Điện Thoại thành công!');
  };

  const handleSearchPhone = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchPhone.replace(/\s+/g, '');
    if (!cleanQuery) {
      onShowToast?.('Vui lòng nhập số điện thoại cần tra cứu!');
      return;
    }

    if (cleanQuery.includes('0908') || cleanQuery.includes('123456')) {
      setActiveCustomer({
        phone: '0908 123 456',
        name: 'Nguyễn Văn An',
        email: 'van.an.nguyen@example.com',
        points: 450,
        totalSpent: 4250000,
        lastVisit: 'Hôm nay, 10:24'
      });
      onShowToast?.('Đã tìm thấy tài khoản tích điểm qua SĐT 0908 123 456.');
    } else if (cleanQuery.includes('0988')) {
      setActiveCustomer({
        phone: '0988 234 891',
        name: 'Hoàng Kim',
        email: 'kim.hoang@gmail.com',
        points: 790,
        totalSpent: 8920000,
        lastVisit: 'Hôm nay, 09:15'
      });
      onShowToast?.('Đã tìm thấy tài khoản tích điểm qua SĐT 0988 234 891.');
    } else {
      setActiveCustomer({
        phone: searchPhone,
        name: 'Khách hàng mới',
        email: 'Chưa cập nhật',
        points: 0,
        totalSpent: 0,
        lastVisit: 'Chưa có giao dịch'
      });
      onShowToast?.(`Số điện thoại ${searchPhone} chưa có điểm. Sẵn sàng tích điểm ngay khi mua hàng!`);
    }
  };

  const handleApplyAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCustomer) return;

    const delta = adjustType === 'add' ? adjustPoints : -adjustPoints;
    const newBal = Math.max(0, activeCustomer.points + delta);

    setActiveCustomer({
      ...activeCustomer,
      points: newBal
    });

    const newLog: LoyaltyLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleString('vi-VN'),
      phone: activeCustomer.phone,
      customerName: activeCustomer.name,
      orderId: 'MANUAL',
      type: adjustType === 'add' ? 'MANUAL_ADD' : 'MANUAL_SUB',
      points: delta,
      balanceAfter: newBal,
      note: adjustReason || 'Admin điều chỉnh thủ công'
    };

    setLogs([newLog, ...logs]);
    setIsAdjustModalOpen(false);
    onShowToast?.(`Đã ${adjustType === 'add' ? 'cộng' : 'trừ'} ${adjustPoints} điểm cho SĐT ${activeCustomer.phone}!`);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-memberships" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl relative">
        {/* Header Hero */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Screen 29 • Phone Loyalty Rules
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[11px] font-semibold">
                  Không phân hạng thẻ
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Chính Sách & Tích Điểm theo Số Điện Thoại
              </h1>
              <p className="text-xs text-stone-500 mt-1 max-w-3xl leading-relaxed">
                Hệ thống tích điểm thưởng trực tiếp theo <strong>Số Điện Thoại</strong> của khách hàng. 
                Đã loại bỏ toàn bộ phân cấp thẻ (Đồng, Bạc, Vàng, Kim Cương). Khách hàng chỉ cần đọc số điện thoại tại quầy thu ngân POS hoặc khi đặt hàng online để tự động tích và tiêu điểm.
              </p>
            </div>

            <button
              onClick={() => onShowToast?.('Đã đồng bộ chính sách tích điểm SĐT tới tất cả máy POS và App!')}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Đồng bộ máy POS
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-stone-100">
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Khách hàng có điểm</span>
              <p className="text-lg font-bold text-stone-900 font-mono">1,428 SĐT</p>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Tổng điểm lưu hành</span>
              <p className="text-lg font-bold text-primary font-mono">184,520 pts</p>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Giá trị quy đổi</span>
              <p className="text-lg font-bold text-stone-900 font-mono">1 điểm = 100₫</p>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Phương thức nhận diện</span>
              <p className="text-lg font-bold text-emerald-700 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
                <span>Số Điện Thoại</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left = Rule Configuration, Right = Phone Lookup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Points Rules Configuration (UC64) */}
          <section className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-stone-900">Cấu hình Quy tắc Tích & Tiêu điểm</h2>
                  <p className="text-[11px] text-stone-500">Áp dụng bình đẳng cho mọi khách hàng qua số điện thoại</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Đang hiệu lực
              </span>
            </div>

            <form onSubmit={handleSaveRules} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Mức chi tiêu để tích 1 điểm (VNĐ)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={1000}
                      min={1000}
                      value={rules.spendPerPoint}
                      onChange={(e) => setRules({ ...rules, spendPerPoint: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono text-stone-900"
                    />
                    <span className="absolute right-3 top-2 text-stone-400 font-semibold">₫ / 1 điểm</span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1">Ví dụ: 10.000₫ = 1 điểm tích lũy (tương đương 1% hoàn tiền).</p>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Giá trị quy đổi khi dùng điểm (VNĐ)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={10}
                      min={10}
                      value={rules.pointValueVnd}
                      onChange={(e) => setRules({ ...rules, pointValueVnd: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono text-stone-900"
                    />
                    <span className="absolute right-3 top-2 text-stone-400 font-semibold">₫ / 1 điểm</span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1">Ví dụ: 100 điểm = giảm trực tiếp 10.000₫ trên hóa đơn.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Số điểm tối thiểu để được tiêu
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={10}
                      value={rules.minPointsToRedeem}
                      onChange={(e) => setRules({ ...rules, minPointsToRedeem: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono text-stone-900"
                    />
                    <span className="absolute right-3 top-2 text-stone-400 font-semibold">điểm</span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1">Khách cần có tối thiểu số điểm này mới được kích hoạt giảm trừ.</p>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Giảm trừ tối đa trên đơn hàng (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={10}
                      max={100}
                      value={rules.maxRedeemPercent}
                      onChange={(e) => setRules({ ...rules, maxRedeemPercent: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono text-stone-900"
                    />
                    <span className="absolute right-3 top-2 text-stone-400 font-semibold">% tổng đơn</span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1">Tránh trường hợp khách đổi toàn bộ hóa đơn làm thâm hụt dòng tiền.</p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900 block">Tự động kích hoạt tài khoản theo SĐT</span>
                    <span className="text-[10px] text-stone-500">
                      Khi khách đọc số điện thoại mới tại quầy POS, hệ thống tự động ghi nhận điểm mà không cần thủ tục rườm rà.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={rules.autoRegisterOnPhone}
                    onChange={(e) => setRules({ ...rules, autoRegisterOnPhone: e.target.checked })}
                    className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  Lưu cấu hình quy tắc
                </button>
              </div>
            </form>
          </section>

          {/* Column 2: Phone Number Quick Lookup & Manual Adjustment */}
          <section className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-900">Tra cứu & Điều chỉnh điểm SĐT</h2>
                <p className="text-[11px] text-stone-500">Tìm kiếm tức thì bằng Số Điện Thoại khách</p>
              </div>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchPhone} className="flex gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-stone-400 text-[18px]">
                  phone_iphone
                </span>
                <input
                  type="text"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  placeholder="Nhập số điện thoại (vd: 0908 123 456)..."
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary text-xs font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                Tra cứu
              </button>
            </form>

            {/* Customer Result Card */}
            {activeCustomer && (
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-black flex items-center justify-center text-xs">
                      {activeCustomer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">{activeCustomer.name}</h3>
                      <p className="text-[11px] text-stone-500 font-mono flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">call</span>
                        {activeCustomer.phone}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Hoạt động
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200/60">
                  <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block font-semibold">Điểm khả dụng</span>
                    <p className="text-base font-black text-primary font-mono">{activeCustomer.points} pts</p>
                    <span className="text-[10px] text-stone-500">={(activeCustomer.points * rules.pointValueVnd).toLocaleString('vi-VN')}₫ giảm trừ</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block font-semibold">Tổng chi tiêu</span>
                    <p className="text-base font-bold text-stone-900 font-mono">{activeCustomer.totalSpent.toLocaleString('vi-VN')}₫</p>
                    <span className="text-[10px] text-stone-500">{activeCustomer.lastVisit}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      setAdjustType('add');
                      setIsAdjustModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    Cộng điểm
                  </button>
                  <button
                    onClick={() => {
                      setAdjustType('subtract');
                      setIsAdjustModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove_circle</span>
                    Trừ điểm
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Section 3: Recent Phone Loyalty Logs */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-stone-900 text-sm sm:text-base">Nhật Ký Tích & Tiêu Điểm Theo Số Điện Thoại</h2>
              <p className="text-xs text-stone-500">Lịch sử biến động điểm thưởng được định danh bằng SĐT từ POS và Web</p>
            </div>
            <button
              onClick={() => onShowToast?.('Đã xuất báo cáo giao dịch điểm ra file Excel!')}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold flex items-center gap-1 self-start sm:self-auto transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Xuất dữ liệu Excel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Mã log</th>
                  <th className="p-3.5">Thời gian</th>
                  <th className="p-3.5">Số điện thoại</th>
                  <th className="p-3.5">Tên khách</th>
                  <th className="p-3.5">Loại giao dịch</th>
                  <th className="p-3.5 text-right">Điểm biến động</th>
                  <th className="p-3.5 text-right">Số dư điểm</th>
                  <th className="p-3.5">Ghi chú / Đơn hàng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-stone-400">{log.id}</td>
                    <td className="p-3.5 text-stone-500 font-mono">{log.time}</td>
                    <td className="p-3.5 font-mono font-bold text-stone-800 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-stone-400">call</span>
                      {log.phone}
                    </td>
                    <td className="p-3.5 font-semibold text-stone-900">{log.customerName}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.type === 'EARN' ? 'bg-emerald-100 text-emerald-800' :
                        log.type === 'REDEEM' ? 'bg-amber-100 text-amber-800' :
                        log.type === 'MANUAL_ADD' ? 'bg-blue-100 text-blue-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {log.type === 'EARN' ? 'Tích điểm đơn hàng' :
                         log.type === 'REDEEM' ? 'Tiêu điểm giảm giá' :
                         log.type === 'MANUAL_ADD' ? 'Admin cộng điểm' : 'Admin trừ điểm'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold">
                      <span className={log.points > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        {log.points > 0 ? `+${log.points}` : log.points} pts
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-stone-900">
                      {log.balanceAfter} pts
                    </td>
                    <td className="p-3.5 text-stone-500 max-w-xs truncate">
                      {log.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal Manual Adjust Points */}
        {isAdjustModalOpen && activeCustomer && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    {adjustType === 'add' ? 'add_circle' : 'remove_circle'}
                  </span>
                  {adjustType === 'add' ? 'Cộng Điểm Thủ Công' : 'Trừ Điểm Thủ Công'}
                </h3>
                <button
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1">
                <p>Khách hàng: <strong>{activeCustomer.name}</strong></p>
                <p>Số điện thoại: <strong className="font-mono">{activeCustomer.phone}</strong></p>
                <p>Số dư hiện tại: <strong className="font-mono text-primary">{activeCustomer.points} pts</strong></p>
              </div>

              <form onSubmit={handleApplyAdjust} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Số điểm điều chỉnh</label>
                  <input
                    type="number"
                    min={1}
                    value={adjustPoints}
                    onChange={(e) => setAdjustPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono font-bold text-stone-900 text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Lý do điều chỉnh</label>
                  <select
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary text-xs"
                  >
                    <option value="Tặng điểm sinh nhật">Tặng điểm sinh nhật</option>
                    <option value="Bồi thường đơn hàng giao chậm">Bồi thường đơn hàng giao chậm</option>
                    <option value="Khuyến mãi tri ân khách hàng">Khuyến mãi tri ân khách hàng</option>
                    <option value="Điều chỉnh sai lệch đơn hàng">Điều chỉnh sai lệch đơn hàng</option>
                    <option value="Khác">Khác...</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdjustModalOpen(false)}
                    className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-2 text-white rounded-xl font-bold shadow-xs ${
                      adjustType === 'add' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                  >
                    Xác nhận {adjustType === 'add' ? 'cộng' : 'trừ'} điểm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
