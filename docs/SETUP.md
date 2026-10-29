# 💻 Team Onboarding & Local Development Setup Guide

**Welcome to the BiteBuddy team!** This guide walks you through setting up, running, debugging, and contributing to the project on a **Windows** machine using **Visual Studio Code (VS Code)**.

---

## 1. Prerequisites Checklist

Ensure the following tools are installed on your Windows machine:

1. **Git for Windows:** Download from [git-scm.com](https://git-scm.com/)
2. **Visual Studio Code:** Download from [code.visualstudio.com](https://code.visualstudio.com/)
3. **Node.js (LTS version):** Download from [nodejs.org](https://nodejs.org/) (Needed for syntax validation and optional tooling)
4. **Python (3.10+):** Download from [python.org](https://python.org/) (Used for automated link checking and local web server)
5. **VS Code Extensions (Highly Recommended):**
   - **Live Server** (by *Ritwick Dey*): For instantaneous local hot reloading.
   - **HTML CSS Support** & **Prettier**: For code formatting.

---

## 2. Step-by-Step Setup Instructions

### Step 1: Clone the GitHub Repository
Open **PowerShell** or **Git Bash** on your computer and run:

```bash
git clone https://github.com/deepali1309/food-delivery-restaurant-management-system.git
```

Navigate into the cloned project folder:

```bash
cd food-delivery-restaurant-management-system
```

### Step 2: Open the Project in VS Code
Launch VS Code directly inside the project root:

```bash
code .
```

Ensure your VS Code Explorer root shows:
```
food-delivery-restaurant-management-system/
├── assets/
├── dashboards/
├── docs/
├── pages/
├── tests/
├── index.html
├── vercel.json
└── README.md
```

### Step 3: Run the Website Locally

There are two easy methods to run the site locally.

#### Method A: Using VS Code Live Server (Easiest)
1. In the VS Code file tree, right-click on `index.html`.
2. Click **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
3. Your default browser will launch at `http://127.0.0.1:5500/index.html`.

#### Method B: Using Python's Built-in Web Server
Open the VS Code integrated terminal (`Ctrl + ~`) and execute:

```bash
python -m http.server 3000
```

Open your browser and navigate to:
```
http://localhost:3000
```

> [!NOTE]
> While you can technically double-click `index.html` to open it as a `file:///` URL, running a local web server (Method A or B) is recommended to simulate exact web browser behavior.

---

## 3. How to Inspect Browser Console & Debug

1. On any page in your browser, press `F12` (or right-click anywhere and select **Inspect**).
2. Switch to the **Console** tab:
   - Check for any red error logs. A clean setup should show **0 errors**.
   - You will see BiteBuddy namespace information and event logs.
3. Switch to the **Application** (or **Storage**) tab:
   - Expand **Local Storage** → `http://localhost:3000` (or `127.0.0.1:5500`).
   - Here you can inspect:
     - `bitebuddy_cart`: Your active shopping cart items.
     - `bitebuddy_orders`: Your placed order records.
     - `bitebuddy_user`: Currently logged-in profile.
   - To reset your local data at any time, run in the Console:
     ```javascript
     localStorage.clear(); location.reload();
     ```

---

## 4. How to Test Links & Assets Automatically

Whenever you add or move files, run our automated static tests from the VS Code terminal:

```bash
# 1. Verify that all 840+ images, scripts, stylesheets, and hyperlinks resolve:
python tests/verify_links.py

# 2. Verify that all 23 JavaScript files have valid ECMAScript syntax:
python tests/check_syntax.py
```

Both tests should return `SUCCESS` with 0 errors.

---

## 5. How to Make and Verify a Change

Let's test making a simple change to understand the workflow:

1. Open `pages/food-menu.html` in VS Code.
2. Search for the hero heading `<h1>Explore Our Full Menu</h1>`.
3. Change it to `<h1>Explore Our Delicious Full Menu</h1>` and save (`Ctrl + S`).
4. Look at your browser: the title immediately reflects your edit.
5. In your terminal, run `git diff` to view your change:
   ```bash
   git diff pages/food-menu.html
   ```
6. Re-run `python tests/verify_links.py` to ensure no broken tags were accidentally introduced.

