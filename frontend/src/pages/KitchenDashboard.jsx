import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultKitchenOrders = [
  {
    orderId: 'ORD1045',
    tableId: '12',
    items: [
      { id: 1, name: 'Chicken Biryani', quantity: 2 },
      { id: 2, name: 'Chicken 65', quantity: 1 },
    ],
    orderStatus: 'RECEIVED',
  },
  {
    orderId: 'ORD1044',
    tableId: '08',
    items: [
      { id: 3, name: 'Mutton Biryani', quantity: 1 },
      { id: 4, name: 'Mint Lime Cooler', quantity: 2 },
    ],
    orderStatus: 'PREPARING',
  },
  {
    orderId: 'ORD1042',
    tableId: '02',
    items: [
      { id: 5, name: 'Paneer Tikka', quantity: 2 },
      { id: 6, name: 'Fresh Mango Juice', quantity: 1 },
    ],
    orderStatus: 'READY',
  },
];

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);

  // Load from localStorage or defaults
  const loadOrders = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
      if (stored.length > 0) {
        setOrders(stored);
      } else {
        setOrders(defaultKitchenOrders);
      }
    } catch {
      setOrders(defaultKitchenOrders);
    }
  };

  useEffect(() => {
    loadOrders();
    const handleStorage = () => loadOrders();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateStatus = (orderId, nextStatus) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, orderStatus: nextStatus } : o
    );
    setOrders(updated);
    try {
      localStorage.setItem('restaurant_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Top Bar with Role Navigation */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-2.5 flex justify-between items-center text-xs text-gray-400">
        <span>👨‍🍳 Staff View: Kitchen Screen</span>
        <div className="flex gap-4">
          <Link to="/" className="text-sky-400 hover:underline">🍽️ Customer Menu</Link>
          <Link to="/owner" className="text-sky-400 hover:underline">📊 Owner Dashboard</Link>
        </div>
      </div>

      <div className="bg-black p-5 sticky top-0 z-10 border-b border-gray-800 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
          👨‍🍳 KITCHEN DISPLAY SYSTEM
        </h1>
        <div className="text-sm font-bold bg-gray-800 text-gray-300 px-4 py-1.5 rounded-full border border-gray-700">
          {orders.filter((o) => o.orderStatus !== 'COMPLETED').length} Active Orders
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const isReceived = order.orderStatus === 'RECEIVED';
          const isPreparing = order.orderStatus === 'PREPARING';
          const isReady = order.orderStatus === 'READY';
          const isCompleted = order.orderStatus === 'COMPLETED';

          const cardBorder = isReceived
            ? 'border-red-500/50 shadow-red-900/20'
            : isPreparing
            ? 'border-yellow-500/50 shadow-yellow-900/20'
            : isReady
            ? 'border-green-500/50 shadow-green-900/20'
            : 'border-gray-800 opacity-60';

          const headerBg = isReceived
            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
            : isPreparing
            ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black'
            : isReady
            ? 'bg-gradient-to-r from-green-500 to-green-400 text-black'
            : 'bg-gray-800 text-gray-300';

          return (
            <div
              key={order.orderId}
              className={`bg-gray-900 rounded-3xl border ${cardBorder} shadow-lg overflow-hidden flex flex-col`}
            >
              <div className={`${headerBg} p-4 flex justify-between items-center font-black`}>
                <span className="text-xl">#{order.orderId}</span>
                <span className="bg-black/20 px-3 py-1 rounded-lg text-sm uppercase">
                  TABLE {order.tableId}
                </span>
              </div>

              <div className="p-6 flex-1 space-y-3 text-base">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                  Status: {order.orderStatus}
                </div>
                {order.items &&
                  order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between border-b border-gray-800 pb-2.5 items-center"
                    >
                      <span className="font-medium text-gray-200">{item.name}</span>
                      <span className="font-black text-sm bg-gray-800 text-yellow-400 px-2 py-0.5 rounded">
                        × {item.quantity}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="p-4 bg-gray-900/80 border-t border-gray-800">
                {isReceived && (
                  <button
                    onClick={() => updateStatus(order.orderId, 'PREPARING')}
                    className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-black text-sm shadow transition-all active:scale-95"
                  >
                    START PREPARING 🍳
                  </button>
                )}
                {isPreparing && (
                  <button
                    onClick={() => updateStatus(order.orderId, 'READY')}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-black text-sm shadow transition-all active:scale-95"
                  >
                    MARK AS READY ✓
                  </button>
                )}
                {isReady && (
                  <button
                    onClick={() => updateStatus(order.orderId, 'COMPLETED')}
                    className="w-full bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl font-black text-sm shadow transition-all active:scale-95"
                  >
                    MARK COMPLETED 🍽️
                  </button>
                )}
                {isCompleted && (
                  <div className="text-center text-xs text-gray-500 py-2 font-bold uppercase">
                    Order Completed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

