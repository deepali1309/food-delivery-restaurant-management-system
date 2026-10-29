# 🍔 BiteBuddy — Food Delivery & Restaurant Management System

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://food-delivery-restaurant-management.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/deepali1309/food-delivery-restaurant-management-system)
[![Technology](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange?style=for-the-badge)](https://developer.mozilla.org/)

A complete, responsive web application for food delivery ordering, restaurant kitchen management, and platform administrative control built with **semantic HTML5, pure modular CSS3, and vanilla JavaScript**.

---

## 1. Project Title
**BiteBuddy: Food Delivery & Restaurant Management System**

---

## 2. Project Overview
BiteBuddy simulates a real-world multi-sided food delivery platform connecting food lovers, restaurant partner kitchens, and platform administrators. Users can browse restaurants, filter menus, customize dishes, manage an interactive shopping cart, apply coupon discounts, place orders, and track fulfillment in real time. Restaurant owners can manage dish availability, list new recipes, and update order statuses, while administrators oversee platform transactions, users, and catalog compliance.

---

## 3. Problem Statement
Many food delivery web projects either use complex frontend frameworks that are difficult for college teammates to understand, or are built as static mockups where buttons do nothing. BiteBuddy solves both problems: it provides **100% interactive functionality** (cart calculations, status tracking, filters, authentication) built strictly with **standard HTML5, CSS3, and vanilla JavaScript**, making it approachable, fast, and easy to extend.

---

## 4. Main Objectives
- **Zero-Framework Simplicity:** Accessible to any teammate with standard HTML, CSS, and JavaScript skills.
- **Full Interactivity:** Dynamic cart, 1-click authentication, real-time filters, live order tracking stepper, and responsive design.
- **Clean Architecture:** Decoupled data services from DOM manipulation, preparing for seamless MongoDB Atlas integration.
- **Enterprise-Grade Documentation:** Comprehensive guides for setup, troubleshooting, architecture, and team Git workflows.

---

## 5. Features

### 🛍️ Customer Portal (12 Pages)
- **Home (`index.html`):** Hero search with live autocomplete, trending dishes, popular restaurants.
- **Restaurants Directory (`pages/restaurants.html`):** Multi-criteria sidebar filters (cuisine, ratings, delivery time) and dynamic sorting.
- **Restaurant Details (`pages/restaurant-details.html`):** Store banner, metadata, category tabs, and menu item cards.
- **Food Menu Catalog (`pages/food-menu.html`):** Global dishes catalog, live keyword search, category pills, and "Veg Only" toggle switch.
- **Dish Details (`pages/food-details.html`):** High-res dish view, nutrition breakdown, ingredient list, and interactive quantity stepper (+/-).
- **Shopping Cart (`pages/cart.html`):** Itemized list, quantity adjustment, coupon discounts (`WELCOME50`, `BITE20`), and live cost breakdown.
- **Checkout (`pages/checkout.html`):** Delivery address autofill, payment selection (COD, UPI, Card, Net Banking), and order validation.
- **Order Tracking (`pages/order-confirmation.html`):** Unique order number generation (`#FD10245`) and live 4-step status simulator.
- **Order History (`pages/my-orders.html`):** Past order cards with status filters and one-click reordering.
- **User Profile (`pages/profile.html`):** Personal information and saved delivery addresses editor.
- **Authentication (`pages/login.html` & `pages/register.html`):** 1-Click demo logins for Customer, Restaurant Owner, and Admin.

### 🏪 Restaurant Partner Dashboard (4 Pages)
- **Overview (`dashboards/restaurant/index.html`):** Kitchen KPIs (Daily Orders, Revenue, Active Dishes) and recent order queue.
- **Manage Food (`dashboards/restaurant/manage-food.html`):** Menu inventory table with live stock availability toggles.
- **Add Dish (`dashboards/restaurant/add-food.html`):** Recipe submission form with dietary classifications and image upload.
- **Kitchen Orders (`dashboards/restaurant/orders.html`):** Real-time order feed with status progression selectors.

### ⚡ Super Admin Dashboard (6 Pages)
- **Analytics Overview (`dashboards/admin/index.html`):** Aggregate GMV, order volume, and active restaurant metrics.
- **User Management (`dashboards/admin/users.html`):** Registered user accounts directory with role tags.
- **Restaurant Partners (`dashboards/admin/restaurants.html`):** Verification and approval table for partner kitchens.
- **Food Catalog Audit (`dashboards/admin/food-items.html`):** Platform-wide dish compliance inspection.
- **Master Ledger (`dashboards/admin/orders.html`):** Platform transaction log with order status filters.
- **Review Moderation (`dashboards/admin/reviews.html`):** Customer review and ratings moderation.

---

## 6. Technology Stack
- **Frontend Presentation:** HTML5 (Semantic elements, accessibility attributes)
- **Styling & Responsive Design:** Pure CSS3 (Flexbox, CSS Grid, Custom Properties / Design Tokens, no Tailwind/Bootstrap)
- **Interactivity & State:** Vanilla ECMAScript JavaScript (Event delegation, Web Audio API, LocalStorage reactive store)
- **Version Control:** Git & GitHub
- **Deployment & Hosting:** Vercel Static Hosting (with `vercel.json` rewrite routing)
- **Planned Backend & Database:** Node.js, Express, and MongoDB Atlas (Architected in `docs/DATABASE_SCHEMA.md`)

---

## 7. Project Architecture

The application implements a decoupled, event-driven architecture:

```
[User Action] ──> [DOM Event Delegation] ──> [Feature Controller]
                                                     │
                                                     ▼
                                          [Data Service Layer]
                                                     │
                             ┌───────────────────────┴───────────────────────┐
                             ▼                                               ▼
               [Reactive LocalStorage Store]                    [Future API Service / Backend]
                             │                                               │
                             ▼                                               ▼
               [DOM Re-render Pipeline]                       [MongoDB Atlas Database]
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full data flow diagrams.

---

## 8. Folder Structure

```
food-delivery-restaurant-management-system/
├── index.html                       # Public landing page (entry point)
├── vercel.json                      # Vercel deployment routing & rewrites
├── .gitignore                       # Git ignore rules
├── .env.example                     # Environment template
├── README.md                        # This guide
│
├── pages/                           # Customer portal pages (12 files)
│   ├── about.html, cart.html, checkout.html, food-details.html, food-menu.html,
│   └── login.html, my-orders.html, order-confirmation.html, profile.html, etc.
│
├── dashboards/                      # Management portals
│   ├── admin/                       # Super Admin portal (6 files)
│   └── restaurant/                  # Restaurant Kitchen portal (4 files)
│
├── assets/                          # Core assets
│   ├── css/                         # Modular CSS (base/, components/, pages/, dashboards/)
│   ├── js/                          # Modular JS (core/, services/, features/)
│   └── images/                      # Media assets (avatars/, banners/, food/, logo/, restaurants/)
│
├── docs/                            # Developer guides & documentation
│   ├── PROJECT_AUDIT.md, PROJECT_STRUCTURE.md, ARCHITECTURE.md, FEATURES.md,
│   └── SETUP.md, CONTRIBUTING.md, DATABASE_SCHEMA.md, TROUBLESHOOTING.md, REFACTOR_REPORT.md
│
└── tests/                           # Automated verification scripts
    ├── README.md, verify_links.py, check_syntax.py
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for an in-depth file-by-file breakdown.

---

## 9. Prerequisites
- **Web Browser:** Google Chrome, Microsoft Edge, or Mozilla Firefox.
- **Code Editor:** Visual Studio Code (recommended).
- **Python (3.10+):** Optional, for running the local test suite or built-in web server.
- **Node.js (18+):** Optional, for ECMAScript syntax validation.

---

## 10. Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/deepali1309/food-delivery-restaurant-management-system.git
   cd food-delivery-restaurant-management-system
   ```

2. **Open in VS Code:**
   ```bash
   code .
   ```

---

## 11. How to Run Locally

You can run BiteBuddy with **zero build tools** using either of these methods:

### Option A: VS Code Live Server (Recommended)
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. Browse to `http://127.0.0.1:5500/index.html`.

### Option B: Python Web Server
Open your terminal in the project root and run:
```bash
python -m http.server 3000
```
Open your browser and visit: `http://localhost:3000`

---

## 12. How to Access Each Major Page

| Portal / Page | Relative URL Path | Purpose |
|---|---|---|
| **Customer Home** | `/index.html` | Hero search, popular dishes & restaurants |
| **Restaurants** | `/pages/restaurants.html` | Restaurant directory with filters |
| **Food Menu** | `/pages/food-menu.html` | Global catalog with dietary pills |
| **Shopping Cart** | `/pages/cart.html` | Dynamic cart item list & coupon checkout |
| **Checkout** | `/pages/checkout.html` | Delivery address form & payment selection |
| **Order History** | `/pages/my-orders.html` | Past customer orders and reorders |
| **Login / Demo** | `/pages/login.html` | 1-Click demo logins for all 3 roles |
| **Admin Dashboard** | `/dashboards/admin/index.html` | Platform revenue & user metrics |
| **Restaurant Dashboard** | `/dashboards/restaurant/index.html` | Kitchen order queue & food stock controls |

---

## 13. How to Modify the UI
Styles are organized into modular files inside `assets/css/`:
- **Colors, Fonts, Spacing:** Edit `assets/css/base/variables.css`.
- **Buttons:** Edit `assets/css/components/buttons.css`.
- **Navigation Bar & Header:** Edit `assets/css/components/navbar.css`.
- **Cards (Food/Restaurant):** Edit `assets/css/components/cards.css`.
- **Forms & Inputs:** Edit `assets/css/components/forms.css`.
- **Responsive Layouts:** Edit `assets/css/responsive.css`.

All modular styles are imported and coordinated by `assets/css/main.css`.

---

## 14. How to Add a New Food Item or Restaurant

### To add a new Food Item:
Open `assets/js/core/data.js` and add a new object to `BiteBuddyData.foodItems`:

```javascript
{
    id: "mango-lassi",
    name: "Mango Lassi",
    category: "Beverages",
    cuisine: "North Indian",
    restaurantId: "spice-route",
    restaurantName: "Spice Route",
    price: 110,
    rating: 4.8,
    reviewsCount: 65,
    image: "assets/images/food/cold-coffee.jpg", // Or your custom image
    description: "Creamy yogurt drink flavored with sweet alphonso mangoes.",
    isVeg: true,
    isPopular: true
}
```

### To add a new Restaurant:
Add a new object to `BiteBuddyData.restaurants` in `assets/js/core/data.js`:

```javascript
{
    id: "tandoor-treats",
    name: "Tandoor Treats",
    slug: "tandoor-treats",
    image: "assets/images/restaurants/spice-route.jpg",
    cuisines: ["Mughlai", "Biryani"],
    rating: 4.4,
    deliveryTime: "25–35 min",
    deliveryMinutes: 30,
    costForTwo: 450,
    minOrder: 150
}
```

---

## 15. How the Cart and Checkout Work
1. **Adding Items:** Any button with `.btn-add-cart` or `data-id="dish-id"` triggers `Store.addToCart(dish, 1)`.
2. **Reactivity:** `Store` saves the cart to `localStorage` under `bitebuddy_cart` and fires the `cart:updated` event.
3. **Badge & Toast:** `assets/js/core/app.js` listens for `cart:updated` to update the navbar badge count and slide in a notification.
4. **Calculations:** `Store.getCartTotals()` computes:
   - Subtotal = $\sum (\text{item.price} \times \text{item.quantity})$
   - Taxes = $5\%$ of Subtotal
   - Platform Fee = ₹10
   - Delivery Fee = ₹40 (free if coupon applied or subtotal > ₹500)
   - Grand Total = Subtotal + Taxes + Fees - Discount
5. **Checkout:** On form submission, `OrderService.placeOrder()` generates an order ID (`#FD10245`), saves it to `bitebuddy_orders`, clears the active cart, and redirects to `order-confirmation.html?id=...`.

---

## 16. How to Add a New JavaScript Feature
1. **Identify Responsibility:**
   - If it retrieves data, place it in a service (`assets/js/services/`).
   - If it manipulates the DOM on a page, place it in a feature controller (`assets/js/features/<feature>/`).
2. **Use Shared Utilities:**
   - Resolve image paths with `BiteBuddy.Utils.assetUrl("images/...")`.
   - Resolve internal links with `BiteBuddy.Utils.pageUrl("my-page.html")`.
   - Format prices with `BiteBuddy.Utils.formatPrice(num)`.
   - Show toasts with `BiteBuddy.DOM.toast("Message", "success")`.
3. **Load with Defer:** In your HTML page, load the script using `<script defer src="..."></script>`.

---

## 17. Current Data-Storage Approach
- BiteBuddy currently utilizes client-side reactive state managed through browser **`LocalStorage`** via `assets/js/core/store.js`.
- Seed catalog data (restaurants, menu dishes, default coupons) is initialized from `assets/js/core/data.js`.
- If a user opens the site for the first time, initial records are populated automatically.
- Data persists across browser refreshes and page navigations on the same machine.
- Run `localStorage.clear(); location.reload();` in your browser console at any time to reset state.

---

## 18. Planned MongoDB Atlas Integration
A full architectural blueprint for a backend with MongoDB Atlas is documented in [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md).
- Frontend services (`assets/js/services/api.service.js`) are already decoupled from UI rendering.
- When an Express/Node.js backend is launched, set `isMockMode: false` in `api.service.js` to immediately connect to live API routes.
- An environment template is provided in `.env.example`.

---

## 19. Deployment Instructions (Vercel)
The project is configured for continuous deployment on **Vercel**:
1. Connect your GitHub repository to Vercel.
2. Vercel automatically detects the static HTML project.
3. The root `vercel.json` provides URL rewrites, routing `/cart` to `/pages/cart.html` and preserving all legacy routes.
4. **Live deployment:** https://food-delivery-restaurant-management.vercel.app/

---

## 20. Common Errors and Troubleshooting
- **CSS Not Loading:** Verify your relative path to `main.css`. Pages in `pages/` require `../assets/css/main.css`.
- **Scripts Throwing Null Errors:** Ensure scripts use the `defer` attribute and wrap DOM queries in `DOMContentLoaded`.
- **Stale Cart Data:** Run `localStorage.clear()` in the DevTools console.

For comprehensive solutions to 9 common scenarios, see [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

---

## 21. Git Workflow for Team Members
1. Always create a feature branch (`git checkout -b feature/my-feature`).
2. Make your changes and test locally.
3. Run automated tests before committing:
   ```bash
   python tests/verify_links.py
   python tests/check_syntax.py
   ```
4. Commit with descriptive messages and push:
   ```bash
   git commit -m "feat(menu): add dietary filter chips"
   git push -u origin feature/my-feature
   ```
5. Open a Pull Request on GitHub for peer review.

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for full branch and naming guidelines.

---

## 22. Future Improvements
- [ ] Node.js & Express REST API server integration.
- [ ] Live MongoDB Atlas database synchronization.
- [ ] Real-time kitchen WebSocket broadcasts.
- [ ] Dark mode / Light mode theme switcher.
- [ ] Dedicated Delivery Rider portal.

---

## 23. Contributors
- **Deepali Gupta** ([@deepali1309](https://github.com/deepali1309)) — *Project Owner & Lead Developer*
- **Dhruv** ([@codedhruv08](https://github.com/codedhruv08)) — *Collaborator*

---

*Crafted with ❤️ for food lovers and fellow student developers.*
