const INIT = () => {
  let seed = 0x2f6e2b1;
  Math.random = () => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return ((seed >>> 0) % 1e6) / 1e6;
  };

  // useStatCounter counts 00K+ -> 50K+ on a 26ms interval and then blinks the
  // finished readout forever on a 480ms one, straight onto a canvas. Left
  // running, the canvas never reaches a resting state and no pixel diff can be
  // trusted. Repeating timers are neutralised so it stays on its first frame.
  window.setInterval = () => 0;

  Object.defineProperty(window, "devicePixelRatio", { get: () => 1 });
};

const SETTLE_CSS = `*, *::before, *::after {
  animation: none !important;
  transition: none !important;
  animation-duration: 0s !important;
  transition-duration: 0s !important;
  caret-color: transparent !important;
}`;

export async function preparePage(page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(INIT);
}

// useSevenEyes blinks two canvas pupils on a performance.now() cadence with no
// reduced-motion guard, so a screenshot catches whatever blink phase it lands
// in. Freezing performance.now would risk React's scheduler, so the animated
// canvas is excluded from pixel capture only -- its box, position and computed
// styles are still covered by tier 1.
const PIXEL_CSS = `[data-eq] { visibility: hidden !important; }`;

export async function settle(page, { forPixels = false } = {}) {
  await page.addStyleTag({ content: SETTLE_CSS });
  if (forPixels) await page.addStyleTag({ content: PIXEL_CSS });

  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  // Five faces at display:swap; a capture can otherwise land mid-swap.
  // Deliberately NOT waiting on document.images: next/image is lazy, so
  // below-fold images never load and the wait would never resolve.
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.waitForTimeout(250);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(120);
}
