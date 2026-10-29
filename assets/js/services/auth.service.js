/**
 * AUTH.SERVICE.JS — User Authentication & Session Service
 * Manages user logins, demo accounts, role assignment, and profile data.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    const AuthService = {
        /**
         * Current logged in user
         */
        getCurrentUser() {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.getUser() : null;
        },

        /**
         * Check if a session exists
         */
        isAuthenticated() {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.isLoggedIn() : false;
        },

        /**
         * Login with credentials or demo user
         */
        login(email, password, role = "customer") {
            const Store = window.Store || BiteBuddy.Store;
            const demoUsers = BiteBuddy.Constants?.DEMO_USERS || {};
            
            // Match against demo profiles
            let targetUser = null;
            if (role === "admin" || email.includes("admin")) {
                targetUser = demoUsers.ADMIN;
            } else if (role === "restaurant" || email.includes("spice") || email.includes("chef")) {
                targetUser = demoUsers.RESTAURANT;
            } else {
                targetUser = { ...demoUsers.CUSTOMER, email: email || demoUsers.CUSTOMER.email };
            }

            if (Store) {
                Store.login(targetUser, targetUser.role || role);
            }
            return targetUser;
        },

        /**
         * Register a new user
         */
        register(userData) {
            const Store = window.Store || BiteBuddy.Store;
            const newUser = {
                name: userData.name || "Foodie User",
                email: userData.email,
                phone: userData.phone || "+91 98765 00000",
                role: userData.role || "customer",
                address: userData.address || "Mumbai, Maharashtra",
                avatar: "assets/images/avatars/user-01.jpg"
            };
            if (Store) {
                Store.login(newUser, newUser.role);
            }
            return newUser;
        },

        /**
         * Logout and clear session
         */
        logout() {
            const Store = window.Store || BiteBuddy.Store;
            if (Store) {
                Store.logout();
            }
        }
    };

    BiteBuddy.AuthService = AuthService;
})();
