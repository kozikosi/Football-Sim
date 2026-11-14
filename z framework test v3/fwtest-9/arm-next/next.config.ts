import type { NextConfig } from 'next';

// The only honest shape for this product: a fully static export (parity with
// the other arms — GitHub Pages / Cloudflare Pages free tiers). No server,
// no paid dependency, per the Owner's free-in-perpetuity ruling.
const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
