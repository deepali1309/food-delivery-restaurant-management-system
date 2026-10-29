import http.server
import socketserver
import threading
import urllib.request
import time
from pathlib import Path

repo = Path(__file__).resolve().parent.parent

class SilentHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(repo), **kwargs)
    def log_message(self, format, *args):
        pass # Suppress logs during test

def run_server_tests():
    port = 8765
    server = socketserver.TCPServer(("127.0.0.1", port), SilentHandler)
    server_thread = threading.Thread(target=server.serve_forever)
    server_thread.daemon = True
    server_thread.start()
    time.sleep(0.5)

    base_url = f"http://127.0.0.1:{port}"
    
    test_endpoints = [
        "/index.html",
        "/pages/about.html",
        "/pages/cart.html",
        "/pages/checkout.html",
        "/pages/food-details.html",
        "/pages/food-menu.html",
        "/pages/login.html",
        "/pages/my-orders.html",
        "/pages/order-confirmation.html",
        "/pages/profile.html",
        "/pages/register.html",
        "/pages/restaurant-details.html",
        "/pages/restaurants.html",
        "/dashboards/admin/index.html",
        "/dashboards/admin/food-items.html",
        "/dashboards/admin/orders.html",
        "/dashboards/admin/restaurants.html",
        "/dashboards/admin/reviews.html",
        "/dashboards/admin/users.html",
        "/dashboards/restaurant/index.html",
        "/dashboards/restaurant/add-food.html",
        "/dashboards/restaurant/manage-food.html",
        "/dashboards/restaurant/orders.html",
        "/assets/css/main.css",
        "/assets/js/core/app.js",
        "/assets/images/logo/logo.svg"
    ]

    print(f"Testing {len(test_endpoints)} HTTP endpoints on local server...")
    failures = 0

    for ep in test_endpoints:
        url = base_url + ep
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=3) as resp:
                if resp.status == 200:
                    print(f"  [200 OK] {ep}")
                else:
                    print(f"  [FAIL {resp.status}] {ep}")
                    failures += 1
        except Exception as e:
            print(f"  [ERROR] {ep}: {e}")
            failures += 1

    server.shutdown()
    server.server_close()
    
    if failures == 0:
        print(f"\nSUCCESS: All {len(test_endpoints)} endpoints returned HTTP 200 OK!")
        return 0
    else:
        print(f"\nFAILED: {failures} endpoints failed to serve.")
        return 1

if __name__ == "__main__":
    exit(run_server_tests())

