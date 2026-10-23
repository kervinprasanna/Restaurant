import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import CustomerCart from './pages/CustomerCart';
import CustomerOrderTracker from './pages/CustomerOrderTracker';
import KitchenDashboard from './pages/KitchenDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:tableId" element={<Home />} />
        <Route path="/place-order" element={<CustomerCart />} />
        <Route path="/table/:tableId/cart" element={<CustomerCart />} />
        <Route path="/order/:orderId" element={<CustomerOrderTracker />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

