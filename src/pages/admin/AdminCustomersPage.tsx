import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminCustomersPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  points: number;
  totalSpent: number;
  status: 'ACTIVE' | 'LOCKED';
}

export const AdminCustomersPage: React.FC<AdminCustomersPageProps> = ({ onNavigate, onShowToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [customers, setCustomers] = useState<CustomerRecord[]>([
    { id: 'CUST-001', name: 'Nguyễn Văn An', phone: '0908 123 456', email: 'van.an.nguyen@example.com', joinDate: '15/11/2024', points: 450, totalSpent: 4250000, status: 'ACTIVE' },
    { id: 'CUST-002', name: 'Hoàng Kim', phone: '0988 234 891', email: 'kim.hoang@gmail.com', joinDate: '12/05/2025', points: 890, totalSpent: 8920000, status: 'ACTIVE' },
    { id: 'CUST-003', name: 'Lê Minh Anh', phone: '0900 000 004', email: 'anh.le@gmail.com', joinDate: '01/01/2026', points: 120, totalSpent: 1150000, status: 'ACTIVE' },
    { id: 'CUST-004', name: 'Phạm Quang Huy', phone: '0900 000 005', email: 'huy.pham@gmail.com', joinDate: '18/02/2026', points: 50, totalSpent: 620000, status: 'ACTIVE' },
    { id: 'CUST-005', name: 'Trần Bảo Ngọc', phone: '0912 345 678', email: 'ngoc.tran@yahoo.com', joinDate: '04/04/2026', points: 310, totalSpent: 3180000, status: 'ACTIVE' }
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    initialPoints: 100
  });

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CustomerRecord = {
      id: `CUST-00${customers.length + 1}`,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      joinDate: '24/10/2026',
      points: newCustomer.initialPoints || 100, // Tặng điểm khởi tạo
      totalSpent: 0,
      status: 'ACTIVE'
    };
    setCustomers([created, ...customers]);
    setIsAddModalOpen(false);
    onShowToast?.(`Đã thêm mới thành viên "${newCustomer.name}" thành công!`);
  };

  const handleToggleStatus = (id: string) => {
    setCustomers(prev =>
      prev.map(c => c.id === id ? { ...c, status: c.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE' } : c)
    );
    onShowToast?.('Đã cập nhật trạng thái khách hàng!');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-customers" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl relative">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span className="text-primary font-bold">Screen 28</span>
                <span>•</span>
                <span>Khách Hàng & CRM</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Quản lý Khách hàng (Customer Management Screen)
              </h1>
              <p className="text-xs text-stone-500">
                Quản trị cơ sở dữ liệu khách hàng thân thiết, tra cứu số điện thoại, điểm thưởng tích lũy và doanh số mua sắm.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Thêm khách hàng (+)
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="pt-2 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên khách, số điện thoại hoặc email..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-primary"
              />
            </div>
            <span className="text-xs text-stone-400 font-medium">{filteredCustomers.length} khách hàng</span>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="p-4">Mã KH</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Số điện thoại</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Tích điểm</th>
                  <th className="p-4 text-center">Điểm tích lũy</th>
                  <th className="p-4 text-right">Tổng chi tiêu</th>
                  <th className="p-4 text-center">Trạng thái</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredCustomers.map(cust => (
                  <tr key={cust.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-stone-500">{cust.id}</td>
                    <td className="p-4 font-bold text-stone-900">{cust.name}</td>
                    <td className="p-4 font-mono text-stone-700">{cust.phone}</td>
                    <td className="p-4 text-stone-500">{cust.email}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                        <span className="material-symbols-outlined text-[12px]">phone_iphone</span>
                        Theo SĐT
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-primary">
                      {cust.points} pts
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-stone-900">
                      {cust.totalSpent.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        cust.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cust.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onShowToast?.(`Đã gửi mã thưởng 50 điểm tới ${cust.name}!`)}
                          className="text-primary font-bold hover:underline"
                        >
                          Cộng điểm
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => handleToggleStatus(cust.id)}
                          className={`font-semibold hover:underline ${
                            cust.status === 'ACTIVE' ? 'text-rose-600' : 'text-emerald-700'
                          }`}
                        >
                          {cust.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Add Customer */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h3 className="font-bold text-base text-stone-900">Thêm mới thành viên Aura Café</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-stone-700 p-1">✕</button>
              </div>

              <form onSubmit={handleAddCustomer} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Họ và tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    placeholder="VD: Nguyễn Thị Lan"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Số điện thoại *</label>
                    <input
                      type="text"
                      required
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="0988xxxxxx"
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Điểm tặng khởi tạo</label>
                    <input
                      type="number"
                      min={0}
                      value={newCustomer.initialPoints}
                      onChange={(e) => setNewCustomer({ ...newCustomer, initialPoints: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary font-mono text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    placeholder="lan.nguyen@gmail.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-amber-600 text-white font-bold"
                  >
                    Lưu thành viên
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
