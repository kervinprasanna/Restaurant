import React, { useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

export default function CustomerCart() {
  const { tableId: paramTableId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const tableId = location.state?.tableId || paramTableId || '04';

  // Normalize incoming items
  const initialItems = React.useMemo(() => {
    if (location.state?.cartItems) {
      return location.state.cartItems;
    }
    if (location.state?.cart) {
      // If passed as array of items, group them
      const grouped = location.state.cart.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { ...item, quantity: 0 };
        }
        acc[item.id].quantity += 1;
        return acc;
      }, {});
      return Object.values(grouped);
    }
    return [];
  }, [location.state]);

  const [items, setItems] = useState(initialItems);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Increase item quantity
  const handleIncrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity
  const handleDecrease = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // Place Order handler
  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    const orderId = 'ORD' + Math.floor(1000 + Math.random() * 9000);
    const orderData = {
      orderId,
      tableId,
      items,
      total: totalPrice,
      orderStatus: 'RECEIVED',
      paymentStatus: 'UNPAID',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
    };

    // Save to localStorage for Kitchen and Owner dashboards
    try {
      const existing = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
      const updated = [orderData, ...existing];
      localStorage.setItem('restaurant_orders', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    setTimeout(() => {
      navigate(`/order/${orderId}`, { state: orderData });
    }, 300);
  };

  return (
    <div style={styles.container}>
      {/* Top Navbar */}
      <header style={styles.header}>
        <button
          onClick={() => navigate(-1)}
          style={styles.backBtn}
          title="Back to menu"
        >
          ← Menu
        </button>
        <div style={styles.headerTitleContainer}>
          <h1 style={styles.headerTitle}>Place Your Order</h1>
          <span style={styles.tableBadge}>Table #{tableId}</span>
        </div>
        <div style={{ width: 60 }} />
      </header>

      {/* Main Order Content */}
      <main style={styles.main}>
        {items.length === 0 ? (
          <div style={styles.emptyCard}>
            <span style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</span>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
              Your order is currently empty
            </h2>
            <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
              Select your favorite starters, rice, juices, or desserts from the menu.
            </p>
            <Link to={`/table/${tableId}`} style={styles.browseBtn}>
              Browse Menu
            </Link>
          </div>
        ) : (
          <div style={styles.contentGrid}>
            {/* Items List Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.sectionTitle}>
                  Selected Dishes ({totalQuantity})
                </h2>
                <Link to={`/table/${tableId}`} style={styles.addMoreLink}>
                  + Add more
                </Link>
              </div>

              <div style={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} style={styles.itemRow}>
                    <div style={styles.itemInfo}>
                      <div style={styles.itemNameRow}>
                        <span
                          style={{
                            ...styles.typeIndicator,
                            backgroundColor:
                              item.type === 'veg' ? '#ecfdf5' : '#fef2f2',
                            color:
                              item.type === 'veg' ? '#059669' : '#dc2626',
                          }}
                        >
                          {item.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                        </span>
                        <h3 style={styles.itemName}>{item.name}</h3>
                      </div>
                      <span style={styles.itemPricePerUnit}>
                        ₹{item.price} each
                      </span>
                    </div>

                    <div style={styles.itemActions}>
                      <div style={styles.qtyBox}>
                        <button
                          onClick={() => handleDecrease(item.id)}
                          style={styles.qtyBtn}
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span style={styles.qtyText}>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          style={styles.qtyBtn}
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>

                      <div style={styles.itemTotal}>
                        ₹{item.price * item.quantity}
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        style={styles.removeBtn}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Summary Card */}
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Order Bill Summary</h2>
              
              <div style={styles.billRow}>
                <span style={styles.billLabel}>Item Total ({totalQuantity} items)</span>
                <span style={styles.billValue}>₹{totalPrice}</span>
              </div>

              <div style={styles.billRow}>
                <span style={styles.billLabel}>Taxes & Fees</span>
                <span style={{ ...styles.billValue, color: '#16a34a' }}>₹0 (Included)</span>
              </div>

              <div style={styles.billDivider} />

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Grand Total</span>
                <span style={styles.totalValue}>₹{totalPrice}</span>
              </div>

              <div style={styles.paymentNotice}>
                <span style={{ fontSize: '20px' }}>ℹ️</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#854d0e', fontSize: '13px' }}>
                    Pay at the Counter
                  </div>
                  <div style={{ color: '#a16207', fontSize: '12px', marginTop: '2px' }}>
                    No upfront online payment required. Pay when you are done dining.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Sticky Action Bar */}
      {items.length > 0 && (
        <div style={styles.stickyFooter}>
          <div style={styles.footerInner}>
            <div style={styles.footerSummary}>
              <span style={styles.footerCount}>
                {totalQuantity} {totalQuantity === 1 ? 'dish' : 'dishes'} selected
              </span>
              <span style={styles.footerTotal}>Total: ₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              style={{
                ...styles.placeOrderBtn,
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Placing Order...' : 'CONFIRM & PLACE ORDER →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    paddingBottom: '120px',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 20,
  },
  backBtn: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  headerTitleContainer: {
    textAlign: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
  },
  tableBadge: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '600',
  },
  main: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '20px 16px',
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    padding: '48px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
  browseBtn: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '12px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
  },
  contentGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '800',
    color: '#0f172a',
  },
  addMoreLink: {
    color: '#0284c7',
    fontSize: '13px',
    fontWeight: '700',
    textDecoration: 'none',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '14px',
    borderBottom: '1px solid #f1f5f9',
    gap: '12px',
    flexWrap: 'wrap',
  },
  itemInfo: {
    flex: '1 1 200px',
  },
  itemNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  typeIndicator: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  itemName: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f172a',
  },
  itemPricePerUnit: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '3px',
    display: 'block',
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    overflow: 'hidden',
  },
  qtyBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    width: '30px',
    height: '30px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    minWidth: '24px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '700',
    color: '#0f172a',
  },
  itemTotal: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#0f172a',
    minWidth: '60px',
    textAlign: 'right',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px',
  },
  billRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    marginBottom: '10px',
  },
  billLabel: {
    color: '#64748b',
  },
  billValue: {
    fontWeight: '600',
    color: '#0f172a',
  },
  billDivider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '14px 0',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '16px',
  },
  totalLabel: {
    fontWeight: '800',
  },
  totalValue: {
    color: '#0f172a',
    fontSize: '22px',
  },
  paymentNotice: {
    backgroundColor: '#fefce8',
    border: '1px solid #fef08a',
    borderRadius: '10px',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  stickyFooter: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    padding: '14px 20px',
    boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
    zIndex: 30,
  },
  footerInner: {
    maxWidth: '760px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  footerSummary: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerCount: {
    fontSize: '13px',
    color: '#64748b',
  },
  footerTotal: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
  },
  placeOrderBtn: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    padding: '12px 26px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(22,163,74,0.25)',
    transition: 'all 0.15s ease',
  },
};

