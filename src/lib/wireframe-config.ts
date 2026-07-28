/**
 * The three "Wireframe" tweaks that were data-props on the original design
 * component. Flip them here.
 */
export const WIREFRAME = {
  /** Intro loader animation on first load. Turn OFF to skip while building. */
  showIntro: false,
  /** Dashed annotation pills (WEBGL PARALLAX BACKGROUND, …). */
  showAnnotations: true,
  /** The floating Seven widget. The widget itself always starts CLOSED. */
  showSeven: true,
} as const;
