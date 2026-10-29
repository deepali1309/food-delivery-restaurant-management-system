import os
import re
from pathlib import Path

# Resolve repo root directory (one level up from tests/)
repo = Path(__file__).resolve().parent.parent

broken_links = []
total_checked = 0

html_files = [repo / "index.html"] + list((repo / "pages").glob("*.html")) + list((repo / "dashboards").rglob("*.html"))

print(f"Scanning {len(html_files)} HTML files for broken references...")

for html_path in html_files:
    text = html_path.read_text(encoding="utf-8")
    rel_page = html_path.relative_to(repo)
    
    # 1. Check hrefs
    hrefs = re.findall(r'href=[\"\']([^\"\']+)[\"\']', text)
    for h in hrefs:
        if h.startswith("http") or h.startswith("#") or h.startswith("mailto:") or h.startswith("tel:"):
            continue
        total_checked += 1
        clean_h = h.split("?")[0].split("#")[0]
        target = (html_path.parent / clean_h).resolve()
        if not target.exists():
            broken_links.append((str(rel_page), "href", h, str(target)))

    # 2. Check images & scripts (src)
    srcs = re.findall(r'src=[\"\']([^\"\']+)[\"\']', text)
    for s in srcs:
        if s.startswith("http") or s.startswith("data:"):
            continue
        total_checked += 1
        clean_s = s.split("?")[0].split("#")[0]
        target = (html_path.parent / clean_s).resolve()
        if not target.exists():
            broken_links.append((str(rel_page), "src", s, str(target)))

    # 3. Check form actions
    actions = re.findall(r'action=[\"\']([^\"\']+)[\"\']', text)
    for a in actions:
        if a.startswith("http") or a.startswith("#"):
            continue
        total_checked += 1
        clean_a = a.split("?")[0].split("#")[0]
        target = (html_path.parent / clean_a).resolve()
        if not target.exists():
            broken_links.append((str(rel_page), "action", a, str(target)))

print(f"Total references checked: {total_checked}")
if broken_links:
    print(f"FAILED: Found {len(broken_links)} broken references:")
    for page, kind, val, target in broken_links:
        print(f"  [{page}] {kind}: '{val}' -> NOT FOUND ({target})")
    exit(1)
else:
    print("SUCCESS: 100% of HTML references, scripts, stylesheets, and images resolve accurately!")
    exit(0)

