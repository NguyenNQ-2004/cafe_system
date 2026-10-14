import React, { createContext, useContext, useRef, useState } from 'react';
import type {
  DbState,
  IdTable,
  Order,
  OrderCustomization,
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
  Row
} from '../types';
import { SEED } from './seed';
import { calcEarnPoints, nextOrderCode, nowSql, pointsToMoney } from './dbUtils';

// =====================================================
// Store dùng chung cho mọi màn hình. Mỗi bảng là một mảng bản ghi khớp với aura_cafe.sql.
// Khi nối backend thật, chỉ cần thay các hàm trong store này bằng lời gọi API.
// =====================================================

const nextId = (rows: { id: number }[]) => rows.reduce((m, r) => Math.max(m, r.id), 0) + 1;

export interface Tx {
  db: () => DbState;
  insert: <T extends IdTable>(table: T, row: Omit<Row<T>, 'id'>) => Row<T>;
  update: <T extends IdTable>(table: T, id: number, patch: Partial<Row<T>>) => void;
  remove: <T extends IdTable>(table: T, id: number) => void;
  setSetting: (key: string, value: string) => void;
}

const createTx = (initial: DbState): Tx => {
  let state = initial;
  return {
    db: () => state,
    insert: (table, row) => {
      const rows = state[table] as { id: number }[];
      const created = { ...row, id: nextId(rows) } as Row<typeof table>;
      state = { ...state, [table]: [...rows, created] };
      return created as never;
    },
    update: (table, id, patch) => {
      const rows = state[table] as { id: number }[];
      state = { ...state, [table]: rows.map(r => (r.id === id ? { ...r, ...patch } : r)) };
    },
    remove: (table, id) => {
      const rows = state[table] as { id: number }[];
      state = { ...state, [table]: rows.filter(r => r.id !== id) };
    },
    setSetting: (key, value) => {
      const exists = state.shop_settings.some(s => s.setting_key === key);
      const updated_at = nowSql();
      state = {
        ...state,
        shop_settings: exists
          ? state.shop_settings.map(s => (s.setting_key === key ? { ...s, setting_value: value, updated_at } : s))
          : [...state.shop_settings, { setting_key: key, setting_value: value, updated_at }]
      };
    }
  };
};

// ---------- Nghiệp vụ dùng chung (chạy bên trong transact) ----------

// Trừ kho nguyên liệu theo định mức product_ingredients và ghi inventory_transactions (OUT_ORDER)
const deductInventoryForOrder = (tx: Tx, orderId: number) => {
  const db = tx.db();
  const usage = new Map<number, number>();
  db.order_items
    .filter(i => i.order_id === orderId)
    .forEach(item => {
      db.product_ingredients
        .filter(b => b.product_id === item.product_id)
        .forEach(b => usage.set(b.ingredient_id, (usage.get(b.ingredient_id) ?? 0) + b.quantity_required * item.quantity));
    });
  const created_at = nowSql();
  usage.forEach((qty, ingredientId) => {
    const ing = tx.db().ingredients.find(i => i.id === ingredientId);
    if (!ing || qty <= 0) return;
    tx.update('ingredients', ingredientId, { current_stock: Math.max(0, ing.current_stock - qty) });
    tx.insert('inventory_transactions', {
      ingredient_id: ingredientId,
      transaction_type: 'OUT_ORDER',
      quantity: qty,
      reference_type: 'ORDER',
      reference_id: orderId,
      created_at
    });
  });
};

// Cộng / trừ điểm: ghi loyalty_transactions và cập nhật users.total_points
const changePoints = (tx: Tx, customerId: number, delta: number, orderId: number | null) => {
  if (delta === 0) return;
  const user = tx.db().users.find(u => u.id === customerId);
  if (!user) return;
  const applied = delta < 0 ? -Math.min(user.total_points, -delta) : delta;
  if (applied === 0) return;
  tx.insert('loyalty_transactions', {
    customer_id: customerId,
    order_id: orderId,
    points_change: applied,
    transaction_type: applied > 0 ? 'EARN' : 'REDEEM',
    created_at: nowSql()
  });
  tx.update('users', customerId, { total_points: user.total_points + applied });
};

// Đơn hoàn thành thì cộng điểm cho khách (mỗi đơn chỉ cộng 1 lần)
const awardPointsIfNeeded = (tx: Tx, order: Order) => {
  if (!order.customer_id) return;
  const already = tx.db().loyalty_transactions.some(l => l.order_id === order.id && l.transaction_type === 'EARN');
  if (already) return;
  const points = calcEarnPoints(tx.db(), order.total_amount - order.discount_amount);
  changePoints(tx, order.customer_id, points, order.id);
};

export interface PlaceOrderInput {
  customer_id: number | null;
  cashier_id: number | null;
  order_type: OrderType;
  status: OrderStatus;
  table_number?: string | null;
  recipient_name?: string | null;
  recipient_phone?: string | null;
  delivery_address?: string | null;
  order_note?: string | null;
  delivery_fee: number;
  points_to_redeem: number;
  items: { product_id: number; quantity: number; unit_price: number; customization: OrderCustomization | null }[];
  payment: { method: PaymentMethod; status: PaymentStatus; transaction_code?: string | null; note?: string | null };
}

interface Session {
  customerId: number; // khách đang đăng nhập trên giao diện khách hàng
  cashierId: number; // thu ngân đang đứng POS
  baristaId: number; // barista trên KDS
  shipperId: number; // shipper trên app giao hàng
  adminId: number; // quản trị viên
}

interface DbContextValue {
  db: DbState;
  session: Session;
  setSession: (patch: Partial<Session>) => void;
  transact: <R>(fn: (tx: Tx) => R) => R;
  placeOrder: (input: PlaceOrderInput) => Order;
  setOrderStatus: (orderId: number, status: OrderStatus, patch?: Partial<Order>) => void;
  cancelOrder: (orderId: number, reason: string) => void;
  adjustPoints: (customerId: number, delta: number) => void;
}

const DbContext = createContext<DbContextValue | null>(null);

export const DbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<DbState>(SEED);
  const dbRef = useRef<DbState>(SEED);
  const [session, setSessionState] = useState<Session>({
    customerId: 4,
    cashierId: 3,
    baristaId: 2,
    shipperId: 6,
    adminId: 1
  });

  const transact = <R,>(fn: (tx: Tx) => R): R => {
    const tx = createTx(dbRef.current);
    const result = fn(tx);
    dbRef.current = tx.db();
    setDb(dbRef.current);
    return result;
  };

  const placeOrder = (input: PlaceOrderInput) =>
    transact(tx => {
      const total_amount = input.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
      const discount_amount = Math.min(total_amount, pointsToMoney(tx.db(), input.points_to_redeem));
      const order = tx.insert('orders', {
        order_code: nextOrderCode(tx.db()),
        customer_id: input.customer_id,
        cashier_id: input.cashier_id,
        order_type: input.order_type,
        status: input.status,
        total_amount,
        discount_amount,
        delivery_fee: input.delivery_fee,
        final_amount: total_amount - discount_amount + input.delivery_fee,
        recipient_name: input.recipient_name ?? null,
        recipient_phone: input.recipient_phone ?? null,
        delivery_address: input.delivery_address ?? null,
        shipper_id: null,
        table_number: input.table_number ?? null,
        order_note: input.order_note || null,
        cancel_reason: null,
        created_at: nowSql()
      });
      input.items.forEach(i =>
        tx.insert('order_items', {
          order_id: order.id,
          product_id: i.product_id,
          product_name_at_time: tx.db().products.find(p => p.id === i.product_id)?.name ?? '',
          unit_price: i.unit_price,
          customization: i.customization,
          quantity: i.quantity,
          subtotal: i.unit_price * i.quantity,
          is_prepared: false
        })
      );
      tx.insert('payments', {
        order_id: order.id,
        payment_method: input.payment.method,
        transaction_code: input.payment.transaction_code ?? null,
        amount: order.final_amount,
        status: input.payment.status,
        paid_at: input.payment.status === 'SUCCESS' ? nowSql() : null,
        payment_note: input.payment.note ?? null
      });
      if (input.customer_id && input.points_to_redeem > 0) {
        changePoints(tx, input.customer_id, -input.points_to_redeem, order.id);
      }
      deductInventoryForOrder(tx, order.id);
      return tx.db().orders.find(o => o.id === order.id)!;
    });

  const setOrderStatus = (orderId: number, status: OrderStatus, patch: Partial<Order> = {}) =>
    transact(tx => {
      tx.update('orders', orderId, { ...patch, status });
      const order = tx.db().orders.find(o => o.id === orderId);
      if (order && status === 'COMPLETED') awardPointsIfNeeded(tx, order);
    });

  const cancelOrder = (orderId: number, reason: string) =>
    transact(tx => {
      tx.update('orders', orderId, { status: 'CANCELLED', cancel_reason: reason });
      const pay = [...tx.db().payments].reverse().find(p => p.order_id === orderId);
      if (pay && pay.status === 'PENDING') tx.update('payments', pay.id, { status: 'FAILED' });
    });

  const adjustPoints = (customerId: number, delta: number) => transact(tx => changePoints(tx, customerId, delta, null));

  const setSession = (patch: Partial<Session>) => setSessionState(prev => ({ ...prev, ...patch }));

  return (
    <DbContext.Provider
      value={{ db, session, setSession, transact, placeOrder, setOrderStatus, cancelOrder, adjustPoints }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => {
  const ctx = useContext(DbContext);
  if (!ctx) throw new Error('useDb phải được dùng bên trong <DbProvider>');
  return ctx;
};
