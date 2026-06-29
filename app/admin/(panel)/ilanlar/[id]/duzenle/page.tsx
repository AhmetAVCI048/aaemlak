import { notFound } from "next/navigation";
import { ilanGetirDb } from "@/lib/ilanlar-db";
import IlanForm from "@/components/admin/IlanForm";

export default async function IlanDuzenlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ilan = await ilanGetirDb(id);
  if (!ilan) notFound();

  return <IlanForm ilan={ilan} />;
}
