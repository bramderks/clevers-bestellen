import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import AppLayout from "@/components/layout/AppLayout";

interface Props {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: Readonly<Props>) {
  const cookieStore = await cookies();

  const session = cookieStore.get("clevers_session");

  if (!session) {
    redirect("/login");
  }

  const gebruiker = await prisma.gebruiker.findUnique({
    where: {
      id: session.value,
    },
    include: {
      vestiging: true,
    },
  });

  if (!gebruiker || !gebruiker.actief) {
    redirect("/login");
  }

  return (
    <AppLayout
      naam={gebruiker.naam}
      vestiging={gebruiker.vestiging?.naam}
    >
      {children}
    </AppLayout>
  );
}