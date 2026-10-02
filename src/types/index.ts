export type AppModule = 'customer' | 'pos' | 'kds' | 'delivery' | 'admin';

export type PageRoute =
  | 'home'
  | 'menu'
  | 'customize'
  | 'cart'
  | 'checkout'
  | 'payment'
  | 'orders'
  | 'profile'
  | 'pos-create'
  | 'pos-orders'
  | 'kds-terminal'
  | 'delivery-orders'
  | 'feedback'
  | 'pos-shift'
  | 'pos-handover'
  | 'kds-recipe'
  | 'delivery-report'
  | 'delivery-cod'
  | 'admin-ingredients'
  | 'admin-purchases'
  | 'admin-overview'
  | 'admin-categories'
  | 'admin-products'
  | 'admin-stock'
  | 'admin-orders'
  | 'admin-vouchers'
  | 'admin-users'
  | 'admin-attendance'
  | 'admin-settings';

// =========================================
// UI & VIEW MODELS (FRONTEND SPECIFIC)
// =========================================

export interface Product {
  id: string;
  name: string;
  category: 'espresso' | 'traditional' | 'tea' | 'iceblended' | 'bakery' | 'bottled';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  tag?: string;
  tagType?: 'bestseller' | 'new';
  badge: string;
  popularity: number;
  sensoryProfile?: {
    body: number;
    creaminess: number;
    sweetness: number;
  };
  details?: {
    beans?: string;
    cream?: string;
    extraction?: string;
    temperature?: string;
  };
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  categoryTitle?: string;
  image: string;
  size: 'S' | 'M' | 'L';
  sugar: string;
  ice: string;
  toppings: { name: string; price: number }[];
  note: string;
  unitPrice: number;
  quantity: number;
  checked?: boolean;
}

export interface PastOrder {
  id: string;
  date: string;
  time: string;
  status: 'processing' | 'shipping' | 'completed' | 'canceled';
  statusLabel: string;
  total: number;
  refundedAmount?: number;
  cancelReason?: string;
  itemsSummary: string;
  address: string;
  paymentMethod: string;
  pointsEarned?: number;
  image: string;
}

export interface FeedbackTicket {
  id: string;
  orderId: string;
  title: string;
  createdAt: string;
  status: 'processing' | 'resolved';
  statusLabel: string;
  progressPercent: number;
  agentName?: string;
  agentNote?: string;
  resolution?: string;
  giftVoucher?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  birthday: string;
  gender: string;
  address: string;
  tier: 'Silver' | 'Gold' | 'Diamond';
  memberId: string;
  points: number;
  joinDate: string;
  avatar: string;
  twoFactorEnabled: boolean;
}

// =========================================
// DATABASE MODELS (BACKEND MAPPING)
// =========================================

export interface DbUser {
  user_id: number;
  full_name: string;
  email: string;
  phone?: string;
  password_hash: string;
  role: 'ADMIN' | 'CUSTOMER' | 'STAFF' | 'BARISTA' | 'CASHIER' | 'DELIVERY_STAFF';
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  created_at: string;
}

export interface DbEmployee {
  employee_id: number;
  user_id: number;
  employee_code: string;
  hire_date?: string;
  salary?: number;
  employment_status: 'ACTIVE' | 'INACTIVE';
}

export interface DbWorkShift {
  shift_id: number;
  shift_name: string;
  start_time: string;
  end_time: string;
  description?: string;
  is_active: boolean;
}

export interface DbEmployeeSchedule {
  schedule_id: number;
  employee_id: number;
  shift_id: number;
  work_date: string;
  assigned_by?: number;
  note?: string;
}

export interface DbAttendance {
  attendance_id: number;
  employee_id: number;
  shift_id: number;
  admin_id: number;
  attendance_date: string;
  check_in?: string;
  check_out?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'LEAVE';
  note?: string;
}

export interface DbShiftHandover {
  handover_id: number;
  outgoing_employee_id: number;
  incoming_employee_id: number;
  outgoing_shift_id: number;
  incoming_shift_id: number;
  handover_time: string;
  handover_note?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface DbCategory {
  category_id: number;
  category_name: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface DbProduct {
  product_id: number;
  category_id: number;
  product_name: string;
  description?: string;
  image_url?: string;
  status: 'AVAILABLE' | 'UNAVAILABLE';
  created_at: string;
}

export interface DbProductVariant {
  variant_id: number;
  product_id: number;
  variant_name: string;
  sku?: string;
  price: number;
  is_active: boolean;
}

export interface DbVoucher {
  voucher_id: number;
  code: string;
  description?: string;
  discount_type: 'PERCENT' | 'FIXED';
  discount_value: number;
  start_at?: string;
  end_at?: string;
  usage_limit?: number;
  is_active: boolean;
}

export interface DbOrder {
  order_id: number;
  order_code: string;
  user_id?: number;
  created_by_employee_id?: number;
  voucher_id?: number;
  order_type: 'ONLINE' | 'COUNTER';
  order_status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';
  order_date: string;
  subtotal: number;
  discount_amount: number;
  total_amount: number;
  recipient_name?: string;
  recipient_phone?: string;
  delivery_address?: string;
  delivery_employee_id?: number;
  delivery_status: 'NOT_REQUIRED' | 'PENDING' | 'PICKED_UP' | 'DELIVERED' | 'FAILED';
  note?: string;
}

export interface DbOrderItem {
  order_item_id: number;
  order_id: number;
  variant_id: number;
  product_name_snapshot: string;
  variant_name_snapshot?: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface DbPayment {
  payment_id: number;
  order_id: number;
  payment_method: 'CASH' | 'CARD' | 'BANK_TRANSFER' | 'E_WALLET';
  amount: number;
  payment_status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  transaction_code?: string;
  paid_at?: string;
  created_at: string;
}

export interface DbMembership {
  membership_id: number;
  user_id: number;
  tier_name: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  points_balance: number;
  joined_at: string;
}

export interface DbLoyaltyTransaction {
  loyalty_transaction_id: number;
  membership_id: number;
  order_id?: number;
  points_change: number;
  transaction_type: 'EARN' | 'REDEEM' | 'ADJUST';
  note?: string;
  created_at: string;
}

export interface DbComplaint {
  complaint_id: number;
  user_id: number;
  order_id?: number;
  subject: string;
  description: string;
  status: 'NEW' | 'PROCESSING' | 'RESOLVED' | 'REJECTED';
  admin_response?: string;
  handled_by?: number;
  created_at: string;
  resolved_at?: string;
}

export interface DbFeedback {
  feedback_id: number;
  user_id: number;
  product_id?: number;
  order_id?: number;
  rating?: number;
  comment?: string;
  created_at: string;
}

export interface DbSupplier {
  supplier_id: number;
  supplier_name: string;
  phone?: string;
  email?: string;
  address?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface DbIngredient {
  ingredient_id: number;
  supplier_id?: number;
  ingredient_name: string;
  unit: string;
  stock_quantity: number;
  minimum_stock: number;
}

export interface DbPurchaseOrder {
  purchase_order_id: number;
  supplier_id: number;
  created_by_employee_id?: number;
  purchase_order_code: string;
  order_date: string;
  status: 'DRAFT' | 'ORDERED' | 'RECEIVED' | 'CANCELLED';
  total_amount: number;
  note?: string;
}

export interface DbPurchaseOrderItem {
  purchase_order_item_id: number;
  purchase_order_id: number;
  ingredient_id: number;
  quantity: number;
  unit_cost: number;
  line_total: number;
}

export interface DbInventoryTransaction {
  inventory_transaction_id: number;
  ingredient_id: number;
  purchase_order_item_id?: number;
  performed_by_employee_id?: number;
  transaction_type: 'IN' | 'OUT' | 'ADJUST';
  quantity: number;
  reason?: string;
  created_at: string;
}

export interface DbProductIngredient {
  product_ingredient_id: number;
  variant_id: number;
  ingredient_id: number;
  quantity_required: number;
}
