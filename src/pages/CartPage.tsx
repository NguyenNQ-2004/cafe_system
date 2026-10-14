import React from 'react';
import { PageRoute, CartItem } from '../types';
import { useDb } from '../data/DbContext';
import {
  calcEarnPoints,
  calcUnitPrice,
  defaultSize,
  describeCustomization,
  fmtMoney,
  fmtNumber,
  getSettingNumber,
  maxRedeemPoints,
  pointsToMoney
} from '../data/dbUtils';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onToggleItemCheck: (cartId: string) => void;
  onToggleAllCheck: (checked: boolean) => void;
  onAddUpsellItem: (item: CartItem) => void;
  onNavigate: (route: PageRoute) => void;
  pointsToRedeem: number;
  onRedeemPoints: (points: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleItemCheck,
  onToggleAllCheck,
  onAddUpsellItem,
  onNavigate,
  pointsToRedeem,
  onRedeemPoints
}) => {
  const { db, session } = useDb();
  const customer = db.users.find(u => u.id === session.customerId);
  const availablePoints = customer?.total_points ?? 0;
  const pointsStep = getSettingNumber(db, 'points_step', 10) || 1;
  const pointsStepValue = getSettingNumber(db, 'points_step_value', 2000);

  const checkedItems = cartItems.filter(i => i.checked !== false);
  const allChecked = cartItems.length > 0 && checkedItems.length === cartItems.length;

  const subtotal = checkedItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);
  const maxPoints = maxRedeemPoints(db, availablePoints, subtotal);
  const redeem = Math.min(pointsToRedeem, maxPoints);
  const discount = pointsToMoney(db, redeem);
  const grandTotal = Math.max(0, subtotal - discount);
  const pointsEarned = calcEarnPoints(db, grandTotal);

  const freeshipThreshold = getSettingNumber(db, 'freeship_threshold', 0);
  const freeshipPercent = freeshipThreshold > 0 ? Math.min(100, Math.round((subtotal / freeshipThreshold) * 100)) : 100;

  const productOf = (id: number) => db.products.find(p => p.id === id);
  const categoryName = (productId: number) => {
    const p = productOf(productId);
    return db.categories.find(c => c.id === p?.category_id)?.name ?? '';
  };

  const upsell = db.products
    .filter(p => p.is_available && !cartItems.some(i => i.product_id === p.id))
    .filter(p => ['Bánh ngọt', 'Đóng chai'].includes(db.categories.find(c => c.id === p.category_id)?.name ?? ''))
    .slice(0, 2);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-margin-lg py-space-xl">
          {/* Breadcrumb & Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div className="flex flex-col gap-space-xs">
              <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-secondary font-label-md text-label-md">
                <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  <span>Trang chủ</span>
                </button>
                <span className="material-symbols-outlined text-[14px] text-secondary">chevron_right</span>
                <span className="text-on-surface font-semibold">Giỏ hàng của bạn</span>
              </nav>
              <div className="flex items-baseline gap-space-sm mt-1">
                <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">Giỏ hàng của bạn</h1>
                <span className="font-label-lg text-label-lg px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-bold">
                  {cartItems.length} món
                </span>
              </div>
            </div>

            {/* Free shipping progress (shop_settings.freeship_threshold) */}
            {freeshipThreshold > 0 && (
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm max-w-sm w-full border border-surface-container-high">
                <div className="flex items-center justify-between font-label-sm text-label-sm mb-1.5">
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    {freeshipPercent >= 100
                      ? 'Đơn giao hàng đủ điều kiện FREESHIP!'
                      : `Thêm ${fmtMoney(freeshipThreshold - subtotal)} để được FREESHIP`}
                  </span>
                  <span className="text-on-surface font-tabular-data text-tabular-data font-bold">{freeshipPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full transition-all duration-500" style={{ width: `${freeshipPercent}%` }} />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                  Đơn giao tận nơi từ <span className="font-tabular-data text-on-surface font-semibold">{fmtMoney(freeshipThreshold)}</span> được miễn phí giao hàng.
                </p>
              </div>
            )}
          </section>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between flex-wrap gap-space-md border border-surface-container-high">
                <label className="flex items-center gap-space-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={e => onToggleAllCheck(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <span className="font-label-lg text-label-lg text-on-surface font-medium">Chọn tất cả ({cartItems.length} món)</span>
                </label>
                <button
                  type="button"
                  onClick={() => checkedItems.forEach(item => onRemoveItem(item.cartId))}
                  className="text-secondary hover:text-error transition-colors flex items-center gap-1 font-label-md text-label-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                  <span>Xóa các món đã chọn</span>
                </button>
              </div>

              {cartItems.length > 0 ? (
                cartItems.map(item => {
                  const product = productOf(item.product_id);
                  if (!product) return null;
                  const lineTotal = item.unit_price * item.quantity;
                  const desc = describeCustomization(item.customization);
                  return (
                    <article
                      key={item.cartId}
                      className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all hover:shadow-md relative overflow-hidden group border border-surface-container-high"
                    >
                      <div className="flex items-start gap-space-md">
                        <div className="pt-2">
                          <input
                            type="checkbox"
                            checked={item.checked !== false}
                            onChange={() => onToggleItemCheck(item.cartId)}
                            className="w-4 h-4 accent-primary rounded cursor-pointer"
                          />
                        </div>
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                          <img
                            src={product.image_url ?? ''}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-space-sm">
                              <div>
                                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                                  {categoryName(item.product_id)}
                                </span>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-semibold">{product.name}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.cartId)}
                                className="text-secondary hover:text-error p-1 rounded transition-colors cursor-pointer"
                                title="Xóa món"
                              >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {desc.split(' • ').filter(Boolean).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${
                                    tag.startsWith('+') ? 'bg-primary/10 text-primary font-semibold' : 'bg-surface-container text-on-surface-variant'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                              {item.customization.note && (
                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm italic">
                                  "{item.customization.note}"
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-end justify-between gap-space-sm mt-4 pt-3 bg-surface-bright/50 rounded-lg p-2 border border-surface-container-high">
                            <div className="flex flex-col">
                              <span className="font-label-sm text-label-sm text-secondary">Đơn giá</span>
                              <span className="font-tabular-data text-tabular-data text-on-surface-variant">{fmtMoney(item.unit_price)}</span>
                            </div>
                            <div className="flex items-center gap-space-lg">
                              <div className="flex items-center bg-surface-container rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.cartId, -1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[16px]">remove</span>
                                </button>
                                <span className="w-8 text-center font-tabular-data text-tabular-data font-semibold text-on-surface">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.cartId, 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[16px]">add</span>
                                </button>
                              </div>
                              <span className="font-headline-sm text-headline-sm text-primary font-tabular-data font-bold">{fmtMoney(lineTotal)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="p-space-xl bg-surface-container-lowest rounded-xl text-center shadow-sm flex flex-col items-center justify-center border border-surface-container-high">
                  <span className="material-symbols-outlined text-[48px] text-secondary mb-2">shopping_cart_off</span>
                  <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Giỏ hàng của bạn đang trống</h3>
                  <p className="font-body-md text-on-surface-variant mt-1 mb-4">Hãy lựa chọn những thức uống từ thực đơn nhé!</p>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg font-label-md font-semibold shadow hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Xem Thực Đơn
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-space-xs">
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:underline transition-all cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  <span>Tiếp tục chọn món thêm</span>
                </button>
              </div>

              {/* UPSELL */}
              {upsell.length > 0 && (
                <section className="mt-space-md p-space-lg bg-surface-container-low rounded-xl border border-surface-container-high">
                  <div className="flex items-center gap-2 mb-space-md">
                    <span className="material-symbols-outlined text-primary text-[22px]">recommend</span>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Thường được mua cùng</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    {upsell.map(p => (
                      <div
                        key={p.id}
                        className="bg-surface-container-lowest p-space-md rounded-lg flex items-center justify-between gap-space-md shadow-sm border border-surface-container-high"
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-container shrink-0">
                          <img src={p.image_url ?? ''} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-semibold">{p.name}</h4>
                          <p className="font-body-sm text-body-sm text-secondary line-clamp-1">{p.subtitle}</p>
                          <p className="font-tabular-data text-tabular-data font-bold text-primary mt-1">{fmtMoney(p.base_price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const s = defaultSize(p);
                            onAddUpsellItem({
                              cartId: `upsell-${Date.now()}-${p.id}`,
                              product_id: p.id,
                              quantity: 1,
                              unit_price: calcUnitPrice(p, s),
                              customization: s ? { size: s } : {},
                              checked: true
                            });
                          }}
                          className="shrink-0 h-9 px-3 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary font-label-md text-label-md transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                          <span>Thêm</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <aside className="lg:col-span-4 flex flex-col gap-space-lg lg:sticky lg:top-24">
              {/* Points Redemption (users.total_points, shop_settings.points_step / points_step_value) */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high">
                <div className="flex items-center gap-2 mb-space-md">
                  <span className="material-symbols-outlined text-primary text-[20px]">stars</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Đổi điểm tích lũy</h2>
                </div>
                {customer ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center font-body-md text-body-md">
                      <span className="text-on-surface-variant">Điểm hiện có ({customer.full_name}):</span>
                      <span className="font-bold text-primary">{fmtNumber(availablePoints)} điểm</span>
                    </div>
                    <div className="flex justify-between items-center font-body-md text-body-md">
                      <span className="text-on-surface-variant">Điểm muốn đổi:</span>
                      <span className="font-bold text-on-surface">
                        {fmtNumber(redeem)} điểm = {fmtMoney(discount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={maxPoints}
                      step={pointsStep}
                      value={redeem}
                      disabled={maxPoints === 0}
                      onChange={e => onRedeemPoints(Number(e.target.value))}
                      className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary mt-1"
                    />
                    <p className="font-body-sm text-body-sm text-secondary">
                      Mỗi {pointsStep} điểm = {fmtMoney(pointsStepValue)}. Đơn này đổi được tối đa {fmtNumber(maxPoints)} điểm.
                    </p>
                  </div>
                ) : (
                  <p className="font-body-sm text-body-sm text-secondary">Đăng nhập để dùng điểm tích lũy.</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold pb-space-xs">Tóm tắt đơn hàng</h2>
                <div className="flex flex-col gap-2.5 font-body-md text-body-md">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Tổng tiền hàng ({checkedItems.length} món)</span>
                    <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">{fmtMoney(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-primary font-medium">
                      <span>Giảm giá bằng điểm</span>
                      <span className="font-tabular-data text-tabular-data font-bold">-{fmtMoney(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-tertiary font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                      <span>Điểm sẽ tích khi hoàn thành</span>
                    </span>
                    <span className="font-tabular-data text-tabular-data font-bold text-tertiary-container">+{pointsEarned} điểm</span>
                  </div>
                </div>

                <div className="w-full h-px bg-surface-container-highest my-1" />

                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Tạm tính</span>
                    <span className="font-label-sm text-label-sm text-secondary">Phí giao hàng tính ở bước sau</span>
                  </div>
                  <span className="font-display-lg text-display-lg text-primary font-tabular-data tracking-tight font-bold">{fmtMoney(grandTotal)}</span>
                </div>

                <button
                  type="button"
                  disabled={checkedItems.length === 0}
                  onClick={() => {
                    onRedeemPoints(redeem);
                    onNavigate('checkout');
                  }}
                  className={`w-full h-12 rounded-lg text-white font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] text-center font-semibold cursor-pointer ${
                    checkedItems.length === 0 ? 'bg-secondary opacity-50 cursor-not-allowed' : 'bg-primary-container hover:bg-primary'
                  }`}
                >
                  <span>Tiến hành đặt hàng ({checkedItems.length} món)</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
