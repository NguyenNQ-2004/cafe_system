import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { PosHeader } from './PosHeader';

interface PosHandoverPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const PosHandoverPage: React.FC<PosHandoverPageProps> = ({ onNavigate, onShowToast }) => {
  const [pinGiver, setPinGiver] = useState('');
  const [pinReceiver, setPinReceiver] = useState('');
  const [showPinGiver, setShowPinGiver] = useState(false);
  const [showPinReceiver, setShowPinReceiver] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  // Hardware checklist
  const [hardwareChecks, setHardwareChecks] = useState([
    { id: 'pos', name: 'Máy POS cảm ứng trung tâm', status: 'Tốt • Đã lau sạch', note: 'Màn hình không vết xước, phản hồi cảm ứng mượt mà', checked: true },
    { id: 'printer', name: 'Máy in hóa đơn nhiệt K80', status: '5 Cuộn dự phòng', note: 'Dao cắt tự động bén, đầu in nhiệt rõ nét. Đã kiểm tra sẵn 5 cuộn giấy', checked: true },
    { id: 'scanner', name: 'Máy quét Barcode / QR 2D', status: 'Hoạt động nhạy', note: 'Đọc nhanh mã VNPAY, MoMo và thẻ thành viên Aura Member', checked: true },
    { id: 'edc', name: 'Thiết bị quẹt thẻ ngân hàng POS (EDC)', status: 'Đã kết toán Settlement', note: 'Pin 95%, đã bấm Settlement Ca sáng, bill chốt thẻ đính kèm', checked: true },
    { id: 'drawer', name: 'Ngăn kéo đựng tiền tự động (Cash Drawer)', status: 'Khóa & Bật nảy tốt', note: 'Nảy mở tự động khi in bill, chìa khóa treo đúng móc bảo mật', checked: true },
  ]);

  const handleToggleCheck = (index: number) => {
    const next = [...hardwareChecks];
    next[index].checked = !next[index].checked;
    setHardwareChecks(next);
  };

  const handleSubmitHandover = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinGiver.length < 4) {
      onShowToast?.('Vui lòng nhập đủ 4 số PIN của Người bàn giao (Trần Mai Ly).');
      return;
    }
    if (pinReceiver.length < 4) {
      onShowToast?.('Vui lòng nhập đủ 4 số PIN của Người tiếp nhận (Lê Hoàng Nam).');
      return;
    }
    if (!agreeTerms) {
      onShowToast?.('Vui lòng xác nhận đồng thuận kiểm đếm hiện vật giữa hai bên.');
      return;
    }

    setIsSuccessDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
      <PosHeader currentRoute="pos-handover" onNavigate={onNavigate} onShowToast={onShowToast} />

      <div className="w-full px-4 sm:px-6 py-4 space-y-4">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[28px]">assignment_turned_in</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                  Hệ thống bàn giao POS
                </span>
                <span className="text-stone-300">•</span>
                <span className="px-2 py-0.5 rounded-lg bg-stone-100 font-mono text-xs font-bold text-stone-800">
                  #HG-20241024-S01
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Sẵn sàng ký duyệt
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
                Biên bản Bàn giao Ca làm việc
              </h1>
              <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5 flex-wrap">
                <span>Chi nhánh 01 Tràng Tiền</span>
                <span>•</span>
                <span>Thứ Năm, 24/10/2024</span>
                <span>•</span>
                <span className="font-mono">Thời điểm lập: 14:28:40</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              onClick={() => onShowToast?.('Đang gửi lệnh in biên bản bàn giao #HG-20241024-S01 tới máy in nhiệt K80...')}
              className="h-9 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 border border-stone-200"
            >
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              <span>In biên bản K80</span>
            </button>
            <button
              onClick={() => onShowToast?.('Đang xuất file PDF biên bản đối soát ca có chữ ký điện tử...')}
              className="h-9 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 border border-stone-200"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>Xuất PDF</span>
            </button>
            <button
              onClick={() => onNavigate('pos-shift')}
              className="h-9 px-3.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Quay lại</span>
            </button>
          </div>
        </div>

        {/* 3 Parties Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bên bàn giao */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px] uppercase">
                  Bên bàn giao (Ca Sáng)
                </span>
                <span className="material-symbols-outlined text-primary text-[20px]">outbox</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  ML
                </div>
                <div>
                  <p className="font-bold text-base text-stone-900">Trần Mai Ly</p>
                  <p className="text-xs text-stone-500 font-mono">Mã NV: NV-8821</p>
                </div>
              </div>
              <div className="mt-3 bg-stone-50 p-3 rounded-xl border border-stone-200/60 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Ca trực:</span>
                  <span className="font-semibold text-stone-900">06:30 - 14:30 (8 giờ)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Vị trí:</span>
                  <span className="font-semibold text-stone-900">Trạm POS Quầy chính 02</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Đã chốt sổ ca & kiểm đếm két</span>
            </div>
          </div>

          {/* Bên tiếp nhận */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[10px] uppercase">
                  Bên tiếp nhận (Ca Chiều)
                </span>
                <span className="material-symbols-outlined text-blue-600 text-[20px]">move_to_inbox</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  HN
                </div>
                <div>
                  <p className="font-bold text-base text-stone-900">Lê Hoàng Nam</p>
                  <p className="text-xs text-stone-500 font-mono">Mã NV: NV-7603</p>
                </div>
              </div>
              <div className="mt-3 bg-stone-50 p-3 rounded-xl border border-stone-200/60 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Ca trực:</span>
                  <span className="font-semibold text-stone-900">14:30 - 22:30 (8 giờ)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Trạng thái:</span>
                  <span className="font-semibold text-primary">Sẵn sàng nhận trạm</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-stone-600 text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>Đã có mặt đối chiếu hiện vật</span>
            </div>
          </div>

          {/* Người giám sát */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-600" />
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-bold text-[10px] uppercase">
                  Giám sát / Cửa hàng trưởng
                </span>
                <span className="material-symbols-outlined text-amber-700 text-[20px]">shield_person</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  QB
                </div>
                <div>
                  <p className="font-bold text-base text-stone-900">Phạm Quốc Bảo</p>
                  <p className="text-xs text-stone-500">Store Supervisor (SM-0041)</p>
                </div>
              </div>
              <div className="mt-3 bg-stone-50 p-3 rounded-xl border border-stone-200/60 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Mã quản lý:</span>
                  <span className="font-semibold text-stone-900">SM-0041</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Nhiệm vụ:</span>
                  <span className="font-semibold text-stone-900">Chứng thực & Niêm phong két</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              <span>Giám sát trực tiếp tại quầy</span>
            </div>
          </div>
        </div>

        {/* 2 Columns: Handover Breakdown & PIN Signature */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Left Column: Breakdown (7 cols) */}
          <div className="xl:col-span-7 space-y-4">
            {/* Section 1: Tài chính */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  </div>
                  <h3 className="font-bold text-sm text-stone-900">
                    1. Bàn giao Tài chính & Tiền mặt trong két
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Khớp 100%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block">Tiền thối để lại Ca sau:</span>
                  <p className="text-xl font-black text-primary font-mono mt-0.5">1.500.000₫</p>
                  <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Đúng định mức cơ số két chuẩn
                  </span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block">Doanh thu nộp két an toàn (Safe Drop):</span>
                  <p className="text-xl font-black text-stone-900 font-mono mt-0.5">3.420.000₫</p>
                  <span className="text-[11px] text-stone-500 mt-1 inline-flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px]">archive</span>
                    Túi seal #SD-8821-01
                  </span>
                </div>
              </div>

              {/* Tally table */}
              <div className="overflow-x-auto rounded-xl border border-stone-200 text-xs">
                <table className="w-full text-left font-mono">
                  <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] border-b border-stone-200 font-sans font-bold">
                    <tr>
                      <th className="py-2 px-3">Mệnh giá</th>
                      <th className="py-2 px-3 text-center">Số lượng</th>
                      <th className="py-2 px-3 text-right">Thành tiền</th>
                      <th className="py-2 px-3 text-center font-sans">Kiểm nhận ca sau</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="py-2 px-3 font-semibold text-stone-900 font-mono">200.000₫</td>
                      <td className="py-2 px-3 text-center">2 tờ</td>
                      <td className="py-2 px-3 text-right">400.000₫</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-stone-900 font-mono">100.000₫</td>
                      <td className="py-2 px-3 text-center">5 tờ</td>
                      <td className="py-2 px-3 text-right">500.000₫</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-stone-900 font-mono">50.000₫</td>
                      <td className="py-2 px-3 text-center">6 tờ</td>
                      <td className="py-2 px-3 text-right">300.000₫</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-stone-900 font-mono">20.000₫</td>
                      <td className="py-2 px-3 text-center">10 tờ</td>
                      <td className="py-2 px-3 text-right">200.000₫</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-stone-900 font-mono">10.000₫</td>
                      <td className="py-2 px-3 text-center">10 tờ</td>
                      <td className="py-2 px-3 text-right">100.000₫</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✓</td>
                    </tr>
                    <tr className="bg-stone-50 font-bold font-sans">
                      <td className="py-2.5 px-3 uppercase text-stone-800" colSpan={2}>
                        Tổng cộng tiền trong két để lại
                      </td>
                      <td className="py-2.5 px-3 text-right text-primary font-mono text-sm">
                        1.500.000₫
                      </td>
                      <td className="py-2.5 px-3 text-center text-emerald-700 text-[10px]">Đã đủ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Thiết bị quầy */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">devices</span>
                  </div>
                  <h3 className="font-bold text-sm text-stone-900">
                    2. Bàn giao Thiết bị & Vật tư Quầy
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">
                  5/5 Hạng mục đạt
                </span>
              </div>

              <div className="space-y-2">
                {hardwareChecks.map((item, idx) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/60 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleCheck(idx)}
                      className="accent-primary w-4 h-4 rounded mt-0.5"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-stone-900">{item.name}</span>
                        <span className="px-2 py-0.5 rounded bg-white text-emerald-700 font-semibold text-[10px] border border-stone-200">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-stone-500 mt-0.5 text-[11px]">{item.note}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: PIN Authorization (5 cols) */}
          <div className="xl:col-span-5 space-y-4">
            {/* Section 3: Lưu ý ca */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700">
                  3. Tình trạng Đơn & Lưu ý ca
                </h4>
                <span className="material-symbols-outlined text-stone-400 text-[18px]">info</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px]">Đơn nợ trả khách:</span>
                  <span className="text-lg font-bold text-emerald-700 font-mono">0 đơn</span>
                  <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Đã phục vụ 100%
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px]">Thẻ rung Buzzer:</span>
                  <span className="text-lg font-bold text-primary font-mono">20/20 thẻ</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">Đầy đủ dock sạc</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1 text-xs">
                <span className="font-bold text-stone-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">edit_note</span>
                  Ghi chú ca sáng:
                </span>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  "Đá viên dự trữ đầy đủ, voucher chương trình Chào Thu đã phát hết 50 tờ, nguyên liệu sữa tươi đóng mở ca trước 13:00."
                </p>
              </div>
            </div>

            {/* Section 4: Dual PIN Authentication */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">fingerprint</span>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">
                      Chữ ký số & Xác nhận PIN đôi
                    </h3>
                    <p className="text-[10px] text-stone-500">Xác thực đồng thời PIN của 2 thu ngân</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-stone-400 text-[18px]">security</span>
              </div>

              <form onSubmit={handleSubmitHandover} className="space-y-3.5 text-xs">
                {/* Giver PIN */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-800">
                      Mã PIN Người giao: <strong className="text-primary font-bold">Trần Mai Ly</strong>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {pinGiver.length === 4 ? '✓ Đã nhập 4 số' : 'Chờ 4 số'}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPinGiver ? 'text' : 'password'}
                      maxLength={4}
                      value={pinGiver}
                      onChange={e => setPinGiver(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-full h-11 bg-white border border-stone-300 rounded-xl text-center font-mono text-xl tracking-[0.4em] font-bold focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPinGiver(!showPinGiver)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPinGiver ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Receiver PIN */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-800">
                      Mã PIN Người nhận: <strong className="text-blue-700 font-bold">Lê Hoàng Nam</strong>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {pinReceiver.length === 4 ? '✓ Đã nhập 4 số' : 'Chờ 4 số'}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPinReceiver ? 'text' : 'password'}
                      maxLength={4}
                      value={pinReceiver}
                      onChange={e => setPinReceiver(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-full h-11 bg-white border border-stone-300 rounded-xl text-center font-mono text-xl tracking-[0.4em] font-bold focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPinReceiver(!showPinReceiver)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPinReceiver ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    className="accent-primary w-4 h-4 rounded mt-0.5"
                  />
                  <span className="text-[11px] text-stone-600 leading-snug">
                    Hai bên đã cùng kiểm đếm hiện vật thực tế, đối soát số liệu và chịu trách nhiệm hoàn toàn về tính chính xác của biên bản bàn giao này.
                  </span>
                </label>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                    <span>XÁC NHẬN BÀN GIAO & ĐÓNG CA THÀNH CÔNG</span>
                  </button>
                  <p className="text-[10px] text-stone-400 text-center mt-2">
                    Hệ thống tự động kích hoạt phiên làm việc mới cho Ca Chiều
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>

            <div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Biên bản #HG-20241024-S01
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-2">Bàn giao ca thành công!</h3>
              <p className="text-xs text-stone-500 mt-1">
                Ca sáng của <strong>Trần Mai Ly</strong> đã được khóa bảo mật. Đã mở phiên giao dịch mới cho thu ngân <strong>Lê Hoàng Nam</strong>.
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl text-left text-xs space-y-1.5 border border-stone-200">
              <div className="flex justify-between">
                <span className="text-stone-500">Doanh thu nộp két an toàn:</span>
                <span className="font-bold text-stone-900 font-mono">3.420.000₫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Cơ số tiền thối để lại:</span>
                <span className="font-bold text-primary font-mono">1.500.000₫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Máy in nhiệt K80:</span>
                <span className="text-emerald-700 font-semibold">Đã xuất lệnh in 02 liên</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsSuccessDialogOpen(false);
                  onNavigate('pos-create');
                }}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-primary-container"
              >
                Bắt đầu phiên làm việc Ca Chiều
              </button>
              <button
                onClick={() => {
                  onShowToast?.('Đang in thêm bản sao lưu trữ biên bản bàn giao...');
                }}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>In thêm bản sao lưu trữ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
