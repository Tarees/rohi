// One shared, rAF-throttled scroll listener for the whole site.
// Components subscribe instead of each attaching their own window listener,
// and should write values to refs/DOM so scrolling does not re-render React trees.

export interface ScrollState {
  /** window.scrollY in px */
  y: number;
  /** 0 → 1 through the full page */
  progress: number;
}

type Listener = (state: ScrollState) => void;

const listeners = new Set<Listener>();
const state: ScrollState = { y: 0, progress: 0 };
let frame = 0;

function measure() {
  frame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  state.y = window.scrollY;
  state.progress = max > 0 ? Math.min(Math.max(state.y / max, 0), 1) : 0;
  listeners.forEach((fn) => fn(state));
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure);
}

/** Subscribe to scroll updates. Called immediately with the current state. Returns an unsubscribe fn. */
export function subscribeScroll(fn: Listener): () => void {
  if (listeners.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  listeners.add(fn);
  measure();

  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}
