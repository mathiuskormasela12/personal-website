const { getImageRemotePatterns } = require('./config/image-remote-patterns');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    // Replaces the deprecated `domains: ['localhost']` and adds the API host that serves project images.
    remotePatterns: getImageRemotePatterns(process.env.NEXT_PUBLIC_API_URL),
    // The backend runs on the owner's machine/LAN. Next 16 blocks optimizing private-IP images unless this is set.
    dangerouslyAllowLocalIP: true,
    // Card thumbnails request quality 5. Next 16 only allows 75 unless other values are listed.
    qualities: [5, 75],
  },
};

module.exports = nextConfig;
