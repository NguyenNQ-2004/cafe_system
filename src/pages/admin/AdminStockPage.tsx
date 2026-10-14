import React, { useState } from 'react';
import { PageRoute, InventoryTxType } from '../../types';
import { useDb } from '../../data/DbContext';
import {
  INV_REF_LABEL,
  INV_TX_LABEL,
  INV_TX_SIGN,
  fmtDateTime,
  fmtMoney,
  fmtNumber,
  isLowStock,
  lastPurchasePrice,
  nowSql,
  poCode
} from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, GhostButton, Modal, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminStockPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminStockPage: React.FC<AdminStockPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [stockFilter, setStockFilter] = useState<'all' | 'low'>('all');
  const [txFilter, setTxFilter] = useState<'all' | InventoryTxType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<{ ingredient_id: number; transaction_type: 'ADJUSTMENT' | 'SPOILAGE'; quantity: number }>({
    ingredient_id: db.ingredients[0]?.id ?? 0,
    transaction_type: 'SPOILAGE',
    quantity: 0
  });

  const valueOf = (id: number, qty: number) => {
    const price = lastPurchasePrice(db, id);
    return price === null ? null : price * qty;
  };
  const totalValue = db.ingredients.reduce((s, i) => s + (valueOf(i.id, i.current_stock) ?? 0), 0);
  const stock = db.ingredients.filter(i => stockFilter === 'all' || isLowStock(i));
  const txs = [...db.inventory_transactions]
    .filter(t => txFilter === 'all' || t.transaction_type === txFilter)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : b.id - a.id));

  const refText = (type: string, id: number | null) => {
    if (!id) return INV_REF_LABEL[type as keyof typeof INV_REF_LABEL];
    if (type === 'ORDER') return db.orders.find(o => o.id === id)?.order_code ?? `Đơn #${id}`;
    if (type === 'PURCHASE_ORDER') return poCode(id);
    return `#${id}`;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const ing = db.ingredients.find(i => i.id === form.ingredient_id);
    if (!ing || form.quantity <= 0) {
      onShowToast?.('Số lượng phải lớn hơn 0 (chk_inventory_quantity).');
      return;
    }
    if (form.transaction_type === 'SPOILAGE' && form.quantity > ing.current_stock) {
      onShowToast?.('Số lượng hao hụt vượt quá tồn hiện tại.');
      return;
    }
    transact(tx => {
      tx.insert('inventory_transactions', {
        ingredient_id: ing.id,
        transaction_type: form.transaction_type,
        quantity: form.quantity,
        reference_type: 'ADJUSTMENT',
        reference_id: null,
        created_at: nowSql()
      });
      tx.update('ingredients', ing.id, { current_stock: ing.current_stock + INV_TX_SIGN[form.transaction_type] * form.quantity });
    });
    onShowToast?.(`Đã ghi ${INV_TX_LABEL[form.transaction_type].toLowerCase()} ${fmtNumber(form.quantity)} ${ing.unit} ${ing.name}.`);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout
      route="admin-stock"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="ingredients, inventory_transactions"
      title="Tồn kho & lịch sử xuất nhập"
      subtitle="Tồn kho hiện tại và mọi biến động: nhập mua hàng, xuất theo đơn bán, điều chỉnh, hao hụt."
      actions={
        <>
          <GhostButton icon="add_alert" onClick={() => onNavigate('admin-restock')}>
            Đề xuất nhập hàng
          </GhostButton>
          <PrimaryButton icon="tune" onClick={() => setIsModalOpen(true)}>
            Ghi phiếu điều chỉnh
          </PrimaryButton>
        </>
      }
      stats={
        <>
          <StatCard label="Giá trị tồn ước tính" value={fmtMoney(totalValue)} hint="Theo giá nhập gần nhất" />
          <StatCard label="Số nguyên liệu" value={db.ingredients.length} />
          <StatCard label="Dưới mức tối thiểu" value={db.ingredients.filter(isLowStock).length} tone="danger" />
          <StatCard label="Phiếu xuất nhập" value={db.inventory_transactions.length} />
        </>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Tồn kho hiện tại</h2>
            <select value={stockFilter} onChange={e => setStockFilter(e.target.value as typeof stockFilter)} className="h-8 px-2 rounded-lg border border-stone-200 text-xs">
              <option value="all">Tất cả</option>
              <option value="low">Dưới mức tối thiểu</option>
            </select>
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Nguyên liệu</th>
                  <th className="py-2.5 px-3 text-right">Tồn</th>
                  <th className="py-2.5 px-3 text-right">Tối thiểu</th>
                  <th className="py-2.5 px-3 text-right">Giá trị</th>
                  <th className="py-2.5 px-3 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {stock.map(i => {
                  const low = isLowStock(i);
                  const v = valueOf(i.id, i.current_stock);
                  return (
                    <tr key={i.id} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3">
                        <strong className="text-stone-900 block">{i.name}</strong>
                        <span className="text-[10px] text-stone-400">{db.suppliers.find(s => s.id === i.supplier_id)?.name ?? 'Chưa gán NCC'}</span>
                      </td>
                      <td className={`py-2.5 px-3 text-right font-mono font-bold ${low ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {fmtNumber(i.current_stock)} {i.unit}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-stone-500">{fmtNumber(i.min_stock_level)}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{v === null ? '—' : fmtMoney(v)}</td>
                      <td className="py-2.5 px-3 text-center">
                        <Badge className={low ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}>{low ? 'Cần nhập' : 'An toàn'}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Lịch sử xuất nhập</h2>
            <select value={txFilter} onChange={e => setTxFilter(e.target.value as typeof txFilter)} className="h-8 px-2 rounded-lg border border-stone-200 text-xs">
              <option value="all">Tất cả loại</option>
              {(Object.keys(INV_TX_LABEL) as InventoryTxType[]).map(t => (
                <option key={t} value={t}>{INV_TX_LABEL[t]}</option>
              ))}
            </select>
          </div>
          <div className="divide-y divide-stone-100 text-xs max-h-[520px] overflow-y-auto">
            {txs.map(t => {
              const ing = db.ingredients.find(i => i.id === t.ingredient_id);
              const sign = INV_TX_SIGN[t.transaction_type];
              return (
                <div key={t.id} className="p-3 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Badge className={sign > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}>{INV_TX_LABEL[t.transaction_type]}</Badge>
                      <span className="text-[10px] text-stone-400 font-mono">#{t.id}</span>
                    </div>
                    <p className="font-semibold text-stone-900 mt-1">{ing?.name}</p>
                    <p className="text-[10px] text-stone-400">
                      {fmtDateTime(t.created_at)} • {refText(t.reference_type, t.reference_id)}
                    </p>
                  </div>
                  <span className={`font-mono font-bold ${sign > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {sign > 0 ? '+' : '-'}
                    {fmtNumber(t.quantity)} {ing?.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal title="Ghi phiếu điều chỉnh tồn kho" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleCreate} className="space-y-3">
            <Field label="Nguyên liệu" column="ingredient_id">
              <select value={form.ingredient_id} onChange={e => setForm({ ...form, ingredient_id: Number(e.target.value) })} className={inputCls}>
                {db.ingredients.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name} (tồn {fmtNumber(i.current_stock)} {i.unit})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Loại phiếu" column="transaction_type">
              <select value={form.transaction_type} onChange={e => setForm({ ...form, transaction_type: e.target.value as 'ADJUSTMENT' | 'SPOILAGE' })} className={inputCls}>
                <option value="ADJUSTMENT">ADJUSTMENT - Điều chỉnh tăng (kiểm kê thừa)</option>
                <option value="SPOILAGE">SPOILAGE - Hao hụt / hủy hàng</option>
              </select>
            </Field>
            <Field label="Số lượng (luôn dương)" column="quantity">
              <input type="number" min={0} step="0.001" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} className={inputCls} />
            </Field>
            <FormActions onCancel={() => setIsModalOpen(false)} submitLabel="Ghi phiếu" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
