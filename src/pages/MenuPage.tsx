import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface MenuPageProps {
  onSelectProduct: (productId: string) => void;
  searchFilter?: string;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onSelectProduct,
  searchFilter = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState(searchFilter);
  const [sortOption, setSortOption] = useState<'popular' | 'price-asc' | 'price-desc' | 'name-asc'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'dense'>('grid');

  const categories = [
    { id: 'all', label: 'Tất cả thực đơn', icon: 'local_cafe', count: PRODUCTS.length },
    { id: 'espresso', label: 'Cà phê máy', icon: 'coffee' },
    { id: 'traditional', label: 'Cà phê truyền thống', icon: 'hourglass_bottom' },
    { id: 'tea', label: 'Trà trái cây', icon: 'emoji_food_beverage' },
    { id: 'iceblended', label: 'Đá xay & Matcha', icon: 'blender' },
    { id: 'bakery', label: 'Bánh ngọt', icon: 'bakery_dining' },
    { id: 'bottled', label: 'Đóng chai', icon: 'liquor' }
  ];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name, 'vi');
      return b.popularity - a.popularity; // default popular
    });

    return result;
  }, [selectedCategory, searchQuery, sortOption]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortOption('popular');
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Curated Discovery Bar */}
      <section className="w-full px-margin-lg py-space-lg bg-surface-container-low shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[24px]">coffee_maker</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                Specialty Roastery & Fresh Kitchen
              </span>
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
                Thực đơn Aura Café
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-space-md bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
            <div className="flex items-center gap-space-xs text-on-surface">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span className="font-label-md text-label-md font-semibold">
                100% Cà phê Arabica Cầu Đất & Fine Robusta
              </span>
            </div>
            <span className="text-surface-container-highest">|</span>
            <span className="font-tabular-data text-tabular-data text-secondary">
              32 Món sẵn sàng phục vụ
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="w-full max-w-7xl mx-auto px-margin-lg py-space-xl flex flex-col gap-space-xl">
        {/* Control Hub: Search, Filter Tabs & Sort Drawer */}
        <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex flex-col lg:flex-row gap-space-md items-stretch lg:items-center justify-between">
            {/* Live Search Field */}
            <div className="relative flex-1 max-w-xl">
              <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-secondary text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên món (Latte, Cold Brew, Trà sen, Bánh sừng bò...)"
                className="w-full h-12 pl-12 pr-10 rounded-lg bg-surface-container-low text-on-surface placeholder:text-secondary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-sm transition-all border-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-space-md top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-space-sm self-end lg:self-auto w-full lg:w-auto">
              <div className="flex items-center gap-space-xs px-space-md h-12 rounded-lg bg-surface-container-low text-on-surface shadow-sm">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  swap_vert
                </span>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                  Sắp xếp:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-transparent font-label-md text-label-md text-on-surface font-semibold focus:outline-none cursor-pointer pr-space-xs border-0"
                >
                  <option value="popular">Phổ biến nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên món: A - Z</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center bg-surface-container-low p-1 rounded-lg shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                  title="Lưới thẻ ảnh"
                >
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('dense')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === 'dense'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                  title="Bảng cô đọng"
                >
                  <span className="material-symbols-outlined text-[20px]">view_agenda</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs pt-space-xs no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md flex items-center gap-space-xs whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white font-semibold'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                  {cat.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full font-label-sm text-label-sm ml-1 ${
                        isSelected
                          ? 'bg-surface-container-lowest/20 text-white'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active State & Item Count Notice */}
        <div className="flex items-center justify-between text-secondary">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Hiển thị kết quả:
            </span>
            <span className="font-tabular-data text-tabular-data text-on-surface font-bold">
              {filteredProducts.length} món
            </span>
          </div>
          <div className="flex items-center gap-space-sm text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-label-sm">
              Pha chế thủ công ngay khi nhận yêu cầu
            </span>
          </div>
        </div>

        {/* Products Catalog Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-gutter-lg ${
              viewMode === 'dense'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-container-high"
              >
                <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.tag && (
                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-xs">
                      <span
                        className={`px-space-sm py-1 rounded font-label-sm text-label-sm uppercase tracking-wider font-bold shadow-md ${
                          product.tagType === 'bestseller'
                            ? 'bg-primary text-white'
                            : 'bg-secondary-container text-on-secondary-fixed-variant'
                        }`}
                      >
                        {product.tag}
                      </span>
                    </div>
                  )}
                  {product.badge && (
                    <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface font-tabular-data text-tabular-data font-semibold">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
                  <div className="flex flex-col gap-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1 font-semibold">
                      {product.name}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-space-sm flex items-center justify-between bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-md mt-auto border-t border-surface-container-high">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-secondary">
                        {product.category === 'bottled' ? 'Chai mang đi' : 'Giá tiêu chuẩn'}
                      </span>
                      <span className="font-headline-md text-headline-md text-primary font-bold tabular-data">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="h-10 px-space-md rounded-lg bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>Xem chi tiết / Chọn món</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Results State */
          <div className="flex flex-col items-center justify-center py-space-xl px-space-md text-center bg-surface-container-lowest rounded-xl shadow-sm">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-secondary mb-space-md">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs font-semibold">
              Không tìm thấy món phù hợp
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-md">
              Hãy thử tìm với từ khóa khác như "Latte", "Matcha", "Trà" hoặc xóa bộ lọc để hiển thị toàn bộ đồ uống.
            </p>
            <button
              onClick={resetAllFilters}
              className="h-10 px-space-lg rounded-lg bg-primary text-white font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
            >
              Hiển thị lại tất cả món
            </button>
          </div>
        )}

        {/* Bottom Discovery Banner */}
        <div className="w-full rounded-2xl bg-surface-container-low p-space-lg shadow-sm border border-surface-container-high">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
            <div className="flex items-start gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[20px]">nutrition</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Nguyên liệu chọn lọc
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Sử dụng hạt cà phê thượng hạng và trái cây tươi thu hoạch mỗi sáng sớm.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Tùy biến chuẩn gu
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Dễ dàng chọn mức đường, mức đá, loại sữa hạt và thêm topping yêu thích ở bước tiếp theo.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[20px]">alarm_on</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Pha chế chuẩn xác 5-7 phút
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Hệ thống chuyển trực tiếp đơn về màn hình Barista KDS ngay khi bạn xác nhận.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
