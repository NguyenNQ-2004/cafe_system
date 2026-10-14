import React, { useState } from 'react';
import { PageRoute, CartItem, CheckoutDraft, PaymentMethod } from '../types';
import { useDb } from '../data/DbContext';
import {
  PAYMENT_METHOD_ICON,
  PAYMENT_METHOD_LABEL,
  deliveryFeeFor,
  describeCustomization,
  fmtMoney,
  getSetting,
  pointsToMoney
} from '../data/dbUtils';

interface PaymentPageProps {
  cartItems: CartItem[];
  draft: CheckoutDraft | null;
  onNavigate: (route: PageRoute) => void;
  onPaymentComplete: (orderCode: string) => void;
}

const METHODS: { id: PaymentMethod; desc: string }[] = [
  { id: 'BANK_TRANSFER', desc: 'Quét mã QR ngân hàng, hệ thống ghi nhận mã giao dịch' },
  { id: 'VNPAY', desc: 'Thanh toán qua cổng VNPAY' },
  { id: 'MOMO', desc: 'Thanh toán qua ví MoMo' },
  { id: 'CASH', desc: 'Trả tiền mặt khi nhận hàng (COD) hoặc tại quầy' }
];

export const PaymentPage: React.FC<PaymentPageProps> = ({ cartItems, draft, onNavigate, onPaymentComplete }) => {
  const { db, session, placeOrder } = useDb();
  const [method, setMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!draft || cartItems.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-margin-lg py-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-xl text-center shadow-sm border border-surface-container-high">
          <span className="material-symbols-outlined text-[48px] text-secondary">receipt_long</span>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface mt-2">Chưa có đơn cần thanh toán</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Vui lòng chọn món trong giỏ hàng và nhập thông tin nhận hàng trước.
          </p>
          <button
            onClick={() => onNavigate(cartItems.length ? 'checkout' : 'cart')}
            className="mt-space-md px-6 py-2.5 bg-primary text-white rounded-lg font-semibold"
          >
            {cartItems.length ? 'Quay lại bước nhận hàng' : 'Về giỏ hàng'}
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const discount = Math.min(subtotal, pointsToMoney(db, draft.points_to_redeem));
  const deliveryFee = deliveryFeeFor(db, draft.order_type, subtotal);
  const finalAmount = subtotal - discount + deliveryFee;
  const isCod = method === 'CASH';

  const handleConfirm = () => {
    setIsSubmitting(true);
    const order = placeOrder({
      customer_id: session.customerId,
      cashier_id: null,
      order_type: draft.order_type,
      status: 'CONFIRMED',
      recipient_name: draft.recipient_name,
      recipient_phone: draft.recipient_phone,
      delivery_address: draft.delivery_address || null,
      order_note: draft.order_note,
      delivery_fee: deliveryFee,
      points_to_redeem: draft.points_to_redeem,
      items: cartItems.map(i => ({
        product_id: i.product_id,
        quantity: i.quantity,
        unit_price: i.unit_price,
        customization: Object.keys(i.customization).length ? i.customization : null
      })),
      payment: isCod
        ? { method, status: 'PENDING', note: draft.order_type === 'ONLINE' ? 'COD - thu khi giao' : 'Thanh toán tại quầy khi nhận' }
        : { method, status: 'SUCCESS', transaction_code: `${method}-${Date.now()}`, note: 'Thanh toán online' }
    });
    onPaymentComplete(order.order_code);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-margin md:px-margin-lg py-space-lg max-w-7xl mx-auto">
        <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm mb-space-lg flex items-center gap-space-md border border-surface-container-high">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[28px]">receipt_long</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Thanh toán đơn hàng</h1>
            <span className="font-body-md text-body-md text-on-surface-variant">
              Đơn sẽ được tạo và chuyển tới quầy pha chế ngay sau khi bạn xác nhận.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* LEFT: payments.payment_method */}
          <section className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Phương thức thanh toán</h2>
              {METHODS.map(m => (
                <label
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`p-space-md rounded-lg flex items-center justify-between cursor-pointer transition-all border-2 ${
                    method === m.id ? 'border-primary/40 bg-surface-container-low shadow-sm' : 'border-transparent bg-surface-bright hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <input type="radio" name="payment_method" checked={method === m.id} readOnly className="w-4 h-4 accent-primary cursor-pointer" />
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        {m.id === 'CASH' && draft.order_type === 'ONLINE' ? 'Tiền mặt khi nhận hàng (COD)' : PAYMENT_METHOD_LABEL[m.id]}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{m.desc}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-secondary">{PAYMENT_METHOD_ICON[m.id]}</span>
                </label>
              ))}

              {method === 'BANK_TRANSFER' && (
                <div className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-high grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center">
                  <div className="sm:col-span-4 flex justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(`AURA ${finalAmount}`)}`}
                      alt="QR chuyển khoản"
                      className="w-32 h-32 bg-white p-1 rounded"
                    />
                  </div>
                  <div className="sm:col-span-8 flex flex-col gap-1 font-body-sm text-body-sm">
                    <span className="text-on-surface-variant">Đơn vị nhận: <strong className="text-on-surface">{getSetting(db, 'store_name')}</strong></span>
                    <span className="text-on-surface-variant">
                      Số tiền: <strong className="text-primary font-tabular-data">{fmtMoney(finalAmount)}</strong>
                    </span>
                    <span className="text-secondary">Mã giao dịch được lưu vào payments.transaction_code khi xác nhận.</span>
                  </div>
                </div>
              )}

              {isCod && (
                <div className="p-space-sm bg-surface rounded-lg text-on-surface-variant font-body-sm text-body-sm flex items-start gap-space-sm border border-surface-container-high">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0">info</span>
                  <span>Thanh toán được ghi nhận "Chờ thanh toán" và chuyển sang "Đã thanh toán" khi bạn trả tiền lúc nhận hàng.</span>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT: Bill preview */}
          <aside className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md md:p-space-lg flex flex-col border border-surface-container-high">
              <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[22px]">local_cafe</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">{getSetting(db, 'store_name')}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{getSetting(db, 'store_address')}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-xs py-space-sm bg-surface-bright px-space-md rounded-lg my-space-sm font-body-sm text-body-sm border border-surface-container-high">
                <div className="flex flex-col">
                  <span className="text-on-surface-variant">Người nhận:</span>
                  <span className="font-medium text-on-surface">{draft.recipient_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-on-surface-variant">Số điện thoại:</span>
                  <span className="font-tabular-data font-medium text-on-surface">{draft.recipient_phone}</span>
                </div>
                <div className="flex flex-col col-span-2 mt-space-xs">
                  <span className="text-on-surface-variant">{draft.order_type === 'ONLINE' ? 'Giao tới:' : 'Hình thức:'}</span>
                  <span className="font-medium text-on-surface">
                    {draft.order_type === 'ONLINE' ? draft.delivery_address : 'Mang đi - nhận tại quầy'}
                  </span>
                </div>
                {draft.order_note && (
                  <div className="flex flex-col col-span-2 mt-space-xs">
                    <span className="text-on-surface-variant">Ghi chú:</span>
                    <span className="font-medium text-on-surface">{draft.order_note}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col my-space-xs divide-y divide-surface-container">
                {cartItems.map(item => {
                  const p = db.products.find(x => x.id === item.product_id);
                  return (
                    <div key={item.cartId} className="flex items-start justify-between py-space-sm">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          {item.quantity}x {p?.name}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{describeCustomization(item.customization)}</span>
                      </div>
                      <span className="font-tabular-data text-tabular-data font-medium text-on-surface">
                        {fmtMoney(item.unit_price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-space-xs py-space-sm my-space-xs bg-surface-container-low px-space-md rounded-lg border border-surface-container-high">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Tổng tiền món:</span>
                  <span className="font-tabular-data text-on-surface">{fmtMoney(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body-sm text-body-sm text-primary font-medium">
                    <span>Đổi {draft.points_to_redeem} điểm:</span>
                    <span className="font-tabular-data">-{fmtMoney(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Phí giao hàng:</span>
                  <span className="font-tabular-data text-on-surface">{fmtMoney(deliveryFee)}</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-space-md mb-space-md">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Tổng thanh toán</span>
                <span className="font-display-lg text-display-lg text-primary font-bold font-tabular-data tracking-tight">{fmtMoney(finalAmount)}</span>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirm}
                className="w-full h-12 bg-primary hover:bg-[#982126] text-white rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md transition-all cursor-pointer font-semibold disabled:opacity-60"
              >
                <span>{isCod ? 'Xác nhận đặt đơn' : 'Xác nhận đã thanh toán'}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('checkout')}
                className="w-full h-10 mt-space-sm rounded-lg bg-surface hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors cursor-pointer border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Sửa thông tin nhận hàng</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
