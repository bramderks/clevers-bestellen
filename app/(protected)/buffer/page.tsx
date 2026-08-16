import {
  Button,
  EmptyState,
  PageHeader,
} from "@/modules/shared/ui";

export default function BuffersPagina() {
  return (
    <>
      <PageHeader
        titel="Buffers per vestiging"
        omschrijving="Deze module is nog niet geactiveerd."
        acties={
          <Button disabled>
            Buffer toevoegen
          </Button>
        }
      />

      <EmptyState
        titel="Module nog niet beschikbaar"
        omschrijving="Productbuffers zijn nog niet ingericht in de database."
      />
    </>
  );
}