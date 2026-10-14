-- =====================================================
-- AURA CAFE ERP - DATABASE SCRIPT
-- TOTAL: 16 TABLES
-- MySQL 8.0.16+
-- =====================================================
SET NAMES utf8mb4;


CREATE DATABASE IF NOT EXISTS aura_cafe_erp
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE aura_cafe_erp;

SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS customer_reviews;
DROP TABLE IF EXISTS loyalty_transactions;
DROP TABLE IF EXISTS shop_settings;
DROP TABLE IF EXISTS inventory_transactions;
DROP TABLE IF EXISTS purchase_order_items;
DROP TABLE IF EXISTS purchase_orders;
DROP TABLE IF EXISTS product_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS work_schedules;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- GROUP A: USERS AND WORK SCHEDULES (2 TABLES)
-- =====================================================

-- 1. USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150),
    password_hash VARCHAR(255) NOT NULL,

    -- Personal information (profile page)
    birthday DATE NULL,
    address TEXT NULL,

    role ENUM('ADMIN', 'STAFF', 'CUSTOMER')
        NOT NULL DEFAULT 'CUSTOMER',

    status ENUM('ACTIVE', 'INACTIVE', 'LOCKED')
        NOT NULL DEFAULT 'ACTIVE',

    -- Employee information
    position ENUM(
        'MANAGER',
        'BARISTA',
        'CASHIER',
        'SHIPPER'
    ) NULL,

    base_salary DECIMAL(12,2) NOT NULL DEFAULT 0,
    hire_date DATE NULL,



    total_points INT NOT NULL DEFAULT 0,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_user_salary
        CHECK (base_salary >= 0),

    CONSTRAINT chk_user_points
        CHECK (total_points >= 0)
) ENGINE=InnoDB;

-- 2. WORK SCHEDULES
CREATE TABLE work_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    work_date DATE NOT NULL,

    shift_name ENUM(
        'MORNING',
        'AFTERNOON',
        'EVENING'
    ) NOT NULL,

    -- Attendance
    check_in_time DATETIME NULL,
    check_out_time DATETIME NULL,

    -- Cash handover
    starting_cash DECIMAL(12,2) NULL,
    ending_cash_system DECIMAL(12,2) NULL,
    ending_cash_actual DECIMAL(12,2) NULL,

    status ENUM(
        'SCHEDULED',
        'PRESENT',
        'ABSENT',
        'COMPLETED'
    ) NOT NULL DEFAULT 'SCHEDULED',

    note TEXT,

    CONSTRAINT fk_schedule_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_user_work_shift
        UNIQUE (user_id, work_date, shift_name),

    CONSTRAINT chk_schedule_cash
        CHECK (
            (starting_cash IS NULL OR starting_cash >= 0)
            AND (ending_cash_system IS NULL OR ending_cash_system >= 0)
            AND (ending_cash_actual IS NULL OR ending_cash_actual >= 0)
        )
) ENGINE=InnoDB;

-- =====================================================
-- GROUP B: PRODUCTS AND SALES (5 TABLES)
-- =====================================================

-- 3. CATEGORIES
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) NULL,
    description TEXT,
    image_url VARCHAR(500),
    status ENUM('ACTIVE', 'INACTIVE')
        NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB;

-- 4. PRODUCTS
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,

    badge VARCHAR(50) NULL,
    subtitle VARCHAR(150) NULL,
    -- Example:
    -- {"sizes":{"L":10000},"toppings":["Pearl"]}
    variants_config JSON NULL,

    description TEXT,
    image_url VARCHAR(500),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id),

    CONSTRAINT chk_product_price
        CHECK (base_price >= 0),

    INDEX idx_products_category (category_id)
) ENGINE=InnoDB;


-- 5. ORDERS
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(20) NOT NULL UNIQUE,

    customer_id INT NULL,
    cashier_id INT NULL,

    order_type ENUM(
        'DINE_IN',
        'TAKEAWAY',
        'ONLINE'
    ) NOT NULL,

    status ENUM(
        'PENDING',
        'CONFIRMED',
        'PREPARING',
        'READY',
        'DELIVERING',
        'COMPLETED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'PENDING',

    -- Amounts
    total_amount DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    delivery_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
    final_amount DECIMAL(12,2) NOT NULL,

    -- Delivery and recipient information
    recipient_name VARCHAR(100) NULL,
    recipient_phone VARCHAR(20) NULL,
    delivery_address TEXT NULL,
    shipper_id INT NULL,

    -- Dine-in information
    table_number VARCHAR(20) NULL,

    order_note TEXT NULL,

    -- [Bổ sung] Lý do hủy đơn (khách hủy, thu ngân hủy, shipper báo giao thất bại)
    cancel_reason TEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_order_cashier
        FOREIGN KEY (cashier_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_order_shipper
        FOREIGN KEY (shipper_id)
        REFERENCES users(id)
        ON DELETE SET NULL,


    CONSTRAINT chk_order_amounts
        CHECK (
            total_amount >= 0
            AND discount_amount >= 0
            AND delivery_fee >= 0
            AND final_amount >= 0
        ),

    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_created_at (created_at)
) ENGINE=InnoDB;

-- 6. ORDER ITEMS
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,

    -- Product snapshot
    product_name_at_time VARCHAR(150) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,

    -- Example:
    -- {"size":"L","topping":["Jelly"]}
    customization JSON NULL,

    quantity INT NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,

    -- [Bổ sung] Barista đã pha xong món này chưa (màn hình KDS tích từng món)
    is_prepared BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_order_item_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_item_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),

    CONSTRAINT chk_order_item_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_order_item_price
        CHECK (
            unit_price >= 0
            AND subtotal >= 0
        ),

    INDEX idx_order_items_order (order_id)
) ENGINE=InnoDB;

-- =====================================================
-- GROUP C: ACCOUNTING AND CUSTOMER CARE (3 TABLES)
-- =====================================================

-- 7. PAYMENTS
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,

    payment_method ENUM(
        'CASH',
        'VNPAY',
        'MOMO',
        'BANK_TRANSFER'
    ) NOT NULL,

    transaction_code VARCHAR(100) NULL,
    amount DECIMAL(12,2) NOT NULL,

    status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED'
    ) NOT NULL DEFAULT 'PENDING',

    paid_at DATETIME NULL,
    payment_note TEXT NULL,

    CONSTRAINT fk_payment_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_payment_amount
        CHECK (amount >= 0),

    INDEX idx_payments_order (order_id)
) ENGINE=InnoDB;

-- 8. LOYALTY TRANSACTIONS
CREATE TABLE loyalty_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_id INT NULL,

    points_change INT NOT NULL,

    transaction_type ENUM(
        'EARN',
        'REDEEM'
    ) NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_loyalty_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_loyalty_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_loyalty_points
        CHECK (
            (transaction_type = 'EARN' AND points_change > 0)
            OR
            (transaction_type = 'REDEEM' AND points_change < 0)
        ),

    INDEX idx_loyalty_customer (customer_id)
) ENGINE=InnoDB;

-- 9. CUSTOMER REVIEWS
CREATE TABLE customer_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_id INT NOT NULL,

    -- Combined rating and complaint
    issue_type ENUM(
        'RATING',
        'COMPLAINT'
    ) NOT NULL,

    rating INT NULL,
    content TEXT NOT NULL,

    status ENUM(
        'PENDING',
        'RESOLVED',
        'REJECTED'
    ) NOT NULL DEFAULT 'PENDING',

    admin_response TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_review_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_review_type
        CHECK (
            (issue_type = 'RATING' AND rating BETWEEN 1 AND 5)
            OR
            (issue_type = 'COMPLAINT' AND rating IS NULL)
        ),

    INDEX idx_reviews_customer (customer_id),
    INDEX idx_reviews_order (order_id)
) ENGINE=InnoDB;

-- =====================================================
-- GROUP D: INVENTORY AND BOM (6 TABLES)
-- =====================================================

-- 10. SUPPLIERS
CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,

    status ENUM('ACTIVE', 'INACTIVE')
        NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB;

-- 11. INGREDIENTS
CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NULL,
    name VARCHAR(150) NOT NULL,
    unit VARCHAR(20) NOT NULL,

    current_stock DECIMAL(12,3) NOT NULL DEFAULT 0,
    min_stock_level DECIMAL(12,3) NOT NULL DEFAULT 0,

    CONSTRAINT fk_ingredient_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_ingredient_stock
        CHECK (
            current_stock >= 0
            AND min_stock_level >= 0
        ),

    INDEX idx_ingredients_supplier (supplier_id)
) ENGINE=InnoDB;

-- 12. PRODUCT INGREDIENTS
CREATE TABLE product_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    ingredient_id INT NOT NULL,

    -- BOM quantity required for one product
    quantity_required DECIMAL(12,3) NOT NULL,

    CONSTRAINT fk_bom_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_bom_ingredient
        FOREIGN KEY (ingredient_id)
        REFERENCES ingredients(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_product_ingredient
        UNIQUE (product_id, ingredient_id),

    CONSTRAINT chk_quantity_required
        CHECK (quantity_required > 0)
) ENGINE=InnoDB;

-- 13. PURCHASE ORDERS
CREATE TABLE purchase_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    creator_id INT NOT NULL,

    total_cost DECIMAL(12,2) NOT NULL DEFAULT 0,

    status ENUM(
        'DRAFT',
        'ORDERED',
        'RECEIVED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'DRAFT',

    -- [Bổ sung] Ghi chú phiếu nhập / lý do đề xuất bổ sung kho
    note TEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_po_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id),

    CONSTRAINT fk_po_creator
        FOREIGN KEY (creator_id)
        REFERENCES users(id),

    CONSTRAINT chk_po_total
        CHECK (total_cost >= 0),

    INDEX idx_po_supplier (supplier_id)
) ENGINE=InnoDB;

-- 14. PURCHASE ORDER ITEMS
CREATE TABLE purchase_order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    po_id INT NOT NULL,
    ingredient_id INT NOT NULL,

    quantity DECIMAL(12,3) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,

    CONSTRAINT fk_poi_order
        FOREIGN KEY (po_id)
        REFERENCES purchase_orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_poi_ingredient
        FOREIGN KEY (ingredient_id)
        REFERENCES ingredients(id),

    CONSTRAINT chk_purchase_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_purchase_price
        CHECK (unit_price >= 0),

    INDEX idx_poi_order (po_id)
) ENGINE=InnoDB;

-- 15. INVENTORY TRANSACTIONS
CREATE TABLE inventory_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_id INT NOT NULL,

    transaction_type ENUM(
        'IN_PURCHASE',
        'OUT_ORDER',
        'ADJUSTMENT',
        'SPOILAGE'
    ) NOT NULL,

    -- Positive quantity; transaction_type defines direction
    quantity DECIMAL(12,3) NOT NULL,

    reference_type ENUM(
        'ORDER',
        'PURCHASE_ORDER',
        'ADJUSTMENT'
    ) NOT NULL DEFAULT 'ADJUSTMENT',

    reference_id INT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_ingredient
        FOREIGN KEY (ingredient_id)
        REFERENCES ingredients(id),

    CONSTRAINT chk_inventory_quantity
        CHECK (quantity > 0),

    INDEX idx_inventory_ingredient (ingredient_id),
    INDEX idx_inventory_reference (reference_type, reference_id)
) ENGINE=InnoDB;

-- 16. SHOP SETTINGS
CREATE TABLE shop_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value VARCHAR(255) NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- END OF SCRIPT
-- TOTAL: 16 TABLES
-- =====================================================
USE aura_cafe_erp;

-- 1. USERS
INSERT INTO users
(id, full_name, phone, email, password_hash, role, status,
 position, base_salary, hire_date, total_points)
VALUES
(1, 'Aura Admin', '0900000001', 'admin@auracafe.vn',
 'demo_hash', 'ADMIN', 'ACTIVE', 'MANAGER', 15000000,
 '2025-01-01', 0),

(2, 'Nguyen Van An', '0900000002', 'an@auracafe.vn',
 'demo_hash', 'STAFF', 'ACTIVE', 'BARISTA', 8000000,
 '2025-02-01', 0),

(3, 'Tran Thi Binh', '0900000003', 'binh@auracafe.vn',
 'demo_hash', 'STAFF', 'ACTIVE', 'CASHIER', 8500000,
 '2025-02-01', 0),

(4, 'Le Minh Anh', '0900000004', 'anh@gmail.com',
 'demo_hash', 'CUSTOMER', 'ACTIVE', NULL, 0,
 NULL, 120),

(5, 'Pham Quang Huy', '0900000005', 'huy@gmail.com',
 'demo_hash', 'CUSTOMER', 'ACTIVE', NULL, 0,
 NULL, 50),

(6, 'Hoang Van Nam', '0900000006', 'nam@auracafe.vn',
 'demo_hash', 'STAFF', 'ACTIVE', 'SHIPPER', 7500000,
 '2025-03-01', 0);

-- 2. WORK SCHEDULES
INSERT INTO work_schedules
(user_id, work_date, shift_name, check_in_time,
 check_out_time, status, starting_cash,
 ending_cash_system, ending_cash_actual, note)
VALUES
(2, '2026-10-03', 'MORNING',
 '2026-10-03 08:00:00', '2026-10-03 12:00:00',
 'COMPLETED', NULL, NULL, NULL, 'Morning shift'),

(3, '2026-10-03', 'AFTERNOON',
 '2026-10-03 12:00:00', NULL,
 'PRESENT', 500000, NULL, NULL, 'Cashier shift'),

(6, '2026-10-03', 'EVENING',
 NULL, NULL, 'SCHEDULED', NULL, NULL, NULL,
 'Delivery shift');

-- [Bổ sung dữ liệu mẫu] Barista ca chiều (màn hình KDS) và quản lý ca tối (nhận bàn giao két)
INSERT INTO work_schedules
(user_id, work_date, shift_name, check_in_time, status, note)
VALUES
(2, '2026-10-03', 'AFTERNOON', '2026-10-03 12:00:00', 'PRESENT', 'Barista ca chiều'),
(1, '2026-10-03', 'EVENING', NULL, 'SCHEDULED', 'Quản lý trực ca tối');

-- 3. CATEGORIES
INSERT INTO categories (id, name, status, icon, description, image_url) VALUES
(1, 'Cà phê máy', 'ACTIVE', 'coffee_maker', 'Espresso, Caramel Macchiato đậm đà chuẩn gu hiện đại.', 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80'),
(2, 'Cà phê truyền thống', 'ACTIVE', 'local_cafe', 'Cà phê muối, sữa đá Sài Gòn ủ phin nguyên bản ngọt êm.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'),
(3, 'Trà trái cây', 'ACTIVE', 'emoji_food_beverage', 'Trà đào cam sả, hoa quả nhiệt đới tươi mát thanh nhiệt.', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80'),
(4, 'Đá xay & Matcha', 'ACTIVE', 'icecream', 'Matcha Uji thơm bùi, đá xay mát lạnh đánh tan ngày hè.', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80'),
(5, 'Bánh ngọt', 'ACTIVE', 'bakery_dining', 'Bánh Croissant nướng bơ Pháp, cheesecake mềm béo hấp dẫn.', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80'),
(6, 'Đóng chai', 'ACTIVE', 'liquor', 'Cold brew ủ lạnh 16h đóng chai tiện lợi mang đi bất cứ đâu.', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80');

-- 4. PRODUCTS (12 menu items)
INSERT INTO products (id, category_id, name, base_price, description, badge, subtitle, variants_config, image_url, is_available) VALUES
(1, 2, 'Cà Phê Muối Aura Đặc Biệt', 45000, 
 'Fine Robusta ủ phin truyền thống phối kem sữa mằn mặn béo ngậy, cân bằng hậu vị ngọt đầm.', 
 'BÁN CHẠY', 'Phin Cổ Điển', 
 '{"sizes":{"M":0,"L":10000},"toppings":[{"name":"Extra kem muối","price":8000},{"name":"Extra shot espresso","price":10000}]}',
 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80', 1),

(2, 1, 'Caramel Macchiato Đặc Sản', 55000, 
 'Lớp sữa tươi nóng thanh dịu, quyện cùng espresso kép Arabica Cầu Đất đậm đà và vân sốt caramel thơm lừng.', 
 'BÁN CHẠY', 'Espresso Base', 
 '{"sizes":{"M":0,"L":10000},"toppings":[{"name":"Sốt caramel thêm","price":5000},{"name":"Kem whipping","price":8000}]}',
 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80', 1),

(3, 6, 'Cold Brew Đóng Chai Aura Reserve', 68000, 
 'Chiết xuất lạnh 16 tiếng từ 100% Arabica Bourbon, hương hoa quả nhiệt đới tươi mát, giữ trọn vị nguyên bản.', 
 'BÁN CHẠY', 'Ủ Lạnh 16 Tiếng', 
 '{"sizes":{"Chai 250ml":0,"Chai 500ml":35000},"toppings":[]}',
 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80', 1),

(4, 2, 'Cà Phê Sữa Đá Sài Gòn Nâu', 39000, 
 'Hạt Fine Robusta rang nâu bóng mượt, chiết xuất phin chậm kết hợp sữa đặc ngọt êm béo ngậy truyền thống.', 
 NULL, 'Đậm Vị Phin', 
 '{"sizes":{"M":0,"L":8000},"toppings":[{"name":"Thạch cà phê","price":6000},{"name":"Extra shot phin","price":8000}]}',
 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80', 1),

(5, 3, 'Trà Đào Cam Sả Tươi', 45000, 
 'Nước cốt trà đen Ceylon thanh dịu kết hợp miếng đào giòn ngọt mọng nước cùng sả tươi ấm nồng.', 
 'MÓN MỚI', 'Fresh Brew', 
 '{"sizes":{"M":0,"L":10000},"toppings":[{"name":"Thạch đào giòn","price":8000},{"name":"Hạt chia","price":5000}]}',
 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80', 1),

(6, 5, 'Bánh Croissant Bơ Pháp', 35000, 
 'Bột ngàn lớp thủ công giòn rụm bên ngoài, mềm xốp ngậy hương bơ Elle & Vire hảo hạng bên trong.', 
 'BÁN CHẠY', 'Bơ Elle & Vire', 
 '{"sizes":{"Tiêu chuẩn":0},"toppings":[{"name":"Mứt dâu tây","price":6000},{"name":"Sốt sôcôla","price":6000}]}',
 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80', 1),

(7, 4, 'Matcha Latte Uji Kyoto Đá Xay', 58000, 
 'Bột trà xanh Uji trứ danh cố đô Kyoto xay cùng sữa hạt và kem whipping bông xốp béo mịn thượng hạng.', 
 'BÁN CHẠY', 'Uji Kyoto Grade', 
 '{"sizes":{"M":0,"L":12000},"toppings":[{"name":"Kem whipping","price":8000},{"name":"Thạch matcha","price":8000}]}',
 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80', 1),

(8, 3, 'Trà Sen Vàng Long Nhãn', 49000, 
 'Hạt sen Huế ninh mềm dẻo, nhãn nhục ngọt thanh quyện cùng trà ô long hảo hạng và lớp kem củ năng giòn.', 
 NULL, 'Trà Đen Ceylon', 
 '{"sizes":{"M":0,"L":10000},"toppings":[{"name":"Hạt sen thêm","price":10000},{"name":"Củ năng giòn","price":8000}]}',
 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80', 1),

(9, 1, 'Americano Đá Rang Đậm', 35000, 
 'Espresso kép chiết xuất áp suất cao từ hạt cà phê đặc sản, vị chua thanh thanh tao và hậu ngọt dài lâu.', 
 NULL, 'Espresso Base', 
 '{"sizes":{"M":0,"L":10000},"toppings":[{"name":"Extra shot espresso","price":10000}]}',
 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80', 1),

(10, 1, 'Latte Nghệ Thuật Hạt Phỉ', 52000, 
 'Hòa quyện tinh tế giữa espresso thơm ngát, sữa tươi đánh bọt mịn màng và siro hạt phỉ thơm lừng.', 
 'MÓN MỚI', 'Espresso Base', 
 '{"sizes":{"M":0,"L":10000},"toppings":[{"name":"Siro hạt phỉ","price":6000},{"name":"Sữa yến mạch (Oat milk)","price":12000}]}',
 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80', 1),

(11, 4, 'Sôcôla Bỉ Đá Xay Hạnh Nhân', 55000, 
 'Bột cacao nguyên chất nhập khẩu Bỉ xay nhuyễn cùng sữa đặc, rắc hạnh nhân nướng giòn tan.', 
 NULL, 'Chocolate Rich', 
 '{"sizes":{"M":0,"L":10000},"toppings":[{"name":"Kem whipping","price":8000},{"name":"Hạnh nhân vụn","price":6000}]}',
 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', 1),

(12, 5, 'Bánh Cheesecake Việt Quất', 55000, 
 'Cream cheese Philadelphia béo ngậy kết hợp mứt việt quất chua ngọt dịu và đế bánh quy nướng thơm lừng.', 
 'BÁN CHẠY', 'New York Style', 
 '{"sizes":{"1 Phần":0},"toppings":[]}',
 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80', 1);


-- 5. ORDERS
INSERT INTO orders
(id, order_code, customer_id, cashier_id,
 order_type, status, total_amount, discount_amount,
 delivery_fee, final_amount, recipient_name,
 recipient_phone, delivery_address, shipper_id,
 table_number, order_note, created_at)
VALUES
(1, 'AURA-001', 4, 3,
 'DINE_IN', 'COMPLETED', 90000, 9000,
 0, 81000, NULL, NULL, NULL, NULL,
 'T01', 'Less ice', '2026-10-03 09:00:00'),

(2, 'AURA-002', 5, 3,
 'ONLINE', 'DELIVERING', 100000, 0,
 15000, 115000, 'Pham Quang Huy',
 '0900000005', 'Cau Giay, Hanoi', 6,
 NULL, 'Call before delivery', '2026-10-03 10:00:00'),

(3, 'AURA-003', 4, 3,
 'TAKEAWAY', 'CONFIRMED', 130000, 20000,
 0, 110000, NULL, NULL, NULL, NULL,
 NULL, 'No sugar', '2026-10-03 11:00:00'),

(4, 'AURA-004', NULL, 3,
 'DINE_IN', 'PREPARING', 70000, 0,
 0, 70000, NULL, NULL, NULL, NULL,
 'T02', NULL, '2026-10-03 12:00:00');

-- [Bổ sung dữ liệu mẫu] Thêm đơn để màn hình POS / KDS / Giao hàng có dữ liệu
INSERT INTO orders
(id, order_code, customer_id, cashier_id,
 order_type, status, total_amount, discount_amount,
 delivery_fee, final_amount, recipient_name,
 recipient_phone, delivery_address, shipper_id,
 table_number, order_note, cancel_reason, created_at)
VALUES
(5, 'AURA-005', 5, 3,
 'DINE_IN', 'PREPARING', 145000, 0,
 0, 145000, NULL, NULL, NULL, NULL,
 'T03', NULL, NULL, '2026-10-03 12:10:00'),

(6, 'AURA-006', NULL, 3,
 'TAKEAWAY', 'CONFIRMED', 90000, 0,
 0, 90000, NULL, NULL, NULL, NULL,
 NULL, 'Less ice', NULL, '2026-10-03 12:15:00'),

(7, 'AURA-007', 4, NULL,
 'ONLINE', 'CONFIRMED', 125000, 0,
 18000, 143000, 'Le Minh Anh',
 '0900000004', 'Hoan Kiem, Hanoi', NULL,
 NULL, 'Call before delivery', NULL, '2026-10-03 12:20:00'),

(8, 'AURA-008', 5, NULL,
 'ONLINE', 'READY', 145000, 0,
 18000, 163000, 'Pham Quang Huy',
 '0900000005', 'Dong Da, Hanoi', 6,
 NULL, NULL, NULL, '2026-10-03 11:45:00'),

(9, 'AURA-009', 4, NULL,
 'ONLINE', 'COMPLETED', 87000, 0,
 18000, 105000, 'Le Minh Anh',
 '0900000004', 'Hoan Kiem, Hanoi', 6,
 NULL, NULL, NULL, '2026-10-03 09:30:00'),

(10, 'AURA-010', 4, 3,
 'TAKEAWAY', 'CANCELLED', 58000, 0,
 0, 58000, NULL, NULL, NULL, NULL,
 NULL, NULL, 'Customer changed mind', '2026-10-03 10:30:00');

-- 6. ORDER ITEMS
INSERT INTO order_items
(order_id, product_id, product_name_at_time,
 unit_price, customization, quantity, subtotal)
VALUES
(1, 1, 'Cà Phê Muối Aura Đặc Biệt', 45000,
 '{"size":"M"}', 2, 90000),

(2, 5, 'Trà Đào Cam Sả Tươi', 45000,
 '{"size":"M"}', 1, 45000),

(2, 12, 'Bánh Cheesecake Việt Quất', 55000,
 NULL, 1, 55000),

(3, 2, 'Caramel Macchiato Đặc Sản', 65000,
 '{"size":"L"}', 2, 130000),

(4, 6, 'Bánh Croissant Bơ Pháp', 35000,
 '{"size":"Tiêu chuẩn"}', 2, 70000);

-- [Bổ sung] Đơn đã giao / đang giao thì món đã pha xong
UPDATE order_items SET is_prepared = TRUE WHERE order_id IN (1, 2);

-- [Bổ sung dữ liệu mẫu] Món của các đơn 5 - 10
INSERT INTO order_items
(order_id, product_id, product_name_at_time,
 unit_price, customization, quantity, subtotal, is_prepared)
VALUES
(5, 1, 'Cà Phê Muối Aura Đặc Biệt', 45000,
 '{"size":"M","sugar":"50%"}', 2, 90000, FALSE),

(5, 5, 'Trà Đào Cam Sả Tươi', 55000,
 '{"size":"L","ice":"Ít đá"}', 1, 55000, TRUE),

(6, 1, 'Cà Phê Muối Aura Đặc Biệt', 55000,
 '{"size":"L","ice":"Ít đá"}', 1, 55000, FALSE),

(6, 9, 'Americano Đá Rang Đậm', 35000,
 '{"size":"M"}', 1, 35000, FALSE),

(7, 1, 'Cà Phê Muối Aura Đặc Biệt', 45000,
 '{"size":"M"}', 2, 90000, FALSE),

(7, 6, 'Bánh Croissant Bơ Pháp', 35000,
 '{"size":"Tiêu chuẩn"}', 1, 35000, FALSE),

(8, 5, 'Trà Đào Cam Sả Tươi', 45000,
 '{"size":"M"}', 2, 90000, TRUE),

(8, 12, 'Bánh Cheesecake Việt Quất', 55000,
 NULL, 1, 55000, TRUE),

(9, 10, 'Latte Nghệ Thuật Hạt Phỉ', 52000,
 '{"size":"M"}', 1, 52000, TRUE),

(9, 9, 'Americano Đá Rang Đậm', 35000,
 '{"size":"M"}', 1, 35000, TRUE),

(10, 7, 'Matcha Latte Uji Kyoto Đá Xay', 58000,
 '{"size":"M"}', 1, 58000, FALSE);

-- 7. PAYMENTS
INSERT INTO payments
(order_id, payment_method, transaction_code,
 amount, status, paid_at, payment_note)
VALUES
(1, 'CASH', NULL, 81000,
 'SUCCESS', '2026-10-03 09:05:00', 'Paid at counter'),

(2, 'MOMO', 'MOMO-DEMO-002', 115000,
 'SUCCESS', '2026-10-03 10:05:00', 'Online payment'),

(3, 'VNPAY', 'VNPAY-DEMO-003', 110000,
 'SUCCESS', '2026-10-03 11:05:00', 'Paid by VNPAY'),

(4, 'CASH', NULL, 70000,
 'SUCCESS', '2026-10-03 12:05:00', 'Paid at counter'),

-- [Bổ sung dữ liệu mẫu] Thanh toán của các đơn 5 - 10
(5, 'CASH', NULL, 145000,
 'SUCCESS', '2026-10-03 12:11:00', 'Paid at counter'),

(6, 'MOMO', 'MOMO-DEMO-006', 90000,
 'SUCCESS', '2026-10-03 12:16:00', 'Online payment'),

(7, 'CASH', NULL, 143000,
 'PENDING', NULL, 'COD - collect on delivery'),

(8, 'VNPAY', 'VNPAY-DEMO-008', 163000,
 'SUCCESS', '2026-10-03 11:46:00', 'Paid by VNPAY'),

(9, 'CASH', NULL, 105000,
 'SUCCESS', '2026-10-03 09:55:00', 'COD collected by shipper'),

(10, 'MOMO', 'MOMO-DEMO-010', 58000,
 'FAILED', NULL, 'Order cancelled before payment');

-- 8. LOYALTY TRANSACTIONS
INSERT INTO loyalty_transactions
(customer_id, order_id, points_change, transaction_type)
VALUES
(4, 1, 80, 'EARN'),
(5, 2, 100, 'EARN'),
(4, 3, -20, 'REDEEM'),
-- [Bổ sung dữ liệu mẫu]
(4, 9, 80, 'EARN');

-- 9. CUSTOMER REVIEWS
INSERT INTO customer_reviews
(customer_id, order_id, issue_type, rating,
 content, status, admin_response)
VALUES
(4, 1, 'RATING', 5,
 'Good coffee and friendly service',
 'RESOLVED', 'Thank you for your feedback'),

(5, 2, 'COMPLAINT', NULL,
 'Delivery took longer than expected',
 'PENDING', NULL),

(4, 3, 'RATING', 4,
 'Good taste, but a little too sweet',
 'PENDING', NULL);

-- 10. SUPPLIERS
INSERT INTO suppliers
(id, name, phone, address, status)
VALUES
(1, 'Fresh Bean Supplier', '0911000001',
 'Dong Da, Hanoi', 'ACTIVE'),

(2, 'Dairy and Syrup Co.', '0911000002',
 'Cau Giay, Hanoi', 'ACTIVE'),

(3, 'Bakery Ingredient Supply', '0911000003',
 'Ba Dinh, Hanoi', 'ACTIVE');

-- 11. INGREDIENTS
INSERT INTO ingredients
(id, supplier_id, name, unit,
 current_stock, min_stock_level)
VALUES
(1, 1, 'Coffee beans', 'gram', 10000, 2000),
(2, 2, 'Fresh milk', 'ml', 20000, 5000),
(3, 2, 'Peach syrup', 'ml', 5000, 1000),
(4, 2, 'Black tea', 'gram', 8000, 1500),
(5, 2, 'Tapioca pearls', 'gram', 4000, 1000),
(6, 3, 'Cheesecake slice', 'piece', 30, 5),
(7, 2, 'Orange', 'piece', 100, 20),
(8, 2, 'Lemon', 'piece', 80, 15);

-- 12. PRODUCT INGREDIENTS
INSERT INTO product_ingredients
(product_id, ingredient_id, quantity_required)
VALUES
(1, 1, 18),
(2, 1, 18),
(2, 2, 180),
(3, 1, 30),
(4, 1, 18),
(4, 2, 100),
(5, 3, 30),
(5, 4, 10),
(5, 7, 1),
(8, 4, 10),
(9, 1, 18),
(10, 1, 18),
(10, 2, 150),
(12, 6, 1);

-- 13. PURCHASE ORDERS
INSERT INTO purchase_orders
(id, supplier_id, creator_id, total_cost,
 status, created_at)
VALUES
(1, 1, 1, 2000000, 'RECEIVED', '2026-10-01 08:00:00'),
(2, 2, 1, 1500000, 'ORDERED', '2026-10-02 09:00:00'),
(3, 3, 1, 800000, 'DRAFT', '2026-10-03 08:00:00');

-- 14. PURCHASE ORDER ITEMS
INSERT INTO purchase_order_items
(po_id, ingredient_id, quantity, unit_price)
VALUES
(1, 1, 5000, 400),
(2, 2, 10000, 150),
(2, 3, 5000, 120),
(3, 6, 20, 40000);

-- 15. INVENTORY TRANSACTIONS
INSERT INTO inventory_transactions
(ingredient_id, transaction_type, quantity,
 reference_type, reference_id, created_at)
VALUES
(1, 'IN_PURCHASE', 5000, 'PURCHASE_ORDER', 1, '2026-10-01 10:00:00'),
(2, 'IN_PURCHASE', 10000, 'PURCHASE_ORDER', 2, '2026-10-02 10:00:00'),
(1, 'OUT_ORDER', 36, 'ORDER', 1, '2026-10-03 09:10:00'),
(2, 'OUT_ORDER', 360, 'ORDER', 2, '2026-10-03 10:10:00'),
(5, 'SPOILAGE', 100, 'ADJUSTMENT', NULL, '2026-10-03 11:00:00'),
(3, 'ADJUSTMENT', 50, 'ADJUSTMENT', NULL, '2026-10-03 11:30:00');

-- 16. SHOP SETTINGS
INSERT INTO shop_settings (setting_key, setting_value) VALUES
('freeship_threshold', '150000'),
('delivery_fee', '18000'),
('delivery_minutes', '30'),
('points_step', '10'),
('points_step_value', '2000'),
-- [Bổ sung] Thông tin cửa hàng, quy tắc tích điểm và giờ ca làm (giao diện đọc từ đây)
('store_name', 'Aura Café'),
('store_address', '28 Tràng Tiền, Hoàn Kiếm, Hà Nội'),
('store_hotline', '1900 6868'),
('points_earn_unit', '1000'),
('shift_morning', '07:00-12:00'),
('shift_afternoon', '12:00-17:00'),
('shift_evening', '17:00-22:00');

-- =====================================================
-- VERIFY DATA
-- =====================================================

SELECT 'users' AS table_name, COUNT(*) AS total FROM users
UNION ALL SELECT 'work_schedules', COUNT(*) FROM work_schedules
UNION ALL SELECT 'categories', COUNT(*) FROM categories
UNION ALL SELECT 'products', COUNT(*) FROM products
UNION ALL SELECT 'orders', COUNT(*) FROM orders
UNION ALL SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL SELECT 'payments', COUNT(*) FROM payments
UNION ALL SELECT 'loyalty_transactions', COUNT(*) FROM loyalty_transactions
UNION ALL SELECT 'customer_reviews', COUNT(*) FROM customer_reviews
UNION ALL SELECT 'suppliers', COUNT(*) FROM suppliers
UNION ALL SELECT 'ingredients', COUNT(*) FROM ingredients
UNION ALL SELECT 'product_ingredients', COUNT(*) FROM product_ingredients
UNION ALL SELECT 'purchase_orders', COUNT(*) FROM purchase_orders
UNION ALL SELECT 'purchase_order_items', COUNT(*) FROM purchase_order_items
UNION ALL SELECT 'inventory_transactions', COUNT(*) FROM inventory_transactions
UNION ALL SELECT 'shop_settings', COUNT(*) FROM shop_settings;

SELECT * FROM products;
SELECT * FROM ingredients;