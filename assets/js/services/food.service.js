/**
 * FOOD.SERVICE.JS — Food Catalog & Menu Data Service
 * Provides dishes querying, filtering by dietary requirements, and search capabilities.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    const FoodService = {
        getAll() {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.getFoodItems() : [];
        },

        getById(id) {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.getFoodItem(id) : null;
        },

        filter({ category = "all", isVeg = false, query = "" } = {}) {
            let items = this.getAll();
            if (category && category !== "all") {
                items = items.filter(dish => dish.category?.toLowerCase() === category.toLowerCase());
            }
            if (isVeg) {
                items = items.filter(dish => dish.isVeg === true);
            }
            if (query && query.trim()) {
                const q = query.toLowerCase().trim();
                items = items.filter(dish =>
                    dish.name.toLowerCase().includes(q) ||
                    (dish.description && dish.description.toLowerCase().includes(q)) ||
                    (dish.ingredients && dish.ingredients.some(ing => ing.toLowerCase().includes(q)))
                );
            }
            return items;
        }
    };

    BiteBuddy.FoodService = FoodService;
})();
