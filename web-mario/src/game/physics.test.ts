import { describe, expect, it } from "vitest";
import { intersects, isStomp, moveRectX, moveRectY } from "@/game/physics";

describe("physics helpers", () => {
  it("detects overlap between rectangles", () => {
    expect(intersects({ x: 0, y: 0, width: 20, height: 20 }, { x: 10, y: 10, width: 20, height: 20 })).toBe(true);
    expect(intersects({ x: 0, y: 0, width: 20, height: 20 }, { x: 40, y: 40, width: 20, height: 20 })).toBe(false);
  });

  it("stops horizontal movement at walls", () => {
    const result = moveRectX(
      { x: 10, y: 10, width: 16, height: 16 },
      24,
      [{ x: 32, y: 0, width: 16, height: 64 }],
    );

    expect(result.hitWall).toBe(true);
    expect(result.rect.x).toBe(16);
  });

  it("lands on top of floors", () => {
    const result = moveRectY(
      { x: 10, y: 10, width: 16, height: 16 },
      30,
      [{ x: 0, y: 40, width: 80, height: 20 }],
    );

    expect(result.onGround).toBe(true);
    expect(result.rect.y).toBe(24);
  });

  it("recognizes a stomp from above", () => {
    const stomped = isStomp(
      { x: 20, y: 10, width: 16, height: 16 },
      { x: 20, y: 26, width: 16, height: 16 },
      { x: 18, y: 40, width: 20, height: 20 },
    );

    expect(stomped).toBe(true);
  });
});
