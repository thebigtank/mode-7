/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // A `next dev` server and a `next build` cannot share a build directory — the
  // build clobbers the CSS chunk next/font generates, which silently drops the
  // --font-* variables and drops the whole site to the browser's default serif.
  // Set NEXT_DIST_DIR to build/serve somewhere else while a dev server is up:
  //   NEXT_DIST_DIR=.next-verify npx next build && NEXT_DIST_DIR=.next-verify npx next start -p 3117
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // `/homepage-v2` was the parallel homepage exploration until it became the
  // real homepage at `/`; the route no longer exists. Redirected rather than
  // left to 404 so any bookmark, shared link or stale reference still lands
  // somewhere correct.
  //
  // TEMPORARY (307), deliberately not permanent (308): browsers cache a 308
  // hard and for a long time, which would be painful to undo while this site
  // is still in active development. Switch `permanent` to true before launch
  // if the old URL is confirmed dead for good.
  async redirects() {
    return [{ source: "/homepage-v2", destination: "/", permanent: false }];
  },
};

export default nextConfig;
