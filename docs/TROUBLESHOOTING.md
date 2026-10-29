# 🔧 BiteBuddy Troubleshooting & Common Solutions Guide

This guide documents verified solutions for common errors encountered during local development, browser testing, and Vercel deployment.

---

## 1. CSS & Styling Issues

### Issue 1: Stylesheet Not Loading (Unstyled Raw HTML)
- **Symptoms:** Page displays plain black-and-white text without layout, colors, or fonts.
- **Root Cause:** Incorrect relative path to `main.css`. Because HTML files exist in multiple directory depths (`/`, `pages/`, `dashboards/admin/`), path levels must match.
- **Verified Fix:**
  - On root `index.html`: `<link rel="stylesheet" href="assets/css/main.css">`
  - On pages in `pages/*.html`: `<link rel="stylesheet" href="../assets/css/main.css">`
  - On dashboards in `dashboards/admin/*.html`: `<link rel="stylesheet" href="../../assets/css/main.css">`

### Issue 2: Hero Banner Image Missing in CSS
- **Symptoms:** The homepage hero section appears gray or blank instead of displaying the food banner.
- **Root Cause:** Background image path in `assets/css/pages/home.css` resolved improperly.
- **Verified Fix:** Use `background-image: url("../../images/banners/hero-food.jpg");` inside `home.css`, or inspect using browser DevTools.

---

## 2. JavaScript Execution & DOM Issues

### Issue 3: JavaScript Not Executing (`Uncaught TypeError: Cannot read properties of null`)
- **Symptoms:** Buttons do nothing when clicked; browser console throws null element errors.
- **Root Cause:** Scripts were executed before the DOM was fully parsed by the browser.
- **Verified Fix:**
  - Always use the `defer` attribute on `<script>` tags in HTML `<head>` or at the end of `<body>`:
    ```html
    <script defer src="../assets/js/core/app.js"></script>
    ```
  - In feature controllers, wrap DOM logic inside:
    ```javascript
    document.addEventListener("DOMContentLoaded", function () { ... });
    ```

### Issue 4: Script Loading Order Errors (`ReferenceError: BiteBuddy is not defined` or `Store is not defined`)
- **Symptoms:** Console reports `ReferenceError: BiteBuddy is not defined`.
- **Root Cause:** Feature script was loaded before the foundational core scripts (`constants.js`, `utils.js`, `store.js`).
- **Verified Fix:** Strictly maintain this loading sequence in HTML:
  1. `assets/js/core/constants.js`
  2. `assets/js/core/utils.js`
  3. `assets/js/core/dom.js`
  4. `assets/js/core/data.js`
  5. `assets/js/core/store.js`
  6. `assets/js/services/api.service.js`
  7. `assets/js/services/auth.service.js`
  8. `assets/js/core/app.js`
  9. *Page-specific feature script (e.g. `cart.js`, `checkout.js`)*

---

## 3. Cart & Data Persistence Issues

### Issue 5: Cart Not Updating When Adding Items
- **Symptoms:** Clicking "Add to Cart" displays toast, but Cart page remains empty or badge stays at 0.
- **Root Cause:** Stale or corrupted data in `localStorage`.
- **Verified Fix:**
  1. Open DevTools (`F12`) → **Console**.
  2. Run:
     ```javascript
     localStorage.clear();
     location.reload();
     ```
  3. Re-add items to test reactive updates.

### Issue 6: Images Not Appearing on Dynamic Items (Cart / Menu / Orders)
- **Symptoms:** Dynamically rendered food cards show broken image icons.
- **Root Cause:** Using hardcoded relative paths like `"images/food/..."` instead of resolving relative to current page depth.
- **Verified Fix:** Always pass image paths through the built-in path resolver:
  ```javascript
  const resolvedUrl = BiteBuddy.Utils.assetUrl(item.image);
  ```

---

## 4. Form Submission & Checkout Issues

### Issue 7: Form Submissions Refreshing the Page Immediately
- **Symptoms:** Clicking "Submit" or "Place Order" flashes the page without saving state.
- **Root Cause:** Default browser HTML form submit action was not prevented.
- **Verified Fix:** Add `e.preventDefault()` as the very first line inside the submit event listener:
  ```javascript
  form.addEventListener("submit", function (e) {
      e.preventDefault();
      // ... validation and processing
  });
  ```

---

## 5. Git & Version Control Issues

### Issue 8: Git Merge Conflicts in `main`
- **Symptoms:** Git halts a pull or merge reporting `CONFLICT (content): Merge conflict in ...`.
- **Root Cause:** Two teammates edited the same lines in the same file.
- **Verified Fix:**
  1. Open the conflicted file in VS Code.
  2. Use VS Code's conflict buttons: **Accept Current Change**, **Accept Incoming Change**, or **Accept Both**.
  3. Run `python tests/verify_links.py` and `python tests/check_syntax.py` to ensure the resolution didn't break HTML or JS syntax.
  4. Stage and commit:
     ```bash
     git add <file>
     git commit -m "fix(merge): resolve conflict in <file>"
     ```

---

## 6. Vercel Deployment Issues

### Issue 9: 404 Not Found on Vercel for `/cart` or `/cart.html`
- **Symptoms:** Site works on local server, but navigating directly to `/cart` on Vercel returns `404: NOT_FOUND`.
- **Root Cause:** Customer HTML files were organized into `pages/`, but Vercel requires URL rewrite rules to map clean URLs to nested folder paths.
- **Verified Fix:** Inspect `vercel.json` in repository root. Ensure rewrite exists:
  ```json
  {
    "rewrites": [
      { "source": "/cart", "destination": "/pages/cart.html" },
      { "source": "/:page.html", "destination": "/pages/:page.html" }
    ]
  }
  ```

