CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE tables_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_id VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('Available', 'Ordering') DEFAULT 'Available'
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    table_id VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM('RECEIVED', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED') DEFAULT 'RECEIVED',
    payment_status ENUM('UNPAID', 'PAID') DEFAULT 'UNPAID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    food_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Insert dummy data
INSERT INTO menu_items (food_id, name, price, category, is_available) VALUES 
('F001', 'Chicken Biryani', 180.00, 'Biryani', TRUE),
('F002', 'Chicken 65', 150.00, 'Starters', TRUE),
('F003', 'Mutton Biryani', 250.00, 'Biryani', TRUE),
('F004', 'Fish Fry', 200.00, 'Starters', FALSE),
('F005', 'Coke', 50.00, 'Drinks', TRUE);

INSERT INTO tables_info (table_id, status) VALUES 
('T01', 'Available'),
('T02', 'Available'),
('T03', 'Available'),
('T04', 'Available'),
('T12', 'Available');
