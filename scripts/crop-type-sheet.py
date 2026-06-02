from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SHEET = ROOT / "命格测试" / "image" / "types-sheet.png"
OUT = ROOT / "命格测试" / "image" / "types"

CODES = [
    "empr", "general", "career", "scholar", "fame",
    "wanderer", "rebel", "charm", "merchant", "fortune",
    "lucky", "sage", "mystic", "hermit", "spirit",
    "protector", "loner", "hard", "clown", "foodie",
    "lazy", "gamer", "romantic", "nerd", "boss",
    "ordinary",
]

# The source sheet uses black separator lines between cells. Detect the
# separators first so the lines are never included in the exported portraits.
COLS = 5
ROWS = 6
LINE_THRESHOLD = 35
MIN_LINE_COVERAGE = 0.2
INSET = 10
TARGET = 512


def find_separator_groups(sheet, axis):
    length = sheet.width if axis == "x" else sheet.height
    cross_length = sheet.height if axis == "x" else sheet.width
    groups = []
    current_start = None
    current_end = None

    for i in range(length):
        dark_count = 0
        for j in range(cross_length):
            pixel = sheet.getpixel((i, j) if axis == "x" else (j, i))
            if all(channel < LINE_THRESHOLD for channel in pixel):
                dark_count += 1

        is_line = dark_count > cross_length * MIN_LINE_COVERAGE
        if is_line and current_start is None:
            current_start = current_end = i
        elif is_line:
            current_end = i
        elif current_start is not None:
            groups.append((current_start, current_end))
            current_start = current_end = None

    if current_start is not None:
        groups.append((current_start, current_end))

    return groups


def spans_from_separators(size, separators, expected_count):
    spans = []
    start = 0
    for sep_start, sep_end in separators[: expected_count - 1]:
        spans.append((start, sep_start))
        start = sep_end + 1
    spans.append((start, size))
    return spans


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sheet = Image.open(SHEET).convert("RGB")
    col_spans = spans_from_separators(
        sheet.width,
        find_separator_groups(sheet, "x"),
        COLS,
    )
    row_spans = spans_from_separators(
        sheet.height,
        find_separator_groups(sheet, "y"),
        ROWS,
    )

    for index, code in enumerate(CODES):
        row = index // COLS
        col = index % COLS
        x0, x1 = col_spans[col]
        y0, y1 = row_spans[row]

        box = (x0 + INSET, y0 + INSET, x1 - INSET, y1 - INSET)
        crop = sheet.crop(box)
        padded = ImageOps.pad(
            crop,
            (TARGET, TARGET),
            method=Image.Resampling.LANCZOS,
            color=(248, 251, 247),
            centering=(0.5, 0.45),
        )
        padded.save(OUT / f"{code}.png", "PNG")

    print(f"Cropped {len(CODES)} PNG portraits into {OUT}")


if __name__ == "__main__":
    main()
