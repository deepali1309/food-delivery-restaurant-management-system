/**
 * ORDER.SERVICE.JS — Customer Orders & Fulfillment Service
 * Handles order placements, status lookups, history retrievals, and one-click reordering.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    const OrderService = {
        getOrders() {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.getOrders() : [];
        },

        getOrderById(orderId) {
            const Store = window.Store || BiteBuddy.Store;
            return Store ? Store.getOrder(orderId) : null;
        },

        placeOrder(orderPayload) {
            const Store = window.Store || BiteBuddy.Store;
            if (!Store) return null;
            return Store.createOrder(orderPayload);
        },

        updateStatus(orderId, newStatus) {
            const Store = window.Store || BiteBuddy.Store;
            if (!Store) return false;
            return !!Store.updateOrderStatus(orderId, newStatus);
        },

        reorder(orderId) {
            const Store = window.Store || BiteBuddy.Store;
            const order = this.getOrderById(orderId);
            if (!order || !order.items || !Store) return false;
            
            // Add each item to cart
            order.items.forEach(item => {
                Store.addToCart(item, item.quantity || 1);
            });
            return true;
        }
    };

    BiteBuddy.OrderService = OrderService;
})();
