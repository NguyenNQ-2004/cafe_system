import React, { useState } from 'react';
import { PageRoute, StaffPosition, User, UserRole, UserStatus } from '../../types';
import { useDb } from '../../data/DbContext';
import { POSITION_LABEL, ROLE_LABEL, USER_STATUS_LABEL, fmtDate, fmtMoney, nowSql } from '../../data/dbUtils';
import { AdminLayout, Badge, Field, FormActions, Modal, PrimaryButton, StatCard, inputCls } from './AdminUi';

interface AdminUsersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface StaffForm {
  full_name: string;
  phone: string;
  email: string;
  password: string;
  birthday: string;
  address: string;
  role: Exclude<UserRole, 'CUSTOMER'>;
  position: StaffPosition;
  base_salary: number;
  hire_date: string;
  status: UserStatus;
}

const STATUS_STYLE: Record<UserStatus, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  INACTIVE: 'bg-stone-200 text-stone-600',
  LOCKED: 'bg-rose-100 text-rose-700'
};

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [positionFilter, setPositionFilter] = useState<'all' | StaffPosition>('all');
  const [editing, setEditing] = useState<{ id: number | null; form: StaffForm } | null>(null);

  const staff = db.users.filter(u => u.role !== 'CUSTOMER');
  const rows = staff.filter(u => positionFilter === 'all' || u.position === positionFilter);

  const openEdit = (u: User | null) =>
    setEditing({
      id: u?.id ?? null,
      form: {
        full_name: u?.full_name ?? '',
        phone: u?.phone ?? '',
        email: u?.email ?? '',
        password: '',
        birthday: u?.birthday ?? '',
        address: u?.address ?? '',
        role: u?.role === 'ADMIN' ? 'ADMIN' : 'STAFF',
        position: u?.position ?? 'CASHIER',
        base_salary: u?.base_salary ?? 0,
        hire_date: u?.hire_date ?? nowSql().slice(0, 10),
        status: u?.status ?? 'ACTIVE'
      }
    });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const f = editing.form;
    const phone = f.phone.trim();
    if (db.users.some(u => u.phone === phone && u.id !== editing.id)) {
      onShowToast?.('Số điện thoại đã được dùng cho tài khoản khác (users.phone là UNIQUE).');
      return;
    }
    if (f.base_salary < 0) {
      onShowToast?.('Lương cơ bản không được âm (chk_user_salary).');
      return;
    }
    const row = {
      full_name: f.full_name.trim(),
      phone,
      email: f.email.trim() || null,
      birthday: f.birthday || null,
      address: f.address.trim() || null,
      role: f.role,
      position: f.position,
      base_salary: f.base_salary,
      hire_date: f.hire_date || null,
      status: f.status
    };
    if (editing.id) {
      transact(tx => tx.update('users', editing.id!, { ...row, ...(f.password ? { password_hash: `changed_${Date.now()}` } : {}) }));
      onShowToast?.('Cập nhật nhân viên thành công!');
    } else {
      // Mật khẩu được backend băm vào password_hash
      transact(tx => tx.insert('users', { ...row, password_hash: 'pending_hash', total_points: 0, created_at: nowSql() }));
      onShowToast?.('Đã thêm nhân viên mới!');
    }
    setEditing(null);
  };

  const toggleLock = (u: User) => {
    const status: UserStatus = u.status === 'LOCKED' ? 'ACTIVE' : 'LOCKED';
    transact(tx => tx.update('users', u.id, { status }));
    onShowToast?.(`${u.full_name}: ${USER_STATUS_LABEL[status]}.`);
  };

  const setForm = (patch: Partial<StaffForm>) => setEditing(prev => (prev ? { ...prev, form: { ...prev.form, ...patch } } : prev));

  return (
    <AdminLayout
      route="admin-users"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="users (role ADMIN / STAFF)"
      title="Quản lý nhân viên"
      subtitle="Tài khoản nội bộ: vai trò, chức vụ, lương cơ bản và ngày vào làm."
      actions={
        <PrimaryButton icon="person_add" onClick={() => openEdit(null)}>
          Thêm nhân viên
        </PrimaryButton>
      }
      stats={
        <>
          <StatCard label="Tổng nhân sự" value={staff.length} />
          <StatCard label="Đang làm việc" value={staff.filter(u => u.status === 'ACTIVE').length} tone="success" />
          <StatCard label="Bị khóa / nghỉ" value={staff.filter(u => u.status !== 'ACTIVE').length} tone="danger" />
          <StatCard label="Quỹ lương cơ bản" value={fmtMoney(staff.filter(u => u.status === 'ACTIVE').reduce((s, u) => s + u.base_salary, 0))} />
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
          <h2 className="font-bold text-sm text-stone-800">Danh sách nhân viên</h2>
          <select value={positionFilter} onChange={e => setPositionFilter(e.target.value as typeof positionFilter)} className="h-8 px-2 rounded-lg border border-stone-200 text-xs">
            <option value="all">Tất cả chức vụ</option>
            {(Object.keys(POSITION_LABEL) as StaffPosition[]).map(p => (
              <option key={p} value={p}>{POSITION_LABEL[p]}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-4">Họ và tên</th>
                <th className="p-4">SĐT / Email</th>
                <th className="p-4">Vai trò</th>
                <th className="p-4">Chức vụ</th>
                <th className="p-4 text-right">Lương cơ bản</th>
                <th className="p-4">Ngày vào làm</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rows.map(u => (
                <tr key={u.id} className="hover:bg-stone-50/50">
                  <td className="p-4 font-bold text-stone-900">{u.full_name}</td>
                  <td className="p-4">
                    <span className="font-mono block">{u.phone}</span>
                    <span className="text-stone-400">{u.email}</span>
                  </td>
                  <td className="p-4">{ROLE_LABEL[u.role]}</td>
                  <td className="p-4">
                    <Badge className="bg-blue-100 text-blue-700">{u.position ? POSITION_LABEL[u.position] : '—'}</Badge>
                  </td>
                  <td className="p-4 text-right font-mono">{fmtMoney(u.base_salary)}</td>
                  <td className="p-4">{fmtDate(u.hire_date)}</td>
                  <td className="p-4">
                    <Badge className={STATUS_STYLE[u.status]}>{USER_STATUS_LABEL[u.status]}</Badge>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => openEdit(u)} className="text-primary font-bold hover:underline">Sửa</button>
                    <button onClick={() => toggleLock(u)} className="text-stone-600 font-bold hover:underline">
                      {u.status === 'LOCKED' ? 'Mở khóa' : 'Khóa'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <Modal title={editing.id ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'} onClose={() => setEditing(null)} wide>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Họ và tên *" column="full_name">
                <input required maxLength={120} value={editing.form.full_name} onChange={e => setForm({ full_name: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Số điện thoại (đăng nhập) *" column="phone">
                <input required maxLength={20} value={editing.form.phone} onChange={e => setForm({ phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Email" column="email">
                <input type="email" maxLength={150} value={editing.form.email} onChange={e => setForm({ email: e.target.value })} className={inputCls} />
              </Field>
              <Field label={editing.id ? 'Mật khẩu mới (bỏ trống nếu không đổi)' : 'Mật khẩu *'} column="password_hash">
                <input type="password" required={!editing.id} value={editing.form.password} onChange={e => setForm({ password: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Vai trò" column="role">
                <select value={editing.form.role} onChange={e => setForm({ role: e.target.value as StaffForm['role'] })} className={inputCls}>
                  <option value="STAFF">STAFF - Nhân viên</option>
                  <option value="ADMIN">ADMIN - Quản trị</option>
                </select>
              </Field>
              <Field label="Chức vụ" column="position">
                <select value={editing.form.position} onChange={e => setForm({ position: e.target.value as StaffPosition })} className={inputCls}>
                  {(Object.keys(POSITION_LABEL) as StaffPosition[]).map(p => (
                    <option key={p} value={p}>{p} - {POSITION_LABEL[p]}</option>
                  ))}
                </select>
              </Field>
              <Field label="Lương cơ bản (VNĐ)" column="base_salary">
                <input type="number" min={0} value={editing.form.base_salary} onChange={e => setForm({ base_salary: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Ngày vào làm" column="hire_date">
                <input type="date" value={editing.form.hire_date} onChange={e => setForm({ hire_date: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Ngày sinh" column="birthday">
                <input type="date" value={editing.form.birthday} onChange={e => setForm({ birthday: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Trạng thái" column="status">
                <select value={editing.form.status} onChange={e => setForm({ status: e.target.value as UserStatus })} className={inputCls}>
                  {(Object.keys(USER_STATUS_LABEL) as UserStatus[]).map(s => (
                    <option key={s} value={s}>{s} - {USER_STATUS_LABEL[s]}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Địa chỉ" column="address">
              <textarea rows={2} value={editing.form.address} onChange={e => setForm({ address: e.target.value })} className={inputCls} />
            </Field>
            <FormActions onCancel={() => setEditing(null)} submitLabel={editing.id ? 'Lưu thay đổi' : 'Tạo tài khoản'} />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
