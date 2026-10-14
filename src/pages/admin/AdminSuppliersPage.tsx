import React, { useState } from 'react';
import { PageRoute, Supplier, ActiveStatus } from '../../types';
import { useDb } from '../../data/DbContext';
import { AdminLayout, Badge, Field, FormActions, Modal, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminSuppliersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

type SupplierForm = { name: string; phone: string; address: string; status: ActiveStatus };

export const AdminSuppliersPage: React.FC<AdminSuppliersPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [editing, setEditing] = useState<{ id: number | null; form: SupplierForm } | null>(null);

  const ingredientsOf = (id: number) => db.ingredients.filter(i => i.supplier_id === id);
  const posOf = (id: number) => db.purchase_orders.filter(p => p.supplier_id === id);

  const openEdit = (s: Supplier | null) =>
    setEditing({ id: s?.id ?? null, form: { name: s?.name ?? '', phone: s?.phone ?? '', address: s?.address ?? '', status: s?.status ?? 'ACTIVE' } });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const row = {
      name: editing.form.name.trim(),
      phone: editing.form.phone.trim() || null,
      address: editing.form.address.trim() || null,
      status: editing.form.status
    };
    if (editing.id) {
      transact(tx => tx.update('suppliers', editing.id!, row));
      onShowToast?.(`Đã cập nhật nhà cung cấp "${row.name}".`);
    } else {
      transact(tx => tx.insert('suppliers', row));
      onShowToast?.(`Đã thêm nhà cung cấp "${row.name}".`);
    }
    setEditing(null);
  };

  const handleDelete = (s: Supplier) => {
    if (posOf(s.id).length > 0) {
      onShowToast?.('Không thể xóa: nhà cung cấp đã có phiếu nhập (fk_po_supplier). Hãy chuyển sang Ngừng hợp tác.');
      return;
    }
    if (!confirm(`Xóa nhà cung cấp "${s.name}"? Nguyên liệu liên quan sẽ bỏ gán nhà cung cấp (ON DELETE SET NULL).`)) return;
    transact(tx => {
      tx.db().ingredients.filter(i => i.supplier_id === s.id).forEach(i => tx.update('ingredients', i.id, { supplier_id: null }));
      tx.remove('suppliers', s.id);
    });
    onShowToast?.('Đã xóa nhà cung cấp.');
  };

  const setForm = (patch: Partial<SupplierForm>) => setEditing(prev => (prev ? { ...prev, form: { ...prev.form, ...patch } } : prev));

  return (
    <AdminLayout
      route="admin-suppliers"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="suppliers"
      title="Quản lý nhà cung cấp"
      subtitle="Đối tác cung cấp nguyên vật liệu cho quán."
      actions={
        <PrimaryButton icon="add" onClick={() => openEdit(null)}>
          Thêm nhà cung cấp
        </PrimaryButton>
      }
      stats={
        <>
          <StatCard label="Tổng nhà cung cấp" value={db.suppliers.length} />
          <StatCard label="Đang hợp tác" value={db.suppliers.filter(s => s.status === 'ACTIVE').length} tone="success" />
          <StatCard label="Ngừng hợp tác" value={db.suppliers.filter(s => s.status === 'INACTIVE').length} />
          <StatCard label="Phiếu nhập" value={db.purchase_orders.length} />
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Tên nhà cung cấp</th>
              <th className="p-4">Số điện thoại</th>
              <th className="p-4">Địa chỉ</th>
              <th className="p-4">Nguyên liệu cung cấp</th>
              <th className="p-4 text-center">Phiếu nhập</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {db.suppliers.map(s => (
              <tr key={s.id} className="hover:bg-stone-50/50">
                <td className="p-4 font-mono text-stone-500">#{s.id}</td>
                <td className="p-4 font-bold text-stone-900">{s.name}</td>
                <td className="p-4 font-mono">{s.phone ?? '—'}</td>
                <td className="p-4">{s.address ?? '—'}</td>
                <td className="p-4 text-stone-600">{ingredientsOf(s.id).map(i => i.name).join(', ') || '—'}</td>
                <td className="p-4 text-center font-mono">{posOf(s.id).length}</td>
                <td className="p-4">
                  <Badge className={s.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-500'}>
                    {s.status === 'ACTIVE' ? 'Đang hợp tác' : 'Ngừng hợp tác'}
                  </Badge>
                </td>
                <td className="p-4 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(s)} className="text-primary font-bold hover:underline mr-3">Sửa</button>
                  <button onClick={() => handleDelete(s)} className="text-rose-600 font-bold hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal title={editing.id ? `Sửa nhà cung cấp #${editing.id}` : 'Thêm nhà cung cấp'} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-3">
            <Field label="Tên nhà cung cấp *" column="name">
              <input required maxLength={150} value={editing.form.name} onChange={e => setForm({ name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Số điện thoại" column="phone">
              <input maxLength={20} value={editing.form.phone} onChange={e => setForm({ phone: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Địa chỉ" column="address">
              <textarea rows={2} value={editing.form.address} onChange={e => setForm({ address: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Trạng thái" column="status">
              <select value={editing.form.status} onChange={e => setForm({ status: e.target.value as ActiveStatus })} className={inputCls}>
                <option value="ACTIVE">ACTIVE - Đang hợp tác</option>
                <option value="INACTIVE">INACTIVE - Ngừng hợp tác</option>
              </select>
            </Field>
            <FormActions onCancel={() => setEditing(null)} submitLabel={editing.id ? 'Lưu thay đổi' : 'Thêm nhà cung cấp'} />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
