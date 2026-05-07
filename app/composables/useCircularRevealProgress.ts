import {
  TransitionPresets,
  useMouse,
  useRafFn,
  useTransition,
  useWindowSize,
} from "@vueuse/core";
import { computed, ref } from "vue";

/** Total angle traversed (radians) for full opacity (~3 full rotations). */
const TARGET_RADIANS = 6 * Math.PI;

/** Inner radius gate: min distance from center / half of min(viewport w,h). */
const MIN_RADIUS_RATIO = 0.08;

/** Outer radius gate: max distance from center / half of min(viewport w,h). */
const MAX_RADIUS_RATIO = 0.48;

/** Ignore tiny arc motion per frame (pixels along the circular path). */
const MIN_ARC_LENGTH_PX = 2;

/** Duration for smoothing opacity toward the target (ms). */
const OPACITY_TRANSITION_MS = 1400;

function wrapAngleDelta(prev: number, curr: number): number {
  let d = curr - prev;
  if (d > Math.PI) d -= 2 * Math.PI;
  if (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

export function useCircularRevealProgress() {
  const { x, y } = useMouse({ type: "client" });
  const { width, height } = useWindowSize();

  const accumulatedRadians = ref(0);
  let prevAngle: number | undefined;

  useRafFn(() => {
    const w = width.value;
    const h = height.value;
    if (w <= 0 || h <= 0) return;

    const mx = x.value;
    const my = y.value;
    const cx = w / 2;
    const cy = h / 2;
    const dx = mx - cx;
    const dy = my - cy;
    const r = Math.hypot(dx, dy);

    const halfMin = Math.min(w, h) / 2;
    const minR = halfMin * MIN_RADIUS_RATIO;
    const maxR = halfMin * MAX_RADIUS_RATIO;

    if (r < 1e-6 || r < minR || r > maxR) {
      prevAngle = undefined;
      return;
    }

    const angle = Math.atan2(dy, dx);

    if (prevAngle === undefined) {
      prevAngle = angle;
      return;
    }

    const delta = wrapAngleDelta(prevAngle, angle);
    prevAngle = angle;

    const arcLen = Math.abs(delta) * r;
    if (arcLen < MIN_ARC_LENGTH_PX) return;

    accumulatedRadians.value += Math.abs(delta);
  });

  const rawOpacity = computed(() =>
    Math.min(1, accumulatedRadians.value / TARGET_RADIANS),
  );

  const displayOpacity = useTransition(rawOpacity, {
    duration: OPACITY_TRANSITION_MS,
    easing: TransitionPresets.easeOutCubic,
  });

  return { displayOpacity };
}
