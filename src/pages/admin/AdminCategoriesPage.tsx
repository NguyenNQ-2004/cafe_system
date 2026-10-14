import React, { useState } from 'react';
import { PageRoute, Category, ActiveStatus } from '../../types';
import { useDb } from '../../data/DbContext';
import { AdminLayout, Badge, Field, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminCategoriesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

type CategoryForm = Omit<Category, 'id'>;
const EMPTY: CategoryForm = { name: '', icon: 'local_cafe', description: '', image_url: '', status: 'ACTIVE' };
const ICONS = ['coffee_maker', 'local_cafe', 'emoji_food_beverage', 'icecream', 'bakery_dining', 'liquor', 'local_bar', 'lunch_dining'];

export const AdminCategoriesPage: React.FC<AdminCategoriesPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [selectedId, setSelectedId] = useState<number | null>(db.categories[0]?.id ?? null);
  const [form, setForm] = useState<CategoryForm>(db.categories[0] ?? EMPTY);

  const productCount = (id: number) => db.products.filter(p => p.category_id === id).length;

  const select = (c: Category | null) => {
    setSelectedId(c?.id ?? null);
    setForm(c ? { name: c.name, icon: c.icon, description: c.description, image_url: c.image_url, status: c.status } : EMPTY);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (db.categories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== selectedId)) {
      onShowToast?.('Tên danh mục đã tồn tại (categories.name là UNIQUE).');
      return;
    }
    const row: CategoryForm = {
      name,
      icon: form.icon || null,
      description: form.description?.trim() || null,
      image_url: form.image_url?.trim() || null,
      status: form.status
    };
    if (selectedId) {
      transact(tx => tx.update('categories', selectedId, row));
      onShowToast?.(`Đã cập nhật danh mục "${name}".`);
    } else {
      const created = transact(tx => tx.insert('categories', row));
      setSelectedId(created.id);
      onShowToast?.(`Đã tạo danh mục "${name}".`);
    }
  };

  const handleDelete = (c: Category) => {
    if (productCount(c.id) > 0) {
      onShowToast?.('Không thể xóa: danh mục đang có sản phẩm (ràng buộc fk_product_category).');
      return;
    }
    if (!confirm(`Xóa danh mục "${c.name}"?`)) return;
    transact(tx => tx.remove('categories', c.id));
    select(null);
    onShowToast?.('Đã xóa danh mục.');
  };

  const toggleStatus = (c: Category) => {
    const status: ActiveStatus = c.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    transact(tx => tx.update('categories', c.id, { status }));
    if (c.id === selectedId) setForm(f => ({ ...f, status }));
  };

  return (
    <AdminLayout
      route="admin-categories"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="categories"
      title="Quản lý danh mục thực đơn"
      subtitle="Danh mục hiển thị trên menu khách hàng, POS và KDS."
      actions={
        <PrimaryButton icon="add" onClick={() => select(null)}>
          Thêm danh mục
        </PrimaryButton>
      }
      stats={
        <>
          <StatCard label="Tổng danh mục" value={db.categories.length} />
          <StatCard label="Đang hoạt động" value={db.categories.filter(c => c.status === 'ACTIVE').length} tone="success" />
          <StatCard label="Tạm ẩn" value={db.categories.filter(c => c.status === 'INACTIVE').length} />
          <StatCard label="Tổng sản phẩm" value={db.products.length} />
        </>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Ảnh / Icon</th>
                  <th className="py-2.5 px-3">Tên danh mục</th>
                  <th className="py-2.5 px-3">Mô tả</th>
                  <th className="py-2.5 px-3 text-right">Số món</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {db.categories.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => select(c)}
                    className={`cursor-pointer transition-colors ${c.id === selectedId ? 'bg-primary/5 font-semibold' : 'hover:bg-stone-50'}`}
                  >
                    <td className="py-3 px-3 font-mono text-stone-500">#{c.id}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        {c.image_url && <img src={c.image_url} alt={c.name} className="w-9 h-9 rounded-lg object-cover" />}
                        <span className="w-8 h-8 rounded-lg bg-stone-100 text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">{c.icon ?? 'category'}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-bold text-stone-900">{c.name}</td>
                    <td className="py-3 px-3 text-stone-600 max-w-xs truncate">{c.description}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold">{productCount(c.id)}</td>
                    <td className="py-3 px-3">
                      <Badge className={c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}>
                        {c.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm ẩn'}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => toggleStatus(c)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100" title="Bật / tắt">
                          <span className="material-symbols-outlined text-[16px]">{c.status === 'ACTIVE' ? 'visibility' : 'visibility_off'}</span>
                        </button>
                        <button onClick={() => handleDelete(c)} className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100" title="Xóa">
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={handleSave} className="xl:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3.5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-bold text-sm text-stone-900">{selectedId ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h3>
            {selectedId && <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">#{selectedId}</span>}
          </div>
          <Field label="Tên danh mục *" column="name">
            <input required maxLength={100} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Icon (Material Symbols)" column="icon">
            <div className="flex gap-2">
              <select value={form.icon ?? ''} onChange={e => setForm({ ...form, icon: e.target.value })} className={inputCls}>
                {[...new Set([form.icon ?? '', ...ICONS])].filter(Boolean).map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">{form.icon}</span>
              </span>
            </div>
          </Field>
          <Field label="Mô tả" column="description">
            <textarea rows={3} value={form.description ?? ''} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Ảnh đại diện (URL)" column="image_url">
            <input maxLength={500} value={form.image_url ?? ''} onChange={e => setForm({ ...form, image_url: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Trạng thái" column="status">
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as ActiveStatus })} className={inputCls}>
              <option value="ACTIVE">ACTIVE - Hoạt động</option>
              <option value="INACTIVE">INACTIVE - Tạm ẩn</option>
            </select>
          </Field>
          <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">check</span>
            {selectedId ? 'Lưu thay đổi' : 'Tạo danh mục'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
