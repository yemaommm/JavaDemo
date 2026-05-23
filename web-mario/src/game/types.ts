export type GameStatus = "idle" | "running" | "paused" | "won" | "lost";
export type GameEvent = "jump" | "coin" | "brick" | "stomp" | "hit" | "win" | "lose";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Surface extends Rect {
  id: string;
  kind: "ground" | "platform";
}

export interface PlayerState extends Rect {
  vx: number;
  vy: number;
  facing: "left" | "right";
  onGround: boolean;
  lives: number;
  invincibleMs: number;
}

export interface EnemyState extends Rect {
  id: string;
  direction: -1 | 1;
  vx: number;
  vy: number;
  alive: boolean;
  onGround: boolean;
}

export interface CoinState extends Rect {
  id: string;
  collected: boolean;
}

export interface BrickState extends Rect {
  id: string;
  kind: "question" | "solid";
  hit: boolean;
}

export interface FlagState {
  x: number;
  y: number;
  height: number;
}

export interface LevelState {
  width: number;
  height: number;
  surfaces: Surface[];
  enemies: EnemyState[];
  coins: CoinState[];
  bricks: BrickState[];
  flag: FlagState;
}

export interface GameSnapshot {
  status: GameStatus;
  score: number;
  coins: number;
  timer: number;
  cameraX: number;
  bestScore: number;
  audioEnabled: boolean;
  player: PlayerState;
  level: LevelState;
  lastEvent: GameEvent | null;
  eventSignal: number;
}

export interface InputState {
  left: boolean;
  right: boolean;
  jumpQueued: boolean;
}
