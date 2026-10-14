import React, { useState } from 'react';
import { PageRoute, Ingredient } from '../../types';
import { useDb } from '../../data/DbContext';
import { fmtMoney, fmtNumber, isLowStock, lastPurchasePrice } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, Modal, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminIngredientsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

type IngredientForm = Omit<Ingredient, 'id'>;
const UNITS = ['gram', 'ml', 'piece', 'kg', 'lít', 'hộp', 'chai', 'gói'];

export const AdminIngredientsPage: React.FC<AdminIngredientsPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<{ id: number | null; form: IngredientForm } | null>(null);

  const supplierName = (id: number | null) => (id ? db.suppliers.find(s => s.id === id)?.name ?? '—' : 'Chưa gán');
  const usedIn = (id: number) => db.product_ingredients.filter(b => b.ingredient_id === id);

  const rows = db.ingredients.filter(i => i.name.toLowerCase().includes(search.trim().toLowerCase()));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const f = editing.form;
    if (f.current_stock < 0 || f.min_stock_level < 0) {
      onShowToast?.('Tồn kho và mức tối thiểu không được âm (chk_ingredient_stock).');
      return;
    }
    const row = { ...f, name: f.name.trim(), unit: f.unit.trim() };
    if (editing.id) {
      transact(tx => tx.update('ingredients', editing.id!, row));
      onShowToast?.(`Đã cập nhật nguyên liệu "${row.name}".`);
    } else {
      transact(tx => tx.insert('ingredients', row));
      onShowToast?.(`Đã thêm nguyên liệu "${row.name}".`);
    }
    setEditing(null);
  };

  const handleDelete = (i: Ingredient) => {
    const inPo = db.purchase_order_items.some(p => p.ingredient_id === i.id);
    const inTx = db.inventory_transactions.some(t => t.ingredient_id === i.id);
    if (inPo || inTx) {
      onShowToast?.('Không thể xóa: nguyên liệu đã có phiếu nhập hoặc lịch sử xuất nhập kho.');
      return;
    }
    if (!confirm(`Xóa nguyên liệu "${i.name}"? Định mức liên quan cũng bị xóa (ON DELETE CASCADE).`)) return;
    transact(tx => {
      tx.db().product_ingredients.filter(b => b.ingredient_id === i.id).forEach(b => tx.remove('product_ingredients', b.id));
      tx.remove('ingredients', i.id);
    });
    onShowToast?.('Đã xóa nguyên liệu.');
  };

  const setForm = (patch: Partial<IngredientForm>) => setEditing(prev => (prev ? { ...prev, form: { ...prev.form, ...patch } } : prev));

  return (
    <AdminLayout
      route="admin-ingredients"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="ingredients"
      title="Quản lý nguyên vật liệu"
      subtitle="Danh mục nguyên liệu, đơn vị tính, nhà cung cấp và ngưỡng tồn kho tối thiểu."
      actions={
        <PrimaryButton
          icon="add_circle"
          onClick={() =>
            setEditing({ id: null, form: { supplier_id: db.suppliers[0]?.id ?? null, name: '', unit: 'gram', current_stock: 0, min_stock_level: 0 } })
          }
        >
          Thêm nguyên liệu
        </PrimaryButton>
      }
      stats={
        <>
          <StatCard label="Tổng nguyên liệu" value={db.ingredients.length} />
          <StatCard label="Nhà cung cấp" value={db.suppliers.length} />
          <StatCard label="Dưới mức tối thiểu" value={db.ingredients.filter(isLowStock).length} tone="danger" />
          <StatCard label="Chưa dùng trong công thức" value={db.ingredients.filter(i => usedIn(i.id).length === 0).length} />
        </>
      }
    >
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm nguyên liệu..." className="w-full h-10 pl-9 pr-4 rounded-xl bg-stone-50 border border-stone-200 text-xs" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-3">ID</th>
                <th className="py-2.5 px-3">Tên nguyên liệu</th>
                <th className="py-2.5 px-3">ĐVT</th>
                <th className="py-2.5 px-3">Nhà cung cấp</th>
                <th className="py-2.5 px-3 text-right">Tồn hiện tại</th>
                <th className="py-2.5 px-3 text-right">Tối thiểu</th>
                <th className="py-2.5 px-3 text-right">Giá nhập gần nhất</th>
                <th className="py-2.5 px-3 text-center">Dùng trong</th>
                <th className="py-2.5 px-3 text-center">Trạng thái</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rows.map(i => {
                const price = lastPurchasePrice(db, i.id);
                const low = isLowStock(i);
                return (
                  <tr key={i.id} className="hover:bg-stone-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-primary">#{i.id}</td>
                    <td className="py-2.5 px-3 font-bold text-stone-900">{i.name}</td>
                    <td className="py-2.5 px-3 text-stone-600">{i.unit}</td>
                    <td className="py-2.5 px-3">{supplierName(i.supplier_id)}</td>
                    <td className={`py-2.5 px-3 text-right font-mono font-bold ${low ? 'text-rose-600' : 'text-stone-900'}`}>{fmtNumber(i.current_stock)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-stone-500">{fmtNumber(i.min_stock_level)}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{price === null ? '—' : `${fmtMoney(price)}/${i.unit}`}</td>
                    <td className="py-2.5 px-3 text-center">{usedIn(i.id).length} món</td>
                    <td className="py-2.5 px-3 text-center">
                      <Badge className={low ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}>{low ? 'Cần nhập thêm' : 'Đủ hàng'}</Badge>
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() =>
                          setEditing({
                            id: i.id,
                            form: { supplier_id: i.supplier_id, name: i.name, unit: i.unit, current_stock: i.current_stock, min_stock_level: i.min_stock_level }
                          })
                        }
                        className="p-1 hover:text-primary rounded text-stone-500"
                        title="Sửa"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(i)} className="p-1 hover:text-rose-600 rounded text-stone-400" title="Xóa">
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <Modal title={editing.id ? `Sửa nguyên liệu #${editing.id}` : 'Thêm nguyên liệu'} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-3">
            <Field label="Tên nguyên liệu *" column="name">
              <input required maxLength={150} value={editing.form.name} onChange={e => setForm({ name: e.target.value })} className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Đơn vị tính *" column="unit">
                <input required list="unit-options" maxLength={20} value={editing.form.unit} onChange={e => setForm({ unit: e.target.value })} className={inputCls} />
                <datalist id="unit-options">
                  {UNITS.map(u => (
                    <option key={u} value={u} />
                  ))}
                </datalist>
              </Field>
              <Field label="Nhà cung cấp" column="supplier_id">
                <select
                  value={editing.form.supplier_id ?? ''}
                  onChange={e => setForm({ supplier_id: e.target.value ? Number(e.target.value) : null })}
                  className={inputCls}
                >
                  <option value="">-- Chưa gán --</option>
                  {db.suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tồn hiện tại" column="current_stock">
                <input type="number" min={0} step="0.001" value={editing.form.current_stock} onChange={e => setForm({ current_stock: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Mức tối thiểu" column="min_stock_level">
                <input type="number" min={0} step="0.001" value={editing.form.min_stock_level} onChange={e => setForm({ min_stock_level: Number(e.target.value) })} className={inputCls} />
              </Field>
            </div>
            {editing.id && (
              <p className="text-[11px] text-stone-500">
                Lưu ý: sửa tồn kho trực tiếp không tạo lịch sử. Nên dùng màn hình "Tồn kho & Xuất nhập" để ghi phiếu điều chỉnh.
              </p>
            )}
            <FormActions onCancel={() => setEditing(null)} submitLabel={editing.id ? 'Lưu thay đổi' : 'Thêm nguyên liệu'} />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
