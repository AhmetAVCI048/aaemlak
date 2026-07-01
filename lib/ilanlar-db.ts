import { ornekIlanlar, type Ilan } from "@/lib/listings";
import { supabaseSunucu } from "@/lib/supabase/server";

/* Supabase satırını (snake_case) uygulamadaki Ilan tipine (camelCase) çevirir. */
function satirToIlan(r: Record<string, unknown>): Ilan {
  const g = <T,>(v: unknown): T | undefined => (v == null ? undefined : (v as T));
  return {
    id: String(r.id),
    ilanNo: g<number>(r.ilan_no),
    baslik: String(r.baslik ?? ""),
    aciklama: String(r.aciklama ?? ""),
    fiyat: Number(r.fiyat ?? 0),
    tip: (r.tip as Ilan["tip"]) ?? "satilik",
    kategori: (r.kategori as Ilan["kategori"]) ?? "konut",
    altKategori: g<string>(r.alt_kategori),
    durum: (r.durum as Ilan["durum"]) ?? "aktif",
    rozetler: (r.rozetler as string[]) ?? [],
    il: String(r.il ?? ""),
    ilce: String(r.ilce ?? ""),
    mahalle: String(r.mahalle ?? ""),
    odaSayisi: g<string>(r.oda_sayisi),
    banyoSayisi: g<number>(r.banyo_sayisi),
    brutMetrekare: g<number>(r.brut_metrekare),
    netMetrekare: g<number>(r.net_metrekare),
    binaYasi: g<number>(r.bina_yasi),
    bulunduguKat: g<string>(r.bulundugu_kat),
    katSayisi: g<number>(r.kat_sayisi),
    isitma: g<string>(r.isitma),
    aidat: g<number>(r.aidat),
    esyali: g<boolean>(r.esyali),
    krediyeUygun: g<boolean>(r.krediye_uygun),
    cephe: (r.cephe as string[]) ?? [],
    icOzellikler: (r.ic_ozellikler as string[]) ?? [],
    disOzellikler: (r.dis_ozellikler as string[]) ?? [],
    manzara: (r.manzara as string[]) ?? [],
    gorseller: (r.gorseller as string[]) ?? [],
    video: g<string>(r.video),
    enlem: g<number>(r.enlem),
    boylam: g<number>(r.boylam),
    olusturmaTarihi: String(r.olusturma_tarihi ?? "").slice(0, 10),
  };
}

/** Tüm ilanlar (en yeni önce). Supabase yoksa örnek veriye düşer. */
export async function tumIlanlar(): Promise<Ilan[]> {
  const sb = await supabaseSunucu();
  if (!sb) return ornekIlanlar;
  const { data, error } = await sb
    .from("ilanlar")
    .select("*")
    .order("olusturma_tarihi", { ascending: false });
  // Yapılandırılmış ama hata olursa örnek veri göstermek yanıltıcı olur → boş dön
  if (error || !data) return [];
  return data.map(satirToIlan);
}

/** Tek ilan. Supabase yoksa örnek veriye düşer. */
export async function ilanGetirDb(id: string): Promise<Ilan | undefined> {
  const sb = await supabaseSunucu();
  if (!sb) return ornekIlanlar.find((i) => i.id === id);
  const { data, error } = await sb.from("ilanlar").select("*").eq("id", id).maybeSingle();
  if (error || !data) return undefined;
  return satirToIlan(data);
}
