import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Next regenerates AGENTS.md and CLAUDE.md on every dev run. CLAUDE.md here is
  // hand-written project guidance -- the only record of the traps documented in
  // it -- so the generator is off to stop it being overwritten.
  agentRules: false,

  // The dev overlay badge paints into the bottom-left of the viewport and would
  // otherwise land in every parity screenshot.
  devIndicators: false,

  // Component stylesheets are colocated with their components and each opens
  // with a bare `@use 'utils' as *;`. loadPaths is what makes that one line
  // resolve from anywhere in the tree instead of a ../../../ chain, and it is
  // honoured by Turbopack in both `next dev` and `next build`.
  sassOptions: {
    loadPaths: [new URL("./src/app/scss", import.meta.url).pathname],
  },

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

// withPayload wires the admin's own webpack/Turbopack needs and its server
// externals. It wraps rather than replaces, so everything above still applies.
export default withPayload(nextConfig);
