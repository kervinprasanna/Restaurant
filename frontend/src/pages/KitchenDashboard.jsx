import React from 'react';

export default function KitchenDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <div className="bg-black p-5 sticky top-0 z-10 border-b border-gray-800 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
           👨‍🍳 KITCHEN DISPLAY
        </h1>
        <div className="text-sm font-bold bg-gray-800 text-gray-300 px-4 py-1.5 rounded-full border border-gray-700">3 Active Orders</div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* New Order */}
        <div className="bg-gray-900 rounded-3xl border border-red-500/50 shadow-lg shadow-red-900/20 overflow-hidden flex flex-col transform transition-transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 flex justify-between items-center">
            <span className="font-black text-xl text-white">#1045</span>
            <span className="font-bold bg-white text-red-600 px-3 py-1 rounded-lg text-sm shadow-sm">TABLE 12</span>
          </div>
          <div className="p-6 flex-1 space-y-4 text-lg">
            <div className="flex justify-between border-b border-gray-800 pb-3 items-center"><span className="font-medium">Chicken Biryani</span><span className="font-black text-xl text-red-400 bg-gray-800 px-2 py-1 rounded">× 2</span></div>
            <div className="flex justify-between border-b border-gray-800 pb-3 items-center"><span className="font-medium">Chicken 65</span><span className="font-black text-xl text-red-400 bg-gray-800 px-2 py-1 rounded">× 1</span></div>
          </div>
          <div className="p-5 bg-gray-900 border-t border-gray-800">
            <button className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95">START PREPARING</button>
          </div>
        </div>

        {/* Preparing Order */}
        <div className="bg-gray-900 rounded-3xl border border-yellow-500/50 shadow-lg shadow-yellow-900/20 overflow-hidden flex flex-col transform transition-transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-4 flex justify-between items-center text-black">
            <span className="font-black text-xl">#1044</span>
            <span className="font-bold bg-black text-yellow-400 px-3 py-1 rounded-lg text-sm shadow-sm">TABLE 08</span>
          </div>
          <div className="p-6 flex-1 space-y-4 text-lg">
            <div className="flex justify-between border-b border-gray-800 pb-3 items-center"><span className="font-medium text-gray-300">Mutton Biryani</span><span className="font-black text-xl text-yellow-500 bg-gray-800 px-2 py-1 rounded">× 1</span></div>
            <div className="flex justify-between border-b border-gray-800 pb-3 items-center"><span className="font-medium text-gray-300">Coke</span><span className="font-black text-xl text-yellow-500 bg-gray-800 px-2 py-1 rounded">× 2</span></div>
          </div>
          <div className="p-5 bg-gray-900 border-t border-gray-800">
            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95">MARK READY</button>
          </div>
        </div>

        {/* Ready Order */}
        <div className="bg-gray-900 rounded-3xl border border-green-500/50 shadow-lg shadow-green-900/20 overflow-hidden flex flex-col transform transition-transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-green-500 to-green-400 p-4 flex justify-between items-center text-black">
            <span className="font-black text-xl">#1042</span>
            <span className="font-bold bg-black text-green-400 px-3 py-1 rounded-lg text-sm shadow-sm">TABLE 02</span>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center">
            <div className="text-center text-green-400 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]">✓</div>
              <div className="font-black text-xl tracking-wide">WAITING FOR PICKUP</div>
            </div>
          </div>
          <div className="p-5 bg-gray-900 border-t border-gray-800">
            <button className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95">COMPLETED</button>
          </div>
        </div>
      </div>
    </div>
  );
}
