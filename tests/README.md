# 🧪 BiteBuddy Test Suite & Quality Assurance Guide

This directory documents the testing procedures, automated verification scripts, and manual quality assurance checklists for the **BiteBuddy Food Delivery & Restaurant Management System**.

---

## 1. Automated Testing Scripts

We have provided automated test utilities to verify code integrity without third-party frameworks.

### A. Static Asset & Reference Verification
Verifies that 100% of internal hyperlinks (`href`), image sources (`src`), stylesheets, form actions, and script references resolve to physical files on disk across all 23 HTML pages.

```bash
# From repository root
python tests/verify_links.py
```

### B. JavaScript Syntax Validation
Uses Node.js syntax engine (`node -c`) to validate all 23 JavaScript core, service, and feature files against standard ECMAScript specifications.

```bash
# From repository root
python tests/check_syntax.py
```

---

## 2. Manual Functional Verification Checklist

### 1. Customer-Facing Flows
- [ ] **Homepage (`index.html`):**
  - Search input shows live autocomplete dropdown for dishes and restaurants.
  - Clicking "Add to Cart" on trending dishes increments navbar badge and shows toast.
  - "Browse Restaurants" button routes to `pages/restaurants.html`.
- [ ] **Restaurant Directory (`pages/restaurants.html`):**
  - Filtering by Cuisine (North Indian, Italian, Chinese, Fast Food) updates card grid.
  - Sorting by Rating and Delivery Time re-orders items correctly.
- [ ] **Food Menu Catalog (`pages/food-menu.html`):**
  - Category navigation tabs (All, Starters, Main Course, Desserts, Beverages) filter dishes.
  - "Veg Only" toggle hides non-vegetarian dishes.
  - Clicking a dish opens `pages/food-details.html?id=...`.
- [ ] **Shopping Cart (`pages/cart.html`):**
  - Quantity increment (`+`) and decrement (`-`) dynamically recalculate item subtotals.
  - Decrementing to 0 prompts or removes item.
  - Valid coupon `WELCOME50` or `BITE20` applies discount and recalculates grand total.
  - Empty cart displays the empty state with a "Browse Food" CTA button.
  - "Proceed to Checkout" routes to `pages/checkout.html`.
- [ ] **Checkout Flow (`pages/checkout.html`):**
  - Pre-fills saved user address if logged in.
  - Radio button selects Payment Method (COD, UPI, Card, Net Banking).
  - Submitting form validates required fields, clears cart, creates a new order in `Store`, and redirects to `pages/order-confirmation.html?id=...`.
- [ ] **Order Tracking (`pages/order-confirmation.html`):**
  - Displays generated order number (e.g. `#FD10245`).
  - Animated live tracking stepper advances through *Order Placed* → *Kitchen Preparing* → *On the Way* → *Delivered*.
- [ ] **My Orders History (`pages/my-orders.html`):**
  - Displays all past orders saved in localStorage.
  - Status tabs (All, Preparing, Delivered) filter past orders.
  - Clicking "Reorder" loads items back into cart and navigates to `pages/cart.html`.

### 2. Authentication & Profile
- [ ] **Login (`pages/login.html`):**
  - 1-Click Demo Login buttons for Customer (Rahul), Restaurant Partner (Chef Vikram), and Admin (Deepali) log in immediately.
  - Redirects to appropriate destination (`index.html`, `dashboards/restaurant/index.html`, `dashboards/admin/index.html`).
- [ ] **User Registration (`pages/register.html`):**
  - Validates minimum 3-character name, email regex, 10-digit phone, and password length.
- [ ] **User Profile (`pages/profile.html`):**
  - Shows logged-in user details.
  - Allows editing delivery address and updating state.

### 3. Management Dashboards
- [ ] **Admin Dashboard (`dashboards/admin/index.html`):**
  - Metric stat cards display dynamic totals for Revenue, Orders, and Active Menus.
  - User Directory (`users.html`) and Restaurant Partners (`restaurants.html`) render accurately.
- [ ] **Restaurant Dashboard (`dashboards/restaurant/index.html`):**
  - Live kitchen orders queue displays orders with status transition selectors.
  - Menu Management (`manage-food.html`) allows toggling stock status (In Stock / Out of Stock).
  - Add Food form (`add-food.html`) allows submitting new dish records.

---

## 3. Browser Compatibility Checklist
Test in modern Chromium, Gecko, and WebKit browsers:
- [ ] Google Chrome / Microsoft Edge (Latest)
- [ ] Mozilla Firefox (Latest)
- [ ] Apple Safari (Desktop & Mobile)
- [ ] Mobile Viewport (Responsive inspection at 375px, 768px, and 1280px)

