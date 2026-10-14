import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { useDb } from '../../data/DbContext';
import { fmtDateTime } from '../../data/dbUtils';
import { AdminLayout, Field, FormActions, Modal, PrimaryButton, inputCls } from './AdminUi';

interface AdminSettingsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

const SETTING_INFO: Record<string, { label: string; group: string; hint?: string }> = {
  store_name: { label: 'Tên cửa hàng', group: 'Thông tin cửa hàng' },
  store_address: { label: 'Địa chỉ', group: 'Thông tin cửa hàng' },
  store_hotline: { label: 'Hotline', group: 'Thông tin cửa hàng' },
  delivery_fee: { label: 'Phí giao hàng (VNĐ)', group: 'Giao hàng' },
  freeship_threshold: { label: 'Miễn phí ship cho đơn từ (VNĐ)', group: 'Giao hàng' },
  delivery_minutes: { label: 'Thời gian giao dự kiến (phút)', group: 'Giao hàng' },
  points_earn_unit: { label: 'Chi tiêu để được 1 điểm (VNĐ)', group: 'Tích điểm' },
  points_step: { label: 'Bậc đổi điểm (điểm)', group: 'Tích điểm' },
  points_step_value: { label: 'Giá trị mỗi bậc đổi (VNĐ)', group: 'Tích điểm' },
  shift_morning: { label: 'Giờ ca sáng', group: 'Ca làm việc', hint: 'HH:mm-HH:mm' },
  shift_afternoon: { label: 'Giờ ca chiều', group: 'Ca làm việc', hint: 'HH:mm-HH:mm' },
  shift_evening: { label: 'Giờ ca tối', group: 'Ca làm việc', hint: 'HH:mm-HH:mm' }
};

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onNavigate, onShowToast }) => {
  const { db, transact } = useDb();
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(db.shop_settings.map(s => [s.setting_key, s.setting_value])));
  const [newSetting, setNewSetting] = useState<{ key: string; value: string } | null>(null);

  const groups = new Map<string, typeof db.shop_settings>();
  db.shop_settings.forEach(s => {
    const group = SETTING_INFO[s.setting_key]?.group ?? 'Khác';
    groups.set(group, [...(groups.get(group) ?? []), s]);
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const changed = db.shop_settings.filter(s => values[s.setting_key] !== undefined && values[s.setting_key] !== s.setting_value);
    if (changed.some(s => !values[s.setting_key].trim())) {
      onShowToast?.('Giá trị cài đặt không được để trống (setting_value NOT NULL).');
      return;
    }
    transact(tx => changed.forEach(s => tx.setSetting(s.setting_key, values[s.setting_key].trim())));
    onShowToast?.(changed.length ? `Đã lưu ${changed.length} cài đặt.` : 'Không có thay đổi nào.');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSetting) return;
    const key = newSetting.key.trim();
    if (!/^[a-z0-9_]{1,50}$/.test(key)) {
      onShowToast?.('Khóa chỉ gồm chữ thường, số, gạch dưới và tối đa 50 ký tự.');
      return;
    }
    if (db.shop_settings.some(s => s.setting_key === key)) {
      onShowToast?.('Khóa đã tồn tại (setting_key là khóa chính).');
      return;
    }
    transact(tx => tx.setSetting(key, newSetting.value.trim()));
    setValues(v => ({ ...v, [key]: newSetting.value.trim() }));
    setNewSetting(null);
    onShowToast?.(`Đã thêm cài đặt ${key}.`);
  };

  return (
    <AdminLayout
      route="admin-settings"
      onNavigate={onNavigate}
      onShowToast={onShowToast}
      table="shop_settings"
      title="Cài đặt cửa hàng"
      subtitle="Các thông số dùng chung cho giao hàng, tích điểm, giờ ca và thông tin hiển thị trên hóa đơn."
      actions={
        <PrimaryButton icon="add" onClick={() => setNewSetting({ key: '', value: '' })}>
          Thêm khóa cài đặt
        </PrimaryButton>
      }
    >
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...groups.entries()].map(([group, settings]) => (
            <div key={group} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <h2 className="font-bold text-sm text-stone-800">{group}</h2>
              {settings.map(s => (
                <Field key={s.setting_key} label={SETTING_INFO[s.setting_key]?.label ?? s.setting_key} column={s.setting_key}>
                  <input
                    maxLength={255}
                    value={values[s.setting_key] ?? ''}
                    onChange={e => setValues({ ...values, [s.setting_key]: e.target.value })}
                    placeholder={SETTING_INFO[s.setting_key]?.hint}
                    className={inputCls}
                  />
                  <span className="text-[10px] text-stone-400">Cập nhật lúc {fmtDateTime(s.updated_at)}</span>
                </Field>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 text-xs">
            Lưu thay đổi
          </button>
        </div>
      </form>

      {newSetting && (
        <Modal title="Thêm khóa cài đặt" onClose={() => setNewSetting(null)}>
          <form onSubmit={handleAdd} className="space-y-3">
            <Field label="Khóa" column="setting_key">
              <input required maxLength={50} value={newSetting.key} onChange={e => setNewSetting({ ...newSetting, key: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Giá trị" column="setting_value">
              <input required maxLength={255} value={newSetting.value} onChange={e => setNewSetting({ ...newSetting, value: e.target.value })} className={inputCls} />
            </Field>
            <FormActions onCancel={() => setNewSetting(null)} submitLabel="Thêm" />
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
