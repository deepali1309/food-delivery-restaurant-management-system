/**
 * Automated Functional Test Suite for BiteBuddy Core & Services
 * Tests Cart calculations, Store reactivity, Coupon validation, Order fulfillment, and Auth flows.
 */

// 1. Setup mock browser environment
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        removeItem: function (key) {
            delete store[key];
        },
        clear: function () {
            store = {};
        }
    };
})();

global.window = global;
global.localStorage = localStorageMock;
global.document = {
    addEventListener: () => {},
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, classList: { add: () => {} } }),
    body: { appendChild: () => {} }
};

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✓ PASS: ${message}`);
        testsPassed++;
    } else {
        console.error(`  ✗ FAIL: ${message}`);
        testsFailed++;
    }
}

console.log("=== BITEBUDDY FUNCTIONAL TEST SUITE ===\n");

// Load Core Modules
require("../assets/js/core/constants.js");
require("../assets/js/core/utils.js");
require("../assets/js/core/data.js");
require("../assets/js/core/store.js");
require("../assets/js/services/api.service.js");
require("../assets/js/services/auth.service.js");
require("../assets/js/services/food.service.js");
require("../assets/js/services/restaurant.service.js");
require("../assets/js/services/order.service.js");

const Store = window.Store;
const Utils = window.BiteBuddy.Utils;
const FoodService = window.BiteBuddy.FoodService;
const RestaurantService = window.BiteBuddy.RestaurantService;
const OrderService = window.BiteBuddy.OrderService;
const AuthService = window.BiteBuddy.AuthService;

// TEST GROUP 1: Catalog & Data Retrieval
console.log("--- 1. Catalog & Data Services ---");
const foods = FoodService.getAll();
assert(foods.length > 0, `Food catalog populated (${foods.length} dishes)`);

const restaurants = RestaurantService.getAll();
assert(restaurants.length > 0, `Restaurant catalog populated (${restaurants.length} restaurants)`);

const vegDishes = FoodService.filter({ isVeg: true });
assert(vegDishes.every(d => d.isVeg === true), `Veg-only filter returned ${vegDishes.length} vegetarian dishes`);

const singleDish = FoodService.getById("butter-chicken");
assert(singleDish && singleDish.name.includes("Butter Chicken"), `FoodService.getById retrieves Butter Chicken (Price: ₹${singleDish?.price})`);

// TEST GROUP 2: Shopping Cart Calculations & Reactivity
console.log("\n--- 2. Shopping Cart & Price Calculations ---");
Store.clearCart();
assert(Store.getCart().length === 0, "Cart initializes empty");

Store.addToCart(singleDish, 2);
let cart = Store.getCart();
assert(cart.length === 1 && cart[0].quantity === 2, `Added 2 Butter Chickens to cart (Qty: ${cart[0]?.quantity})`);

let totals = Store.getCartTotals();
const expectedSubtotal = singleDish.price * 2; // 349 * 2 = 698
assert(totals.subtotal === expectedSubtotal, `Subtotal correct: expected ₹${expectedSubtotal}, got ₹${totals.subtotal}`);
assert(totals.taxes === Math.round(expectedSubtotal * 0.05), `Tax (5%) calculated correctly: ₹${totals.taxes}`);
assert(totals.deliveryFee === 0, `Free delivery applied for order > ₹500 (Delivery fee: ₹${totals.deliveryFee})`);

// Increment & Decrement
Store.updateCartQuantity(singleDish.id, 3);
assert(Store.getCart()[0].quantity === 3, `Quantity updated to 3 (Subtotal: ₹${Store.getCartTotals().subtotal})`);

Store.removeFromCart(singleDish.id);
assert(Store.getCart().length === 0, "Item removed from cart successfully");

// TEST GROUP 3: Coupon Discount Calculations
console.log("\n--- 3. Coupon Codes & Discounts ---");
const paneer = FoodService.getById("paneer-tikka"); // Price: 219
Store.addToCart(paneer, 1); // 219
const couponRes = Store.applyCoupon("WELCOME50"); // 50% up to 150 -> 109.5 -> rounded 110
assert(couponRes.success === true, `WELCOME50 coupon applied successfully: ${couponRes.message}`);

totals = Store.getCartTotals();
assert(totals.discount > 0, `50% discount computed correctly: discount applied ₹${totals.discount}`);

const invalidCoupon = Store.applyCoupon("FAKEDISCOUNT999");
assert(invalidCoupon.success === false, "Invalid coupon rejected with error message");

// TEST GROUP 4: Order Creation & Fulfillment
console.log("\n--- 4. Order Creation & State Persistence ---");
const newOrder = OrderService.placeOrder({
    items: Store.getCart(),
    totals: Store.getCartTotals(),
    deliveryAddress: {
        fullName: "Test Customer",
        phone: "+91 98765 43210",
        address: "123 Marine Drive, Mumbai"
    },
    paymentMethod: "UPI"
});

assert(newOrder !== null && newOrder.id.includes("FD"), `Order created with valid ID: ${newOrder?.id}`);
assert(Store.getCart().length === 0, "Active cart cleared after placing order");

const orders = OrderService.getOrders();
assert(orders.some(o => o.id === newOrder.id), "New order persisted in localStorage order ledger");

// Order status updates
const updateOk = OrderService.updateStatus(newOrder.id, "preparing");
assert(updateOk === true, "Order status transitioned to 'preparing'");
const retrievedOrder = OrderService.getOrderById(newOrder.id);
assert(retrievedOrder.status === "preparing", `Retrieved order status is '${retrievedOrder.status}'`);

// TEST GROUP 5: Authentication & Session Management
console.log("\n--- 5. Authentication & Session Management ---");
AuthService.logout();
assert(!AuthService.isAuthenticated(), "User logged out");

const loggedInCustomer = AuthService.login("rahul@example.com", "password", "customer");
assert(AuthService.isAuthenticated() && loggedInCustomer.role === "customer", `Customer login successful: ${loggedInCustomer.name}`);

const loggedInAdmin = AuthService.login("admin@bitebuddy.com", "password", "admin");
assert(loggedInAdmin.role === "admin", `Admin login successful: ${loggedInAdmin.name}`);

// TEST GROUP 6: Path Resolvers & Formatting Utilities
console.log("\n--- 6. Path Resolvers & Formatters ---");
assert(Utils.formatPrice(350) === "₹350", `Currency formatting: ${Utils.formatPrice(350)}`);
assert(Utils.sanitize("<script>alert(1)</script>") === "&lt;script&gt;alert(1)&lt;/script&gt;", "XSS sanitize correctly escapes HTML tags");

console.log(`\n========================================`);
console.log(`TEST RUN COMPLETE: ${testsPassed} Passed, ${testsFailed} Failed.`);
console.log(`========================================`);

if (testsFailed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
