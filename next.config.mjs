/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
}

export default nextConfig
