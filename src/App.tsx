/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute, CartItem, CheckoutDraft, Product } from './types';
import { useDb } from './data/DbContext';
import { calcUnitPrice, defaultSize, orderItemsOf, userName } from './data/dbUtils';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ChatModal } from './components/ChatModal';

// Khách hàng Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CustomizePage } from './pages/CustomizePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { FeedbackPage } from './pages/FeedbackPage';

// POS Thu ngân Pages
import { PosCreateOrderPage } from './pages/pos/PosCreateOrderPage';
import { PosOrdersPage } from './pages/pos/PosOrdersPage';
import { PosShiftPage } from './pages/pos/PosShiftPage';
import { PosHandoverPage } from './pages/pos/PosHandoverPage';

// Barista KDS Pages
import { KdsTerminalPage } from './pages/kds/KdsTerminalPage';

// Delivery Portal Pages
import { DeliveryOrdersPage } from './pages/delivery/DeliveryOrdersPage';
import { DeliveryProblemPage } from './pages/delivery/DeliveryProblemPage';
import { DeliveryCodPage } from './pages/delivery/DeliveryCodPage';
import { BillPage } from './pages/BillPage';

// Admin ERP Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminRecipesPage } from './pages/admin/AdminRecipesPage';
import { AdminStockPage } from './pages/admin/AdminStockPage';
import { AdminRestockPage } from './pages/admin/AdminRestockPage';
import { AdminIngredientsPage } from './pages/admin/AdminIngredientsPage';
import { AdminSuppliersPage } from './pages/admin/AdminSuppliersPage';
import { AdminPurchasesPage } from './pages/admin/AdminPurchasesPage';
import { AdminAttendancePage } from './pages/admin/AdminAttendancePage';
import { AdminShiftsPage } from './pages/admin/AdminShiftsPage';
import { AdminSchedulesPage } from './pages/admin/AdminSchedulesPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminMembershipsPage } from './pages/admin/AdminMembershipsPage';
import { AdminComplaintsPage } from './pages/admin/AdminComplaintsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  const { db } = useDb();
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [selectedBillOrderId, setSelectedBillOrderId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { cartId: 'cart-1', product_id: 1, quantity: 1, unit_price: 45000, customization: { size: 'M', sugar: '50%' }, checked: true }
  ]);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
  const [checkoutDraft, setCheckoutDraft] = useState<CheckoutDraft | null>(null);

  // Modals & Overlays
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isScreenNavOpen, setIsScreenNavOpen] = useState(false);
  const [navRoleFilter, setNavRoleFilter] = useState<'all' | 'customer' | 'pos' | 'kds' | 'delivery' | 'admin'>('all');

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Scroll to top on navigation
  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: number) => {
    setSelectedProductId(productId);
    handleNavigate('customize');
  };

  const handleOpenBill = (orderId: number) => {
    setSelectedBillOrderId(orderId);
    handleNavigate('bill');
  };

  const handleQuickAdd = (product: Product) => {
    const size = defaultSize(product);
    const existing = cartItems.find(
      i => i.product_id === product.id && i.customization.size === size && !(i.customization.topping ?? []).length
    );
    if (existing) {
      setCartItems(prev => prev.map(i => (i.cartId === existing.cartId ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCartItems(prev => [
        {
          cartId: `cart-${Date.now()}`,
          product_id: product.id,
          quantity: 1,
          unit_price: calcUnitPrice(product, size),
          customization: size ? { size } : {},
          checked: true
        },
        ...prev
      ]);
    }
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleAddToCart = (item: CartItem, goToCart = true) => {
    setCartItems(prev => [item, ...prev]);
    const name = db.products.find(p => p.id === item.product_id)?.name ?? 'món';
    showToast(`Đã thêm "${name}" vào giỏ hàng!`);
    if (goToCart) handleNavigate('cart');
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => (item.cartId === cartId ? { ...item, quantity: item.quantity + delta } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Đã xóa món khỏi giỏ hàng.');
  };

  const handleToggleCheck = (cartId: string) => {
    setCartItems(prev => prev.map(item => (item.cartId === cartId ? { ...item, checked: !item.checked } : item)));
  };

  // Đặt lại: chép các dòng order_items của đơn cũ vào giỏ (giá lấy theo base_price hiện tại)
  const handleReorder = (orderId: number) => {
    const items = orderItemsOf(db, orderId);
    const now = Date.now();
    const next: CartItem[] = items
      .map((it, idx) => {
        const product = db.products.find(p => p.id === it.product_id);
        if (!product || !product.is_available) return null;
        const c = it.customization ?? {};
        return {
          cartId: `cart-${now}-${idx}`,
          product_id: product.id,
          quantity: it.quantity,
          unit_price: calcUnitPrice(product, c.size, c.topping),
          customization: c,
          checked: true
        };
      })
      .filter(Boolean) as CartItem[];
    setCartItems(prev => [...next, ...prev]);
    showToast(`Đã thêm ${next.length} món từ đơn cũ vào giỏ hàng.`);
    handleNavigate('cart');
  };

  const handlePaymentComplete = (orderCode: string) => {
    setCartItems(prev => prev.filter(i => i.checked === false));
    setPointsToRedeem(0);
    setCheckoutDraft(null);
    showToast(`Đặt đơn ${orderCode} thành công! Đơn đã chuyển tới quầy pha chế.`);
    handleNavigate('orders');
  };

  const handleHeaderSearch = (query: string) => {
    setSearchFilter(query);
    handleNavigate('menu');
  };

  // Determine if current route is a customer route
  const isCustomerRoute = [
    'home', 'menu', 'customize', 'cart', 'checkout', 'payment', 'bill', 'orders', 'profile', 'feedback'
  ].includes(currentRoute);

  // Available application screens
  const allScreens: {
    route: PageRoute | 'auth-modal';
    label: string;
    tag: string;
    icon: string;
    role: 'customer' | 'pos' | 'kds' | 'delivery' | 'admin';
  }[] = [
    { route: 'auth-modal', label: 'Authentication Screen', tag: 'Screen 1', icon: 'login', role: 'customer' },
    { route: 'profile', label: 'Customer Profile Screen', tag: 'Screen 2', icon: 'account_circle', role: 'customer' },
    { route: 'home', label: 'Homepage Screen', tag: 'Screen 3', icon: 'storefront', role: 'customer' },
    { route: 'menu', label: 'Menu Screen', tag: 'Screen 4', icon: 'menu_book', role: 'customer' },
    { route: 'customize', label: 'Product Detail Screen', tag: 'Screen 5', icon: 'tune', role: 'customer' },
    { route: 'cart', label: 'Shopping Cart Screen', tag: 'Screen 6', icon: 'shopping_bag', role: 'customer' },
    { route: 'checkout', label: 'Online Ordering Screen', tag: 'Screen 7', icon: 'local_shipping', role: 'customer' },
    { route: 'pos-create', label: 'Counter Ordering Screen', tag: 'Screen 8', icon: 'point_of_sale', role: 'pos' },
    { route: 'payment', label: 'Payment Screen', tag: 'Screen 9', icon: 'qr_code_2', role: 'customer' },
    { route: 'bill', label: 'Bill Screen', tag: 'Screen 10', icon: 'receipt', role: 'customer' },
    { route: 'orders', label: 'Order Management Screen', tag: 'Screen 11', icon: 'moped', role: 'customer' },
    { route: 'pos-orders', label: 'Counter Order List Screen', tag: 'Screen 12', icon: 'receipt_long', role: 'pos' },
    { route: 'kds-terminal', label: 'Drink Preparation Screen', tag: 'Screen 13', icon: 'blender', role: 'kds' },
    { route: 'delivery-orders', label: 'Delivery Management Screen', tag: 'Screen 14', icon: 'directions_bike', role: 'delivery' },
    { route: 'admin-categories', label: 'Category Management Screen', tag: 'Screen 15', icon: 'category', role: 'admin' },
    { route: 'admin-products', label: 'Product Management Screen', tag: 'Screen 16', icon: 'local_cafe', role: 'admin' },
    { route: 'admin-recipes', label: 'Recipe Management Screen', tag: 'Screen 17', icon: 'menu_book', role: 'admin' },
    { route: 'admin-ingredients', label: 'Ingredient Management Screen', tag: 'Screen 18', icon: 'shelves', role: 'admin' },
    { route: 'admin-stock', label: 'Inventory Management Screen', tag: 'Screen 19', icon: 'inventory_2', role: 'admin' },
    { route: 'admin-restock', label: 'Restock Request Screen', tag: 'Screen 20', icon: 'add_alert', role: 'admin' },
    { route: 'admin-suppliers', label: 'Supplier Management Screen', tag: 'Screen 21', icon: 'local_shipping', role: 'admin' },
    { route: 'admin-purchases', label: 'Purchase Order Screen', tag: 'Screen 22', icon: 'receipt_long', role: 'admin' },
    { route: 'admin-users', label: 'Employee Management Screen', tag: 'Screen 23', icon: 'group', role: 'admin' },
    { route: 'admin-shifts', label: 'Work Shift Management Screen', tag: 'Screen 24', icon: 'schedule', role: 'admin' },
    { route: 'admin-schedules', label: 'Employee Schedule Screen', tag: 'Screen 25', icon: 'calendar_month', role: 'admin' },
    { route: 'admin-attendance', label: 'Attendance Management Screen', tag: 'Screen 26', icon: 'badge', role: 'admin' },
    { route: 'pos-handover', label: 'Shift Handover Screen', tag: 'Screen 27', icon: 'savings', role: 'pos' },
    { route: 'admin-customers', label: 'Customer Management Screen', tag: 'Screen 28', icon: 'contact_page', role: 'admin' },
    { route: 'admin-memberships', label: 'Phone Loyalty Management Screen', tag: 'Screen 29', icon: 'loyalty', role: 'admin' },
    { route: 'admin-complaints', label: 'Feedback & Complaint Management Screen', tag: 'Screen 30', icon: 'feedback', role: 'admin' },
    { route: 'admin-overview', label: 'Reports Dashboard', tag: 'Screen 31', icon: 'dashboard', role: 'admin' },
    { route: 'admin-orders', label: 'Order Management (Admin)', tag: 'Screen 32', icon: 'list_alt', role: 'admin' },
    { route: 'admin-settings', label: 'Shop Settings', tag: 'Screen 33', icon: 'settings', role: 'admin' },
  ];

  const filteredScreens = allScreens.filter(
    s => navRoleFilter === 'all' || s.role === navRoleFilter
  );

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Đơn đang giao của khách để mở chat với shipper
  const deliveringOrder = db.orders.find(o => o.customer_id !== null && o.status === 'DELIVERING');

  const adminPageProps = { onNavigate: handleNavigate, onShowToast: showToast };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 antialiased selection:bg-primary/20 selection:text-primary">
      {/* Consumer Header only shown for customer routes */}
      {isCustomerRoute && (
        <Header
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          cartCount={totalCartCount}
          onOpenAuth={() => setIsAuthOpen(true)}
          onSearch={handleHeaderSearch}
        />
      )}

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {/* Customer Pages */}
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}
        {currentRoute === 'menu' && (
          <MenuPage
            onSelectProduct={handleSelectProduct}
            searchFilter={searchFilter}
          />
        )}
        {currentRoute === 'customize' && (
          <CustomizePage
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentRoute === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onToggleItemCheck={handleToggleCheck}
            onToggleAllCheck={(checked) => setCartItems(prev => prev.map(i => ({ ...i, checked })))}
            onAddUpsellItem={(item) => handleAddToCart(item, false)}
            pointsToRedeem={pointsToRedeem}
            onRedeemPoints={setPointsToRedeem}
            onNavigate={handleNavigate}
          />
        )}
        {currentRoute === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems.filter(i => i.checked !== false)}
            pointsToRedeem={pointsToRedeem}
            onNavigate={handleNavigate}
            onConfirm={(draft) => {
              setCheckoutDraft(draft);
              handleNavigate('payment');
            }}
          />
        )}
        {currentRoute === 'payment' && (
          <PaymentPage
            cartItems={cartItems.filter(i => i.checked !== false)}
            draft={checkoutDraft}
            onNavigate={handleNavigate}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
        {currentRoute === 'bill' && (
          <BillPage
            orderId={selectedBillOrderId}
            onSelectOrder={setSelectedBillOrderId}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
        {currentRoute === 'orders' && (
          <OrdersPage
            onNavigate={handleNavigate}
            onReorder={handleReorder}
            onOpenBill={handleOpenBill}
            onShowToast={showToast}
          />
        )}
        {currentRoute === 'profile' && (
          <ProfilePage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
        {currentRoute === 'feedback' && (
          <FeedbackPage
            onNavigate={handleNavigate}
            onOpenChat={() => setIsChatOpen(true)}
            onShowToast={showToast}
          />
        )}

        {/* POS Thu ngân Pages */}
        {currentRoute === 'pos-create' && <PosCreateOrderPage {...adminPageProps} />}
        {currentRoute === 'pos-orders' && <PosOrdersPage {...adminPageProps} onOpenBill={handleOpenBill} />}
        {currentRoute === 'pos-shift' && <PosShiftPage {...adminPageProps} />}
        {currentRoute === 'pos-handover' && <PosHandoverPage {...adminPageProps} />}

        {/* Barista KDS Pages */}
        {currentRoute === 'kds-terminal' && <KdsTerminalPage {...adminPageProps} />}

        {/* Delivery Pages */}
        {currentRoute === 'delivery-orders' && <DeliveryOrdersPage {...adminPageProps} />}
        {currentRoute === 'delivery-report' && <DeliveryProblemPage {...adminPageProps} />}
        {currentRoute === 'delivery-cod' && <DeliveryCodPage {...adminPageProps} />}

        {/* Admin ERP Pages */}
        {currentRoute === 'admin-overview' && <AdminDashboardPage {...adminPageProps} />}
        {currentRoute === 'admin-categories' && <AdminCategoriesPage {...adminPageProps} />}
        {currentRoute === 'admin-products' && <AdminProductsPage {...adminPageProps} />}
        {currentRoute === 'admin-recipes' && <AdminRecipesPage {...adminPageProps} />}
        {currentRoute === 'admin-stock' && <AdminStockPage {...adminPageProps} />}
        {currentRoute === 'admin-restock' && <AdminRestockPage {...adminPageProps} />}
        {currentRoute === 'admin-ingredients' && <AdminIngredientsPage {...adminPageProps} />}
        {currentRoute === 'admin-suppliers' && <AdminSuppliersPage {...adminPageProps} />}
        {currentRoute === 'admin-purchases' && <AdminPurchasesPage {...adminPageProps} />}
        {currentRoute === 'admin-attendance' && <AdminAttendancePage {...adminPageProps} />}
        {currentRoute === 'admin-users' && <AdminUsersPage {...adminPageProps} />}
        {currentRoute === 'admin-shifts' && <AdminShiftsPage {...adminPageProps} />}
        {currentRoute === 'admin-schedules' && <AdminSchedulesPage {...adminPageProps} />}
        {currentRoute === 'admin-customers' && <AdminCustomersPage {...adminPageProps} />}
        {currentRoute === 'admin-memberships' && <AdminMembershipsPage {...adminPageProps} />}
        {currentRoute === 'admin-complaints' && <AdminComplaintsPage {...adminPageProps} />}
        {currentRoute === 'admin-orders' && <AdminOrdersPage {...adminPageProps} onOpenBill={handleOpenBill} />}
        {currentRoute === 'admin-settings' && <AdminSettingsPage {...adminPageProps} />}
      </main>

      {/* Consumer Footer only shown on customer routes */}
      {isCustomerRoute && <Footer onNavigate={handleNavigate} />}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(name) => {
          showToast(`Xin chào ${name}, chào mừng quay trở lại Aura Café!`);
        }}
      />

      {/* Live Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        driverName={deliveringOrder ? userName(db, deliveringOrder.shipper_id, 'Shipper Aura') : 'Shipper Aura'}
        orderId={deliveringOrder ? deliveringOrder.order_code : ''}
      />

      {/* Floating System Switcher for the available screens across all roles */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isScreenNavOpen && (
          <div className="mb-3 w-88 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200 p-3.5 animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Aura Café System Navigator ({allScreens.length} Screens)
              </span>
              <button
                onClick={() => setIsScreenNavOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-xs p-1"
              >
                ✕
              </button>
            </div>

            {/* Subsystem Filter Tabs (English names) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 text-[11px] font-semibold border-b border-stone-100">
              {[
                { id: 'all', label: `All (${allScreens.length})` },
                { id: 'customer', label: 'Customer' },
                { id: 'pos', label: 'POS (Cashier)' },
                { id: 'kds', label: 'KDS (Barista)' },
                { id: 'delivery', label: 'Delivery Staff' },
                { id: 'admin', label: 'Admin (ERP)' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setNavRoleFilter(f.id as typeof navRoleFilter)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${navRoleFilter === f.id
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Screen List */}
            <div className="grid grid-cols-1 gap-1 max-h-[380px] overflow-y-auto pr-1">
              {filteredScreens.map(s => {
                const isActive = currentRoute === s.route;
                return (
                  <button
                    key={s.tag}
                    onClick={() => {
                      if (s.route === 'auth-modal') {
                        setIsAuthOpen(true);
                      } else {
                        handleNavigate(s.route);
                      }
                      setIsScreenNavOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${isActive
                      ? 'bg-primary text-white font-bold shadow-xs'
                      : 'hover:bg-stone-100 text-stone-700'
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[16px] shrink-0">{s.icon}</span>
                      <span className="truncate">{s.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ml-2 ${isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-200/70 text-stone-500'
                        }`}
                    >
                      {s.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsScreenNavOpen(!isScreenNavOpen)}
          className="h-12 px-4 rounded-full bg-stone-900 text-white shadow-xl hover:bg-stone-800 active:scale-95 transition-all flex items-center gap-2.5 border border-stone-700 group"
          title={`Switch subsystems and view all ${allScreens.length} screens`}
        >
          <span className="material-symbols-outlined text-amber-400 group-hover:rotate-45 transition-transform text-[20px]">
            grid_view
          </span>
          <span className="text-xs font-bold">Subsystem Switcher ({allScreens.length} Screens)</span>
        </button>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white backdrop-blur-md px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-stone-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
