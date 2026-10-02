import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { KdsHeader } from './KdsHeader';

interface KdsTerminalPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface KdsTicketItem {
  id: string;
  qty: number;
  name: string;
  tags?: string[];
  note?: string;
  isDone?: boolean;
}

interface KdsTicket {
  id: string;
  code: string;
  type: 'dine-in' | 'takeaway' | 'delivery' | 'completed';
  typeLabel: string;
  target: string;
  slaTime: string;
  isOverdue?: boolean;
  buzzerOrBag?: string;
  customerOrDriver?: string;
  accentColor: string;
  items: KdsTicketItem[];
  allergenNote?: string;
  progressPercent?: number;
}

export const KdsTerminalPage: React.FC<KdsTerminalPageProps> = ({ onNavigate, onShowToast }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeStation, setActiveStation] = useState('all');
  const [recallModalTicket, setRecallModalTicket] = useState<string | null>(null);

  const [tickets, setTickets] = useState<KdsTicket[]>([
    {
      id: 't-42',
      code: 'ORD-042',
      type: 'dine-in',
      typeLabel: 'KHẨN CẤP',
      target: 'Bàn 06 (Tại quán)',
      slaTime: '08:12 (SLA: 05:00)',
      isOverdue: true,
      buzzerOrBag: 'Thẻ rung: #08',
      accentColor: 'bg-rose-600',
      allergenNote: 'Lưu ý dị ứng: Khách dị ứng đậu phộng, chú ý vệ sinh gắp bánh và máy xay.',
      items: [
        { id: 't42-1', qty: 2, name: 'Cà phê Muối Di Sản', tags: ['Size M', '50% đường', 'Đá riêng', '+Kem muối béo'] },
        { id: 't42-2', qty: 1, name: 'Croissant Bơ Tỏi Nướng', tags: ['Lò nướng: 2 phút nhiệt 180°C'], isDone: true }
      ]
    },
    {
      id: 't-41',
      code: 'ORD-041',
      type: 'takeaway',
      typeLabel: 'ĐANG PHA',
      target: 'Mang đi (Takeaway)',
      slaTime: '04:10 (Mục tiêu: 06:00)',
      buzzerOrBag: 'Túi giấy quầy #14',
      customerOrDriver: 'Trần P. Linh',
      accentColor: 'bg-amber-500',
      progressPercent: 50,
      items: [
        { id: 't41-1', qty: 1, name: 'Trà Ô Long Mãng Cầu Đỏ', tags: ['Size L', 'Ít ngọt (30%)', '+Trân châu 3Q'] },
        { id: 't41-2', qty: 1, name: 'Cold Brew Cam Sả Quế', tags: ['Size L', 'Chuẩn vị', 'Lát cam sấy'] }
      ]
    },
    {
      id: 't-44',
      code: 'ORD-044',
      type: 'delivery',
      typeLabel: 'GIAO HÀNG',
      target: 'ShopeeFood - Express',
      slaTime: '01:25 (Mục tiêu: 05:00)',
      customerOrDriver: 'TX: Đỗ Văn Hùng',
      accentColor: 'bg-blue-600',
      allergenNote: 'Yêu cầu đóng gói: Bọc màng co nắp chống tràn, giao xa 5km.',
      items: [
        { id: 't44-1', qty: 3, name: 'Bạc Xỉu Kem Trứng Nướng', tags: ['Size L', 'Sữa tươi thanh trùng', 'Phin ấm'] },
        { id: 't44-2', qty: 1, name: 'Tiramisu Cacao Ý', tags: ['+Đá gel bảo quản'] }
      ]
    },
    {
      id: 't-45',
      code: 'ORD-045',
      type: 'dine-in',
      typeLabel: 'MỚI NHẬN',
      target: 'Bàn 02 (Tại quán)',
      slaTime: '00:45 (Mục tiêu: 05:00)',
      buzzerOrBag: 'Ban công Tầng 2',
      accentColor: 'bg-stone-400',
      items: [
        { id: 't45-1', qty: 1, name: 'Espresso Double Shot', tags: ['Blend Arabica', 'Tách sứ nóng'] },
        { id: 't45-2', qty: 1, name: 'Nước khoáng Alba nhẹ', tags: ['Chai 450ml', 'Kèm ly đá'] }
      ]
    },
    {
      id: 't-39',
      code: 'ORD-039',
      type: 'completed',
      typeLabel: 'ĐÃ XONG',
      target: 'Bàn 09 (Tại quán)',
      slaTime: '10:41:22 (SLA: 03:52 ✓)',
      customerOrDriver: '4 phút trước',
      accentColor: 'bg-stone-300',
      items: [
        { id: 't39-1', qty: 2, name: 'Latte Macchiato Yến Mạch', isDone: true },
        { id: 't39-2', qty: 1, name: 'Bánh Tart Trứng Bồ Đào Nha', isDone: true }
      ]
    }
  ]);

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    onShowToast?.(`Đã ${!soundEnabled ? 'BẬT' : 'TẮT'} âm chuông thông báo KDS`);
  };

  const handleToggleItemDone = (ticketId: string, itemId: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          const updatedItems = t.items.map(it => (it.id === itemId ? { ...it, isDone: !it.isDone } : it));
          return { ...t, items: updatedItems };
        }
        return t;
      })
    );
    onShowToast?.('Đã cập nhật trạng thái món trên KDS.');
  };

  const handleCompleteTicket = (ticketId: string, code: string) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    onShowToast?.(`Đã hoàn tất đơn #${code} & kích hoạt rung thẻ Buzzer!`);
  };

  const handlePrintLabel = (code: string) => {
    onShowToast?.(`Lệnh in tem dán ly cho đơn #${code} đã gửi tới máy in KDS`);
  };

  const handleRecallConfirm = () => {
    if (!recallModalTicket) return;
    onShowToast?.(`Đơn #${recallModalTicket} đã được khôi phục vào hàng đợi pha chế chính!`);
    setRecallModalTicket(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 pb-16 flex flex-col">
      <KdsHeader currentRoute="kds-terminal" onNavigate={onNavigate} onShowToast={onShowToast} />

      {/* Sub Header Telemetry & Station Bar */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 space-y-3 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Live metrics clusters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-2 bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1.5 rounded-xl shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
              <div>
                <span className="font-bold uppercase text-[10px] block leading-tight">Đang chờ pha</span>
                <span className="font-bold text-sm">8 đơn <span className="text-[11px] font-normal">(14 ly)</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl">
              <span className="material-symbols-outlined text-[18px] text-amber-700">local_cafe</span>
              <div>
                <span className="font-bold uppercase text-[10px] block leading-tight">Đang thực hiện</span>
                <span className="font-bold text-sm">4 đơn <span className="text-[11px] font-normal">(6 ly)</span></span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-stone-50 text-stone-700 border border-stone-200 px-3 py-1.5 rounded-xl">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
              <div>
                <span className="font-bold uppercase text-[10px] block leading-tight">Hoàn tất trong ca</span>
                <span className="font-bold text-sm">45 ly <span className="text-[11px] font-normal text-emerald-600 font-semibold">(98.2% SLA)</span></span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-stone-50 text-stone-700 border border-stone-200 px-3 py-1.5 rounded-xl">
              <span className="material-symbols-outlined text-[18px] text-stone-500">timer</span>
              <div>
                <span className="font-bold uppercase text-[10px] block leading-tight">SLA Trung bình</span>
                <span className="font-bold text-sm font-mono">04:15 <span className="text-[11px] font-normal">/ 05:00</span></span>
              </div>
            </div>
          </div>

          {/* Action toggles */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleToggleSound}
              className={`h-9 px-3 rounded-xl border flex items-center gap-1.5 font-semibold transition-colors ${
                soundEnabled
                  ? 'bg-stone-50 border-stone-200 text-stone-800'
                  : 'bg-stone-200 border-stone-300 text-stone-500'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-primary">
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span>Âm chuông: {soundEnabled ? 'Bật' : 'Tắt'}</span>
            </button>

            <button
              onClick={() => onShowToast?.('Đã sắp xếp thứ tự: Đơn cũ nhất ưu tiên trước')}
              className="h-9 px-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">swap_vert</span>
              <span className="hidden sm:inline">Cũ nhất trước</span>
            </button>

            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                  onShowToast?.('Đã mở toàn màn hình KDS');
                } else {
                  document.exitFullscreen?.();
                  onShowToast?.('Đã thoát toàn màn hình');
                }
              }}
              className="h-9 px-3 rounded-xl bg-primary text-white hover:bg-primary-container font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              <span className="hidden sm:inline">Toàn màn hình</span>
            </button>
          </div>
        </div>

        {/* Station Filters */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'Tất cả trạm pha chế (12)' },
              { id: 'espresso', label: 'Trạm Cà phê máy (Espresso Bar) (6)' },
              { id: 'brew', label: 'Trạm Trà & Đá xay (Brew Bar) (4)' },
              { id: 'bakery', label: 'Lò nướng Bánh (Bakery Hub) (2)' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setActiveStation(s.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-colors ${
                  activeStation === s.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>Làm mới tự động: <strong className="text-primary font-mono font-bold">05s</strong></span>
            <button onClick={() => onShowToast?.('Đã làm mới dữ liệu KDS.')} className="text-stone-500 hover:text-stone-900">
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Canvas */}
      <div className="p-4 sm:p-6 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {tickets.map(ticket => {
            const isCompleted = ticket.type === 'completed';

            return (
              <div
                key={ticket.id}
                className={`bg-white rounded-2xl border shadow-xs overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 ${
                  ticket.isOverdue
                    ? 'border-rose-300 ring-2 ring-rose-500/20'
                    : isCompleted
                    ? 'border-stone-200 opacity-75'
                    : 'border-stone-200'
                }`}
              >
                {/* Header ribbon */}
                <div className={`h-1.5 w-full ${ticket.accentColor}`} />

                {/* Ticket Header */}
                <div className={`p-3.5 border-b border-stone-100 ${
                  ticket.isOverdue ? 'bg-rose-50/50' : 'bg-stone-50/70'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-sm ${ticket.isOverdue ? 'text-rose-600' : 'text-stone-900'}`}>
                          #{ticket.code}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ticket.isOverdue
                            ? 'bg-rose-600 text-white'
                            : 'bg-stone-200 text-stone-800'
                        }`}>
                          {ticket.typeLabel}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-stone-800 block mt-0.5">
                        {ticket.target}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`font-mono text-xs font-bold block ${
                        ticket.isOverdue ? 'text-rose-600 animate-pulse' : 'text-stone-800'
                      }`}>
                        {ticket.slaTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2">
                    {ticket.buzzerOrBag && <span>{ticket.buzzerOrBag}</span>}
                    {ticket.customerOrDriver && <span className="font-semibold text-stone-700">{ticket.customerOrDriver}</span>}
                  </div>
                </div>

                {/* Ticket Line Items */}
                <div className="p-3.5 flex-1 space-y-2.5">
                  {ticket.items.map(item => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl border transition-all ${
                        item.isDone
                          ? 'bg-stone-50 border-stone-200 opacity-60 line-through'
                          : 'bg-stone-50/50 border-stone-200/80 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-primary text-xs">{item.qty}x</span>
                          <div>
                            <p className="font-bold text-xs text-stone-900 leading-tight">{item.name}</p>
                            {item.tags && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.tags.map((tg, idx) => (
                                  <span key={idx} className="px-1.5 py-0.2 rounded bg-white text-[10px] text-stone-600 border border-stone-200">
                                    {tg}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {!isCompleted && (
                          <button
                            onClick={() => handleToggleItemDone(ticket.id, item.id)}
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                              item.isDone
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-700 hover:bg-primary hover:text-white'
                            }`}
                          >
                            {item.isDone ? 'Xong ✓' : 'Đang làm'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {ticket.allergenNote && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-[11px] flex items-start gap-1.5 font-medium leading-relaxed">
                      <span className="material-symbols-outlined text-[16px] text-rose-600 shrink-0">warning</span>
                      <span>{ticket.allergenNote}</span>
                    </div>
                  )}

                  {ticket.progressPercent !== undefined && (
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] text-stone-500 mb-1">
                        <span>Tiến độ hoàn thành:</span>
                        <span className="font-mono font-bold">1/2 món</span>
                      </div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${ticket.progressPercent}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Ticket Actions */}
                <div className="p-3 bg-stone-50 border-t border-stone-100 space-y-1.5 text-xs">
                  {!isCompleted ? (
                    <>
                      <button
                        onClick={() => handleCompleteTicket(ticket.id, ticket.code)}
                        className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container shadow-2xs flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>HOÀN TẤT ĐƠN (Space)</span>
                      </button>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => handlePrintLabel(ticket.code)}
                          className="py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-semibold border border-stone-200 flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px]">print</span>
                          <span>In tem ly</span>
                        </button>
                        <button
                          onClick={() => onShowToast?.(`Đã báo trễ 3 phút cho đơn #${ticket.code} tới quầy thu ngân.`)}
                          className="py-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-700 font-semibold border border-stone-200 flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px]">update</span>
                          <span>Báo trễ 3p</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setRecallModalTicket(ticket.code)}
                        className="w-full py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold border border-stone-200 flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">history</span>
                        <span>Mở lại đơn pha lại</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recall Modal */}
      {recallModalTicket && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <h4 className="font-bold text-base text-stone-900">Xác nhận hoàn nguyên đơn?</h4>
            </div>
            <p className="text-xs text-stone-600">
              Đơn hàng <strong>#{recallModalTicket}</strong> sẽ được chuyển ngược về hàng đợi pha chế chính và đặt lại bộ đếm SLA.
            </p>
            <div className="flex justify-end gap-2 text-xs pt-2">
              <button
                onClick={() => setRecallModalTicket(null)}
                className="px-4 py-2 rounded-xl text-stone-600 font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleRecallConfirm}
                className="px-4 py-2 rounded-xl bg-primary text-white font-bold"
              >
                Xác nhận chuyển lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barista Footer bar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-white/95 backdrop-blur-md border-t border-stone-200 z-30 px-4 sm:px-6 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="material-symbols-outlined text-[16px]">print</span>
            Máy in tem KDS: Sẵn sàng (Khay 80mm)
          </span>
          <span className="text-stone-300">•</span>
          <span>Tốc độ phản hồi lệnh: 12ms</span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-[10px]">Space</kbd> Xong món</span>
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-[10px]">Enter</kbd> Hoàn tất đơn</span>
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-[10px]">Esc</kbd> Gọi phụ tá</span>
        </div>
      </div>
    </div>
  );
};
