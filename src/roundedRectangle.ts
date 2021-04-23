import { CanvasRenderingContext2D } from "canvas";
import { RoundedRectanglePath } from "./types";

// See: https://newfivefour.com/javascript-canvas-rounded-rectangle.html
export default function createPath(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, rounded }: RoundedRectanglePath
) {
  const halfRadians = (2 * Math.PI) / 2;
  const quarterRadians = (2 * Math.PI) / 4;

  ctx.arc(
    rounded + x,
    rounded + y,
    rounded,
    -quarterRadians,
    halfRadians,
    true
  );

  ctx.lineTo(x, y + height - rounded);

  ctx.arc(
    rounded + x,
    height - rounded + y,
    rounded,
    halfRadians,
    quarterRadians,
    true
  );

  ctx.lineTo(x + width - rounded, y + height);

  ctx.arc(
    x + width - rounded,
    y + height - rounded,
    rounded,
    quarterRadians,
    0,
    true
  );

  ctx.lineTo(x + width, y + rounded);

  ctx.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true);

  ctx.lineTo(x + rounded, y);
}
