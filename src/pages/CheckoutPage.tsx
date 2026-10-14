import React, { useState } from 'react';
import { PageRoute, CartItem, CheckoutDraft } from '../types';
import { useDb } from '../data/DbContext';
import {
  deliveryFeeFor,
  describeCustomization,
  fmtMoney,
  getSetting,
  getSettingNumber,
  maxRedeemPoints,
  pointsToMoney
} from '../data/dbUtils';

interface CheckoutPageProps {
  cartItems: CartItem[];
  pointsToRedeem: number;
  onNavigate: (route: PageRoute) => void;
  onConfirm: (draft: CheckoutDraft) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, pointsToRedeem, onNavigate, onConfirm }) => {
  const { db, session } = useDb();
  const customer = db.users.find(u => u.id === session.customerId);

  // orders.order_type: ONLINE (giao tận nơi) hoặc TAKEAWAY (đặt trước, đến quầy lấy)
  const [orderType, setOrderType] = useState<'ONLINE' | 'TAKEAWAY'>('ONLINE');
  const [recipientName, setRecipientName] = useState(customer?.full_name ?? '');
  const [recipientPhone, setRecipientPhone] = useState(customer?.phone ?? '');
  const [deliveryAddress, setDeliveryAddress] = useState(customer?.address ?? '');
  const [orderNote, setOrderNote] = useState('');
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((acc, i) => acc + i.unit_price * i.quantity, 0);
  const redeem = Math.min(pointsToRedeem, maxRedeemPoints(db, customer?.total_points ?? 0, subtotal));
  const discount = pointsToMoney(db, redeem);
  const deliveryFee = deliveryFeeFor(db, orderType, subtotal);
  const finalAmount = Math.max(0, subtotal - discount) + deliveryFee;

  const productOf = (id: number) => db.products.find(p => p.id === id);

  const handleConfirm = () => {
    if (cartItems.length === 0) {
      setError('Giỏ hàng chưa có món nào được chọn.');
      return;
    }
    if (!recipientName.trim() || !recipientPhone.trim()) {
      setError('Vui lòng nhập tên và số điện thoại người nhận.');
      return;
    }
    if (orderType === 'ONLINE' && !deliveryAddress.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng.');
      return;
    }
    onConfirm({
      order_type: orderType,
      recipient_name: recipientName.trim(),
      recipient_phone: recipientPhone.trim(),
      delivery_address: orderType === 'ONLINE' ? deliveryAddress.trim() : '',
      order_note: orderNote.trim(),
      points_to_redeem: redeem
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-7xl mx-auto px-margin md:px-margin-lg py-space-lg">
        {/* Step Tracker */}
        <div className="w-full mb-space-xl">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-surface-container rounded-full -z-0" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-1/2 bg-primary-container rounded-full -z-0 transition-all duration-500" />
            <button onClick={() => onNavigate('cart')} className="flex flex-col items-center gap-space-xs relative z-10 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold">1. Giỏ hàng</span>
            </button>
            <div className="flex flex-col items-center gap-space-xs relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white ring-4 ring-primary-container/20 flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <span className="font-label-lg text-label-lg text-primary font-bold">2. Thông tin nhận hàng</span>
            </div>
            <div className="flex flex-col items-center gap-space-xs relative z-10 opacity-60">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <span className="font-label-md text-label-md text-secondary">3. Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* order_type */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high">
              <div className="flex items-center gap-space-sm mb-space-md">
                <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Hình thức nhận hàng</h2>
              </div>
              <div className="grid grid-cols-2 p-1.5 bg-surface-container rounded-lg gap-space-xs">
                {([
                  { id: 'ONLINE', label: 'Giao tận nơi', icon: 'moped' },
                  { id: 'TAKEAWAY', label: 'Đến quầy lấy (Mang đi)', icon: 'storefront' }
                ] as const).map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setOrderType(opt.id)}
                    className={`flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-md font-label-lg text-label-lg transition-all cursor-pointer ${
                      orderType === opt.id ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold' : 'text-secondary hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
              {orderType === 'TAKEAWAY' && (
                <p className="mt-space-sm font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">store</span>
                  Nhận tại: {getSetting(db, 'store_address')}
                </p>
              )}
            </div>

            {/* recipient_name / recipient_phone / delivery_address */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Người nhận</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <label className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Họ tên người nhận *</span>
                  <input
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    maxLength={100}
                    className="w-full h-10 px-space-md rounded bg-surface border border-surface-container-highest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Số điện thoại *</span>
                  <input
                    value={recipientPhone}
                    onChange={e => setRecipientPhone(e.target.value)}
                    maxLength={20}
                    className="w-full h-10 px-space-md rounded bg-surface border border-surface-container-highest text-on-surface font-tabular-data focus:outline-none focus:border-primary-container"
                  />
                </label>
              </div>
              {orderType === 'ONLINE' && (
                <label className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Địa chỉ giao hàng *</span>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                    placeholder="Số nhà, đường, phường/xã, quận/huyện..."
                    className="w-full p-space-md rounded bg-surface border border-surface-container-highest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container resize-none"
                  />
                  <span className="font-body-sm text-body-sm text-secondary">
                    Dự kiến giao trong khoảng {getSettingNumber(db, 'delivery_minutes', 30)} phút sau khi quán xác nhận.
                  </span>
                </label>
              )}
            </div>

            {/* order_note */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Ghi chú đơn hàng</h3>
              </div>
              <textarea
                rows={3}
                value={orderNote}
                onChange={e => setOrderNote(e.target.value)}
                placeholder="Ví dụ: Gọi điện trước khi giao, gửi lễ tân tầng trệt..."
                className="w-full p-space-md rounded-lg bg-surface border border-surface-container-highest text-on-surface placeholder:text-secondary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container resize-none"
              />
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg border border-surface-container-high">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Kiểm tra đơn hàng ({cartItems.length} món)</h3>
                </div>
                <button onClick={() => onNavigate('cart')} className="font-label-md text-label-md text-primary hover:underline cursor-pointer font-semibold">
                  Sửa giỏ
                </button>
              </div>

              <div className="flex flex-col gap-space-md divide-y divide-surface-container">
                {cartItems.map(item => {
                  const p = productOf(item.product_id);
                  return (
                    <div key={item.cartId} className="flex items-center gap-space-md pt-space-xs">
                      <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden shrink-0">
                        <img src={p?.image_url ?? ''} alt={p?.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">{p?.name}</h4>
                          <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">
                            {fmtMoney(item.unit_price * item.quantity)}
                          </span>
                        </div>
                        <div className="flex items-center gap-space-xs mt-0.5">
                          <span className="font-label-sm text-label-sm text-primary font-bold">{item.quantity}x</span>
                          <span className="font-body-sm text-body-sm text-secondary truncate">{describeCustomization(item.customization)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* total_amount / discount_amount / delivery_fee / final_amount */}
              <div className="flex flex-col gap-space-sm pt-space-md border-t border-surface-container">
                <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
                  <span>Tổng tiền món:</span>
                  <span className="font-tabular-data text-tabular-data font-medium text-on-surface">{fmtMoney(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center font-body-md text-body-md text-primary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                      Đổi {redeem} điểm
                    </span>
                    <span className="font-tabular-data text-tabular-data font-medium">-{fmtMoney(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
                  <span>Phí giao hàng</span>
                  <span className="font-tabular-data text-tabular-data font-medium text-on-surface">
                    {orderType === 'TAKEAWAY' ? '0₫ (Nhận tại quầy)' : deliveryFee === 0 ? '0₫ (Freeship)' : fmtMoney(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-space-sm border-t border-surface-container-highest mt-space-xs">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">Tổng thanh toán</span>
                  <span className="font-display-lg text-display-lg font-bold text-primary tabular-data">{fmtMoney(finalAmount)}</span>
                </div>
              </div>

              {error && (
                <div className="p-space-sm rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full h-14 rounded-lg bg-primary-container text-white flex items-center justify-center gap-space-sm shadow-md hover:bg-primary transition-all font-headline-sm text-headline-sm font-semibold tracking-wide cursor-pointer"
                >
                  <span>Xác nhận & Đến bước Thanh toán</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
