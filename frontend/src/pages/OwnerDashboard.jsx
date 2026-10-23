import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultOwnerOrders = [
  {
    orderId: 'ORD1045',
    tableId: '12',
    total: 510,
    orderStatus: 'RECEIVED',
    paymentStatus: 'UNPAID',
    items: [
      { name: 'Chicken Biryani', quantity: 2, price: 180 },
      { name: 'Chicken 65', quantity: 1, price: 150 },
    ],
  },
  {
    orderId: 'ORD1044',
    tableId: '08',
    total: 320,
    orderStatus: 'PREPARING',
    paymentStatus: 'UNPAID',
    items: [{ name: 'Mutton Biryani', quantity: 1, price: 280 }],
  },
  {
    orderId: 'ORD1043',
    tableId: '03',
    total: 450,
    orderStatus: 'READY',
    paymentStatus: 'PAID',
    items: [{ name: 'Dragon Chicken', quantity: 2, price: 200 }],
  },
];

export default function OwnerDashboard() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
      if (stored.length > 0) {
        setOrders(stored);
      } else {
        setOrders(defaultOwnerOrders);
      }
    } catch {
      setOrders(defaultOwnerOrders);
    }
  };

  useEffect(() => {
    loadOrders();
    const handleStorage = () => loadOrders();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, orderStatus: newStatus } : o
    );
    setOrders(updated);
    try {
      localStorage.setItem('restaurant_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const markAsPaid = (orderId) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, paymentStatus: 'PAID' } : o
    );
    setOrders(updated);
    try {
      localStorage.setItem('restaurant_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const newOrdersCount = orders.filter((o) => o.orderStatus === 'RECEIVED').length;
  const preparingCount = orders.filter((o) => o.orderStatus === 'PREPARING').length;
  const readyCount = orders.filter((o) => o.orderStatus === 'READY').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Bar with Role Navigation */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-2.5 flex justify-between items-center text-xs text-gray-400">
        <span>📊 Management View: Owner Dashboard</span>
        <div className="flex gap-4">
          <Link to="/" className="text-sky-400 hover:underline">🍽️ Customer Menu</Link>
          <Link to="/kitchen" className="text-sky-400 hover:underline">👨‍🍳 Kitchen Display</Link>
        </div>
      </div>

      <div className="bg-black text-white p-5 sticky top-0 z-10 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">RESTAURANT OWNER CONSOLE</h1>
          <p className="text-xs text-gray-400">Live Counter Billing & Orders</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Total Sales</div>
          <div className="text-lg font-black text-emerald-400">₹{totalRevenue}</div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="p-5 grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
          <div className="text-red-500 text-2xl mb-1">🔴</div>
          <div className="text-xs text-gray-500 font-bold tracking-wider mb-1">NEW ORDERS</div>
          <div className="text-3xl font-black text-gray-900">{newOrdersCount}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
          <div className="text-yellow-400 text-2xl mb-1">🟡</div>
          <div className="text-xs text-gray-500 font-bold tracking-wider mb-1">PREPARING</div>
          <div className="text-3xl font-black text-gray-900">{preparingCount}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
          <div className="text-green-500 text-2xl mb-1">🟢</div>
          <div className="text-xs text-gray-500 font-bold tracking-wider mb-1">READY</div>
          <div className="text-3xl font-black text-gray-900">{readyCount}</div>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-5 pb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            ALL ORDERS ({orders.length})
          </h2>
          <button
            onClick={loadOrders}
            className="text-xs text-gray-500 font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            🔄 Refresh
          </button>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const isNew = order.orderStatus === 'RECEIVED';
            const isPreparing = order.orderStatus === 'PREPARING';
            const isReady = order.orderStatus === 'READY';
            const isPaid = order.paymentStatus === 'PAID';

            const borderLeft = isNew
              ? 'border-l-red-500'
              : isPreparing
              ? 'border-l-yellow-400'
              : 'border-l-green-500';

            return (
              <div
                key={order.orderId}
                className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${borderLeft} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md`}
              >
                <div>
                  <div className="font-black text-lg text-gray-900 flex items-center gap-3">
                    #{order.orderId}
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-bold">
                      Table #{order.tableId}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-bold ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {isPaid ? 'PAID ✓' : 'UNPAID'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 font-medium mt-1">
                    <span className="font-bold text-gray-900">₹{order.total}</span> •{' '}
                    <span className="capitalize">{order.orderStatus.toLowerCase()}</span>
                    {order.items && (
                      <span className="text-xs text-gray-400 ml-2">
                        ({order.items.map((i) => `${i.name} ×${i.quantity}`).join(', ')})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {isNew && (
                    <button
                      onClick={() => updateOrderStatus(order.orderId, 'PREPARING')}
                      className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-red-600 hover:text-white transition-colors"
                    >
                      ACCEPT ORDER
                    </button>
                  )}
                  {isPreparing && (
                    <button
                      onClick={() => updateOrderStatus(order.orderId, 'READY')}
                      className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-yellow-400 hover:text-black transition-colors"
                    >
                      MARK READY
                    </button>
                  )}
                  {!isPaid ? (
                    <button
                      onClick={() => markAsPaid(order.orderId)}
                      className="bg-emerald-50 text-emerald-700 border border-emerald-300 px-4 py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                      💵 COLLECT PAYMENT (MARK PAID)
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-bold px-3 py-2 bg-emerald-50 rounded-lg">
                      Payment Collected ✓
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

