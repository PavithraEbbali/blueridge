/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /* Emit a folder of plain HTML/CSS/JS that runs on any static host with no
     Node process. The client bundle still ships, so every animation, glow,
     tilt and scroll effect behaves exactly as it does under `next dev`. */
  output: 'export',

  /* Trailing slashes give each page its own directory with an index.html,
     which is what shared hosting and S3-style buckets expect. */
  trailingSlash: true,

  images: {
    /* The optimizer is a server feature and cannot run on a static host, so
       the original files are served as-is. That removes the resampling
       entirely: the hero ships its full 2560x1598 source rather than a
       downscaled variant the browser then has to stretch. */
    unoptimized: true,
  },
};

export default nextConfig;
