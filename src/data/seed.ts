import type { DbState } from '../types';

// Dữ liệu mẫu chép đúng theo các câu INSERT trong aura_cafe.sql.
// Cột có DEFAULT CURRENT_TIMESTAMP trong SQL được gán một mốc thời gian cố định để giao diện hiển thị.

export const SEED: DbState = {
  // 1. USERS
  users: [
    { id: 1, full_name: 'Aura Admin', phone: '0900000001', email: 'admin@auracafe.vn', password_hash: 'demo_hash', birthday: null, address: null, role: 'ADMIN', status: 'ACTIVE', position: 'MANAGER', base_salary: 15000000, hire_date: '2025-01-01', total_points: 0, created_at: '2025-01-01 08:00:00' },
    { id: 2, full_name: 'Nguyen Van An', phone: '0900000002', email: 'an@auracafe.vn', password_hash: 'demo_hash', birthday: null, address: null, role: 'STAFF', status: 'ACTIVE', position: 'BARISTA', base_salary: 8000000, hire_date: '2025-02-01', total_points: 0, created_at: '2025-02-01 08:00:00' },
    { id: 3, full_name: 'Tran Thi Binh', phone: '0900000003', email: 'binh@auracafe.vn', password_hash: 'demo_hash', birthday: null, address: null, role: 'STAFF', status: 'ACTIVE', position: 'CASHIER', base_salary: 8500000, hire_date: '2025-02-01', total_points: 0, created_at: '2025-02-01 08:00:00' },
    { id: 4, full_name: 'Le Minh Anh', phone: '0900000004', email: 'anh@gmail.com', password_hash: 'demo_hash', birthday: null, address: null, role: 'CUSTOMER', status: 'ACTIVE', position: null, base_salary: 0, hire_date: null, total_points: 120, created_at: '2025-06-10 10:00:00' },
    { id: 5, full_name: 'Pham Quang Huy', phone: '0900000005', email: 'huy@gmail.com', password_hash: 'demo_hash', birthday: null, address: null, role: 'CUSTOMER', status: 'ACTIVE', position: null, base_salary: 0, hire_date: null, total_points: 50, created_at: '2025-08-20 15:30:00' },
    { id: 6, full_name: 'Hoang Van Nam', phone: '0900000006', email: 'nam@auracafe.vn', password_hash: 'demo_hash', birthday: null, address: null, role: 'STAFF', status: 'ACTIVE', position: 'SHIPPER', base_salary: 7500000, hire_date: '2025-03-01', total_points: 0, created_at: '2025-03-01 08:00:00' }
  ],

  // 2. WORK SCHEDULES
  work_schedules: [
    { id: 1, user_id: 2, work_date: '2026-10-03', shift_name: 'MORNING', check_in_time: '2026-10-03 08:00:00', check_out_time: '2026-10-03 12:00:00', starting_cash: null, ending_cash_system: null, ending_cash_actual: null, status: 'COMPLETED', note: 'Morning shift' },
    { id: 2, user_id: 3, work_date: '2026-10-03', shift_name: 'AFTERNOON', check_in_time: '2026-10-03 12:00:00', check_out_time: null, starting_cash: 500000, ending_cash_system: null, ending_cash_actual: null, status: 'PRESENT', note: 'Cashier shift' },
    { id: 3, user_id: 6, work_date: '2026-10-03', shift_name: 'EVENING', check_in_time: null, check_out_time: null, starting_cash: null, ending_cash_system: null, ending_cash_actual: null, status: 'SCHEDULED', note: 'Delivery shift' },
    { id: 4, user_id: 2, work_date: '2026-10-03', shift_name: 'AFTERNOON', check_in_time: '2026-10-03 12:00:00', check_out_time: null, starting_cash: null, ending_cash_system: null, ending_cash_actual: null, status: 'PRESENT', note: 'Barista ca chiều' },
    { id: 5, user_id: 1, work_date: '2026-10-03', shift_name: 'EVENING', check_in_time: null, check_out_time: null, starting_cash: null, ending_cash_system: null, ending_cash_actual: null, status: 'SCHEDULED', note: 'Quản lý trực ca tối' }
  ],

  // 3. CATEGORIES
  categories: [
    { id: 1, name: 'Cà phê máy', status: 'ACTIVE', icon: 'coffee_maker', description: 'Espresso, Caramel Macchiato đậm đà chuẩn gu hiện đại.', image_url: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Cà phê truyền thống', status: 'ACTIVE', icon: 'local_cafe', description: 'Cà phê muối, sữa đá Sài Gòn ủ phin nguyên bản ngọt êm.', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Trà trái cây', status: 'ACTIVE', icon: 'emoji_food_beverage', description: 'Trà đào cam sả, hoa quả nhiệt đới tươi mát thanh nhiệt.', image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80' },
    { id: 4, name: 'Đá xay & Matcha', status: 'ACTIVE', icon: 'icecream', description: 'Matcha Uji thơm bùi, đá xay mát lạnh đánh tan ngày hè.', image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80' },
    { id: 5, name: 'Bánh ngọt', status: 'ACTIVE', icon: 'bakery_dining', description: 'Bánh Croissant nướng bơ Pháp, cheesecake mềm béo hấp dẫn.', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80' },
    { id: 6, name: 'Đóng chai', status: 'ACTIVE', icon: 'liquor', description: 'Cold brew ủ lạnh 16h đóng chai tiện lợi mang đi bất cứ đâu.', image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80' }
  ],

  // 4. PRODUCTS
  products: [
    { id: 1, category_id: 2, name: 'Cà Phê Muối Aura Đặc Biệt', base_price: 45000, description: 'Fine Robusta ủ phin truyền thống phối kem sữa mằn mặn béo ngậy, cân bằng hậu vị ngọt đầm.', badge: 'BÁN CHẠY', subtitle: 'Phin Cổ Điển', variants_config: { sizes: { M: 0, L: 10000 }, toppings: [{ name: 'Extra kem muối', price: 8000 }, { name: 'Extra shot espresso', price: 10000 }] }, image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 2, category_id: 1, name: 'Caramel Macchiato Đặc Sản', base_price: 55000, description: 'Lớp sữa tươi nóng thanh dịu, quyện cùng espresso kép Arabica Cầu Đất đậm đà và vân sốt caramel thơm lừng.', badge: 'BÁN CHẠY', subtitle: 'Espresso Base', variants_config: { sizes: { M: 0, L: 10000 }, toppings: [{ name: 'Sốt caramel thêm', price: 5000 }, { name: 'Kem whipping', price: 8000 }] }, image_url: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 3, category_id: 6, name: 'Cold Brew Đóng Chai Aura Reserve', base_price: 68000, description: 'Chiết xuất lạnh 16 tiếng từ 100% Arabica Bourbon, hương hoa quả nhiệt đới tươi mát, giữ trọn vị nguyên bản.', badge: 'BÁN CHẠY', subtitle: 'Ủ Lạnh 16 Tiếng', variants_config: { sizes: { 'Chai 250ml': 0, 'Chai 500ml': 35000 }, toppings: [] }, image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 4, category_id: 2, name: 'Cà Phê Sữa Đá Sài Gòn Nâu', base_price: 39000, description: 'Hạt Fine Robusta rang nâu bóng mượt, chiết xuất phin chậm kết hợp sữa đặc ngọt êm béo ngậy truyền thống.', badge: null, subtitle: 'Đậm Vị Phin', variants_config: { sizes: { M: 0, L: 8000 }, toppings: [{ name: 'Thạch cà phê', price: 6000 }, { name: 'Extra shot phin', price: 8000 }] }, image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 5, category_id: 3, name: 'Trà Đào Cam Sả Tươi', base_price: 45000, description: 'Nước cốt trà đen Ceylon thanh dịu kết hợp miếng đào giòn ngọt mọng nước cùng sả tươi ấm nồng.', badge: 'MÓN MỚI', subtitle: 'Fresh Brew', variants_config: { sizes: { M: 0, L: 10000 }, toppings: [{ name: 'Thạch đào giòn', price: 8000 }, { name: 'Hạt chia', price: 5000 }] }, image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 6, category_id: 5, name: 'Bánh Croissant Bơ Pháp', base_price: 35000, description: 'Bột ngàn lớp thủ công giòn rụm bên ngoài, mềm xốp ngậy hương bơ Elle & Vire hảo hạng bên trong.', badge: 'BÁN CHẠY', subtitle: 'Bơ Elle & Vire', variants_config: { sizes: { 'Tiêu chuẩn': 0 }, toppings: [{ name: 'Mứt dâu tây', price: 6000 }, { name: 'Sốt sôcôla', price: 6000 }] }, image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 7, category_id: 4, name: 'Matcha Latte Uji Kyoto Đá Xay', base_price: 58000, description: 'Bột trà xanh Uji trứ danh cố đô Kyoto xay cùng sữa hạt và kem whipping bông xốp béo mịn thượng hạng.', badge: 'BÁN CHẠY', subtitle: 'Uji Kyoto Grade', variants_config: { sizes: { M: 0, L: 12000 }, toppings: [{ name: 'Kem whipping', price: 8000 }, { name: 'Thạch matcha', price: 8000 }] }, image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 8, category_id: 3, name: 'Trà Sen Vàng Long Nhãn', base_price: 49000, description: 'Hạt sen Huế ninh mềm dẻo, nhãn nhục ngọt thanh quyện cùng trà ô long hảo hạng và lớp kem củ năng giòn.', badge: null, subtitle: 'Trà Đen Ceylon', variants_config: { sizes: { M: 0, L: 10000 }, toppings: [{ name: 'Hạt sen thêm', price: 10000 }, { name: 'Củ năng giòn', price: 8000 }] }, image_url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 9, category_id: 1, name: 'Americano Đá Rang Đậm', base_price: 35000, description: 'Espresso kép chiết xuất áp suất cao từ hạt cà phê đặc sản, vị chua thanh thanh tao và hậu ngọt dài lâu.', badge: null, subtitle: 'Espresso Base', variants_config: { sizes: { M: 0, L: 10000 }, toppings: [{ name: 'Extra shot espresso', price: 10000 }] }, image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 10, category_id: 1, name: 'Latte Nghệ Thuật Hạt Phỉ', base_price: 52000, description: 'Hòa quyện tinh tế giữa espresso thơm ngát, sữa tươi đánh bọt mịn màng và siro hạt phỉ thơm lừng.', badge: 'MÓN MỚI', subtitle: 'Espresso Base', variants_config: { sizes: { M: 0, L: 10000 }, toppings: [{ name: 'Siro hạt phỉ', price: 6000 }, { name: 'Sữa yến mạch (Oat milk)', price: 12000 }] }, image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 11, category_id: 4, name: 'Sôcôla Bỉ Đá Xay Hạnh Nhân', base_price: 55000, description: 'Bột cacao nguyên chất nhập khẩu Bỉ xay nhuyễn cùng sữa đặc, rắc hạnh nhân nướng giòn tan.', badge: null, subtitle: 'Chocolate Rich', variants_config: { sizes: { M: 0, L: 10000 }, toppings: [{ name: 'Kem whipping', price: 8000 }, { name: 'Hạnh nhân vụn', price: 6000 }] }, image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', is_available: true },
    { id: 12, category_id: 5, name: 'Bánh Cheesecake Việt Quất', base_price: 55000, description: 'Cream cheese Philadelphia béo ngậy kết hợp mứt việt quất chua ngọt dịu và đế bánh quy nướng thơm lừng.', badge: 'BÁN CHẠY', subtitle: 'New York Style', variants_config: { sizes: { '1 Phần': 0 }, toppings: [] }, image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80', is_available: true }
  ],

  // 5. ORDERS
  orders: [
    { id: 1, order_code: 'AURA-001', customer_id: 4, cashier_id: 3, order_type: 'DINE_IN', status: 'COMPLETED', total_amount: 90000, discount_amount: 9000, delivery_fee: 0, final_amount: 81000, recipient_name: null, recipient_phone: null, delivery_address: null, shipper_id: null, table_number: 'T01', order_note: 'Less ice', cancel_reason: null, created_at: '2026-10-03 09:00:00' },
    { id: 2, order_code: 'AURA-002', customer_id: 5, cashier_id: 3, order_type: 'ONLINE', status: 'DELIVERING', total_amount: 100000, discount_amount: 0, delivery_fee: 15000, final_amount: 115000, recipient_name: 'Pham Quang Huy', recipient_phone: '0900000005', delivery_address: 'Cau Giay, Hanoi', shipper_id: 6, table_number: null, order_note: 'Call before delivery', cancel_reason: null, created_at: '2026-10-03 10:00:00' },
    { id: 3, order_code: 'AURA-003', customer_id: 4, cashier_id: 3, order_type: 'TAKEAWAY', status: 'CONFIRMED', total_amount: 130000, discount_amount: 20000, delivery_fee: 0, final_amount: 110000, recipient_name: null, recipient_phone: null, delivery_address: null, shipper_id: null, table_number: null, order_note: 'No sugar', cancel_reason: null, created_at: '2026-10-03 11:00:00' },
    { id: 4, order_code: 'AURA-004', customer_id: null, cashier_id: 3, order_type: 'DINE_IN', status: 'PREPARING', total_amount: 70000, discount_amount: 0, delivery_fee: 0, final_amount: 70000, recipient_name: null, recipient_phone: null, delivery_address: null, shipper_id: null, table_number: 'T02', order_note: null, cancel_reason: null, created_at: '2026-10-03 12:00:00' },
    { id: 5, order_code: 'AURA-005', customer_id: 5, cashier_id: 3, order_type: 'DINE_IN', status: 'PREPARING', total_amount: 145000, discount_amount: 0, delivery_fee: 0, final_amount: 145000, recipient_name: null, recipient_phone: null, delivery_address: null, shipper_id: null, table_number: 'T03', order_note: null, cancel_reason: null, created_at: '2026-10-03 12:10:00' },
    { id: 6, order_code: 'AURA-006', customer_id: null, cashier_id: 3, order_type: 'TAKEAWAY', status: 'CONFIRMED', total_amount: 90000, discount_amount: 0, delivery_fee: 0, final_amount: 90000, recipient_name: null, recipient_phone: null, delivery_address: null, shipper_id: null, table_number: null, order_note: 'Less ice', cancel_reason: null, created_at: '2026-10-03 12:15:00' },
    { id: 7, order_code: 'AURA-007', customer_id: 4, cashier_id: null, order_type: 'ONLINE', status: 'CONFIRMED', total_amount: 125000, discount_amount: 0, delivery_fee: 18000, final_amount: 143000, recipient_name: 'Le Minh Anh', recipient_phone: '0900000004', delivery_address: 'Hoan Kiem, Hanoi', shipper_id: null, table_number: null, order_note: 'Call before delivery', cancel_reason: null, created_at: '2026-10-03 12:20:00' },
    { id: 8, order_code: 'AURA-008', customer_id: 5, cashier_id: null, order_type: 'ONLINE', status: 'READY', total_amount: 145000, discount_amount: 0, delivery_fee: 18000, final_amount: 163000, recipient_name: 'Pham Quang Huy', recipient_phone: '0900000005', delivery_address: 'Dong Da, Hanoi', shipper_id: 6, table_number: null, order_note: null, cancel_reason: null, created_at: '2026-10-03 11:45:00' },
    { id: 9, order_code: 'AURA-009', customer_id: 4, cashier_id: null, order_type: 'ONLINE', status: 'COMPLETED', total_amount: 87000, discount_amount: 0, delivery_fee: 18000, final_amount: 105000, recipient_name: 'Le Minh Anh', recipient_phone: '0900000004', delivery_address: 'Hoan Kiem, Hanoi', shipper_id: 6, table_number: null, order_note: null, cancel_reason: null, created_at: '2026-10-03 09:30:00' },
    { id: 10, order_code: 'AURA-010', customer_id: 4, cashier_id: 3, order_type: 'TAKEAWAY', status: 'CANCELLED', total_amount: 58000, discount_amount: 0, delivery_fee: 0, final_amount: 58000, recipient_name: null, recipient_phone: null, delivery_address: null, shipper_id: null, table_number: null, order_note: null, cancel_reason: 'Customer changed mind', created_at: '2026-10-03 10:30:00' }
  ],

  // 6. ORDER ITEMS
  order_items: [
    { id: 1, order_id: 1, product_id: 1, product_name_at_time: 'Cà Phê Muối Aura Đặc Biệt', unit_price: 45000, customization: { size: 'M' }, quantity: 2, subtotal: 90000, is_prepared: true },
    { id: 2, order_id: 2, product_id: 5, product_name_at_time: 'Trà Đào Cam Sả Tươi', unit_price: 45000, customization: { size: 'M' }, quantity: 1, subtotal: 45000, is_prepared: true },
    { id: 3, order_id: 2, product_id: 12, product_name_at_time: 'Bánh Cheesecake Việt Quất', unit_price: 55000, customization: null, quantity: 1, subtotal: 55000, is_prepared: true },
    { id: 4, order_id: 3, product_id: 2, product_name_at_time: 'Caramel Macchiato Đặc Sản', unit_price: 65000, customization: { size: 'L' }, quantity: 2, subtotal: 130000, is_prepared: false },
    { id: 5, order_id: 4, product_id: 6, product_name_at_time: 'Bánh Croissant Bơ Pháp', unit_price: 35000, customization: { size: 'Tiêu chuẩn' }, quantity: 2, subtotal: 70000, is_prepared: false },
    { id: 6, order_id: 5, product_id: 1, product_name_at_time: 'Cà Phê Muối Aura Đặc Biệt', unit_price: 45000, customization: { size: 'M', sugar: '50%' }, quantity: 2, subtotal: 90000, is_prepared: false },
    { id: 7, order_id: 5, product_id: 5, product_name_at_time: 'Trà Đào Cam Sả Tươi', unit_price: 55000, customization: { size: 'L', ice: 'Ít đá' }, quantity: 1, subtotal: 55000, is_prepared: true },
    { id: 8, order_id: 6, product_id: 1, product_name_at_time: 'Cà Phê Muối Aura Đặc Biệt', unit_price: 55000, customization: { size: 'L', ice: 'Ít đá' }, quantity: 1, subtotal: 55000, is_prepared: false },
    { id: 9, order_id: 6, product_id: 9, product_name_at_time: 'Americano Đá Rang Đậm', unit_price: 35000, customization: { size: 'M' }, quantity: 1, subtotal: 35000, is_prepared: false },
    { id: 10, order_id: 7, product_id: 1, product_name_at_time: 'Cà Phê Muối Aura Đặc Biệt', unit_price: 45000, customization: { size: 'M' }, quantity: 2, subtotal: 90000, is_prepared: false },
    { id: 11, order_id: 7, product_id: 6, product_name_at_time: 'Bánh Croissant Bơ Pháp', unit_price: 35000, customization: { size: 'Tiêu chuẩn' }, quantity: 1, subtotal: 35000, is_prepared: false },
    { id: 12, order_id: 8, product_id: 5, product_name_at_time: 'Trà Đào Cam Sả Tươi', unit_price: 45000, customization: { size: 'M' }, quantity: 2, subtotal: 90000, is_prepared: true },
    { id: 13, order_id: 8, product_id: 12, product_name_at_time: 'Bánh Cheesecake Việt Quất', unit_price: 55000, customization: null, quantity: 1, subtotal: 55000, is_prepared: true },
    { id: 14, order_id: 9, product_id: 10, product_name_at_time: 'Latte Nghệ Thuật Hạt Phỉ', unit_price: 52000, customization: { size: 'M' }, quantity: 1, subtotal: 52000, is_prepared: true },
    { id: 15, order_id: 9, product_id: 9, product_name_at_time: 'Americano Đá Rang Đậm', unit_price: 35000, customization: { size: 'M' }, quantity: 1, subtotal: 35000, is_prepared: true },
    { id: 16, order_id: 10, product_id: 7, product_name_at_time: 'Matcha Latte Uji Kyoto Đá Xay', unit_price: 58000, customization: { size: 'M' }, quantity: 1, subtotal: 58000, is_prepared: false }
  ],

  // 7. PAYMENTS
  payments: [
    { id: 1, order_id: 1, payment_method: 'CASH', transaction_code: null, amount: 81000, status: 'SUCCESS', paid_at: '2026-10-03 09:05:00', payment_note: 'Paid at counter' },
    { id: 2, order_id: 2, payment_method: 'MOMO', transaction_code: 'MOMO-DEMO-002', amount: 115000, status: 'SUCCESS', paid_at: '2026-10-03 10:05:00', payment_note: 'Online payment' },
    { id: 3, order_id: 3, payment_method: 'VNPAY', transaction_code: 'VNPAY-DEMO-003', amount: 110000, status: 'SUCCESS', paid_at: '2026-10-03 11:05:00', payment_note: 'Paid by VNPAY' },
    { id: 4, order_id: 4, payment_method: 'CASH', transaction_code: null, amount: 70000, status: 'SUCCESS', paid_at: '2026-10-03 12:05:00', payment_note: 'Paid at counter' },
    { id: 5, order_id: 5, payment_method: 'CASH', transaction_code: null, amount: 145000, status: 'SUCCESS', paid_at: '2026-10-03 12:11:00', payment_note: 'Paid at counter' },
    { id: 6, order_id: 6, payment_method: 'MOMO', transaction_code: 'MOMO-DEMO-006', amount: 90000, status: 'SUCCESS', paid_at: '2026-10-03 12:16:00', payment_note: 'Online payment' },
    { id: 7, order_id: 7, payment_method: 'CASH', transaction_code: null, amount: 143000, status: 'PENDING', paid_at: null, payment_note: 'COD - collect on delivery' },
    { id: 8, order_id: 8, payment_method: 'VNPAY', transaction_code: 'VNPAY-DEMO-008', amount: 163000, status: 'SUCCESS', paid_at: '2026-10-03 11:46:00', payment_note: 'Paid by VNPAY' },
    { id: 9, order_id: 9, payment_method: 'CASH', transaction_code: null, amount: 105000, status: 'SUCCESS', paid_at: '2026-10-03 09:55:00', payment_note: 'COD collected by shipper' },
    { id: 10, order_id: 10, payment_method: 'MOMO', transaction_code: 'MOMO-DEMO-010', amount: 58000, status: 'FAILED', paid_at: null, payment_note: 'Order cancelled before payment' }
  ],

  // 8. LOYALTY TRANSACTIONS
  loyalty_transactions: [
    { id: 1, customer_id: 4, order_id: 1, points_change: 80, transaction_type: 'EARN', created_at: '2026-10-03 09:05:00' },
    { id: 2, customer_id: 5, order_id: 2, points_change: 100, transaction_type: 'EARN', created_at: '2026-10-03 10:05:00' },
    { id: 3, customer_id: 4, order_id: 3, points_change: -20, transaction_type: 'REDEEM', created_at: '2026-10-03 11:05:00' },
    { id: 4, customer_id: 4, order_id: 9, points_change: 80, transaction_type: 'EARN', created_at: '2026-10-03 09:55:00' }
  ],

  // 9. CUSTOMER REVIEWS
  customer_reviews: [
    { id: 1, customer_id: 4, order_id: 1, issue_type: 'RATING', rating: 5, content: 'Good coffee and friendly service', status: 'RESOLVED', admin_response: 'Thank you for your feedback', created_at: '2026-10-03 09:30:00' },
    { id: 2, customer_id: 5, order_id: 2, issue_type: 'COMPLAINT', rating: null, content: 'Delivery took longer than expected', status: 'PENDING', admin_response: null, created_at: '2026-10-03 10:45:00' },
    { id: 3, customer_id: 4, order_id: 3, issue_type: 'RATING', rating: 4, content: 'Good taste, but a little too sweet', status: 'PENDING', admin_response: null, created_at: '2026-10-03 11:30:00' }
  ],

  // 10. SUPPLIERS
  suppliers: [
    { id: 1, name: 'Fresh Bean Supplier', phone: '0911000001', address: 'Dong Da, Hanoi', status: 'ACTIVE' },
    { id: 2, name: 'Dairy and Syrup Co.', phone: '0911000002', address: 'Cau Giay, Hanoi', status: 'ACTIVE' },
    { id: 3, name: 'Bakery Ingredient Supply', phone: '0911000003', address: 'Ba Dinh, Hanoi', status: 'ACTIVE' }
  ],

  // 11. INGREDIENTS
  ingredients: [
    { id: 1, supplier_id: 1, name: 'Coffee beans', unit: 'gram', current_stock: 10000, min_stock_level: 2000 },
    { id: 2, supplier_id: 2, name: 'Fresh milk', unit: 'ml', current_stock: 20000, min_stock_level: 5000 },
    { id: 3, supplier_id: 2, name: 'Peach syrup', unit: 'ml', current_stock: 5000, min_stock_level: 1000 },
    { id: 4, supplier_id: 2, name: 'Black tea', unit: 'gram', current_stock: 8000, min_stock_level: 1500 },
    { id: 5, supplier_id: 2, name: 'Tapioca pearls', unit: 'gram', current_stock: 4000, min_stock_level: 1000 },
    { id: 6, supplier_id: 3, name: 'Cheesecake slice', unit: 'piece', current_stock: 30, min_stock_level: 5 },
    { id: 7, supplier_id: 2, name: 'Orange', unit: 'piece', current_stock: 100, min_stock_level: 20 },
    { id: 8, supplier_id: 2, name: 'Lemon', unit: 'piece', current_stock: 80, min_stock_level: 15 }
  ],

  // 12. PRODUCT INGREDIENTS
  product_ingredients: [
    { id: 1, product_id: 1, ingredient_id: 1, quantity_required: 18 },
    { id: 2, product_id: 2, ingredient_id: 1, quantity_required: 18 },
    { id: 3, product_id: 2, ingredient_id: 2, quantity_required: 180 },
    { id: 4, product_id: 3, ingredient_id: 1, quantity_required: 30 },
    { id: 5, product_id: 4, ingredient_id: 1, quantity_required: 18 },
    { id: 6, product_id: 4, ingredient_id: 2, quantity_required: 100 },
    { id: 7, product_id: 5, ingredient_id: 3, quantity_required: 30 },
    { id: 8, product_id: 5, ingredient_id: 4, quantity_required: 10 },
    { id: 9, product_id: 5, ingredient_id: 7, quantity_required: 1 },
    { id: 10, product_id: 8, ingredient_id: 4, quantity_required: 10 },
    { id: 11, product_id: 9, ingredient_id: 1, quantity_required: 18 },
    { id: 12, product_id: 10, ingredient_id: 1, quantity_required: 18 },
    { id: 13, product_id: 10, ingredient_id: 2, quantity_required: 150 },
    { id: 14, product_id: 12, ingredient_id: 6, quantity_required: 1 }
  ],

  // 13. PURCHASE ORDERS
  purchase_orders: [
    { id: 1, supplier_id: 1, creator_id: 1, total_cost: 2000000, status: 'RECEIVED', note: null, created_at: '2026-10-01 08:00:00' },
    { id: 2, supplier_id: 2, creator_id: 1, total_cost: 1500000, status: 'ORDERED', note: null, created_at: '2026-10-02 09:00:00' },
    { id: 3, supplier_id: 3, creator_id: 1, total_cost: 800000, status: 'DRAFT', note: null, created_at: '2026-10-03 08:00:00' }
  ],

  // 14. PURCHASE ORDER ITEMS
  purchase_order_items: [
    { id: 1, po_id: 1, ingredient_id: 1, quantity: 5000, unit_price: 400 },
    { id: 2, po_id: 2, ingredient_id: 2, quantity: 10000, unit_price: 150 },
    { id: 3, po_id: 2, ingredient_id: 3, quantity: 5000, unit_price: 120 },
    { id: 4, po_id: 3, ingredient_id: 6, quantity: 20, unit_price: 40000 }
  ],

  // 15. INVENTORY TRANSACTIONS
  inventory_transactions: [
    { id: 1, ingredient_id: 1, transaction_type: 'IN_PURCHASE', quantity: 5000, reference_type: 'PURCHASE_ORDER', reference_id: 1, created_at: '2026-10-01 10:00:00' },
    { id: 2, ingredient_id: 2, transaction_type: 'IN_PURCHASE', quantity: 10000, reference_type: 'PURCHASE_ORDER', reference_id: 2, created_at: '2026-10-02 10:00:00' },
    { id: 3, ingredient_id: 1, transaction_type: 'OUT_ORDER', quantity: 36, reference_type: 'ORDER', reference_id: 1, created_at: '2026-10-03 09:10:00' },
    { id: 4, ingredient_id: 2, transaction_type: 'OUT_ORDER', quantity: 360, reference_type: 'ORDER', reference_id: 2, created_at: '2026-10-03 10:10:00' },
    { id: 5, ingredient_id: 5, transaction_type: 'SPOILAGE', quantity: 100, reference_type: 'ADJUSTMENT', reference_id: null, created_at: '2026-10-03 11:00:00' },
    { id: 6, ingredient_id: 3, transaction_type: 'ADJUSTMENT', quantity: 50, reference_type: 'ADJUSTMENT', reference_id: null, created_at: '2026-10-03 11:30:00' }
  ],

  // 16. SHOP SETTINGS
  shop_settings: [
    { setting_key: 'freeship_threshold', setting_value: '150000', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'delivery_fee', setting_value: '18000', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'delivery_minutes', setting_value: '30', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'points_step', setting_value: '10', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'points_step_value', setting_value: '2000', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'store_name', setting_value: 'Aura Café', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'store_address', setting_value: '28 Tràng Tiền, Hoàn Kiếm, Hà Nội', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'store_hotline', setting_value: '1900 6868', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'points_earn_unit', setting_value: '1000', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'shift_morning', setting_value: '07:00-12:00', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'shift_afternoon', setting_value: '12:00-17:00', updated_at: '2026-10-01 08:00:00' },
    { setting_key: 'shift_evening', setting_value: '17:00-22:00', updated_at: '2026-10-01 08:00:00' }
  ]
};
