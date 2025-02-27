/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname :"eshoppingmart.com.pk"
      },
      
    ],
  },
};

module.exports = nextConfig;
