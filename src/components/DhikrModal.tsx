import React, { useState } from "react";
import { Dua, Language } from "../types";
import { ArrowCounterClockwise, Check, Copy, SpeakerSimpleHigh, X } from "@phosphor-icons/react";

interface DhikrModalProps {
  dua: Dua | null;
  onClose: () => void;
  lang: Language;
}

export const DhikrModal: React.FC<DhikrModalProps> = ({ dua, onClose, lang }) => {
  if (!dua) return null;

  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(dua.target || 33);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Play subtle soothing audio tick using standard Web Audio synthesizer
  const playClickFeedback = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const handleIncrement = () => {
    playClickFeedback();
    const next = count + 1;
    if (next >= target) {
      setCount(0);
      setCompletedCycles((c) => c + 1);
    } else {
      setCount(next);
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompletedCycles(0);
  };

  const handleCopy = () => {
    const textToCopy = `${dua.arabic}

${dua.translit}

${lang === "am" ? dua.am : dua.en}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl p-6 sm:p-8 overflow-hidden text-card-foreground">
        
        {/* Subtle decorative radial glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-600/20">
              {lang === "am" ? dua.category.am : dua.category.en}
            </span>
            <h3 className="text-lg font-serif font-bold text-foreground mt-1">
              {lang === "am" ? dua.title.am : dua.title.en}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border border-border transition-colors ${
                soundEnabled
                  ? "bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border-emerald-600/30"
                  : "bg-muted text-muted-foreground"
              }`}
              title={soundEnabled ? "Sound On" : "Sound Muted"}
            >
              <SpeakerSimpleHigh size={18} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg border border-border bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
              title="Copy Dhikr"
            >
              {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Arabic Display */}
        <div className="py-6 text-center">
          <p className="font-arabic text-2xl sm:text-3xl leading-relaxed text-foreground dir-rtl select-all">
            {dua.arabic}
          </p>
          <p className="mt-3 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-serif italic">
            "{dua.translit}"
          </p>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {lang === "am" ? dua.am : dua.en}
          </p>
        </div>

        {/* Interactive Tactile Tasbeeh Counter */}
        <div className="flex flex-col items-center justify-center my-4">
          <button
            onClick={handleIncrement}
            className="group relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-700 dark:to-emerald-950 text-white shadow-xl shadow-emerald-900/30 hover:shadow-emerald-900/40 active:scale-95 transition-all duration-150 flex flex-col items-center justify-center border-4 border-amber-400/40 select-none cursor-pointer"
          >
            {/* Circular progress highlight */}
            <div
              className="absolute inset-0 rounded-full border-4 border-amber-400 opacity-60 transition-all duration-200"
              style={{
                clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent * 2}% -50%, 150% 150%)`,
              }}
            />
            <span className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-white drop-shadow">
              {count}
            </span>
            <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-amber-200/90 mt-1">
              / {target}
            </span>
            <span className="text-[9px] text-emerald-200/70 uppercase tracking-widest mt-0.5">
              {lang === "am" ? "ይምቱ" : "Tap"}
            </span>
          </button>

          {/* Quick Target Selectors & Reset */}
          <div className="flex items-center gap-2 mt-6">
            <span className="text-xs text-muted-foreground font-medium">
              {lang === "am" ? "ግብ፦" : "Target:"}
            </span>
            {[33, 99, 100].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTarget(t);
                  setCount(0);
                }}
                className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                  target === t
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 font-bold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
            <button
              onClick={handleReset}
              className="ml-2 flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
              title="Reset Counter"
            >
              <ArrowCounterClockwise size={14} />
              <span>{lang === "am" ? "ዳግም ጀምር" : "Reset"}</span>
            </button>
          </div>

          {/* Completed Rounds Badge */}
          {completedCycles > 0 && (
            <div className="mt-3 px-3 py-1 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              ✓ {completedCycles} {lang === "am" ? "ዙሮች ተጠናቀዋል" : "Rounds Completed"}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
