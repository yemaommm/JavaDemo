import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { GameCanvas } from "@/components/GameCanvas";
import { GameHud } from "@/components/GameHud";
import { OverlayPanel } from "@/components/OverlayPanel";
import { playGameSound } from "@/game/audio";
import { useGameStore } from "@/game/store";
import { useGameLoop } from "@/hooks/useGameLoop";

const jumpKeys = new Set(["w", "W", "ArrowUp", " ", "Spacebar"]);
const leftKeys = new Set(["a", "A", "ArrowLeft"]);
const rightKeys = new Set(["d", "D", "ArrowRight"]);

export default function Game() {
  const snapshot = useGameStore((state) => state.snapshot);
  const setMovement = useGameStore((state) => state.setMovement);
  const queueJump = useGameStore((state) => state.queueJump);
  const clearJump = useGameStore((state) => state.clearJump);
  const togglePause = useGameStore((state) => state.togglePause);
  const toggleAudio = useGameStore((state) => state.toggleAudio);
  const resetGame = useGameStore((state) => state.resetGame);
  const step = useGameStore((state) => state.step);

  useGameLoop(step);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat && event.key.toLowerCase() !== "p") {
        return;
      }

      if (leftKeys.has(event.key)) {
        event.preventDefault();
        setMovement("left", true);
      }

      if (rightKeys.has(event.key)) {
        event.preventDefault();
        setMovement("right", true);
      }

      if (jumpKeys.has(event.key)) {
        event.preventDefault();
        queueJump();
      }

      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        togglePause();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (leftKeys.has(event.key)) {
        setMovement("left", false);
      }

      if (rightKeys.has(event.key)) {
        setMovement("right", false);
      }

      if (jumpKeys.has(event.key)) {
        clearJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [clearJump, queueJump, setMovement, togglePause]);

  useEffect(() => {
    if (snapshot.lastEvent) {
      playGameSound(snapshot.lastEvent, snapshot.audioEnabled);
    }
  }, [snapshot.audioEnabled, snapshot.eventSignal, snapshot.lastEvent]);

  return (
    <main className="noise-bg min-h-screen bg-[#10172b] px-4 py-6 text-zinc-100 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5">
        <div className="flex w-full max-w-[960px] items-center justify-between gap-4">
          <Link to="/" className="pixel-button text-xs text-zinc-100">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
          <div className="pixel-panel px-4 py-3 text-right">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">终点目标</p>
            <p className="font-display text-sm text-white">一路向右摸旗帜</p>
          </div>
        </div>

        <GameHud snapshot={snapshot} onToggleAudio={toggleAudio} />

        <div className="relative w-full max-w-[960px]">
          <GameCanvas snapshot={snapshot} />
          <OverlayPanel
            status={snapshot.status}
            score={snapshot.score}
            coins={snapshot.coins}
            bestScore={snapshot.bestScore}
            onRestart={resetGame}
          />
        </div>

        <div className="grid w-full max-w-[960px] gap-3 md:grid-cols-3">
          <div className="pixel-panel p-4 text-sm leading-6 text-zinc-300">
            <p className="font-display text-xs text-white">操作</p>
            <p className="mt-2">方向键或 A / D 移动，W 或 Space 跳跃，P 暂停。</p>
          </div>
          <div className="pixel-panel p-4 text-sm leading-6 text-zinc-300">
            <p className="font-display text-xs text-white">技巧</p>
            <p className="mt-2">从上方踩敌人更安全，顶到问号砖还能额外补金币和分数。</p>
          </div>
          <div className="pixel-panel p-4 text-sm leading-6 text-zinc-300">
            <p className="font-display text-xs text-white">提醒</p>
            <p className="mt-2">如果被敌人撞到会掉命，掉进坑洞则立即重生，耗尽生命游戏结束。</p>
          </div>
        </div>
      </div>
    </main>
  );
}
