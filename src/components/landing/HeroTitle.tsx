"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  HERO_TITLE_INTERVAL_MS,
  heroTitleAccessible,
  heroTitles,
  heroTitleSecondLine,
} from "@/data/heroTitles";
import { cn } from "@/lib/cn";
import styles from "./Hero.module.css";

/** Duration of the word swap; matches the keyframes in Hero.module.css. */
const SWAP_MS = 600;
/**
 * A rotating word may be at most this share of the white second line. In Neuropol the white
 * line is 1027px of ink; 0.95 keeps the lime word ~20px clear of the near card on the right
 * (Figma x 1244, y 262–502) at the peak of its float.
 */
const MAX_WIDTH_RATIO = 0.95;
/** …and never wider than the content column. */
const MAX_WIDTH_PX = 1280;

/** `leaving` — the previous word while the 600 ms swap runs. */
type ScenarioState = { index: number; leaving: number | null };

type HeroScenario = ScenarioState & {
  setState: (update: (state: ScenarioState) => ScenarioState) => void;
};

const HeroScenarioContext = createContext<HeroScenario>({
  index: -1,
  leaving: null,
  setState: () => {},
});

/** Current Hero scenario (index into heroTitles); -1 outside the provider. */
export function useHeroScenario(): number {
  return useContext(HeroScenarioContext).index;
}

/** Shares the current title scenario between the title and the chips under the composer. */
export function HeroScenarioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScenarioState>({ index: 0, leaving: null });
  return (
    <HeroScenarioContext.Provider value={{ ...state, setState }}>
      {children}
    </HeroScenarioContext.Provider>
  );
}

/**
 * 12 s cycle that pauses (keeping the remaining time) while `paused` is true or the tab is
 * hidden; off with reduced motion.
 */
function useRotation(paused: boolean, advance: () => void) {
  const [reduced, setReduced] = useState(true);
  const [hidden, setHidden] = useState(false);
  const remaining = useRef(HERO_TITLE_INTERVAL_MS);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    const onVisibility = () => setHidden(document.hidden);
    sync();
    onVisibility();
    query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = !reduced && !hidden && !paused;

  useEffect(() => {
    if (!running) return;
    let started = performance.now();
    let timer = 0;
    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        advance();
        remaining.current = HERO_TITLE_INTERVAL_MS;
        started = performance.now();
        schedule(HERO_TITLE_INTERVAL_MS);
      }, delay);
    };
    schedule(remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [running, advance]);

  return reduced;
}

/**
 * Hero h1: a static accessible text plus an aria-hidden visual whose lime first line
 * cycles through heroTitles (old word leaves upwards, new one comes from below). The line
 * box keeps a fixed height, so the composer and chips below never move.
 */
export function HeroTitle() {
  const { index, leaving, setState } = useContext(HeroScenarioContext);
  const [hovered, setHovered] = useState(false);
  const [fontSizes, setFontSizes] = useState<Record<number, string>>({});
  const measureRef = useRef<HTMLSpanElement>(null);
  const whiteRef = useRef<HTMLSpanElement>(null);

  const advance = useCallback(
    () =>
      setState((state) => ({ index: (state.index + 1) % heroTitles.length, leaving: state.index })),
    [setState],
  );

  const reduced = useRotation(hovered, advance);
  const shown = reduced ? 0 : index;

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(
      () => setState((state) => ({ ...state, leaving: null })),
      SWAP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [leaving, index, setState]);

  // Width cap per word: measured at the line's base size (fonts differ per platform, and
  // Neuropol may arrive later), re-measured once web fonts finish loading.
  useLayoutEffect(() => {
    const measure = measureRef.current;
    const white = whiteRef.current;
    if (!measure || !white) return;
    const fit = () => {
      const limit = Math.min(MAX_WIDTH_PX, white.getBoundingClientRect().width * MAX_WIDTH_RATIO);
      const base = parseFloat(getComputedStyle(measure).fontSize);
      const next: Record<number, string> = {};
      heroTitles.forEach((title, i) => {
        measure.textContent = title.word;
        const width = measure.getBoundingClientRect().width;
        if (width > limit) next[i] = `${((base * limit) / width).toFixed(2)}px`;
      });
      measure.textContent = "";
      setFontSizes(next);
    };
    fit();
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && fit());
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <h1 id="hero-title" className={styles.title}>
      <span className="sr-only">{heroTitleAccessible}</span>
      <span
        className={styles.titleVisual}
        aria-hidden="true"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className={cn(styles.titleLine, styles.titleLime, styles.titleRotator)}>
          {leaving !== null && !reduced ? (
            <span
              key={`out-${leaving}`}
              className={cn(styles.titleWord, styles.titleWordOut)}
              style={{ fontSize: fontSizes[leaving] }}
            >
              {heroTitles[leaving]?.word}
            </span>
          ) : null}
          <span
            key={`in-${shown}`}
            className={cn(styles.titleWord, leaving !== null && !reduced && styles.titleWordIn)}
            style={{ fontSize: fontSizes[shown] }}
          >
            {heroTitles[shown]?.word}
          </span>
          {/* Off-screen ruler for the width cap. */}
          <span ref={measureRef} className={styles.titleMeasure} />
        </span>
        <span ref={whiteRef} className={cn(styles.titleLine, styles.titleWhite)}>
          {heroTitleSecondLine}
        </span>
      </span>
    </h1>
  );
}
