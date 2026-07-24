import CategorieTelling from "@/components/CategorieTelling";

export default async function Page({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;

  return <CategorieTelling categorie={categorie} />;
}