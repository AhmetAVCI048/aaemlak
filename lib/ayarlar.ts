import { cache } from "react";
import { siteConfig } from "@/lib/site-config";
import { hakkimdaContent, iletisimContent } from "@/lib/content";
import { supabaseSunucu } from "@/lib/supabase/server";

export type Ayarlar = {
  brandName: string;
  tagline: string;
  phone: string; // görünen telefon, örn "+90 532 454 02 48"
  whatsapp: string; // boşluksuz, örn "905324540248" (tel: ve wa.me için)
  instagram: string;
  email: string;
  address: string;
  hakkimdaAltBaslik: string;
  hakkimdaParagraflar: string[];
  hakkimdaKartlar: { sayi: string; etiket: string }[];
  calismaSaatleri: string;
};

// Ayarlar tablosu yoksa/boşsa kullanılacak mevcut sabit değerler
export const VARSAYILAN_AYARLAR: Ayarlar = {
  brandName: siteConfig.brandName,
  tagline: siteConfig.tagline,
  phone: siteConfig.phone,
  whatsapp: siteConfig.whatsappRaw,
  instagram: siteConfig.instagram,
  email: siteConfig.email,
  address: siteConfig.address,
  hakkimdaAltBaslik: hakkimdaContent.altBaslik,
  hakkimdaParagraflar: hakkimdaContent.paragraflar,
  hakkimdaKartlar: hakkimdaContent.istatistikler,
  calismaSaatleri: iletisimContent.calismaSaatleri,
};

/**
 * Site ayarlarını getirir (bir istek içinde tek DB çağrısı — React cache).
 * Supabase yoksa veya hata olursa varsayılanlara düşer, böylece site hep çalışır.
 */
export const getAyarlar = cache(async (): Promise<Ayarlar> => {
  const sb = await supabaseSunucu();
  if (!sb) return VARSAYILAN_AYARLAR;
  const { data, error } = await sb
    .from("ayarlar")
    .select("veri")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data?.veri) return VARSAYILAN_AYARLAR;
  return { ...VARSAYILAN_AYARLAR, ...(data.veri as Partial<Ayarlar>) };
});
