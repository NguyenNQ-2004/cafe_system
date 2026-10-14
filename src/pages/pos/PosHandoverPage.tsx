import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { PosHeader } from './PosHeader';
import { useDb } from '../../data/DbContext';
import {
  POSITION_LABEL,
  SCHEDULE_STATUS_LABEL,
  SHIFT_LABEL,
  fmtDate,
  fmtDateTime,
  fmtMoney,
  initials,
  nowSql,
  shiftTimeRange,
  userName
} from '../../data/dbUtils';

interface PosHandoverPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

const SHIFT_ORDER = { MORNING: 0, AFTERNOON: 1, EVENING: 2 } as const;

// Checklist không có bảng riêng: kết quả được ghi tóm tắt vào work_schedules.note khi bàn giao
const CHECKLIST = ['Máy POS & máy in hóa đơn hoạt động tốt', 'Két tiền đã khóa, đủ tiền lẻ', 'Không còn đơn tồn chưa trả khách'];

export const PosHandoverPage: React.FC<PosHandoverPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, session, transact } = useDb();

  // Ca vừa chốt của thu ngân (COMPLETED, có ending_cash_actual)
  const outgoing = db.work_schedules
    .filter(s => s.user_id === session.cashierId && s.status === 'COMPLETED' && s.ending_cash_actual !== null)
    .sort((a, b) => (a.check_out_time ?? '') < (b.check_out_time ?? '') ? 1 : -1)[0];

  // Ca kế tiếp đã xếp lịch (người nhận bàn giao)
  const candidates = db.work_schedules
    .filter(s => s.status === 'SCHEDULED' && s.user_id !== session.cashierId)
    .filter(s =>
      outgoing
        ? s.work_date > outgoing.work_date ||
          (s.work_date === outgoing.work_date && SHIFT_ORDER[s.shift_name] > SHIFT_ORDER[outgoing.shift_name])
        : true
    )
    .sort((a, b) =>
      a.work_date === b.work_date ? SHIFT_ORDER[a.shift_name] - SHIFT_ORDER[b.shift_name] : a.work_date < b.work_date ? -1 : 1
    );

  const [incomingId, setIncomingId] = useState<number | null>(candidates[0]?.id ?? null);
  const [leaveCash, setLeaveCash] = useState<number>(outgoing?.starting_cash ?? 500000);
  const [checks, setChecks] = useState<boolean[]>(CHECKLIST.map(() => true));
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState<{ drop: number; leave: number; receiver: string } | null>(null);

  const incoming = db.work_schedules.find(s => s.id === incomingId);
  const actual = outgoing?.ending_cash_actual ?? 0;
  const safeDrop = Math.max(0, actual - leaveCash);

  if (!outgoing) {
    return (
      <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
        <PosHeader currentRoute="pos-handover" onNavigate={onNavigate} onShowToast={onShowToast} />
        <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl border border-stone-200 p-6 text-center space-y-3">
          <span className="material-symbols-outlined text-[40px] text-stone-300">assignment_late</span>
          <h1 className="text-lg font-bold text-stone-900">Chưa có ca nào được chốt</h1>
          <p className="text-xs text-stone-500">Hãy chốt ca và kiểm đếm két trước khi bàn giao.</p>
          <button onClick={() => onNavigate('pos-shift')} className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold">
            Đến màn hình chốt ca
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incoming) {
      onShowToast?.('Chưa có ca kế tiếp để nhận bàn giao. Hãy nhờ quản lý xếp lịch.');
      return;
    }
    if (leaveCash > actual) {
      onShowToast?.('Tiền để lại không được lớn hơn tiền thực tế trong két.');
      return;
    }
    if (!agree) {
      onShowToast?.('Vui lòng xác nhận hai bên đã kiểm đếm.');
      return;
    }
    const failed = CHECKLIST.filter((_, i) => !checks[i]);
    const receiver = userName(db, incoming.user_id);
    transact(tx => {
      tx.update('work_schedules', outgoing.id, {
        note: [
          outgoing.note,
          `Bàn giao cho ${receiver}: để lại ${fmtMoney(leaveCash)}, nộp ${fmtMoney(safeDrop)}`,
          failed.length ? `Chưa đạt: ${failed.join(', ')}` : 'Checklist đạt'
        ]
          .filter(Boolean)
          .join(' | ')
      });
      tx.update('work_schedules', incoming.id, {
        status: 'PRESENT',
        check_in_time: nowSql(),
        starting_cash: leaveCash,
        note: [incoming.note, `Nhận bàn giao từ ${userName(db, outgoing.user_id)}`].filter(Boolean).join(' | ')
      });
    });
    setDone({ drop: safeDrop, leave: leaveCash, receiver });
  };

  const person = (userId: number) => db.users.find(u => u.id === userId);

  return (
    <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
      <PosHeader currentRoute="pos-handover" onNavigate={onNavigate} onShowToast={onShowToast} />

      <div className="w-full px-4 sm:px-6 py-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">assignment_turned_in</span>
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">Screen 27 • Bàn giao ca</span>
              <h1 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">Biên bản bàn giao két</h1>
              <p className="text-xs text-stone-500">Dữ liệu lấy từ work_schedules của hai ca</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('pos-shift')}
            className="h-9 px-3.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold flex items-center gap-1.5 self-start"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Quay lại chốt ca
          </button>
        </div>

        {/* Hai bên */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Bên bàn giao', color: 'bg-primary', schedule: outgoing },
            { title: 'Bên nhận', color: 'bg-blue-600', schedule: incoming }
          ].map(side => {
            const u = side.schedule ? person(side.schedule.user_id) : undefined;
            return (
              <div key={side.title} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1.5 h-full ${side.color}`} />
                <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-bold text-[10px] uppercase">{side.title}</span>
                {side.schedule && u ? (
                  <>
                    <div className="flex items-center gap-3 mt-3">
                      <div className={`w-12 h-12 rounded-2xl ${side.color} text-white flex items-center justify-center font-bold text-sm`}>
                        {initials(u.full_name)}
                      </div>
                      <div>
                        <p className="font-bold text-base text-stone-900">{u.full_name}</p>
                        <p className="text-xs text-stone-500">{u.position ? POSITION_LABEL[u.position] : '—'} • {u.phone}</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-stone-50 p-3 rounded-xl border border-stone-200/60 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Ca:</span>
                        <span className="font-semibold text-stone-900">
                          {SHIFT_LABEL[side.schedule.shift_name]} {fmtDate(side.schedule.work_date)} ({shiftTimeRange(db, side.schedule.shift_name)})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Trạng thái:</span>
                        <span className="font-semibold text-stone-900">{SCHEDULE_STATUS_LABEL[side.schedule.status]}</span>
                      </div>
                      {side.schedule.check_out_time && (
                        <div className="flex justify-between">
                          <span className="text-stone-500">Ra ca:</span>
                          <span className="font-semibold text-stone-900">{fmtDateTime(side.schedule.check_out_time)}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-3 text-xs text-stone-500">
                    {candidates.length === 0 ? 'Chưa có ca kế tiếp được xếp lịch.' : 'Chọn người nhận bên dưới.'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Tiền két */}
          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-sm text-stone-900 pb-3 border-b border-stone-100">Tiền mặt trong két</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block">Hệ thống (ending_cash_system)</span>
                  <p className="text-lg font-black text-stone-900 font-mono mt-0.5">{fmtMoney(outgoing.ending_cash_system)}</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block">Thực tế (ending_cash_actual)</span>
                  <p className="text-lg font-black text-primary font-mono mt-0.5">{fmtMoney(actual)}</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block">Chênh lệch</span>
                  <p className={`text-lg font-black font-mono mt-0.5 ${actual - (outgoing.ending_cash_system ?? 0) === 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {fmtMoney(actual - (outgoing.ending_cash_system ?? 0))}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 block">
                  <span className="text-stone-500 block mb-1">Tiền để lại cho ca sau (starting_cash ca nhận)</span>
                  <input
                    type="number"
                    min={0}
                    max={actual}
                    value={leaveCash}
                    onChange={e => setLeaveCash(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-10 px-3 rounded-lg border border-stone-300 font-mono font-bold"
                  />
                </label>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block">Doanh thu tiền mặt nộp quản lý</span>
                  <p className="text-xl font-black text-stone-900 font-mono mt-1">{fmtMoney(safeDrop)}</p>
                </div>
              </div>
              {outgoing.note && <p className="text-[11px] text-stone-600">Ghi chú ca: {outgoing.note}</p>}
            </div>
          </div>

          {/* Xác nhận */}
          <div className="xl:col-span-5 space-y-4">
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-md space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Người nhận (ca kế tiếp đã xếp lịch)</label>
                <select
                  value={incomingId ?? ''}
                  onChange={e => setIncomingId(Number(e.target.value) || null)}
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 bg-white"
                >
                  {candidates.length === 0 && <option value="">Không có ca kế tiếp</option>}
                  {candidates.map(s => (
                    <option key={s.id} value={s.id}>
                      {userName(db, s.user_id)} - {SHIFT_LABEL[s.shift_name]} {fmtDate(s.work_date)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-stone-700 block">Checklist bàn giao</span>
                {CHECKLIST.map((c, i) => (
                  <label key={c} className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checks[i]}
                      onChange={() => setChecks(prev => prev.map((v, idx) => (idx === i ? !v : v)))}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>

              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="accent-primary w-4 h-4 rounded mt-0.5" />
                <span className="text-[11px] text-stone-600 leading-snug">
                  Hai bên đã cùng kiểm đếm tiền mặt và chịu trách nhiệm về số liệu bàn giao.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
                XÁC NHẬN BÀN GIAO
              </button>
            </form>
          </div>
        </div>
      </div>

      {done && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">Bàn giao ca thành công!</h3>
            <p className="text-xs text-stone-500">
              <strong>{done.receiver}</strong> đã được ghi nhận vào ca với tiền đầu ca {fmtMoney(done.leave)}.
            </p>
            <div className="bg-stone-50 p-3.5 rounded-xl text-left text-xs space-y-1.5 border border-stone-200">
              <div className="flex justify-between">
                <span className="text-stone-500">Nộp quản lý:</span>
                <span className="font-bold text-stone-900 font-mono">{fmtMoney(done.drop)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Để lại trong két:</span>
                <span className="font-bold text-primary font-mono">{fmtMoney(done.leave)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setDone(null);
                onNavigate('pos-create');
              }}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-primary-container"
            >
              Về màn hình bán hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
