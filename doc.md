Yes — now the requirement is much clearer.

You want a very lightweight restaurant order-management website, not a food-delivery app.

The core idea should be:

Customer scans QR → selects food → sends order → restaurant prepares it → customer pays at the counter.

No login, no signup, no online payment, no delivery, no unnecessary information.

🍽️ Simple Restaurant System
Customer side
SCAN QR
↓
MENU
↓
SELECT FOOD
↓
VIEW CART
↓
PLACE ORDER
↓
ORDER NUMBER

That's the entire customer journey.

Restaurant side
NEW ORDER
↓
ACCEPT
↓
PREPARING
↓
READY
↓
COMPLETED

1. Customer doesn't need an account

When someone scans the QR:

https://restaurant.com/table/12

The system knows:

Table = 12

That's enough.

Don't ask:

Name
Email
Password
Phone
Address
OTP
Login

The customer can immediately start ordering.

2. Customer Menu

Keep it extremely simple.

┌─────────────────────────────┐
│ 🍽️ ABC RESTAURANT │
│ │
│ 🔍 Search food... │
│ │
│ [All] [Biryani] [Starters] │
│ [Drinks] [Desserts] │
│ │
│ Chicken Biryani │
│ ₹180 [+] │
│ │
│ Chicken 65 │
│ ₹150 [+] │
│ │
│ Mutton Biryani │
│ ₹250 [+] │
│ │
├─────────────────────────────┤
│ 🛒 3 Items ₹510 │
│ [VIEW CART] │
└─────────────────────────────┘

The customer can simply tap +.

3. Cart

Don't make checkout complicated.

YOUR ORDER

Chicken Biryani 2 × ₹180
Chicken 65 1 × ₹150

---

Total ₹510

Table: 12

[ PLACE ORDER ]

That's it.

No payment page.

4. After Place Order

Show:

✅ ORDER PLACED

Order #1045

Table 12

Chicken Biryani × 2
Chicken 65 × 1

Total: ₹510

Please pay at the counter.

       [ VIEW ORDER ]

The customer doesn't have to do anything else.

5. Customer Order Tracking

After placing the order, they can see:

Order #1045

✓ Order Received
✓ Accepted
● Preparing
○ Ready

When the restaurant marks it ready:

Order #1045

✓ Order Received
✓ Accepted
✓ Preparing
✓ READY

🍽️ Your order is ready.

Please collect your order.

This is optional, but useful.

6. No Online Payment

Your system simply records:

Order Total = ₹510
Payment Status = UNPAID

When the customer pays at the counter, the owner/staff clicks:

[ MARK AS PAID ]

Then:

Payment Status = PAID

So your order looks like:

{
orderId: "ORD1045",
tableId: "T12",

items: [
{
foodId: "F001",
name: "Chicken Biryani",
quantity: 2,
price: 180
}
],

total: 510,

orderStatus: "READY",
paymentStatus: "UNPAID"
} 7. Owner Dashboard

The owner's screen should also be very simple.

When the owner opens the dashboard:

┌─────────────────────────────────────┐
│ RESTAURANT │
├─────────────────────────────────────┤
│ │
│ 🔴 NEW ORDERS 5 │
│ 🟡 PREPARING 8 │
│ 🟢 READY 3 │
│ │
├─────────────────────────────────────┤
│ ORDERS │
│ │
│ #1045 Table 12 ₹510 │
│ New │
│ [ ACCEPT ] │
│ │
│ #1044 Table 08 ₹320 │
│ Preparing │
│ [ READY ] │
│ │
│ #1043 Table 03 ₹450 │
│ Ready │
│ [ MARK PAID ] │
│ │
└─────────────────────────────────────┘

The owner shouldn't have to navigate through complicated menus.

8. Kitchen View

If the restaurant has kitchen staff, give them a dedicated screen.

NEW

┌─────────────────────┐
│ #1045 │
│ TABLE 12 │
│ │
│ Chicken Biryani × 2 │
│ Chicken 65 × 1 │
│ │
│ [ START ] │
└─────────────────────┘

After starting:

PREPARING

#1045
Table 12

Chicken Biryani × 2
Chicken 65 × 1

[ READY ]

When ready:

READY

#1045
Table 12

[ COMPLETED ] 9. Owner Menu Management

The owner needs only a simple menu screen.

MENU

Chicken Biryani ₹180 🟢
Chicken 65 ₹150 🟢
Mutton Biryani ₹250 🟢
Fish Fry ₹200 🔴

The owner can:

[ + ADD FOOD ]

Food Name
Price
Category
Image
Available / Unavailable

[ SAVE ]

The most important feature is Available/Unavailable.

For example, if chicken biryani finishes:

Chicken Biryani 🔴 Unavailable

Immediately customers won't be able to order it.

10. Tables

Owner can see:

TABLES

T01 🟢 Available
T02 🔴 Ordering
T03 🔴 Ordering
T04 🟢 Available
T05 🟢 Available

Clicking Table 12:

TABLE 12

Current Order

#1045
₹510

Status: Preparing
Payment: Unpaid 11. Very Useful: One QR Per Table

This is the main trick that makes everything simple.

TABLE 01 → QR 01
TABLE 02 → QR 02
TABLE 03 → QR 03
...
TABLE 50 → QR 50

QR:

restaurant.com/order/T12

The system automatically knows:

Table = T12

So the customer doesn't even need to tell the waiter:

"I'm sitting at table 12."

The system already knows.

12. What if 4 people sit at the same table?

This is important.

Suppose 4 customers are sitting at Table 12.

All four scan the same QR:

Customer A ─┐
Customer B ─┤
Customer C ─┼──→ TABLE 12
Customer D ─┘

They can all add orders.

You can have one table session:

TABLE 12

Session #S10025

Customer A
Chicken Biryani × 1

Customer B
Coke × 2

Customer C
Chicken 65 × 1

Customer D
Mutton Biryani × 1

Restaurant sees:

ORDER #1045

TABLE 12

Chicken Biryani × 1
Coke × 2
Chicken 65 × 1
Mutton Biryani × 1

TOTAL ₹...

This is much better than requiring each person to create an account.

13. Even Better: Allow Multiple Orders at Same Table

Don't force the customer to place everything in one order.

For example:

12:30 PM

Table 12
Order #1045

Biryani × 2

Then 10 minutes later:

12:40 PM

Table 12
Order #1046

Coke × 2

Owner can see:

TABLE 12

Order #1045 ₹360
Order #1046 ₹100

---

TOTAL ₹460

Payment: UNPAID

When they pay:

[ MARK TABLE PAID ]

Everything becomes completed.

14. Your Entire Application Can Be Only 3 Main Interfaces

This is what I'd recommend.

👨‍🍳 Kitchen
NEW
PREPARING
READY
🧑‍💼 Owner
Dashboard
Orders
Menu
Tables
Sales
👤 Customer
Scan QR
↓
Menu
↓
Cart
↓
Place Order
↓
Track Order

That's enough.

15. Don't Build These Initially

For your particular requirement, don't waste development time on:

❌ Customer registration
❌ Customer login
❌ Customer profiles
❌ Passwords
❌ OTP
❌ Delivery management
❌ Online payment
❌ Credit/debit card integration
❌ Customer addresses
❌ Delivery tracking
❌ Complex loyalty system
❌ Complicated reservation system

You can add them later if the restaurant actually needs them.

16. Recommended Backend

For your use case:

Vue 3
↓
REST API
↓
Node.js + Express
↓
MySQL / PostgreSQL

And for instant order updates:

Vue
↕
Socket.IO
↕
Node.js

So when Customer places:

ORDER #1045

the kitchen screen can immediately receive:

🔔 NEW ORDER #1045

No need for the kitchen staff to refresh the page.

17. The Final Concept

Your application should feel almost like using a restaurant paper menu, but faster.

Customer
📱 Scan

↓

🍽️ See menu

↓

➕ Select items

↓

🛒 Place order

↓

✅ Wait for food

↓

💵 Pay at counter
Restaurant
🔔 New Order

↓

👨‍🍳 Prepare

↓

✅ Mark Ready

↓

💵 Customer Pays

↓

✔ Mark Paid / Complete
Owner
TODAY
┌─────────────────┐
│ Orders 120 │
│ Sales ₹45,250│
│ Pending 8 │
└─────────────────┘

Orders | Menu | Tables | Sales

This is the direction I'd take for your project: a QR-based, no-login, no-online-payment restaurant ordering system focused entirely on reducing the time for both the customer and restaurant staff.

🛠️ Simple Tech Stack
Part Technology
Frontend React.js
Styling Tailwind CSS
Build Tool Vite
Backend Node.js + Express.js
Database MySQL
API Calls Axios
Routing React Router
Real-time Orders Socket.IO
QR Code QR Code library
Admin Login JWT
