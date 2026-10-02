import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { PosHeader } from './PosHeader';

interface PosOrdersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface CounterOrder {
  id: string;
  code: string;
  time: string;
  minutesAgo: string;
  type: 'dine-in' | 'takeaway' | 'pickup';
  typeLabel: string;
  tableOrBuzzer: string;
  customerName: string;
  customerRank: string;
  customerPhone: string;
  items: { name: string; qty: number; note?: string; options?: string[] }[];
  total: number;
  paymentMethod: string;
  status: 'ready' | 'brewing' | 'completed' | 'cancelled';
  statusLabel: string;
  statusTime?: string;
  stationOrStaff?: string;
}

export const PosOrdersPage: React.FC<PosOrdersPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedOrderCode, setSelectedOrderCode] = useState('ORD-042');
  const [statusFilter, setStatusFilter] = useState<'all' | 'brewing' | 'ready' | 'completed' | 'cancelled'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'dine-in' | 'takeaway' | 'pickup'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [orders, setOrders] = useState<CounterOrder[]>([
    {
      id: 'o-42',
      code: 'ORD-042',
      time: '10:38:12',
      minutesAgo: '4 phút trước',
      type: 'dine-in',
      typeLabel: 'Tại quán',
      tableOrBuzzer: 'Bàn 06 • Rung #08',
      customerName: 'Nguyễn Văn An',
      customerRank: 'Gold Member • 1.420 điểm',
      customerPhone: '0912***482',
      items: [
        { name: 'Cà phê Muối Di Sản (M, Ít ngọt)', qty: 2, options: ['Ít ngọt (50% đường)', 'Đá riêng', '+ Kem muối đánh béo'] },
        { name: 'Croissant Bơ Tỏi Nướng', qty: 1, note: 'Đun nóng bánh kỹ', options: ['Đun nóng lò 2 phút'] }
      ],
      total: 148000,
      paymentMethod: 'VietQR Đã TT',
      status: 'ready',
      statusLabel: 'SẴN SÀNG TRẢ',
      statusTime: 'Xong lúc 10:41'
    },
    {
      id: 'o-41',
      code: 'ORD-041',
      time: '10:35:05',
      minutesAgo: '7 phút trước',
      type: 'takeaway',
      typeLabel: 'Mang đi',
      tableOrBuzzer: 'Túi giấy quầy • #14',
      customerName: 'Trần Phương Linh',
      customerRank: 'Khách thân thiết • 320 điểm',
      customerPhone: '0988***112',
      items: [
        { name: 'Trà Ô Long Mãng Cầu Đỏ (L)', qty: 1, options: ['Ít ngọt (30%)', 'Thêm trân châu 3Q'] },
        { name: 'Cold Brew Cam Sả Quế (L)', qty: 1, options: ['Đá chuẩn', 'Lát cam sấy'] }
      ],
      total: 125000,
      paymentMethod: 'Thẻ POS 02',
      status: 'brewing',
      statusLabel: 'KDS ĐANG PHA',
      stationOrStaff: 'Trạm 1 (Barista Huy)'
    },
    {
      id: 'o-40',
      code: 'ORD-040',
      time: '10:22:15',
      minutesAgo: '20 phút trước',
      type: 'dine-in',
      typeLabel: 'Tại quán',
      tableOrBuzzer: 'Bàn 02 (Tầng 1)',
      customerName: 'Khách vãng lai',
      customerRank: 'Không tích điểm',
      customerPhone: 'Vãng lai',
      items: [
        { name: 'Espresso Double Shot', qty: 1 },
        { name: 'Nước suối Alba khoáng nhẹ', qty: 1 }
      ],
      total: 75000,
      paymentMethod: 'Tiền mặt',
      status: 'completed',
      statusLabel: 'ĐÃ HOÀN TẤT',
      statusTime: 'Đã giao lúc 10:28'
    },
    {
      id: 'o-39',
      code: 'ORD-039',
      time: '10:15:00',
      minutesAgo: 'Hẹn 10:45 lấy',
      type: 'pickup',
      typeLabel: 'Pickup App',
      tableOrBuzzer: 'Kệ lấy nhanh A2',
      customerName: 'Hoàng Thu Thảo',
      customerRank: 'Diamond VIP • 4.890 điểm',
      customerPhone: '0903***778',
      items: [
        { name: 'Trà Sữa Oolong Nướng Trân Châu', qty: 3 },
        { name: 'Tiramisu Cacao Ý', qty: 2 }
      ],
      total: 285000,
      paymentMethod: 'Ví Aura Pay Đã TT',
      status: 'ready',
      statusLabel: 'SẴN SÀNG Ở KỆ',
      statusTime: 'Hẹn 10:45'
    },
    {
      id: 'o-38',
      code: 'ORD-038',
      time: '10:10:40',
      minutesAgo: '31 phút trước',
      type: 'dine-in',
      typeLabel: 'Tại quán',
      tableOrBuzzer: 'Bàn 11 (Tầng 2)',
      customerName: 'Lê Hoàng Nam',
      customerRank: 'Silver • 180 điểm',
      customerPhone: '0934***901',
      items: [
        { name: 'Matcha Latte Yến Mạch (Nóng)', qty: 2, options: ['Ít ngọt', 'Sữa Oat Milk'] }
      ],
      total: 140000,
      paymentMethod: 'VietQR Đã TT',
      status: 'brewing',
      statusLabel: 'KDS ĐANG PHA',
      stationOrStaff: 'Trạm 2 (Barista An)'
    },
    {
      id: 'o-37',
      code: 'ORD-037',
      time: '09:50:20',
      minutesAgo: 'Đã hoàn tiền',
      type: 'dine-in',
      typeLabel: 'Tại quán',
      tableOrBuzzer: 'Bàn 04 (Khách hủy bận)',
      customerName: 'Vũ Đức Minh',
      customerRank: 'Khách thành viên',
      customerPhone: '0918***662',
      items: [
        { name: 'Pour Over Geisha Panama 90+', qty: 1 }
      ],
      total: 180000,
      paymentMethod: 'Đã hoàn tiền VietQR',
      status: 'cancelled',
      statusLabel: 'ĐÃ HỦY ĐƠN',
      statusTime: 'Duyệt bởi: Quản lý ca'
    }
  ]);

  const selectedOrder = orders.find(o => o.code === selectedOrderCode) || orders[0];

  const handleBuzzOrder = (order: CounterOrder) => {
    onShowToast?.(`Đã gửi lệnh rung chuông thẻ buzzer cho đơn #${order.code} (${order.customerName})!`);
  };

  const handlePrintReceipt = (code: string) => {
    onShowToast?.(`Đang in lại hóa đơn K80 cho đơn #${code}...`);
  };

  const handlePrintSticker = (code: string) => {
    onShowToast?.(`Đã in tem nhãn sticker KDS dán ly cho đơn #${code}!`);
  };

  const handleCompleteOrder = (code: string) => {
    setOrders(prev =>
      prev.map(o => (o.code === code ? { ...o, status: 'completed', statusLabel: 'ĐÃ HOÀN TẤT' } : o))
    );
    onShowToast?.(`Đã xác nhận trả đồ thành công cho đơn #${code}!`);
  };

  const handleRefund = (code: string) => {
    const reason = prompt(`Nhập lý do hủy hoặc hoàn tiền cho đơn #${code}:`);
    if (reason) {
      setOrders(prev =>
        prev.map(o =>
          o.code === code
            ? { ...o, status: 'cancelled', statusLabel: 'ĐÃ HỦY ĐƠN', paymentMethod: 'Đã hoàn tiền' }
            : o
        )
      );
      onShowToast?.(`Đã lập biên bản hủy đơn #${code} với lý do: "${reason}"`);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchType = typeFilter === 'all' || o.type === typeFilter;
    const matchSearch =
      searchQuery.trim() === '' ||
      o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.tableOrBuzzer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
      <PosHeader currentRoute="pos-orders" onNavigate={onNavigate} onShowToast={onShowToast} />

      {/* Operational Metrics Bar */}
      <div className="w-full px-4 sm:px-6 py-4 bg-white shadow-2xs border-b border-stone-200 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full xl:w-auto">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] text-primary uppercase font-bold tracking-wider">
                Phiên làm việc POS 02
              </span>
              <span className="text-stone-400 font-mono text-xs">/ Ca Sáng</span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900">Quản lý Đơn tại Quầy</h1>
              <span className="text-xs text-stone-500 font-mono">42 giao dịch hôm nay</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-stone-100 p-1.5 rounded-2xl sm:ml-4">
            <div className="px-3 py-1.5 bg-white rounded-xl shadow-2xs">
              <span className="text-[10px] text-stone-500 block">Doanh thu ca</span>
              <span className="text-sm font-bold text-stone-900 font-mono">5.820.000₫</span>
            </div>
            <div className="px-3 py-1.5 bg-white rounded-xl shadow-2xs">
              <span className="text-[10px] text-stone-500 block">Đang pha chế</span>
              <span className="text-sm font-bold text-amber-700 font-mono">06 ly</span>
            </div>
            <div className="px-3 py-1.5 bg-white rounded-xl shadow-2xs">
              <span className="text-[10px] text-stone-500 block">Sẵn sàng trả</span>
              <span className="text-sm font-bold text-emerald-600 font-mono">04 đơn</span>
            </div>
            <div className="px-3 py-1.5 bg-white rounded-xl shadow-2xs">
              <span className="text-[10px] text-stone-500 block">Thời gian TB</span>
              <span className="text-sm font-bold text-primary font-mono">3'42"/đơn</span>
            </div>
          </div>
        </div>

        {/* Quick Action buttons */}
        <div className="flex items-center gap-2 self-end xl:self-center">
          <button
            onClick={() => onShowToast?.('Đang gửi lệnh ping 4 thiết bị thẻ rung buzzer khách chờ nhận đồ!')}
            className="h-10 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-200"
          >
            <span className="material-symbols-outlined text-[18px] text-amber-800">sensors</span>
            <span>Rung gọi hàng loạt (4)</span>
          </button>
          <button
            onClick={() => onNavigate('pos-create')}
            className="h-10 px-4 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tạo Đơn Mới (F3)</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="w-full px-4 sm:px-6 py-2.5 bg-stone-100 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between border-b border-stone-200">
        <div className="relative flex-1 max-w-xl">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-stone-400">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã (#ORD-...), tên khách, số điện thoại, thẻ rung hoặc bàn..."
            className="w-full h-10 pl-9 pr-20 rounded-xl bg-white text-xs text-stone-900 placeholder:text-stone-400 border border-stone-200 focus:outline-none focus:border-primary"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-stone-100 text-stone-400 text-[10px] font-mono">
            Ctrl+K
          </span>
        </div>

        {/* Dining Type Filter */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 overflow-x-auto">
          {[
            { id: 'all', label: 'Tất cả hình thức' },
            { id: 'dine-in', label: 'Tại quán (Dine-in)' },
            { id: 'takeaway', label: 'Mang đi (Takeaway)' },
            { id: 'pickup', label: 'Đặt trước (Pickup)' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                typeFilter === t.id ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Tabs Bar */}
      <div className="w-full px-4 sm:px-6 bg-white border-b border-stone-200 flex items-center gap-2 overflow-x-auto py-2">
        {[
          { id: 'all', label: 'Tất cả đơn', count: 42, color: 'bg-primary text-white' },
          { id: 'brewing', label: 'Đang pha chế (KDS)', count: 6, dot: 'bg-amber-500' },
          { id: 'ready', label: 'Chờ giao khách / Sẵn sàng', count: 4, dot: 'bg-emerald-500' },
          { id: 'completed', label: 'Đã hoàn tất', count: 30, dot: 'bg-stone-400' },
          { id: 'cancelled', label: 'Đã hủy / Hoàn trả', count: 2, dot: 'bg-rose-500' },
        ].map(s => {
          const active = statusFilter === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                active ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {s.dot && <span className={`w-2 h-2 rounded-full ${s.dot}`} />}
              <span>{s.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  active ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {s.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Dual Pane Content */}
      <div className="w-full px-4 sm:px-6 py-4 flex flex-col xl:flex-row gap-5 items-start">
        {/* Left Table Section */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-3.5 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
            <span>
              Hiển thị <strong className="text-stone-900">{filteredOrders.length}</strong> đơn quầy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Đồng bộ tự động sau 10s
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-[11px] uppercase font-bold tracking-wider border-b border-stone-200">
                  <th className="py-2.5 px-3.5">Mã đơn & Giờ</th>
                  <th className="py-2.5 px-3.5">Loại & Bàn/Buzzer</th>
                  <th className="py-2.5 px-3.5">Khách hàng</th>
                  <th className="py-2.5 px-3.5">Tóm tắt món</th>
                  <th className="py-2.5 px-3.5 text-right">Tổng tiền</th>
                  <th className="py-2.5 px-3.5 text-center">Trạng thái</th>
                  <th className="py-2.5 px-3.5 text-center">Thao tác quầy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map(order => {
                  const isSelected = selectedOrder.code === order.code;
                  const isReady = order.status === 'ready';
                  const isBrewing = order.status === 'brewing';
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <tr
                      key={order.code}
                      onClick={() => setSelectedOrderCode(order.code)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-primary/5 font-medium'
                          : isReady
                          ? 'bg-emerald-50/40 hover:bg-emerald-50/80'
                          : isCancelled
                          ? 'bg-rose-50/20 hover:bg-rose-50/40'
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isReady ? 'text-emerald-600' : isBrewing ? 'text-amber-600' : 'text-stone-400'
                            }`}
                          >
                            {isReady ? 'notifications_active' : isBrewing ? 'blender' : 'receipt'}
                          </span>
                          <div>
                            <span className="font-bold text-primary font-mono block">#{order.code}</span>
                            <span className="text-[11px] text-stone-400 font-mono">{order.time}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-stone-100 font-bold text-[10px] text-stone-700 mb-1">
                          {order.typeLabel}
                        </span>
                        <p className="text-xs font-bold text-stone-800">{order.tableOrBuzzer}</p>
                      </td>

                      <td className="py-3 px-3.5">
                        <p className="font-bold text-stone-900">{order.customerName}</p>
                        <p className="text-[11px] text-amber-800 font-medium">{order.customerRank}</p>
                      </td>

                      <td className="py-3 px-3.5 max-w-xs">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="truncate text-xs text-stone-700">
                            <strong className="text-primary">{it.qty}x</strong> {it.name}
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-3.5 text-right">
                        <span className="font-bold font-mono text-stone-900 text-sm">
                          {order.total.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="block text-[10px] text-stone-400">{order.paymentMethod}</span>
                      </td>

                      <td className="py-3 px-3.5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            isReady
                              ? 'bg-emerald-100 text-emerald-800'
                              : isBrewing
                              ? 'bg-amber-100 text-amber-900'
                              : isCancelled
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {order.statusLabel}
                        </span>
                        {order.statusTime && (
                          <span className="block text-[10px] text-stone-400 mt-0.5">{order.statusTime}</span>
                        )}
                      </td>

                      <td className="py-3 px-3.5 text-center" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleBuzzOrder(order)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                            title="Bấm rung chuông khách"
                          >
                            <span className="material-symbols-outlined text-[16px]">volume_up</span>
                          </button>
                          <button
                            onClick={() => handlePrintReceipt(order.code)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                            title="In lại bill K80"
                          >
                            <span className="material-symbols-outlined text-[16px]">print</span>
                          </button>
                          <button
                            onClick={() => handlePrintSticker(order.code)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                            title="In tem dán ly"
                          >
                            <span className="material-symbols-outlined text-[16px]">label</span>
                          </button>
                          <button
                            onClick={() => handleCompleteOrder(order.code)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 hover:text-emerald-800 text-stone-700"
                            title="Giao xong"
                          >
                            <span className="material-symbols-outlined text-[16px]">done_all</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sticky Inspection Drawer */}
        <div className="w-full xl:w-[420px] bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden flex flex-col shrink-0 sticky top-24">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">receipt</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 font-mono">#{selectedOrder.code}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {selectedOrder.statusLabel}
                  </span>
                </div>
                <span className="text-[11px] text-stone-500">Tạo lúc: {selectedOrder.time} • Thu ngân: Mai Ly</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-stone-100/60 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                KH
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-stone-900">{selectedOrder.customerName}</p>
                <p className="text-[11px] text-amber-800">{selectedOrder.customerRank}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-white font-bold text-xs text-primary border border-stone-200">
                {selectedOrder.tableOrBuzzer}
              </span>
            </div>
          </div>

          {/* Itemized list */}
          <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Danh sách món ({selectedOrder.items.length} món)
            </p>
            {selectedOrder.items.map((it, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-primary">{it.qty}x</span>
                    <span className="font-bold text-xs sm:text-sm text-stone-900">{it.name}</span>
                  </div>
                </div>
                {it.options && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {it.options.map((opt, oIdx) => (
                      <span key={oIdx} className="px-1.5 py-0.5 rounded bg-white text-[10px] text-stone-600 border border-stone-200">
                        {opt}
                      </span>
                    ))}
                  </div>
                )}
                {it.note && (
                  <p className="text-[11px] text-amber-900 italic pt-1">Ghi chú: {it.note}</p>
                )}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 text-xs space-y-2">
            <p className="font-bold text-stone-500 uppercase text-[10px] tracking-wider">Tiến trình KDS</p>
            <div className="space-y-1.5 pl-3 border-l-2 border-stone-200">
              <div className="flex justify-between text-stone-600">
                <span>Nhận đơn quầy & Thanh toán:</span>
                <span className="font-mono">{selectedOrder.time}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Pha chế xong & Ra quầy:</span>
                <span className="font-mono">10:41:22</span>
              </div>
            </div>
          </div>

          {/* Payment summary */}
          <div className="p-4 border-t border-stone-200 bg-white space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Tổng thanh toán:</span>
              <span className="font-bold text-base text-primary font-mono">
                {selectedOrder.total.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <div className="flex justify-between text-stone-500 text-[11px]">
              <span>Phương thức:</span>
              <span className="font-semibold text-emerald-700">{selectedOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="p-4 bg-stone-100 border-t border-stone-200 space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleBuzzOrder(selectedOrder)}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">sensors</span>
                <span>Rung thẻ #{selectedOrder.code.slice(-2)}</span>
              </button>
              <button
                onClick={() => handlePrintReceipt(selectedOrder.code)}
                className="py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold flex items-center justify-center gap-1.5 border border-stone-200 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>In Hóa đơn K80</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handlePrintSticker(selectedOrder.code)}
                className="py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-medium flex items-center justify-center gap-1 border border-stone-200"
              >
                <span className="material-symbols-outlined text-[16px]">local_offer</span>
                <span>In tem ly (Stickers)</span>
              </button>
              <button
                onClick={() => handleRefund(selectedOrder.code)}
                className="py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium flex items-center justify-center gap-1 border border-rose-200"
              >
                <span className="material-symbols-outlined text-[16px]">assignment_return</span>
                <span>Hủy / Hoàn tiền</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
