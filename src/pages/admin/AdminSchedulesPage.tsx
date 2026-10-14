import React, { useState } from 'react';
import { PageRoute, ShiftName, StaffPosition, WorkSchedule } from '../../types';
import { useDb } from '../../data/DbContext';
import { POSITION_LABEL, SCHEDULE_STATUS_LABEL, SHIFT_LABEL, fmtDate, shiftTimeRange, userName } from '../../data/dbUtils';
import { AdminLayout, Field, FormActions, GhostButton, Modal, PrimaryButton, inputCls } from './AdminUi';

interface AdminSchedulesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

const SHIFTS: ShiftName[] = ['MORNING', 'AFTERNOON', 'EVENING'];
const DAY_LABELS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
const POSITION_STYLE: Record<StaffPosition, string> = {
  CASHIER: 'bg-amber-100 text-amber-800 border-amber-200',
  BARISTA: 'bg-blue-100 text-blue-800 border-blue-200',
  SHIPPER: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  MANAGER: 'bg-purple-100 text-purple-800 border-purple-200'
};

const pad = (n: number) => String(n).padStart(2, '0');
const toSqlDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const mondayOf = (dateStr: string) => {
  const d = new Date(`${dateStr}T00:00:00`);
  const diff = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
};
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export const AdminSchedulesPage: React.FC<AdminSchedulesPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const latest = db.work_schedules.map(s => s.work_date).sort().pop() ?? toSqlDate(new Date());
  const [weekStart, setWeekStart] = useState<Date>(mondayOf(latest));
  const [form, setForm] = useState<{ user_id: number; work_date: string; shift_name: ShiftName; note: string } | null>(null);

  const staff = db.users.filter(u => u.role !== 'CUSTOMER' && u.status === 'ACTIVE');
  const days = Array.from({ length: 7 }, (_, i) => toSqlDate(addDays(weekStart, i)));

  const openCreate = (work_date = days[0], shift_name: ShiftName = 'MORNING') =>
    setForm({ user_id: staff[0]?.id ?? 0, work_date, shift_name, note: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (db.work_schedules.some(s => s.user_id === form.user_id && s.work_date === form.work_date && s.shift_name === form.shift_name)) {
      onShowToast?.('Nhân viên đã có ca này trong ngày (uq_user_work_shift).');
      return;
    }
    transact(tx =>
      tx.insert('work_schedules', {
        user_id: form.user_id,
        work_date: form.work_date,
        shift_name: form.shift_name,
        check_in_time: null,
        check_out_time: null,
        starting_cash: null,
        ending_cash_system: null,
        ending_cash_actual: null,
        status: 'SCHEDULED',
        note: form.note.trim() || null
      })
    );
    onShowToast?.(`Đã xếp ${SHIFT_LABEL[form.shift_name]} ngày ${fmtDate(form.work_date)} cho ${userName(db, form.user_id)}.`);
    setForm(null);
  };

  const handleRemove = (s: WorkSchedule) => {
    if (s.status !== 'SCHEDULED') {
      onShowToast?.('Chỉ xóa được ca chưa bắt đầu (SCHEDULED).');
      return;
    }
    if (!confirm(`Xóa ca của ${userName(db, s.user_id)}?`)) return;
    transact(tx => tx.remove('work_schedules', s.id));
  };

  return (
    <AdminLayout
      route="admin-schedules"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="work_schedules"
      title="Lịch phân ca nhân viên"
      subtitle={`Tuần ${fmtDate(days[0])} - ${fmtDate(days[6])}`}
      actions={
        <>
          <GhostButton icon="chevron_left" onClick={() => setWeekStart(addDays(weekStart, -7))}>
            Tuần trước
          </GhostButton>
          <GhostButton icon="chevron_right" onClick={() => setWeekStart(addDays(weekStart, 7))}>
            Tuần sau
          </GhostButton>
          <PrimaryButton icon="calendar_add_on" onClick={() => openCreate()}>
            Phân ca mới
          </PrimaryButton>
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex flex-wrap gap-3 justify-between items-center bg-stone-50/50 text-[11px] font-bold">
          <span className="text-sm text-stone-800">Bảng xếp lịch tuần theo ca</span>
          <div className="flex items-center gap-3">
            {(Object.keys(POSITION_LABEL) as StaffPosition[]).map(p => (
              <span key={p} className={`px-2 py-0.5 rounded border ${POSITION_STYLE[p]}`}>{POSITION_LABEL[p]}</span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 min-w-[980px] border-b border-stone-200 text-center text-xs">
            {days.map((d, i) => (
              <div key={d} className="p-3 bg-stone-100/70 border-r border-stone-200 last:border-r-0 font-bold text-stone-800">
                {DAY_LABELS[i]}
                <span className="block text-[10px] font-normal text-stone-500">{fmtDate(d)}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 min-w-[980px] divide-x divide-stone-200 text-xs min-h-[420px]">
            {days.map(day => (
              <div key={day} className="p-2 space-y-2 bg-stone-50/30">
                {SHIFTS.map(shift => {
                  const items = db.work_schedules.filter(s => s.work_date === day && s.shift_name === shift);
                  return (
                    <div key={shift} className="space-y-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        {SHIFT_LABEL[shift]} ({shiftTimeRange(db, shift)})
                      </span>
                      {items.length === 0 ? (
                        <button
                          onClick={() => openCreate(day, shift)}
                          className="w-full p-1.5 rounded-lg border border-dashed border-stone-200 text-stone-400 text-[10px] hover:border-primary hover:text-primary"
                        >
                          + Xếp ca
                        </button>
                      ) : (
                        items.map(s => {
                          const u = db.users.find(x => x.id === s.user_id);
                          return (
                            <div
                              key={s.id}
                              className={`p-2 rounded-xl border flex flex-col gap-0.5 text-left ${u?.position ? POSITION_STYLE[u.position] : 'bg-stone-100 border-stone-200'}`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <strong className="text-xs truncate">{u?.full_name}</strong>
                                {s.status === 'SCHEDULED' && (
                                  <button onClick={() => handleRemove(s)} className="opacity-60 hover:opacity-100" title="Xóa ca">
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                  </button>
                                )}
                              </div>
                              <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">
                                {u?.position ? POSITION_LABEL[u.position] : ''} • {SCHEDULE_STATUS_LABEL[s.status]}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {form && (
        <Modal title="Phân ca làm việc" onClose={() => setForm(null)}>
          <form onSubmit={handleAdd} className="space-y-3">
            <Field label="Nhân viên" column="user_id">
              <select value={form.user_id} onChange={e => setForm({ ...form, user_id: Number(e.target.value) })} className={inputCls}>
                {staff.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.full_name} ({u.position ? POSITION_LABEL[u.position] : 'Nhân viên'})
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Ngày làm" column="work_date">
                <input type="date" required value={form.work_date} onChange={e => setForm({ ...form, work_date: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Ca" column="shift_name">
                <select value={form.shift_name} onChange={e => setForm({ ...form, shift_name: e.target.value as ShiftName })} className={inputCls}>
                  {SHIFTS.map(s => (
                    <option key={s} value={s}>
                      {SHIFT_LABEL[s]} ({shiftTimeRange(db, s)})
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Ghi chú" column="note">
              <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} className={inputCls} />
            </Field>
            <FormActions onCancel={() => setForm(null)} submitLabel="Lưu phân ca" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
