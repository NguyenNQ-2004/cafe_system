import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminRestockPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface RestockRequestItem {
  id: string;
  ingredientName: string;
  unit: string;
  requestedQty: number;
  currentStock: number;
  minStock: number;
  requestedBy: string;
  urgency: 'CRITICAL' | 'NORMAL';
  status: 'PENDING' | 'APPROVED' | 'ORDERED' | 'REJECTED';
  createdAt: string;
  note: string;
}

export const AdminRestockPage: React.FC<AdminRestockPageProps> = ({ onNavigate, onShowToast }) => {
  const [requests, setRequests] = useState<RestockRequestItem[]>([
    {
      id: 'REQ-2026-081',
      ingredientName: 'Cà phê hạt Arabica Cầu Đất',
      unit: 'kg',
      requestedQty: 30,
      currentStock: 12.5,
      minStock: 25.0,
      requestedBy: 'Trần Mai Ly (Thu ngân Ca sáng)',
      urgency: 'CRITICAL',
      status: 'PENDING',
      createdAt: '24/10/2026 08:30',
      note: 'Cuối tuần dự kiến khách đông, lượng hạt Arabica chỉ còn đủ pha trong 1.5 ngày.'
    },
    {
      id: 'REQ-2026-080',
      ingredientName: 'Sữa tươi tiệt trùng Barista Grade',
      unit: 'hộp 1L',
      requestedQty: 48,
      currentStock: 18,
      minStock: 40,
      requestedBy: 'Nguyễn Văn An (Barista KDS)',
      urgency: 'CRITICAL',
      status: 'APPROVED',
      createdAt: '24/10/2026 07:15',
      note: 'Cần nạp thêm 4 thùng 12 hộp cho tủ mát quầy pha chế.'
    },
    {
      id: 'REQ-2026-079',
      ingredientName: 'Ly giấy Take-away Size L + Nắp',
      unit: 'cái',
      requestedQty: 500,
      currentStock: 450,
      minStock: 500,
      requestedBy: 'Trần Mai Ly (Thu ngân)',
      urgency: 'NORMAL',
      status: 'ORDERED',
      createdAt: '23/10/2026 16:40',
      note: 'Đã lên phiếu mua hàng PO-0912 giao trong ngày mai.'
    },
    {
      id: 'REQ-2026-078',
      ingredientName: 'Siro Caramel Torani chai 750ml',
      unit: 'chai',
      requestedQty: 6,
      currentStock: 8,
      minStock: 5,
      requestedBy: 'Hoàng Văn Nam (Shipper/Kho)',
      urgency: 'NORMAL',
      status: 'REJECTED',
      createdAt: '22/10/2026 11:20',
      note: 'Tồn kho vẫn trên mức an toàn, ưu tiên xuất các chai trong kho phụ trước.'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'ORDERED'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    ingredientName: 'Cà phê hạt Robusta Pleiku',
    requestedQty: 25,
    unit: 'kg',
    urgency: 'NORMAL' as 'CRITICAL' | 'NORMAL',
    note: ''
  });

  const filteredRequests = requests.filter(r => {
    if (statusFilter === 'ALL') return true;
    return r.status === statusFilter;
  });

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: RestockRequestItem = {
      id: `REQ-2026-0${82 + requests.length}`,
      ingredientName: formData.ingredientName,
      unit: formData.unit,
      requestedQty: Number(formData.requestedQty),
      currentStock: 15,
      minStock: 20,
      requestedBy: 'Thu ngân / Bếp pha chế',
      urgency: formData.urgency,
      status: 'PENDING',
      createdAt: 'Vừa xong - Hôm nay',
      note: formData.note || 'Yêu cầu bổ sung kho theo ca.'
    };
    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    onShowToast?.(`Đã gửi yêu cầu Restock #${newReq.id} tới Quản lý kho thành công!`);
  };

  const handleUpdateStatus = (id: string, newStatus: RestockRequestItem['status']) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
    );
    if (newStatus === 'APPROVED') {
      onShowToast?.(`Đã duyệt yêu cầu #${id}. Có thể chuyển tiếp sang Phiếu PO!`);
    } else if (newStatus === 'REJECTED') {
      onShowToast?.(`Đã từ chối yêu cầu restock #${id}.`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-restock" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span className="text-primary font-bold">Screen 20</span>
                <span>•</span>
                <span>Kho Vận & Đề Xuất Nhập Hàng</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Yêu cầu Bổ sung kho (Restock Request Screen)
              </h1>
              <p className="text-xs text-stone-500">
                Theo dõi và xử lý các phiếu đề xuất restock nguyên vật liệu từ Thu ngân và Barista khi chạm ngưỡng định mức an toàn.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">add_alert</span>
                Tạo yêu cầu restock (+)
              </button>
              <button
                onClick={() => onNavigate('admin-purchases')}
                className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-stone-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Đến Phiếu mua hàng (PO)
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-100 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Tổng Phiếu Restock</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">{requests.length}</span>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
              <span className="text-[10px] text-rose-600 uppercase font-bold block">Khẩn Cấp Cần Duyệt</span>
              <span className="text-xl font-black text-rose-700 font-mono mt-0.5 block">
                {requests.filter(r => r.urgency === 'CRITICAL' && r.status === 'PENDING').length}
              </span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
              <span className="text-[10px] text-amber-700 uppercase font-bold block">Đã Phê Duyệt</span>
              <span className="text-xl font-black text-amber-800 font-mono mt-0.5 block">
                {requests.filter(r => r.status === 'APPROVED').length}
              </span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">Đã Lên Đơn Mua PO</span>
              <span className="text-xl font-black text-emerald-800 font-mono mt-0.5 block">
                {requests.filter(r => r.status === 'ORDERED').length}
              </span>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 bg-stone-50/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              {(['ALL', 'PENDING', 'APPROVED', 'ORDERED'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    statusFilter === tab ? 'bg-primary text-white shadow-2xs' : 'bg-white text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  {tab === 'ALL' ? 'Tất cả' : tab === 'PENDING' ? 'Chờ duyệt' : tab === 'APPROVED' ? 'Đã duyệt' : 'Đã lên PO'}
                </button>
              ))}
            </div>
            <span className="text-xs text-stone-400 font-medium">{filteredRequests.length} phiếu hiển thị</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Mã Phiếu</th>
                  <th className="p-4">Nguyên Vật Liệu</th>
                  <th className="p-4 text-center">Số lượng đề xuất</th>
                  <th className="p-4 text-center">Tồn kho / Min</th>
                  <th className="p-4">Người đề xuất</th>
                  <th className="p-4">Mức ưu tiên</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Thao tác duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">{req.id}</td>
                    <td className="p-4">
                      <strong className="text-stone-900 block">{req.ingredientName}</strong>
                      <span className="text-[11px] text-stone-400 truncate max-w-xs block">{req.note}</span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-stone-900">
                      {req.requestedQty} {req.unit}
                    </td>
                    <td className="p-4 text-center font-mono">
                      <span className={req.currentStock <= req.minStock ? 'text-rose-600 font-bold' : 'text-stone-700'}>
                        {req.currentStock}
                      </span>
                      <span className="text-stone-400"> / {req.minStock} {req.unit}</span>
                    </td>
                    <td className="p-4 text-stone-700">
                      <div>{req.requestedBy}</div>
                      <span className="text-[10px] text-stone-400">{req.createdAt}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        req.urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {req.urgency === 'CRITICAL' ? 'NGUY CẤP' : 'Bình thường'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        req.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                        req.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                        req.status === 'ORDERED' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-stone-100 text-stone-500'
                      }`}>
                        {req.status === 'PENDING' ? 'Chờ duyệt' :
                         req.status === 'APPROVED' ? 'Đã duyệt' :
                         req.status === 'ORDERED' ? 'Đã tạo PO' : 'Từ chối'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {req.status === 'PENDING' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'APPROVED')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors text-[11px]"
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-lg transition-colors text-[11px]"
                          >
                            Từ chối
                          </button>
                        </div>
                      ) : req.status === 'APPROVED' ? (
                        <button
                          onClick={() => {
                            onShowToast?.(`Đã tạo phiếu mua hàng (PO) từ yêu cầu #${req.id}!`);
                            onNavigate('admin-purchases');
                          }}
                          className="px-2.5 py-1 bg-primary text-white font-bold rounded-lg hover:bg-amber-600 transition-colors text-[11px] flex items-center gap-1 ml-auto"
                        >
                          <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                          Lên PO
                        </button>
                      ) : (
                        <span className="text-stone-400 text-xs">Đã hoàn tất</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Create Restock Request */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h3 className="font-bold text-base text-stone-900">Tạo yêu cầu restock nguyên liệu khẩn</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700 p-1">✕</button>
              </div>

              <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Chọn nguyên vật liệu cần restock</label>
                  <select
                    value={formData.ingredientName}
                    onChange={(e) => setFormData({ ...formData, ingredientName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  >
                    <option value="Cà phê hạt Arabica Cầu Đất">Cà phê hạt Arabica Cầu Đất (kg)</option>
                    <option value="Cà phê hạt Robusta Pleiku">Cà phê hạt Robusta Pleiku (kg)</option>
                    <option value="Sữa tươi tiệt trùng Barista Grade">Sữa tươi tiệt trùng Barista Grade (Hộp 1L)</option>
                    <option value="Sữa đặc có đường Ông Thọ đỏ">Sữa đặc có đường Ông Thọ đỏ (Lon 380g)</option>
                    <option value="Trà Ô Long Búp Lộc Xanh">Trà Ô Long Búp Lộc Xanh (kg)</option>
                    <option value="Ly giấy Take-away Size L + Nắp">Ly giấy Take-away Size L + Nắp (Cái)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Số lượng đề xuất</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.requestedQty}
                      onChange={(e) => setFormData({ ...formData, requestedQty: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Mức độ khẩn cấp</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-bold text-primary"
                    >
                      <option value="NORMAL">Bình thường</option>
                      <option value="CRITICAL">NGUY CẤP (&lt; 24h)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Lý do / Ghi chú cho Quản lý kho</label>
                  <textarea
                    rows={2}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="VD: Dự kiến tiệc teabreak sáng mai 50 khách, cần cấp gấp..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-amber-600 text-white font-bold"
                  >
                    Gửi yêu cầu restock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
