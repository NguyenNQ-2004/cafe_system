import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminVouchersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminVouchersPage: React.FC<AdminVouchersPageProps> = ({ onNavigate, onShowToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<any>(null);

  const handleOpenModal = (voucher: any = null) => {
    setEditingVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    onShowToast?.(editingVoucher ? 'Cập nhật Voucher thành công!' : 'Đã tạo Voucher mới!');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-vouchers" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Khuyến mãi & Voucher</h1>
          <p className="text-xs text-stone-500">Thiết lập các chương trình giảm giá, tặng mã khuyến mãi cho khách hàng và theo dõi hiệu quả chiến dịch.</p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo Voucher mới
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Đang chạy</span>
                <h3 className="font-bold text-sm mt-2 text-stone-900">AURAFREESHIP</h3>
                <p className="text-xs text-stone-500">Miễn phí giao hàng đơn từ 150k</p>
              </div>
              <span className="material-symbols-outlined text-stone-300">local_shipping</span>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-between text-xs mt-2">
              <span className="text-stone-500">Đã dùng: <strong className="text-stone-900">142/500</strong></span>
              <button onClick={() => handleOpenModal({ code: 'AURAFREESHIP', desc: 'Miễn phí giao hàng đơn từ 150k' })} className="text-primary font-bold hover:underline">Chỉnh sửa</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 opacity-60">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-stone-100 text-stone-500 text-[10px] font-bold rounded uppercase">Đã kết thúc</span>
                <h3 className="font-bold text-sm mt-2 text-stone-900">MUA1TANG1</h3>
                <p className="text-xs text-stone-500">Khuyến mãi khai trương tháng 9</p>
              </div>
              <span className="material-symbols-outlined text-stone-300">card_giftcard</span>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-between text-xs mt-2">
              <span className="text-stone-500">Đã dùng: <strong className="text-stone-900">890/1000</strong></span>
              <button onClick={() => onShowToast?.('Đang kết xuất báo cáo thống kê...')} className="text-stone-600 font-bold hover:underline">Xem thống kê</button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Voucher */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-stone-50">
              <h3 className="font-bold text-stone-900 text-sm">
                {editingVoucher ? 'Chỉnh sửa Voucher' : 'Tạo Voucher mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Mã Code (In hoa)</label>
                <input required defaultValue={editingVoucher?.code} type="text" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm font-mono uppercase" placeholder="VD: SIEUSALE" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Mô tả chương trình</label>
                <input required defaultValue={editingVoucher?.desc} type="text" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" placeholder="VD: Giảm 20% cho đơn từ 100k" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">Loại giảm giá</label>
                  <select className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm">
                    <option>Phần trăm (%)</option>
                    <option>Số tiền (VNĐ)</option>
                    <option>Miễn phí vận chuyển</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">Mức giảm</label>
                  <input required type="number" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" placeholder="20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">Số lượng giới hạn</label>
                  <input type="number" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" placeholder="500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">Ngày hết hạn</label>
                  <input type="date" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs hover:bg-stone-200">
                  Hủy bỏ
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-amber-600">
                  {editingVoucher ? 'Lưu thay đổi' : 'Phát hành Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
