import React from 'react';
import { PageRoute } from '../../types';

interface AdminSidebarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentRoute, onNavigate }) => {
  return (
    <aside className="w-full lg:w-72 bg-white border-r border-stone-200 shrink-0 p-4 space-y-4 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Brand */}
        <div className="px-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[20px]">coffee</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-primary">AURA CAFÉ</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Hệ Thống Chuỗi</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-stone-400 font-mono">Sync</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-4 text-xs font-semibold">
          {/* Section 1: Tổng quan */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">Tổng Quan</p>
            <button
              onClick={() => onNavigate('admin-overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${currentRoute === 'admin-overview'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>20. Tổng quan điều hành</span>
            </button>
          </div>

          {/* Section 2: Quản trị thực đơn */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">Quản Trị Thực Đơn</p>
            <button
              onClick={() => onNavigate('admin-categories')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${currentRoute === 'admin-categories'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">category</span>
              <span>21. Danh mục thực đơn</span>
            </button>
            <button
              onClick={() => onNavigate('admin-products')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${currentRoute === 'admin-products'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">local_cafe</span>
              <span>22. Quản lý Món & Giá</span>
            </button>
          </div>

          {/* Section 3: Kho hàng & nguyên liệu */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">Kho Hàng & Nguyên Liệu</p>
            <button
              onClick={() => onNavigate('admin-stock')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${currentRoute === 'admin-stock'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>23. Tổng quan tồn kho</span>
            </button>
            <button
              onClick={() => onNavigate('admin-ingredients')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${currentRoute === 'admin-ingredients'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">science</span>
              <span>24. Định mức nguyên liệu</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Footer ERP status */}
      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500 space-y-1">
        <div className="flex justify-between items-center font-bold text-stone-700">
          <span>Aura CMS Enterprise</span>
          <span className="font-mono text-[10px]">v3.4.2</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Cloud ERP: Đã kết nối</span>
        </div>
      </div>
    </aside>
  );
};
