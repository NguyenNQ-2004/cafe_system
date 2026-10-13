-- ====================================================================
-- AURA CAFÉ SYSTEM - COMPLETE MYSQL DATABASE SCHEMA & INITIAL DATA
-- Phục vụ cho môn học Java Web (JSP / Servlet / Bootstrap / MySQL)
-- ====================================================================

DROP DATABASE IF EXISTS aura_cafe_db;
CREATE DATABASE aura_cafe_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aura_cafe_db;

-- 1. BẢNG NGƯỜI DÙNG & TÀI KHOẢN (Users)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Mật khẩu mặc định: 123456
    role ENUM('ADMIN', 'STAFF', 'CASHIER', 'BARISTA', 'DELIVERY_STAFF', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    status ENUM('ACTIVE', 'INACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE',
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG NHÂN VIÊN (Employees)
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    employee_code VARCHAR(20) UNIQUE NOT NULL,
    position VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(12, 2) DEFAULT 0,
    employment_status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. BẢNG CA LÀM VIỆC (Work Shifts - Screen 24)
CREATE TABLE work_shifts (
    shift_id INT AUTO_INCREMENT PRIMARY KEY,
    shift_name VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

-- 4. BẢNG XẾP LỊCH LÀM VIỆC (Employee Schedules - Screen 25)
CREATE TABLE employee_schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    shift_id INT NOT NULL,
    work_date DATE NOT NULL,
    assigned_by INT,
    note VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (shift_id) REFERENCES work_shifts(shift_id),
    FOREIGN KEY (assigned_by) REFERENCES users(user_id)
);

-- 5. BẢNG CHẤM CÔNG (Attendances - Screen 26)
CREATE TABLE attendances (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    shift_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    check_in TIMESTAMP NULL,
    check_out TIMESTAMP NULL,
    status ENUM('PRESENT', 'LATE', 'ABSENT', 'LEAVE') DEFAULT 'PRESENT',
    note VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (shift_id) REFERENCES work_shifts(shift_id)
);

-- 6. BẢNG BÀN GIAO CA THU NGÂN (Shift Handovers - Screen 27)
CREATE TABLE shift_handovers (
    handover_id INT AUTO_INCREMENT PRIMARY KEY,
    handover_code VARCHAR(30) UNIQUE NOT NULL,
    outgoing_employee_id INT NOT NULL,
    incoming_employee_id INT NOT NULL,
    shift_id INT NOT NULL,
    handover_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cash_in_drawer DECIMAL(12, 2) NOT NULL, -- Tiền mặt thực tế đếm được
    theoretical_cash DECIMAL(12, 2) NOT NULL, -- Tiền mặt theo hệ thống
    difference_amount DECIMAL(12, 2) DEFAULT 0, -- Chênh lệch
    hardware_status_ok BOOLEAN DEFAULT TRUE,
    handover_note TEXT,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED') DEFAULT 'ACCEPTED',
    FOREIGN KEY (outgoing_employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (incoming_employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (shift_id) REFERENCES work_shifts(shift_id)
);

-- 7. BẢNG DANH MỤC SẢN PHẨM (Categories - Screen 15)
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    display_order INT DEFAULT 0,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

-- 8. BẢNG SẢN PHẨM (Products - Screen 16)
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    status ENUM('AVAILABLE', 'UNAVAILABLE') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- 9. BẢNG BIẾN THỂ SẢN PHẨM / SIZE (Product Variants - Screen 5)
CREATE TABLE product_variants (
    variant_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    size_name VARCHAR(20) NOT NULL, -- Size M, Size L
    sku VARCHAR(50) UNIQUE,
    price_adjustment DECIMAL(10, 2) DEFAULT 0, -- Giá cộng thêm
    final_price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- 10. BẢNG NHÀ CUNG CẤP (Suppliers - Screen 21)
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(150) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

-- 11. BẢNG NGUYÊN VẬT LIỆU (Ingredients - Screen 18)
CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT,
    ingredient_name VARCHAR(150) NOT NULL,
    unit VARCHAR(20) NOT NULL, -- kg, lít, hộp, túi
    stock_quantity DECIMAL(10, 2) DEFAULT 0,
    minimum_stock DECIMAL(10, 2) DEFAULT 5.0,
    cost_per_unit DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- 12. BẢNG CÔNG THỨC ĐỊNH LƯỢNG (Recipes / BOM - Screen 17)
CREATE TABLE product_ingredients (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity_required DECIMAL(10, 3) NOT NULL, -- VD: 0.020 kg cà phê hạt
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

-- 13. BẢNG ĐỀ XUẤT NHẬP KHO (Restock Requests - Screen 20)
CREATE TABLE restock_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    request_code VARCHAR(30) UNIQUE NOT NULL,
    requested_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    urgency ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    note TEXT,
    FOREIGN KEY (requested_by) REFERENCES employees(employee_id)
);

-- 14. BẢNG ĐƠN ĐẶT MUA HÀNG (Purchase Orders - Screen 22)
CREATE TABLE purchase_orders (
    purchase_order_id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_order_code VARCHAR(30) UNIQUE NOT NULL,
    supplier_id INT NOT NULL,
    created_by INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12, 2) DEFAULT 0,
    status ENUM('DRAFT', 'ORDERED', 'RECEIVED', 'CANCELLED') DEFAULT 'ORDERED',
    note TEXT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (created_by) REFERENCES employees(employee_id)
);

-- 15. BẢNG TÍCH ĐIỂM SỐ ĐIỆN THOẠI (Phone Loyalty - Screen 29, bỏ hạng thẻ)
CREATE TABLE customer_loyalty (
    loyalty_id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    points_balance INT DEFAULT 0,
    total_spent DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 16. BẢNG LỊCH SỬ TÍCH/ĐỔI ĐIỂM (Loyalty Logs - Screen 29)
CREATE TABLE loyalty_transactions (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    order_id INT NULL,
    type ENUM('EARN', 'REDEEM', 'MANUAL_ADD', 'MANUAL_SUB') NOT NULL,
    points_changed INT NOT NULL,
    balance_after INT NOT NULL,
    note VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (phone_number) REFERENCES customer_loyalty(phone_number)
);

-- 17. BẢNG ĐƠN HÀNG (Orders - Screen 7, Screen 8, Screen 11, Screen 12)
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(30) UNIQUE NOT NULL,
    customer_phone VARCHAR(20),
    created_by_employee_id INT NULL, -- Thu ngân tạo đơn nếu tại quầy
    order_type ENUM('COUNTER', 'ONLINE') NOT NULL DEFAULT 'COUNTER',
    order_status ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount_points DECIMAL(10, 2) DEFAULT 0, -- Giảm giá bằng điểm SĐT
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('UNPAID', 'PAID', 'REFUNDED') DEFAULT 'UNPAID',
    payment_method ENUM('CASH', 'VIETQR', 'CARD') DEFAULT 'CASH',
    delivery_address VARCHAR(255),
    delivery_driver_id INT NULL,
    note VARCHAR(255),
    FOREIGN KEY (created_by_employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (delivery_driver_id) REFERENCES employees(employee_id)
);

-- 18. BẢNG CHI TIẾT ĐƠN HÀNG (Order Items)
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    variant_id INT NULL,
    item_name VARCHAR(150) NOT NULL,
    size_name VARCHAR(20) DEFAULT 'M',
    sugar_level VARCHAR(30) DEFAULT '100% Tiêu chuẩn',
    ice_level VARCHAR(30) DEFAULT 'Đá Chuẩn',
    toppings VARCHAR(255),
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    line_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 19. BẢNG ĐÁNH GIÁ & KHIẾU NẠI (Feedbacks & Complaints - Screen 30)
CREATE TABLE feedbacks_complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_code VARCHAR(30) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    order_code VARCHAR(30),
    type ENUM('FEEDBACK', 'COMPLAINT') DEFAULT 'FEEDBACK',
    rating INT DEFAULT 5, -- 1 đến 5 sao
    content TEXT NOT NULL,
    status ENUM('NEW', 'PROCESSING', 'RESOLVED', 'REJECTED') DEFAULT 'NEW',
    admin_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- DỮ LIỆU KHỞI TẠO MẪU (SEED DATA MOCK KHỚP 100% VỚI WEB DEMO)
-- ====================================================================

-- 1. Tài khoản Người dùng (Mật khẩu: 123456)
INSERT INTO users (full_name, email, phone, password_hash, role, status) VALUES
('Quản Trị Viên Aura', 'admin@auracafe.com', '0901000001', '123456', 'ADMIN', 'ACTIVE'),
('Trần Mai Ly', 'ly.tran@auracafe.com', '0902000002', '123456', 'CASHIER', 'ACTIVE'),
('Lê Hoàng Nam', 'nam.le@auracafe.com', '0903000003', '123456', 'CASHIER', 'ACTIVE'),
('Nguyễn Tuấn Anh', 'anh.barista@auracafe.com', '0904000004', '123456', 'BARISTA', 'ACTIVE'),
('Đỗ Văn Hùng', 'hung.ship@auracafe.com', '0905000005', '123456', 'DELIVERY_STAFF', 'ACTIVE'),
('Nguyễn Văn An', 'van.an.nguyen@example.com', '0908123456', '123456', 'CUSTOMER', 'ACTIVE');

-- 2. Hồ sơ Nhân viên
INSERT INTO employees (user_id, employee_code, position, hire_date, salary) VALUES
(1, 'NV-0001', 'Quản lý cửa hàng', '2024-01-01', 15000000),
(2, 'NV-8821', 'Thu ngân Ca Sáng', '2024-03-15', 7500000),
(3, 'NV-7603', 'Thu ngân Ca Chiều', '2024-04-01', 7500000),
(4, 'NV-0042', 'Trưởng quầy Barista', '2024-02-10', 9000000),
(5, 'NV-0902', 'Tài xế giao vận', '2024-05-20', 8000000);

-- 3. Khung Ca làm việc
INSERT INTO work_shifts (shift_name, start_time, end_time, description) VALUES
('Ca Sáng', '06:30:00', '14:30:00', 'Mở quán, chuẩn bị nguyên liệu, phục vụ cao điểm sáng'),
('Ca Chiều', '14:30:00', '22:30:00', 'Phục vụ ca chiều - tối, vệ sinh máy móc, chốt ca kết ngày');

-- 4. Danh mục sản phẩm
INSERT INTO categories (category_name, description, display_order) VALUES
('Cà Phê Đặc Sản', 'Espresso và Cà phê hạt Arabica tuyển chọn', 1),
('Phin & Cà Phê Việt', 'Cà phê truyền thống đậm đà Việt Nam', 2),
('Trà Trái Cây & Macchiato', 'Trà thanh mát kết hợp trái cây tươi và lớp kem béo', 3),
('Đá Xay & Bánh Ngọt', 'Ice blended và bánh pastry nướng tươi mỗi ngày', 4);

-- 5. Sản phẩm
INSERT INTO products (category_id, product_name, description, base_price, image_url) VALUES
(2, 'Cà Phê Muối Aura Đặc Biệt', 'Vị cà phê phin đậm đà hòa quyện cùng lớp kem béo mặn signature', 55000, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'),
(2, 'Bạc Xỉu Sữa Tươi Cốt Dừa', 'Hòa quyện giữa sữa đặc béo ngậy, sữa tươi thanh mát và cốt dừa thơm nức', 45000, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600'),
(3, 'Trà Sen Vàng Hạt Sen', 'Trà Oolong thanh khiết kèm hạt sen bùi béo và củ năng giòn ngọt', 49000, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600'),
(3, 'Trà Đào Cam Sả Tươi', 'Vị trà đen thanh tao kết hợp cùng đào giòn ngâm và hương sả nồng nàn', 45000, 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600'),
(4, 'Matcha Đá Xay Kem Tươi', 'Bột matcha Uji Nhật Bản xay mịn cùng sữa tươi và kem whipping béo ngậy', 59000, 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600'),
(4, 'Bánh Croissant Bơ Tỏi Nướng', 'Bánh sừng bò ngàn lớp vỏ giòn rụm với sốt bơ tỏi thơm lừng', 35000, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600');

-- 6. Biến thể / Size
INSERT INTO product_variants (product_id, size_name, sku, price_adjustment, final_price) VALUES
(1, 'Size M', 'AUR-CFM-M', 0, 55000),
(1, 'Size L', 'AUR-CFM-L', 10000, 65000),
(2, 'Size M', 'AUR-BX-M', 0, 45000),
(2, 'Size L', 'AUR-BX-L', 10000, 55000),
(3, 'Size M', 'AUR-TSV-M', 0, 49000),
(3, 'Size L', 'AUR-TSV-L', 10000, 59000);

-- 7. Nhà cung cấp
INSERT INTO suppliers (supplier_name, contact_person, phone, email, address) VALUES
('Nông Trại Cà Phê Cầu Đất Farm', 'Anh Nguyễn Văn Lâm', '0918112233', 'caudat@supply.vn', 'Đà Lạt, Lâm Đồng'),
('Công ty Sữa Tươi Barista Milk', 'Chị Lê Thị Thu', '0988445566', 'sales@baristamilk.vn', 'Củ Chi, TP. Hồ Chí Minh');

-- 8. Nguyên vật liệu
INSERT INTO ingredients (supplier_id, ingredient_name, unit, stock_quantity, minimum_stock, cost_per_unit) VALUES
(1, 'Hạt Cà Phê Arabica Cầu Đất', 'kg', 45.5, 10.0, 180000),
(1, 'Hạt Cà Phê Robusta Buôn Ma Thuột', 'kg', 60.0, 15.0, 120000),
(2, 'Sữa Tươi Thanh Trùng Barista', 'lít', 85.0, 20.0, 32000),
(2, 'Kem Béo Thực Vật (Whipping)', 'hộp', 35.0, 8.0, 65000),
(1, 'Hạt Sen Tươi Huế', 'kg', 12.0, 3.0, 140000);

-- 9. Tích điểm Số Điện Thoại (Khách hàng)
INSERT INTO customer_loyalty (phone_number, customer_name, email, points_balance, total_spent) VALUES
('0908123456', 'Nguyễn Văn An', 'van.an.nguyen@example.com', 450, 4250000),
('0988234891', 'Hoàng Kim', 'kim.hoang@gmail.com', 790, 8920000),
('0912345678', 'Trần Bảo Ngọc', 'ngoc.tran@yahoo.com', 310, 3180000);

-- 10. Đơn hàng mẫu
INSERT INTO orders (order_code, customer_phone, created_by_employee_id, order_type, order_status, subtotal, discount_points, delivery_fee, final_amount, payment_status, payment_method) VALUES
('#AUR-89241', '0908123456', NULL, 'ONLINE', 'PREPARING', 194000, 20000, 15000, 189000, 'PAID', 'VIETQR'),
('#ORD-0089', '0988234891', 2, 'COUNTER', 'COMPLETED', 110000, 10000, 0, 100000, 'PAID', 'CASH');

-- 11. Chi tiết đơn hàng
INSERT INTO order_items (order_id, product_id, item_name, size_name, sugar_level, ice_level, quantity, unit_price, line_total) VALUES
(1, 1, 'Cà Phê Muối Aura Đặc Biệt', 'Size L', '100% Tiêu chuẩn', 'Đá Chuẩn', 2, 65000, 130000),
(1, 3, 'Trà Sen Vàng Hạt Sen', 'Size M', '50% Đường', 'Ít đá', 1, 49000, 49000),
(2, 1, 'Cà Phê Muối Aura Đặc Biệt', 'Size M', '100% Tiêu chuẩn', 'Đá Chuẩn', 2, 55000, 110000);

-- 12. Đánh giá & Khiếu nại mẫu
INSERT INTO feedbacks_complaints (ticket_code, customer_name, customer_phone, order_code, type, rating, content, status, admin_response) VALUES
('FB-1049', 'Nguyễn Văn An', '0908123456', '#AUR-89241', 'FEEDBACK', 5, 'Cà phê muối rất thơm, kem béo vừa vặn không bị ngấy. Giao hàng nhanh!', 'RESOLVED', 'Cảm ơn quý khách đã ủng hộ Aura Café!'),
('FB-1048', 'Lê Minh Anh', '0900000004', '#AUR-88210', 'COMPLAINT', 2, 'Giao hàng trễ 20 phút làm tan hết đá trà đào.', 'PROCESSING', 'Aura Café xin lỗi bạn, cửa hàng đã gửi voucher hoàn bù đơn.');
