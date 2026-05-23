import { useEffect, useRef } from "react";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/game/constants";
import type { BrickState, CoinState, EnemyState, GameSnapshot, Surface } from "@/game/types";

interface GameCanvasProps {
  snapshot: GameSnapshot;
}

function drawBackground(ctx: CanvasRenderingContext2D, cameraX: number) {
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEWPORT_HEIGHT);
  gradient.addColorStop(0, "#67d7f7");
  gradient.addColorStop(0.7, "#a7e8ff");
  gradient.addColorStop(1, "#d5f6ff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

  ctx.fillStyle = "#fff6b7";
  ctx.fillRect(52, 42, 56, 56);

  for (let index = 0; index < 7; index += 1) {
    const cloudX = ((index * 220 - cameraX * 0.35) % (VIEWPORT_WIDTH + 160)) - 80;
    const baseY = 48 + (index % 3) * 54;
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.fillRect(cloudX, baseY, 60, 20);
    ctx.fillRect(cloudX + 18, baseY - 16, 42, 18);
    ctx.fillRect(cloudX + 36, baseY, 44, 20);
  }

  for (let index = 0; index < 6; index += 1) {
    const hillX = index * 280 - cameraX * 0.2;
    const hillHeight = 120 + (index % 2) * 30;
    ctx.fillStyle = index % 2 === 0 ? "#6ac26a" : "#5ea95b";
    ctx.fillRect(hillX, VIEWPORT_HEIGHT - hillHeight - 72, 160, hillHeight);
    ctx.fillStyle = "#88d989";
    ctx.fillRect(hillX + 16, VIEWPORT_HEIGHT - hillHeight - 54, 32, 24);
  }
}

function drawSurface(ctx: CanvasRenderingContext2D, surface: Surface, cameraX: number) {
  const x = surface.x - cameraX;
  const topColor = surface.kind === "ground" ? "#70d15f" : "#78b45e";
  const bodyColor = surface.kind === "ground" ? "#c87c3c" : "#a76434";

  ctx.fillStyle = topColor;
  ctx.fillRect(x, surface.y, surface.width, 18);
  ctx.fillStyle = bodyColor;
  ctx.fillRect(x, surface.y + 18, surface.width, surface.height - 18);

  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  for (let stripe = 0; stripe < surface.width; stripe += 24) {
    ctx.fillRect(x + stripe, surface.y + 18, 6, surface.height - 18);
  }
}

function drawBrick(ctx: CanvasRenderingContext2D, brick: BrickState, cameraX: number) {
  const x = brick.x - cameraX;
  const y = brick.y + (brick.hit ? 6 : 0);
  const baseColor = brick.kind === "question" && !brick.hit ? "#f3b03f" : "#b86633";
  const accentColor = brick.kind === "question" && !brick.hit ? "#ffe28a" : "#d68648";

  ctx.fillStyle = baseColor;
  ctx.fillRect(x, y, brick.width, brick.height);
  ctx.fillStyle = accentColor;
  ctx.fillRect(x + 4, y + 4, brick.width - 8, 8);
  ctx.fillRect(x + 4, y + brick.height - 12, brick.width - 8, 8);

  if (brick.kind === "question" && !brick.hit) {
    ctx.fillStyle = "#fff2bf";
    ctx.fillRect(x + 18, y + 12, 12, 8);
    ctx.fillRect(x + 30, y + 20, 6, 8);
    ctx.fillRect(x + 18, y + 28, 6, 8);
    ctx.fillRect(x + 18, y + 36, 6, 6);
  }
}

function drawCoin(ctx: CanvasRenderingContext2D, coin: CoinState, cameraX: number, timer: number) {
  if (coin.collected) {
    return;
  }

  const x = coin.x - cameraX;
  const shimmer = Math.sin(timer * 6 + coin.x * 0.01) * 3;
  ctx.fillStyle = "#ffd451";
  ctx.fillRect(x + 6, coin.y + shimmer, 12, 24);
  ctx.fillStyle = "#fff0aa";
  ctx.fillRect(x + 10, coin.y + 4 + shimmer, 4, 16);
}

function drawEnemy(ctx: CanvasRenderingContext2D, enemy: EnemyState, cameraX: number) {
  if (!enemy.alive) {
    return;
  }

  const x = enemy.x - cameraX;
  ctx.fillStyle = "#8f4d28";
  ctx.fillRect(x + 4, enemy.y + 10, enemy.width - 8, enemy.height - 10);
  ctx.fillStyle = "#efdfc0";
  ctx.fillRect(x + 10, enemy.y + 18, 6, 6);
  ctx.fillRect(x + 22, enemy.y + 18, 6, 6);
  ctx.fillStyle = "#2e1a0d";
  ctx.fillRect(x + 4, enemy.y + enemy.height - 6, 12, 6);
  ctx.fillRect(x + 22, enemy.y + enemy.height - 6, 12, 6);
}

function drawFlag(ctx: CanvasRenderingContext2D, snapshot: GameSnapshot) {
  const flagX = snapshot.level.flag.x - snapshot.cameraX;
  ctx.fillStyle = "#ecf0f2";
  ctx.fillRect(flagX, snapshot.level.flag.y, 8, snapshot.level.flag.height);
  ctx.fillStyle = "#31c857";
  ctx.fillRect(flagX + 8, snapshot.level.flag.y + 20, 52, 36);
}

function drawPlayer(ctx: CanvasRenderingContext2D, snapshot: GameSnapshot) {
  const { player } = snapshot;
  const x = player.x - snapshot.cameraX;
  const alpha = player.invincibleMs > 0 && Math.floor(player.invincibleMs / 100) % 2 === 0 ? 0.45 : 1;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#de4638";
  ctx.fillRect(x + 6, player.y, player.width - 12, 12);
  ctx.fillRect(x + 2, player.y + 10, player.width - 4, 12);
  ctx.fillStyle = "#3453d0";
  ctx.fillRect(x + 4, player.y + 22, player.width - 8, player.height - 22);
  ctx.fillStyle = "#f4c29f";
  ctx.fillRect(x + 10, player.y + 10, player.width - 20, 12);
  ctx.fillStyle = "#23160d";
  const eyeX = player.facing === "right" ? x + 24 : x + 12;
  ctx.fillRect(eyeX, player.y + 14, 4, 4);
  ctx.restore();
}

export function GameCanvas({ snapshot }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    drawBackground(context, snapshot.cameraX);
    snapshot.level.surfaces.forEach((surface) => drawSurface(context, surface, snapshot.cameraX));
    snapshot.level.bricks.forEach((brick) => drawBrick(context, brick, snapshot.cameraX));
    snapshot.level.coins.forEach((coin) => drawCoin(context, coin, snapshot.cameraX, snapshot.timer));
    snapshot.level.enemies.forEach((enemy) => drawEnemy(context, enemy, snapshot.cameraX));
    drawFlag(context, snapshot);
    drawPlayer(context, snapshot);

    context.fillStyle = "rgba(255, 255, 255, 0.08)";
    for (let line = 0; line < VIEWPORT_HEIGHT; line += 4) {
      context.fillRect(0, line, VIEWPORT_WIDTH, 1);
    }
  }, [snapshot]);

  return (
    <canvas
      ref={canvasRef}
      width={VIEWPORT_WIDTH}
      height={VIEWPORT_HEIGHT}
      className="h-auto w-full max-w-[960px] rounded-none border-4 border-zinc-950 bg-sky-200 shadow-[10px_10px_0_rgba(12,12,12,0.75)] pixelated"
      aria-label="马里奥游戏画布"
    />
  );
}
