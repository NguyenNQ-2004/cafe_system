import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { useDb } from '../../data/DbContext';
import { fmtMoney, fmtNumber, lastPurchasePrice, productCost } from '../../data/dbUtils';
import { AdminLayout, Badge, FormActions, Modal, StatCard, inputCls } from './AdminUi';

interface AdminRecipesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminRecipesPage: React.FC<AdminRecipesPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [lines, setLines] = useState<{ ingredient_id: number; quantity_required: number }[]>([]);
  const [filter, setFilter] = useState<'all' | 'with' | 'without'>('all');

  const bomOf = (productId: number) => db.product_ingredients.filter(b => b.product_id === productId);
  const ingredient = (id: number) => db.ingredients.find(i => i.id === id);

  const products = db.products.filter(p => {
    const has = bomOf(p.id).length > 0;
    return filter === 'all' || (filter === 'with' ? has : !has);
  });

  const openEditor = (productId: number) => {
    setEditingProductId(productId);
    setLines(bomOf(productId).map(b => ({ ingredient_id: b.ingredient_id, quantity_required: b.quantity_required })));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;
    const valid = lines.filter(l => l.ingredient_id && l.quantity_required > 0);
    const ids = valid.map(l => l.ingredient_id);
    if (new Set(ids).size !== ids.length) {
      onShowToast?.('Mỗi nguyên liệu chỉ xuất hiện một lần trong công thức (uq_product_ingredient).');
      return;
    }
    transact(tx => {
      tx.db()
        .product_ingredients.filter(b => b.product_id === editingProductId)
        .forEach(b => tx.remove('product_ingredients', b.id));
      valid.forEach(l => tx.insert('product_ingredients', { product_id: editingProductId, ...l }));
    });
    onShowToast?.('Đã lưu công thức định mức.');
    setEditingProductId(null);
  };

  const editingProduct = db.products.find(p => p.id === editingProductId);

  return (
    <AdminLayout
      route="admin-recipes"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="product_ingredients"
      title="Công thức & định mức nguyên liệu (BOM)"
      subtitle="Lượng nguyên liệu cần cho 1 phần sản phẩm. Khi bán, kho tự trừ theo định mức này (inventory_transactions OUT_ORDER)."
      stats={
        <>
          <StatCard label="Tổng sản phẩm" value={db.products.length} />
          <StatCard label="Đã có công thức" value={db.products.filter(p => bomOf(p.id).length > 0).length} tone="success" />
          <StatCard label="Chưa có công thức" value={db.products.filter(p => bomOf(p.id).length === 0).length} tone="danger" />
          <StatCard label="Dòng định mức" value={db.product_ingredients.length} />
        </>
      }
      actions={
        <select value={filter} onChange={e => setFilter(e.target.value as typeof filter)} className="h-9 px-3 rounded-xl border border-stone-200 bg-stone-50">
          <option value="all">Tất cả sản phẩm</option>
          <option value="with">Đã có công thức</option>
          <option value="without">Chưa có công thức</option>
        </select>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {products.map(p => {
          const bom = bomOf(p.id);
          const cost = productCost(db, p.id);
          const margin = cost !== null && p.base_price > 0 ? Math.round(((p.base_price - cost) / p.base_price) * 100) : null;
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image_url ?? ''} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-stone-100" />
                    <div>
                      <span className="text-xs font-mono font-bold text-primary">#{p.id}</span>
                      <h3 className="text-base font-bold text-stone-900">{p.name}</h3>
                      <span className="text-xs text-stone-400">{db.categories.find(c => c.id === p.category_id)?.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Lợi nhuận gộp</span>
                    <strong className="text-lg font-mono text-emerald-700 font-black">{margin === null ? '—' : `${margin}%`}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 bg-stone-50 rounded-xl text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Giá bán (base_price):</span>
                    <strong className="text-stone-900 font-mono">{fmtMoney(p.base_price)}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Giá vốn theo định mức:</span>
                    <strong className="text-primary font-mono">{cost === null ? 'Chưa đủ dữ liệu' : fmtMoney(cost)}</strong>
                  </div>
                </div>

                <div className="mt-3 divide-y divide-stone-100 text-xs">
                  {bom.length === 0 && <p className="py-2 text-stone-400">Chưa khai báo nguyên liệu.</p>}
                  {bom.map(b => {
                    const ing = ingredient(b.ingredient_id);
                    const price = lastPurchasePrice(db, b.ingredient_id);
                    return (
                      <div key={b.id} className="py-1.5 flex justify-between items-center text-stone-700">
                        <span>{ing?.name}</span>
                        <span className="font-mono text-stone-500">
                          {fmtNumber(b.quantity_required)} {ing?.unit}
                          <span className="text-stone-400"> ({price === null ? 'chưa có giá' : fmtMoney(price * b.quantity_required)})</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <Badge className={p.is_available ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'}>
                  {p.is_available ? 'Đang bán' : 'Tạm ngưng'}
                </Badge>
                <button onClick={() => openEditor(p.id)} className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Sửa định mức
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingProduct && (
        <Modal title={`Định mức: ${editingProduct.name}`} onClose={() => setEditingProductId(null)} wide>
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div className="grid grid-cols-12 gap-2 font-bold text-stone-500 text-[10px] uppercase">
              <span className="col-span-7">Nguyên liệu (ingredient_id)</span>
              <span className="col-span-4">Định lượng (quantity_required)</span>
            </div>
            {lines.map((l, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <select
                  value={l.ingredient_id}
                  onChange={e => setLines(lines.map((x, idx) => (idx === i ? { ...x, ingredient_id: Number(e.target.value) } : x)))}
                  className={`${inputCls} col-span-7`}
                >
                  {db.ingredients.map(ing => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.unit})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  step="0.001"
                  value={l.quantity_required}
                  onChange={e => setLines(lines.map((x, idx) => (idx === i ? { ...x, quantity_required: Number(e.target.value) } : x)))}
                  className={`${inputCls} col-span-4`}
                />
                <button type="button" onClick={() => setLines(lines.filter((_, idx) => idx !== i))} className="col-span-1 text-stone-400 hover:text-rose-600">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setLines([...lines, { ingredient_id: db.ingredients[0]?.id ?? 0, quantity_required: 1 }])}
              className="text-primary font-bold hover:underline"
            >
              + Thêm nguyên liệu
            </button>
            <FormActions onCancel={() => setEditingProductId(null)} submitLabel="Lưu công thức" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
