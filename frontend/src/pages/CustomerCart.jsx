import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function CustomerCart() {
  const { tableId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const cartItems = Object.values(groupedCart);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = () => {
    const orderId = 'ORD' + Math.floor(Math.random() * 10000);
    navigate(`/order/${orderId}`, { state: { items: cartItems, total: totalPrice, tableId } });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-900">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">←</button>
        <h1 className="text-xl font-bold flex-1 text-center pr-10 tracking-tight">YOUR ORDER</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{item.quantity} × ₹{item.price}</p>
                </div>
                <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t-2 border-dashed border-gray-200 pt-5 flex justify-between items-center text-2xl font-black text-gray-900">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200">
        <div className="flex justify-between items-center mb-4 px-2">
           <span className="text-gray-500 font-medium text-sm">Table Number</span>
           <span className="font-black text-lg bg-gray-100 px-3 py-1 rounded-lg">{tableId}</span>
        </div>
        <button 
          onClick={placeOrder}
          disabled={cartItems.length === 0}
          className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-xl disabled:bg-gray-300 disabled:text-gray-500 hover:bg-gray-800 transition-all active:scale-[0.98]"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}
