import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminProductsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminProductsPage: React.FC<AdminProductsPageProps> = ({ onNavigate, onShowToast }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const [products, setProducts] = useState([
    {
      id: 'CF-01',
      name: 'Cà phê Muối Aura Đặc Biệt',
      cat: 'Cà phê phin',
      tag: 'Bán chạy #1',
      cogs: 11850,
      price: 45000,
      margin: '73.7%',
      specs: '3 Size (S/M/L) • +3 Topping',
      hasRecipe: true,
      active: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABpqTu1yO2fvyVp7pdNTk6q4FCEB7gMQF3VB1Vop2rs9UBxLviBBYItIgUv0O1t3bLQEkNE8zmFWSJsU6v0pg_OgfHeOsSHC58wwz1JSRI0M60Oh-WjsLdjw4_nyHTsVDl7aLxNmQTERowRVHbjtJqPsoih7Pfadovuc8AFhfRmw4oTyhJTMFNQe558vFEDW9GV5ZL4tl1mDkiR2a8z7UZjXjwpc3F58Z_g8ItOQFmxSFA0pZcYDmF'
    },
    {
      id: 'CF-04',
      name: 'Espresso Sữa Hạnh Nhân',
      cat: 'Cà phê máy',
      tag: 'Sữa hạt cao cấp',
      cogs: 15200,
      price: 55000,
      margin: '72.4%',
      specs: '2 Size (Nóng / Lạnh)',
      hasRecipe: true,
      active: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVLP_KwMkh7Tk5YqxZY4vw4AuHGYjGoZQfuRCf5jFi7I2w9lXJMM6bUtJU4i-mbeMPfVaUy4mG3usHqm48RlVqVV_VlRto3vo385hivBlSzvaTq7n8Sh1tFrpUIN3VLyhQrEqOFZZmS33BOyvOEPvGONRmaci23R_Uucv0UYSNa2MzbJ5yeup2sHHrUlPzgqVF3aUcAEIIOPQR0rrGBhjRI71wl8H5qd9H2EjlLJdCHnl8Q0o0vrRq'
    },
    {
      id: 'TR-08',
      name: 'Trà Ô Long Mãng Cầu Nhiệt Đới',
      cat: 'Trà trái cây',
      tag: 'Mãng cầu tươi Đắk Lắk',
      cogs: 13500,
      price: 50000,
      margin: '73.0%',
      specs: '2 Size (M/L) • Trân châu 3Q',
      hasRecipe: true,
      active: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlUJXcl41-zQ_BmgX1VoqBMG6JDYluAFK2eZD1DYiYNuNdH4Yzm8YAldwzKw0QwU5545JMBF1LI9XHJImDExAwFh85xEi_Ir9pIzCsJ6by_NOup_DgKYYNq6A0zutusjQpZg4jnARy6VMT5snoPg0rc3UJkmo9JOfde0_Z8pm-VeeBIRx-1WNjoON1j_6jKNEBb7X_RAsNfr-iM0zKhtbdzwavuCFjeg8GLQYa7XX-KcZrpAjouEzn'
    },
    {
      id: 'CB-01',
      name: 'Cold Brew Cam Quế Mật Ong',
      cat: 'Thức uống đóng chai',
      tag: 'Ủ lạnh 16h',
      cogs: 18000,
      price: 58000,
      margin: '69.0%',
      specs: 'Chai thủy tinh 250ml',
      hasRecipe: true,
      active: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQeV0x1UQOt1qi4uPWgVwd1VHONCRrVar0DFvFWJSO8BWfkrcmiiguCniFo5u7OpOQwlikswWpiWY9MTznWpl0AAs_lqmxpK48RylFGUymHyjsvEgve-9fY-X_wAWhvKRp_jInbLGP6RPJ9SpfO3c8QCAEG0PeR1PWupsd99aaGF85OSPblzRRtr3dTmhs8jdfz72X2Mg-3GeOTDieaNeZdu72YIIud9uCKDuhni_j1OCFozLGFwn'
    },
    {
      id: 'BK-01',
      name: 'Croissant Bơ Pháp Nướng Nóng',
      cat: 'Bánh nướng',
      tag: 'Bơ lạt AOP nhập khẩu',
      cogs: 14500,
      price: 42000,
      margin: '65.5%',
      specs: 'Tiêu chuẩn kèm bơ',
      hasRecipe: true,
      active: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7D4fwgTtVx_I63nmfgu0mf33TJhTVQvhzWVQPXr8jDpXe64YRQKsK_mgyChy1vhH-d2Pvm5kOB67nSmt8r6jYSgkGy_3qi7dq-IMbk8LY231r3TljP6Up9Bijr3DzdD_6GQ24gUdHdFAXz0VYkvWHPb2XYgsZ5H6q6aOkV6QQsM3GEzqernkRD8JG3CAou9alOi_gTHrYl016hVM1kS7cSI9h8DcoCLSlSxfEcjkzTwka7ZPo782U'
    },
    {
      id: 'IB-03',
      name: 'Matcha Uji Đá Xay Kem Tươi',
      cat: 'Đá xay & Matcha',
      tag: 'Hết Whipping Cream',
      cogs: 22000,
      price: 62000,
      margin: '64.5%',
      specs: '2 Size (M/L)',
      hasRecipe: true,
      active: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkbeWozIjRlR-OHC2F7ZPAip5eWf74KEhofOTOp6tCmj2VGxdAm2Z-l5ELZGTl96zcxqgvKNQxWsDPX5g5Y9NfqnED50nR3qnOUFbcmStZCgBl2MO8dymch4wbbWU8XfYVM3hFQZ78adtwJI2yZzLD6pH5mMNZNkIu9CxbQjF6DcrUxQNL8CwtBSpmNtcA4Y1uWDHkDe1DM1wrRpCnCDNCybh7bQTBPGQKXWYjWZ08VbfbZMI9EG8j'
    }
  ]);

  const toggleProductActive = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, active: !p.active } : p))
    );
    onShowToast?.(`Đã thay đổi trạng thái bán của món #${id}`);
  };

  const filteredProducts = products.filter(p => {
    const matchSearch =
      searchFilter.trim() === '' ||
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-products" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Page Header */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                  SKU Catalog v2.4
                </span>
                <span>• Đồng bộ 12 trạm POS tự động</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Quản lý Sản phẩm & Định giá (Product Management)
              </h1>
              <p className="text-xs text-stone-500">
                Quản lý danh sách 45 món đồ uống & bánh nướng, thiết lập giá bán niêm yết, cấu hình size ly và liên kết công thức pha chế.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={() => onShowToast?.('Đang tải danh sách bảng giá POS ra file Excel...')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Xuất bảng giá POS</span>
              </button>
              <button
                onClick={() => onShowToast?.('Đã mở công cụ cập nhật giá niêm yết hàng loạt theo %')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">price_change</span>
                <span>Cập nhật giá hàng loạt</span>
              </button>
              <button
                onClick={() => {
                  const newSku = prompt('Nhập tên món mới muốn thêm vào menu:');
                  if (newSku) {
                    onShowToast?.(`Đã tạo bản nháp món mới "${newSku}". Hãy gán công thức pha chế BOM!`);
                  }
                }}
                className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Thêm món mới (+)</span>
              </button>
            </div>
          </div>

          {/* Bento Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-stone-100 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Tổng số món</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">45 SKU</span>
              <span className="text-[11px] text-emerald-700 font-semibold">+2 món mới tuần này</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Đang kinh doanh</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">42</span>
              <span className="text-[11px] text-emerald-700 font-semibold">93.3% sẵn sàng</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Tạm hết hàng</span>
              <span className="text-xl font-black text-rose-700 font-mono mt-0.5 block">03 Khóa POS</span>
              <span className="text-[11px] text-stone-500">Cần nhập Whipping Cream</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Margin cao (&gt;70%)</span>
              <span className="text-xl font-black text-primary font-mono mt-0.5 block">28 SKU</span>
              <span className="text-[11px] text-stone-500">Biên lợi nhuận TB 71.8%</span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="relative flex-1 max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Tìm theo tên món hoặc mã SKU (#CF-01, Trà Ô Long, Matcha...)"
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="h-10 px-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 text-xs"
            >
              <option value="all">Tất cả danh mục (5)</option>
              <option value="espresso">Cà phê máy</option>
              <option value="phin">Cà phê phin</option>
              <option value="fruit-tea">Trà trái cây</option>
              <option value="bottled">Thức uống đóng chai</option>
            </select>
          </div>
        </div>

        {/* Master Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Sản Phẩm & SKU</th>
                  <th className="py-3 px-4">Danh Mục</th>
                  <th className="py-3 px-4 text-right">Giá Vốn (COGS)</th>
                  <th className="py-3 px-4 text-right">Giá Bán POS</th>
                  <th className="py-3 px-4 text-center">Margin (%)</th>
                  <th className="py-3 px-4">Quy Cách & Size</th>
                  <th className="py-3 px-4 text-center">Công Thức Recipe</th>
                  <th className="py-3 px-4 text-center">Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-11 h-11 rounded-lg object-cover bg-stone-100 shrink-0"
                        />
                        <div>
                          <strong className="text-stone-900 block text-xs">{prod.name}</strong>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-primary font-bold text-[10px] bg-primary/10 px-1 rounded">
                              #{prod.id}
                            </span>
                            <span className="text-[10px] text-stone-400">{prod.tag}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                        {prod.cat}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-stone-500">
                      {prod.cogs.toLocaleString('vi-VN')}₫
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-stone-900 text-xs sm:text-sm">
                      {prod.price.toLocaleString('vi-VN')}₫
                    </td>

                    <td className="py-3 px-4 text-center font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                        {prod.margin}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-[11px] text-stone-600">{prod.specs}</td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onNavigate('kds-recipe')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 text-[11px]"
                      >
                        <span className="material-symbols-outlined text-[14px]">science</span>
                        <span>Đã có Recipe</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleProductActive(prod.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          prod.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {prod.active ? 'Đang bán' : 'Hết hàng'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-stone-400">
                        <button
                          onClick={() => onNavigate('kds-recipe')}
                          className="p-1 hover:text-primary rounded"
                          title="Xem công thức"
                        >
                          <span className="material-symbols-outlined text-[16px]">receipt</span>
                        </button>
                        <button
                          onClick={() => onShowToast?.(`Đang mở popup chỉnh sửa giá món #${prod.id}`)}
                          className="p-1 hover:text-stone-800 rounded"
                          title="Chỉnh sửa giá"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sync Banner */}
        <div className="p-4 bg-gradient-to-r from-primary/10 via-stone-50 to-white rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">sync_saved_locally</span>
            </div>
            <div>
              <strong className="text-stone-900 block text-xs sm:text-sm">
                Tự động khấu hao & liên kết Định mức nguyên liệu (Recipe ERP)
              </strong>
              <span className="text-stone-500">
                Khi thu ngân hoàn tất đơn trên POS, lượng Cà phê Robusta Mộc, Sữa tươi và Siro sẽ tự động trừ trực tiếp vào Kho nguyên liệu.
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('admin-stock')}
            className="px-3.5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shrink-0"
          >
            Kiểm tra tồn kho →
          </button>
        </div>
      </main>
    </div>
  );
};
