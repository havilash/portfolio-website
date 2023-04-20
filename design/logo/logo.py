# importing pycairo
import cairo
from PIL import Image

WIDTH, HEIGHT = SIZE = 600, 600
N = 100
BAR_WIDTH = WIDTH / N
BAR_DELTAHEIGHT = HEIGHT / N

WHITE = (0, 0, 0, 0)
BLACK = (255, 255, 255, 0)


H_IMG = Image.open("H.png", "r")
H_PIXELS = list(H_IMG.getdata())

i = lambda x, y: x + y * H_IMG.size[0]
H_HEIGHTS = []
for x in range(H_IMG.size[0]):
    for y in range(H_IMG.size[1]):
        if H_PIXELS[i(x, y)] == BLACK:
            H_HEIGHTS.append(y)
            break
H_HEIGHTS = list(map(lambda x: x / H_IMG.size[1], H_HEIGHTS))


class Bar:
    def __init__(self, h) -> None:
        self.y = HEIGHT - h
        self.h = h

    def draw(self, ctx, i):
        ctx.rectangle(i * BAR_WIDTH, self.y, BAR_WIDTH, self.h)
        ctx.fill()


with cairo.SVGSurface("geek.svg", *SIZE) as surface:
    ctx = cairo.Context(surface)
    bars = []
    for i in range(N):
        bars.append(Bar(i * BAR_DELTAHEIGHT))

    for i, bar in enumerate(bars):
        bar.draw(ctx, i)


print("File Saved")
