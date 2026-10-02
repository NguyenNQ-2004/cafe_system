import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { PosHeader } from './PosHeader';

interface PosCreateOrderPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface PosCartItem {
  id: string;
  name: string;
  size: string;
  sugar: string;
  ice: string;
  topping: string;
  note: string;
  unitPrice: number;
  qty: number;
}

export const PosCreateOrderPage: React.FC<PosCreateOrderPageProps> = ({ onNavigate, onShowToast }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [usePoints, setUsePoints] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'vietqr' | 'pos' | 'wallet'>('vietqr');

  // Customer state
  const [customer, setCustomer] = useState<{
    name: string;
    phone: string;
    tier: string;
    code: string;
    points: number;
  } | null>({
    name: 'Nguyễn Văn An',
    phone: '0988 234 891',
    tier: 'Gold Member',
    code: 'AUR-8823',
    points: 450
  });

  // Cart state
  const [cartItems, setCartItems] = useState<PosCartItem[]>([
    {
      id: 'p1',
      name: 'Cà phê Muối Aura',
      size: 'Size L (+8.000đ)',
      sugar: '50% Đường',
      ice: '100% Đá',
      topping: 'Thêm kem béo mặn (+10.000đ)',
      note: '',
      unitPrice: 63000,
      qty: 2
    },
    {
      id: 'p2',
      name: 'Trà Mãng Cầu Nhiệt Đới',
      size: 'Size M',
      sugar: '70% Đường',
      ice: '70% Đá',
      topping: 'Trân châu trắng 3Q (+8.000đ)',
      note: '',
      unitPrice: 58000,
      qty: 1
    },
    {
      id: 'p3',
      name: 'Croissant Bơ Pháp',
      size: 'Tiêu chuẩn',
      sugar: 'Chuẩn',
      ice: 'Không',
      topping: 'Hâm nóng lò nướng giòn',
      note: 'Lấy thêm bơ hũ nhỏ',
      unitPrice: 42000,
      qty: 1
    }
  ]);

  // Modal customizer
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    basePrice: number;
    sku: string;
    desc: string;
  } | null>(null);

  const [modalSize, setModalSize] = useState('M');
  const [modalSugar, setModalSugar] = useState('50%');
  const [modalIce, setModalIce] = useState('100% Đá');
  const [modalToppings, setModalToppings] = useState<string[]>(['Kem béo muối riêng']);
  const [modalQty, setModalQty] = useState(1);
  const [isNewCustModalOpen, setIsNewCustModalOpen] = useState(false);
  const [newCustForm, setNewCustForm] = useState({ phone: '', name: '', birthday: '' });

  const catalog = [
    {
      id: 'CF-01',
      name: 'Cà phê Muối Aura',
      desc: 'Cà phê Robusta Đắk Lắk cùng lớp kem béo muối hồng Himalaya',
      price: 45000,
      cat: 'traditional',
      tag: 'Bán chạy #1',
      stock: 'Còn 65 ly',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC5Pbo3nGkh8YA0V5D4yMsCNAXhTRHd33V5LLIpDkyOGR3Uin4kj65m1b5UDchDPdQE3FuM-4zUtRdgKmmX9Te36BANKEgf2AYIiKb8dtkQFF72RkHk0w9IQy8X27aw1YkJTS09GxTBcLNQgm5SSBvSRZm_0VPf_bythxt3RuCRtSgMgvlPfqM3ZDENMqf7QIwksHmE9LyKcu-SNr32BY60s2uXaeE5heauHkNUvKqazIFZ9Q4Tqtb'
    },
    {
      id: 'CF-04',
      name: 'Espresso Sữa Hạnh Nhân',
      desc: 'Hạt Arabica Cầu Đất phối sữa hạt hạnh nhân nguyên chất',
      price: 55000,
      cat: 'espresso',
      stock: 'Còn hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsL56sdffkwBqQXgMuX0OSYL51FEkde4C_8nCXSgM40ZD9OOR_h2ar5AVIbOTykAjlMUUNoOFoeRy4hDjREVXNV9VoWt5FwZncTkq2UhaSD5xrUZUxkqSsu7siL268gioPWOVPyZXRigoO_cJC1REuxSEZS4MpXUXimwucHz3SfrpncFAsOMfT1mUaizj_imSXGo9iHsRNSeNJzYYdNEB-ZvNeTC7F94yBYAbG_rlWfr3RP2LX7thi'
    },
    {
      id: 'TR-08',
      name: 'Trà Mãng Cầu Nhiệt Đới',
      desc: 'Trà Ô long & thịt mãng cầu tươi, thanh mát giải nhiệt',
      price: 50000,
      cat: 'tea',
      tag: 'Mới ra mắt',
      stock: 'Còn 24 ly',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7mQAi0TZPE7iBXm9S2CP3JykPqJE15aN0OE8CVUsmH_q2QEiP_VFzkslt8V7XzdxsKn1OXxoL42rPntCkEAGZ1Ci3tqNBbbHn3DFTssSmdzuO77_QN4GZ6S_UBJCeR-Sr-uzu_l1Feuz7G63xh8fmHD26YOezjlr7RvPOKpO62wRVVw316WaJN5PkoRlDB5GJ-ZrTNLlWlklOwgiKKOxoR5OoyfNDuzVqvpTH8aHBW5Si5Cl_ovqo'
    },
    {
      id: 'TR-02',
      name: 'Trà Đào Cam Sả Macchiato',
      desc: 'Trà đào sả thơm lừng phủ lớp foam phô mai béo ngậy',
      price: 52000,
      cat: 'tea',
      stock: 'Còn hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB84RcECH6Qzfti1XQYoO7Es8wbWcCxO8PUbr6dBaR4CB9j5FOso_eizDK5hDLdrjoVHA9cApaa4zBWAwtwh5MrqXM9Zg51CuqyXn7rVuGPvQ9lvrqqrU27Cvxh_QGgkw4QHdd1KuQkzvmE4H-ufvS_f4AyxVcGML54DUXNGC_YrSkxOb8pftQ8V_xIatYFUDAVDa3ImCqTefq3dE9u9q4-brzaT3GyA7fIoDNTGjvBxE4su8VFqLto'
    },
    {
      id: 'CB-01',
      name: 'Cold Brew Cam Vàng Quế',
      desc: 'Cà phê ủ lạnh sâu 24 giờ cùng tinh chất cam sành và quế',
      price: 58000,
      cat: 'coldbrew',
      stock: 'Còn 18 ly',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW01P9d9B95YZT2UtSFNNC_QtbE0XwAVdejZil0SY6BldWUz9ASPiFL_RkBiq_wQUQB7jC91NVeRLdKwe_bjd1uqECxNN8F6z7uwonFuEe4ol9bMg5n9h2or_dm4Msbz1smxMHY6UPKD3iAYT9SYQk8lh3fCExjQoASdbAp-VQ34EnrGW23TCRBMIOvMoQw3nmeysJAx3d2SwNgrFm08UASpiHO1veHqgCHV5JBAXGTQAPQ3QfwN6u'
    },
    {
      id: 'CF-02',
      name: 'Bạc Xỉu 3 Tầng Aura',
      desc: 'Sữa đặc ngọt dịu, sữa tươi thanh trùng và cà phê phin sánh đậm',
      price: 38000,
      cat: 'traditional',
      stock: 'Còn hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARVvzwJojrnDFaPUHO2nLggkB3uj9dkEemBQtB77iyiVw_m1V0NicBAd-0olNdyhB1SOhGAx3WgzaKbDpcz-egg7J7f2dgcj-eI6Lmxyo5il7yZcC4LK3ylmR1YS0AOzh4bFrb7vj5rq5pmVyGxAx7epi61WeAnUEcgTr7XRIn0oP4uL5K29M-canD-_yE6mh6sjgy6PU2lNkeDw95aUvz7M-a-c93gG_66gs8i8-jJtME5_CQ3ied'
    },
    {
      id: 'BK-01',
      name: 'Croissant Bơ Pháp',
      desc: 'Bánh sừng bò nướng giòn rụm thơm lừng bơ vùng Normandy',
      price: 42000,
      cat: 'pastry',
      tag: 'Sắp hết (Còn 4)',
      stock: 'Còn 4 cái',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAHph47Au4ndvWJ1-qbGfeBbYYF_NQWmR2p57dXBwXR3HbmtGt1s8GPwFVWZFr2r7nRACH7F1J_IqX3WKsLIURUoSIcND9HZkTjsAEH20-txCjfZ1RpvbUxZni0-DgLLbbmscAHsv_SOe8IJwG5-1RqEzOY0JKIwS3AKCTYnV0tWTa9Xg2uy1X2L5vAsTqoABttF6iG0Zib7umoFN374x60zpvOCbmIYhi3tm6VAqiurUmyGgACMFi'
    },
    {
      id: 'IB-03',
      name: 'Matcha Đá Xay Hạt Dẻ',
      desc: 'Bột matcha Uji thượng hạng kết hợp sốt pistachio hạt dẻ cười',
      price: 62000,
      cat: 'iceblend',
      stock: 'Còn hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByhrPxQBXYJNk0qRF1tLTkRpZZQHb6QdaF8EhszejnrEY-R2rxDoATIPC7l833jo_UBjgoCcxL2x5cyVckaLUhwO8YXV0N7ayZ7hdVDLqVEKAos2-F5IfhMuJ6oZeL7ptayz2cR-AlArLaSNm1c2GOEaeMAhRN4iM4KO0_B730vxH-_ihO5cpsyK0HbKKTV8kiE-q3QKdV_upBB9yHPkQhos2ZvyI4wbXtApDvFzEsp_Ilf4pDf1z3'
    }
  ];

  // Calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.unitPrice * curr.qty, 0);
  const goldDiscount = customer ? Math.round(subtotal * 0.05) : 0;
  const pointDiscount = usePoints && customer ? 10000 : 0;
  const vat = Math.round((subtotal - goldDiscount - pointDiscount) * 0.08);
  const total = subtotal - goldDiscount - pointDiscount + vat;

  const handleOpenCustomizer = (prod: any) => {
    setSelectedProduct({
      name: prod.name,
      basePrice: prod.price,
      sku: prod.id,
      desc: prod.desc
    });
    setModalSize('M');
    setModalSugar('50%');
    setModalIce('100% Đá');
    setModalToppings(['Kem béo muối riêng']);
    setModalQty(1);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedProduct) return;
    let addPrice = selectedProduct.basePrice;
    if (modalSize === 'L') addPrice += 8000;
    if (modalToppings.includes('Kem béo muối riêng')) addPrice += 10000;
    if (modalToppings.includes('Trân châu 3Q trắng')) addPrice += 8000;
    if (modalToppings.includes('Thêm 1 Shot Espresso')) addPrice += 12000;
    if (modalToppings.includes('Sữa hạt Hạnh Nhân')) addPrice += 15000;

    const newItem: PosCartItem = {
      id: `p-${Date.now()}`,
      name: selectedProduct.name,
      size: `Size ${modalSize}${modalSize === 'L' ? ' (+8k)' : ''}`,
      sugar: `${modalSugar} Đường`,
      ice: modalIce,
      topping: modalToppings.join(', '),
      note: '',
      unitPrice: addPrice,
      qty: modalQty
    };

    setCartItems([newItem, ...cartItems]);
    setSelectedProduct(null);
    onShowToast?.(`Đã thêm "${selectedProduct.name}" vào giỏ đơn quầy!`);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => {
          if (i.id === id) {
            const next = i.qty + delta;
            return next > 0 ? { ...i, qty: next } : null;
          }
          return i;
        })
        .filter(Boolean) as PosCartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    onShowToast?.('Đã xóa món khỏi đơn.');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      onShowToast?.('Giỏ hàng trống! Vui lòng chọn món trước.');
      return;
    }
    onShowToast?.(`Đã thanh toán thành công đơn #ORD-${Math.floor(1000 + Math.random() * 9000)} qua ${paymentMethod.toUpperCase()}! Đang in hóa đơn K80...`);
    setCartItems([]);
  };

  const handleRegisterNewCust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustForm.phone || !newCustForm.name) {
      onShowToast?.('Vui lòng nhập tên và số điện thoại khách!');
      return;
    }
    setCustomer({
      name: newCustForm.name,
      phone: newCustForm.phone,
      tier: 'Bạc (New Member)',
      code: `AUR-${Math.floor(1000 + Math.random() * 9000)}`,
      points: 50
    });
    setIsNewCustModalOpen(false);
    onShowToast?.(`Đã đăng ký thành viên cho ${newCustForm.name}!`);
  };

  const filteredCatalog = catalog.filter(p => {
    const matchCat = activeCategory === 'all' || p.cat === activeCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
      <PosHeader currentRoute="pos-create" onNavigate={onNavigate} onShowToast={onShowToast} />

      {/* Sub Header Ribbon */}
      <div className="w-full px-4 sm:px-6 py-2.5 bg-stone-100 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-primary uppercase">Hóa Đơn Bán Lẻ:</span>
            <span className="font-mono font-bold text-stone-900 bg-white px-2.5 py-0.5 rounded border border-stone-200 text-xs">
              #ORD-20241024-0089
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <span className="material-symbols-outlined text-[16px] text-amber-700">storefront</span>
            <span>Kênh: Tại Quầy (Counter POS)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-stone-200 shadow-2xs">
            <span className="text-stone-500 font-medium">Phím tắt:</span>
            <span className="px-1.5 py-0.5 bg-stone-100 rounded text-primary font-mono font-semibold">[F2] Tìm món</span>
            <span className="px-1.5 py-0.5 bg-stone-100 rounded text-primary font-mono font-semibold">[F3] Khách hàng</span>
            <span className="px-1.5 py-0.5 bg-stone-100 rounded text-primary font-mono font-semibold">[F4] Lưu tạm</span>
            <span className="px-1.5 py-0.5 bg-stone-100 rounded text-primary font-mono font-semibold">[F9] Thanh toán</span>
          </div>
          <button
            onClick={() => onNavigate('pos-orders')}
            className="h-8 px-3 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-medium flex items-center gap-1.5 border border-stone-200 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span>Lịch sử ca (14)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 7 cols Catalog + 5 cols Cart */}
      <div className="w-full px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
        {/* LEFT COLUMN: Catalog (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Search & Category Tabs */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên món, mã SKU món (Gõ hoặc bấm F2)..."
                  className="w-full h-10 pl-10 pr-24 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-primary transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-stone-200/60 text-stone-500 font-mono text-[10px]">F2</span>
                  <button 
                    onClick={() => onShowToast?.('Đang kết nối đầu đọc mã vạch Barcode USB...')}
                    className="w-7 h-7 rounded flex items-center justify-center text-stone-500 hover:text-primary hover:bg-stone-100"
                    title="Quét mã vạch"
                  >
                    <span className="material-symbols-outlined text-[18px]">barcode_scanner</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => onShowToast?.('Đang lọc các món còn nguyên liệu')}
                className="h-10 px-3.5 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5 shrink-0"
              >
                <span className="material-symbols-outlined text-[18px] text-amber-800">tune</span>
                <span>Bộ lọc</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'Tất cả (48)' },
                { id: 'espresso', label: 'Cà phê máy' },
                { id: 'traditional', label: 'Phin truyền thống' },
                { id: 'tea', label: 'Trà trái cây & Macchiato' },
                { id: 'iceblend', label: 'Đá xay (Ice Blend)' },
                { id: 'pastry', label: 'Bánh ngọt & Pastry' },
                { id: 'coldbrew', label: 'Cold Brew ủ lạnh' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredCatalog.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenCustomizer(item)}
                className="cursor-pointer group flex flex-col justify-between p-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div>
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-stone-100 mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.tag && (
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-primary text-white font-bold text-[10px] shadow-sm">
                        {item.tag}
                      </span>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-white/90 font-mono text-[10px] text-stone-700 font-bold">
                      {item.id}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-primary transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-extrabold text-sm sm:text-base text-primary">
                    {item.price.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                    {item.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Cart & Customer (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Membership Module */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">loyalty</span>
                <span className="font-bold text-sm text-stone-900">Thành Viên Aura Rewards</span>
              </div>
              <button
                onClick={() => setIsNewCustModalOpen(true)}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">person_add</span>
                + Khách mới
              </button>
            </div>

            {customer ? (
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      AN
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{customer.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                          {customer.tier}
                        </span>
                      </div>
                      <span className="text-xs text-stone-500 font-mono">
                        Mã: {customer.code} • {customer.phone}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCustomer(null);
                      onShowToast?.('Đã gỡ khách hàng khỏi đơn.');
                    }}
                    className="text-stone-400 hover:text-rose-600 p-1"
                    title="Gỡ thành viên"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span className="text-stone-600">
                    Điểm tích lũy: <strong className="text-primary font-bold">{customer.points} pts</strong>
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-stone-800">
                    <input
                      type="checkbox"
                      checked={usePoints}
                      onChange={e => setUsePoints(e.target.checked)}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    Dùng 100 điểm (-10.000₫)
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập SĐT khách hàng (F3)..."
                  className="flex-1 h-10 px-3 text-xs bg-stone-50 rounded-xl border border-stone-200"
                />
                <button
                  onClick={() => {
                    setCustomer({
                      name: 'Nguyễn Văn An',
                      phone: '0988 234 891',
                      tier: 'Gold Member',
                      code: 'AUR-8823',
                      points: 450
                    });
                    onShowToast?.('Đã tra cứu thành viên Nguyễn Văn An!');
                  }}
                  className="h-10 px-3.5 bg-primary text-white text-xs font-bold rounded-xl"
                >
                  Tra cứu
                </button>
              </div>
            )}

            {/* Order Type Toggle: Dine In vs Takeaway */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`h-11 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'dine-in'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
                <span>Tại quán • Bàn 04</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`h-11 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'takeaway'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">takeout_dining</span>
                <span>Mang đi (Takeaway)</span>
              </button>
            </div>
          </div>

          {/* Cart Section */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">shopping_bag</span>
                <h3 className="font-bold text-sm text-stone-900">
                  Chi Tiết Giỏ Món ({cartItems.length} món)
                </h3>
              </div>
              <button
                onClick={() => {
                  setCartItems([]);
                  onShowToast?.('Đã xóa sạch giỏ hàng.');
                }}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-[15px]">delete_sweep</span>
                Xóa hết
              </button>
            </div>

            {/* Cart item scroll */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="p-3 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/70 transition-colors flex flex-col gap-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-stone-900">{item.name}</p>
                      <p className="text-[11px] text-primary font-medium mt-0.5">
                        {item.size} • {item.sugar} • {item.ice}
                      </p>
                      {item.topping && (
                        <p className="text-[11px] text-stone-500">Topping: {item.topping}</p>
                      )}
                      {item.note && (
                        <p className="text-[11px] text-amber-800 italic">Ghi chú: {item.note}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-xs sm:text-sm text-primary">
                        {(item.unitPrice * item.qty).toLocaleString('vi-VN')}₫
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {item.unitPrice.toLocaleString('vi-VN')}₫ / ly
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-200/50">
                    <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 border border-stone-200">
                      <button
                        onClick={() => handleUpdateQty(item.id, -1)}
                        className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono font-bold text-xs">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQty(item.id, 1)}
                        className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const note = prompt('Nhập ghi chú cho barista:', item.note);
                          if (note !== null) {
                            setCartItems(cartItems.map(i => i.id === item.id ? { ...i, note } : i));
                          }
                        }}
                        className="p-1 rounded text-stone-500 hover:text-primary"
                        title="Ghi chú pha chế"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 rounded text-stone-400 hover:text-rose-600"
                        title="Xóa món"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="p-3 bg-stone-100/70 rounded-xl space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Tạm tính ({cartItems.length} món):</span>
                <span className="font-mono text-stone-900 font-semibold">{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              {customer && (
                <div className="flex justify-between text-primary">
                  <span>Giảm thành viên Gold (5%):</span>
                  <span className="font-mono font-semibold">-{goldDiscount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              {usePoints && customer && (
                <div className="flex justify-between text-primary">
                  <span>Điểm thưởng Aura (-100 pts):</span>
                  <span className="font-mono font-semibold">-{pointDiscount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Thuế GTGT (VAT 8%):</span>
                <span className="font-mono font-semibold">+{vat.toLocaleString('vi-VN')}₫</span>
              </div>

              <div className="pt-2 mt-1 border-t border-stone-200 flex items-center justify-between text-stone-900">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block">Tổng thanh toán:</span>
                  <span className="text-[10px] text-stone-500">Đã bao gồm VAT & Ưu đãi</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-primary font-mono">
                  {total.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <span className="text-xs font-bold text-stone-700 block mb-1.5">Phương thức thanh toán nhanh:</span>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[
                  { id: 'cash', label: 'Tiền mặt', icon: 'payments' },
                  { id: 'vietqr', label: 'VietQR Pro', icon: 'qr_code_2' },
                  { id: 'pos', label: 'Thẻ POS', icon: 'credit_card' },
                  { id: 'wallet', label: 'Ví Aura', icon: 'wallet' },
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === m.id
                        ? 'bg-primary text-white border-primary shadow-xs font-bold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{m.icon}</span>
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Master Actions */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">receipt</span>
                <span>IN HÓA ĐƠN & THANH TOÁN (F9)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => onShowToast?.('Đã lưu tạm đơn hàng vào hàng đợi chờ thanh toán!')}
                  className="py-2.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 font-semibold flex items-center justify-center gap-1 border border-stone-200"
                >
                  <span className="material-symbols-outlined text-[16px]">pause_circle</span>
                  <span>LƯU TẠM ĐƠN (F4)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCartItems([]);
                    onShowToast?.('Đã hủy đơn hàng.');
                  }}
                  className="py-2.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold flex items-center justify-center gap-1 border border-rose-200"
                >
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                  <span>HỦY ĐƠN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Customizer Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-stone-900">{selectedProduct.name}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{selectedProduct.desc}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Size options */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-2">
                Chọn kích thước (Size):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'S', label: 'Size S (350ml)', delta: 0 },
                  { id: 'M', label: 'Size M (500ml)', delta: 0 },
                  { id: 'L', label: 'Size L (700ml)', delta: 8000 },
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setModalSize(s.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-0.5 ${
                      modalSize === s.id
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] opacity-80">
                      {s.delta > 0 ? `+${s.delta.toLocaleString('vi-VN')}₫` : '+0₫'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sugar Level */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-2">
                Mức ngọt / Đường:
              </label>
              <div className="grid grid-cols-5 gap-1.5 text-xs">
                {['0%', '30%', '50%', '70%', '100%'].map(sugar => (
                  <button
                    key={sugar}
                    type="button"
                    onClick={() => setModalSugar(sugar)}
                    className={`py-2 rounded-lg border font-semibold ${
                      modalSugar === sugar
                        ? 'bg-primary text-white border-primary'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {sugar}
                  </button>
                ))}
              </div>
            </div>

            {/* Ice Level */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-2">
                Mức đá:
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {['Không đá', '30% Đá', '70% Đá', '100% Đá'].map(ice => (
                  <button
                    key={ice}
                    type="button"
                    onClick={() => setModalIce(ice)}
                    className={`py-2 rounded-lg border font-semibold ${
                      modalIce === ice
                        ? 'bg-primary text-white border-primary'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {ice}
                  </button>
                ))}
              </div>
            </div>

            {/* Topping list */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-2">
                Thêm Topping / Phụ gia:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Kem béo muối riêng', price: 10000 },
                  { name: 'Trân châu 3Q trắng', price: 8000 },
                  { name: 'Thêm 1 Shot Espresso', price: 12000 },
                  { name: 'Sữa hạt Hạnh Nhân', price: 15000 },
                ].map(top => {
                  const checked = modalToppings.includes(top.name);
                  return (
                    <label
                      key={top.name}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        checked ? 'bg-primary/5 border-primary text-primary font-bold' : 'border-stone-200 text-stone-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            setModalToppings(modalToppings.filter(t => t !== top.name));
                          } else {
                            setModalToppings([...modalToppings, top.name]);
                          }
                        }}
                        className="accent-primary w-4 h-4 rounded"
                      />
                      <div className="flex flex-col">
                        <span>{top.name}</span>
                        <span className="text-[10px] opacity-80 font-mono">+{top.price.toLocaleString('vi-VN')}₫</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Footer customizer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-stone-100 rounded-xl p-1 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                  className="w-8 h-8 rounded-lg bg-white font-bold text-stone-800"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{modalQty}</span>
                <button
                  type="button"
                  onClick={() => setModalQty(modalQty + 1)}
                  className="w-8 h-8 rounded-lg bg-white font-bold text-stone-800"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleConfirmAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-container shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                <span>THÊM VÀO ĐƠN</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Customer Modal */}
      {isNewCustModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person_add</span>
                Đăng Ký Thành Viên Nhanh
              </h3>
              <button
                onClick={() => setIsNewCustModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterNewCust} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Số điện thoại (*)</label>
                <input
                  type="tel"
                  required
                  value={newCustForm.phone}
                  onChange={e => setNewCustForm({ ...newCustForm, phone: e.target.value })}
                  placeholder="09xx xxx xxx"
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Họ và tên khách hàng (*)</label>
                <input
                  type="text"
                  required
                  value={newCustForm.name}
                  onChange={e => setNewCustForm({ ...newCustForm, name: e.target.value })}
                  placeholder="Ví dụ: Hoàng Thu Trang"
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ngày sinh (Nhận quà ưu đãi)</label>
                <input
                  type="date"
                  value={newCustForm.birthday}
                  onChange={e => setNewCustForm({ ...newCustForm, birthday: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewCustModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 font-semibold"
                >
                  Bỏ qua
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold shadow-xs hover:bg-primary-container"
                >
                  Lưu & Tích điểm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
