import React, { useState } from 'react';
import { PageRoute, PaymentMethod, WorkSchedule } from '../../types';
import { PosHeader } from './PosHeader';
import { useDb } from '../../data/DbContext';
import {
  PAYMENT_METHOD_ICON,
  PAYMENT_METHOD_LABEL,
  SCHEDULE_STATUS_LABEL,
  SHIFT_LABEL,
  fmtDate,
  fmtDateTime,
  fmtMoney,
  nowSql,
  shiftTimeRange
} from '../../data/dbUtils';
import type { DbState } from '../../types';

interface PosShiftPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

const DENOMS = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000];
const METHODS: PaymentMethod[] = ['CASH', 'BANK_TRANSFER', 'VNPAY', 'MOMO'];

// Các khoản thanh toán thành công của đơn do thu ngân tạo trong ngày làm việc
export const shiftPayments = (db: DbState, schedule: WorkSchedule) =>
  db.payments.filter(p => {
    const order = db.orders.find(o => o.id === p.order_id);
    return (
      p.status === 'SUCCESS' &&
      order?.cashier_id === schedule.user_id &&
      order.status !== 'CANCELLED' &&
      (p.paid_at ?? '').startsWith(schedule.work_date)
    );
  });

export const PosShiftPage: React.FC<PosShiftPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, session, transact } = useDb();
  const mySchedules = db.work_schedules
    .filter(s => s.user_id === session.cashierId)
    .sort((a, b) => (a.work_date < b.work_date ? 1 : -1));
  const current = mySchedules.find(s => s.status === 'PRESENT');

  const [denoms, setDenoms] = useState<Record<number, number>>({});
  const [shiftNote, setShiftNote] = useState('');
  const [openingCash, setOpeningCash] = useState('500000');

  if (!current) {
    const next = mySchedules.find(s => s.status === 'SCHEDULED');
    return (
      <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
        <PosHeader currentRoute="pos-shift" onNavigate={onNavigate} onShowToast={onShowToast} />
        <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 text-xs">
          <h1 className="text-lg font-bold text-stone-900">Chưa có ca đang làm</h1>
          {next ? (
            <>
              <p className="text-stone-600">
                Ca tiếp theo: <strong>{SHIFT_LABEL[next.shift_name]}</strong> ngày {fmtDate(next.work_date)} ({shiftTimeRange(db, next.shift_name)}).
              </p>
              <label className="block">
                <span className="font-semibold text-stone-700">Tiền đầu ca (starting_cash)</span>
                <input
                  type="number"
                  min={0}
                  value={openingCash}
                  onChange={e => setOpeningCash(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-xl border border-stone-300 font-mono"
                />
              </label>
              <button
                onClick={() => {
                  transact(tx =>
                    tx.update('work_schedules', next.id, {
                      status: 'PRESENT',
                      check_in_time: nowSql(),
                      starting_cash: Math.max(0, Number(openingCash) || 0)
                    })
                  );
                  onShowToast?.('Đã vào ca và ghi nhận tiền đầu ca.');
                }}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold"
              >
                Vào ca (check-in)
              </button>
            </>
          ) : (
            <p className="text-stone-500">Bạn chưa được xếp lịch ca nào. Liên hệ quản lý để được phân ca.</p>
          )}
        </div>
      </div>
    );
  }

  const payments = shiftPayments(db, current);
  const byMethod = METHODS.map(m => {
    const list = payments.filter(p => p.payment_method === m);
    return { method: m, count: list.length, amount: list.reduce((s, p) => s + p.amount, 0) };
  });
  const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);
  const cashRevenue = byMethod.find(b => b.method === 'CASH')!.amount;
  const startingCash = current.starting_cash ?? 0;
  const endingCashSystem = startingCash + cashRevenue; // work_schedules.ending_cash_system
  const counted = DENOMS.reduce((s, d) => s + d * (denoms[d] ?? 0), 0); // work_schedules.ending_cash_actual
  const diff = counted - endingCashSystem;

  const handleCloseShift = () => {
    if (!confirm(`Chốt ${SHIFT_LABEL[current.shift_name]} ngày ${fmtDate(current.work_date)}? Tiền thực tế: ${fmtMoney(counted)}.`)) return;
    transact(tx =>
      tx.update('work_schedules', current.id, {
        check_out_time: nowSql(),
        ending_cash_system: endingCashSystem,
        ending_cash_actual: counted,
        status: 'COMPLETED',
        note: [current.note, shiftNote.trim() && `Chốt ca: ${shiftNote.trim()}`, diff !== 0 && `Chênh lệch két ${fmtMoney(diff)}`]
          .filter(Boolean)
          .join(' | ')
      })
    );
    onShowToast?.('Đã chốt ca. Chuyển sang bàn giao két cho ca sau.');
    onNavigate('pos-handover');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
      <PosHeader currentRoute="pos-shift" onNavigate={onNavigate} onShowToast={onShowToast} />

      <div className="w-full px-4 sm:px-6 py-4 space-y-5">
        {/* work_schedules hiện tại */}
        <div className="w-full bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
          <div className="flex items-center gap-4 pl-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[28px]">storefront</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-stone-900">
                  {SHIFT_LABEL[current.shift_name]} ({shiftTimeRange(db, current.shift_name)})
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {SCHEDULE_STATUS_LABEL[current.status]}
                </span>
                <span className="text-xs text-stone-400 font-mono">Lịch #{current.id}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 flex-wrap">
                <span>Ngày: {fmtDate(current.work_date)}</span>
                <span>•</span>
                <span>Vào ca: {fmtDateTime(current.check_in_time)}</span>
                {current.note && (
                  <>
                    <span>•</span>
                    <span>{current.note}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200/60 text-right">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Tiền đầu ca</span>
              <span className="text-base font-black text-stone-900 font-mono">{fmtMoney(startingCash)}</span>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Giao dịch trong ca</span>
              <span className="text-base font-black text-primary font-mono">{payments.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Doanh thu theo payment_method */}
          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
                <h3 className="font-bold text-sm text-stone-900">Doanh thu theo phương thức thanh toán</h3>
              </div>
              <div className="mt-3 p-4 bg-gradient-to-r from-primary/10 via-stone-50 to-white rounded-xl border border-stone-200/80 flex items-center justify-between">
                <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Tổng doanh thu đã thu</span>
                <span className="text-2xl sm:text-3xl font-black text-primary font-mono">{fmtMoney(totalRevenue)}</span>
              </div>
              <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">Phương thức</th>
                      <th className="py-2.5 px-3 text-center">Số giao dịch</th>
                      <th className="py-2.5 px-3 text-right">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {byMethod.map(b => (
                      <tr key={b.method} className="hover:bg-stone-50">
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">{PAYMENT_METHOD_ICON[b.method]}</span>
                            <strong className="text-stone-900">{PAYMENT_METHOD_LABEL[b.method]}</strong>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center font-semibold">{b.count}</td>
                        <td className="py-2.5 px-3 text-right font-bold font-mono text-stone-900">{fmtMoney(b.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Tiền mặt hệ thống (ending_cash_system)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block">Tiền đầu ca</span>
                    <span className="font-bold font-mono text-stone-900">{fmtMoney(startingCash)}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block">+ Thu tiền mặt</span>
                    <span className="font-bold font-mono text-emerald-600">{fmtMoney(cashRevenue)}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-400 block">= Phải có trong két</span>
                    <span className="font-bold font-mono text-primary">{fmtMoney(endingCashSystem)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kiểm đếm tiền -> ending_cash_actual */}
          <div className="xl:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-sm text-stone-900">Kiểm đếm tiền mặt đóng ca</h3>
                <button onClick={() => setDenoms({})} className="text-xs text-stone-500 hover:text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                  Nhập lại
                </button>
              </div>
              <div className="space-y-1.5 font-mono text-xs mt-3">
                {DENOMS.map(d => (
                  <div key={d} className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                    <span className="font-bold text-stone-900 w-24">{fmtMoney(d)}</span>
                    <div className="flex items-center gap-1.5 font-sans">
                      <span className="text-stone-400">x</span>
                      <input
                        type="number"
                        min={0}
                        value={denoms[d] ?? 0}
                        onChange={e => setDenoms({ ...denoms, [d]: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                        className="w-16 h-8 text-center rounded-lg bg-white border border-stone-300 font-mono font-bold text-xs"
                      />
                    </div>
                    <span className="w-28 text-right font-bold text-stone-900">{fmtMoney(d * (denoms[d] ?? 0))}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3.5 bg-stone-100 rounded-xl flex items-center justify-between">
                <span className="text-[10px] text-stone-500 uppercase font-bold">Tiền thực tế (ending_cash_actual)</span>
                <span className="text-xl font-black text-stone-900 font-mono">{fmtMoney(counted)}</span>
              </div>
              <div
                className={`mt-3 p-3.5 rounded-xl border flex items-center justify-between ${
                  diff === 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : diff > 0 ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <span className="font-bold text-xs">{diff === 0 ? 'Khớp két' : diff > 0 ? 'Thừa tiền' : 'Thiếu tiền'}</span>
                <span className="text-base font-bold font-mono">{diff > 0 ? '+' : ''}{fmtMoney(diff)}</span>
              </div>
              <textarea
                rows={2}
                value={shiftNote}
                onChange={e => setShiftNote(e.target.value)}
                placeholder="Ghi chú chốt ca (lưu vào work_schedules.note)..."
                className="mt-4 w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-primary resize-none"
              />
              <button
                type="button"
                onClick={handleCloseShift}
                className="mt-4 w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                Chốt ca & chuyển sang bàn giao
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
