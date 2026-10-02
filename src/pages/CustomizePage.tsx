import React, { useState } from 'react';
import { PageRoute, Product, CartItem } from '../types';
import { PRODUCTS, CROSS_SELL_PASTRIES } from '../data/mockData';

interface CustomizePageProps {
  productId: string;
  onNavigate: (route: PageRoute) => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomizePage: React.FC<CustomizePageProps> = ({
  productId,
  onNavigate,
  onAddToCart
}) => {
  const product: Product =
    PRODUCTS.find((p) => p.id === productId) || PRODUCTS[1]; // default Cà phê muối

  const [size, setSize] = useState<'S' | 'M' | 'L'>('S');
  const [sugar, setSugar] = useState<string>('50%');
  const [ice, setIce] = useState<string>('Đá chuẩn');
  const [selectedToppings, setSelectedToppings] = useState<{ name: string; price: number }[]>([]);
  const [baristaNote, setBaristaNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const sizePrices = {
    S: 0,
    M: 10000,
    L: 20000
  };

  const toppingsList = [
    { id: 'kem-man', name: 'Kem mặn thêm', desc: 'Lớp kem béo ngậy x2', price: 12000, icon: 'workspace_premium' },
    { id: 'tran-chau', name: 'Trân châu trắng', desc: 'Giòn dai ngọc trai', price: 10000, icon: 'lens' },
    { id: 'thach-cafe', name: 'Thạch cà phê', desc: 'Đậm vị Espresso phin', price: 8000, icon: 'grid_view' }
  ];

  const handleToggleTopping = (top: { name: string; price: number }) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.name === top.name);
      if (exists) {
        return prev.filter((t) => t.name !== top.name);
      } else {
        return [...prev, top];
      }
    });
  };

  const appendNote = (text: string) => {
    setBaristaNote((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return text;
      if (trimmed.length + text.length + 2 <= 120) {
        return `${trimmed}, ${text}`;
      }
      return trimmed;
    });
  };

  const toppingsSum = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = product.price + sizePrices[size] + toppingsSum;
  const totalPrice = unitPrice * quantity;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
  };

  const handleAdd = () => {
    const newItem: CartItem = {
      cartId: `cart-${Date.now()}`,
      productId: product.id,
      name: product.name,
      categoryTitle: product.tag || 'Specialty Drink',
      image: product.image,
      size,
      sugar: sugar + ' Đường',
      ice,
      toppings: selectedToppings,
      note: baristaNote,
      unitPrice,
      quantity,
      checked: true
    };

    onAddToCart(newItem);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Bar */}
      <div className="w-full px-margin-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
        <div className="flex items-center gap-space-sm font-label-md text-label-md text-on-surface-variant">
          <button
            onClick={() => onNavigate('menu')}
            className="hover:text-primary transition-colors flex items-center gap-space-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Thực đơn Aura</span>
          </button>
          <span>/</span>
          <span>Cà phê Signature</span>
          <span>/</span>
          <span className="text-on-surface font-semibold">{product.name}</span>
        </div>
        <div className="hidden sm:flex items-center gap-space-md">
          <span className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest bg-primary-fixed px-space-sm py-space-xs rounded-full font-bold">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            Best-Seller Tuần Này
          </span>
          <span className="text-secondary font-body-sm text-body-sm">Mã SP: #CF-SALT-01</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="w-full px-margin-lg py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Visual Gallery Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md sticky top-24">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-surface-container-highest group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-space-md left-space-md flex flex-col gap-space-xs">
                <span className="px-space-md py-space-xs rounded-full bg-primary-container text-white font-label-sm text-label-sm shadow-md uppercase tracking-wider font-bold">
                  Signature Recipe
                </span>
                <span className="px-space-sm py-space-xs rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-tabular-data text-tabular-data shadow-sm flex items-center gap-space-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                  4.9/5 (1,248 đánh giá)
                </span>
              </div>
              <div className="absolute bottom-space-md right-space-md bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-md flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  temp_preferences_custom
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Nhiệt độ pha chế
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {product.details?.temperature || 'Uống lạnh chuẩn vị'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quality Attribute Cards */}
            <div className="grid grid-cols-3 gap-space-sm">
              <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm flex flex-col items-center text-center gap-space-xs border border-surface-container-high">
                <span className="material-symbols-outlined text-primary text-[22px]">grain</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Hạt Rang</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {product.details?.beans || 'Cầu Đất & Buôn Ma Thuột'}
                </span>
              </div>
              <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm flex flex-col items-center text-center gap-space-xs border border-surface-container-high">
                <span className="material-symbols-outlined text-primary text-[22px]">water_drop</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Lớp Kem</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {product.details?.cream || 'Muối Hồng Himalaya'}
                </span>
              </div>
              <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm flex flex-col items-center text-center gap-space-xs border border-surface-container-high">
                <span className="material-symbols-outlined text-primary text-[22px]">timer</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Chiết Xuất</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {product.details?.extraction || 'Phin Kép Áp Lực'}
                </span>
              </div>
            </div>

            {/* Sensory Flavor Profile */}
            <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm flex flex-col gap-space-sm border border-surface-container-high">
              <div className="flex justify-between items-center">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                  Hồ sơ hương vị (Sensory Profile)
                </span>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                  Aura Balanced Roast
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                  <span>Độ đậm đà (Body)</span>
                  <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">
                    {product.sensoryProfile?.body || 90}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${product.sensoryProfile?.body || 90}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mt-space-xs">
                  <span>Độ béo ngậy mặn dịu (Creaminess)</span>
                  <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">
                    {product.sensoryProfile?.creaminess || 85}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-tertiary-container h-full rounded-full transition-all duration-500"
                    style={{ width: `${product.sensoryProfile?.creaminess || 85}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mt-space-xs">
                  <span>Hậu vị ngọt thanh (Sweet Aftertaste)</span>
                  <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">
                    {product.sensoryProfile?.sweetness || 70}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${product.sensoryProfile?.sweetness || 70}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Configurator & Order Customizer Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Header & Description */}
            <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-label-sm text-label-sm text-primary-container bg-primary-fixed px-space-sm py-0.5 rounded uppercase tracking-wider font-semibold">
                    Cà phê phin hiện đại
                  </span>
                  <span className="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container px-space-sm py-0.5 rounded">
                    Cold Drinks
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-space-sm py-0.5 rounded">
                    Ít ngọt mặc định
                  </span>
                </div>
                <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mt-space-xs font-bold">
                  {product.name}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-baseline gap-space-md pt-space-xs">
                <span className="font-display-lg text-display-lg text-primary tabular-data font-bold">
                  {formatPrice(unitPrice)}
                </span>
                {product.originalPrice && (
                  <span className="font-body-md text-body-md text-secondary line-through tabular-data">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="font-label-sm text-label-sm text-error bg-error-container px-space-xs py-0.5 rounded font-bold">
                  -18% Hội viên
                </span>
              </div>
            </div>

            {/* Customizer Form Options */}
            <div className="flex flex-col gap-space-lg">
              {/* 1. Size Selection */}
              <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      local_cafe
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      1. Chọn kích cỡ ly
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    Bắt buộc
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                  {/* Small */}
                  <label
                    onClick={() => setSize('S')}
                    className={`cursor-pointer relative p-space-md rounded-lg flex flex-col gap-space-xs transition-all duration-150 border-2 ${
                      size === 'S'
                        ? 'border-primary-container bg-surface-container-low shadow-sm'
                        : 'border-transparent bg-surface hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Nhỏ (S)
                      </span>
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          size === 'S' ? 'text-primary' : 'text-outline-variant'
                        }`}
                      >
                        {size === 'S' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Dung tích 350ml
                    </span>
                    <span className="font-tabular-data text-tabular-data font-semibold text-primary mt-space-xs">
                      {formatPrice(product.price)}
                    </span>
                  </label>

                  {/* Medium */}
                  <label
                    onClick={() => setSize('M')}
                    className={`cursor-pointer relative p-space-md rounded-lg flex flex-col gap-space-xs transition-all duration-150 border-2 ${
                      size === 'M'
                        ? 'border-primary-container bg-surface-container-low shadow-sm'
                        : 'border-transparent bg-surface hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Vừa (M)
                      </span>
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          size === 'M' ? 'text-primary' : 'text-outline-variant'
                        }`}
                      >
                        {size === 'M' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Dung tích 500ml
                    </span>
                    <span className="font-tabular-data text-tabular-data font-semibold text-on-surface mt-space-xs">
                      +10.000đ ({formatPrice(product.price + 10000)})
                    </span>
                  </label>

                  {/* Large */}
                  <label
                    onClick={() => setSize('L')}
                    className={`cursor-pointer relative p-space-md rounded-lg flex flex-col gap-space-xs transition-all duration-150 border-2 ${
                      size === 'L'
                        ? 'border-primary-container bg-surface-container-low shadow-sm'
                        : 'border-transparent bg-surface hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Lớn (L)
                      </span>
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          size === 'L' ? 'text-primary' : 'text-outline-variant'
                        }`}
                      >
                        {size === 'L' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Dung tích 700ml
                    </span>
                    <span className="font-tabular-data text-tabular-data font-semibold text-on-surface mt-space-xs">
                      +20.000đ ({formatPrice(product.price + 20000)})
                    </span>
                  </label>
                </div>
              </div>

              {/* 2. Sugar & 3. Ice Dual Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                {/* Sweetness */}
                <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-high">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        nutrition
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        2. Mức đường
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary">
                      Mặc định: 50%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-sm">
                    {['0%', '30%', '50%', '100%'].map((lvl) => {
                      const isAct = sugar === lvl;
                      const labels: Record<string, string> = {
                        '0%': '0% (Không đường)',
                        '30%': '30% (Ít ngọt)',
                        '50%': '50% (Tiêu chuẩn)',
                        '100%': '100% (Ngọt đậm)'
                      };
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSugar(lvl)}
                          className={`h-11 px-space-sm rounded-lg font-label-md text-label-md flex items-center justify-center transition-colors cursor-pointer ${
                            isAct
                              ? 'bg-primary-container text-white font-semibold shadow-sm'
                              : 'bg-surface text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          {labels[lvl]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ice */}
                <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-high">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        ac_unit
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        3. Lượng đá
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary">
                      Mặc định: Chuẩn
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-space-sm">
                    {['Không đá', 'Ít đá', 'Đá chuẩn'].map((lvl) => {
                      const isAct = ice === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setIce(lvl)}
                          className={`h-11 px-space-xs rounded-lg font-label-md text-label-md flex items-center justify-center transition-colors cursor-pointer ${
                            isAct
                              ? 'bg-primary-container text-white font-semibold shadow-sm'
                              : 'bg-surface text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs mt-auto">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                      info
                    </span>
                    <span>Kem mặn nổi đẹp và ngon nhất khi giữ mức đá chuẩn.</span>
                  </p>
                </div>
              </div>

              {/* 4. Toppings */}
              <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      add_circle
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      4. Topping thêm đượm vị
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary">
                    Tùy chọn không giới hạn
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                  {toppingsList.map((top) => {
                    const isChecked = selectedToppings.some((t) => t.name === top.name);
                    return (
                      <label
                        key={top.id}
                        onClick={() => handleToggleTopping({ name: top.name, price: top.price })}
                        className={`cursor-pointer p-space-md rounded-lg flex flex-col justify-between gap-space-sm transition-all duration-150 border-2 ${
                          isChecked
                            ? 'bg-primary-fixed border-primary/30 text-primary shadow-sm'
                            : 'bg-surface hover:bg-surface-container border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                              {top.name}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {top.desc}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="w-5 h-5 accent-primary cursor-pointer rounded"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-space-xs">
                          <span className="font-tabular-data text-tabular-data font-semibold text-primary">
                            +{formatPrice(top.price)}
                          </span>
                          <span className="material-symbols-outlined text-tertiary-container text-[18px]">
                            {top.icon}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 5. Barista Notes */}
              <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-sm border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      edit_note
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      5. Ghi chú riêng cho Barista
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {baristaNote.length}/120
                  </span>
                </div>
                <div className="relative w-full">
                  <textarea
                    rows={2}
                    maxLength={120}
                    value={baristaNote}
                    onChange={(e) => setBaristaNote(e.target.value)}
                    placeholder="Ví dụ: Để riêng lớp kem bọt muối vào cốc nhỏ, giao ly giấy kèm ống hút cỏ..."
                    className="w-full p-space-md rounded-lg bg-surface text-on-surface placeholder:text-secondary font-body-md text-body-md focus:outline-none focus:bg-surface-container-low transition-all resize-none border-0"
                  />
                </div>
                <div className="flex items-center gap-space-sm flex-wrap mt-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Gợi ý nhanh:
                  </span>
                  <button
                    type="button"
                    onClick={() => appendNote('Để kem mặn riêng')}
                    className="px-space-sm py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface hover:bg-secondary-container transition-colors cursor-pointer"
                  >
                    + Để kem mặn riêng
                  </button>
                  <button
                    type="button"
                    onClick={() => appendNote('Ít cafe hơn một chút')}
                    className="px-space-sm py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface hover:bg-secondary-container transition-colors cursor-pointer"
                  >
                    + Ít cafe hơn
                  </button>
                  <button
                    type="button"
                    onClick={() => appendNote('Tách đá riêng')}
                    className="px-space-sm py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface hover:bg-secondary-container transition-colors cursor-pointer"
                  >
                    + Tách đá riêng
                  </button>
                </div>
              </div>

              {/* Toast Notification */}
              {showAddedToast && (
                <div className="p-space-md rounded-xl bg-primary text-white flex items-center justify-between shadow-xl animate-bounce">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[24px]">task_alt</span>
                    <div>
                      <span className="font-headline-sm text-headline-sm font-semibold">
                        Đã thêm vào giỏ hàng thành công!
                      </span>
                      <p className="font-body-sm text-body-sm text-on-primary-container">
                        {quantity}x {product.name} ({size}, {sugar} Đường, {ice})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('cart')}
                    className="px-space-md py-2 bg-white text-primary rounded-lg font-label-md font-bold hover:bg-surface-container transition-colors"
                  >
                    Xem giỏ hàng
                  </button>
                </div>
              )}

              {/* 6. Order Summary Bar & CTA */}
              <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-lg sticky bottom-4 z-40 border border-surface-container-high">
                <div className="flex items-center justify-between sm:justify-start gap-space-lg">
                  {/* Quantity Stepper */}
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Số lượng
                    </span>
                    <div className="flex items-center bg-surface-container rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 rounded-md bg-surface text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-10 text-center font-tabular-data text-tabular-data font-bold text-on-surface">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-9 h-9 rounded-md bg-surface text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>

                  {/* Price Preview */}
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Tổng tiền tạm tính
                    </span>
                    <span className="font-headline-lg text-headline-lg text-primary tabular-data font-bold">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="flex items-center gap-space-md">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 sm:flex-none h-12 px-space-xl bg-primary-container text-white rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md hover:bg-primary transition-all active:scale-[0.98] cursor-pointer font-semibold"
                  >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations / Cross-sell Section */}
      <div className="w-full px-margin-lg py-space-xl bg-surface-container-low mt-space-xl border-t border-surface-container-high">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Hoàn hảo khi dùng cùng
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                Bánh tươi nướng trong ngày
              </h2>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-space-xs cursor-pointer font-semibold"
            >
              <span>Xem trọn bộ Menu bánh</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
            {CROSS_SELL_PASTRIES.map((pastry) => (
              <div
                key={pastry.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group border border-surface-container-high"
              >
                <div className="w-full aspect-[4/3] overflow-hidden bg-surface-container relative">
                  <img
                    src={pastry.image}
                    alt={pastry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {pastry.badge && (
                    <span className="absolute top-space-sm left-space-sm bg-surface-container-lowest/90 px-space-xs py-0.5 rounded text-label-sm font-label-sm text-on-surface font-semibold shadow-sm">
                      {pastry.badge}
                    </span>
                  )}
                </div>
                <div className="p-space-md flex flex-col justify-between flex-1 gap-space-sm">
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {pastry.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                      {pastry.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-tabular-data text-tabular-data font-bold text-primary">
                      {formatPrice(pastry.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart({
                          cartId: `cart-cross-${Date.now()}`,
                          productId: pastry.id,
                          name: pastry.name,
                          categoryTitle: 'Bánh tươi',
                          image: pastry.image,
                          size: 'S',
                          sugar: 'Tiêu chuẩn',
                          ice: 'Không',
                          toppings: [],
                          note: '',
                          unitPrice: pastry.price,
                          quantity: 1,
                          checked: true
                        });
                        setShowAddedToast(true);
                        setTimeout(() => setShowAddedToast(false), 2000);
                      }}
                      className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary-container hover:text-white text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                      title="Thêm bánh vào giỏ"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
