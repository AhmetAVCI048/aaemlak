import { ornekIlanlar } from "@/lib/listings";
import IlanlarTablo from "@/components/admin/IlanlarTablo";

export default function AdminIlanlarPage() {
  return <IlanlarTablo baslangic={ornekIlanlar} />;
}
