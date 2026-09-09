/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverExternalPackages: ["@react-pdf/renderer"],
  outputFileTracingIncludes: {
    "/*": ["./config/**/*"],
  },
}

export default nextConfig
