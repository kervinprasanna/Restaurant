import React from 'react';

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-black text-white p-5 sticky top-0 z-10 shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">RESTAURANT OWNER</h1>
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm">👤</div>
      </div>
      
      <div className="p-5 grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center transition-transform hover:-translate-y-1">
          <div className="text-red-500 text-3xl mb-2 drop-shadow-sm">🔴</div>
          <div className="text-xs text-gray-500 font-bold tracking-wider mb-1">NEW ORDERS</div>
          <div className="text-3xl font-black text-gray-900">5</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center transition-transform hover:-translate-y-1">
          <div className="text-yellow-400 text-3xl mb-2 drop-shadow-sm">🟡</div>
          <div className="text-xs text-gray-500 font-bold tracking-wider mb-1">PREPARING</div>
          <div className="text-3xl font-black text-gray-900">8</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center transition-transform hover:-translate-y-1">
          <div className="text-green-500 text-3xl mb-2 drop-shadow-sm">🟢</div>
          <div className="text-xs text-gray-500 font-bold tracking-wider mb-1">READY</div>
          <div className="text-3xl font-black text-gray-900">3</div>
        </div>
      </div>

      <div className="px-5 pb-10">
        <div className="flex justify-between items-end mb-5">
           <h2 className="text-xl font-black text-gray-900 tracking-tight">RECENT ORDERS</h2>
           <button className="text-sm text-blue-600 font-bold hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-red-500 flex justify-between items-center transition-all hover:shadow-md">
            <div>
              <div className="font-black text-xl text-gray-900 flex items-center gap-3">
                 #1045 
                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-bold">Table 12</span>
              </div>
              <div className="text-sm text-gray-500 font-medium mt-1">₹510 • <span className="text-red-500 font-bold">New</span></div>
            </div>
            <button className="bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-red-600 hover:text-white transition-colors">ACCEPT</button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-yellow-400 flex justify-between items-center transition-all hover:shadow-md">
            <div>
              <div className="font-black text-xl text-gray-900 flex items-center gap-3">
                 #1044 
                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-bold">Table 08</span>
              </div>
              <div className="text-sm text-gray-500 font-medium mt-1">₹320 • <span className="text-yellow-600 font-bold">Preparing</span></div>
            </div>
            <button className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-yellow-400 hover:text-black transition-colors">READY</button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-green-500 flex justify-between items-center transition-all hover:shadow-md">
            <div>
              <div className="font-black text-xl text-gray-900 flex items-center gap-3">
                 #1043 
                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-bold">Table 03</span>
              </div>
              <div className="text-sm text-gray-500 font-medium mt-1">₹450 • <span className="text-green-600 font-bold">Ready</span></div>
            </div>
            <button className="bg-green-50 text-green-700 border border-green-200 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-green-600 hover:text-white transition-colors">MARK PAID</button>
          </div>
        </div>
      </div>
    </div>
  );
}
