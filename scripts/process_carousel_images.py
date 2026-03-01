"""
Process carousel images to remove white borders and produce images sized 1920x800 for the carousel.

Outputs are written to `media-potts-website/optimized/` as slide2.jpg and slide3.jpg.

Requirements: Pillow

Run:
    python -m venv venv
    venv\\Scripts\\pip install -r requirements.txt
    python scripts/process_carousel_images.py
"""
from PIL import Image, ImageChops
from pathlib import Path

SRC_DIR = Path(__file__).resolve().parents[1] / 'media-potts-website'
OUT_DIR = SRC_DIR / 'optimized'
OUT_DIR.mkdir(parents=True, exist_ok=True)

print(f"Source dir: {SRC_DIR}")
print(f"Output dir: {OUT_DIR}")

FILES = [
    ('girl_and_dog.jpg', 'slide2.jpg'),
    ('pup_at_potts.png', 'slide3.jpg'),
]

TARGET_SIZE = (1920, 800)  # carousel target: 1920x800


def trim_whitespace(im: Image.Image, bg_color=(255, 255, 255)) -> Image.Image:
    """Trim near-white borders from an image."""
    # Ensure RGB
    if im.mode in ('RGBA', 'LA'):
        bg = Image.new('RGBA', im.size, bg_color + (255,))
    else:
        im = im.convert('RGB')
        bg = Image.new('RGB', im.size, bg_color)

    diff = ImageChops.difference(im, bg)
    # Convert to grayscale, then get bbox of non-zero pixels
    bbox = diff.convert('L').point(lambda x: 0 if x < 20 else 255).getbbox()
    if bbox:
        return im.crop(bbox)
    return im


def cover_resize(im: Image.Image, target_size: tuple) -> Image.Image:
    tw, th = target_size
    w, h = im.size
    scale = max(tw / w, th / h)
    nw, nh = int(w * scale), int(h * scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    # center-crop
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return im.crop((left, top, left + tw, top + th))


if __name__ == '__main__':
    try:
        for src_name, out_name in FILES:
            src = SRC_DIR / src_name
            out_path = OUT_DIR / out_name
            print(f"Processing: {src} -> {out_path}")
            if not src.exists():
                print(f"  Skipped: source missing: {src}")
                continue
            im = Image.open(src)
            im = trim_whitespace(im)
            im = cover_resize(im, TARGET_SIZE)
            im.save(out_path, quality=90)
            print(f"  Wrote {out_path}")
    except Exception as e:
        import traceback
        print('Error while processing images:')
        traceback.print_exc()
    else:
        print('Done. Adjust TARGET_SIZE or input files as needed.')