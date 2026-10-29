/**
 * API.SERVICE.JS — HTTP API Client & Backend Abstraction Layer
 * Handles future MongoDB Atlas / Express REST API requests with transparent fallback to Store / mock data.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    const ApiService = {
        baseUrl: (BiteBuddy.Constants?.CONFIG?.API_BASE_URL) || "http://localhost:3000/api",
        isMockMode: true, // Set to false when backend API server is running

        /**
         * Generic GET request with fallback to local store/catalog
         */
        async get(endpoint) {
            if (this.isMockMode) {
                return this.handleMockGet(endpoint);
            }
            try {
                const res = await fetch(`${this.baseUrl}${endpoint}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                return await res.json();
            } catch (err) {
                console.warn(`[ApiService] API request failed for ${endpoint}. Falling back to mock data.`, err);
                return this.handleMockGet(endpoint);
            }
        },

        /**
         * Generic POST request
         */
        async post(endpoint, data) {
            if (this.isMockMode) {
                return this.handleMockPost(endpoint, data);
            }
            try {
                const res = await fetch(`${this.baseUrl}${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                return await res.json();
            } catch (err) {
                console.warn(`[ApiService] POST failed for ${endpoint}. Falling back to local store.`, err);
                return this.handleMockPost(endpoint, data);
            }
        },

        handleMockGet(endpoint) {
            const Store = window.Store || BiteBuddy.Store;
            if (endpoint.startsWith("/restaurants")) {
                return Store ? Store.getRestaurants() : [];
            }
            if (endpoint.startsWith("/food")) {
                return Store ? Store.getFoodItems() : [];
            }
            if (endpoint.startsWith("/orders")) {
                return Store ? Store.getOrders() : [];
            }
            if (endpoint.startsWith("/user")) {
                return Store ? Store.getUser() : null;
            }
            return null;
        },

        handleMockPost(endpoint, data) {
            const Store = window.Store || BiteBuddy.Store;
            if (endpoint.startsWith("/orders") && Store) {
                return Store.createOrder(data);
            }
            return { success: true, data };
        }
    };

    BiteBuddy.ApiService = ApiService;
})();
