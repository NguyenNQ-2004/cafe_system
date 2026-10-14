import React, { useState } from 'react';
import { PageRoute, PurchaseOrder, PurchaseOrderStatus } from '../../types';
import { useDb } from '../../data/DbContext';
import { PO_STATUS_LABEL, PO_STATUS_STYLE, fmtDateTime, fmtMoney, fmtNumber, lastPurchasePrice, nowSql, poCode, userName } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, GhostButton, Modal, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminPurchasesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface PoForm {
  supplier_id: number;
  status: 'DRAFT' | 'ORDERED';
  note: string;
  items: { ingredient_id: number; quantity: number; unit_price: number }[];
}

export const AdminPurchasesPage: React.FC<AdminPurchasesPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, session, transact } = useDb();
  const [statusFilter, setStatusFilter] = useState<'all' | PurchaseOrderStatus>('all');
  const [detailId, setDetailId] = useState<number | null>(null);
  const [form, setForm] = useState<PoForm | null>(null);

  const supplierName = (id: number) => db.suppliers.find(s => s.id === id)?.name ?? '—';
  const itemsOf = (poId: number) => db.purchase_order_items.filter(i => i.po_id === poId);
  const pos = [...db.purchase_orders]
    .filter(p => statusFilter === 'all' || p.status === statusFilter)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const detail = db.purchase_orders.find(p => p.id === detailId);

  // Nhận hàng: cộng tồn kho + ghi inventory_transactions IN_PURCHASE
  const receive = (po: PurchaseOrder) => {
    transact(tx => {
      const created_at = nowSql();
      tx.db()
        .purchase_order_items.filter(i => i.po_id === po.id)
        .forEach(item => {
          const ing = tx.db().ingredients.find(i => i.id === item.ingredient_id);
          if (!ing) return;
          tx.update('ingredients', ing.id, { current_stock: ing.current_stock + item.quantity });
          tx.insert('inventory_transactions', {
            ingredient_id: ing.id,
            transaction_type: 'IN_PURCHASE',
            quantity: item.quantity,
            reference_type: 'PURCHASE_ORDER',
            reference_id: po.id,
            created_at
          });
        });
      tx.update('purchase_orders', po.id, { status: 'RECEIVED' });
    });
    onShowToast?.(`Đã nhập kho phiếu ${poCode(po.id)}.`);
  };

  const changeStatus = (po: PurchaseOrder, status: PurchaseOrderStatus) => {
    if (status === 'RECEIVED') return receive(po);
    transact(tx => tx.update('purchase_orders', po.id, { status }));
    onShowToast?.(`${poCode(po.id)}: ${PO_STATUS_LABEL[status]}.`);
  };

  const openCreate = () => {
    const supplier = db.suppliers.find(s => s.status === 'ACTIVE') ?? db.suppliers[0];
    const firstIng = db.ingredients.find(i => i.supplier_id === supplier?.id) ?? db.ingredients[0];
    setForm({
      supplier_id: supplier?.id ?? 0,
      status: 'DRAFT',
      note: '',
      items: firstIng ? [{ ingredient_id: firstIng.id, quantity: 1, unit_price: lastPurchasePrice(db, firstIng.id) ?? 0 }] : []
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const items = form.items.filter(i => i.ingredient_id && i.quantity > 0 && i.unit_price >= 0);
    if (items.length === 0) {
      onShowToast?.('Phiếu nhập cần ít nhất một dòng có số lượng > 0.');
      return;
    }
    const po = transact(tx => {
      const created = tx.insert('purchase_orders', {
        supplier_id: form.supplier_id,
        creator_id: session.adminId,
        total_cost: items.reduce((s, i) => s + i.quantity * i.unit_price, 0),
        status: form.status,
        note: form.note.trim() || null,
        created_at: nowSql()
      });
      items.forEach(i => tx.insert('purchase_order_items', { po_id: created.id, ...i }));
      return created;
    });
    onShowToast?.(`Đã tạo phiếu nhập ${poCode(po.id)}.`);
    setForm(null);
  };

  return (
    <AdminLayout
      route="admin-purchases"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="purchase_orders, purchase_order_items"
      title="Phiếu nhập hàng"
      subtitle="Tạo phiếu đặt hàng nhà cung cấp, theo dõi trạng thái và nhập kho khi nhận hàng."
      actions={
        <>
          <GhostButton icon="store" onClick={() => onNavigate('admin-suppliers')}>
            Nhà cung cấp
          </GhostButton>
          <PrimaryButton icon="add" onClick={openCreate}>
            Tạo phiếu nhập
          </PrimaryButton>
        </>
      }
      stats={
        <>
          {(['DRAFT', 'ORDERED', 'RECEIVED', 'CANCELLED'] as PurchaseOrderStatus[]).map(s => (
            <StatCard key={s} label={PO_STATUS_LABEL[s]} value={db.purchase_orders.filter(p => p.status === s).length} />
          ))}
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
          <h2 className="font-bold text-sm text-stone-800">Danh sách phiếu nhập</h2>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} className="h-8 px-2 rounded-lg border border-stone-200 text-xs">
            <option value="all">Tất cả trạng thái</option>
            {(Object.keys(PO_STATUS_LABEL) as PurchaseOrderStatus[]).map(s => (
              <option key={s} value={s}>{PO_STATUS_LABEL[s]}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">Mã phiếu</th>
                <th className="p-4">Nhà cung cấp</th>
                <th className="p-4">Người tạo</th>
                <th className="p-4">Ngày tạo</th>
                <th className="p-4 text-center">Số dòng</th>
                <th className="p-4 text-right">Tổng tiền</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {pos.map(po => (
                <tr key={po.id} className="hover:bg-stone-50/50">
                  <td className="p-4 font-bold text-stone-900 font-mono">{poCode(po.id)}</td>
                  <td className="p-4 font-medium">{supplierName(po.supplier_id)}</td>
                  <td className="p-4">{userName(db, po.creator_id)}</td>
                  <td className="p-4 text-stone-500">{fmtDateTime(po.created_at)}</td>
                  <td className="p-4 text-center">{itemsOf(po.id).length}</td>
                  <td className="p-4 text-right font-mono font-bold">{fmtMoney(po.total_cost)}</td>
                  <td className="p-4">
                    <Badge className={PO_STATUS_STYLE[po.status]}>{PO_STATUS_LABEL[po.status]}</Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => setDetailId(po.id)} className="text-primary font-bold hover:underline">Xem</button>
                    {po.status === 'DRAFT' && (
                      <button onClick={() => changeStatus(po, 'ORDERED')} className="text-blue-700 font-bold hover:underline">Đặt hàng</button>
                    )}
                    {po.status === 'ORDERED' && (
                      <button onClick={() => changeStatus(po, 'RECEIVED')} className="text-emerald-700 font-bold hover:underline">Nhập kho</button>
                    )}
                    {(po.status === 'DRAFT' || po.status === 'ORDERED') && (
                      <button onClick={() => changeStatus(po, 'CANCELLED')} className="text-rose-600 font-bold hover:underline">Hủy</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <Modal title={`Phiếu nhập ${poCode(detail.id)}`} onClose={() => setDetailId(null)} wide>
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl">
              <span>Nhà cung cấp: <strong>{supplierName(detail.supplier_id)}</strong></span>
              <span>Người tạo: <strong>{userName(db, detail.creator_id)}</strong></span>
              <span>Ngày tạo: <strong>{fmtDateTime(detail.created_at)}</strong></span>
              <span>
                Trạng thái: <Badge className={PO_STATUS_STYLE[detail.status]}>{PO_STATUS_LABEL[detail.status]}</Badge>
              </span>
              {detail.note && <span className="col-span-2">Ghi chú: {detail.note}</span>}
            </div>
            <table className="w-full text-left">
              <thead className="text-stone-500 text-[10px] uppercase border-b border-stone-200">
                <tr>
                  <th className="py-2">Nguyên liệu</th>
                  <th className="py-2 text-right">Số lượng</th>
                  <th className="py-2 text-right">Đơn giá</th>
                  <th className="py-2 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {itemsOf(detail.id).map(it => {
                  const ing = db.ingredients.find(i => i.id === it.ingredient_id);
                  return (
                    <tr key={it.id}>
                      <td className="py-2">{ing?.name}</td>
                      <td className="py-2 text-right font-mono">{fmtNumber(it.quantity)} {ing?.unit}</td>
                      <td className="py-2 text-right font-mono">{fmtMoney(it.unit_price)}</td>
                      <td className="py-2 text-right font-mono font-bold">{fmtMoney(it.quantity * it.unit_price)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-right text-sm">
              Tổng (total_cost): <strong className="text-primary font-mono">{fmtMoney(detail.total_cost)}</strong>
            </p>
          </div>
        </Modal>
      )}

      {form && (
        <Modal title="Tạo phiếu nhập hàng" onClose={() => setForm(null)} wide>
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nhà cung cấp" column="supplier_id">
                <select value={form.supplier_id} onChange={e => setForm({ ...form, supplier_id: Number(e.target.value) })} className={inputCls}>
                  {db.suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Trạng thái ban đầu" column="status">
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as PoForm['status'] })} className={inputCls}>
                  <option value="DRAFT">DRAFT - Lưu nháp</option>
                  <option value="ORDERED">ORDERED - Đặt hàng ngay</option>
                </select>
              </Field>
            </div>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="bg-stone-50 p-2.5 text-xs font-bold text-stone-600 border-b border-stone-200 flex justify-between">
                <span>Dòng nguyên liệu (purchase_order_items)</span>
                <button
                  type="button"
                  onClick={() =>
                    setForm({ ...form, items: [...form.items, { ingredient_id: db.ingredients[0]?.id ?? 0, quantity: 1, unit_price: lastPurchasePrice(db, db.ingredients[0]?.id ?? 0) ?? 0 }] })
                  }
                  className="text-primary hover:underline"
                >
                  + Thêm dòng
                </button>
              </div>
              <div className="p-3 space-y-2">
                {form.items.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <select
                      value={it.ingredient_id}
                      onChange={e => {
                        const id = Number(e.target.value);
                        setForm({ ...form, items: form.items.map((x, i) => (i === idx ? { ...x, ingredient_id: id, unit_price: lastPurchasePrice(db, id) ?? x.unit_price } : x)) });
                      }}
                      className={`${inputCls} col-span-5`}
                    >
                      {db.ingredients.map(i => (
                        <option key={i.id} value={i.id}>
                          {i.name} ({i.unit})
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={0}
                      step="0.001"
                      value={it.quantity}
                      onChange={e => setForm({ ...form, items: form.items.map((x, i) => (i === idx ? { ...x, quantity: Number(e.target.value) } : x)) })}
                      className={`${inputCls} col-span-3`}
                      placeholder="Số lượng"
                    />
                    <input
                      type="number"
                      min={0}
                      value={it.unit_price}
                      onChange={e => setForm({ ...form, items: form.items.map((x, i) => (i === idx ? { ...x, unit_price: Number(e.target.value) } : x)) })}
                      className={`${inputCls} col-span-3`}
                      placeholder="Đơn giá"
                    />
                    <button type="button" onClick={() => setForm({ ...form, items: form.items.filter((_, i) => i !== idx) })} className="col-span-1 text-stone-400 hover:text-rose-600">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <Field label="Ghi chú" column="note">
              <textarea rows={2} value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} className={inputCls} />
            </Field>
            <p className="text-xs text-right">
              Tổng tiền: <strong className="text-primary font-mono">{fmtMoney(form.items.reduce((s, i) => s + i.quantity * i.unit_price, 0))}</strong>
            </p>
            <FormActions onCancel={() => setForm(null)} submitLabel="Tạo phiếu nhập" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
