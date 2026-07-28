/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // A `next dev` server and a `next build` cannot share a build directory — the
  // build clobbers the CSS chunk next/font generates, which silently drops the
  // --font-* variables and drops the whole site to the browser's default serif.
  // Set NEXT_DIST_DIR to build/serve somewhere else while a dev server is up:
  //   NEXT_DIST_DIR=.next-verify npx next build && NEXT_DIST_DIR=.next-verify npx next start -p 3117
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
