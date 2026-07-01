import type { MetadataRoute } from "next";
import { tumIlanlar } from "@/lib/ilanlar-db";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.siteUrl;

  const statik: MetadataRoute.Sitemap = ["", "/ilanlar", "/hakkimda", "/iletisim"].map(
    (p) => ({ url: `${base}${p}`, lastModified: new Date() })
  );

  let ilanUrls: MetadataRoute.Sitemap = [];
  try {
    const ilanlar = await tumIlanlar();
    ilanUrls = ilanlar.map((i) => ({
      url: `${base}/ilanlar/${i.id}`,
      lastModified: i.olusturmaTarihi ? new Date(i.olusturmaTarihi) : new Date(),
    }));
  } catch {
    // ilan listesi alınamazsa sadece statik sayfaları döndür
  }

  return [...statik, ...ilanUrls];
}
