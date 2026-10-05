import React, { useState } from 'react';
import { PageRoute, CartItem } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onToggleItemCheck: (cartId: string) => void;
  onToggleAllCheck: (checked: boolean) => void;
  onAddUpsellItem: (item: CartItem) => void;
  onNavigate: (route: PageRoute) => void;
  availablePoints: number;
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
  availablePoints,
  pointsToRedeem,
  onRedeemPoints
}) => {

  const checkedItems = cartItems.filter((i) => i.checked !== false);
  const allChecked = cartItems.length > 0 && checkedItems.length === cartItems.length;

  const subtotal = checkedItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = pointsToRedeem;
  const grandTotal = Math.max(0, subtotal - discount);
  const pointsEarned = Math.floor(grandTotal / 10000);

  // Free shipping logic (150,000 threshold)
  const freeshipThreshold = 150000;
  const freeshipPercent = Math.min(100, Math.round((subtotal / freeshipThreshold) * 100));

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute top-96 left-0 w-80 h-80 rounded-full bg-tertiary-container/5 blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-margin-lg py-space-xl">
          {/* Breadcrumb & Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div className="flex flex-col gap-space-xs">
              <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-secondary font-label-md text-label-md">
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  <span>Trang chủ</span>
                </button>
                <span className="material-symbols-outlined text-[14px] text-secondary">chevron_right</span>
                <span className="text-on-surface font-semibold">Giỏ hàng của bạn</span>
              </nav>
              <div className="flex items-baseline gap-space-sm mt-1">
                <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
                  Giỏ hàng của bạn
                </h1>
                <span className="font-label-lg text-label-lg px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-bold">
                  {cartItems.length} món
                </span>
              </div>
            </div>

            {/* Free shipping progress */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm max-w-sm w-full border border-surface-container-high">
              <div className="flex items-center justify-between font-label-sm text-label-sm mb-1.5">
                <span className="flex items-center gap-1 text-primary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  {freeshipPercent >= 100
                    ? 'Đơn hàng đủ điều kiện FREESHIP!'
                    : `Thêm ${formatPrice(freeshipThreshold - subtotal)} để nhận FREESHIP!`}
                </span>
                <span className="text-on-surface font-tabular-data text-tabular-data font-bold">
                  {freeshipPercent}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-500"
                  style={{ width: `${freeshipPercent}%` }}
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                Bạn đã đạt mốc <span className="font-tabular-data text-on-surface font-semibold">150.000đ</span> để nhận miễn phí giao hàng.
              </p>
            </div>
          </section>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
            {/* LEFT COLUMN: Items & Upsell (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              {/* Select All Bar */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between flex-wrap gap-space-md border border-surface-container-high">
                <label className="flex items-center gap-space-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={(e) => onToggleAllCheck(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <span className="font-label-lg text-label-lg text-on-surface font-medium">
                    Chọn tất cả ({cartItems.length} món)
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    cartItems.forEach((item) => onRemoveItem(item.cartId));
                  }}
                  className="text-secondary hover:text-error transition-colors flex items-center gap-1 font-label-md text-label-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                  <span>Xóa các món đã chọn</span>
                </button>
              </div>

              {/* Items List */}
              {cartItems.length > 0 ? (
                cartItems.map((item) => {
                  const lineTotal = item.unitPrice * item.quantity;
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

                        {/* Image */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-space-sm">
                              <div>
                                {item.categoryTitle && (
                                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                                    {item.categoryTitle}
                                  </span>
                                )}
                                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-semibold">
                                  {item.name}
                                </h3>
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

                            {/* Modifier Chips */}
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                                Size {item.size}
                              </span>
                              {item.sugar && (
                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                                  {item.sugar}
                                </span>
                              )}
                              {item.ice && (
                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                                  {item.ice}
                                </span>
                              )}
                              {item.toppings?.map((top, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm font-semibold"
                                >
                                  + {top.name}
                                </span>
                              ))}
                              {item.note && (
                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm italic">
                                  "{item.note}"
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex flex-wrap items-end justify-between gap-space-sm mt-4 pt-3 bg-surface-bright/50 rounded-lg p-2 border border-surface-container-high">
                            <div className="flex flex-col">
                              <span className="font-label-sm text-label-sm text-secondary">
                                Đơn giá
                              </span>
                              <span className="font-tabular-data text-tabular-data text-on-surface-variant">
                                {formatPrice(item.unitPrice)}
                              </span>
                            </div>
                            <div className="flex items-center gap-space-lg">
                              {/* Stepper */}
                              <div className="flex items-center bg-surface-container rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.cartId, -1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[16px]">remove</span>
                                </button>
                                <span className="w-8 text-center font-tabular-data text-tabular-data font-semibold text-on-surface">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.cartId, 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[16px]">add</span>
                                </button>
                              </div>
                              {/* Line Subtotal */}
                              <div className="text-right">
                                <span className="font-headline-sm text-headline-sm text-primary font-tabular-data font-bold">
                                  {formatPrice(lineTotal)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="p-space-xl bg-surface-container-lowest rounded-xl text-center shadow-sm flex flex-col items-center justify-center border border-surface-container-high">
                  <span className="material-symbols-outlined text-[48px] text-secondary mb-2">
                    shopping_cart_off
                  </span>
                  <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">
                    Giỏ hàng của bạn đang trống
                  </h3>
                  <p className="font-body-md text-on-surface-variant mt-1 mb-4">
                    Hãy lựa chọn những thức uống thơm ngon từ thực đơn Aura Café nhé!
                  </p>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg font-label-md font-semibold shadow hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Xem Thực Đơn
                  </button>
                </div>
              )}

              {/* Navigation Action */}
              <div className="flex items-center justify-between pt-space-xs">
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:underline transition-all cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  <span>Tiếp tục chọn món thêm</span>
                </button>
                <span className="font-body-sm text-body-sm text-secondary hidden sm:inline">
                  Giá đã bao gồm 8% thuế GTGT & phụ phí đồ uống
                </span>
              </div>

              {/* UPSELL SECTION: 'Thường được mua cùng' */}
              <section className="mt-space-md p-space-lg bg-surface-container-low rounded-xl border border-surface-container-high">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      recommend
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                      Thường được mua cùng
                    </h2>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Gợi ý dành riêng cho bạn
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  {/* Upsell 1 */}
                  <div className="bg-surface-container-lowest p-space-md rounded-lg flex items-center justify-between gap-space-md shadow-sm border border-surface-container-high">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-container shrink-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyMuuFRkU1NwMIeV0zwxCcKPa9zJiEh4MKtqNO_MnEQZ074UYoVSPFn1dNXlXlRl3o2a-ZE6Wpet2piKYZvfrlkBj7XO3xrDHf--TzbuHYoyOuIEp_yTBGJShXa56krrZolskB5iiKc7xpr3jXNNsLQDxJPRKTH_4vrE858iNd2TQ0ryswAHCFZjpUJO54ik8ed9IMODvdyE7xsg7bLCGTxH5x06iODU-BighRC8H07R4zcZBpyo0S"
                        alt="Croissant Bơ Tỏi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-semibold">
                        Croissant Bơ Tỏi
                      </h4>
                      <p className="font-body-sm text-body-sm text-secondary">Nóng giòn thơm lừng</p>
                      <p className="font-tabular-data text-tabular-data font-bold text-primary mt-1">
                        38.000đ
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onAddUpsellItem({
                          cartId: `upsell-${Date.now()}-1`,
                          productId: 'croissant-bo-toi',
                          name: 'Croissant Bơ Tỏi',
                          categoryTitle: 'Bánh tươi',
                          image:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuAyMuuFRkU1NwMIeV0zwxCcKPa9zJiEh4MKtqNO_MnEQZ074UYoVSPFn1dNXlXlRl3o2a-ZE6Wpet2piKYZvfrlkBj7XO3xrDHf--TzbuHYoyOuIEp_yTBGJShXa56krrZolskB5iiKc7xpr3jXNNsLQDxJPRKTH_4vrE858iNd2TQ0ryswAHCFZjpUJO54ik8ed9IMODvdyE7xsg7bLCGTxH5x06iODU-BighRC8H07R4zcZBpyo0S',
                          size: 'S',
                          sugar: 'Tiêu chuẩn',
                          ice: 'Không',
                          toppings: [],
                          note: '',
                          unitPrice: 38000,
                          quantity: 1,
                          checked: true
                        })
                      }
                      className="shrink-0 h-9 px-3 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary font-label-md text-label-md transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Thêm</span>
                    </button>
                  </div>

                  {/* Upsell 2 */}
                  <div className="bg-surface-container-lowest p-space-md rounded-lg flex items-center justify-between gap-space-md shadow-sm border border-surface-container-high">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-container shrink-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfsX2THWVzE1AO1G3zYZixQQufj3c0DsTVh_c1zFXCHDn64Q-YGnYruxNy7hZ5rKXT_XxsZZ4v4cbsPnAXKGRohIDEGbCHU52uqeYOLMH2R99E3xpoxL-9KW_V5ROJh_51F2TOg7MPtf6jiPBAdh4IfokfmwLwE60d5z6DtZ-f0BkvyZwvYgIEVfeoqpYWL8eqwbAM-Z3SoMAfFOWo_UgUarA4MUf9VbRiuZ62jMzt9S2gAaCqC2Eq"
                        alt="Nước Suối Khoáng"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-semibold">
                        Nước Suối Khoáng Tự Nhiên
                      </h4>
                      <p className="font-body-sm text-body-sm text-secondary">Chai thủy tinh 330ml</p>
                      <p className="font-tabular-data text-tabular-data font-bold text-primary mt-1">
                        15.000đ
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onAddUpsellItem({
                          cartId: `upsell-${Date.now()}-2`,
                          productId: 'nuoc-suoi-khoang',
                          name: 'Nước Suối Khoáng Tự Nhiên',
                          categoryTitle: 'Đóng chai',
                          image:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuAfsX2THWVzE1AO1G3zYZixQQufj3c0DsTVh_c1zFXCHDn64Q-YGnYruxNy7hZ5rKXT_XxsZZ4v4cbsPnAXKGRohIDEGbCHU52uqeYOLMH2R99E3xpoxL-9KW_V5ROJh_51F2TOg7MPtf6jiPBAdh4IfokfmwLwE60d5z6DtZ-f0BkvyZwvYgIEVfeoqpYWL8eqwbAM-Z3SoMAfFOWo_UgUarA4MUf9VbRiuZ62jMzt9S2gAaCqC2Eq',
                          size: 'S',
                          sugar: 'Không',
                          ice: 'Không',
                          toppings: [],
                          note: '',
                          unitPrice: 15000,
                          quantity: 1,
                          checked: true
                        })
                      }
                      className="shrink-0 h-9 px-3 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary font-label-md text-label-md transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Thêm</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Order Summary & Voucher (4 cols) */}
            <aside className="lg:col-span-4 flex flex-col gap-space-lg sticky top-24">
              {/* Points Redemption Card */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high">
                <div className="flex items-center gap-2 mb-space-md">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    stars
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Đổi điểm Aura Rewards
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center font-body-md text-body-md">
                    <span className="text-on-surface-variant">Điểm hiện có:</span>
                    <span className="font-bold text-primary">{new Intl.NumberFormat('vi-VN').format(availablePoints)} điểm</span>
                  </div>
                  
                  <div className="flex justify-between items-center font-body-md text-body-md">
                    <span className="text-on-surface-variant">Điểm muốn đổi:</span>
                    <span className="font-bold text-on-surface">{new Intl.NumberFormat('vi-VN').format(pointsToRedeem)} điểm</span>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max={Math.min(availablePoints, subtotal)}
                    step="1000"
                    value={pointsToRedeem}
                    onChange={(e) => onRedeemPoints(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                  />
                  
                  <p className="font-body-sm text-body-sm text-secondary mt-1">
                    1 điểm = 1đ. Có thể đổi tối đa {new Intl.NumberFormat('vi-VN').format(Math.min(availablePoints, subtotal))} điểm cho đơn hàng này.
                  </p>
                </div>
              </div>

              {/* Order Summary Billing Card */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold pb-space-xs">
                  Tóm tắt đơn hàng
                </h2>

                <div className="flex flex-col gap-2.5 font-body-md text-body-md">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Tổng tiền hàng ({checkedItems.length} món)</span>
                    <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-primary font-medium">
                      <span>Thanh toán bằng điểm</span>
                      <span className="font-tabular-data text-tabular-data font-bold">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-tertiary font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                      <span>Tích luỹ Aura Rewards</span>
                    </span>
                    <span className="font-tabular-data text-tabular-data font-bold text-tertiary-container">
                      +{pointsEarned} điểm
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-surface-container-highest my-1" />

                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Tổng thanh toán
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary">
                      Đã bao gồm VAT & phí dịch vụ
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display-lg text-display-lg text-primary font-tabular-data tracking-tight font-bold">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Primary CTA Button to Step 2 (Checkout) */}
                <button
                  type="button"
                  disabled={checkedItems.length === 0}
                  onClick={() => onNavigate('checkout')}
                  className={`w-full h-12 rounded-lg text-white font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] text-center font-semibold cursor-pointer ${
                    checkedItems.length === 0
                      ? 'bg-secondary opacity-50 cursor-not-allowed'
                      : 'bg-primary-container hover:bg-primary'
                  }`}
                >
                  <span>Tiến hành đặt hàng ({checkedItems.length} món)</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                {/* Service Guarantees */}
                <div className="mt-space-xs p-space-md rounded-lg bg-surface-bright flex flex-col gap-2.5 border border-surface-container-high">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong>Cam kết hoàn hảo:</strong> Miễn phí 1 đổi 1 ngay lập tức nếu đổ vỡ hoặc sai công thức trong 15 phút.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      thermostat
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong>Giữ nhiệt chuẩn gu:</strong> Đóng gói túi nhôm cách nhiệt chuyên dụng, đá tách riêng theo yêu cầu.
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
