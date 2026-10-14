import React, { useState } from 'react';
import { PageRoute, ShiftName } from '../../types';
import { useDb } from '../../data/DbContext';
import { SCHEDULE_STATUS_LABEL, SHIFT_LABEL, SHIFT_SETTING_KEY, shiftTimeRange } from '../../data/dbUtils';
import { AdminLayout, Field, FormActions, Modal, inputCls } from './AdminUi';

interface AdminShiftsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

const SHIFTS: ShiftName[] = ['MORNING', 'AFTERNOON', 'EVENING'];

export const AdminShiftsPage: React.FC<AdminShiftsPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [editing, setEditing] = useState<{ shift: ShiftName; start: string; end: string } | null>(null);

  const openEdit = (shift: ShiftName) => {
    const [start = '', end = ''] = shiftTimeRange(db, shift).split('-');
    setEditing({ shift, start, end });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (editing.start >= editing.end) {
      onShowToast?.('Giờ kết thúc phải sau giờ bắt đầu.');
      return;
    }
    transact(tx => tx.setSetting(SHIFT_SETTING_KEY[editing.shift], `${editing.start}-${editing.end}`));
    onShowToast?.(`Đã cập nhật giờ ${SHIFT_LABEL[editing.shift]}.`);
    setEditing(null);
  };

  return (
    <AdminLayout
      route="admin-shifts"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="work_schedules.shift_name + shop_settings"
      title="Khung giờ ca làm việc"
      subtitle="Database có 3 ca cố định (MORNING, AFTERNOON, EVENING). Giờ của từng ca được lưu trong shop_settings."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SHIFTS.map(shift => {
          const schedules = db.work_schedules.filter(s => s.shift_name === shift);
          return (
            <div key={shift} className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col shadow-2xs">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">{SHIFT_LABEL[shift]}</h3>
                  <span className="font-mono text-[10px] text-stone-400">{shift} • {SHIFT_SETTING_KEY[shift]}</span>
                </div>
                <span className="material-symbols-outlined text-primary">schedule</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800 text-lg font-bold font-mono mb-3">
                {shiftTimeRange(db, shift) || 'Chưa cấu hình'}
              </div>
              <div className="text-xs text-stone-500 space-y-1 mb-4">
                <p>Tổng lượt xếp ca: <strong className="text-stone-800">{schedules.length}</strong></p>
                {(['SCHEDULED', 'PRESENT', 'COMPLETED', 'ABSENT'] as const).map(st => (
                  <p key={st}>
                    {SCHEDULE_STATUS_LABEL[st]}: <strong className="text-stone-800">{schedules.filter(s => s.status === st).length}</strong>
                  </p>
                ))}
              </div>
              <div className="mt-auto pt-3 border-t border-stone-100 flex justify-between">
                <button onClick={() => onNavigate('admin-schedules')} className="text-xs font-semibold text-stone-500 hover:underline">
                  Xem lịch phân ca
                </button>
                <button onClick={() => openEdit(shift)} className="text-xs font-bold text-primary hover:underline">
                  Sửa giờ ca
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <Modal title={`Giờ ${SHIFT_LABEL[editing.shift]}`} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Bắt đầu">
                <input type="time" required value={editing.start} onChange={e => setEditing({ ...editing, start: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Kết thúc">
                <input type="time" required value={editing.end} onChange={e => setEditing({ ...editing, end: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <p className="text-[11px] text-stone-500">
              Lưu vào shop_settings.{SHIFT_SETTING_KEY[editing.shift]} dạng "HH:mm-HH:mm".
            </p>
            <FormActions onCancel={() => setEditing(null)} submitLabel="Lưu giờ ca" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
