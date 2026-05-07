import type { TMusicFlowOptions } from "vue-music-flow";

/**
 * WaveSurfer reads literal resolved colors on canvas — resolve `--color-primary-*` from computed styles.
 * Keeps progress/cursor aligned with Nuxt UI `app.config` primary (e.g. sage).
 *
 * @see https://vue-music-flow-docs.vercel.app/customization/options
 */

const FALLBACK_PRIMARY = "#529766";

const WAVEFORM_BASE = {
  height: 50,
  waveColor: "#ffffff",
  barWidth: 4,
  barGap: 4,
  barRadius: 4,
  barHeight: 0.8,
  dragToSeek: { debounceTime: 1000 },
  minPxPerSec: 0,
  autoScroll: false,
  autoCenter: false,
  hideScrollbar: false,
  interact: true,
  autoplay: true,
} as const satisfies Omit<TMusicFlowOptions, "progressColor" | "cursorColor">;

/** Resolved primary from theme tokens on `:root` / `.dark`. */
export function resolveUiPrimaryColor(): string {
  if (!import.meta.client) return FALLBACK_PRIMARY;
  const style = getComputedStyle(document.documentElement);
  const candidates = ["--color-primary-500", "--color-primary", "--ui-primary"] as const;
  for (const variable of candidates) {
    const value = style.getPropertyValue(variable).trim();
    if (value) return value;
  }
  return FALLBACK_PRIMARY;
}

/** Full `MusicFlow` / `useMusicFlow(options)` payload — always pass this (singleton replaces whole store). */
export function createMusicFlowWaveformOptions(): TMusicFlowOptions {
  const primary = resolveUiPrimaryColor();
  return {
    ...WAVEFORM_BASE,
    progressColor: primary,
    cursorColor: primary,
    cursorWidth: 1,
  };
}
