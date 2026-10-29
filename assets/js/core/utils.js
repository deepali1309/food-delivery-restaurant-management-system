/**
 * UTILS.JS — Shared Helper Utilities for BiteBuddy
 * Formatting, audio chimes, sanitization, debounce, and unique ID generators.
 */
(function () {
    window.BiteBuddy = window.BiteBuddy || {};

    BiteBuddy.Utils = {
        /**
         * Resolves asset paths (images, etc.) relative to current page location
         */
        assetUrl(path) {
            if (!path) return "";
            if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;
            const clean = path.replace(/^(\.\.\/)+/, "").replace(/^(assets\/)?images\//, "assets/images/");
            const pathname = window.location.pathname.replace(/\\/g, "/");
            let prefix = "";
            if (pathname.includes("/dashboards/")) {
                prefix = "../../";
            } else if (pathname.includes("/pages/")) {
                prefix = "../";
            }
            return prefix + clean;
        },

        /**
         * Resolves page navigation paths relative to current page location
         */
        pageUrl(page) {
            if (!page) return "";
            if (page.startsWith("http://") || page.startsWith("https://") || page.startsWith("#") || page.startsWith("mailto:") || page.startsWith("tel:")) return page;
            const pathname = window.location.pathname.replace(/\\/g, "/");
            const isDashboard = pathname.includes("/dashboards/");
            const isPages = pathname.includes("/pages/");
            const isRoot = !isDashboard && !isPages;

            // Target is root index
            if (page === "index.html" || page === "/") {
                if (isDashboard) return "../../index.html";
                if (isPages) return "../index.html";
                return "index.html";
            }

            // Target is dashboard
            if (page.startsWith("dashboards/")) {
                if (isDashboard) return "../" + page.replace("dashboards/", "");
                if (isPages) return "../" + page;
                return page;
            }

            // Target is a customer page
            const cleanPage = page.replace(/^pages\//, "");
            if (isRoot) return "pages/" + cleanPage;
            if (isDashboard) return "../../pages/" + cleanPage;
            return cleanPage;
        },

        /**
         * Formats numeric amounts into INR currency (e.g. ₹350)
         */
        formatPrice(amount) {
            const num = Number(amount) || 0;
            return (BiteBuddy.Constants?.CONFIG?.CURRENCY_SYMBOL || "₹") + num.toLocaleString("en-IN");
        },

        /**
         * Generates a realistic unique order or item ID
         */
        generateId(prefix = "FD") {
            const rand = Math.floor(10000 + Math.random() * 90000);
            return `#${prefix}${rand}`;
        },

        /**
         * Formats a date string or timestamp into a readable date
         */
        formatDate(dateVal) {
            if (!dateVal) return "Recently";
            const d = new Date(dateVal);
            return d.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            });
        },

        /**
         * Escapes HTML strings to prevent XSS injection
         */
        sanitize(str) {
            if (typeof str !== "string") return str;
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },

        /**
         * Debounce function for smooth search input handling
         */
        debounce(fn, delay = 300) {
            let timer;
            return function (...args) {
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(this, args), delay);
            };
        },

        /**
         * Gentle Audio Chime using Web Audio API (no external sound file required!)
         */
        playChime(type = "success") {
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) return;
                const ctx = new AudioContextClass();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                if (type === "success") {
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
                    gain.gain.setValueAtTime(0.12, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.35);
                } else if (type === "click") {
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(440, ctx.currentTime);
                    gain.gain.setValueAtTime(0.06, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.08);
                } else if (type === "error") {
                    osc.type = "sawtooth";
                    osc.frequency.setValueAtTime(220, ctx.currentTime);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.25);
                }
            } catch (e) {
                // Audio autoplay policy catch
            }
        }
    };

    // Backward compatibility aliases
    BiteBuddy.formatPrice = BiteBuddy.Utils.formatPrice;
    BiteBuddy.playChime = BiteBuddy.Utils.playChime;
})();
