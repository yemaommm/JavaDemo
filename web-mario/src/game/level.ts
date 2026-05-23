import { INITIAL_LIVES, PLAYER_HEIGHT, PLAYER_WIDTH, TILE_SIZE, WORLD_HEIGHT, WORLD_WIDTH } from "@/game/constants";
import type { BrickState, CoinState, EnemyState, FlagState, LevelState, PlayerState, Surface } from "@/game/types";

export function createInitialPlayer(lives = INITIAL_LIVES): PlayerState {
  return {
    x: 96,
    y: WORLD_HEIGHT - TILE_SIZE * 2 - PLAYER_HEIGHT,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    vx: 0,
    vy: 0,
    facing: "right",
    onGround: false,
    lives,
    invincibleMs: 0,
  };
}

export function createLevelState(): LevelState {
  const surfaces: Surface[] = [
    { id: "ground-a", x: 0, y: 624, width: 720, height: 96, kind: "ground" },
    { id: "ground-b", x: 864, y: 624, width: 520, height: 96, kind: "ground" },
    { id: "ground-c", x: 1540, y: 624, width: 460, height: 96, kind: "ground" },
    { id: "ground-d", x: 2130, y: 624, width: 820, height: 96, kind: "ground" },
    { id: "ground-e", x: 3040, y: 624, width: 360, height: 96, kind: "ground" },
    { id: "plat-a", x: 340, y: 500, width: 144, height: 24, kind: "platform" },
    { id: "plat-b", x: 1040, y: 500, width: 144, height: 24, kind: "platform" },
    { id: "plat-c", x: 1700, y: 472, width: 192, height: 24, kind: "platform" },
    { id: "plat-d", x: 2360, y: 520, width: 144, height: 24, kind: "platform" },
    { id: "plat-e", x: 2840, y: 460, width: 144, height: 24, kind: "platform" },
  ];

  const coins: CoinState[] = [
    { id: "coin-1", x: 372, y: 444, width: 24, height: 24, collected: false },
    { id: "coin-2", x: 1088, y: 444, width: 24, height: 24, collected: false },
    { id: "coin-3", x: 1760, y: 416, width: 24, height: 24, collected: false },
    { id: "coin-4", x: 2440, y: 464, width: 24, height: 24, collected: false },
    { id: "coin-5", x: 2888, y: 404, width: 24, height: 24, collected: false },
    { id: "coin-6", x: 1290, y: 560, width: 24, height: 24, collected: false },
    { id: "coin-7", x: 1960, y: 560, width: 24, height: 24, collected: false },
  ];

  const bricks: BrickState[] = [
    { id: "brick-1", x: 420, y: 404, width: 48, height: 48, kind: "question", hit: false },
    { id: "brick-2", x: 468, y: 404, width: 48, height: 48, kind: "solid", hit: false },
    { id: "brick-3", x: 516, y: 404, width: 48, height: 48, kind: "question", hit: false },
    { id: "brick-4", x: 1180, y: 404, width: 48, height: 48, kind: "question", hit: false },
    { id: "brick-5", x: 1852, y: 376, width: 48, height: 48, kind: "question", hit: false },
    { id: "brick-6", x: 1900, y: 376, width: 48, height: 48, kind: "solid", hit: false },
  ];

  const enemies: EnemyState[] = [
    { id: "goomba-1", x: 540, y: 584, width: 38, height: 40, direction: -1, vx: -70, vy: 0, alive: true, onGround: false },
    { id: "goomba-2", x: 1160, y: 584, width: 38, height: 40, direction: -1, vx: -70, vy: 0, alive: true, onGround: false },
    { id: "goomba-3", x: 1760, y: 432, width: 38, height: 40, direction: -1, vx: -70, vy: 0, alive: true, onGround: false },
    { id: "goomba-4", x: 2480, y: 584, width: 38, height: 40, direction: -1, vx: -70, vy: 0, alive: true, onGround: false },
  ];

  const flag: FlagState = {
    x: WORLD_WIDTH - 180,
    y: 224,
    height: 400,
  };

  return {
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    surfaces,
    enemies,
    coins,
    bricks,
    flag,
  };
}
