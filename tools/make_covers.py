"""Cover-art generator for The Economy Hub.

Authoring tool, not a build step: run it once, commit the SVGs it writes to
assets/covers/, and paste them inline where the pages need them (the inline
copies are documented in SKELETON.md). Deterministic output — same input,
same bytes — so covers can be regenerated and diffed.

Geometry: 600x900 viewBox. Guilloche border bands (four interwoven sinusoid
strands, green and brass), corner rosettes (8-petal rose curves) that mask
the band joints, and a central medallion whose rose petal count is unique
per volume (5 through 9). All curves are sampled parametrically; text is
real SVG text set in the site families, which resolve when the SVG is
inlined in a page that loads the site fonts.

Usage:  python tools/make_covers.py
"""
import math
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "covers"
OUT.mkdir(parents=True, exist_ok=True)

# Palette (mirrors css/tokens.css — keep in sync by hand; documented there)
PAPER_FIELD = "#F3ECDC"   # cover field, one step deeper than page paper
INK = "#20262A"
GREEN = "#1F5C45"
BRASS = "#B8892B"         # decorative strokes only
BRASS_DEEP = "#7E5A12"    # text-safe brass
INK_SOFT = "#4A5258"

W, H = 600, 900
BAND_C = 42               # centerline inset of the guilloche band
BAND_HALF = 16            # half-width of the band
MEDALLION = (300, 385)

VOLUMES = [
    # slug, roman, spoken, title, subtitle lines, petals, numeral font size
    ("frameworks",  "I",   "VOLUME ONE",   "Frameworks",
     ["Economic systems, in theory", "and in practice."], 5, 130),
    ("history",     "II",  "VOLUME TWO",   "History",
     ["Exchange and its institutions,", "from barter to the attention market."], 6, 112),
    ("countries",   "III", "VOLUME THREE", "Countries",
     ["Why national outcomes diverge."], 7, 94),
    ("work",        "IV",  "VOLUME FOUR",  "Work",
     ["Labor, hours, wages,", "and the purpose of a job."], 8, 102),
    ("pathologies", "V",   "VOLUME FIVE",  "Pathologies",
     ["Failure modes, and how economists", "know what they know."], 9, 108),
]


def fmt(n: float) -> str:
    s = f"{n:.1f}"
    return s[:-2] if s.endswith(".0") else s


def sine_path(length: float, amp: float, wavelength: float, phase: float,
              step: float = 3.0) -> str:
    pts = []
    t = 0.0
    while t <= length + 0.001:
        y = amp * math.sin(2 * math.pi * t / wavelength + phase)
        pts.append(f"{fmt(t)},{fmt(y)}")
        t += step
    return "M" + "L".join(pts)


def rose_path(cx: float, cy: float, base: float, amp: float, k: int,
              phase: float = 0.0, step_deg: float = 2.0) -> str:
    pts = []
    steps = int(360 / step_deg)
    for i in range(steps + 1):
        th = math.radians(i * step_deg)
        r = base + amp * math.cos(k * th + phase)
        pts.append(f"{fmt(cx + r * math.cos(th))},{fmt(cy + r * math.sin(th))}")
    return "M" + "L".join(pts) + "Z"


def band_def(slug: str, tag: str, length: float) -> str:
    """A horizontal guilloche band centered on y=0, from x=0 to x=length."""
    strands = []
    for i, phase in enumerate((0.0, math.pi / 2, math.pi, 3 * math.pi / 2)):
        color = GREEN if i % 2 == 0 else BRASS
        d = sine_path(length, 12, 52, phase)
        strands.append(
            f'<path d="{d}" fill="none" stroke="{color}" stroke-width="0.9"/>')
    edges = (
        f'<line x1="0" y1="{-BAND_HALF}" x2="{fmt(length)}" y2="{-BAND_HALF}" '
        f'stroke="{INK}" stroke-width="0.5"/>'
        f'<line x1="0" y1="{BAND_HALF}" x2="{fmt(length)}" y2="{BAND_HALF}" '
        f'stroke="{INK}" stroke-width="0.5"/>'
    )
    return f'<g id="{slug}-{tag}">{edges}{"".join(strands)}</g>'


def corner_rosette_def(slug: str) -> str:
    rose = rose_path(0, 0, 12.5, 6.5, 8)
    return (
        f'<g id="{slug}-cr">'
        f'<circle r="21" fill="{PAPER_FIELD}"/>'
        f'<circle r="19.5" fill="none" stroke="{GREEN}" stroke-width="0.8"/>'
        f'<path d="{rose}" fill="none" stroke="{BRASS}" stroke-width="1"/>'
        f'<circle r="5" fill="none" stroke="{GREEN}" stroke-width="0.8"/>'
        f'<circle r="1.8" fill="{BRASS}"/>'
        f'</g>'
    )


def medallion(k: int) -> str:
    cx, cy = MEDALLION
    rose_a = rose_path(cx, cy, 86, 21, k)
    rose_b = rose_path(cx, cy, 86, 21, k, phase=math.pi)
    return (
        f'<circle cx="{cx}" cy="{cy}" r="118" fill="none" stroke="{INK}" stroke-width="0.5"/>'
        f'<circle cx="{cx}" cy="{cy}" r="113" fill="none" stroke="{GREEN}" stroke-width="0.9"/>'
        f'<path d="{rose_a}" fill="none" stroke="{BRASS}" stroke-width="0.9"/>'
        f'<path d="{rose_b}" fill="none" stroke="{GREEN}" stroke-width="0.7"/>'
        f'<circle cx="{cx}" cy="{cy}" r="62" fill="{PAPER_FIELD}" stroke="{GREEN}" stroke-width="0.8"/>'
        f'<circle cx="{cx}" cy="{cy}" r="58" fill="none" stroke="{INK}" stroke-width="0.5"/>'
    )


def bottom_ornament(k: int) -> str:
    y = 762
    rose = rose_path(300, y, 9, 4, k)
    return (
        f'<line x1="210" y1="{y}" x2="272" y2="{y}" stroke="{INK}" stroke-width="0.5"/>'
        f'<line x1="328" y1="{y}" x2="390" y2="{y}" stroke="{INK}" stroke-width="0.5"/>'
        f'<path d="{rose}" fill="none" stroke="{BRASS}" stroke-width="0.8"/>'
    )


def cover_svg(slug, roman, spoken, title, subtitle, k, numeral_size) -> str:
    band_h = 600 - 2 * BAND_C   # 516
    band_v = 900 - 2 * BAND_C   # 816

    frames = (
        f'<rect x="12" y="12" width="576" height="876" fill="none" stroke="{INK}" stroke-width="1.25"/>'
        f'<rect x="17" y="17" width="566" height="866" fill="none" stroke="{INK}" stroke-width="0.5"/>'
        f'<rect x="66" y="66" width="468" height="768" fill="none" stroke="{INK}" stroke-width="0.5"/>'
    )

    bands = (
        f'<use href="#{slug}-bh" transform="translate({BAND_C},{BAND_C})"/>'
        f'<use href="#{slug}-bh" transform="translate({600 - BAND_C},{900 - BAND_C}) rotate(180)"/>'
        f'<use href="#{slug}-bv" transform="translate({BAND_C},{900 - BAND_C}) rotate(-90)"/>'
        f'<use href="#{slug}-bv" transform="translate({600 - BAND_C},{BAND_C}) rotate(90)"/>'
    )

    rosettes = "".join(
        f'<use href="#{slug}-cr" transform="translate({x},{y})"/>'
        for x, y in ((BAND_C, BAND_C), (600 - BAND_C, BAND_C),
                     (BAND_C, 900 - BAND_C), (600 - BAND_C, 900 - BAND_C)))

    numeral_y = MEDALLION[1] + numeral_size * 0.355

    series = (
        f'<line x1="108" y1="118" x2="168" y2="118" stroke="{INK}" stroke-width="0.6"/>'
        f'<line x1="432" y1="118" x2="492" y2="118" stroke="{INK}" stroke-width="0.6"/>'
        f'<text x="300" y="125" text-anchor="middle" font-family="Fraunces, Georgia, serif" '
        f'font-weight="600" font-size="20" letter-spacing="5" fill="{INK}">THE ECONOMY HUB</text>'
    )

    sub_lines = "".join(
        f'<text x="300" y="{664 + i * 26}" text-anchor="middle" '
        f'font-family="\'Source Serif 4\', Georgia, serif" font-style="italic" '
        f'font-size="17.5" fill="{INK_SOFT}">{line}</text>'
        for i, line in enumerate(subtitle))

    text_block = (
        f'{series}'
        f'<text x="300" y="{fmt(numeral_y)}" text-anchor="middle" '
        f'font-family="Fraunces, Georgia, serif" font-weight="600" '
        f'font-size="{numeral_size}" fill="{GREEN}">{roman}</text>'
        f'<text x="300" y="561" text-anchor="middle" '
        f'font-family="\'IBM Plex Mono\', Consolas, monospace" font-weight="500" '
        f'font-size="14" letter-spacing="5" fill="{BRASS_DEEP}">{spoken}</text>'
        f'<text x="300" y="628" text-anchor="middle" '
        f'font-family="Fraunces, Georgia, serif" font-weight="600" '
        f'font-size="58" fill="{INK}">{title}</text>'
        f'{sub_lines}'
    )

    return (
        f'<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg" '
        f'role="img" aria-labelledby="{slug}-cover-title" class="cover-art">'
        f'<title id="{slug}-cover-title">Volume {roman}: {title} — book cover</title>'
        f'<defs>{band_def(slug, "bh", band_h)}{band_def(slug, "bv", band_v)}'
        f'{corner_rosette_def(slug)}</defs>'
        f'<rect width="600" height="900" fill="{PAPER_FIELD}"/>'
        f'{frames}{bands}{rosettes}'
        f'{medallion(k)}'
        f'{bottom_ornament(k)}'
        f'{text_block}'
        f'</svg>'
    )


def favicon_svg() -> str:
    rose = rose_path(32, 32, 17, 8, 8)
    return (
        '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">'
        f'<rect width="64" height="64" rx="12" fill="{PAPER_FIELD}"/>'
        f'<circle cx="32" cy="32" r="27" fill="none" stroke="{BRASS}" stroke-width="1.8"/>'
        f'<path d="{rose}" fill="none" stroke="{GREEN}" stroke-width="2.4"/>'
        f'<circle cx="32" cy="32" r="4.5" fill="{BRASS}"/>'
        '</svg>'
    )


if __name__ == "__main__":
    for slug, roman, spoken, title, subtitle, k, nsize in VOLUMES:
        svg = cover_svg(slug, roman, spoken, title, subtitle, k, nsize)
        path = OUT / f"cover-{slug}.svg"
        path.write_text(svg, encoding="utf-8")
        print(f"{path.name:28s} {len(svg):>7,} bytes")
    fav = OUT.parent / "favicon.svg"
    fav.write_text(favicon_svg(), encoding="utf-8")
    print(f"{fav.name:28s} {len(favicon_svg()):>7,} bytes")
