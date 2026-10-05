import React from 'react';
import { PageRoute } from '../../types';

interface KdsHeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const KdsHeader: React.FC<KdsHeaderProps> = ({ currentRoute, onNavigate }) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-xs border-b border-stone-200">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-base sm:text-lg tracking-tight text-primary">
              Aura Café
            </span>
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              BARISTA KDS TERMINAL
            </span>
          </div>

          <div className="hidden lg:block h-6 w-px bg-stone-200" />

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-stone-900 leading-tight">
                Trạm 01 - Pha chế chính
              </span>
              <span className="text-[11px] text-stone-500">Nguyễn Tuấn Anh (NV-042)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>KDS Online</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => onNavigate('kds-terminal')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentRoute === 'kds-terminal'
                ? 'bg-primary text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">blender</span>
            <span>Màn hình KDS (F1)</span>
          </button>
        </nav>

        {/* Shift stats */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right text-xs">
            <span className="font-mono font-bold text-stone-900">Ca sáng: 06:30 - 14:30</span>
            <span className="text-[11px] text-stone-500">Thời gian ca: 04h 25m</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">
            TA
          </div>
        </div>
      </div>
    </header>
  );
};
