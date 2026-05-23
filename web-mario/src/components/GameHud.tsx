import { Coins, Heart, Pause, Timer, Volume2, VolumeX } from "lucide-react";
import type { GameSnapshot } from "@/game/types";

interface GameHudProps {
  snapshot: GameSnapshot;
  onToggleAudio: () => void;
}

function HudCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="pixel-panel flex min-w-[120px] items-center gap-3 px-4 py-3 text-zinc-100">
      <div className="rounded-none border-2 border-zinc-950 bg-zinc-950/70 p-2 text-amber-300">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{label}</p>
        <p className="font-display text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

export function GameHud({ snapshot, onToggleAudio }: GameHudProps) {
  return (
    <div className="flex w-full max-w-[960px] flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-3">
        <HudCard label="得分" value={snapshot.score} icon={<Coins className="h-4 w-4" />} />
        <HudCard label="金币" value={snapshot.coins} icon={<Coins className="h-4 w-4" />} />
        <HudCard label="生命" value={snapshot.player.lives} icon={<Heart className="h-4 w-4" />} />
        <HudCard label="时间" value={Math.ceil(snapshot.timer)} icon={<Timer className="h-4 w-4" />} />
      </div>

      <div className="flex items-center gap-3">
        <button type="button" className="pixel-button text-xs text-zinc-100" onClick={onToggleAudio}>
          {snapshot.audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {snapshot.audioEnabled ? "音效开" : "音效关"}
        </button>
        <div className="pixel-panel flex items-center gap-2 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-zinc-300">
          <Pause className="h-4 w-4 text-amber-300" />
          P 暂停
        </div>
      </div>
    </div>
  );
}
