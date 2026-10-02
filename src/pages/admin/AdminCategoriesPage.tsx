import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminCategoriesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminCategoriesPage: React.FC<AdminCategoriesPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedId, setSelectedId] = useState('CAT-01');
  const [categories, setCategories] = useState([
    { id: 'CAT-01', order: 1, nameVn: 'Cà phê máy & Espresso', nameEn: 'Machine & Espresso Coffee', desc: 'Các món pha bằng máy pha công nghiệp Nuova Simonelli cao cấp', icon: 'coffee', itemCount: 12, channel: 'Tất cả kênh', active: true },
    { id: 'CAT-02', order: 2, nameVn: 'Cà phê truyền thống & Phin', nameEn: 'Traditional Vietnamese Phin', desc: 'Cà phê phin truyền thống hạt Robusta Cầu Đất, Cà phê muối', icon: 'emoji_food_beverage', itemCount: 8, channel: 'Tất cả kênh', active: true },
    { id: 'CAT-03', order: 3, nameVn: 'Trà trái cây & Macchiato', nameEn: 'Fruit Tea & Macchiato', desc: 'Trà Ô Long mãng cầu, Trà sen vàng, Trà đào cam sả', icon: 'local_bar', itemCount: 10, channel: 'Tất cả kênh', active: true },
    { id: 'CAT-04', order: 4, nameVn: 'Đá xay & Matcha (Ice Blended)', nameEn: 'Ice Blended Drinks', desc: 'Uji Matcha kem tươi, Cacao Bến Tre, Frappuccino', icon: 'icecream', itemCount: 6, channel: 'Tất cả kênh', active: true },
    { id: 'CAT-05', order: 5, nameVn: 'Bánh nướng & Dessert', nameEn: 'Fresh Bakery & Cakes', desc: 'Bánh mì croissant bơ tỏi, Tiramisu cacao, Basque Cheesecake', icon: 'bakery_dining', itemCount: 7, channel: 'Tất cả kênh', active: true },
    { id: 'CAT-06', order: 6, nameVn: 'Thức uống đóng chai RTD', nameEn: 'Ready-to-drink Bottles', desc: 'Cold brew ủ lạnh chai thủy tinh, Trà sữa đóng chai bảo quản lạnh', icon: 'liquor', itemCount: 4, channel: 'Tất cả kênh', active: true },
    { id: 'CAT-07', order: 7, nameVn: 'Combo Bữa sáng & Teabreak', nameEn: 'Morning Breakfast Combo', desc: 'Combo cà phê + bánh nướng tiết kiệm phục vụ sáng', icon: 'lunch_dining', itemCount: 5, channel: 'Chỉ POS quầy', active: true },
    { id: 'CAT-08', order: 8, nameVn: 'Bộ sưu tập Mùa Lễ Hội', nameEn: 'Seasonal Limited Editions', desc: 'Danh mục đồ uống giới hạn theo mùa thu đông (Tạm ngưng phục vụ)', icon: 'celebration', itemCount: 3, channel: 'Tất cả kênh', active: false },
  ]);

  const selectedCategory = categories.find(c => c.id === selectedId) || categories[0];

  const [formData, setFormData] = useState({
    nameVn: selectedCategory.nameVn,
    nameEn: selectedCategory.nameEn,
    order: selectedCategory.order,
    icon: selectedCategory.icon,
    showPos: true,
    showApp: true
  });

  const handleSelect = (cat: typeof categories[0]) => {
    setSelectedId(cat.id);
    setFormData({
      nameVn: cat.nameVn,
      nameEn: cat.nameEn,
      order: cat.order,
      icon: cat.icon,
      showPos: true,
      showApp: cat.active
    });
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setCategories(prev =>
      prev.map(c => (c.id === selectedId ? { ...c, ...formData } : c))
    );
    onShowToast?.(`Đã lưu cấu hình danh mục #${selectedId} và đồng bộ thời gian thực sang POS!`);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-categories" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="px-2 py-0.5 rounded bg-stone-100 font-bold uppercase">Menu Architecture</span>
                <span>CAT-DB v2.8</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Quản trị Danh mục Thực đơn (Menu Categories)
              </h1>
              <p className="text-xs text-stone-500">
                Cấu hình danh mục hiển thị trên hệ thống POS tại quầy, KDS quầy bar và ứng dụng đặt hàng của khách.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={() => onShowToast?.('Đang xuất danh mục thực đơn ra file Excel...')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>Xuất dữ liệu Excel</span>
              </button>
              <button
                onClick={() => onShowToast?.('Đã mở chế độ kéo thả sắp xếp thứ tự hiển thị danh mục')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">swap_vert</span>
                <span>Sắp xếp thứ tự</span>
              </button>
              <button
                onClick={() => {
                  const newId = `CAT-${categories.length + 1}`;
                  const newCat = {
                    id: newId,
                    order: categories.length + 1,
                    nameVn: 'Danh mục mới',
                    nameEn: 'New Category',
                    desc: 'Mô tả danh mục đồ uống mới',
                    icon: 'coffee',
                    itemCount: 0,
                    channel: 'Tất cả kênh',
                    active: true
                  };
                  setCategories([...categories, newCat]);
                  handleSelect(newCat);
                  onShowToast?.(`Đã tạo danh mục mới #${newId}`);
                }}
                className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Thêm danh mục mới</span>
              </button>
            </div>
          </div>

          {/* Quick stats band */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-stone-100 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Tổng danh mục</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">08</span>
              <span className="text-[11px] text-emerald-700 font-medium">Toàn hệ thống Aura</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Đang kinh doanh</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">07</span>
              <span className="text-[11px] text-stone-500">87.5% online</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Tổng số món</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">55</span>
              <span className="text-[11px] text-stone-500">Active SKU Items</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Kênh độc quyền</span>
              <span className="text-xl font-black text-amber-800 font-mono mt-0.5 block">01</span>
              <span className="text-[11px] text-amber-800 font-medium">1 danh mục Chỉ POS</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Categories Table & Drawer Editor */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Table (8 cols) */}
          <div className="xl:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3 text-center">Thứ tự</th>
                    <th className="py-2.5 px-3 text-center">Icon</th>
                    <th className="py-2.5 px-3">Tên danh mục</th>
                    <th className="py-2.5 px-3">Mô tả</th>
                    <th className="py-2.5 px-3 text-right">Số món</th>
                    <th className="py-2.5 px-3">Kênh áp dụng</th>
                    <th className="py-2.5 px-3">Trạng thái</th>
                    <th className="py-2.5 px-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {categories.map(cat => {
                    const isSelected = cat.id === selectedId;
                    return (
                      <tr
                        key={cat.id}
                        onClick={() => handleSelect(cat)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-primary/5 font-semibold' : 'hover:bg-stone-50'
                        }`}
                      >
                        <td className="py-3 px-3 text-center font-mono">
                          <span
                            className={`w-6 h-6 rounded-lg inline-flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-primary text-white' : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            0{cat.order}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="w-8 h-8 rounded-lg bg-stone-100 text-primary mx-auto flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <strong className="text-stone-900 block">{cat.nameVn}</strong>
                          <span className="text-[10px] text-stone-400">{cat.nameEn}</span>
                        </td>
                        <td className="py-3 px-3 text-stone-600 max-w-xs truncate">{cat.desc}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-stone-800">
                          {cat.itemCount} món
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                            {cat.channel}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              cat.active
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            {cat.active ? 'Đang bán' : 'Tạm ẩn'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleSelect(cat)}
                              className="p-1.5 text-stone-500 hover:text-primary rounded-lg hover:bg-stone-100"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                            <button
                              onClick={() => {
                                setCategories(
                                  categories.map(c => (c.id === cat.id ? { ...c, active: !c.active } : c))
                                );
                                onShowToast?.(`Đã chuyển trạng thái danh mục #${cat.id}`);
                              }}
                              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {cat.active ? 'visibility' : 'visibility_off'}
                              </span>
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

          {/* Right Editor Drawer (4 cols) */}
          <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h3 className="font-bold text-sm text-stone-900">Cấu hình Danh mục</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold text-xs">
                #{selectedCategory.id}
              </span>
            </div>

            {/* Teaser */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[24px]">{formData.icon}</span>
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">{formData.nameVn || 'Tên danh mục'}</p>
                <p className="text-[11px] text-stone-500">Đang có {selectedCategory.itemCount} món hoạt động</p>
              </div>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5">
              <div>
                <label className="block font-bold text-stone-700 uppercase text-[10px] mb-1">
                  Tên danh mục (Tiếng Việt) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameVn}
                  onChange={e => setFormData({ ...formData, nameVn: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase text-[10px] mb-1">
                  Tên hiển thị App (English)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 uppercase text-[10px] mb-1">
                    Thứ tự (Order)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value, 10) })}
                    className="w-full h-10 px-3 rounded-xl border border-stone-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 uppercase text-[10px] mb-1">
                    Icon biểu tượng
                  </label>
                  <select
                    value={formData.icon}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full h-10 px-2 rounded-xl border border-stone-300 text-xs bg-white"
                  >
                    <option value="coffee">coffee (Cà phê máy)</option>
                    <option value="emoji_food_beverage">emoji_food_beverage (Phin)</option>
                    <option value="local_bar">local_bar (Trà)</option>
                    <option value="icecream">icecream (Đá xay)</option>
                    <option value="bakery_dining">bakery_dining (Bánh ngọt)</option>
                    <option value="liquor">liquor (Đóng chai)</option>
                    <option value="lunch_dining">lunch_dining (Combo)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-1 border-t border-stone-100">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <span>Hiển thị trên POS Thu Ngân</span>
                  <input
                    type="checkbox"
                    checked={formData.showPos}
                    onChange={e => setFormData({ ...formData, showPos: e.target.checked })}
                    className="accent-primary w-4 h-4 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <span>Hiển thị trên App Khách Hàng</span>
                  <input
                    type="checkbox"
                    checked={formData.showApp}
                    onChange={e => setFormData({ ...formData, showApp: e.target.checked })}
                    className="accent-primary w-4 h-4 rounded"
                  />
                </label>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
