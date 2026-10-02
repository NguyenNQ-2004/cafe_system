import React, { useState } from 'react';
import { PageRoute, CartItem } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  appliedVoucher: string | null;
  onNavigate: (route: PageRoute) => void;
  onOrderDetailsReady?: (details: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  appliedVoucher,
  onNavigate,
  onOrderDetailsReady
}) => {
  const [fulfillmentMode, setFulfillmentMode] = useState<'delivery' | 'pickup'>('delivery');
  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('10:30 - 11:00');
  const [deliveryNote, setDeliveryNote] = useState('Gửi bảo vệ tầng hầm B1 gọi điện thoại trước khi đến nhận hàng.');
  const [isVatRequested, setIsVatRequested] = useState(false);
  const [vatCompany, setVatCompany] = useState('');
  const [vatTaxId, setVatTaxId] = useState('');
  const [vatAddress, setVatAddress] = useState('');
  const [vatEmail, setVatEmail] = useState('');

  // Calculations
  const checkedItems = cartItems.filter((i) => i.checked !== false);
  const subtotal = checkedItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const shippingFee = fulfillmentMode === 'pickup' ? 0 : appliedVoucher === 'FREESHIP' ? 0 : 18000;
  const voucherDiscount = appliedVoucher === 'WELCOME50K' ? 50000 : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - voucherDiscount);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const handleProceedToPayment = () => {
    if (onOrderDetailsReady) {
      onOrderDetailsReady({
        fulfillmentMode,
        shippingFee,
        grandTotal,
        deliveryNote,
        isVatRequested,
        vatInfo: isVatRequested ? { vatCompany, vatTaxId, vatAddress, vatEmail } : null
      });
    }
    onNavigate('payment');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-7xl mx-auto px-margin md:px-margin-lg py-space-lg">
        {/* Step Breadcrumb Tracker */}
        <div className="w-full mb-space-xl">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-surface-container rounded-full -z-0" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-1/2 bg-primary-container rounded-full -z-0 transition-all duration-500" />

            {/* Step 1 */}
            <button
              onClick={() => onNavigate('cart')}
              className="flex flex-col items-center gap-space-xs relative z-10 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold">
                1. Giỏ hàng
              </span>
            </button>

            {/* Step 2 (Active) */}
            <div className="flex flex-col items-center gap-space-xs relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white ring-4 ring-primary-container/20 flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <span className="font-label-lg text-label-lg text-primary font-bold">
                2. Xác nhận đơn & Giao nhận
              </span>
            </div>

            {/* Step 3 (Pending) */}
            <div className="flex flex-col items-center gap-space-xs relative z-10 opacity-60">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <span className="font-label-md text-label-md text-secondary">3. Thanh toán</span>
            </div>
          </div>
        </div>

        {/* Main Operational Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column: Delivery & Fulfillment Specifics (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Fulfillment Mode Selector Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Phương thức nhận hàng
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-full font-semibold">
                  Bước 2 / 3
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-surface-container rounded-lg gap-space-xs">
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('delivery')}
                  className={`flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-md font-label-lg text-label-lg transition-all cursor-pointer ${
                    fulfillmentMode === 'delivery'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">moped</span>
                  <span>Giao tận nơi (Delivery)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('pickup')}
                  className={`flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-md font-label-lg text-label-lg transition-all cursor-pointer ${
                    fulfillmentMode === 'pickup'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">storefront</span>
                  <span>Đến lấy tại quầy (Take-away)</span>
                </button>
              </div>
            </div>

            {/* Delivery Address Panel */}
            <div
              className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high transition-opacity ${
                fulfillmentMode === 'pickup' ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Địa chỉ giao hàng
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Đang mở sổ địa chỉ đã lưu của bạn...')}
                  className="text-primary hover:underline font-label-md text-label-md flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Thêm địa chỉ mới</span>
                </button>
              </div>

              {/* Active Selected Address Card */}
              <div className="p-space-md rounded-lg bg-surface-container-low relative border border-surface-container-high">
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold">
                        Nguyễn Văn An
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="font-tabular-data text-tabular-data text-secondary">
                        0908 123 456
                      </span>
                      <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">
                        Mặc định
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Tầng 8, Tòa nhà Landmark 81, P. 22, Q. Bình Thạnh, TP. Hồ Chí Minh
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Chọn từ danh sách 3 địa chỉ giao hàng sẵn có')}
                    className="px-space-sm py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    Thay đổi
                  </button>
                </div>
              </div>

              {/* Smart Store Routing Indicator */}
              <div className="p-space-md rounded-lg bg-surface-bright flex items-center gap-space-md border border-surface-container-high">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">store</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold">
                      Tự động điều phối tối ưu
                    </span>
                    <span className="w-1 h-1 rounded-full bg-secondary" />
                    <span className="font-label-sm text-label-sm text-secondary">
                      Khoảng cách 2.1km
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                    Chi nhánh 03: 45 Lê Duẩn, P. Bến Nghé, Quận 1
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Dự kiến hoàn thiện & giao tới bạn trong 25 - 30 phút
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Schedule Time Selection */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Thời gian nhận hàng
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Option 1: ASAP */}
                <label
                  onClick={() => setIsScheduled(false)}
                  className={`flex items-start gap-space-sm p-space-md rounded-lg cursor-pointer transition-colors border-2 ${
                    !isScheduled
                      ? 'bg-surface-container-low border-primary/30'
                      : 'bg-surface border-transparent hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery_time"
                    checked={!isScheduled}
                    readOnly
                    className="mt-1 w-4 h-4 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Giao ngay lập tức
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Ưu tiên Barista pha chế & giao trong 25 - 30 phút
                    </span>
                  </div>
                </label>

                {/* Option 2: Schedule */}
                <label
                  onClick={() => setIsScheduled(true)}
                  className={`flex items-start gap-space-sm p-space-md rounded-lg cursor-pointer transition-colors border-2 ${
                    isScheduled
                      ? 'bg-surface-container-low border-primary/30'
                      : 'bg-surface border-transparent hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery_time"
                    checked={isScheduled}
                    readOnly
                    className="mt-1 w-4 h-4 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Hẹn giờ giao cụ thể
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Chọn khung giờ tiện nhất trong ngày hôm nay
                    </span>
                  </div>
                </label>
              </div>

              {/* Schedule time buttons */}
              {isScheduled && (
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Chọn khung giờ mong muốn:
                  </span>
                  <div className="grid grid-cols-3 gap-space-sm">
                    {['10:30 - 11:00', '14:00 - 14:30', '16:30 - 17:00'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-space-sm px-space-md rounded font-label-md text-label-md transition-colors cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-primary text-white font-semibold'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Notes */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Ghi chú giao hàng
                </h3>
              </div>
              <div>
                <textarea
                  rows={3}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Ví dụ: Gửi lễ tân tầng trệt, vui lòng gọi điện trước khi đến 5 phút..."
                  className="w-full p-space-md rounded-lg bg-surface border border-surface-container-highest text-on-surface placeholder:text-secondary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container resize-none"
                />
              </div>
            </div>

            {/* Corporate VAT Invoice */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-space-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isVatRequested}
                    onChange={(e) => setIsVatRequested(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Yêu cầu xuất hoá đơn điện tử VAT (Doanh nghiệp)
                  </span>
                </label>
                <span className="font-label-sm text-label-sm text-secondary bg-surface px-2 py-0.5 rounded font-semibold">
                  e-Invoice
                </span>
              </div>

              {isVatRequested && (
                <div className="flex flex-col gap-space-md pt-space-xs animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Tên công ty / Doanh nghiệp *
                      </span>
                      <input
                        type="text"
                        value={vatCompany}
                        onChange={(e) => setVatCompany(e.target.value)}
                        placeholder="Công ty TNHH Aura Specialty Coffee..."
                        className="w-full h-10 px-space-md rounded bg-surface border border-surface-container-highest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Mã số thuế (MST) *
                      </span>
                      <input
                        type="text"
                        value={vatTaxId}
                        onChange={(e) => setVatTaxId(e.target.value)}
                        placeholder="0312345678"
                        className="w-full h-10 px-space-md rounded bg-surface border border-surface-container-highest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Địa chỉ trụ sở theo ĐKKD *
                      </span>
                      <input
                        type="text"
                        value={vatAddress}
                        onChange={(e) => setVatAddress(e.target.value)}
                        placeholder="Số 123 Đường Nam Kỳ Khởi Nghĩa..."
                        className="w-full h-10 px-space-md rounded bg-surface border border-surface-container-highest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Email nhận hoá đơn điện tử (PDF/XML) *
                      </span>
                      <input
                        type="email"
                        value={vatEmail}
                        onChange={(e) => setVatEmail(e.target.value)}
                        placeholder="ketoan@doanhnghiep.vn"
                        className="w-full h-10 px-space-md rounded bg-surface border border-surface-container-highest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container"
                      />
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary italic">
                    Hóa đơn điện tử sẽ được khởi tạo và gửi tự động qua email sau khi đơn hàng được ghi nhận thanh toán hoàn tất.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Condensed Order Summary & Final Confirmation Trigger (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg border border-surface-container-high">
              {/* Summary Header */}
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    receipt_long
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Kiểm tra đơn hàng ({checkedItems.length} món)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('cart')}
                  className="font-label-md text-label-md text-primary hover:underline cursor-pointer font-semibold"
                >
                  Sửa giỏ
                </button>
              </div>

              {/* Item Mini List */}
              <div className="flex flex-col gap-space-md divide-y divide-surface-container">
                {checkedItems.map((item) => (
                  <div key={item.cartId} className="flex items-center gap-space-md pt-space-xs">
                    <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                          {item.name}
                        </h4>
                        <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs mt-0.5">
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          {item.quantity}x
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary truncate">
                          Size {item.size} • {item.sugar} • {item.ice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="flex flex-col gap-space-sm pt-space-md border-t border-surface-container">
                <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
                  <span>Tổng tiền món ({checkedItems.length} món):</span>
                  <span className="font-tabular-data text-tabular-data font-medium text-on-surface">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
                  <div className="flex items-center gap-1">
                    <span>Phí giao hàng</span>
                    <span className="font-label-sm text-label-sm text-secondary">
                      {fulfillmentMode === 'pickup' ? '(Nhận tại quầy)' : '(2.1km)'}
                    </span>
                  </div>
                  <span className="font-tabular-data text-tabular-data font-medium text-on-surface">
                    {fulfillmentMode === 'pickup' ? '0đ (Miễn phí)' : formatPrice(shippingFee)}
                  </span>
                </div>

                {voucherDiscount > 0 && (
                  <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">sell</span>
                      <span>Voucher giảm giá ({appliedVoucher})</span>
                    </div>
                    <span className="font-tabular-data text-tabular-data font-medium text-primary">
                      -{formatPrice(voucherDiscount)}
                    </span>
                  </div>
                )}

                {/* Total Final Row */}
                <div className="flex justify-between items-baseline pt-space-sm border-t border-surface-container-highest mt-space-xs">
                  <div className="flex flex-col">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">
                      Tổng thanh toán
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Đã bao gồm thuế GTGT 8%
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-display-lg text-display-lg font-bold text-primary tabular-data">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full h-14 rounded-lg bg-primary-container text-white flex items-center justify-center gap-space-sm shadow-md hover:bg-primary transition-all font-headline-sm text-headline-sm font-semibold tracking-wide cursor-pointer"
                >
                  <span>Xác nhận đơn & Đến bước Thanh toán</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('cart')}
                  className="w-full h-11 rounded-lg bg-surface hover:bg-surface-container flex items-center justify-center gap-space-xs text-secondary hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Quay lại giỏ hàng</span>
                </button>
              </div>

              {/* Guarantee Badges */}
              <div className="grid grid-cols-2 gap-space-sm pt-space-sm border-t border-surface-container-high">
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    verified_user
                  </span>
                  <span className="font-label-sm text-label-sm">Bảo đảm vị ngon 100%</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
                  <span className="font-label-sm text-label-sm">Giao chuẩn 30 phút</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
