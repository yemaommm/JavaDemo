import { create } from "zustand";
import {
  ENEMY_SPEED,
  GRAVITY,
  INITIAL_LIVES,
  INVINCIBLE_MS,
  JUMP_SPEED,
  LEVEL_TIME,
  MAX_FALL_SPEED,
  PLAYER_SPEED,
  STORAGE_KEY,
  STOMP_BOUNCE,
  VIEWPORT_WIDTH,
  WORLD_HEIGHT,
} from "@/game/constants";
import { createInitialPlayer, createLevelState } from "@/game/level";
import { clamp, hasSupport, intersects, isStomp, moveRectX, moveRectY, overlapsHorizontally } from "@/game/physics";
import type { BrickState, EnemyState, GameEvent, GameSnapshot, InputState, LevelState, Rect } from "@/game/types";

interface GameStoreState {
  snapshot: GameSnapshot;
  input: InputState;
  setMovement: (direction: "left" | "right", pressed: boolean) => void;
  queueJump: () => void;
  clearJump: () => void;
  togglePause: () => void;
  toggleAudio: () => void;
  resetGame: () => void;
  step: (deltaMs: number) => void;
}

function readBestScore() {
  if (typeof window === "undefined") {
    return 0;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  return storedValue ? Number(storedValue) || 0 : 0;
}

function persistBestScore(score: number) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, String(score));
}

function cloneLevel(level: LevelState): LevelState {
  return {
    ...level,
    enemies: level.enemies.map((enemy) => ({ ...enemy })),
    coins: level.coins.map((coin) => ({ ...coin })),
    bricks: level.bricks.map((brick) => ({ ...brick })),
  };
}

function getBricksAsSolids(bricks: BrickState[]): Rect[] {
  return bricks.map(({ x, y, width, height }) => ({ x, y, width, height }));
}

function getSolids(level: LevelState): Rect[] {
  return [...level.surfaces, ...getBricksAsSolids(level.bricks)];
}

function checkpointForX(x: number) {
  if (x > 2200) {
    return 2200;
  }

  if (x > 1400) {
    return 1440;
  }

  if (x > 800) {
    return 920;
  }

  return 96;
}

function emitEvent(snapshot: GameSnapshot, event: GameEvent | null): GameSnapshot {
  if (!event) {
    return { ...snapshot, lastEvent: null };
  }

  return {
    ...snapshot,
    lastEvent: event,
    eventSignal: snapshot.eventSignal + 1,
  };
}

function buildInitialSnapshot(): GameSnapshot {
  return {
    status: "idle",
    score: 0,
    coins: 0,
    timer: LEVEL_TIME,
    cameraX: 0,
    bestScore: readBestScore(),
    audioEnabled: true,
    player: createInitialPlayer(INITIAL_LIVES),
    level: createLevelState(),
    lastEvent: null,
    eventSignal: 0,
  };
}

function applyFailure(snapshot: GameSnapshot, event: GameEvent): GameSnapshot {
  const nextBestScore = Math.max(snapshot.bestScore, snapshot.score);
  persistBestScore(nextBestScore);
  return emitEvent(
    {
      ...snapshot,
      status: "lost",
      bestScore: nextBestScore,
      player: { ...snapshot.player, vx: 0, vy: 0 },
    },
    event,
  );
}

function damagePlayer(snapshot: GameSnapshot): GameSnapshot {
  if (snapshot.player.lives <= 1) {
    return applyFailure(snapshot, "lose");
  }

  const remainingLives = snapshot.player.lives - 1;
  const respawnX = checkpointForX(snapshot.player.x);
  const respawnedPlayer = {
    ...createInitialPlayer(remainingLives),
    x: respawnX,
    invincibleMs: INVINCIBLE_MS,
  };

  return emitEvent(
    {
      ...snapshot,
      player: respawnedPlayer,
    },
    "hit",
  );
}

function updateBestScore(snapshot: GameSnapshot): GameSnapshot {
  const nextBestScore = Math.max(snapshot.bestScore, snapshot.score);
  if (nextBestScore !== snapshot.bestScore) {
    persistBestScore(nextBestScore);
  }
  return { ...snapshot, bestScore: nextBestScore };
}

function updateEnemy(enemy: EnemyState, solids: Rect[], deltaSeconds: number): EnemyState {
  if (!enemy.alive) {
    return enemy;
  }

  const nextEnemy = { ...enemy };
  nextEnemy.vx = nextEnemy.direction * ENEMY_SPEED;
  nextEnemy.vy = clamp(nextEnemy.vy + GRAVITY * deltaSeconds, -MAX_FALL_SPEED, MAX_FALL_SPEED);

  const horizontal = moveRectX(nextEnemy, nextEnemy.vx * deltaSeconds, solids);
  nextEnemy.x = horizontal.rect.x;
  if (horizontal.hitWall) {
    nextEnemy.direction = nextEnemy.direction === 1 ? -1 : 1;
    nextEnemy.vx = nextEnemy.direction * ENEMY_SPEED;
  }

  const vertical = moveRectY(nextEnemy, nextEnemy.vy * deltaSeconds, solids);
  nextEnemy.y = vertical.rect.y;
  nextEnemy.onGround = vertical.onGround;
  if (vertical.onGround || vertical.hitCeiling) {
    nextEnemy.vy = 0;
  }

  if (nextEnemy.onGround) {
    const lookAhead: Rect = {
      x: nextEnemy.x + (nextEnemy.direction === 1 ? nextEnemy.width + 2 : -2),
      y: nextEnemy.y,
      width: 2,
      height: nextEnemy.height,
    };

    if (!hasSupport(lookAhead, solids)) {
      nextEnemy.direction = nextEnemy.direction === 1 ? -1 : 1;
      nextEnemy.vx = nextEnemy.direction * ENEMY_SPEED;
    }
  }

  return nextEnemy;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  snapshot: buildInitialSnapshot(),
  input: {
    left: false,
    right: false,
    jumpQueued: false,
  },
  setMovement: (direction, pressed) => {
    set((state) => ({
      input: {
        ...state.input,
        [direction]: pressed,
      },
    }));
  },
  queueJump: () => {
    set((state) => ({
      input: {
        ...state.input,
        jumpQueued: true,
      },
    }));
  },
  clearJump: () => {
    set((state) => ({
      input: {
        ...state.input,
        jumpQueued: false,
      },
    }));
  },
  togglePause: () => {
    set((state) => ({
      snapshot: {
        ...state.snapshot,
        status: state.snapshot.status === "paused" ? "running" : state.snapshot.status === "running" ? "paused" : state.snapshot.status,
      },
    }));
  },
  toggleAudio: () => {
    set((state) => ({
      snapshot: {
        ...state.snapshot,
        audioEnabled: !state.snapshot.audioEnabled,
      },
    }));
  },
  resetGame: () => {
    set((state) => ({
      input: {
        left: false,
        right: false,
        jumpQueued: false,
      },
      snapshot: {
        ...buildInitialSnapshot(),
        audioEnabled: state.snapshot.audioEnabled,
        bestScore: readBestScore(),
        status: "running",
        level: cloneLevel(createLevelState()),
      },
    }));
  },
  step: (deltaMs) => {
    const { input, snapshot } = get();
    if (snapshot.status !== "running") {
      if (input.jumpQueued) {
        get().clearJump();
      }
      return;
    }

    const deltaSeconds = Math.min(deltaMs, 32) / 1000;
    let nextSnapshot: GameSnapshot = {
      ...snapshot,
      player: { ...snapshot.player },
      level: cloneLevel(snapshot.level),
      timer: Math.max(0, snapshot.timer - deltaSeconds),
      lastEvent: null,
    };
    let eventToPlay: GameEvent | null = null;

    const player = nextSnapshot.player;
    player.invincibleMs = Math.max(0, player.invincibleMs - deltaMs);

    const direction = (input.left ? -1 : 0) + (input.right ? 1 : 0);
    player.vx = direction * PLAYER_SPEED;
    if (direction < 0) {
      player.facing = "left";
    }
    if (direction > 0) {
      player.facing = "right";
    }

    if (input.jumpQueued && player.onGround) {
      player.vy = -JUMP_SPEED;
      player.onGround = false;
      eventToPlay = "jump";
    }

    player.vy = clamp(player.vy + GRAVITY * deltaSeconds, -MAX_FALL_SPEED, MAX_FALL_SPEED);

    const previousPlayer = { ...player };
    const solidsBeforeMovement = getSolids(nextSnapshot.level);

    const movedX = moveRectX(player, player.vx * deltaSeconds, solidsBeforeMovement);
    player.x = movedX.rect.x;

    const verticalAttempt = { ...player, y: player.y + player.vy * deltaSeconds };
    const bumpedBrick = nextSnapshot.level.bricks.find((brick) => {
      if (brick.hit || brick.kind !== "question") {
        return false;
      }

      return previousPlayer.y >= brick.y + brick.height && verticalAttempt.y <= brick.y + brick.height && overlapsHorizontally(verticalAttempt, brick);
    });

    const movedY = moveRectY(player, player.vy * deltaSeconds, solidsBeforeMovement);
    player.y = movedY.rect.y;
    player.onGround = movedY.onGround;

    if (movedY.onGround || movedY.hitCeiling) {
      player.vy = 0;
    }

    if (movedY.hitCeiling && bumpedBrick) {
      bumpedBrick.hit = true;
      nextSnapshot.score += 75;
      nextSnapshot.coins += 1;
      eventToPlay = eventToPlay ?? "brick";
    }

    for (const coin of nextSnapshot.level.coins) {
      if (!coin.collected && intersects(player, coin)) {
        coin.collected = true;
        nextSnapshot.coins += 1;
        nextSnapshot.score += 50;
        eventToPlay = "coin";
      }
    }

    const solidsAfterBricks = getSolids(nextSnapshot.level);
    nextSnapshot.level.enemies = nextSnapshot.level.enemies.map((enemy) => updateEnemy(enemy, solidsAfterBricks, deltaSeconds));

    for (const enemy of nextSnapshot.level.enemies) {
      if (!enemy.alive || !intersects(player, enemy)) {
        continue;
      }

      if (player.vy >= 0 && isStomp(previousPlayer, player, enemy)) {
        enemy.alive = false;
        player.vy = -STOMP_BOUNCE;
        nextSnapshot.score += 120;
        eventToPlay = "stomp";
        continue;
      }

      if (player.invincibleMs <= 0) {
        set({
          snapshot: damagePlayer(updateBestScore(nextSnapshot)),
          input: { ...input, jumpQueued: false },
        });
        return;
      }
    }

    if (player.y > WORLD_HEIGHT + 120 || nextSnapshot.timer <= 0) {
      set({
        snapshot: damagePlayer(updateBestScore(nextSnapshot)),
        input: { ...input, jumpQueued: false },
      });
      return;
    }

    if (player.x + player.width >= nextSnapshot.level.flag.x) {
      nextSnapshot.status = "won";
      nextSnapshot.score += Math.floor(nextSnapshot.timer * 8);
      eventToPlay = "win";
    }

    nextSnapshot.cameraX = clamp(player.x - VIEWPORT_WIDTH * 0.35, 0, nextSnapshot.level.width - VIEWPORT_WIDTH);
    nextSnapshot = updateBestScore(nextSnapshot);
    nextSnapshot = emitEvent(nextSnapshot, eventToPlay);

    set({
      snapshot: nextSnapshot,
      input: {
        ...input,
        jumpQueued: false,
      },
    });
  },
}));
