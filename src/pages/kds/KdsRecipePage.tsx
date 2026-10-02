import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { KdsHeader } from './KdsHeader';

interface KdsRecipePageProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast?: (msg: string) => void;
}

export const KdsRecipePage: React.FC<KdsRecipePageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedRecipeCode, setSelectedRecipeCode] = useState('RCP-CF-01');
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const recipeList = [
    {
      code: 'RCP-CF-01',
      sku: 'PRD-CF-009',
      title: 'Cà phê Muối Aura Đặc Biệt',
      desc: 'Cà phê cốt phin đậm đà phong vị truyền thống kết hợp tầng bọt sữa tươi và lớp Salt Cream béo mịn độc quyền của Aura.',
      time: '3 - 5 phút',
      level: 'Nâng cao',
      category: 'espresso',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2-fXGta_-J54WqKuT6atXLhklbSpaknBWiz6MOS64r9wUnaB7SRew1jGHMsqe7H6nVbGpL2kD8M-KNweKhIesMb4I-MRZ4d2fjV7d4BNfRbdpn-UEA0IyieAMeH8Yu_GxQCJysx0R3IOTAa2ahnMZ_I0RJtdjzYdQHpI4USZQHyhrTIuRusDY_n3_cilRMm7hpWB4eqKN2RqAerrd0KKRObvEoSGgGmcs6Y0H0AtQ8Niw8Z26XnAb'
    },
    {
      code: 'RCP-CF-02',
      sku: 'PRD-CF-012',
      title: 'Espresso Macchiato',
      desc: 'Chiết xuất espresso chuẩn Ý điểm xuyết một chấm bọt sữa tươi siêu mịn tạo vị đắng êm dịu.',
      time: '1 - 2 phút',
      level: 'Cơ bản',
      category: 'espresso',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBGwhpeOzJLkjcDkmKl2Q8-eJHzqJ8wL7JAXgupujSVSPb2S61uXJiLMdQTLeR1EMyybqidN-FH_-f2hxqC5izYr-apZBN-LCOfk1hDYug_ZxmLB3qqVmb-dvOqiiRb3hgCdZ5NO4gyJ7cHpsjLvCCkcn8Z2O53Si4SL_NdQ5jA0moCNqOQereMlZ854lCnySw8pPix3g79u4MFQMTd6L1nkRveDPGgks9nsdzWAZ1Ryo1IqW1PKLr'
    },
    {
      code: 'RCP-CB-05',
      sku: 'PRD-CB-005',
      title: 'Cold Brew Cam Quế',
      desc: 'Cà phê ủ lạnh 16 tiếng ngâm cùng cam sấy khô và quế thanh thảo mộc thơm mát.',
      time: '2 phút',
      level: 'Cơ bản',
      category: 'tea',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs7AWszLCbAqrMiMMyzzptFJmQ9YAS_xuTuivcoQLsCNMnJS3Nc_Jh72d--s1NJggG1sad1WwJ3dKmWyxuBFcogEdfEkv4Y3nI2d9ntphBD9Zw8i0GYyICIDNS142ZBYGMWMVSrFAqx8KlrWNAqWlRZCiDT8K6ESNkdJl23iuifsXg3Viy4AX8LwxXAAzO-UgLIolCAvweQhk5BuHMqjOV4AnJEahT1KRr0oQkpJpD68DM4Sj7dx67'
    },
    {
      code: 'RCP-TEA-08',
      sku: 'PRD-TEA-008',
      title: 'Trà Ô Long Sen Vàng Hạt Dẻ',
      desc: 'Trà ô long Thiết Quan Âm nướng hạt dẻ béo ngậy kèm hạt sen nấu đường phèn thanh dịu.',
      time: '4 phút',
      level: 'Nâng cao',
      category: 'tea',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjoAxLen_yS5SrUpB2BDm9eMWQArv4V9U8U9FSBhkX4gq5zWEbGMUPB_x6okNDQ9SjeV06KIIBjBdhxR6KSYvWv8Jp_qYpncw4dXdHDMe7to0v-xsQDQlg3JX8yz2U2IBupiq_dP2-EGjVkjRFJTmv3r4Yo4XUfesj4ZONr0pJudN5W8gQU_MkB1xxvRYOOl5Lq0b69a2_e5VQggUc-ZuvbSQFuB76naMq0M2pgBDABS5bpqk95xty'
    },
    {
      code: 'RCP-CF-04',
      sku: 'PRD-CF-004',
      title: 'Bạc Xỉu 3 Tầng',
      desc: 'Ba tầng hương vị: Sữa đặc ngọt dịu, sữa tươi thanh trùng béo thơm và cà phê phin sánh đậm.',
      time: '3 phút',
      level: 'Nâng cao',
      category: 'espresso',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvyCWE2oHyWudOTv6T32bZJKwatRkIYbxDotN824lcBm9ESZsR38my3kFf1MfkpsUqXFbo6bSg6J3jMOGwX0TjXhY6n2ODDJE4MEv3QJC_M9SpLfBan7BdWe_DRVVTTV-L4-RCp-emrUo64l1ps23ZZlKQfnvz3hbuvXL80VqQNBWujpugIJsWCGLZEzGNd2_M-qeQ0M_ZrlGTFbV8wnhfujyYgBJA5p9ZSbG1BUsVOp53uCyMVj9t'
    }
  ];

  const currentRecipe = recipeList.find(r => r.code === selectedRecipeCode) || recipeList[0];

  const bomIngredients = [
    { stt: '01', sku: 'ING-CF-002', name: 'Cốt Cà phê Phin đậm đặc', desc: 'Phối trộn Arabica Cầu Đất (60%) & Robusta Pleiku (40%)', dosage: '50 ml', tool: 'Ly đong Jigger chia vạch (25g bột cafe)', cost: '4.200 đ' },
    { stt: '02', sku: 'ING-MLK-001', name: 'Sữa đặc có đường Ông Thọ đỏ', desc: 'Lon chuyên dụng bảo quản lạnh 15°C', dosage: '25 ml', tool: 'Ca đong inox 30ml', cost: '1.450 đ' },
    { stt: '03', sku: 'ING-MLK-004', name: 'Sữa tươi tiệt trùng không đường', desc: 'Barista Grade - hàm lượng béo 3.5%', dosage: '15 ml', tool: 'Bơm định lượng Pump hoặc Jigger', cost: '600 đ' },
    { stt: '04', sku: 'ING-FOAM-007', name: 'Lớp Foam Kem Muối Hồng (Signature Salt Cream)', desc: 'Topping bằng ca đong bọt bồng bềnh', dosage: '40 ml', tool: 'Muỗng gạt bar chuyên dụng', cost: '5.100 đ' },
    { stt: '05', sku: 'ING-ICE-001', name: 'Đá bi tinh khiết làm mát', desc: 'Máy làm đá lọc thẩm thấu ngược RO', dosage: '180 g', tool: 'Xẻng xúc đá inox vừa vặn miệng ly', cost: '300 đ' },
    { stt: '06', sku: 'ING-SPICE-003', name: 'Muối hồng Himalaya mịn rắc mặt', desc: 'Trang trí Decor và cân bằng hậu vị', dosage: '0.5 g', tool: 'Hũ rắc gia vị 3 lỗ nhẹ tay', cost: '200 đ' },
  ];

  const filteredList = recipeList.filter(r => {
    const matchCat = categoryFilter === 'all' || r.category === categoryFilter;
    const matchQ = searchFilter.trim() === '' || r.title.toLowerCase().includes(searchFilter.toLowerCase()) || r.code.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-stone-50 pb-16 flex flex-col">
      <KdsHeader currentRoute="kds-recipe" onNavigate={onNavigate} onShowToast={onShowToast} />

      <div className="w-full px-4 sm:px-6 py-4 space-y-4">
        {/* Top Toolbar */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  DATABASE SOP v2.4
                </span>
                <span className="text-stone-400 text-xs font-mono">Đồng bộ ca: 08:30:14 Hôm nay</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
                Sổ tay Công thức Pha chế & Định lượng Kỹ thuật (SOP)
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={() => onShowToast?.('Đang tải file PDF Sổ tay SOP Barista 2024 (18 trang)...')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl flex items-center gap-1.5 border border-stone-200"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Tải sổ tay PDF SOP 2024</span>
              </button>
              <button
                onClick={() => onShowToast?.('Đã mở form đề xuất điều chỉnh định lượng tới Quản lý Barista.')}
                className="px-3.5 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Đề xuất chỉnh định lượng (+)</span>
              </button>
              <button
                onClick={() => onShowToast?.('Đã gửi thông báo cảnh báo hết nguyên liệu quầy tới bộ phận Kho!')}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl flex items-center gap-1.5 border border-rose-200"
              >
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span>Báo hết nguyên liệu tại quầy</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between pt-2 border-t border-stone-100">
            <div className="relative flex-1 max-w-xl">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Tìm theo tên đồ uống hoặc SKU nguyên liệu (ví dụ: 'Cà phê muối', 'Syrup hạt dẻ')..."
                className="w-full h-10 pl-9 pr-16 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-primary"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-stone-200 text-[10px] text-stone-500 font-mono">
                Ctrl+K
              </span>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1">
              {[
                { id: 'all', label: 'Tất cả (45)' },
                { id: 'espresso', label: 'Cà phê máy & Specialty (16)' },
                { id: 'tea', label: 'Trà ủ lạnh & Macchiato (12)' },
                { id: 'iceblended', label: 'Đá xay & Sinh tố (9)' },
                { id: 'bakery', label: 'Bánh nướng & Dessert (8)' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setCategoryFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-colors ${
                    categoryFilter === f.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Master Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Master Recipe List (4 cols) */}
          <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="font-bold text-xs uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
                Danh mục Công thức
              </span>
              <span className="text-xs text-stone-400 font-mono">45 món khả dụng</span>
            </div>

            <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
              {filteredList.map(item => {
                const isSelected = item.code === selectedRecipeCode;
                return (
                  <div
                    key={item.code}
                    onClick={() => setSelectedRecipeCode(item.code)}
                    className={`cursor-pointer rounded-xl p-2.5 transition-all flex gap-3 relative ${
                      isSelected
                        ? 'bg-primary/5 border border-primary/30 shadow-xs'
                        : 'hover:bg-stone-50 border border-stone-200/60'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r" />
                    )}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono font-bold text-primary">#{item.code}</span>
                          {isSelected && (
                            <span className="bg-primary/10 text-primary text-[9px] font-bold px-1.5 py-0.2 rounded">
                              Đang chọn
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-stone-900 truncate mt-0.5">{item.title}</h4>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">timer</span>
                          {item.time}
                        </span>
                        <span>•</span>
                        <span className="text-amber-800 font-sans font-medium">{item.level}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Recipe Detail & SOP (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header Panel */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                      RECIPE MASTER: #{currentRecipe.code}
                    </span>
                    <span className="bg-stone-100 text-stone-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      Product SKU: {currentRecipe.sku}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Trạng thái: Hoạt động chuẩn
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
                    {currentRecipe.title}
                  </h2>
                  <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
                    {currentRecipe.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => onShowToast?.('Đang kết nối hệ thống tồn kho kho nguyên liệu Hub 01...')}
                    className="px-3.5 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-container shadow-xs flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                    <span>Kiểm tra tồn nguyên liệu</span>
                  </button>
                  <button
                    onClick={() => onShowToast?.(`Đã gửi lệnh in thẻ SOP trạm cho món #${currentRecipe.code}`)}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>In nhãn hướng dẫn trạm</span>
                  </button>
                </div>
              </div>

              {/* Technical Specs Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Ly phục vụ</span>
                  <span className="font-bold text-xs sm:text-sm text-stone-900 mt-0.5 block">
                    Tumbler 350ml / Cup M-L
                  </span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Nhiệt độ phục vụ</span>
                  <span className="font-bold text-xs sm:text-sm text-blue-700 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">ac_unit</span>
                    Lạnh (Ice 4°C - 6°C)
                  </span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Thời gian chuẩn bị</span>
                  <span className="font-bold text-xs sm:text-sm text-amber-700 mt-0.5 flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    3 - 5 Phút (Chuẩn)
                  </span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Cấp độ kỹ thuật</span>
                  <span className="font-bold text-xs sm:text-sm text-primary mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">stars</span>
                    Nâng cao (Level 2)
                  </span>
                </div>
              </div>
            </div>

            {/* BOM Table */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">scale</span>
                  Thành phần & Định lượng Chi tiết (BOM Recipe)
                </h3>
                <span className="text-xs bg-stone-100 text-stone-700 font-semibold px-2.5 py-1 rounded-lg">
                  Quy chuẩn 1 Khẩu phần Size M
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-stone-200 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">STT</th>
                      <th className="py-2.5 px-3">Mã SKU</th>
                      <th className="py-2.5 px-3">Tên Thành phần Chuẩn</th>
                      <th className="py-2.5 px-3 text-right">Định lượng Chuẩn</th>
                      <th className="py-2.5 px-3">Quy cách Đong</th>
                      <th className="py-2.5 px-3 text-right">Cost ước tính</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bomIngredients.map(ing => (
                      <tr key={ing.stt} className="hover:bg-stone-50">
                        <td className="py-2.5 px-3 font-mono text-stone-400">{ing.stt}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-primary">{ing.sku}</td>
                        <td className="py-2.5 px-3">
                          <strong className="text-stone-900 block">{ing.name}</strong>
                          <span className="text-[10px] text-stone-400">{ing.desc}</span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-900">{ing.dosage}</td>
                        <td className="py-2.5 px-3 text-stone-500">{ing.tool}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-stone-800">{ing.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cost Summary Card */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 flex-wrap text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Tổng chi phí COGS</span>
                    <span className="font-mono text-base font-bold text-stone-900">11.850 đ</span>
                  </div>
                  <div className="w-px h-8 bg-stone-200" />
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Giá bán niêm yết</span>
                    <span className="font-mono text-base font-bold text-primary">45.000 đ</span>
                  </div>
                  <div className="w-px h-8 bg-stone-200" />
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Tỷ lệ Food Cost chuẩn</span>
                    <span className="font-mono text-base font-bold text-emerald-700">26.3% (Mục tiêu &lt; 28%)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
                  <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#e7e5e4" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#900b1a" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="65" strokeLinecap="round" />
                  </svg>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Biên lợi nhuận gộp</span>
                    <span className="text-xs font-mono font-bold text-stone-900">73.7%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Step Technical SOP */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">format_list_numbered</span>
                  Quy trình Pha chế Kỹ thuật Chuẩn SOP (4 Bước)
                </h3>
                <span className="text-xs text-stone-400">Yêu cầu tuân thủ 100% không nhảy bước</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">1</span>
                      <span className="text-[10px] font-bold uppercase bg-stone-200 px-2 py-0.5 rounded text-stone-700">Lót nền đáy ly</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 mt-2">Tạo lớp nền ngọt béo</h4>
                    <p className="text-stone-600 mt-1 leading-relaxed">
                      Cho <strong>25ml sữa đặc Ông Thọ</strong> và <strong>15ml sữa tươi thanh trùng</strong> vào đáy ly Tumbler thủy tinh 350ml. Dùng thìa bar cán dài khuấy đều xoay tròn theo chiều kim đồng hồ cho đến khi hòa quyện hoàn toàn.
                    </p>
                  </div>
                  <span className="text-[10px] text-stone-400 pt-2 border-t border-stone-200">
                    Nhiệt độ sữa trước khi hòa trộn: 18 - 22°C
                  </span>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">2</span>
                      <span className="text-[10px] font-bold uppercase bg-stone-200 px-2 py-0.5 rounded text-stone-700">Đổ đá & Phân tầng</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 mt-2">Đổ đá và rót cốt cà phê phin</h4>
                    <p className="text-stone-600 mt-1 leading-relaxed">
                      Thêm nhẹ <strong>180g đá bi tinh khiết</strong> đến đúng 80% thể tích ly. Rót chậm và đều <strong>50ml cốt cà phê phin lạnh</strong> trực tiếp lên bề mặt đá bi để tạo thành 2 tầng phân tách màu sắc rõ nét.
                    </p>
                  </div>
                  <span className="text-[10px] text-stone-400 pt-2 border-t border-stone-200">
                    Cốt phin phải được ủ lạnh trước ít nhất 30 phút
                  </span>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">3</span>
                      <span className="text-[10px] font-bold uppercase bg-stone-200 px-2 py-0.5 rounded text-stone-700">Topping Foam Muối</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 mt-2">Phủ lớp kem Salt Cream Aura</h4>
                    <p className="text-stone-600 mt-1 leading-relaxed">
                      Lấy ca đánh kem mặn đã chuẩn bị từ tủ mát quầy bar (chuẩn nhiệt độ <strong>4°C - 6°C</strong>). Dùng muỗng gạt bar rót nhẹ nhàng <strong>40ml lớp kem muối bồng bềnh</strong> phủ đều trọn vẹn lên trên mặt ly, giữ độ dày tầng kem đồng đều khoảng 2cm - 2.5cm.
                    </p>
                  </div>
                  <span className="text-[10px] text-stone-400 pt-2 border-t border-stone-200">
                    Không khuấy lớp kem vào cốt cà phê
                  </span>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">4</span>
                      <span className="text-[10px] font-bold uppercase bg-stone-200 px-2 py-0.5 rounded text-stone-700">Garnish & Xuất đơn</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 mt-2">Trang trí Decor & Hoàn tất KDS</h4>
                    <p className="text-stone-600 mt-1 leading-relaxed">
                      Rắc nhẹ chính xác <strong>0.5g muối hồng Himalaya mịn</strong> lên 1/2 bề mặt kem để tạo điểm nhấn thị giác. Dán tem KDS định danh đơn hàng trên thân ly và nhấn phím <kbd className="px-1 bg-stone-200 rounded font-mono">Space</kbd> hoàn tất trên terminal.
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold pt-2 border-t border-stone-200">
                    Kiểm tra ly khô ráo, không tràn miệng cốc
                  </span>
                </div>
              </div>
            </div>

            {/* QC Standards */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-800 text-[20px]">science</span>
                Tiêu chuẩn Cảm quan & Kiểm soát Chất lượng (QC Standards)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-900 block">1. Tiêu chí Thị giác</span>
                  <p className="text-stone-600">Phân tầng 3 lớp hoàn hảo. Muối hồng phủ nhẹ nhàng, không bị vón cục đọng giọt.</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-900 block">2. Tiêu chí Vị giác</span>
                  <p className="text-stone-600">Độ béo ngậy ngọt dịu, hòa cùng vị mặn thanh của muối hồng tự nhiên. Vị đắng đầm không gắt.</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1 text-rose-900">
                  <span className="font-bold block flex items-center gap-1 text-rose-700">
                    <span className="material-symbols-outlined text-[16px]">dangerous</span>
                    3. Giới hạn Hủy món
                  </span>
                  <p className="text-rose-800">Tách lớp sớm trước 20 phút. Tuyệt đối không dùng kem mặn quá 4 tiếng sau khi đánh bọt tại quầy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
