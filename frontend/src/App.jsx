import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerMenu from './pages/CustomerMenu';
import CustomerCart from './pages/CustomerCart';
import CustomerOrderTracker from './pages/CustomerOrderTracker';
import OwnerDashboard from './pages/OwnerDashboard';
import KitchenDashboard from './pages/KitchenDashboard';




function App() {
  return (
    
   
    <BrowserRouter>
      <Routes>
        
        {/* Customer Routes */}
        <Route path="/table/:tableId" element={<CustomerMenu />} />
        <Route path="/table/:tableId/cart" element={<CustomerCart />} />
        <Route path="/order/:orderId" element={<CustomerOrderTracker />} />

        {/* Staff Routes */}
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
        
        {/* Default Placeholder */}
        <Route path="/" element={<div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">🍽️ Restaurant System</h1>
            <p>Access <a href="/table/T12" className="text-blue-500 underline">Table T12 Menu</a></p>
            <p>Access <a href="/owner" className="text-blue-500 underline">Owner Dashboard</a></p>
            <p>Access <a href="/kitchen" className="text-blue-500 underline">Kitchen Dashboard</a></p>
        </div>} />
        
      </Routes>
      
    </BrowserRouter>
  
  );
  
}

export default App;
