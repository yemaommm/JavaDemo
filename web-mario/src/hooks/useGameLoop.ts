import { useEffect } from "react";

export function useGameLoop(step: (deltaMs: number) => void) {
  useEffect(() => {
    let frameId = 0;
    let previousTime = performance.now();

    const update = (now: number) => {
      const delta = now - previousTime;
      previousTime = now;
      step(delta);
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frameId);
  }, [step]);
}
