import type { Rect } from "@/game/types";

export interface HorizontalCollisionResult {
  rect: Rect;
  hitWall: boolean;
}

export interface VerticalCollisionResult {
  rect: Rect;
  onGround: boolean;
  hitCeiling: boolean;
}

export function intersects(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export function overlapsHorizontally(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function moveRectX(rect: Rect, deltaX: number, solids: Rect[]): HorizontalCollisionResult {
  const moved = { ...rect, x: rect.x + deltaX };

  for (const solid of solids) {
    if (!intersects(moved, solid)) {
      continue;
    }

    if (deltaX > 0) {
      moved.x = solid.x - rect.width;
    } else if (deltaX < 0) {
      moved.x = solid.x + solid.width;
    }

    return { rect: moved, hitWall: true };
  }

  return { rect: moved, hitWall: false };
}

export function moveRectY(rect: Rect, deltaY: number, solids: Rect[]): VerticalCollisionResult {
  const moved = { ...rect, y: rect.y + deltaY };
  let onGround = false;
  let hitCeiling = false;

  for (const solid of solids) {
    if (!intersects(moved, solid)) {
      continue;
    }

    if (deltaY > 0) {
      moved.y = solid.y - rect.height;
      onGround = true;
    } else if (deltaY < 0) {
      moved.y = solid.y + solid.height;
      hitCeiling = true;
    }

    return { rect: moved, onGround, hitCeiling };
  }

  return { rect: moved, onGround, hitCeiling };
}

export function isStomp(previousPlayer: Rect, currentPlayer: Rect, enemy: Rect): boolean {
  const wasAboveEnemy = previousPlayer.y + previousPlayer.height <= enemy.y + 8;
  const crossedEnemyTop = currentPlayer.y + currentPlayer.height >= enemy.y;
  return wasAboveEnemy && crossedEnemyTop && overlapsHorizontally(currentPlayer, enemy);
}

export function hasSupport(rect: Rect, solids: Rect[]): boolean {
  const probe: Rect = {
    x: rect.x + 4,
    y: rect.y + rect.height + 2,
    width: rect.width - 8,
    height: 4,
  };

  return solids.some((solid) => intersects(probe, solid));
}
