"""Inline the generated cover SVGs into the pages that display them.

Authoring tool, not a build step. Covers must be inline SVG so the site
fonts reach their text (an <img> SVG cannot load document fonts), but the
committed files in assets/covers/ stay the single source of truth. Pages
mark each slot with a pair of comments:

    <!-- cover:SLUG:begin -->
    ...replaced content...
    <!-- cover:SLUG:end -->

Re-running is idempotent: everything between the markers is replaced with
the current file content. Run after make_covers.py whenever covers change.

Usage:  python tools/inline_covers.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COVERS = ROOT / "assets" / "covers"

PAGES = [
    ROOT / "index.html",
    ROOT / "books" / "frameworks" / "index.html",
    ROOT / "books" / "history" / "index.html",
    ROOT / "books" / "countries" / "index.html",
]

pattern = re.compile(
    r"(<!-- cover:([a-z]+):begin -->)(.*?)(<!-- cover:\2:end -->)",
    re.DOTALL,
)

for page in PAGES:
    html = page.read_text(encoding="utf-8")

    def replace(m):
        slug = m.group(2)
        svg = (COVERS / f"cover-{slug}.svg").read_text(encoding="utf-8").strip()
        return f"{m.group(1)}\n{svg}\n            {m.group(4)}"

    out, n = pattern.subn(replace, html)
    page.write_text(out, encoding="utf-8")
    print(f"{page.relative_to(ROOT)}: {n} cover(s) inlined")
