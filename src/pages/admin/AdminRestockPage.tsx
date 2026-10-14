import React, { useState } from 'react';
import { PageRoute, Ingredient } from '../../types';
import { useDb } from '../../data/DbContext';
import { PO_STATUS_LABEL, PO_STATUS_STYLE, fmtDateTime, fmtMoney, fmtNumber, isLowStock, lastPurchasePrice, nowSql, poCode, userName } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, GhostButton, Modal, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminRestockPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

// Đề xuất nhập hàng = purchase_orders ở trạng thái DRAFT; duyệt -> ORDERED, từ chối -> CANCELLED
export const AdminRestockPage: React.FC<AdminRestockPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, session, transact } = useDb();
  const [modal, setModal] = useState<{ ingredient_id: number; quantity: number; unit_price: number; note: string } | null>(null);

  const lowStock = db.ingredients.filter(isLowStock);
  const drafts = db.purchase_orders.filter(p => p.status === 'DRAFT').sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const itemsOf = (poId: number) => db.purchase_order_items.filter(i => i.po_id === poId);

  const openFor = (i: Ingredient) =>
    setModal({
      ingredient_id: i.id,
      quantity: Math.max(i.min_stock_level * 2 - i.current_stock, i.min_stock_level),
      unit_price: lastPurchasePrice(db, i.id) ?? 0,
      note: isLowStock(i) ? `Tồn ${fmtNumber(i.current_stock)}/${fmtNumber(i.min_stock_level)} ${i.unit} - dưới mức tối thiểu` : ''
    });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal) return;
    const ing = db.ingredients.find(i => i.id === modal.ingredient_id);
    if (!ing?.supplier_id) {
      onShowToast?.('Nguyên liệu chưa gán nhà cung cấp, hãy gán trước khi đề xuất.');
      return;
    }
    if (modal.quantity <= 0 || modal.unit_price < 0) {
      onShowToast?.('Số lượng phải > 0 và đơn giá không âm.');
      return;
    }
    const po = transact(tx => {
      const created = tx.insert('purchase_orders', {
        supplier_id: ing.supplier_id!,
        creator_id: session.adminId,
        total_cost: modal.quantity * modal.unit_price,
        status: 'DRAFT',
        note: modal.note.trim() || null,
        created_at: nowSql()
      });
      tx.insert('purchase_order_items', { po_id: created.id, ingredient_id: ing.id, quantity: modal.quantity, unit_price: modal.unit_price });
      return created;
    });
    onShowToast?.(`Đã tạo đề xuất ${poCode(po.id)} cho ${ing.name}.`);
    setModal(null);
  };

  const setStatus = (poId: number, status: 'ORDERED' | 'CANCELLED') => {
    const reason = status === 'CANCELLED' ? prompt('Lý do từ chối đề xuất:') : null;
    if (status === 'CANCELLED' && reason === null) return;
    const po = db.purchase_orders.find(p => p.id === poId);
    transact(tx =>
      tx.update('purchase_orders', poId, {
        status,
        note: status === 'CANCELLED' && reason ? [po?.note, `Từ chối: ${reason}`].filter(Boolean).join(' | ') : po?.note ?? null
      })
    );
    onShowToast?.(status === 'ORDERED' ? `Đã duyệt ${poCode(poId)} và đặt hàng với nhà cung cấp.` : `Đã từ chối ${poCode(poId)}.`);
  };

  return (
    <AdminLayout
      route="admin-restock"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="purchase_orders (DRAFT)"
      title="Đề xuất nhập hàng"
      subtitle="Nguyên liệu dưới mức tối thiểu và các phiếu nhập đang ở dạng nháp chờ duyệt."
      actions={
        <>
          <GhostButton icon="receipt_long" onClick={() => onNavigate('admin-purchases')}>
            Phiếu nhập hàng
          </GhostButton>
          <PrimaryButton icon="add_alert" onClick={() => db.ingredients[0] && openFor(db.ingredients[0])}>
            Tạo đề xuất
          </PrimaryButton>
        </>
      }
      stats={
        <>
          <StatCard label="Dưới mức tối thiểu" value={lowStock.length} tone="danger" />
          <StatCard label="Đề xuất chờ duyệt" value={drafts.length} tone="primary" />
          <StatCard label="Đã đặt hàng" value={db.purchase_orders.filter(p => p.status === 'ORDERED').length} />
          <StatCard label="Giá trị chờ duyệt" value={fmtMoney(drafts.reduce((s, p) => s + p.total_cost, 0))} />
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <h2 className="font-bold text-sm text-stone-800">Nguyên liệu cần nhập (current_stock ≤ min_stock_level)</h2>
        </div>
        <div className="divide-y divide-stone-100 text-xs">
          {lowStock.length === 0 && <p className="p-4 text-stone-400">Tất cả nguyên liệu đang trên mức tối thiểu.</p>}
          {lowStock.map(i => (
            <div key={i.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <strong className="text-stone-900">{i.name}</strong>
                <p className="text-stone-500">
                  Tồn <span className="text-rose-600 font-bold">{fmtNumber(i.current_stock)}</span> / tối thiểu {fmtNumber(i.min_stock_level)} {i.unit} •{' '}
                  {db.suppliers.find(s => s.id === i.supplier_id)?.name ?? 'Chưa gán NCC'}
                </p>
              </div>
              <PrimaryButton icon="add_shopping_cart" onClick={() => openFor(i)}>
                Đề xuất nhập
              </PrimaryButton>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <h2 className="font-bold text-sm text-stone-800">Đề xuất chờ duyệt ({drafts.length})</h2>
        </div>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">Mã phiếu</th>
                <th className="p-4">Nhà cung cấp</th>
                <th className="p-4">Nguyên liệu</th>
                <th className="p-4 text-right">Tổng tiền</th>
                <th className="p-4">Người tạo / Ngày</th>
                <th className="p-4">Ghi chú</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Duyệt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {drafts.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-stone-400">Không có đề xuất nào chờ duyệt.</td>
                </tr>
              )}
              {drafts.map(po => (
                <tr key={po.id} className="hover:bg-stone-50/60">
                  <td className="p-4 font-mono font-bold text-primary">{poCode(po.id)}</td>
                  <td className="p-4 font-semibold">{db.suppliers.find(s => s.id === po.supplier_id)?.name}</td>
                  <td className="p-4">
                    {itemsOf(po.id).map(it => {
                      const ing = db.ingredients.find(i => i.id === it.ingredient_id);
                      return (
                        <div key={it.id}>
                          {ing?.name}: <strong>{fmtNumber(it.quantity)}</strong> {ing?.unit} × {fmtMoney(it.unit_price)}
                        </div>
                      );
                    })}
                  </td>
                  <td className="p-4 text-right font-mono font-bold">{fmtMoney(po.total_cost)}</td>
                  <td className="p-4">
                    {userName(db, po.creator_id)}
                    <span className="block text-[10px] text-stone-400">{fmtDateTime(po.created_at)}</span>
                  </td>
                  <td className="p-4 text-stone-500 max-w-xs">{po.note ?? '—'}</td>
                  <td className="p-4">
                    <Badge className={PO_STATUS_STYLE[po.status]}>{PO_STATUS_LABEL[po.status]}</Badge>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button onClick={() => setStatus(po.id, 'ORDERED')} className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg mr-1.5">
                      Duyệt
                    </button>
                    <button onClick={() => setStatus(po.id, 'CANCELLED')} className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-lg">
                      Từ chối
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal title="Tạo đề xuất nhập hàng (phiếu nháp)" onClose={() => setModal(null)}>
          <form onSubmit={handleCreate} className="space-y-3">
            <Field label="Nguyên liệu" column="purchase_order_items.ingredient_id">
              <select
                value={modal.ingredient_id}
                onChange={e => {
                  const ing = db.ingredients.find(i => i.id === Number(e.target.value));
                  if (ing) openFor(ing);
                }}
                className={inputCls}
              >
                {db.ingredients.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name} ({i.unit}) - {db.suppliers.find(s => s.id === i.supplier_id)?.name ?? 'chưa có NCC'}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Số lượng" column="quantity">
                <input type="number" min={0} step="0.001" value={modal.quantity} onChange={e => setModal({ ...modal, quantity: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Đơn giá dự kiến" column="unit_price">
                <input type="number" min={0} value={modal.unit_price} onChange={e => setModal({ ...modal, unit_price: Number(e.target.value) })} className={inputCls} />
              </Field>
            </div>
            <Field label="Lý do / ghi chú" column="purchase_orders.note">
              <textarea rows={2} value={modal.note} onChange={e => setModal({ ...modal, note: e.target.value })} className={inputCls} />
            </Field>
            <p className="text-xs text-stone-500">Thành tiền dự kiến: <strong>{fmtMoney(modal.quantity * modal.unit_price)}</strong></p>
            <FormActions onCancel={() => setModal(null)} submitLabel="Tạo đề xuất" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
