import React from 'react';
import { PageRoute } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface ProfilePageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (message: string) => void;
}

const pointHistories = [
  { id: 'h1', date: '20/10/2024 15:30', action: 'Tích điểm đơn hàng #AUR-86410', points: '+116', balance: '450 điểm', type: 'plus' },
  { id: 'h2', date: '14/10/2024 08:20', action: 'Tích điểm đơn hàng #AUR-81209', points: '+65', balance: '334 điểm', type: 'plus' },
  { id: 'h3', date: '10/10/2024 19:10', action: 'Đổi điểm cho đơn hàng #AUR-12435', points: '-150', balance: '269 điểm', type: 'minus' },
  { id: 'h4', date: '02/10/2024 11:18', action: 'Hoàn điểm đơn hàng #AUR-79012', points: '+145', balance: '419 điểm', type: 'plus' },
];

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onShowToast }) => {
  const user = INITIAL_USER;
  const phone = user.phone || '0901 234 567';

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-4">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex items-center gap-2 text-xs text-stone-500 py-3 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Trang chủ</button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-stone-800 font-semibold">Điểm tích lũy</span>
        </div>

        <section className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">loyalty</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900">Điểm tích lũy</h1>
                <p className="text-sm text-stone-500 mt-0.5">Điểm được ghi nhận theo số điện thoại của bạn.</p>
              </div>
            </div>
            <div className="sm:text-right">
              <p className="text-3xl font-extrabold text-primary">{user.points} <span className="text-base font-semibold">điểm</span></p>
              <p className="text-xs text-stone-500 mt-1">Dùng điểm khi thanh toán đơn hàng đủ điều kiện</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-3 text-sm">
            <span className="material-symbols-outlined text-stone-400">phone</span>
            <span className="text-stone-500">Số điện thoại tích điểm:</span>
            <strong className="text-stone-900">{phone}</strong>
            <button onClick={() => onShowToast?.('Số điện thoại đã được sao chép.')} className="text-primary ml-auto" title="Sao chép số điện thoại">
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
            </button>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-stone-100 flex justify-between items-center gap-3">
            <div>
              <h2 className="font-bold text-stone-900">Lịch sử tích và đổi điểm</h2>
              <p className="text-xs text-stone-500 mt-1">Các giao dịch điểm theo số điện thoại {phone}.</p>
            </div>
            <button onClick={() => onShowToast?.('Đã xuất lịch sử điểm.')} className="text-xs text-primary font-bold flex items-center gap-1 whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">file_download</span>Xuất lịch sử
            </button>
          </div>
          <div className="divide-y divide-stone-100">
            {pointHistories.map(item => (
              <article key={item.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${item.type === 'plus' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    <span className="material-symbols-outlined text-lg">{item.type === 'plus' ? 'add_circle' : 'remove_circle'}</span>
                  </div>
                  <div className="min-w-0"><p className="text-sm font-semibold text-stone-900 truncate">{item.action}</p><p className="text-xs text-stone-400 mt-0.5">{item.date}</p></div>
                </div>
                <div className="text-right ml-3 shrink-0"><p className={`text-base font-bold ${item.type === 'plus' ? 'text-emerald-600' : 'text-rose-600'}`}>{item.points}</p><p className="text-[11px] text-stone-400">Số dư: {item.balance}</p></div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
