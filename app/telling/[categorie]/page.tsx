import CategorieTelling from "@/components/CategorieTelling";

type Props = {
  params: Promise<{
    categorie: string;
  }>;
};

export default async function Page({
  params,
}: Props) {
  const { categorie } = await params;

  return (
    <CategorieTelling
      categorie={categorie}
    />
  );
}