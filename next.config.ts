import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. PORTABILITÉ : On enlève le chemin local Turbopack qui ferait planter le déploiement
  // Turbopack est utilisé par défaut en dev avec 'next dev --turbo'
  
  // 2. SEO & ROUTING
  trailingSlash: false, 
  poweredByHeader: false, // Discrétion maximale

  // 3. PERFORMANCE & ASSETS
  compress: true,
  
  // 4. SÉCURITÉ : Headers pour protéger ton "Cloud" personnel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // 5. IMAGES (Si tu prévois d'utiliser des assets distants pour ton interface cloud)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.thirdpath.cloud', // Autorise tes propres sous-domaines
      },
    ],
  },
};

export default nextConfig;