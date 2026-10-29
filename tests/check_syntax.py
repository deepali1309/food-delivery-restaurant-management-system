import subprocess
from pathlib import Path

# Resolve repo root directory (one level up from tests/)
repo = Path(__file__).resolve().parent.parent
js_files = list((repo / "assets" / "js").rglob("*.js"))

print(f"Validating JavaScript syntax for {len(js_files)} files...")
errors = 0

for js_path in sorted(js_files):
    res = subprocess.run(["node", "-c", str(js_path)], capture_output=True, text=True)
    rel = js_path.relative_to(repo)
    if res.returncode != 0:
        print(f"  [ERROR] {rel}: {res.stderr.strip()}")
        errors += 1
    else:
        print(f"  [PASS] {rel}")

if errors == 0:
    print(f"\nSUCCESS: All {len(js_files)} JavaScript files passed syntax validation with 0 errors!")
    exit(0)
else:
    print(f"\nFAILED: {errors} JavaScript files failed syntax validation.")
    exit(1)

