import { Link } from "react-router-dom";
import type { GameStatus } from "@/game/types";

interface OverlayPanelProps {
  status: GameStatus;
  score: number;
  coins: number;
  bestScore: number;
  onRestart: () => void;
}

const contentMap = {
  paused: {
    title: "暂停中",
    description: "按 P 继续，或者重新开始这一关。",
  },
  won: {
    title: "通关成功",
    description: "你已经摸到旗帜，金币和剩余时间都换成了荣耀分数。",
  },
  lost: {
    title: "挑战失败",
    description: "蘑菇王国还在等你，再来一次就能更稳地过关。",
  },
} as const;

export function OverlayPanel({ status, score, coins, bestScore, onRestart }: OverlayPanelProps) {
  if (status !== "paused" && status !== "won" && status !== "lost") {
    return null;
  }

  const content = contentMap[status];

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/55 px-4 backdrop-blur-[2px]">
      <div className="pixel-panel w-full max-w-md px-6 py-8 text-center text-zinc-100">
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300">网页版马里奥</p>
        <h2 className="mt-4 font-display text-2xl text-white">{content.title}</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{content.description}</p>
        <div className="mt-6 grid grid-cols-3 gap-3 text-left text-xs text-zinc-300">
          <div className="rounded-none border-2 border-zinc-950 bg-zinc-950/60 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">得分</p>
            <p className="mt-2 font-display text-base text-white">{score}</p>
          </div>
          <div className="rounded-none border-2 border-zinc-950 bg-zinc-950/60 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">金币</p>
            <p className="mt-2 font-display text-base text-white">{coins}</p>
          </div>
          <div className="rounded-none border-2 border-zinc-950 bg-zinc-950/60 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">最佳</p>
            <p className="mt-2 font-display text-base text-white">{bestScore}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={onRestart} className="pixel-button text-sm text-zinc-100">
            重新开始
          </button>
          <Link to="/" className="pixel-button text-sm text-zinc-100">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
