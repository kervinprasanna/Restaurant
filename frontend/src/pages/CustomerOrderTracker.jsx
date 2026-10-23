import React, { useMemo } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

export default function CustomerOrderTracker() {
  const { orderId } = useParams();
  const location = useLocation();

  // Try to get order from state or localStorage
  const order = useMemo(() => {
    if (location.state && location.state.items) {
      return location.state;
    }
    try {
      const orders = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
      const found = orders.find((o) => o.orderId === orderId);
      if (found) return found;
    } catch (e) {
      console.error(e);
    }
    return {
      orderId: orderId || 'ORD1001',
      tableId: '04',
      items: [],
      total: 0,
      orderStatus: 'RECEIVED',
      paymentStatus: 'UNPAID',
    };
  }, [location.state, orderId]);

  const { items = [], total = 0, tableId = '04', orderStatus = 'RECEIVED' } = order;

  return (
    <div style={trackerStyles.container}>
      <header style={trackerStyles.header}>
        <Link to={`/table/${tableId}`} style={trackerStyles.backLink}>
          ← Menu
        </Link>
        <span style={trackerStyles.headerTitle}>Order Confirmation</span>
        <div style={{ width: 60 }} />
      </header>

      <div style={trackerStyles.card}>
        <div style={trackerStyles.successBadge}>
          <span style={{ fontSize: '38px' }}>✅</span>
        </div>

        <h1 style={trackerStyles.title}>ORDER PLACED!</h1>
        <p style={trackerStyles.subtitle}>
          The kitchen has received your order and is starting preparation.
        </p>

        <div style={trackerStyles.metaRow}>
          <div style={trackerStyles.metaBox}>
            <span style={trackerStyles.metaLabel}>Order ID</span>
            <strong style={trackerStyles.metaVal}>#{order.orderId || orderId}</strong>
          </div>
          <div style={trackerStyles.metaBox}>
            <span style={trackerStyles.metaLabel}>Table</span>
            <strong style={trackerStyles.metaVal}>Table #{tableId}</strong>
          </div>
        </div>

        {/* Status Tracker */}
        <div style={trackerStyles.stepper}>
          <div style={trackerStyles.stepItem}>
            <div style={{ ...trackerStyles.stepCircle, backgroundColor: '#16a34a', color: '#fff' }}>✓</div>
            <span style={trackerStyles.stepLabelActive}>Received</span>
          </div>
          <div style={{ ...trackerStyles.stepLine, backgroundColor: '#16a34a' }} />
          <div style={trackerStyles.stepItem}>
            <div style={{ ...trackerStyles.stepCircle, backgroundColor: '#f59e0b', color: '#fff' }}>🍳</div>
            <span style={trackerStyles.stepLabelActive}>Preparing</span>
          </div>
          <div style={trackerStyles.stepLine} />
          <div style={trackerStyles.stepItem}>
            <div style={trackerStyles.stepCircle}>🍽️</div>
            <span style={trackerStyles.stepLabel}>Ready</span>
          </div>
        </div>

        {/* Order Items Summary */}
        <div style={trackerStyles.itemsContainer}>
          <div style={trackerStyles.itemsHeader}>
            <span>Order Summary</span>
            <span>{items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
          </div>

          <div style={trackerStyles.itemsList}>
            {items.map((item, index) => (
              <div key={index} style={trackerStyles.itemRow}>
                <div style={trackerStyles.itemLeft}>
                  <span style={trackerStyles.itemQuantity}>{item.quantity}×</span>
                  <span style={trackerStyles.itemName}>{item.name}</span>
                </div>
                <span style={trackerStyles.itemPrice}>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div style={trackerStyles.totalRow}>
            <span>Total Amount</span>
            <span style={trackerStyles.totalPrice}>₹{total}</span>
          </div>
        </div>

        {/* Counter Payment Callout */}
        <div style={trackerStyles.paymentNotice}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div style={{ textAlign: 'left' }}>
            <h4 style={trackerStyles.paymentTitle}>Payment Status: UNPAID</h4>
            <p style={trackerStyles.paymentText}>
              Please show your Order ID <strong>#{order.orderId || orderId}</strong> and pay at the counter before leaving.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={trackerStyles.actionButtons}>
          <Link to={`/table/${tableId}`} style={trackerStyles.orderMoreBtn}>
            🍽️ Order More Items
          </Link>
          <Link to="/kitchen" style={trackerStyles.viewKitchenBtn}>
            👨‍🍳 View in Kitchen Display
          </Link>
        </div>
      </div>
    </div>
  );
}

const trackerStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '0 16px 40px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: '520px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
  },
  backLink: {
    color: '#0284c7',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    padding: '28px 20px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  successBadge: {
    width: '72px',
    height: '72px',
    backgroundColor: '#dcfce7',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    boxShadow: '0 0 0 8px #f0fdf4',
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '24px',
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: '0 0 20px 0',
    color: '#64748b',
    fontSize: '14px',
  },
  metaRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '24px',
  },
  metaBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: '12px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaVal: {
    fontSize: '16px',
    color: '#0f172a',
    marginTop: '2px',
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    padding: '0 10px',
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  stepCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '14px',
  },
  stepLine: {
    flex: 1,
    height: '3px',
    backgroundColor: '#e2e8f0',
    margin: '0 8px',
    marginBottom: '20px',
  },
  stepLabelActive: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#0f172a',
  },
  stepLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#94a3b8',
  },
  itemsContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    padding: '16px',
    marginBottom: '20px',
    textAlign: 'left',
  },
  itemsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    paddingBottom: '10px',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '10px',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '14px',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  itemQuantity: {
    backgroundColor: '#e2e8f0',
    color: '#0f172a',
    fontWeight: '800',
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  itemName: {
    fontWeight: '600',
    color: '#0f172a',
  },
  itemPrice: {
    fontWeight: '700',
    color: '#0f172a',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px dashed #cbd5e1',
    fontWeight: '800',
    fontSize: '16px',
    color: '#0f172a',
  },
  totalPrice: {
    fontSize: '20px',
    color: '#16a34a',
  },
  paymentNotice: {
    backgroundColor: '#fefce8',
    border: '1px solid #fde047',
    borderRadius: '12px',
    padding: '14px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  paymentTitle: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '800',
    color: '#854d0e',
  },
  paymentText: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#a16207',
    lineHeight: 1.4,
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  orderMoreBtn: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '14px',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: '14px',
    display: 'block',
    boxShadow: '0 2px 8px rgba(15,23,42,0.15)',
  },
  viewKitchenBtn: {
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    border: '1px solid #cbd5e1',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '13px',
    display: 'block',
  },
};

