# 🤝 Team Contributor & Git Workflow Guide

Welcome to the team! This document outlines our collaborative Git workflow, naming conventions, and code quality standards to ensure our codebase remains clean, bug-free, and easy for everyone to work on.

---

## 1. Golden Rules for Teammates

1. **Never commit directly to `main`:** Always create a feature branch for your task.
2. **Never commit secrets:** Never commit `.env` files, passwords, database strings, or personal access tokens.
3. **One logical change per branch:** Keep branches focused on a single feature, bug fix, or style enhancement.
4. **Test before committing:** Always execute `python tests/verify_links.py` and `python tests/check_syntax.py` before creating a pull request.
5. **No framework dependencies:** Keep all code in pure HTML5, CSS3, and Vanilla JavaScript.

---

## 2. Standard Feature Branch Workflow

### Step 1: Sync Your Local `main` Branch
Before starting new work, pull the latest changes from GitHub:

```bash
git checkout main
git pull origin main
```

### Step 2: Create a Dedicated Feature Branch
Name your branch following our standard prefix convention:
- `feature/<name>`: New UI page or JavaScript feature (e.g. `feature/dark-mode`)
- `fix/<name>`: Bug fix (e.g. `fix/cart-quantity-bounds`)
- `docs/<name>`: Documentation updates (e.g. `docs/api-guide`)

```bash
git checkout -b feature/user-review-system
```

### Step 3: Implement Your Changes
Make your edits following our code conventions (detailed in Section 3). Test your changes in the browser using Live Server or Python `http.server`.

### Step 4: Run Automated Verification
Run the project test suite in your terminal:

```bash
python tests/verify_links.py
python tests/check_syntax.py
```

### Step 5: Review Your Diff
Check what files were touched:

```bash
git status
git diff
```

### Step 6: Stage and Commit With a Meaningful Message
Write clear, descriptive commit messages starting with an imperative verb (`feat:`, `fix:`, `style:`, `docs:`, `refactor:`):

```bash
git add pages/food-details.html assets/js/features/food/food-details.js
git commit -m "feat(reviews): add interactive star rating selector to food details"
```

### Step 7: Push Your Branch and Open a Pull Request
Push your branch to GitHub:

```bash
git push -u origin feature/user-review-system
```

Navigate to [GitHub Repository](https://github.com/deepali1309/food-delivery-restaurant-management-system) and click **"Compare & pull request"**.
Provide a brief summary of:
- What changes were made
- Which pages were tested
- Screenshots if UI styles were updated

---

## 3. Code & Naming Conventions

### File Naming
- **HTML files:** Lowercase kebab-case (e.g. `restaurant-details.html`, `food-menu.html`).
- **CSS files:** Lowercase kebab-case (e.g. `buttons.css`, `food-details.css`).
- **JavaScript files:** Lowercase kebab-case with descriptive extension (e.g. `food.service.js`, `order-confirmation.js`).
- **Image assets:** Lowercase kebab-case (e.g. `butter-chicken.jpg`, `spice-route.jpg`).

### Code Style
- **JavaScript Variables & Functions:** Use `camelCase` (e.g. `formatPrice`, `renderFoodCards`, `calculateCartTotal`).
- **JavaScript Classes:** Use `PascalCase` (e.g. `ApiService`, `FoodService`).
- **Constants:** Use `UPPER_SNAKE_CASE` (e.g. `STORAGE_KEYS`, `DEFAULT_CONFIG`).
- **CSS Class Selectors:** Use `kebab-case` (e.g. `.food-card`, `.stat-card`, `.btn-primary`). Avoid excessive `!important` tags.
- **HTML IDs:** Use `camelCase` for JavaScript DOM hooks (e.g. `id="menuSearchInput"`, `id="userDropdown"`).

---

## 4. Header Comments for JavaScript Modules

Whenever creating a significant JavaScript file, add this concise header comment:

```javascript
/**
 * [MODULE_NAME].JS — Brief description of responsibility
 * Associated Page: pages/[page-name].html
 * Dependencies: assets/js/core/store.js, assets/js/core/utils.js
 */
```

