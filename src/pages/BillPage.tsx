import React, { useState } from 'react';
import { PageRoute } from '../types';

interface BillPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const BillPage: React.FC<BillPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedBillId, setSelectedBillId] = useState('AUR-89241');

  const bills = [
    {
      id: 'AUR-89241',
      date: '24/10/2026 09:45',
      type: 'ONLINE',
      typeLabel: 'Giao hàng tận nơi (Online)',
      customerName: 'Nguyễn Văn An',
      phone: '0908 123 456',
      address: 'Phòng 402, Tòa nhà Techcombank, Hà Nội',
      cashier: 'Hệ thống Online',
      shipper: 'Đỗ Văn Hùng (DX-902)',
      paymentMethod: 'VietQR (Đã thanh toán)',
      table: null,
      items: [
        { name: 'Cà phê Muối Aura Đặc Biệt', size: 'Size L', note: '+Kem béo mặn', qty: 2, price: 55000, subtotal: 110000 },
        { name: 'Trà Sen Vàng Hạt Sen', size: 'Size M', note: 'Ít đá, 50% đường', qty: 1, price: 49000, subtotal: 49000 },
        { name: 'Bánh Croissant Bơ Pháp', size: 'Tiêu chuẩn', note: 'Nướng nóng', qty: 1, price: 35000, subtotal: 35000 }
      ],
      totalAmount: 194000,
      discountPoints: 20000,
      deliveryFee: 15000,
      finalAmount: 189000
    },
    {
      id: 'AUR-88210',
      date: '24/10/2026 10:15',
      type: 'DINE_IN',
      typeLabel: 'Dùng tại quán (Dine-in)',
      customerName: 'Khách vãng lai',
      phone: '0988 234 891',
      address: null,
      cashier: 'Trần Mai Ly (Thu ngân 02)',
      shipper: null,
      paymentMethod: 'Tiền mặt (CASH)',
      table: 'Bàn T-04',
      items: [
        { name: 'Caramel Macchiato Đặc Sản', size: 'Size L', note: 'Thêm sốt caramel', qty: 1, price: 65000, subtotal: 65000 },
        { name: 'Bánh Cheesecake Việt Quất', size: '1 Phần', note: '', qty: 1, price: 55000, subtotal: 55000 }
      ],
      totalAmount: 120000,
      discountPoints: 0,
      deliveryFee: 0,
      finalAmount: 120000
    }
  ];

  const currentBill = bills.find(b => b.id === selectedBillId) || bills[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Top Control Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('orders')}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              title="Quay lại danh sách đơn"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Screen 10 • UC14</span>
              <h1 className="text-lg font-black text-stone-900">Chi Tiết Hóa Đơn (Bill Screen)</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedBillId}
              onChange={(e) => setSelectedBillId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-primary"
            >
              {bills.map(b => (
                <option key={b.id} value={b.id}>{b.id} - {b.typeLabel}</option>
              ))}
            </select>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-amber-600 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              In hóa đơn
            </button>
            <button
              onClick={() => onShowToast?.('Đã tải hóa đơn điện tử định dạng PDF thành công!')}
              className="px-3.5 py-1.5 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-stone-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Tải PDF
            </button>
          </div>
        </div>

        {/* Printable Receipt Canvas */}
        <div className="bg-white rounded-3xl border border-stone-300 shadow-lg p-6 sm:p-10 max-w-xl mx-auto font-sans relative overflow-hidden">
          {/* Top Notch Decorative Header */}
          <div className="text-center space-y-1.5 pb-6 border-b-2 border-dashed border-stone-200">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-primary text-white flex items-center justify-center font-black shadow-xs mb-2">
              <span className="material-symbols-outlined text-2xl">local_cafe</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">AURA CAFÉ ROASTERY</h2>
            <p className="text-xs text-stone-500 font-medium">28 Phố Tràng Tiền, Quận Hoàn Kiếm, Hà Nội</p>
            <p className="text-xs text-stone-500 font-mono">Hotline: 1900 6868 • MST: 0108992345</p>
            <div className="inline-block mt-2 px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-700 uppercase tracking-widest">
              HÓA ĐƠN THANH TOÁN (BILL)
            </div>
          </div>

          {/* Bill Meta Data */}
          <div className="grid grid-cols-2 gap-2 text-xs py-5 border-b border-stone-100 text-stone-600">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Mã Hóa Đơn:</span>
              <strong className="text-stone-900 font-mono text-sm">{currentBill.id}</strong>
            </div>
            <div className="text-right">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Thời Gian Xuất:</span>
              <strong className="text-stone-800 font-mono">{currentBill.date}</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Khách Hàng:</span>
              <span className="text-stone-800 font-semibold">{currentBill.customerName}</span>
              {currentBill.phone && <span className="block font-mono text-[11px] text-stone-500">{currentBill.phone}</span>}
            </div>
            <div className="text-right">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Hình Thức:</span>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                {currentBill.typeLabel}
              </span>
            </div>
            {currentBill.table && (
              <div className="col-span-2 pt-1">
                <span className="text-stone-400 text-[10px] uppercase font-bold mr-2">Vị trí ngồi:</span>
                <strong className="text-primary font-bold text-xs">{currentBill.table}</strong>
              </div>
            )}
            {currentBill.address && (
              <div className="col-span-2 pt-1 text-[11px]">
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Địa chỉ nhận hàng:</span>
                <span className="text-stone-700">{currentBill.address}</span>
              </div>
            )}
            <div className="col-span-2 pt-2 border-t border-stone-50 flex justify-between text-[11px] text-stone-500">
              <span>Thu ngân / Phụ trách: <strong>{currentBill.cashier}</strong></span>
              {currentBill.shipper && <span>Tài xế: <strong>{currentBill.shipper}</strong></span>}
            </div>
          </div>

          {/* Items Table */}
          <div className="py-4 border-b-2 border-dashed border-stone-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-stone-400 text-[10px] uppercase font-bold border-b border-stone-100">
                  <th className="text-left pb-2">Món / Quy cách</th>
                  <th className="text-center pb-2 w-10">SL</th>
                  <th className="text-right pb-2 w-20">Đơn giá</th>
                  <th className="text-right pb-2 w-24">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {currentBill.items.map((item, idx) => (
                  <tr key={idx} className="py-2.5">
                    <td className="py-2 pr-2">
                      <strong className="text-stone-900 block">{item.name}</strong>
                      <span className="text-[10px] text-stone-400">{item.size}{item.note ? ` • ${item.note}` : ''}</span>
                    </td>
                    <td className="py-2 text-center font-mono font-bold text-stone-800">{item.qty}</td>
                    <td className="py-2 text-right font-mono text-stone-600">{item.price.toLocaleString('vi-VN')}₫</td>
                    <td className="py-2 text-right font-mono font-bold text-stone-900">{item.subtotal.toLocaleString('vi-VN')}₫</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Summary */}
          <div className="py-4 border-b-2 border-dashed border-stone-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Tổng tiền món:</span>
              <span className="font-mono">{currentBill.totalAmount.toLocaleString('vi-VN')}₫</span>
            </div>
            {currentBill.discountPoints > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Điểm thưởng Aura cấn trừ:</span>
                <span className="font-mono">-{currentBill.discountPoints.toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            {currentBill.deliveryFee > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Phí giao hàng:</span>
                <span className="font-mono">+{currentBill.deliveryFee.toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-stone-100 text-stone-900">
              <div>
                <strong className="text-sm">TỔNG THANH TOÁN:</strong>
                <span className="block text-[10px] text-stone-400 font-normal">Đã bao gồm VAT 8%</span>
              </div>
              <strong className="text-xl font-mono text-primary font-black">
                {currentBill.finalAmount.toLocaleString('vi-VN')}₫
              </strong>
            </div>
          </div>

          {/* Payment Method & QR Verification */}
          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="space-y-1 text-center sm:text-left">
              <p>Phương thức: <strong className="text-stone-800">{currentBill.paymentMethod}</strong></p>
              <p className="text-[11px] text-emerald-700 font-bold flex items-center justify-center sm:justify-start gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Giao dịch hợp lệ & Đã ghi nhận hệ thống
              </p>
              <p className="text-[10px] text-stone-400 pt-1">Cảm ơn Quý khách đã ghé thăm Aura Café!</p>
            </div>
            {/* Visual Barcode / QR Simulation */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-20 h-20 bg-stone-50 border border-stone-200 rounded-xl p-1 flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://auracafe.vn/bill/${currentBill.id}`}
                  alt="Bill QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] font-mono text-stone-400 mt-1">Quét tra cứu hóa đơn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
