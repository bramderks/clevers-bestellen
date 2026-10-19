import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { haalErpGebruikerMetSessie } from "@/lib/erp-auth";
import AppLayout from "@/components/layout/AppLayout";

interface Props {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: Readonly<Props>) {
  const cookieStore = await cookies();
  const gebruiker = await haalErpGebruikerMetSessie(cookieStore.get("clevers_session")?.value);

  if (!gebruiker || !gebruiker.actief) {
    redirect("/login");
  }

  return (
    <AppLayout
      naam={gebruiker.naam}
      vestiging={gebruiker.vestigingen?.[0]?.naam}
    >
      {children}
    </AppLayout>
  );
}
