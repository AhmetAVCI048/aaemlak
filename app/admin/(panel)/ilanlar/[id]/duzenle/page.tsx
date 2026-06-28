import { notFound } from "next/navigation";
import { ilanGetir } from "@/lib/listings";
import IlanForm from "@/components/admin/IlanForm";

export default async function IlanDuzenlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ilan = ilanGetir(id);
  if (!ilan) notFound();

  return <IlanForm ilan={ilan} />;
}
