import React, { useState } from 'react';
import { PageRoute, PastOrder } from '../types';
import { INITIAL_PAST_ORDERS } from '../data/mockData';

interface OrdersPageProps {
  onNavigate: (route: PageRoute) => void;
  onReorder: (order: PastOrder) => void;
  onOpenFeedbackForOrder: (orderId: string) => void;
  onOpenDriverChat: (driverName: string, orderId: string) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({
  onNavigate,
  onReorder,
  onOpenFeedbackForOrder,
  onOpenDriverChat
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'shipping' | 'completed' | 'canceled'>('all');
  const [searchCode, setSearchCode] = useState('');
  const [orders] = useState<PastOrder[]>(INITIAL_PAST_ORDERS);

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      searchCode.trim() === '' ||
      o.id.toLowerCase().includes(searchCode.toLowerCase()) ||
      o.itemsSummary.toLowerCase().includes(searchCode.toLowerCase());

    if (!matchSearch) return false;
    if (activeTab === 'all') return true;
    return o.status === activeTab;
  });

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-margin-lg py-space-xl flex flex-col gap-space-xl">
        {/* Header Meta & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                Theo dõi &amp; Đối soát đơn
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-tabular-data text-tabular-data text-on-surface-variant font-medium">
                Cập nhật 1 phút trước
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
              Đơn hàng của tôi
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Quản lý các tách cà phê thủ công yêu thích và kiểm tra tiến trình giao vận theo thời gian thực.
            </p>
          </div>

          {/* Live Search */}
          <div className="flex items-center gap-space-sm w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                receipt_long
              </span>
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Tìm theo mã đơn #AUR-..."
                className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-secondary font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-high"
              />
            </div>
            <button
              onClick={() => alert('Bộ lọc ngày: 7 ngày qua, 30 ngày qua, 90 ngày qua')}
              className="h-10 px-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-center gap-space-xs text-on-surface hover:bg-surface-container transition-colors cursor-pointer border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
              <span className="font-label-md text-label-md hidden sm:inline">Lọc ngày</span>
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-space-xs shrink-0 shadow-sm cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-white font-semibold'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>Tất cả đơn</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-current text-[10px] font-tabular-data">
              8
            </span>
          </button>
          <button
            onClick={() => setActiveTab('processing')}
            className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-space-xs shrink-0 shadow-sm cursor-pointer ${
              activeTab === 'processing'
                ? 'bg-primary text-white font-semibold'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>Đang xử lý</span>
            <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px] font-tabular-data">
              1
            </span>
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-space-xs shrink-0 shadow-sm cursor-pointer ${
              activeTab === 'shipping'
                ? 'bg-primary text-white font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span>Đang giao hàng</span>
            <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-secondary text-[10px] font-tabular-data">
              0
            </span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-space-xs shrink-0 shadow-sm cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-primary text-white font-semibold'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>Đã hoàn thành</span>
            <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-secondary text-[10px] font-tabular-data">
              6
            </span>
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-space-xs shrink-0 shadow-sm cursor-pointer ${
              activeTab === 'canceled'
                ? 'bg-primary text-white font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span>Đã hủy</span>
            <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-secondary text-[10px] font-tabular-data">
              1
            </span>
          </button>
        </div>

        {/* Active Live Order Spotlight Card (#AUR-89241) */}
        {(activeTab === 'all' || activeTab === 'processing') && (
          <div className="relative bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col border border-surface-container-high">
            {/* Status Strip */}
            <div className="bg-gradient-to-r from-primary-container via-primary to-primary-container p-space-md text-white flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-white animate-pulse">
                    skillet
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm font-bold tracking-wide">
                      Đơn hàng #AUR-89241
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-primary font-label-sm text-label-sm uppercase font-bold tracking-wider">
                      Đang chuẩn bị món
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-primary-container">
                    Chi nhánh Tràng Tiền • Đặt lúc 09:45, hôm nay
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-space-lg">
                <div className="text-right">
                  <span className="font-label-sm text-label-sm text-on-primary-container block uppercase tracking-wider">
                    Thời gian nhận dự kiến
                  </span>
                  <span className="font-headline-sm text-headline-sm font-tabular-data font-bold text-white">
                    10:15 (~18 phút nữa)
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-space-xs bg-white/15 px-space-md py-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-white text-[18px]">verified</span>
                  <span className="font-label-sm text-label-sm font-medium">Bảo hiểm độ ấm cà phê</span>
                </div>
              </div>
            </div>

            {/* Tracking Content Grid */}
            <div className="p-space-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
              {/* Left: Progress Stepper & Items (7 cols) */}
              <div className="lg:col-span-12 flex flex-col gap-space-xl">
                {/* Stepper */}
                <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-xl border border-surface-container-high">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Tiến trình đơn hàng
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                      Bước 2 / 4
                    </span>
                  </div>

                  <div className="relative flex flex-col sm:flex-row justify-between gap-space-md sm:gap-0 pt-2 pb-1">
                    {/* Track line */}
                    <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-surface-container-highest z-0">
                      <div className="h-full bg-primary-container w-[45%] rounded-full transition-all duration-700" />
                    </div>

                    {/* Step 1: Placed */}
                    <div className="relative z-10 flex sm:flex-col items-center gap-space-sm text-left sm:text-center sm:w-1/4">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-[16px]">done</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Đã đặt đơn
                        </span>
                        <span className="font-tabular-data text-tabular-data text-on-surface-variant font-medium">
                          09:45 • Xong
                        </span>
                      </div>
                    </div>

                    {/* Step 2: Barista in prep */}
                    <div className="relative z-10 flex sm:flex-col items-center gap-space-sm text-left sm:text-center sm:w-1/4">
                      <div className="relative w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center shadow-md ring-4 ring-primary-container/20 shrink-0">
                        <span className="material-symbols-outlined text-[16px] animate-[spin_4s_linear_infinite]">
                          local_cafe
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-primary font-bold">
                          Barista pha chế
                        </span>
                        <span className="font-tabular-data text-tabular-data text-primary font-medium">
                          09:48 • Đang làm
                        </span>
                      </div>
                    </div>

                    {/* Step 3: Out for delivery */}
                    <div className="relative z-10 flex sm:flex-col items-center gap-space-sm text-left sm:text-center sm:w-1/4 opacity-70">
                      <div className="w-8 h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[16px]">two_wheeler</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface">
                          Đang giao hàng
                        </span>
                        <span className="font-tabular-data text-tabular-data text-on-surface-variant">
                          Dự kiến 10:05
                        </span>
                      </div>
                    </div>

                    {/* Step 4: Done */}
                    <div className="relative z-10 flex sm:flex-col items-center gap-space-sm text-left sm:text-center sm:w-1/4 opacity-40">
                      <div className="w-8 h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[16px]">flag</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface">
                          Giao thành công
                        </span>
                        <span className="font-tabular-data text-tabular-data text-on-surface-variant">
                          Dự kiến 10:15
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="flex flex-col gap-space-sm">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Danh sách món trong gói hàng
                  </span>
                  <div className="flex flex-col gap-space-xs">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface hover:bg-surface-container transition-colors border border-surface-container-high">
                      <div className="flex items-center gap-space-md">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcPRoTPt2au7ScNQzzWXU8y2jf5jky7qUQhjKxmvKkFmi1uIG3vYnKFmmkYKnQ42lay_XlHlTGJN4dvmdQ_tIMHoxj3wiQSAYdW0gxnsgYKaZ79I7R9U5XSKcLMWCc6Q1GR89LwBTtOsod54DoeVaAgEbSZfmK9jcfe81kfp0WxA5G_cF2eh-ET7FNhBmPIeLToDtZQJAUy83OE4AI0B3iyoCwvAeK7r0XEKlc42DWkcQTrraI7QAe"
                          alt="Latte"
                          className="w-12 h-12 rounded-lg object-cover bg-surface-container-high shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            Cà Phê Latte Hạnh Nhân Nướng
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Size L • 50% Ngọt • Ít đá • Sữa hạt hạnh nhân
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-tabular-data text-tabular-data font-semibold text-on-surface block">
                          65.000₫
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary">SL: 01</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface hover:bg-surface-container transition-colors border border-surface-container-high">
                      <div className="flex items-center gap-space-md">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGszii2UQ721NV3YJOnA7Cc7tDpQC7S2l-6n3r1xcy6PNaKUazV8BCKCkT2afVvnFvlOAkeh03QB6ryNnpitoj4S0GLLpd0FYLo7LHXp6BwcQDMGrtsDRinefmfb2ctgFvLKrSW82TCEHSm9OIeBQhBc0bNzsF7Jf8ZvTm_-lScu-xph1CrGrWlOMegBRsjBbB7sLOzpWWrMbDf-f3zqmI8OKG54DeB5LUX-_nWBxAxfnU8spmpcsS"
                          alt="Cold Brew"
                          className="w-12 h-12 rounded-lg object-cover bg-surface-container-high shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            Cold Brew Cam Quế Mật Ong
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Size M • Ngọt nhẹ mật hoa • 100% Đá riêng
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-tabular-data text-tabular-data font-semibold text-on-surface block">
                          68.000₫
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary">SL: 01</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Row */}
                  <div className="flex items-center justify-between pt-space-xs text-on-surface">
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Tổng thanh toán (Đã gồm VAT &amp; Phí ship 15.000₫):
                    </span>
                    <span className="font-headline-md text-headline-md font-tabular-data text-primary font-bold">
                      148.000₫
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Order History Section */}
        <div className="flex flex-col gap-space-md mt-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                Lịch sử đơn hàng trước đây
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-tabular-data text-label-sm font-semibold">
                7 đơn lưu trữ
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
              Hiển thị đơn hàng trong 90 ngày gần nhất
            </span>
          </div>

          {/* History Cards */}
          <div className="flex flex-col gap-space-md">
            {filteredOrders.map((histOrder) => (
              <div
                key={histOrder.id}
                className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-lg border border-surface-container-high"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md flex-1">
                  {histOrder.status === 'canceled' ? (
                    <div className="w-16 h-16 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[28px]">cancel</span>
                    </div>
                  ) : (
                    <img
                      src={histOrder.image}
                      alt={histOrder.id}
                      className="w-16 h-16 rounded-xl object-cover bg-surface-container-high shrink-0"
                    />
                  )}

                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        {histOrder.id}
                      </span>
                      {histOrder.status === 'completed' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Đã giao thành công
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-semibold">
                          Đã hủy theo yêu cầu
                        </span>
                      )}
                      <span className="font-tabular-data text-tabular-data text-on-surface-variant font-medium">
                        • {histOrder.date} - {histOrder.time}
                      </span>
                    </div>

                    <p
                      className={`font-body-md text-body-md ${
                        histOrder.status === 'canceled'
                          ? 'line-through text-on-surface-variant'
                          : 'text-on-surface'
                      }`}
                    >
                      {histOrder.itemsSummary}
                    </p>

                    {histOrder.cancelReason ? (
                      <div className="p-2 rounded-lg bg-surface-container-high text-body-sm text-on-surface-variant flex items-center gap-space-xs mt-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          info
                        </span>
                        <span>{histOrder.cancelReason}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant">
                        <span>Nhận tại: {histOrder.address}</span>
                        <span>•</span>
                        <span>
                          {histOrder.pointsEarned
                            ? `Đã tích lũy +${histOrder.pointsEarned} Điểm Aura`
                            : `Thanh toán: ${histOrder.paymentMethod}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-space-sm shrink-0 pt-space-sm md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                      {histOrder.status === 'canceled' ? 'Giá trị hoàn' : 'Tổng tiền'}
                    </span>
                    <span className="font-headline-md text-headline-md font-tabular-data font-bold text-primary">
                      {formatPrice(histOrder.total)}
                      {histOrder.refundedAmount && (
                        <span className="text-body-sm font-normal text-on-surface-variant ml-1">
                          (Đã hoàn {formatPrice(histOrder.refundedAmount)})
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-space-xs">
                    {histOrder.status === 'completed' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onOpenFeedbackForOrder(histOrder.id)}
                          className="h-9 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors font-label-md text-label-md text-on-surface flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-amber-600">
                            rate_review
                          </span>
                          <span>Đánh giá món</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onReorder(histOrder)}
                          className="h-9 px-space-md rounded-lg bg-primary-container hover:bg-primary transition-colors font-label-md text-label-md text-white flex items-center gap-1 cursor-pointer font-semibold shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[16px]">replay</span>
                          <span>Đặt lại đơn này</span>
                        </button>
                      </>
                    )}

                    {histOrder.status === 'canceled' && (
                      <button
                        type="button"
                        onClick={() =>
                          alert(`Biên lai hoàn tiền đơn ${histOrder.id}: 100% hoàn qua Ví MoMo`)
                        }
                        className="h-9 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors font-label-md text-label-md text-on-surface flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">receipt</span>
                        <span>Chi tiết hoàn tiền</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-space-md">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Hiển thị {filteredOrders.length} / 8 đơn hàng
            </span>
            <button
              type="button"
              onClick={() => alert('Đang tải thêm đơn hàng của các tháng trước...')}
              className="px-space-md py-2 rounded-lg bg-surface-container-lowest shadow-sm hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors flex items-center gap-space-xs cursor-pointer border border-surface-container-high"
            >
              <span>Xem các đơn cũ hơn</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
