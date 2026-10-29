/**
 * RESTAURANT.SERVICE.JS — Restaurant Partners Data Service
 * Provides restaurant discovery, filtering by cuisine, rating, delivery time, and search.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    const RestaurantService = {
        getAll() {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.getRestaurants() : [];
        },

        getById(id) {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.getRestaurant(id) : null;
        },

        filter({ cuisine = "all", minRating = 0, query = "", sortBy = "recommended" } = {}) {
            let list = this.getAll();
            if (cuisine && cuisine !== "all") {
                list = list.filter(r => r.cuisines?.some(c => c.toLowerCase() === cuisine.toLowerCase()));
            }
            if (minRating > 0) {
                list = list.filter(r => (r.rating || 0) >= minRating);
            }
            if (query && query.trim()) {
                const q = query.toLowerCase().trim();
                list = list.filter(r =>
                    r.name.toLowerCase().includes(q) ||
                    (r.cuisines && r.cuisines.some(c => c.toLowerCase().includes(q)))
                );
            }

            // Sorting
            if (sortBy === "rating") {
                list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            } else if (sortBy === "time") {
                list.sort((a, b) => (a.deliveryMinutes || 30) - (b.deliveryMinutes || 30));
            } else if (sortBy === "cost-low") {
                list.sort((a, b) => (a.costForTwo || 0) - (b.costForTwo || 0));
            }
            return list;
        }
    };

    BiteBuddy.RestaurantService = RestaurantService;
})();
