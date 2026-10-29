/**
 * DOM.JS — Reusable DOM Manipulation Helpers & UI Feedback Components
 * Provides clean element queries, creation, event delegation, toasts, and empty states.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    BiteBuddy.DOM = {
        /**
         * Query single element
         */
        $(selector, parent = document) {
            return parent.querySelector(selector);
        },

        /**
         * Query all matching elements as an Array
         */
        $$(selector, parent = document) {
            return Array.from(parent.querySelectorAll(selector));
        },

        /**
         * Create element with attributes, class names, and content
         */
        create(tag, { className = "", attrs = {}, html = "", text = "" } = {}) {
            const el = document.createElement(tag);
            if (className) el.className = className;
            for (const [key, val] of Object.entries(attrs)) {
                el.setAttribute(key, val);
            }
            if (text) el.textContent = text;
            if (html) el.innerHTML = html;
            return el;
        },

        /**
         * Event delegation helper
         */
        on(parent, eventType, childSelector, handler) {
            parent.addEventListener(eventType, function (e) {
                const target = e.target.closest(childSelector);
                if (target && parent.contains(target)) {
                    handler.call(target, e, target);
                }
            });
        },

        /**
         * Displays a non-blocking toast message
         */
        toast(message, type = "success", duration = 3000) {
            let container = document.getElementById("bitebuddy-toast-container");
            if (!container) {
                container = document.createElement("div");
                container.id = "bitebuddy-toast-container";
                container.className = "toast-container";
                document.body.appendChild(container);
            }

            const toast = document.createElement("div");
            toast.className = `toast toast-${type}`;
            const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
            toast.innerHTML = `
                <span class="toast-icon">${icon}</span>
                <span class="toast-message">${BiteBuddy.Utils ? BiteBuddy.Utils.sanitize(message) : message}</span>
            `;

            container.appendChild(toast);
            if (BiteBuddy.Utils) BiteBuddy.Utils.playChime(type === "error" ? "error" : "success");

            setTimeout(() => {
                toast.classList.add("fade-out");
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        /**
         * Renders an empty state placeholder
         */
        renderEmptyState(container, { icon = "🍽️", title = "Nothing here yet", message = "Browse our menu to explore delicious options.", actionText = "Browse Food", actionLink = "pages/food-menu.html" } = {}) {
            container.innerHTML = `
                <div class="empty-state text-center" style="padding: 48px 20px;">
                    <div style="font-size: 3rem; margin-bottom: 12px;">${icon}</div>
                    <h3 style="margin-bottom: 8px;">${title}</h3>
                    <p style="color: var(--text-light); max-width: 400px; margin: 0 auto 20px auto;">${message}</p>
                    ${actionText && actionLink ? `<a href="${actionLink}" class="btn btn-primary">${actionText}</a>` : ""}
                </div>
            `;
        }
    };

    // Backward compatibility alias
    BiteBuddy.toast = BiteBuddy.DOM.toast;
})();
