import React, { useState } from "react";
import "./home.css";

const menuItems = [
  // Starters
  {
    id: 1,
    name: "Chicken 65",
    category: "Starters",
    price: 180,
    type: "non-veg",
    desc: "Spicy and crispy deep-fried chicken tossed with curry leaves and green chilies.",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    category: "Starters",
    price: 160,
    type: "veg",
    desc: "Cottage cheese cubes marinated in tandoori spices and grilled to perfection.",
  },
  {
    id: 3,
    name: "Crispy Corn",
    category: "Starters",
    price: 130,
    type: "veg",
    desc: "Crispy fried sweet corn seasoned with pepper, salt, and spices.",
  },
  {
    id: 4,
    name: "Dragon Chicken",
    category: "Starters",
    price: 200,
    type: "non-veg",
    desc: "Crunchy chicken strips tossed in a sweet and fiery red sauce with cashews.",
  },

  // Rice
  {
    id: 5,
    name: "Chicken Biryani",
    category: "Rice",
    price: 220,
    type: "non-veg",
    desc: "Aromatic basmati rice cooked with tender spiced chicken, served with raita.",
  },
  {
    id: 6,
    name: "Mutton Biryani",
    category: "Rice",
    price: 280,
    type: "non-veg",
    desc: "Traditional slow-cooked mutton dum biryani with rich royal flavors.",
  },
  {
    id: 7,
    name: "Veg Fried Rice",
    category: "Rice",
    price: 140,
    type: "veg",
    desc: "Wok-tossed long grain rice with fresh crunchy vegetables and spring onions.",
  },
  {
    id: 8,
    name: "Jeera Rice",
    category: "Rice",
    price: 120,
    type: "veg",
    desc: "Fragrant basmati rice tempered with ghee, cumin seeds, and mild spices.",
  },

  // Desserts
  {
    id: 9,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 80,
    type: "veg",
    desc: "Warm soft milk dumplings soaked in cardamom and rose sugar syrup.",
  },
  {
    id: 10,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 130,
    type: "veg",
    desc: "Rich warm fudge brownie served with melted chocolate sauce.",
  },
  {
    id: 11,
    name: "Rasmalai",
    category: "Desserts",
    price: 90,
    type: "veg",
    desc: "Soft cottage cheese discs soaked in sweetened saffron-cardamom milk.",
  },
  {
    id: 12,
    name: "Ice Cream Scoop",
    category: "Desserts",
    price: 60,
    type: "veg",
    desc: "Choice of chilled Vanilla, Chocolate, or Strawberry scoop.",
  },

  // Juices
  {
    id: 13,
    name: "Fresh Mango Juice",
    category: "Juices",
    price: 70,
    type: "veg",
    desc: "Thick and chilled juice made from sweet seasonal mangoes.",
  },
  {
    id: 14,
    name: "Mint Lime Cooler",
    category: "Juices",
    price: 50,
    type: "veg",
    desc: "Zesty lime juice crushed with fresh mint leaves and sparkling soda.",
  },
  {
    id: 15,
    name: "Watermelon Juice",
    category: "Juices",
    price: 60,
    type: "veg",
    desc: "Freshly cold-pressed sweet watermelon juice served chilled.",
  },
  {
    id: 16,
    name: "Fresh Orange Juice",
    category: "Juices",
    price: 70,
    type: "veg",
    desc: "100% natural freshly squeezed orange juice with pulp.",
  },
];

const categories = ["All", "Starters", "Rice", "Desserts", "Juices"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [tableNumber, setTableNumber] = useState("04");

  // Add item to cart
  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  // Filter items by category & search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate totals
  const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((i) => i.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="menu-page">
      {/* Top Header */}
      <header className="menu-header">
        <div className="header-brand">
          <span className="brand-icon">🍽️</span>
          <div>
            <h1>Restaurant Menu</h1>
            <p className="subtitle">Delicious food freshly prepared for you</p>
          </div>
        </div>
        <div className="table-badge">
          <span>Table</span>
          <strong>#{tableNumber}</strong>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search starters, rice, desserts, juices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "Starters" && "🍗 "}
            {category === "Rice" && "🍚 "}
            {category === "Desserts" && "🍨 "}
            {category === "Juices" && "🍹 "}
            {category === "All" && "✨ "}
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <main className="menu-container">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>No dishes found matching your search.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div key={item.id} className="menu-card">
                  <div className="card-header">
                    <span
                      className={`food-tag ${
                        item.type === "veg" ? "veg-tag" : "non-veg-tag"
                      }`}
                    >
                      {item.type === "veg" ? "🟢 VEG" : "🔴 NON-VEG"}
                    </span>
                    <span className="category-label">{item.category}</span>
                  </div>

                  <h3 className="food-name">{item.name}</h3>
                  <p className="food-desc">{item.desc}</p>

                  <div className="card-footer">
                    <div className="price">₹{item.price}</div>

                    {qty === 0 ? (
                      <button
                        className="add-btn"
                        onClick={() => addToCart(item.id)}
                      >
                        + Add
                      </button>
                    ) : (
                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          −
                        </button>
                        <span className="qty-number">{qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => addToCart(item.id)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Bottom Sticky Cart Summary */}
      {totalCount > 0 && (
        <div className="floating-cart-bar">
          <div className="cart-info">
            <span className="cart-count">
              🛒 {totalCount} {totalCount === 1 ? "item" : "items"}
            </span>
            <span className="cart-total">Total: ₹{totalPrice}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={() => alert(`Order placed for Table #${tableNumber}! Total: ₹${totalPrice}`)}
          >
            Place Order →
          </button>
        </div>
      )}
    </div>
  );
}
