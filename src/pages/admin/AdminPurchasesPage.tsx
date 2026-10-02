import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminPurchasesPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminPurchasesPage: React.FC<AdminPurchasesPageProps> = ({ onNavigate, onShowToast }) => {
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

  const handleSavePO = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPOModalOpen(false);
    onShowToast?.('Đã tạo thành công Phiếu nhập hàng (PO)!');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-purchases" onNavigate={onNavigate} onShowToast={onShowToast} />
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">Quản lý Nhập hàng & Nhà cung cấp</h1>
          <p className="text-xs text-stone-500">Tạo đơn đặt hàng (PO), theo dõi công nợ nhà cung cấp và lịch sử nhập kho nguyên vật liệu.</p>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => setIsPOModalOpen(true)}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo phiếu nhập (PO)
            </button>
            <button 
              onClick={() => setIsSupplierModalOpen(true)}
              className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-stone-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">store</span>
              Quản lý Nhà cung cấp
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <h2 className="font-bold text-sm text-stone-800">Lịch sử phiếu nhập (7 ngày qua)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Mã Phiếu (PO)</th>
                  <th className="p-4">Nhà cung cấp</th>
                  <th className="p-4">Ngày tạo</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">PO-2410-001</td>
                  <td className="p-4 font-medium">NCC Cà Phê Cầu Đất</td>
                  <td className="p-4 text-stone-500">24/10/2026</td>
                  <td className="p-4 font-mono font-bold">12,500,000đ</td>
                  <td className="p-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">Chờ thanh toán</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => onShowToast?.('Đang mở chi tiết phiếu nhập...')} className="text-primary font-bold hover:underline">Xem</button>
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">PO-2410-002</td>
                  <td className="p-4 font-medium">Đại lý Sữa Vinamilk</td>
                  <td className="p-4 text-stone-500">22/10/2026</td>
                  <td className="p-4 font-mono font-bold">4,200,000đ</td>
                  <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Đã hoàn thành</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => onShowToast?.('Đang mở chi tiết phiếu nhập...')} className="text-primary font-bold hover:underline">Xem</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Tạo Phiếu Nhập */}
      {isPOModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-stone-50">
              <h3 className="font-bold text-stone-900 text-sm">Tạo Phiếu Nhập Hàng (PO)</h3>
              <button onClick={() => setIsPOModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSavePO} className="p-5 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Chọn Nhà cung cấp</label>
                <select className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm">
                  <option>NCC Cà Phê Cầu Đất</option>
                  <option>Đại lý Sữa Vinamilk</option>
                  <option>Bao bì & Ly nhựa Ngọc Nghĩa</option>
                  <option>Nhà cung cấp khác...</option>
                </select>
              </div>
              
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="bg-stone-50 p-2.5 text-xs font-bold text-stone-600 border-b border-stone-200 flex justify-between">
                  <span>Danh sách mặt hàng</span>
                  <button type="button" className="text-primary hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">add</span>Thêm món
                  </button>
                </div>
                <div className="p-3 space-y-3">
                  <div className="flex gap-2">
                    <input type="text" className="flex-1 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none" placeholder="Tên mặt hàng..." defaultValue="Hạt Arabica Cầu Đất" />
                    <input type="number" className="w-20 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none" placeholder="SL" defaultValue={20} />
                    <input type="text" className="w-24 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none" placeholder="ĐVT" defaultValue="kg" />
                  </div>
                  <div className="flex gap-2">
                    <input type="text" className="flex-1 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none" placeholder="Tên mặt hàng..." defaultValue="Sữa tươi thanh trùng" />
                    <input type="number" className="w-20 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none" placeholder="SL" defaultValue={50} />
                    <input type="text" className="w-24 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none" placeholder="ĐVT" defaultValue="hộp" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">Ghi chú (Tùy chọn)</label>
                <textarea rows={2} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary text-sm" placeholder="Ghi chú thêm về đơn hàng..."></textarea>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsPOModalOpen(false)} className="flex-1 px-4 py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs hover:bg-stone-200">
                  Hủy bỏ
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-amber-600">
                  Xác nhận Tạo PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nhà Cung Cấp */}
      {isSupplierModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-3">store</span>
            <h3 className="font-bold text-stone-900 text-lg mb-2">Quản lý Nhà Cung Cấp</h3>
            <p className="text-xs text-stone-500 mb-6">Tính năng thêm, sửa, xóa và đối soát công nợ với Nhà Cung Cấp hiện đang được phát triển và sẽ ra mắt trong bản cập nhật tới.</p>
            <button onClick={() => setIsSupplierModalOpen(false)} className="px-4 py-2.5 bg-stone-900 text-white font-bold rounded-xl text-xs hover:bg-stone-800 w-full">
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
