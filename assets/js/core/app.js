/**
 * APP.JS — Global DOM Interactivity for BiteBuddy
 * Controls Header Cart Badge, Toast Engine, User Auth Menu, and Search Autocomplete
 */

(function () {
    // Global BiteBuddy Namespace
    window.BiteBuddy = window.BiteBuddy || {};

    // Currency Formatter
    BiteBuddy.formatPrice = function (amount) {
        return "₹" + Number(amount || 0).toLocaleString("en-IN");
    };

    // Gentle Audio Chime using Web Audio API (no external sound file required!)
    BiteBuddy.playChime = function (type = "success") {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === "success") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === "error") {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(300, ctx.currentTime);
                osc.frequency.setValueAtTime(220, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.25);
            }
        } catch (e) {
            // AudioContext might be blocked until user gesture, safely ignore
        }
    };

    // --- Toast Notification Engine ---
    BiteBuddy.toast = function (title, message = "", type = "success", duration = 3500) {
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            document.body.appendChild(container);
        }

        const icons = {
            success: "✓",
            danger: "✕",
            warning: "⚠",
            info: "ℹ"
        };

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || "✓"}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ""}
            </div>
            <button class="toast-close" aria-label="Close">&times;</button>
        `;

        toast.querySelector(".toast-close").addEventListener("click", () => {
            removeToast(toast);
        });

        container.appendChild(toast);
        BiteBuddy.playChime(type === "danger" ? "error" : "success");

        const timeout = setTimeout(() => {
            removeToast(toast);
        }, duration);

        function removeToast(el) {
            clearTimeout(timeout);
            el.classList.add("hiding");
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 250);
        }
    };

    // --- Added-to-Cart Modal / Popup Engine ---
    BiteBuddy.showCartPopup = function (item, quantity = 1) {
        if (!item) return;
        let container = document.getElementById("cart-popup-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "cart-popup-container";
            container.className = "cart-popup-container";
            document.body.appendChild(container);
        }

        const qty = Math.max(1, parseInt(quantity, 10) || 1);
        const totalCount = window.Store ? window.Store.getCartCount() : qty;
        const subtotal = window.Store ? window.Store.getCartSubtotal() : ((item.price || 0) * qty);
        
        let itemImg = item.image || "assets/images/food/classic-burger.jpg";
        if (window.BiteBuddy && window.BiteBuddy.Utils && typeof window.BiteBuddy.Utils.assetUrl === "function") {
            itemImg = window.BiteBuddy.Utils.assetUrl(itemImg);
        }
        
        let cartUrl = "cart.html";
        if (window.BiteBuddy && window.BiteBuddy.Utils && typeof window.BiteBuddy.Utils.pageUrl === "function") {
            cartUrl = window.BiteBuddy.Utils.pageUrl("cart.html");
        }

        const popup = document.createElement("div");
        popup.className = "cart-popup-card";
        popup.setAttribute("role", "alert");
        popup.setAttribute("aria-live", "assertive");

        const itemName = escapeHtml(item.name || "Delicious Food Item");
        const priceFormatted = BiteBuddy.formatPrice((item.price || 0) * qty);
        const subtotalFormatted = BiteBuddy.formatPrice(subtotal);

        popup.innerHTML = `
            <div class="cart-popup-header">
                <div class="header-label">
                    <span class="check-badge">✓</span>
                    <span>Added to Cart Successfully!</span>
                </div>
                <button type="button" class="cart-popup-close" aria-label="Close notification">&times;</button>
            </div>
            <div class="cart-popup-body">
                <img src="${itemImg}" alt="${itemName}" class="cart-popup-img" onerror="this.src='${window.BiteBuddy?.Utils?.assetUrl ? window.BiteBuddy.Utils.assetUrl('assets/images/food/classic-burger.jpg') : 'images/food/classic-burger.jpg'}'">
                <div class="cart-popup-info">
                    <div class="cart-popup-title">${itemName}</div>
                    <div class="cart-popup-details">
                        <span>Qty: <strong>${qty}</strong></span>
                        <span>•</span>
                        <span class="cart-popup-price">${priceFormatted}</span>
                    </div>
                </div>
            </div>
            <div class="cart-popup-actions">
                <div class="cart-popup-summary">
                    Cart: <strong>${totalCount} ${totalCount === 1 ? 'item' : 'items'}</strong> (${subtotalFormatted})
                </div>
                <a href="${cartUrl}" class="cart-popup-btn">
                    <span>View Cart & Checkout</span>
                    <span>&rarr;</span>
                </a>
            </div>
        `;

        popup.querySelector(".cart-popup-close").addEventListener("click", () => {
            removePopup(popup);
        });

        // Limit maximum simultaneous popups in container to 3 to prevent clutter
        while (container.children.length >= 3) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(popup);
        BiteBuddy.playChime("success");

        const timeoutId = setTimeout(() => {
            removePopup(popup);
        }, 4000);

        function removePopup(el) {
            clearTimeout(timeoutId);
            el.classList.add("hiding");
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 260);
        }
    };

    // --- Dynamic Nav Cart Badge ---
    function updateNavCartBadge() {
        const count = window.Store ? window.Store.getCartCount() : 0;
        const cartLinks = document.querySelectorAll('a[href*="cart.html"], nav a[href$="cart.html"]');

        cartLinks.forEach(link => {
            let badge = link.querySelector(".cart-badge");
            if (!badge) {
                badge = document.createElement("span");
                badge.className = "cart-badge";
                link.appendChild(badge);
            }

            badge.textContent = count;
            badge.style.display = count > 0 ? "inline-flex" : "none";

            // Add bump animation on update
            badge.classList.remove("bump");
            void badge.offsetWidth; // trigger reflow
            badge.classList.add("bump");
            setTimeout(() => badge.classList.remove("bump"), 300);
        });
    }

    // --- User Auth & Header State ---
    function updateHeaderAuth() {
        const navActions = document.querySelector(".nav-actions");
        if (!navActions) return;

        // Auto-login default user for demo seamless experience if not set
        if (!localStorage.getItem("bitebuddy_is_logged_in")) {
            localStorage.setItem("bitebuddy_is_logged_in", "true");
        }

        const isLoggedIn = window.Store ? window.Store.isLoggedIn() : true;
        const user = window.Store ? window.Store.getUser() : null;

        if (isLoggedIn && user) {
            navActions.innerHTML = `
                <div class="user-nav-dropdown">
                    <button class="user-nav-btn" id="userMenuBtn" type="button">
                        <img src="${BiteBuddy.Utils.assetUrl(user.avatar || 'assets/images/avatars/user-01.jpg')}" alt="${user.name}" class="user-nav-avatar" onerror="this.src='${BiteBuddy.Utils.assetUrl('assets/images/avatars/user-01.jpg')}'">
                        <span>${user.name.split(' ')[0]}</span>
                        <span style="font-size: 0.75rem;">▼</span>
                    </button>
                    <div class="user-menu-dropdown" id="userDropdown">
                        <a href="${BiteBuddy.Utils.pageUrl('profile.html')}">👤 My Profile</a>
                        <a href="${BiteBuddy.Utils.pageUrl('my-orders.html')}">📦 My Orders</a>
                        <a href="${BiteBuddy.Utils.pageUrl('dashboards/restaurant/index.html')}">🏪 Restaurant Panel</a>
                        <a href="${BiteBuddy.Utils.pageUrl('dashboards/admin/index.html')}">⚙️ Admin Panel</a>
                        <div style="border-top: 1px solid var(--border); margin: 4px 0;"></div>
                        <button type="button" id="logoutBtn" style="color: var(--danger);">🚪 Logout</button>
                    </div>
                </div>
            `;

            const menuBtn = document.getElementById("userMenuBtn");
            const dropdown = document.getElementById("userDropdown");
            const logoutBtn = document.getElementById("logoutBtn");

            if (menuBtn && dropdown) {
                menuBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle("show");
                });

                document.addEventListener("click", (e) => {
                    if (!dropdown.contains(e.target) && e.target !== menuBtn) {
                        dropdown.classList.remove("show");
                    }
                });
            }

            if (logoutBtn) {
                logoutBtn.addEventListener("click", () => {
                    window.Store.logout();
                    BiteBuddy.toast("Logged Out", "You have been logged out successfully.", "info");
                    setTimeout(() => window.location.href = BiteBuddy.Utils.pageUrl("login.html"), 800);
                });
            }
        }
    }

    // --- Search Autocomplete Component ---
    function initLiveSearch() {
        const searchForms = document.querySelectorAll(".hero-search, .search-form, form[action*='restaurants.html']");
        searchForms.forEach(form => {
            const input = form.querySelector("input[type='text']");
            if (!input) return;

            // Wrap in wrapper if not present
            let wrapper = form.closest(".hero-search-wrapper");
            if (!wrapper) {
                wrapper = document.createElement("div");
                wrapper.className = "hero-search-wrapper";
                form.parentNode.insertBefore(wrapper, form);
                wrapper.appendChild(form);
            }

            // Create suggestions dropdown
            let dropdown = wrapper.querySelector(".search-suggestions-dropdown");
            if (!dropdown) {
                dropdown = document.createElement("div");
                dropdown.className = "search-suggestions-dropdown";
                wrapper.appendChild(dropdown);
            }

            input.setAttribute("autocomplete", "off");

            input.addEventListener("input", (e) => {
                const query = e.target.value.trim().toLowerCase();
                if (query.length < 2) {
                    dropdown.innerHTML = "";
                    dropdown.classList.remove("show");
                    return;
                }

                const foods = (window.Store ? window.Store.getFoodItems() : [])
                    .filter(f => f.name.toLowerCase().includes(query) || f.category.toLowerCase().includes(query) || f.cuisine.toLowerCase().includes(query))
                    .slice(0, 4);

                const restaurants = (window.Store ? window.Store.getRestaurants() : [])
                    .filter(r => r.name.toLowerCase().includes(query) || r.cuisines.some(c => c.toLowerCase().includes(query)))
                    .slice(0, 3);

                if (foods.length === 0 && restaurants.length === 0) {
                    dropdown.innerHTML = `
                        <div style="padding: 16px; text-align: center; color: var(--muted); font-size: 0.875rem;">
                            No matching dishes or restaurants for "<strong>${escapeHtml(query)}</strong>"
                        </div>
                    `;
                    dropdown.classList.add("show");
                    return;
                }

                let html = "";
                if (restaurants.length > 0) {
                    html += `<div style="padding: 8px 16px; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--muted); background: var(--background);">Restaurants</div>`;
                    restaurants.forEach(r => {
                        html += `
                            <a href="${BiteBuddy.Utils.pageUrl('restaurant-details.html')}?id=${r.id}" class="suggestion-item">
                                <img src="${BiteBuddy.Utils.assetUrl(r.image)}" class="suggestion-img" alt="${r.name}" onerror="this.src='images/restaurants/spice-route.jpg'">
                                <div class="suggestion-info">
                                    <div class="suggestion-title">${highlight(r.name, query)}</div>
                                    <div class="suggestion-sub">${r.cuisines.join(", ")} • ★ ${r.rating}</div>
                                </div>
                            </a>
                        `;
                    });
                }

                if (foods.length > 0) {
                    html += `<div style="padding: 8px 16px; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--muted); background: var(--background);">Food Items</div>`;
                    foods.forEach(f => {
                        html += `
                            <a href="${BiteBuddy.Utils.pageUrl('food-details.html')}?id=${f.id}" class="suggestion-item">
                                <img src="${BiteBuddy.Utils.assetUrl(f.image)}" class="suggestion-img" alt="${f.name}" onerror="this.src='images/food/classic-burger.jpg'">
                                <div class="suggestion-info">
                                    <div class="suggestion-title">${highlight(f.name, query)}</div>
                                    <div class="suggestion-sub">${f.restaurantName} • ${f.category}</div>
                                </div>
                                <div class="suggestion-price">₹${f.price}</div>
                            </a>
                        `;
                    });
                }

                dropdown.innerHTML = html;
                dropdown.classList.add("show");
            });

            document.addEventListener("click", (e) => {
                if (!wrapper.contains(e.target)) {
                    dropdown.classList.remove("show");
                }
            });

            form.addEventListener("submit", (e) => {
                const val = input.value.trim();
                if (val) {
                    window.location.href = `restaurants.html?search=${encodeURIComponent(val)}`;
                    e.preventDefault();
                }
            });
        });
    }

    function highlight(text, query) {
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, `<mark style="background: var(--primary-light); color: var(--primary); font-weight: 700; padding: 0 2px;">$1</mark>`);
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    // --- Active Link Highlighting ---
    function highlightActiveNav() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".nav-links a").forEach(link => {
            const href = link.getAttribute("href");
            if (href === path || (path === "" && href === "index.html")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // --- Add to Cart Click Handlers on any page ---
    function attachGlobalAddToCart() {
        document.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn-add-cart, [data-add-cart]");
            if (btn) {
                e.preventDefault();
                const id = btn.getAttribute("data-id") || btn.getAttribute("data-add-cart");
                const food = window.Store ? window.Store.getFoodItem(id) : null;
                if (food) {
                    window.Store.addToCart(food, 1);
                }
            }
        });
    }

    // Initialize all global components when DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
        updateNavCartBadge();
        updateHeaderAuth();
        initLiveSearch();
        highlightActiveNav();
        attachGlobalAddToCart();

        // Listen for store updates
        if (window.Store) {
            window.Store.on("cart:updated", () => {
                updateNavCartBadge();
            });
            window.Store.on("cart:item_added", ({ item, quantity }) => {
                BiteBuddy.showCartPopup(item, quantity);
            });
            window.Store.on("auth:change", () => {
                updateHeaderAuth();
            });
        }
    });

})();
