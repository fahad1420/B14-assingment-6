/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "img.magnific.com", pathname: "/free-photo/**" },
    ],
  },
};

export default nextConfig;
