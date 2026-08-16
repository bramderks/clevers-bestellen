import { prisma } from "@/lib/prisma";

import {
  Badge,
  Button,
  Card,
  EmptyState,
  PageHeader,
  Table,
} from "@/modules/shared/ui";

export default async function GebruikersPagina() {
  const gebruikers = await prisma.gebruiker.findMany({
    include: {
      gebruikerRols: {
        include: {
          rol: true,
        },
      },
    },
    orderBy: {
      naam: "asc",
    },
  });

  return (
    <>
      <PageHeader
        titel="Gebruikers"
        omschrijving="Beheer alle gebruikers van Clevers Bestellen."
        acties={
          <Button>
            Nieuwe gebruiker
          </Button>
        }
      />

      <Card>
        {gebruikers.length === 0 ? (
          <EmptyState
            titel="Nog geen gebruikers"
            omschrijving="Voeg de eerste gebruiker toe."
          />
        ) : (
          <Table
            kolommen={[
              {
                key: "naam",
                titel: "Naam",
              },
              {
                key: "email",
                titel: "E-mail",
              },
              {
                key: "rollen",
                titel: "Rol(len)",
              },
              {
                key: "status",
                titel: "Status",
              },
            ]}
            data={gebruikers}
            render={(gebruiker, key) => {
              switch (key) {
                case "naam":
                  return gebruiker.naam;

                case "email":
                  return gebruiker.email;

                case "rollen":
                  return gebruiker.gebruikerRols.map(
                    (r) => (
                      <Badge key={r.id}>
                        {r.rol.naam}
                      </Badge>
                    )
                  );

                case "status":
                  return gebruiker.actief ? (
                    <Badge variant="success">
                      Actief
                    </Badge>
                  ) : (
                    <Badge variant="danger">
                      Inactief
                    </Badge>
                  );

                default:
                  return "";
              }
            }}
          />
        )}
      </Card>
    </>
  );
}