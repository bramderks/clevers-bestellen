import { prisma } from "@/lib/prisma";

export async function gebruikerOpEmail(email: string) {
  return prisma.gebruiker.findUnique({
    where: {
      email: email.toLowerCase(),
    },
    include: {
      vestiging: true,
      rollen: {
        include: {
          rol: true,
        },
      },
      medewerker: true,
    },
  });
}

export function heeftRol(
  rollen: { rol: { naam: string } }[],
  rol: string,
) {
  return rollen.some(
    (r) => r.rol.naam === rol,
  );
}

export function heeftEenVanRollen(
  rollen: { rol: { naam: string } }[],
  toegestaan: string[],
) {
  return rollen.some((r) =>
    toegestaan.includes(r.rol.naam),
  );
}

export function isActief(
  gebruiker: {
    actief: boolean;
  } | null,
) {
  return gebruiker?.actief === true;
}