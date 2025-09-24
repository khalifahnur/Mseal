/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "www.murangaseal.com",
      //   pathname: "**",
      // },
      {
        protocol: "https",
        hostname: "icons8.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.ke.sportpesa.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "http://www.w3.org",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
