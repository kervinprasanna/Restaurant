import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const dummyMenu = [
  { id: 'F001', name: 'Chicken Biryani', price: 180, category: 'Biryani' },
  { id: 'F002', name: 'Chicken 65', price: 150, category: 'Starters' },
  { id: 'F003', name: 'Mutton Biryani', price: 250, category: 'Biryani' }
];

export default function CustomerMenu() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-900">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold">🍽️ ABC RESTAURANT</h1>
        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">Table {tableId}</span>
      </div>

      <div className="p-4">
        <input 
          type="text" 
          placeholder="🔍 Search food..." 
          className="w-full p-3 rounded-xl bg-white border border-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="flex gap-2 overflow-x-auto mb-6 pb-2 scrollbar-hide">
          {['All', 'Biryani', 'Starters', 'Drinks', 'Desserts'].map((cat, idx) => (
            <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${idx === 0 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {dummyMenu.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-transform active:scale-95">
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600 font-medium">₹{item.price}</p>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md hover:bg-gray-800"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200">
          <button 
            onClick={() => navigate(`/table/${tableId}/cart`, { state: { cart } })}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold flex justify-between px-6 shadow-xl hover:bg-gray-800 transition-colors"
          >
            <span>🛒 {totalItems} Items (₹{totalPrice})</span>
            <span>VIEW CART →</span>
          </button>
        </div>
      )}
    </div>
  );
}
