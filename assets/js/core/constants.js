/**
 * CONSTANTS.JS — Global Application Constants & Configuration
 * Provides unified tokens, storage keys, statuses, and demo accounts.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    BiteBuddy.Constants = {
        STORAGE_KEYS: {
            CART: "bitebuddy_cart",
            ORDERS: "bitebuddy_orders",
            USER: "bitebuddy_user",
            FOOD_ITEMS: "bitebuddy_food_items",
            RESTAURANTS: "bitebuddy_restaurants",
            APPLIED_COUPON: "bitebuddy_applied_coupon"
        },

        ORDER_STATUSES: {
            PLACED: "placed",
            PREPARING: "preparing",
            OUT_FOR_DELIVERY: "out_for_delivery",
            DELIVERED: "delivered",
            CANCELLED: "cancelled"
        },

        CONFIG: {
            CURRENCY_SYMBOL: "₹",
            TAX_RATE: 0.05,
            DELIVERY_FEE: 40,
            PLATFORM_FEE: 10,
            API_BASE_URL: (window.ENV && window.ENV.API_BASE_URL) || "http://localhost:3000/api"
        },

        DEMO_USERS: {
            CUSTOMER: {
                name: "Rahul Sharma",
                email: "rahul@example.com",
                phone: "+91 98765 43210",
                role: "customer",
                address: "Flat 402, Sunshine Heights, Andheri West",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400058",
                avatar: "assets/images/avatars/user-01.jpg"
            },
            RESTAURANT: {
                name: "Chef Vikram (Spice Route)",
                email: "spiceroute@bitebuddy.com",
                phone: "+91 98200 11223",
                role: "restaurant",
                restaurantId: "spice-route",
                avatar: "assets/images/avatars/chef-vikram.jpg"
            },
            ADMIN: {
                name: "Deepali Gupta (Platform Admin)",
                email: "admin@bitebuddy.com",
                phone: "+91 99999 88888",
                role: "admin",
                avatar: "assets/images/avatars/admin-avatar.jpg"
            }
        }
    };
})();
