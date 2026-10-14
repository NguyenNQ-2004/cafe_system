import React, { useState } from 'react';
import { PageRoute, ScheduleStatus, WorkSchedule } from '../../types';
import { useDb } from '../../data/DbContext';
import { POSITION_LABEL, SCHEDULE_STATUS_LABEL, SHIFT_LABEL, fmtTime, shiftTimeRange, userName } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, Modal, StatCard, inputCls } from './AdminUi';

interface AdminAttendancePageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

const STATUS_STYLE: Record<ScheduleStatus, string> = {
  SCHEDULED: 'bg-stone-100 text-stone-600',
  PRESENT: 'bg-emerald-100 text-emerald-700',
  ABSENT: 'bg-rose-100 text-rose-700',
  COMPLETED: 'bg-blue-100 text-blue-700'
};

export const AdminAttendancePage: React.FC<AdminAttendancePageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const latest = db.work_schedules.map(s => s.work_date).sort().pop() ?? new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(latest);
  const [editing, setEditing] = useState<{ s: WorkSchedule; checkIn: string; checkOut: string; status: ScheduleStatus; reason: string } | null>(null);

  const rows = db.work_schedules.filter(s => s.work_date === date);

  // Đi muộn: check_in_time sau giờ bắt đầu ca (giờ ca lấy từ shop_settings)
  const isLate = (s: WorkSchedule) => {
    const start = shiftTimeRange(db, s.shift_name).split('-')[0];
    return !!s.check_in_time && !!start && fmtTime(s.check_in_time) > start;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const { s, checkIn, checkOut, status, reason } = editing;
    if (checkIn && checkOut && checkOut <= checkIn) {
      onShowToast?.('Giờ ra ca phải sau giờ vào ca.');
      return;
    }
    transact(tx =>
      tx.update('work_schedules', s.id, {
        check_in_time: checkIn ? `${s.work_date} ${checkIn}:00` : null,
        check_out_time: checkOut ? `${s.work_date} ${checkOut}:00` : null,
        status,
        note: reason.trim() ? [s.note, `Admin chỉnh: ${reason.trim()}`].filter(Boolean).join(' | ') : s.note
      })
    );
    onShowToast?.('Cập nhật chấm công thành công!');
    setEditing(null);
  };

  return (
    <AdminLayout
      route="admin-attendance"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="work_schedules"
      title="Chấm công"
      subtitle="Giờ vào/ra ca và trạng thái làm việc thực tế của nhân viên."
      actions={<input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-9 px-3 bg-white border border-stone-200 rounded-xl text-xs" />}
      stats={
        <>
          <StatCard label="Lượt ca trong ngày" value={rows.length} />
          <StatCard label="Có mặt / Hoàn thành" value={rows.filter(r => r.status === 'PRESENT' || r.status === 'COMPLETED').length} tone="success" />
          <StatCard label="Đi muộn" value={rows.filter(isLate).length} tone="danger" />
          <StatCard label="Vắng" value={rows.filter(r => r.status === 'ABSENT').length} />
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">Nhân viên</th>
                <th className="p-4">Ca làm việc</th>
                <th className="p-4">Giờ vào (check_in_time)</th>
                <th className="p-4">Giờ ra (check_out_time)</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Ghi chú</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-stone-400">Không có lịch ca trong ngày này.</td>
                </tr>
              )}
              {rows.map(s => {
                const u = db.users.find(x => x.id === s.user_id);
                const late = isLate(s);
                return (
                  <tr key={s.id} className="hover:bg-stone-50/50">
                    <td className="p-4">
                      <strong className="text-stone-900 block">{u?.full_name}</strong>
                      <span className="text-stone-400">{u?.position ? POSITION_LABEL[u.position] : ''}</span>
                    </td>
                    <td className="p-4">
                      {SHIFT_LABEL[s.shift_name]} ({shiftTimeRange(db, s.shift_name)})
                    </td>
                    <td className={`p-4 font-mono ${late ? 'text-amber-600 font-bold' : 'text-stone-900'}`}>
                      {fmtTime(s.check_in_time)} {late && <span className="font-sans text-[10px]">(muộn)</span>}
                    </td>
                    <td className="p-4 font-mono text-stone-700">{fmtTime(s.check_out_time)}</td>
                    <td className="p-4">
                      <Badge className={STATUS_STYLE[s.status]}>{SCHEDULE_STATUS_LABEL[s.status]}</Badge>
                    </td>
                    <td className="p-4 text-stone-500 max-w-xs truncate" title={s.note ?? ''}>{s.note ?? '—'}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() =>
                          setEditing({ s, checkIn: s.check_in_time?.slice(11, 16) ?? '', checkOut: s.check_out_time?.slice(11, 16) ?? '', status: s.status, reason: '' })
                        }
                        className="text-primary font-bold hover:underline"
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <Modal title={`Chấm công: ${userName(db, editing.s.user_id)}`} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Giờ vào" column="check_in_time">
                <input type="time" value={editing.checkIn} onChange={e => setEditing({ ...editing, checkIn: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Giờ ra" column="check_out_time">
                <input type="time" value={editing.checkOut} onChange={e => setEditing({ ...editing, checkOut: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <Field label="Trạng thái" column="status">
              <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value as ScheduleStatus })} className={inputCls}>
                {(Object.keys(SCHEDULE_STATUS_LABEL) as ScheduleStatus[]).map(st => (
                  <option key={st} value={st}>{st} - {SCHEDULE_STATUS_LABEL[st]}</option>
                ))}
              </select>
            </Field>
            <Field label="Lý do điều chỉnh (ghi vào note)" column="note">
              <input required value={editing.reason} onChange={e => setEditing({ ...editing, reason: e.target.value })} placeholder="VD: Quên chấm công" className={inputCls} />
            </Field>
            <FormActions onCancel={() => setEditing(null)} submitLabel="Lưu thay đổi" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
