import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // İleride Cloudinary'den gelecek fotoğraflar için izinli alan adları.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Supabase Storage'daki ilan fotoğraf/videoları
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
