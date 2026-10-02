import React, { useState, useEffect } from 'react';
import { PageRoute } from '../../types';

interface PosHeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const PosHeader: React.FC<PosHeaderProps> = ({ currentRoute, onNavigate, onShowToast }) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('vi-VN', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-xl shadow-xs border-b border-stone-200">
      <div className="h-16 sm:h-20 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand & Shift */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[20px]">local_cafe</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base text-stone-900 tracking-tight uppercase">
                Aura Café
              </span>
              <span className="text-[10px] text-primary font-bold tracking-wider uppercase">
                CMS POS Terminal
              </span>
            </div>
          </div>

          <div className="hidden xl:flex flex-col justify-center px-3 py-1 bg-stone-100/80 rounded-xl border border-stone-200/60">
            <div className="flex items-center gap-2 text-xs text-stone-700">
              <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
              <span className="font-semibold">Ca Sáng (06:30 - 14:30)</span>
              <span className="text-stone-300">•</span>
              <span>Thu ngân: <strong className="font-semibold text-stone-900">Trần Mai Ly</strong></span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">POS 02 - Chi nhánh Tràng Tiền</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-stone-500 mt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Máy in K80 Sẵn sàng</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Thiết bị POS Thẻ Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          {[
            { id: 'pos-create', label: 'Tạo đơn tại quầy', icon: 'point_of_sale' },
            { id: 'pos-orders', label: 'Quản lý đơn quầy', icon: 'receipt_long' },
            { id: 'pos-shift', label: 'Quản lý ca', icon: 'savings' },
            { id: 'pos-handover', label: 'Bàn giao ca', icon: 'assignment_turned_in' },
          ].map(tab => {
            const active = currentRoute === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id as PageRoute)}
                className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  active
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Clock & User */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-base font-bold font-mono text-primary leading-tight">
              {timeStr || '10:42:18'}
            </span>
            <span className="text-[10px] text-stone-400 uppercase font-medium">Hôm nay, 24/10</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onShowToast?.('Phím tắt POS: F2=Tìm món | F3=Khách hàng | F4=Lưu tạm | F8=Buzzer | F9=Thanh toán | F10=Chốt ca')}
              className="h-8 px-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center gap-1 text-xs font-semibold"
              title="Danh sách phím tắt"
            >
              <span className="material-symbols-outlined text-[16px]">keyboard</span>
              <span className="hidden lg:inline">F1-F12</span>
            </button>
            <button
              onClick={() => onShowToast?.('Màn hình POS đã được khóa an toàn. Nhập mã PIN để mở khóa.')}
              className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center"
              title="Khóa màn hình tạm thời"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </button>
          </div>

          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">
            ML
          </div>
        </div>
      </div>
    </header>
  );
};
