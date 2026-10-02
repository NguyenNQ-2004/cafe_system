import React from 'react';
import { PageRoute, Product } from '../types';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onQuickAdd
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Showcase Section */}
      <div className="relative w-full overflow-hidden bg-surface-container-high px-margin-lg py-space-xl md:py-space-xl">
        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-80 h-80 rounded-full bg-tertiary-container/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-surface-container-lowest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                Aura Privilege Club
              </span>
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-widest font-semibold">
                Chào mừng bạn đến với
              </span>
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
                Hương vị chuẩn mực.
                <br />
                <span className="text-primary">Đặc quyền hội viên.</span>
              </h1>
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Khám phá không gian cà phê thủ công chọn lọc từ những nông trại cao nguyên danh tiếng cùng quà tặng chào mừng trị giá tới 150.000đ dành riêng cho thành viên mới.
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                onClick={() => onNavigate('menu')}
                className="h-11 px-space-lg flex items-center justify-center gap-space-sm bg-primary text-white rounded-lg shadow-sm hover:opacity-95 transition-opacity font-label-lg text-label-lg cursor-pointer"
              >
                <span>Khám phá toàn bộ Menu</span>
                <span className="material-symbols-outlined text-[18px]">east</span>
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="h-11 px-space-lg flex items-center justify-center gap-space-sm bg-surface-container-lowest text-on-surface rounded-lg shadow-sm hover:bg-surface transition-colors font-label-lg text-label-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">
                  workspace_premium
                </span>
                <span>Kích hoạt thẻ thành viên</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-gutter mt-space-sm pt-space-md bg-surface-container-lowest/80 backdrop-blur rounded-xl p-space-md shadow-sm">
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-primary tabular-data font-bold">
                  100%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Hạt Arabica Cầu Đất
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-primary tabular-data font-bold">
                  4.9/5
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Đánh giá trải nghiệm
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-primary tabular-data font-bold">
                  15 Phút
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Giao tận nơi giữ nhiệt
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-xl bg-surface-container group">
                <div
                  className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw-dbJgXjvCR5nkOrwZ8VgbS5GY2OEyRxEbOPz5Icbwto9r4_yy3ThjTmDPVYgkVS0qvw9zgWOIgZyovscgGXFfWYGZIWnz4J-kEojbOR_3UIVRm6Pc2K3JfHrvidn2O5NIY6kYDmJT7_FHzfZXsvm5SPBgxa8HNtPCnWXgdeqGGBi8jSUbqQkSy9_zS1iUSwY3th8A9HlEIBbs8WrZi_JfRhmcTX_OGMjA0Fi-G89MqKh9nlG6OfL')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-transparent to-transparent flex flex-col justify-end p-space-lg text-white">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim font-bold">
                    Món Signature Aura
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-white font-bold">
                    Cà Phê Muối Aura
                  </h2>
                  <p className="font-body-sm text-body-sm text-surface-variant line-clamp-2 mt-1">
                    Lớp kem béo mặn đặc chế hòa quyện cà phê phin nguyên bản từ cao nguyên Lâm Đồng.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct('ca-phe-muoi')}
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-sm font-semibold flex items-center gap-1 shadow cursor-pointer transition-colors"
                    >
                      <span>Tùy chỉnh món</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Welcome 50K Voucher */}
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-space-md rounded-xl shadow-lg max-w-xs flex items-center gap-space-md border border-surface-container-high">
                <div className="w-12 h-12 rounded-lg bg-primary-container text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">card_membership</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                    Voucher Welcome 50K
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface truncate">
                    Áp dụng cho đơn hàng đầu tiên
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="w-full px-margin-lg py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs text-primary font-semibold">
                <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider">
                  Ưa chuộng nhất
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                Sản phẩm bán chạy trong tuần
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Những công thức hương vị được yêu thích và đặt nhiều nhất bởi tín đồ sành cà phê.
              </p>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-space-xs text-primary hover:text-primary-container font-label-lg text-label-lg transition-colors cursor-pointer"
            >
              <span>Xem tất cả danh mục</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
            {/* Card 1: Cà phê Muối Aura */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56 bg-surface-container overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZIHvaJT4mQKloRO3wsOdLK_H-3jVQ6dlX5-V0MNiGe9EovAzUhlDHw4iFDJtfJeJfdvT9P6mdfbUGDTw_S4MpFvJT_JgLtBh308WQKUWEf29pPjIWTcUameeU4l5ufqziY_8QwroRkxCAhBlf0pUKdbFwLrrTYOeVTgCO0N8ZxuIqKFXyVkSDgIrDu18Gy9OJ42tGAayDee90kqkZgUbnSxICfokYqruhylqZ3Kbea0iuhuFL904x')`
                  }}
                />
                <span className="absolute top-3 left-3 px-space-sm py-0.5 rounded-md bg-primary text-white font-label-sm text-label-sm uppercase font-bold">
                  Top 1 Trend
                </span>
                <span className="absolute bottom-3 right-3 px-space-sm py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur font-tabular-data text-tabular-data font-semibold text-on-surface">
                  55.000đ
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary">Cà phê truyền thống</span>
                    <div className="flex items-center gap-0.5 text-tertiary-container">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="font-tabular-data text-label-sm font-bold">4.9</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Cà phê Muối Aura
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Lớp kem béo mặn thanh thoát ôm trọn vị cà phê phin đượm vị caramel tự nhiên.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    Bán ra 1.420+ ly
                  </span>
                  <button
                    onClick={() => onSelectProduct('ca-phe-muoi')}
                    className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    title="Chọn món & Tuỳ chỉnh"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Trà Sen Vàng */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56 bg-surface-container overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsWG5hD7E15KulXih9-NnE_R9_q5zYuELTnI0f8MXtEIXP7V-KuC_696klLO7Cd9fXL6KzINoUGXlmIE_ML7BlaYoR3l-UOkB4vVHXlt5_lpDLwd84j4A8DKEdx84ncy00mJLRkDbN9XrMwNhT0izwq360-GTh9E3gzOkVdML26LXs_ZK8CtaYG2L06kfyYmxpPJdf9JWMf0lvb5TsMzI7_ziZbnrUyEsnx_7afxyL1L9H_qp9HXG4')`
                  }}
                />
                <span className="absolute top-3 left-3 px-space-sm py-0.5 rounded-md bg-tertiary-container text-white font-label-sm text-label-sm uppercase font-bold">
                  Thanh nhiệt
                </span>
                <span className="absolute bottom-3 right-3 px-space-sm py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur font-tabular-data text-tabular-data font-semibold text-on-surface">
                  62.000đ
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary">Trà mộc trái cây</span>
                    <div className="flex items-center gap-0.5 text-tertiary-container">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="font-tabular-data text-label-sm font-bold">4.8</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Trà Sen Vàng
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Trà Ô Long thanh mát quyện cùng hạt sen Huế bùi dẻo và củ năng giòn ngọt ngào.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    Bán ra 980+ ly
                  </span>
                  <button
                    onClick={() => onSelectProduct('tra-dao-cam-sa')}
                    className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    title="Chọn món & Tuỳ chỉnh"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Cold Brew Cam Quế */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56 bg-surface-container overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC73bJIMisYC3woutOOND70MWfIGTxEDrf6b4c9PBVm8Xe0RfUwFXbefz-HWRFvMEM7NgC88FeAZRF_MM8Qh9hsXGpTHFKAJpCwnHl0P_hjHQONbklfl90oML_oSdFivqy_dWF6LTdp8MVKYKiI-xfCHRMcfJZkJdHVKUsHEN7thwPrKkyUaNxM7CfZNzbJRZXcursv4JU19T3_v8Fm_VYRo5tOT04zh-0zo083vUvymgsgvmZAzf-F')`
                  }}
                />
                <span className="absolute top-3 left-3 px-space-sm py-0.5 rounded-md bg-secondary text-white font-label-sm text-label-sm uppercase font-bold">
                  Ủ lạnh 18H
                </span>
                <span className="absolute bottom-3 right-3 px-space-sm py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur font-tabular-data text-tabular-data font-semibold text-on-surface">
                  65.000đ
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary">Cold Brew Series</span>
                    <div className="flex items-center gap-0.5 text-tertiary-container">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="font-tabular-data text-label-sm font-bold">4.9</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Cold Brew Cam Quế
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Cà phê ủ lạnh kết hợp lát cam vàng sấy mộc và thanh quế Trà Bồng thơm nồng nàn.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    Bán ra 870+ ly
                  </span>
                  <button
                    onClick={() => onSelectProduct('coldbrew-300ml')}
                    className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    title="Chọn món & Tuỳ chỉnh"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Bạc Xỉu Kem Trứng */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56 bg-surface-container overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCv1Ywnp65znPe0Z-5bzYLoIagLEnA_Hd7l7AiVu3pIEEFgWHVMftCWb-A2yq8nQcXMNi5cA0CYTwbYFh5M-jz6s5m-cKlnQO946HqJnAeLaQpbUi4OL26qOqujvJcK69-w7ol9T3cOz60pCDSlNB3iKQGf-bUb9l2Wdz8wvctQCddX4WVWsFGioMxOoLm48kizX8qOpr2SCY7HOiXQkqlMiiIB_VibQi00xFDxJ_MrZg3pn_pl-exQ')`
                  }}
                />
                <span className="absolute top-3 left-3 px-space-sm py-0.5 rounded-md bg-primary-container text-white font-label-sm text-label-sm uppercase font-bold">
                  Đậm đà
                </span>
                <span className="absolute bottom-3 right-3 px-space-sm py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur font-tabular-data text-tabular-data font-semibold text-on-surface">
                  59.000đ
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary">Cà phê sáng tạo</span>
                    <div className="flex items-center gap-0.5 text-tertiary-container">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="font-tabular-data text-label-sm font-bold">4.7</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Bạc Xỉu Kem Trứng
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Sự giao thoa mượt mà giữa sữa đặc ngọt dịu, cốt cà phê robusta và lớp kem trứng mịn màng.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    Bán ra 1.150+ ly
                  </span>
                  <button
                    onClick={() => onSelectProduct('nau-sai-gon')}
                    className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    title="Chọn món & Tuỳ chỉnh"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Releases */}
      <div className="w-full bg-surface-container-low py-space-xl px-margin-lg">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Aura Seasonal Releases
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                Bộ sưu tập món mới - Mùa Thảo Mộc & Hạt
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sự thăng hoa của các loại hạt rang mộc và thảo dược tự nhiên được tuyển lựa đặc biệt cho mùa này.
              </p>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="px-space-sm py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Phiên bản giới hạn
              </span>
              <span className="px-space-sm py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Ra mắt tháng này
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
            {/* Seasonal 1 */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcgRPc8BItsw3RcB_6EvOwKbblAJajE3GUnNQJzOqbV8wu_PNvyvs1Om33aV8PewUezJRcqBzMb-2WdFoD0_VkUZgNj07Jme5IP6Mc31_Si0ZlI7cwIlZLx17Gp2rVR49Rd9YwRNSQgPewzdmOqd1F4dkobPBHSXXpRULTAM8u0cxM1waClivynY60mAjv0ni79mgw7xTpUaF8stgm0Rrp4aQ_ClW65FsN3fI0pBTWd3KfpF-XMGQR')`
                  }}
                />
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur px-space-sm py-1 rounded text-primary font-label-sm text-label-sm font-semibold">
                  New Arrival
                </div>
              </div>
              <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                      Latte Hạt Dẻ Cười
                    </h3>
                    <span className="font-tabular-data text-headline-sm font-bold text-primary">
                      69.000đ
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Sữa hạt dẻ cười nguyên chất nghiền mịn kết hợp espresso đơn nguồn gốc từ Colombia.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-sm bg-surface-container/50 -mx-space-lg -mb-space-lg p-space-md">
                  <span className="font-label-sm text-label-sm text-secondary">
                    Phục vụ: Nóng / Lạnh
                  </span>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="font-label-md text-label-md text-primary font-semibold hover:underline cursor-pointer"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>

            {/* Seasonal 2 */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6msjrrNwbb8UKa9RmgpX4emU7meNLw3YvbVlIHV6kqIjjfBbtCd_TrXK2Z-vhIscCsKHyXjhj2isU-gUzUBjWYNz8V8rozBRYRGPdhLRyO9dJ8D301EHX1mfdqpQE9LoE4Ch45Ik8XAlwqrg453f6sS4uQBfJwfQVBCK1ardOWICDodJQYSCgXyJatRTAi4b9bpjo_Xfx8WZLgy4-H7czWISlwItU9uSVAJzsvNWKyW4O4Y--lLyw')`
                  }}
                />
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur px-space-sm py-1 rounded text-primary font-label-sm text-label-sm font-semibold">
                  Signature Craft
                </div>
              </div>
              <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                      Cascara Sparkling Nho Đỏ
                    </h3>
                    <span className="font-tabular-data text-headline-sm font-bold text-primary">
                      68.000đ
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Trà vỏ cà phê chín mọng sấy nắng tự nhiên, kết hợp men nho đỏ và bọt gas sảng khoái.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-sm bg-surface-container/50 -mx-space-lg -mb-space-lg p-space-md">
                  <span className="font-label-sm text-label-sm text-secondary">
                    Phục vụ: Lạnh có ga
                  </span>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="font-label-md text-label-md text-primary font-semibold hover:underline cursor-pointer"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>

            {/* Seasonal 3 */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUxS7WE42UCsJ_BAbKdVEGakmkGWJrlt5mGpMesAKZeERcJE_C2bXMjyusXY0yYjqLqsEPBMu54G_zKSk-EmvPSuVTdPzGkmLXbH9MAW1mHwq1BKaC8paH2GEs0DQsntPwRpHMfEHiAeEupSM6XKMvsVfvDLY2XgwgCYk3tB_ohM9hh_FoYUa1kgDySfRUnmFKItK4dnW1Qx4oCfgoNXvStWhI6a8KyQCHGT5AzPmuErNHXJTC7kGU')`
                  }}
                />
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur px-space-sm py-1 rounded text-primary font-label-sm text-label-sm font-semibold">
                  Seasonal Warmth
                </div>
              </div>
              <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                      Mocha Bơ Đậu Phộng
                    </h3>
                    <span className="font-tabular-data text-headline-sm font-bold text-primary">
                      72.000đ
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Sô-cô-la Bỉ nguyên chất hòa quyện lớp kem bơ đậu phộng mặn nhẹ và espresso đậm vị.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-sm bg-surface-container/50 -mx-space-lg -mb-space-lg p-space-md">
                  <span className="font-label-sm text-label-sm text-secondary">
                    Phục vụ: Nóng / Lạnh
                  </span>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="font-label-md text-label-md text-primary font-semibold hover:underline cursor-pointer"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loyalty Matrix Section */}
      <div className="w-full px-margin-lg py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
              Aura Loyalty Matrix
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Ưu đãi điểm thưởng tích luỹ Member
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Mỗi 10.000đ chi tiêu tương đương 1 Điểm Aura (A-Point). Nâng cấp hạng để nhận gấp bội đặc quyền.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg items-stretch">
            {/* Silver Tier */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container-high">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">military_tech</span>
                  </div>
                  <span className="px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold">
                    Khởi đầu
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                    Silver Member
                  </h3>
                  <span className="font-body-sm text-body-sm text-secondary">
                    Tích lũy từ 0 - 299 Điểm
                  </span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-1/3 rounded-full" />
                </div>
                <ul className="flex flex-col gap-space-sm pt-space-xs font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span>
                      Tích luỹ <strong>1 Điểm</strong> cho mỗi 10.000đ
                    </span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span>Tặng 01 E-Voucher 20% tháng sinh nhật</span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span>Đổi voucher món ăn kèm chỉ từ 50 Điểm</span>
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-md">
                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full h-10 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                >
                  Xem chi tiết hạng Silver
                </button>
              </div>
            </div>

            {/* Gold Tier */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-surface-container-lowest to-surface-container-high/40 border-2 border-tertiary-container/30">
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-tertiary-container/10 blur-xl pointer-events-none" />
              <div className="flex flex-col gap-space-md relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                  </div>
                  <span className="px-space-sm py-1 rounded bg-tertiary-container text-white font-label-sm text-label-sm uppercase font-semibold">
                    Phổ biến nhất
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-lg text-headline-lg text-tertiary font-bold">
                    Gold Member
                  </h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Tích lũy từ 300 - 799 Điểm
                  </span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container w-2/3 rounded-full" />
                </div>
                <ul className="flex flex-col gap-space-sm pt-space-xs font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span>
                      Tích luỹ nhân hệ số <strong>x1.5 Điểm</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span>Tặng 01 Ly đồ uống miễn phí tháng sinh nhật</span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span>Miễn phí nâng cấp Size (Up-size) 2 lần/tháng</span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    <span>Ưu tiên pha chế giờ cao điểm tại quầy</span>
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-md relative z-10">
                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full h-10 flex items-center justify-center rounded-lg bg-tertiary-container text-white font-label-md text-label-md hover:opacity-95 transition-opacity cursor-pointer font-semibold shadow-sm"
                >
                  Đặc quyền Gold Member
                </button>
              </div>
            </div>

            {/* Diamond Tier */}
            <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-space-lg shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-space-md relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-[24px]">diamond</span>
                  </div>
                  <span className="px-space-sm py-1 rounded bg-primary-container text-white font-label-sm text-label-sm uppercase font-semibold">
                    VIP Tối thượng
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-lg text-headline-lg text-white font-bold">
                    Diamond Member
                  </h3>
                  <span className="font-body-sm text-body-sm text-surface-variant">
                    Tích lũy từ 800 Điểm trở lên
                  </span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full rounded-full" />
                </div>
                <ul className="flex flex-col gap-space-sm pt-space-xs font-body-md text-body-md text-surface-variant">
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">
                      verified
                    </span>
                    <span className="text-surface-bright">
                      Tích luỹ nhân hệ số <strong>x2.0 Điểm</strong> toàn diện
                    </span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">
                      verified
                    </span>
                    <span>Combo Sinh nhật: Bánh ngọt + Đồ uống đặc quyền</span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">
                      verified
                    </span>
                    <span>Miễn phí giao hàng không giới hạn khoảng cách</span>
                  </li>
                  <li className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">
                      verified
                    </span>
                    <span>Lời mời tham dự Workshop Cà phê thử nếm (Cupping)</span>
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-md relative z-10">
                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer font-semibold"
                >
                  Gia nhập Diamond Club
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="w-full px-margin-lg pb-space-xl">
        <div className="max-w-7xl mx-auto rounded-3xl bg-primary text-white p-space-lg md:p-space-xl relative overflow-hidden shadow-lg">
          <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-surface-container-lowest/10 blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
            <div className="flex flex-col gap-space-sm max-w-2xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed font-bold">
                Trải nghiệm không giới hạn
              </span>
              <h2 className="font-headline-lg text-headline-lg md:text-display-lg font-bold">
                Bạn đã sẵn sàng thưởng thức ly cà phê hoàn hảo hôm nay?
              </h2>
              <p className="font-body-lg text-body-lg text-primary-fixed">
                Hơn 45 thức uống được cân chỉnh hoàn hảo từ đội ngũ Barista tâm huyết đang sẵn sàng phục vụ tại chi nhánh hoặc giao nóng hổi tận nơi.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-space-md shrink-0">
              <button
                onClick={() => onNavigate('menu')}
                className="h-12 px-space-xl rounded-lg bg-white text-primary font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-sm shadow-md hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span>Khám phá toàn bộ Menu</span>
                <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
