"""Draws the app icons from the favicon's geometry. Standard library only.

Run from the repository root: python3 scripts/make-icons.py
"""
import math
import struct
import zlib

GREEN = (0x1B, 0x5C, 0x42)
WHITE = (255, 255, 255)
OUTER = [(16, 3), (27, 9.5), (27, 22.5), (16, 29), (5, 22.5), (5, 9.5)]
INNER = [(16, 8), (23, 12), (23, 20), (16, 24), (9, 20), (9, 12)]
SAMPLES = 3


def distance_to_segment(px, py, a, b):
    (ax, ay), (bx, by) = a, b
    dx, dy = bx - ax, by - ay
    t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def distance_to_outline(px, py, points):
    return min(
        distance_to_segment(px, py, points[i], points[(i + 1) % len(points)])
        for i in range(len(points))
    )


def inside_rounded_square(x, y, radius):
    cx = min(max(x, radius), 32 - radius)
    cy = min(max(y, radius), 32 - radius)
    return math.hypot(x - cx, y - cy) <= radius


def sample(x, y, scale, radius):
    """Returns (r, g, b, a) for a point in the favicon's 32-unit space."""
    if radius and not inside_rounded_square(x, y, radius):
        return (0, 0, 0, 0)
    lx = 16 + (x - 16) / scale
    ly = 16 + (y - 16) / scale
    if distance_to_outline(lx, ly, OUTER) <= 0.9:
        return WHITE + (255,)
    if distance_to_outline(lx, ly, INNER) <= 0.5:
        return tuple(round(g + (255 - g) * 0.65) for g in GREEN) + (255,)
    return GREEN + (255,)


def render(size, scale=1.0, radius=7.0):
    rows = []
    for py in range(size):
        row = bytearray([0])
        for px in range(size):
            total = [0, 0, 0, 0]
            for sy in range(SAMPLES):
                for sx in range(SAMPLES):
                    x = (px + (sx + 0.5) / SAMPLES) * 32 / size
                    y = (py + (sy + 0.5) / SAMPLES) * 32 / size
                    r, g, b, a = sample(x, y, scale, radius)
                    total[0] += r * a
                    total[1] += g * a
                    total[2] += b * a
                    total[3] += a
            alpha = total[3] / (SAMPLES * SAMPLES)
            if total[3]:
                row += bytes(round(total[i] / total[3]) for i in range(3)) + bytes([round(alpha)])
            else:
                row += bytes(4)
        rows.append(bytes(row))
    return b''.join(rows)


def chunk(kind, data):
    body = kind + data
    return struct.pack('>I', len(data)) + body + struct.pack('>I', zlib.crc32(body))


def write_png(path, size, **options):
    header = struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)
    png = (
        b'\x89PNG\r\n\x1a\n'
        + chunk(b'IHDR', header)
        + chunk(b'IDAT', zlib.compress(render(size, **options), 9))
        + chunk(b'IEND', b'')
    )
    with open(path, 'wb') as file:
        file.write(png)
    print(path, size, len(png), 'bytes')


write_png('public/icon-192.png', 192)
write_png('public/icon-512.png', 512)
write_png('public/icon-maskable-512.png', 512, scale=0.68, radius=0)
write_png('public/apple-touch-icon.png', 180, radius=0)
