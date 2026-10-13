import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminComplaintsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface ComplaintRecord {
  id: string;
  orderId: string;
  customerName: string;
  phone: string;
  issueType: 'RATING' | 'COMPLAINT';
  rating: number | null;
  content: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
  adminResponse: string | null;
  createdAt: string;
}

export const AdminComplaintsPage: React.FC<AdminComplaintsPageProps> = ({ onNavigate, onShowToast }) => {
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([
    {
      id: 'FB-102',
      orderId: 'AUR-86410',
      customerName: 'Hoàng Kim',
      phone: '0988 234 891',
      issueType: 'COMPLAINT',
      rating: null,
      content: 'Trà đào hôm nay hơi chua gắt và bị thiếu đá. Mong cửa hàng lưu ý tỷ lệ siro chuẩn.',
      status: 'PENDING',
      adminResponse: null,
      createdAt: '24/10/2026 09:30'
    },
    {
      id: 'FB-101',
      orderId: 'AUR-81209',
      customerName: 'Nguyễn Văn An',
      phone: '0908 123 456',
      issueType: 'RATING',
      rating: 5,
      content: 'Cà phê muối rất đậm đà, kem béo mặn xuất sắc. Giao hàng đúng giờ!',
      status: 'RESOLVED',
      adminResponse: 'Cảm ơn anh An đã ủng hộ Aura Café! Tặng anh 50 điểm thưởng vào ví thành viên.',
      createdAt: '23/10/2026 14:15'
    },
    {
      id: 'FB-100',
      orderId: 'AUR-79012',
      customerName: 'Lê Minh Anh',
      phone: '0900 000 004',
      issueType: 'COMPLAINT',
      rating: null,
      content: 'Giao hàng trễ 30 phút so với giờ hẹn, đá tan hết làm nhạt cà phê.',
      status: 'RESOLVED',
      adminResponse: 'Aura chân thành xin lỗi vì sự cố giao chậm do trời mưa lớn. Cửa hàng đã hoàn 100% tiền đơn hàng.',
      createdAt: '22/10/2026 11:00'
    },
    {
      id: 'FB-099',
      orderId: 'AUR-78210',
      customerName: 'Phạm Quang Huy',
      phone: '0900 000 005',
      issueType: 'RATING',
      rating: 2,
      content: 'Bánh croissant hôm nay hơi khô và nguội, không được giòn thơm như mọi khi.',
      status: 'PENDING',
      adminResponse: null,
      createdAt: '21/10/2026 16:45'
    }
  ]);

  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintRecord | null>(null);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [resolveStatus, setResolveStatus] = useState<'RESOLVED' | 'REJECTED'>('RESOLVED');

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'ALL') return true;
    return c.status === filter;
  });

  const handleOpenResponse = (item: ComplaintRecord) => {
    setSelectedComplaint(item);
    setResponseText(item.adminResponse || '');
    setResponseModalOpen(true);
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    setComplaints(prev =>
      prev.map(c => c.id === selectedComplaint.id ? {
        ...c,
        status: resolveStatus,
        adminResponse: responseText
      } : c)
    );
    setResponseModalOpen(false);
    onShowToast?.(`Đã gửi phản hồi và cập nhật trạng thái phiếu #${selectedComplaint.id} thành công!`);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-complaints" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span className="text-primary font-bold">Screen 30 • UC65, UC67, UC68</span>
                <span>•</span>
                <span>Khách Hàng & CSKH</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Phản ánh & Khiếu nại (Feedback & Complaint Management Screen)
              </h1>
              <p className="text-xs text-stone-500">
                Tiếp nhận đánh giá sao, xử lý khiếu nại chất lượng món và phản hồi trực tiếp tới tài khoản khách hàng.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                {complaints.filter(c => c.status === 'PENDING').length} khiếu nại chờ xử lý
              </span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 pt-2 text-xs font-semibold">
            {(['ALL', 'PENDING', 'RESOLVED'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === tab ? 'bg-primary text-white shadow-2xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab === 'ALL' ? 'Tất cả phiếu' : tab === 'PENDING' ? 'Chờ xử lý' : 'Đã giải quyết'}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Mã Phiếu</th>
                  <th className="p-4">Mã Đơn</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Loại yêu cầu</th>
                  <th className="p-4">Đánh giá</th>
                  <th className="p-4 max-w-xs">Nội dung phản ánh</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredComplaints.map(item => (
                  <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-stone-600">{item.id}</td>
                    <td className="p-4 font-mono font-bold text-primary">{item.orderId}</td>
                    <td className="p-4">
                      <strong className="text-stone-900 block">{item.customerName}</strong>
                      <span className="text-[11px] font-mono text-stone-400">{item.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.issueType === 'RATING' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.issueType === 'RATING' ? 'Đánh giá món' : 'Khiếu nại sự cố'}
                      </span>
                    </td>
                    <td className="p-4">
                      {item.rating ? (
                        <span className="text-amber-500 text-sm">
                          {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-xs font-mono">--</span>
                      )}
                    </td>
                    <td className="p-4 max-w-xs truncate text-stone-800" title={item.content}>
                      {item.content}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        item.status === 'PENDING' ? 'bg-rose-100 text-rose-700 font-bold' :
                        item.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-stone-100 text-stone-500'
                      }`}>
                        {item.status === 'PENDING' ? 'Chờ xử lý' : item.status === 'RESOLVED' ? 'Đã giải quyết' : 'Đã từ chối'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenResponse(item)}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-lg transition-colors text-xs flex items-center gap-1 ml-auto"
                      >
                        <span className="material-symbols-outlined text-[14px]">reply</span>
                        {item.adminResponse ? 'Xem phản hồi' : 'Xử lý & Trả lời'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Respond & Resolve */}
        {responseModalOpen && selectedComplaint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <div>
                  <h3 className="font-bold text-base text-stone-900">Phản hồi khiếu nại #{selectedComplaint.id}</h3>
                  <span className="text-xs text-stone-500">Đơn hàng {selectedComplaint.orderId} • Khách hàng {selectedComplaint.customerName}</span>
                </div>
                <button onClick={() => setResponseModalOpen(false)} className="text-stone-400 hover:text-stone-700 p-1">✕</button>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <span className="font-bold text-stone-500 text-[10px] uppercase block">Ý kiến khách hàng:</span>
                <p className="text-stone-800 font-medium italic">"{selectedComplaint.content}"</p>
              </div>

              <form onSubmit={handleSubmitResponse} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Cập nhật trạng thái xử lý *</label>
                  <select
                    value={resolveStatus}
                    onChange={(e) => setResolveStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-bold text-stone-800"
                  >
                    <option value="RESOLVED">RESOLVED (Đã giải quyết / Đền bù thỏa đáng)</option>
                    <option value="REJECTED">REJECTED (Từ chối khiếu nại không hợp lệ)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Nội dung phản hồi gửi tới khách hàng *</label>
                  <textarea
                    rows={4}
                    required
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Nhập thư xin lỗi, giải thích quy trình và hướng xử lý thỏa đáng cho khách..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary text-stone-900"
                  />
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setResponseModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-amber-600 text-white font-bold"
                  >
                    Gửi phản hồi cho khách
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
