import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminRecipesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface RecipeItem {
  id: string;
  productName: string;
  category: string;
  status: 'ACTIVE' | 'INACTIVE';
  price: number;
  cogsCost: number;
  ingredients: {
    name: string;
    unit: string;
    quantity: number;
    cost: number;
  }[];
  steps: string;
}

export const AdminRecipesPage: React.FC<AdminRecipesPageProps> = ({ onNavigate, onShowToast }) => {
  const [recipes, setRecipes] = useState<RecipeItem[]>([
    {
      id: 'REC-01',
      productName: 'Cà Phê Muối Aura Đặc Biệt',
      category: 'Cà phê truyền thống',
      status: 'ACTIVE',
      price: 45000,
      cogsCost: 11850,
      ingredients: [
        { name: 'Cà phê hạt Robusta Pleiku', unit: 'gram', quantity: 20, cost: 2800 },
        { name: 'Sữa đặc có đường Ông Thọ đỏ', unit: 'ml', quantity: 30, cost: 2200 },
        { name: 'Kem béo mặn phô mai Himalaya', unit: 'ml', quantity: 40, cost: 4800 },
        { name: 'Đá bi viên tinh khiết', unit: 'gram', quantity: 150, cost: 450 },
        { name: 'Ly giấy + Nắp mang đi', unit: 'bộ', quantity: 1, cost: 1600 }
      ],
      steps: 'Ủ phin nhôm hạt Robusta với 40ml nước 93°C trong 4 phút. Đánh bông kem muối với máy đánh bọt trong 25 giây.'
    },
    {
      id: 'REC-02',
      productName: 'Caramel Macchiato Đặc Sản',
      category: 'Cà phê máy',
      status: 'ACTIVE',
      price: 55000,
      cogsCost: 14500,
      ingredients: [
        { name: 'Hạt Arabica Cầu Đất (Double Shot)', unit: 'gram', quantity: 18, cost: 5040 },
        { name: 'Sữa tươi thanh trùng Barista Grade', unit: 'ml', quantity: 180, cost: 6300 },
        { name: 'Siro Caramel Torani', unit: 'ml', quantity: 20, cost: 2160 },
        { name: 'Sốt Caramel vân trang trí', unit: 'ml', quantity: 10, cost: 1000 }
      ],
      steps: 'Chiết xuất double espresso bằng máy Ý. Đánh sữa nóng 65°C bọt micro-foam. Rót sữa trước, rót cà phê xuyên bọt và rưới sốt caramel.'
    },
    {
      id: 'REC-03',
      productName: 'Trà Đào Cam Sả Tươi',
      category: 'Trà trái cây',
      status: 'ACTIVE',
      price: 45000,
      cogsCost: 12200,
      ingredients: [
        { name: 'Cốt trà đen Ceylon hảo hạng', unit: 'ml', quantity: 120, cost: 3200 },
        { name: 'Siro đào Hy Lạp', unit: 'ml', quantity: 30, cost: 3000 },
        { name: 'Đào miếng giòn ngâm', unit: 'miếng', quantity: 2, cost: 3500 },
        { name: 'Cam vàng tươi cắt lát', unit: 'lát', quantity: 1, cost: 1500 },
        { name: 'Cây sả tươi đập dập', unit: 'cây', quantity: 1, cost: 1000 }
      ],
      steps: 'Dằm nhẹ nhánh sả trong shaker, cho cốt trà, siro đào và đá vào lắc đều 10 lần. Trang trí đào miếng và lát cam vàng.'
    },
    {
      id: 'REC-04',
      productName: 'Cold Brew Đóng Chai 16h',
      category: 'Đóng chai',
      status: 'ACTIVE',
      price: 68000,
      cogsCost: 19500,
      ingredients: [
        { name: 'Hạt Arabica Bourbon Cầu Đất', unit: 'gram', quantity: 35, cost: 9800 },
        { name: 'Nước lọc tinh khiết RO', unit: 'ml', quantity: 300, cost: 500 },
        { name: 'Chai thủy tinh nắp kín nẹp chì 300ml', unit: 'chai', quantity: 1, cost: 8500 },
        { name: 'Tem nhãn Aura Reserve', unit: 'cái', quantity: 1, cost: 700 }
      ],
      steps: 'Ngâm lạnh ủ chậm túi lọc trong tủ mát 4°C liên tục 16 tiếng. Lọc qua giấy lọc Hario và đóng chai thủy tinh niêm phong.'
    }
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Cà phê máy',
    price: 45000,
    steps: ''
  });

  const handleOpenCreate = () => {
    setIsEdit(false);
    setFormData({
      productName: '',
      category: 'Cà phê máy',
      price: 45000,
      steps: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rec: RecipeItem) => {
    setIsEdit(true);
    setSelectedRecipe(rec);
    setFormData({
      productName: rec.productName,
      category: rec.category,
      price: rec.price,
      steps: rec.steps
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setRecipes(prev =>
      prev.map(r => r.id === id ? { ...r, status: r.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : r)
    );
    onShowToast?.('Đã cập nhật trạng thái hoạt động của công thức!');
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && selectedRecipe) {
      setRecipes(prev =>
        prev.map(r => r.id === selectedRecipe.id ? { ...r, ...formData } : r)
      );
      onShowToast?.(`Đã cập nhật công thức #${selectedRecipe.id} thành công!`);
    } else {
      const newRec: RecipeItem = {
        id: `REC-${recipes.length + 1}`,
        productName: formData.productName || 'Món mới',
        category: formData.category,
        status: 'ACTIVE',
        price: Number(formData.price),
        cogsCost: 12000,
        ingredients: [
          { name: 'Cà phê hạt Robusta', unit: 'gram', quantity: 20, cost: 3000 },
          { name: 'Sữa đặc / Sữa tươi', unit: 'ml', quantity: 50, cost: 4000 }
        ],
        steps: formData.steps || 'Pha chế theo quy trình chuẩn.'
      };
      setRecipes([newRec, ...recipes]);
      onShowToast?.('Đã tạo mới công thức định mức (Recipe & BOM) thành công!');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-recipes" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span className="text-primary font-bold">Screen 17</span>
                <span>•</span>
                <span>Quản Trị Thực Đơn & Pha Chế</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Quản lý Công thức & Định mức (Recipe Management Screen)
              </h1>
              <p className="text-xs text-stone-500">
                Định nghĩa thành phần nguyên liệu (BOM), định lượng tiêu hao, tính toán giá vốn COGS và tỷ suất lợi nhuận từng món.
              </p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-xs shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Thêm công thức mới
            </button>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recipes.map(rec => {
            const margin = Math.round(((rec.price - rec.cogsCost) / rec.price) * 100);
            return (
              <div
                key={rec.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-5 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-primary">{rec.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rec.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                        }`}>
                          {rec.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900 mt-1">{rec.productName}</h3>
                      <span className="text-xs text-stone-400">{rec.category}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Biên Lợi Nhuận</span>
                      <strong className="text-lg font-mono text-emerald-700 font-black">{margin}%</strong>
                    </div>
                  </div>

                  {/* Financials pill */}
                  <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 bg-stone-50 rounded-xl text-xs">
                    <div>
                      <span className="text-stone-500 block text-[11px]">Giá bán lẻ:</span>
                      <strong className="text-stone-900 font-mono">{rec.price.toLocaleString('vi-VN')}₫</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[11px]">Giá vốn định mức (COGS):</span>
                      <strong className="text-primary font-mono">{rec.cogsCost.toLocaleString('vi-VN')}₫</strong>
                    </div>
                  </div>

                  {/* Ingredient BOM List */}
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Thành phần nguyên liệu (BOM):
                    </span>
                    <div className="divide-y divide-stone-100 text-xs">
                      {rec.ingredients.map((ing, i) => (
                        <div key={i} className="py-1 flex justify-between items-center text-stone-700">
                          <span>{ing.name}</span>
                          <span className="font-mono text-stone-500 font-medium">
                            {ing.quantity} {ing.unit} <span className="text-stone-400">({ing.cost.toLocaleString('vi-VN')}₫)</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-3 p-2.5 bg-amber-50/60 rounded-xl text-xs text-amber-950 border border-amber-100">
                    <strong className="block text-[11px] text-amber-800 font-bold mb-0.5">Quy trình pha chế chuẩn:</strong>
                    <p className="line-clamp-2">{rec.steps}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleStatus(rec.id)}
                    className={`font-semibold hover:underline ${
                      rec.status === 'ACTIVE' ? 'text-stone-500' : 'text-emerald-700'
                    }`}
                  >
                    {rec.status === 'ACTIVE' ? 'Tạm ngưng công thức' : 'Kích hoạt lại'}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(rec)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Chỉnh sửa định mức
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Create/Edit Recipe */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h3 className="font-bold text-base text-stone-900">
                  {isEdit ? `Chỉnh sửa công thức #${selectedRecipe?.id}` : 'Thêm công thức định mức mới'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveRecipe} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Tên món đồ uống / bánh</label>
                  <input
                    type="text"
                    required
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="VD: Trà Ô Long Mãng Cầu"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Nhóm danh mục</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                    >
                      <option value="Cà phê máy">Cà phê máy</option>
                      <option value="Cà phê truyền thống">Cà phê truyền thống</option>
                      <option value="Trà trái cây">Trà trái cây</option>
                      <option value="Đá xay & Matcha">Đá xay & Matcha</option>
                      <option value="Bánh ngọt">Bánh ngọt</option>
                      <option value="Đóng chai">Đóng chai</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Giá bán dự kiến (VNĐ)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Hướng dẫn pha chế chuẩn Barista</label>
                  <textarea
                    rows={3}
                    value={formData.steps}
                    onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                    placeholder="Các bước ủ, chiết xuất, đánh bọt sữa, căn chỉnh thời gian..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-amber-600 text-white font-bold"
                  >
                    Lưu công thức
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
