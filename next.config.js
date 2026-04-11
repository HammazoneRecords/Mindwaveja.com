/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warning when multiple lockfiles exist (e.g. parent directory)
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  // Ensure video files are served correctly
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
    });
    return config;
  },
  async rewrites() {
    return [
      // API proxy disabled for preview - uncomment when backend is available
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost:5000/api/:path*',
      // },
    ]
  },
};

module.exports = nextConfig;
