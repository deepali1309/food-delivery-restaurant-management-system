# 📂 Project Structure Guide

**Project:** BiteBuddy (Food Delivery & Restaurant Management System)  
**Document Version:** 2.0.0  
**Updated:** October 29, 2026  

---

## 1. Directory Tree Overview

```
food-delivery-restaurant-management-system/
│
├── index.html                       # Public Landing Page & Primary Entry Point
├── vercel.json                      # Vercel Deployment Routing, Rewrites & Security Headers
├── .gitignore                       # Ignored build, OS, and credential artifacts
├── .env.example                     # Environment variables template
├── README.md                        # Master onboarding documentation for teammates
│
├── pages/                           # Customer-Facing Portal Pages
│   ├── about.html                   # Brand story, mission, and workflow
│   ├── cart.html                    # Interactive shopping cart
│   ├── checkout.html                # Multi-step checkout & payment selector
│   ├── food-details.html            # Single dish view with nutrition & quantity
│   ├── food-menu.html               # Global menu catalog with filters
│   ├── login.html                   # Authentication with 1-click demo logins
│   ├── my-orders.html               # Order history & reordering
│   ├── order-confirmation.html      # Order success screen with live status tracker
│   ├── profile.html                 # Customer account profile & address editor
│   ├── register.html                # Account sign-up form
│   ├── restaurant-details.html      # Restaurant showcase & categorized menu
│   └── restaurants.html             # Restaurant directory with cuisine filters
│
├── dashboards/                      # Management Dashboards
│   ├── admin/                       # Super Administrator Portal
│   │   ├── index.html               # Aggregate metrics & GMV analytics
│   │   ├── food-items.html          # Global food catalog inspection
│   │   ├── orders.html              # Master orders ledger
│   │   ├── restaurants.html         # Partner restaurant management & audit
│   │   ├── reviews.html             # Customer review moderation
│   │   └── users.html               # User directory & role management
│   │
│   └── restaurant/                  # Restaurant Partner Kitchen Portal
│       ├── index.html               # Daily kitchen KPIs & live order queue
│       ├── add-food.html            # Dish creation form with dietary metadata
│       ├── manage-food.html         # Menu inventory & stock availability toggles
│       └── orders.html              # Kitchen order fulfillment & status dispatcher
│
├── assets/                          # Core Project Static Assets
│   ├── css/                         # Modular CSS Design System
│   │   ├── base/                    # Variables, browser normalization, typography
│   │   │   ├── variables.css
│   │   │   ├── reset.css
│   │   │   └── typography.css
│   │   ├── components/              # Reusable UI component stylesheets
│   │   │   ├── buttons.css
│   │   │   ├── forms.css
│   │   │   ├── cards.css
│   │   │   ├── navbar.css
│   │   │   └── modals.css
│   │   ├── pages/                   # Page-specific layout styles
│   │   │   ├── home.css
│   │   │   ├── restaurants.css
│   │   │   ├── food-details.css
│   │   │   ├── cart.css
│   │   │   └── checkout.css
│   │   ├── dashboards/              # Portal-specific dashboard styles
│   │   │   ├── admin.css
│   │   │   └── restaurant.css
│   │   ├── responsive.css           # Global responsive breakpoints (1024px, 768px, 480px)
│   │   └── main.css                 # Master coordinator importing all modular layers
│   │
│   ├── js/                          # Modular Vanilla JavaScript Architecture
│   │   ├── core/                    # Application foundational layer
│   │   │   ├── constants.js         # Tokens, storage keys, statuses, demo users
│   │   │   ├── utils.js             # Currency, chimes, path resolvers, sanitize
│   │   │   ├── dom.js               # Element creation, event delegation, toasts
│   │   │   ├── data.js              # Seed catalog (restaurants, dishes, coupons)
│   │   │   ├── store.js             # LocalStorage reactive state & event bus
│   │   │   └── app.js               # Global UI initialization & header cart badge
│   │   ├── services/                # Decoupled Data & Communication Services
│   │   │   ├── api.service.js       # HTTP client with mock/real backend toggle
│   │   │   ├── auth.service.js      # Session management & user authentication
│   │   │   ├── food.service.js      # Dish queries, dietary filters, search
│   │   │   ├── restaurant.service.js# Restaurant queries, cuisine filters, sorting
│   │   │   └── order.service.js     # Order placement, status tracking, reorders
│   │   └── features/                # Page-specific DOM controllers
│   │       ├── auth/
│   │       │   └── auth.js
│   │       ├── home/
│   │       │   └── home.js
│   │       ├── food/
│   │       │   ├── menu.js
│   │       │   └── food-details.js
│   │       ├── restaurants/
│   │       │   ├── restaurants.js
│   │       │   └── restaurant-details.js
│   │       ├── cart/
│   │       │   └── cart.js
│   │       ├── checkout/
│   │       │   └── checkout.js
│   │       ├── orders/
│   │       │   ├── orders.js
│   │       │   └── order-confirmation.js
│   │       ├── profile/
│   │       │   └── profile.js
│   │       └── dashboards/
│   │           └── dashboard.js
│   │
│   └── images/                      # Curated media assets
│       ├── avatars/                 # User, chef, and admin avatars
│       ├── banners/                 # Marketing banners & hero backgrounds
│       ├── food/                    # Food dish photographs
│       ├── logo/                    # Vector brand identity (logo.svg)
│       ├── restaurants/             # Restaurant exterior/interior imagery
│       └── IMAGE-SOURCES.md         # Image attribution & license references
│
├── docs/                            # Architecture & Team Documentation
│   ├── PROJECT_AUDIT.md             # Initial project evaluation & gap analysis
│   ├── PROJECT_STRUCTURE.md         # This structure guide
│   ├── ARCHITECTURE.md              # Runtime flow & system design
│   ├── FEATURES.md                  # Comprehensive feature status catalog
│   ├── SETUP.md                     # Beginner setup guide for VS Code / Windows
│   ├── CONTRIBUTING.md              # Git workflow and coding conventions
│   ├── DATABASE_SCHEMA.md           # Proposed MongoDB Atlas document models
│   ├── TROUBLESHOOTING.md           # Verified resolutions for common issues
│   └── REFACTOR_REPORT.md           # Detailed changelog and test results
│
└── tests/                           # Automated Verification Suite
    ├── README.md                    # Testing protocols & manual QA checklist
    ├── verify_links.py              # Automated 100% link & asset integrity checker
    └── check_syntax.py              # Automated Node.js ECMAScript syntax checker
```

---

## 2. File Roles & Categorization

### Shared Files (Used Across the Entire Application)
- **`assets/css/main.css`**: Master stylesheet linked on every page. Automatically orchestrates design tokens, typography, navbar, buttons, forms, cards, toasts, and responsiveness.
- **`assets/js/core/constants.js`**: Universal application constants, storage keys, and status enums.
- **`assets/js/core/utils.js`**: Formatting (`formatPrice`), Web Audio API chimes (`playChime`), unique ID generators, and dynamic relative path resolvers (`assetUrl`, `pageUrl`).
- **`assets/js/core/dom.js`**: Reusable DOM selector shortcuts (`$`, `$$`), element creator, and toast notification engine (`BiteBuddy.DOM.toast`).
- **`assets/js/core/store.js`**: Reactive LocalStorage state manager and event bus (`Store.on`, `Store.emit`).
- **`assets/js/core/app.js`**: Global UI controller for header navigation, live search autocomplete, user profile menu, and live cart count badge.

### Service Files (Data & Business Logic Layer)
- **`assets/js/services/api.service.js`**: Transparent HTTP client. In mock mode, routes data queries to `Store`/`BiteBuddyData`; in production mode, requests the Express/MongoDB Atlas backend.
- **`assets/js/services/auth.service.js`**: User session, role verification, demo accounts, and logout.
- **`assets/js/services/food.service.js`**: Dishes catalog filtering by cuisine, category, or vegetarian status.
- **`assets/js/services/restaurant.service.js`**: Partner restaurant queries and rating filters.
- **`assets/js/services/order.service.js`**: Order creation, status updates, history retrieval, and reordering.

### Page-Specific Feature Controllers
- **`assets/js/features/home/home.js`**: Homepage interactions (featured dish additions, restaurant detail routing).
- **`assets/js/features/food/menu.js`**: Menu filtering by category tabs, keyword search, and vegetarian toggle.
- **`assets/js/features/food/food-details.js`**: URL query parser (`?id=...`), nutritional table calculations, quantity counter (+/-).
- **`assets/js/features/restaurants/restaurants.js`**: Restaurant directory filter sidebar and card rendering.
- **`assets/js/features/restaurants/restaurant-details.js`**: Restaurant hero banner, cuisine metadata, and menu item cards.
- **`assets/js/features/cart/cart.js`**: Dynamic cart item rendering, quantity increment/decrement, coupon discounts, order summary.
- **`assets/js/features/checkout/checkout.js`**: Pre-fills user delivery details, payment method selection, order placement into Store.
- **`assets/js/features/orders/order-confirmation.js`**: Order receipt rendering and animated live tracking status stepper.
- **`assets/js/features/orders/orders.js`**: Order history feed with status filter tabs and one-click reordering.
- **`assets/js/features/auth/auth.js`**: Login with 1-click demo buttons, input validation for registration, profile updating.
- **`assets/js/features/dashboards/dashboard.js`**: Admin & Restaurant metric counters, live order status updates, menu stock toggles.

---

## 3. Where to Add New Files

| What You Want to Add | Recommended Destination | How to Integrate |
|---|---|---|
| **New Customer Page** | `pages/my-new-page.html` | Link `<link rel="stylesheet" href="../assets/css/main.css">` and defer core scripts. Update `vercel.json` rewrite. |
| **New Admin View** | `dashboards/admin/new-view.html` | Link `../../assets/css/main.css` and `dashboards/admin.css`. |
| **New Restaurant View** | `dashboards/restaurant/new-view.html` | Link `../../assets/css/main.css` and `dashboards/restaurant.css`. |
| **New Reusable Component CSS** | `assets/css/components/new-component.css` | Add `@import url("components/new-component.css");` in `main.css`. |
| **New Page Layout CSS** | `assets/css/pages/new-page.css` | Import in `main.css` or link directly from the page `<head>`. |
| **New Service (e.g. Rider / Delivery)** | `assets/js/services/delivery.service.js` | Expose to `BiteBuddy.DeliveryService` and decouple from UI code. |
| **New Feature Controller** | `assets/js/features/<feature>/<name>.js` | Load after core scripts using `<script defer>`. |
| **New Food/Restaurant Image** | `assets/images/food/` or `restaurants/` | Use lowercase kebab-case JPG or PNG. Reference with `BiteBuddy.Utils.assetUrl()`. |

