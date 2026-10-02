import React from 'react';
import { PageRoute } from '../../types';

interface DeliverySidebarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const DeliverySidebar: React.FC<DeliverySidebarProps> = ({ currentRoute, onNavigate }) => {
  return (
    <aside className="w-full lg:w-64 bg-stone-100 border-r border-stone-200 flex flex-col justify-between shrink-0 p-4 space-y-4">
      <div className="space-y-4">
        {/* Brand */}
        <div className="px-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base sm:text-lg text-primary tracking-tight">Aura Café</span>
          </div>
          <span className="inline-block mt-1 bg-amber-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            DELIVERY PORTAL
          </span>
        </div>

        {/* Driver Profile Card */}
        <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
            </div>
            <div>
              <span className="font-bold text-sm text-stone-900 block leading-tight">Đỗ Văn Hùng</span>
              <span className="font-mono text-xs text-stone-500">DX-902</span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">Trạng thái:</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Trực tuyến
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1 text-xs sm:text-sm font-semibold">
          {[
            { id: 'delivery-orders', label: 'Đơn được phân công', icon: 'local_shipping' },
            { id: 'delivery-report', label: 'Báo cáo sự cố đơn', icon: 'report_problem' },
            { id: 'delivery-cod', label: 'Đối soát COD & Tiền mặt', icon: 'payments' },
          ].map(tab => {
            const active = currentRoute === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id as PageRoute)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left ${
                  active
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-white/60 rounded-xl border border-stone-200/60 text-[11px] text-stone-500 space-y-1">
        <span className="font-bold text-stone-700 block">Phiên bản App Ship</span>
        <span className="font-mono block">v3.4.12 • Fleet Driver</span>
        <span className="text-emerald-700 font-semibold block">GPS: Online (Độ trễ 2s)</span>
      </div>
    </aside>
  );
};
