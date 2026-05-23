import type { GameEvent } from "@/game/types";

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!audioContext) {
    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    audioContext = AudioContextCtor ? new AudioContextCtor() : null;
  }

  return audioContext;
}

function playTone(startAt: number, frequency: number, duration: number, type: OscillatorType, gainValue: number) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);

  gain.gain.setValueAtTime(gainValue, startAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

export function playGameSound(event: GameEvent, enabled: boolean) {
  if (!enabled) {
    return;
  }

  const context = getAudioContext();
  if (!context) {
    return;
  }

  if (context.state === "suspended") {
    void context.resume();
  }

  const now = context.currentTime;

  if (event === "jump") {
    playTone(now, 320, 0.12, "square", 0.04);
    playTone(now + 0.05, 440, 0.08, "square", 0.03);
  }

  if (event === "coin" || event === "brick") {
    playTone(now, 740, 0.06, "triangle", 0.04);
    playTone(now + 0.06, 988, 0.08, "triangle", 0.03);
  }

  if (event === "stomp") {
    playTone(now, 180, 0.1, "square", 0.05);
  }

  if (event === "hit") {
    playTone(now, 180, 0.18, "sawtooth", 0.045);
  }

  if (event === "win") {
    playTone(now, 523.25, 0.09, "triangle", 0.04);
    playTone(now + 0.1, 659.25, 0.09, "triangle", 0.04);
    playTone(now + 0.2, 783.99, 0.18, "triangle", 0.04);
  }

  if (event === "lose") {
    playTone(now, 220, 0.12, "sawtooth", 0.05);
    playTone(now + 0.12, 164.81, 0.22, "sawtooth", 0.04);
  }
}
