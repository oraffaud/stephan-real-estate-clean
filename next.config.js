/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // We only use local images in /public by default.
    // If you later add a CMS with remote images, add allowed domains here.
  },
};

module.exports = nextConfig;
