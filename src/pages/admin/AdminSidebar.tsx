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
              <span className="material-symbols-outlined text-[20px]">local_cafe</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-primary">AURA CAFÉ</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Admin ERP Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-stone-400 font-mono">Online</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-4 text-xs font-semibold">
          {/* Section 1: Dashboard & Reports */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">Reporting & BI</p>
            <button
              onClick={() => onNavigate('admin-overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-overview'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Screen 31: Reports Dashboard</span>
            </button>
          </div>

          {/* Section 2: Menu Management */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">Menu Management</p>
            <button
              onClick={() => onNavigate('admin-categories')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-categories'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">category</span>
              <span>Screen 15: Category Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-products')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-products'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">local_cafe</span>
              <span>Screen 16: Product Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-recipes')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-recipes'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>Screen 17: Recipe Management</span>
            </button>
          </div>

          {/* Section 3: Inventory & Supply Chain */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">Inventory & Supply Chain</p>
            <button
              onClick={() => onNavigate('admin-ingredients')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-ingredients'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">shelves</span>
              <span>Screen 18: Ingredient Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-stock')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-stock'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Screen 19: Inventory Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-restock')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-restock'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">add_alert</span>
              <span>Screen 20: Restock Request</span>
            </button>
            <button
              onClick={() => onNavigate('admin-suppliers')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-suppliers'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span>Screen 21: Supplier Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-purchases')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-purchases'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Screen 22: Purchase Order</span>
            </button>
          </div>

          {/* Section 4: Human Resources & Shift */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">HR & Work Shifts</p>
            <button
              onClick={() => onNavigate('admin-users')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-users'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span>Screen 23: Employee Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-shifts')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-shifts'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>Screen 24: Work Shift Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-schedules')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-schedules'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Screen 25: Employee Schedule</span>
            </button>
            <button
              onClick={() => onNavigate('admin-attendance')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-attendance'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span>Screen 26: Attendance Management</span>
            </button>
          </div>

          {/* Section 5: CRM & Phone Loyalty */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold">CRM & Phone Loyalty</p>
            <button
              onClick={() => onNavigate('admin-customers')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-customers'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">contact_page</span>
              <span>Screen 28: Customer Management</span>
            </button>
            <button
              onClick={() => onNavigate('admin-memberships')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-memberships'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">loyalty</span>
              <span>Screen 29: Phone Loyalty Rules</span>
            </button>
            <button
              onClick={() => onNavigate('admin-complaints')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                currentRoute === 'admin-complaints'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">feedback</span>
              <span>Screen 30: Feedback & Complaints</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Footer ERP status */}
      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500 space-y-1">
        <div className="flex justify-between items-center font-bold text-stone-700">
          <span>Aura ERP Enterprise</span>
          <span className="font-mono text-[10px]">v3.4.2</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Cloud Database Sync: Active</span>
        </div>
      </div>
    </aside>
  );
};
