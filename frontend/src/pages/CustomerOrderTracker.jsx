import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function CustomerOrderTracker() {
  const { orderId } = useParams();
  const location = useLocation();
  const { items = [], total = 0, tableId = 'T12' } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full blur-2xl z-0"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm border-4 border-white">
            ✅
          </div>
          <h1 className="text-3xl font-black mb-1 text-gray-900 tracking-tight">ORDER PLACED</h1>
          <p className="text-gray-500 mb-8 font-semibold">Order #{orderId}</p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100">
             <div className="flex justify-between items-center mb-5 pb-5 border-b border-gray-200">
               <span className="text-gray-500 font-medium">Table</span>
               <span className="font-black text-lg bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">{tableId}</span>
             </div>
             
             <div className="space-y-4 mb-5">
               {items.map(item => (
                  <div key={item.id} className="flex justify-between text-base items-center">
                    <span className="font-bold text-gray-800">{item.name} <span className="text-gray-400 font-normal ml-1">×{item.quantity}</span></span>
                    <span className="text-gray-600 font-medium">₹{item.price * item.quantity}</span>
                  </div>
               ))}
             </div>
             
             <div className="flex justify-between pt-5 border-t border-gray-200 font-black text-xl text-gray-900">
               <span>Total</span>
               <span>₹{total}</span>
             </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-start text-left gap-3">
             <div className="text-yellow-600 text-xl mt-0.5">💡</div>
             <div>
                <h4 className="font-bold text-yellow-800">Payment Unpaid</h4>
                <p className="text-sm text-yellow-700 font-medium mt-0.5">Please complete your payment at the counter.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
