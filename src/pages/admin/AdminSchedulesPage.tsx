import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminSchedulesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface ScheduleEntry {
  id: string;
  employeeName: string;
  role: 'CASHIER' | 'BARISTA' | 'SHIPPER' | 'MANAGER';
  shift: 'MORNING' | 'AFTERNOON' | 'EVENING';
  day: 'Thứ 2' | 'Thứ 3' | 'Thứ 4' | 'Thứ 5' | 'Thứ 6' | 'Thứ 7' | 'Chủ Nhật';
  status: 'CONFIRMED' | 'PENDING';
}

export const AdminSchedulesPage: React.FC<AdminSchedulesPageProps> = ({ onNavigate, onShowToast }) => {
  const [week, setWeek] = useState('Tuần 43 (20/10 - 26/10/2026)');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [schedules, setSchedules] = useState<ScheduleEntry[]>([
    { id: 's1', employeeName: 'Trần Mai Ly', role: 'CASHIER', shift: 'MORNING', day: 'Thứ 2', status: 'CONFIRMED' },
    { id: 's2', employeeName: 'Nguyễn Văn An', role: 'BARISTA', shift: 'MORNING', day: 'Thứ 2', status: 'CONFIRMED' },
    { id: 's3', employeeName: 'Đỗ Văn Hùng', role: 'SHIPPER', shift: 'MORNING', day: 'Thứ 2', status: 'CONFIRMED' },
    { id: 's4', employeeName: 'Lê Thu Trang', role: 'CASHIER', shift: 'AFTERNOON', day: 'Thứ 2', status: 'CONFIRMED' },
    { id: 's5', employeeName: 'Phạm Quang Huy', role: 'BARISTA', shift: 'AFTERNOON', day: 'Thứ 2', status: 'CONFIRMED' },

    { id: 's6', employeeName: 'Trần Mai Ly', role: 'CASHIER', shift: 'MORNING', day: 'Thứ 3', status: 'CONFIRMED' },
    { id: 's7', employeeName: 'Nguyễn Văn An', role: 'BARISTA', shift: 'MORNING', day: 'Thứ 3', status: 'CONFIRMED' },
    { id: 's8', employeeName: 'Hoàng Văn Nam', role: 'SHIPPER', shift: 'AFTERNOON', day: 'Thứ 3', status: 'CONFIRMED' },

    { id: 's9', employeeName: 'Trần Mai Ly', role: 'CASHIER', shift: 'MORNING', day: 'Thứ 4', status: 'CONFIRMED' },
    { id: 's10', employeeName: 'Nguyễn Văn An', role: 'BARISTA', shift: 'MORNING', day: 'Thứ 4', status: 'CONFIRMED' },
    { id: 's11', employeeName: 'Lê Thu Trang', role: 'CASHIER', shift: 'AFTERNOON', day: 'Thứ 4', status: 'CONFIRMED' },

    { id: 's12', employeeName: 'Nguyễn Văn An', role: 'BARISTA', shift: 'MORNING', day: 'Thứ 5', status: 'CONFIRMED' },
    { id: 's13', employeeName: 'Trần Mai Ly', role: 'CASHIER', shift: 'MORNING', day: 'Thứ 5', status: 'CONFIRMED' },
    { id: 's14', employeeName: 'Đỗ Văn Hùng', role: 'SHIPPER', shift: 'MORNING', day: 'Thứ 5', status: 'CONFIRMED' },

    { id: 's15', employeeName: 'Trần Mai Ly', role: 'CASHIER', shift: 'MORNING', day: 'Thứ 6', status: 'CONFIRMED' },
    { id: 's16', employeeName: 'Nguyễn Văn An', role: 'BARISTA', shift: 'MORNING', day: 'Thứ 6', status: 'CONFIRMED' },
    { id: 's17', employeeName: 'Hoàng Kim', role: 'MANAGER', shift: 'EVENING', day: 'Thứ 6', status: 'CONFIRMED' },

    { id: 's18', employeeName: 'Lê Thu Trang', role: 'CASHIER', shift: 'MORNING', day: 'Thứ 7', status: 'CONFIRMED' },
    { id: 's19', employeeName: 'Phạm Quang Huy', role: 'BARISTA', shift: 'MORNING', day: 'Thứ 7', status: 'CONFIRMED' },
    { id: 's20', employeeName: 'Đỗ Văn Hùng', role: 'SHIPPER', shift: 'MORNING', day: 'Thứ 7', status: 'CONFIRMED' },

    { id: 's21', employeeName: 'Trần Mai Ly', role: 'CASHIER', shift: 'MORNING', day: 'Chủ Nhật', status: 'CONFIRMED' },
    { id: 's22', employeeName: 'Nguyễn Văn An', role: 'BARISTA', shift: 'MORNING', day: 'Chủ Nhật', status: 'CONFIRMED' },
  ]);

  const [formData, setFormData] = useState({
    employeeName: 'Trần Mai Ly',
    role: 'CASHIER' as ScheduleEntry['role'],
    shift: 'MORNING' as ScheduleEntry['shift'],
    day: 'Thứ 2' as ScheduleEntry['day'],
  });

  const days: ScheduleEntry['day'][] = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: ScheduleEntry = {
      id: `s-${Date.now()}`,
      employeeName: formData.employeeName,
      role: formData.role,
      shift: formData.shift,
      day: formData.day,
      status: 'CONFIRMED'
    };
    setSchedules([...schedules, newEntry]);
    setIsModalOpen(false);
    onShowToast?.(`Đã xếp ca cho ${formData.employeeName} vào ${formData.day}!`);
  };

  const getRoleBadge = (role: ScheduleEntry['role']) => {
    switch (role) {
      case 'CASHIER': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'BARISTA': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SHIPPER': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'MANAGER': return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-schedules" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span className="text-primary font-bold">Screen 25</span>
                <span>•</span>
                <span>Nhân Sự & Ca Làm</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Lịch phân ca nhân viên (Employee Schedule Screen)
              </h1>
              <p className="text-xs text-stone-500">
                Lập kế hoạch phân bổ ca làm cho Thu ngân, Barista và Tài xế giao hàng toàn chuỗi Aura Café.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <select
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 outline-none focus:border-primary"
              >
                <option value="Tuần 43 (20/10 - 26/10/2026)">Tuần 43 (20/10 - 26/10/2026)</option>
                <option value="Tuần 44 (27/10 - 02/11/2026)">Tuần 44 (27/10 - 02/11/2026)</option>
              </select>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                Phân ca mới (+)
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Calendar Grid */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
              Bảng xếp lịch tuần theo ca
            </h2>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-amber-800"><span className="w-2 h-2 rounded-full bg-amber-500" />Thu ngân (Cashier)</span>
              <span className="flex items-center gap-1 text-blue-800"><span className="w-2 h-2 rounded-full bg-blue-500" />Barista</span>
              <span className="flex items-center gap-1 text-emerald-800"><span className="w-2 h-2 rounded-full bg-emerald-500" />Shipper</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 min-w-[900px] border-b border-stone-200 text-center text-xs">
              {days.map(d => (
                <div key={d} className="p-3 bg-stone-100/70 border-r border-stone-200 last:border-r-0 font-bold text-stone-800">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 min-w-[900px] divide-x divide-stone-200 text-xs min-h-[420px]">
              {days.map(day => {
                const daySchedules = schedules.filter(s => s.day === day);
                return (
                  <div key={day} className="p-2 space-y-2 bg-stone-50/30">
                    {/* Shift sections in a day */}
                    {(['MORNING', 'AFTERNOON', 'EVENING'] as const).map(shiftName => {
                      const shiftItems = daySchedules.filter(s => s.shift === shiftName);
                      return (
                        <div key={shiftName} className="space-y-1">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                            {shiftName === 'MORNING' ? 'Sáng (07h-12h)' : shiftName === 'AFTERNOON' ? 'Chiều (12h-17h)' : 'Tối (17h-22h)'}
                          </span>
                          {shiftItems.length === 0 ? (
                            <div className="p-1.5 rounded-lg border border-dashed border-stone-200 text-stone-400 text-[10px] text-center">
                              Trống ca
                            </div>
                          ) : (
                            shiftItems.map(item => (
                              <div
                                key={item.id}
                                className={`p-2 rounded-xl border shadow-3xs flex flex-col gap-0.5 text-left ${getRoleBadge(item.role)}`}
                              >
                                <strong className="text-xs truncate">{item.employeeName}</strong>
                                <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">{item.role}</span>
                              </div>
                            ))
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Phân ca mới */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h3 className="font-bold text-base text-stone-900">Phân ca làm việc mới cho nhân viên</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700 p-1">✕</button>
              </div>

              <form onSubmit={handleAddSchedule} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Chọn nhân viên</label>
                  <select
                    value={formData.employeeName}
                    onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  >
                    <option value="Trần Mai Ly">Trần Mai Ly (Thu ngân)</option>
                    <option value="Nguyễn Văn An">Nguyễn Văn An (Barista)</option>
                    <option value="Đỗ Văn Hùng">Đỗ Văn Hùng (Shipper)</option>
                    <option value="Lê Thu Trang">Lê Thu Trang (Thu ngân)</option>
                    <option value="Phạm Quang Huy">Phạm Quang Huy (Barista)</option>
                    <option value="Hoàng Kim">Hoàng Kim (Quản lý)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Vị trí đảm nhận</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                    >
                      <option value="CASHIER">Thu ngân (Cashier)</option>
                      <option value="BARISTA">Barista (Pha chế)</option>
                      <option value="SHIPPER">Shipper (Giao hàng)</option>
                      <option value="MANAGER">Quản lý (Manager)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Ca làm việc</label>
                    <select
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value as any })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                    >
                      <option value="MORNING">Ca Sáng (07:00 - 12:00)</option>
                      <option value="AFTERNOON">Ca Chiều (12:00 - 17:00)</option>
                      <option value="EVENING">Ca Tối (17:00 - 22:00)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Ngày làm việc</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-amber-600 text-white font-bold"
                  >
                    Lưu phân ca
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
