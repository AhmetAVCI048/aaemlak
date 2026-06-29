import IlanlarTablo from "@/components/admin/IlanlarTablo";
import { tumIlanlar } from "@/lib/ilanlar-db";

export default async function AdminIlanlarPage() {
  const ilanlar = await tumIlanlar();
  return <IlanlarTablo baslangic={ilanlar} />;
}
