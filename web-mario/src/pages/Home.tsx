import { ArrowRight, Gamepad2, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { STORAGE_KEY } from "@/game/constants";

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="pixel-panel flex flex-col gap-4 p-5 text-zinc-100">
      <div className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-zinc-950 bg-zinc-950/70 text-amber-300">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-sm text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{description}</p>
      </div>
    </div>
  );
}

function getBestScore() {
  if (typeof window === "undefined") {
    return 0;
  }

  return Number(window.localStorage.getItem(STORAGE_KEY) || 0);
}

export default function Home() {
  const bestScore = getBestScore();

  return (
    <main className="noise-bg min-h-screen overflow-hidden bg-[#59c3f4] text-zinc-950">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-12 lg:px-10">
        <div className="absolute left-0 top-12 h-24 w-24 rounded-[40px] border-4 border-white/50 bg-white/40 blur-sm" />
        <div className="absolute right-16 top-20 h-20 w-32 rounded-[40px] border-4 border-white/40 bg-white/50 blur-sm" />
        <div className="absolute bottom-0 left-[-6%] h-56 w-[40%] rounded-t-[120px] border-4 border-emerald-950/20 bg-[#71d968]" />
        <div className="absolute bottom-0 right-[-8%] h-72 w-[46%] rounded-t-[160px] border-4 border-emerald-950/20 bg-[#58bc5b]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-none border-4 border-zinc-950 bg-white/75 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-zinc-700 shadow-[6px_6px_0_rgba(12,12,12,0.72)]">
              <Sparkles className="h-4 w-4 text-amber-500" />
              复古像素横版闯关
            </div>

            <div className="space-y-5">
              <p className="font-display text-[clamp(2.4rem,7vw,5.6rem)] uppercase leading-[0.92] text-white text-shadow-pixel">
                Web
                <br />
                Mario
              </p>
              <p className="max-w-xl text-base leading-7 text-zinc-900/80 lg:text-lg">
                浏览器直接开玩的一关版马里奥。跳过坑洞、顶问号砖、踩掉蘑菇怪，沿着像素山丘一路冲到终点旗帜。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/game" className="pixel-button text-sm text-zinc-100">
                开始闯关
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="pixel-panel flex items-center gap-3 px-4 py-3 text-zinc-100">
                <Trophy className="h-4 w-4 text-amber-300" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">最佳得分</p>
                  <p className="font-display text-sm text-white">{bestScore}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-zinc-100">
              <div className="pixel-chip">方向键 / A D 移动</div>
              <div className="pixel-chip">W / Space 跳跃</div>
              <div className="pixel-chip">P 暂停</div>
            </div>
          </div>

          <div className="pixel-panel relative overflow-hidden p-6 text-zinc-100 shadow-[12px_12px_0_rgba(12,12,12,0.72)]">
            <div className="absolute inset-x-0 top-0 h-3 bg-amber-300" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title="经典手感"
                description="重力、跳跃、踩踏和横向卷轴都围绕单关体验打磨，打开网页就能马上上手。"
                icon={<Gamepad2 className="h-5 w-5" />}
              />
              <FeatureCard
                title="像素氛围"
                description="天空蓝、草地绿、砖块橙棕和 CRT 扫描线组合出一眼能认出的复古舞台。"
                icon={<Sparkles className="h-5 w-5" />}
              />
            </div>
            <div className="mt-4 rounded-none border-4 border-zinc-950 bg-zinc-950/80 p-4 text-sm leading-6 text-zinc-300">
              <p className="font-display text-sm text-white">本关目标</p>
              <p className="mt-2">收集金币，避开坑洞，用跳跃踩掉敌人，最后摸到最右侧的旗帜即可通关。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
