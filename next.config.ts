/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ['res.cloudinary.com','www.murangaseal.com', 'img.icons8.com', 'www.ke.sportpesa.com','http://www.w3.org'],
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig;
