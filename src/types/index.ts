export type AppModule = 'customer' | 'pos' | 'kds' | 'delivery' | 'admin';

export type PageRoute = 
  // Khách hàng
  | 'home' 
  | 'menu' 
  | 'customize' 
  | 'cart' 
  | 'checkout' 
  | 'payment' 
  | 'orders' 
  | 'profile' 
  | 'feedback'
  // POS Thu ngân
  | 'pos-create'
  | 'pos-orders'
  | 'pos-shift'
  | 'pos-handover'
  // Barista KDS
  | 'kds-terminal'
  | 'kds-recipe'
  // Delivery Shipper
  | 'delivery-orders'
  | 'delivery-report'
  | 'delivery-cod'
  // Quản trị Admin ERP
  | 'admin-overview'
  | 'admin-categories'
  | 'admin-products'
  | 'admin-stock'
  | 'admin-ingredients'
  | 'admin-users'
  | 'admin-orders'
  | 'admin-vouchers'
  | 'admin-purchases'
  | 'admin-settings';

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
