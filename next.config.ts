import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pinned because an unrelated lockfile in the parent directory would
  // otherwise be inferred as the workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
