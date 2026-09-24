import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Material de download (PDF do case) só se pega depois do formulário: o
  // Google não pode indexar o arquivo e entregar o PDF direto na busca.
  async headers() {
    return [
      {
        source: "/materiais/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
