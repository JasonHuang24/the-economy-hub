"""Raster asset generation: Open Graph share cards and the favicon set.

Authoring tool, not a build step. Requires headless Chrome and Pillow, plus
the local preview server (python -m http.server 8123 from the repo root) so
the share cards can load the site fonts. Writes:

    assets/og/og-hub.png          1200x630 share card for the hub and demo
    assets/og/og-<volume>.png     1200x630 share card per volume, all five
    assets/favicon-32.png         browser tab icon
    assets/apple-touch-icon.png   180x180
    favicon.ico                   16/32/48 multi-size, served from root

Usage:  python tools/make_rasters.py
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ROOT = Path(__file__).resolve().parent.parent
OG = ROOT / "assets" / "og"
OG.mkdir(parents=True, exist_ok=True)
SERVER = "http://localhost:8123"

CARD_CSS = """
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: #F6F1E7; color: #20262A;
    font-family: "Source Serif 4", Georgia, serif;
    display: flex; flex-direction: row; align-items: center;
    gap: 64px; padding: 56px 72px;
    border-top: 10px solid #1F5C45; border-bottom: 10px solid #1F5C45;
  }
  .art { flex: 0 0 auto; box-shadow: 0 14px 28px -14px rgba(32,38,42,.35); }
  .art svg { display: block; height: 508px; width: auto; }
  .art--mark svg { height: 380px; width: 380px; box-shadow: none; }
  .art--mark { box-shadow: none; }
  .text { flex: 1 1 auto; }
  .kicker {
    font-family: "IBM Plex Mono", monospace; font-size: 22px; font-weight: 500;
    letter-spacing: .16em; color: #7E5A12; text-transform: uppercase;
    margin-bottom: 18px;
  }
  h1 {
    font-family: "Fraunces", Georgia, serif; font-weight: 640;
    font-size: 88px; line-height: 1.02; margin-bottom: 26px;
  }
  .rule { width: 96px; border-top: 4px solid #B8892B; margin-bottom: 26px; }
  .line { font-style: italic; font-size: 33px; line-height: 1.35; color: #4A5258; }
"""

def card_html(kicker: str, title: str, line: str, art_svg: str,
              art_class: str = "art") -> str:
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="{SERVER}/css/tokens.css">
<link rel="stylesheet" href="{SERVER}/css/base.css">
<style>{CARD_CSS}</style></head>
<body>
  <div class="{art_class}">{art_svg}</div>
  <div class="text">
    <p class="kicker">{kicker}</p>
    <h1>{title}</h1>
    <div class="rule"></div>
    <p class="line">{line}</p>
  </div>
</body></html>"""


def shoot(html: str, out: Path, width: int, height: int) -> None:
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False,
                                     encoding="utf-8") as f:
        f.write(html)
        tmp = f.name
    subprocess.run([
        CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
        f"--window-size={width},{height}", f"--screenshot={out}",
        "--virtual-time-budget=6000", Path(tmp).as_uri(),
    ], check=True, capture_output=True)
    print(f"{out.relative_to(ROOT)}  {out.stat().st_size:,} bytes")


mark = (ROOT / "assets" / "favicon.svg").read_text(encoding="utf-8")

# Fine-stroke variant of the rosette mark for the large card; the favicon
# itself keeps heavy strokes so it survives 16px.
import math
from make_covers import rose_path, GREEN, BRASS, INK

MARK_LARGE = (
    '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">'
    f'<circle cx="32" cy="32" r="28.5" fill="none" stroke="{INK}" stroke-width="0.3"/>'
    f'<circle cx="32" cy="32" r="27" fill="none" stroke="{BRASS}" stroke-width="0.7"/>'
    f'<path d="{rose_path(32, 32, 17, 8, 8)}" fill="none" stroke="{GREEN}" stroke-width="0.8"/>'
    f'<path d="{rose_path(32, 32, 17, 8, 8, phase=math.pi)}" fill="none" stroke="{BRASS}" stroke-width="0.55"/>'
    f'<circle cx="32" cy="32" r="2.4" fill="{BRASS}"/>'
    '</svg>'
)

shoot(card_html("A shelf of five volumes", "The Economy Hub",
                "Five volumes on how the world economy works, written for general readers.",
                MARK_LARGE, art_class="art art--mark"),
      OG / "og-hub.png", 1200, 630)

from make_covers import VOLUMES

for slug, roman, _spoken, title, subtitle, _k, _nsize in VOLUMES:
    cover = (ROOT / "assets" / "covers" / f"cover-{slug}.svg").read_text(encoding="utf-8")
    shoot(card_html(f"The Economy Hub · Volume {roman}", title,
                    " ".join(subtitle), cover),
          OG / f"og-{slug}.png", 1200, 630)

# Favicon rasters: render the mark large once, downsample with Lanczos.
big = ROOT / "assets" / "favicon-512.png"
shoot(f"""<!doctype html><html><head><meta charset="utf-8">
<style>* {{ margin: 0; }} body {{ width: 512px; height: 512px; }} svg {{ display: block; width: 512px; height: 512px; }}</style>
</head><body>{mark}</body></html>""", big, 512, 512)

src = Image.open(big)
src.resize((180, 180), Image.LANCZOS).save(ROOT / "assets" / "apple-touch-icon.png")
src.resize((32, 32), Image.LANCZOS).save(ROOT / "assets" / "favicon-32.png")
src.resize((48, 48), Image.LANCZOS).save(
    ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("favicon set written")
