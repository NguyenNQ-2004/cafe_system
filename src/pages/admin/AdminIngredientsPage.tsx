import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { AdminSidebar } from './AdminSidebar';

interface AdminIngredientsPageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const AdminIngredientsPage: React.FC<AdminIngredientsPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedSku, setSelectedSku] = useState<string | null>(null);

  const ingredients = [
    {
      sku: 'ING-CF-001',
      name: 'Cà phê hạt Arabica Cầu Đất (Rang vừa)',
      desc: 'Độ ẩm ≤ 12.5% • Niên vụ 2024',
      cat: 'Hạt Cà Phê',
      package: 'Túi 1kg có van 1 chiều (Thùng 10 túi)',
      storage: '18°C - 24°C khô ráo',
      supplier: 'Đắk Lắk Farm Co-op',
      supplierCert: 'HACCP #DL-2023',
      price: 280000,
      min: '25kg',
      current: '62kg',
      max: '100kg',
      pct: 62,
      bomCount: '8 món',
      status: 'Đang cấp hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXMEwaqMmOacLvNaczTjQGxC7B9zqxIcqmlWfaPcZ0XuZECv3f2tIg5VbR5sj6yp4r1F3OmcaxLDFuJhlxT1ZddHcxyr6g02cxukoA5G0VMH1SGCMLYEBzIIWTgTje_5ucZo8W5ryTD74bPZQz6dFin_mlRbiJcjSIzT-mO1F3mfN__nt8BaeQ8cbTGDlhvybSX7lxaR8ygP8FSsfJo9s9UEes8sV1FzdXxF-EDW6-brJzMiJfRcp8'
    },
    {
      sku: 'ING-CF-002',
      name: 'Cà phê hạt Robusta Pleiku (Rang đậm)',
      desc: 'Sàng 18 • Hạt mộc không tẩm bơ',
      cat: 'Hạt Cà Phê',
      package: 'Bao 5kg hút chân không (Kiện 30kg)',
      storage: '18°C - 24°C khô ráo',
      supplier: 'Gia Lai Specialty Roastery',
      supplierCert: 'ISO 22000',
      price: 140000,
      min: '30kg',
      current: '110kg',
      max: '150kg',
      pct: 73,
      bomCount: '12 món',
      status: 'Đang cấp hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnaSpG3VDiCWeQkGbuk5eU-VbMvrtXaRcdiieik7V-J5x24ZjtF0cKRi70dn2kgxkSrRr6cNo_Ke9qbCEJweAKe2GjQQXW0n1xZ5i05sTaWo9uLslik4SMThu-r6XTh5z_1VkbnwPH2Py3KlqTyWIbxt1ew-W670BL9g0A7QF46b6WFQ5-2OkoK1bSrlrFyoutDOCfOzcz4f1fjkfuvKMQGJTRw3k_0CoHp__IbZIbOUiefKgy-utt'
    },
    {
      sku: 'ING-MLK-001',
      name: 'Sữa đặc có đường Ông Thọ đỏ',
      desc: 'Độ ngọt chuẩn • Lon thiếc nắp bật',
      cat: 'Sữa & Kem',
      package: 'Lon 380g (Thùng 48 lon)',
      storage: 'Nhiệt độ phòng',
      supplier: 'Vinamilk Official Hub',
      supplierCert: 'Trực tiếp nhà máy',
      price: 24500,
      min: '50 lon',
      current: '120 lon',
      max: '200 lon',
      pct: 60,
      bomCount: '15 món',
      status: 'Đang cấp hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJog59_us3w04BLsyqVNOF9A-21cuRsvxYfEhGMPAgUqyxAygNGlYa9jxPRElt6T7KbKYl1gllItr130YPrEQaMIrgXjmUiFbKubShqKejgffjgpOiWyUBw-YXgHGLhh_CSgvwOJfDYyz2udB2sLR96cOtFBVk3PiBr5_6CAo-SU7bxS1fZWedJsKHAS6t0VbIxBlqjvYNTNeEFRQt2AUTBm_YmKzGWSMcaj-M5uCzBvfat50R6lIv'
    },
    {
      sku: 'ING-MLK-004',
      name: 'Sữa tươi nguyên kem Barista Grade',
      desc: 'Hàm lượng béo 3.8% • Chuẩn latte art',
      cat: 'Sữa & Kem',
      package: 'Hộp 1L Tetra Pak (Thùng 12 hộp)',
      storage: '2°C - 4°C tủ mát',
      supplier: 'Dalat Milk Supply',
      supplierCert: 'Kho lạnh chuyên dụng',
      price: 35000,
      min: '40 hộp',
      current: '38 hộp',
      max: '180 hộp',
      pct: 21,
      bomCount: '22 món',
      status: 'Cần nhập thêm',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF1z0ZTbBchH8RlEaiPpPD8WSWQFiXWv3jJRsZXK4jNAXvO1H2rYsSYESoNRkzxkZY8VVXH2i8HzR2CkE2Ei7ny8bpvSbXR7_qLGiQuWLjkpnPZAeewSogJ3NoRYhTfei8LIFUFSHmR3muXZz1-9WoR5uuc_afpk7d_tieo0elPbMluGatZnVeoX51b2AfsMZLPCm4N1dSiYmEFQxBZP1AJdPy6hlRDESaMpFJn-hfA3mZ6-SOGgz2'
    },
    {
      sku: 'ING-TEA-002',
      name: 'Trà Ô Long Búp Lộc Xanh',
      desc: 'Lên men 35% • Hương hoa ngọc lan',
      cat: 'Trà Thảo Mộc',
      package: 'Túi thiếc 500g (Thùng 20 túi)',
      storage: 'Khô thoáng < 65% RH',
      supplier: 'Bảo Lộc Tea JSC',
      supplierCert: 'VietGAP chuẩn',
      price: 450000,
      min: '10kg',
      current: '24kg',
      max: '50kg',
      pct: 48,
      bomCount: '6 món',
      status: 'Đang cấp hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhmX25Vnx6U1SE7NkCfgVl1DPawjmtLNZmNYIv3uyQn5HTS86a3wQPKFHH4in1I65czBzqT_KZSnXSYcxJbccpGU3_kB7ACN5B63_g6sTxMGv8YjeVqmlsGuJfWCd5c5RkvDx6PzPRqRAgHoqRphMJKsAZqqOO1D4fwJtrm-hV2aerOaZFGfJ8OPdes10weDKmJjllBU8UWueFEA7yZ3v_R_8fzN4Pv0-mERLXmG8RwvbFeVPTdQwv'
    },
    {
      sku: 'ING-PAC-005',
      name: 'Ly giấy Take-away 16oz Aura Signature',
      desc: 'Tráng 2 lớp PE nhiệt • Dung tích 500ml',
      cat: 'Bao Bì Vật Tư',
      package: 'Thùng 1.000 cái',
      storage: 'Khô ráo sạch',
      supplier: 'Bao Bì Xanh Toàn Cầu',
      supplierCert: 'Hợp đồng 2024',
      price: 1200,
      min: '500 cái',
      current: '1.850 cái',
      max: '3.000 cái',
      pct: 61,
      bomCount: 'Tất cả món lạnh',
      status: 'Đang cấp hàng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNql4ZlvwjSK4kzSaRLdWMEj8U4SZryAB1wCSrjm3OO587yRPDxXXUYYVfBjzHnRwIkflxxQCYwsEXMpfuAndVQLz5Bsn7u-xOGNlaO2ICSTSYF-WOj2av7RaE3fdkMtTik1cjkZiZ_7k3_NJz0zM1HoXKHdthaBIE_tUzym6aKfmnMMoUC3WNWttTKUefbcWz6nZmv-noEjEDUEM6JtvvsE___BrAMGjRwXkMyKXGzFJfASRzreNG'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row pb-12">
      <AdminSidebar currentRoute="admin-ingredients" onNavigate={onNavigate} onShowToast={onShowToast} />

      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Kho Hàng & Nguyên Liệu</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary font-bold">Màn hình 24: Định mức & Quản trị nguyên liệu (BOM Master)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-3">
                Quản Lý Nguyên Vật Liệu & Nhà Cung Cấp
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-mono text-xs">
                  68 SKU Active
                </span>
              </h1>
              <p className="text-xs text-stone-500 max-w-4xl">
                Quản trị chi tiết danh mục 68 nguyên liệu pha chế, thông số bảo quản kho mát/khô, quy cách đóng gói, định mức an toàn tồn kho và liên kết trực tiếp với nhà cung ứng chuẩn HACCP.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={() => onShowToast?.('Đang kết xuất danh mục 68 nguyên liệu ra file Excel...')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>Xuất danh mục Excel</span>
              </button>
              <button
                onClick={() => onShowToast?.('Đã mở công cụ cập nhật ngưỡng Min - Max tự động theo mùa vụ')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">rule_settings</span>
                <span>Cập nhật Min-Max loạt</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSku('ING-CF-001');
                }}
                className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Nhập nguyên liệu mới</span>
              </button>
            </div>
          </div>

          {/* 4 KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-stone-100 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Tổng SKU Nguyên Liệu</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">68</span>
              <span className="text-[11px] text-primary font-bold">100% ERP Tag</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Nhà Cung Ứng Đối Tác</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">12</span>
              <span className="text-[11px] text-emerald-700 font-semibold">100% ISO & HACCP</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Đơn Vị Tính Chuẩn Hóa</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">06 UOM</span>
              <span className="text-[11px] text-stone-500">kg, lon, hộp 1L, lít, túi, cái</span>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
              <span className="text-[10px] uppercase font-bold block text-rose-600">Cảnh Báo HSD (&lt; 15 Ngày)</span>
              <span className="text-xl font-black font-mono block text-rose-700">03 lô</span>
              <span className="text-[11px] font-bold text-rose-700">Ưu tiên xuất FIFO</span>
            </div>
          </div>
        </div>

        {/* Ingredients Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Mã SKU</th>
                  <th className="py-2.5 px-3">Tên Nguyên Vật Liệu</th>
                  <th className="py-2.5 px-3">Nhóm Ngành</th>
                  <th className="py-2.5 px-3">Quy Cách & ĐVT</th>
                  <th className="py-2.5 px-3">Bảo Quản Chuẩn</th>
                  <th className="py-2.5 px-3">Nhà Cung Cấp</th>
                  <th className="py-2.5 px-3 text-right">Giá Mua Gần Nhất</th>
                  <th className="py-2.5 px-3 text-center">Định Mức (Min - Max)</th>
                  <th className="py-2.5 px-3 text-center">BOM Recipe</th>
                  <th className="py-2.5 px-3 text-center">Trạng Thái</th>
                  <th className="py-2.5 px-3 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {ingredients.map(ing => (
                  <tr
                    key={ing.sku}
                    onClick={() => setSelectedSku(ing.sku)}
                    className="hover:bg-stone-50 cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-bold text-primary">{ing.sku}</td>
                    <td className="py-2.5 px-3 font-sans">
                      <div className="flex items-center gap-2">
                        <img src={ing.image} alt={ing.name} className="w-8 h-8 rounded-lg object-cover bg-stone-100" />
                        <div>
                          <strong className="text-stone-900 block text-xs">{ing.name}</strong>
                          <span className="text-[10px] text-stone-400">{ing.desc}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px]">
                        {ing.cat}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-stone-600 text-[11px]">{ing.package}</td>
                    <td className="py-2.5 px-3 font-sans text-stone-600 text-[11px]">{ing.storage}</td>
                    <td className="py-2.5 px-3 font-sans">
                      <strong className="text-stone-800 block text-xs">{ing.supplier}</strong>
                      <span className="text-[10px] text-emerald-700 font-bold">{ing.supplierCert}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-stone-900">
                      {ing.price.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-stone-400">
                          <span>{ing.min}</span>
                          <strong className="text-stone-800">{ing.current}</strong>
                          <span>{ing.max}</span>
                        </div>
                        <div className="w-24 bg-stone-200 h-1 rounded-full overflow-hidden mx-auto">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${ing.pct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans font-semibold text-stone-700">
                      {ing.bomCount}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ing.status === 'Cần nhập thêm'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {ing.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-sans" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedSku(ing.sku)}
                        className="p-1 hover:text-primary rounded text-stone-500"
                        title="Xem chi tiết"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Bottom Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center justify-between">
              <span>Phân Bổ Điều Kiện Lưu Trữ</span>
              <span className="material-symbols-outlined text-[18px] text-stone-400">thermostat</span>
            </h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Khô ráo (18°C - 24°C)</span>
                  <strong className="font-mono">42 SKU (61.7%)</strong>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full" style={{ width: '61.7%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Tủ mát (2°C - 4°C)</span>
                  <strong className="font-mono">18 SKU (26.5%)</strong>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: '26.5%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Đông lạnh (-18°C)</span>
                  <strong className="font-mono">8 SKU (11.8%)</strong>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-600 h-full" style={{ width: '11.8%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center justify-between">
              <span>Lô Hàng Cần Lưu Ý FIFO</span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">Cấp thiết</span>
            </h3>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex justify-between">
                <div>
                  <strong className="text-stone-900 block">Sữa tươi Barista Dalat Milk</strong>
                  <span className="text-stone-400 font-mono">LOT-DLM-2408 • 12 hộp</span>
                </div>
                <span className="text-rose-700 font-bold font-mono">Còn 4 ngày</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex justify-between">
                <div>
                  <strong className="text-stone-900 block">Syrup Hạt Dẻ Hazelnut 750ml</strong>
                  <span className="text-stone-400 font-mono">LOT-MONIN-889 • 3 chai</span>
                </div>
                <span className="text-amber-800 font-bold font-mono">Còn 9 ngày</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center justify-between">
              <span>Hiệu Suất Nhà Cung Cấp</span>
              <span className="material-symbols-outlined text-[18px] text-stone-400">handshake</span>
            </h3>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 bg-stone-50 rounded-xl flex justify-between">
                <span className="font-semibold text-stone-800">Đắk Lắk Farm Co-op</span>
                <strong className="text-emerald-700 font-mono">99.2% OTIF</strong>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl flex justify-between">
                <span className="font-semibold text-stone-800">Vinamilk Official Hub</span>
                <strong className="text-emerald-700 font-mono">98.5% OTIF</strong>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl flex justify-between">
                <span className="font-semibold text-stone-800">Dalat Milk Supply</span>
                <strong className="text-amber-800 font-mono">92.0% OTIF</strong>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Slide-over Specification Drawer */}
      {selectedSku && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white shadow-2xl h-full flex flex-col justify-between overflow-y-auto p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-xs font-bold">
                    #{selectedSku}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    HACCP Certified
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mt-1">Cà phê hạt Arabica Cầu Đất (Rang vừa)</h3>
                <p className="text-xs text-stone-500">Hồ sơ kỹ thuật nguyên liệu & Quy chuẩn chất lượng Aura Café</p>
              </div>
              <button
                onClick={() => setSelectedSku(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {/* Barcode & QC */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Mã vạch nội bộ & GS1 (8935002400192)
              </span>
              <div className="w-48 mx-auto flex items-center justify-center gap-[3px] h-10 bg-white p-2 rounded border border-stone-200">
                {[3,1,4,2,3,1,5,2,4,1,3,2,4,2,3,1,4,2,3,1,5,2,4,1,3,2].map((w, idx) => (
                  <div key={idx} className="bg-stone-900 h-full" style={{ width: `${w * 1.2}px` }} />
                ))}
              </div>
            </div>

            {/* Parameter specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Nhiệt độ tối ưu:</span>
                <strong className="text-stone-900">18°C - 24°C</strong>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Độ ẩm không khí:</span>
                <strong className="text-stone-900">≤ 60% RH</strong>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Hạn sử dụng:</span>
                <strong className="text-stone-900">12 Tháng</strong>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Dung sai định lượng:</span>
                <strong className="text-stone-900">± 0.5 gram / shot</strong>
              </div>
            </div>

            {/* Linked recipes */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-800 uppercase text-[10px] tracking-wider">
                Công thức pha chế sử dụng (8 Món)
              </h4>
              <div className="divide-y divide-stone-100 bg-stone-50 rounded-xl p-3 border border-stone-200">
                <div className="py-1.5 flex justify-between">
                  <span>Espresso Single Origin</span>
                  <strong className="font-mono text-stone-700">18g / shot</strong>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span>Americano Đá Đậm Vị</span>
                  <strong className="font-mono text-stone-700">20g / cup</strong>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span>Cà Phê Latte Nóng Signature</span>
                  <strong className="font-mono text-stone-700">18.5g / cup</strong>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span>Cold Brew Ủ Lạnh 24h</span>
                  <strong className="font-mono text-stone-700">80g / batch 1L</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedSku(null)}
                className="px-4 py-2 rounded-xl text-stone-600 font-semibold"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  onShowToast?.(`Đã lưu thay đổi thông số SKU #${selectedSku}`);
                  setSelectedSku(null);
                }}
                className="px-5 py-2 rounded-xl bg-primary text-white font-bold"
              >
                Chỉnh sửa thông số SKU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
