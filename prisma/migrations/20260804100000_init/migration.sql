-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Vestiging" (
    "id" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "actief" BOOLEAN NOT NULL DEFAULT true,
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gewijzigd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vestiging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gebruiker" (
    "id" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "wachtwoordHash" TEXT,
    "actief" BOOLEAN NOT NULL DEFAULT true,
    "laatsteLogin" TIMESTAMP(3),
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gewijzigd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gebruiker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "omschrijving" TEXT,
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GebruikerRol" (
    "id" TEXT NOT NULL,
    "gebruikerId" TEXT NOT NULL,
    "rolId" TEXT NOT NULL,

    CONSTRAINT "GebruikerRol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instelling" (
    "id" TEXT NOT NULL,
    "sleutel" TEXT NOT NULL,
    "waarde" TEXT NOT NULL,
    "omschrijving" TEXT,
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gewijzigd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instelling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "gebruikerId" TEXT,
    "actie" TEXT NOT NULL,
    "entiteit" TEXT NOT NULL,
    "entiteitId" TEXT,
    "details" JSONB,
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bestelling" (
    "id" SERIAL NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "vestiging" TEXT NOT NULL,
    "medewerker" TEXT,
    "type" TEXT NOT NULL,
    "opmerking" TEXT,
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bestelling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BestellingRegel" (
    "id" SERIAL NOT NULL,
    "bestellingId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "productNaam" TEXT NOT NULL,
    "geteld" INTEGER NOT NULL,
    "buffer" INTEGER NOT NULL,
    "besteld" INTEGER NOT NULL,
    "bestelGroep" TEXT NOT NULL,

    CONSTRAINT "BestellingRegel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL,
    "vestiging" TEXT NOT NULL,
    "jaar" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "afgesloten" BOOLEAN NOT NULL DEFAULT false,
    "afgeslotenOp" TIMESTAMP(3),
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekTaak" (
    "id" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "taak" TEXT NOT NULL,
    "voltooid" BOOLEAN NOT NULL DEFAULT false,
    "naam" TEXT,
    "voltooidOp" TIMESTAMP(3),
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeekTaak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medewerker" (
    "id" TEXT NOT NULL,
    "voornaam" TEXT NOT NULL,
    "achternaam" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "email" TEXT,
    "telefoon" TEXT,
    "vestiging" TEXT NOT NULL,
    "actief" BOOLEAN NOT NULL DEFAULT true,
    "kleur" TEXT NOT NULL DEFAULT '#2563eb',
    "functie" TEXT,
    "uurloon" DECIMAL(6,2),
    "contractUren" INTEGER,
    "datumInDienst" TIMESTAMP(3),
    "geboortedatum" TIMESTAMP(3),
    "pushToken" TEXT,
    "opmerkingen" TEXT,
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medewerker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beschikbaarheid" (
    "id" TEXT NOT NULL,
    "medewerkerId" TEXT NOT NULL,
    "weekdag" INTEGER NOT NULL,
    "beschikbaar" BOOLEAN NOT NULL DEFAULT true,
    "vanaf" TEXT,
    "tot" TEXT,

    CONSTRAINT "Beschikbaarheid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dienst" (
    "id" TEXT NOT NULL,
    "medewerkerId" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "begintijd" TEXT NOT NULL,
    "eindtijd" TEXT NOT NULL,
    "vestiging" TEXT NOT NULL,
    "functie" TEXT,
    "aangemaakt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dienst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UurRegistratie" (
    "id" TEXT NOT NULL,
    "dienstId" TEXT NOT NULL,
    "medewerkerId" TEXT NOT NULL,
    "geplandeStart" TEXT NOT NULL,
    "geplandeEinde" TEXT NOT NULL,
    "gewerkteStart" TEXT,
    "gewerkteEinde" TEXT,
    "pauze" INTEGER NOT NULL DEFAULT 0,
    "opmerking" TEXT,
    "goedgekeurd" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UurRegistratie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vestiging_naam_key" ON "Vestiging"("naam");

-- CreateIndex
CREATE UNIQUE INDEX "Vestiging_code_key" ON "Vestiging"("code");

-- CreateIndex
CREATE INDEX "Vestiging_actief_idx" ON "Vestiging"("actief");

-- CreateIndex
CREATE UNIQUE INDEX "Gebruiker_email_key" ON "Gebruiker"("email");

-- CreateIndex
CREATE INDEX "Gebruiker_actief_idx" ON "Gebruiker"("actief");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_naam_key" ON "Rol"("naam");

-- CreateIndex
CREATE UNIQUE INDEX "GebruikerRol_gebruikerId_rolId_key" ON "GebruikerRol"("gebruikerId", "rolId");

-- CreateIndex
CREATE UNIQUE INDEX "Instelling_sleutel_key" ON "Instelling"("sleutel");

-- CreateIndex
CREATE INDEX "AuditLog_actie_idx" ON "AuditLog"("actie");

-- CreateIndex
CREATE INDEX "AuditLog_entiteit_idx" ON "AuditLog"("entiteit");

-- CreateIndex
CREATE INDEX "AuditLog_aangemaakt_idx" ON "AuditLog"("aangemaakt");

-- CreateIndex
CREATE INDEX "Week_vestiging_idx" ON "Week"("vestiging");

-- CreateIndex
CREATE INDEX "Week_jaar_week_idx" ON "Week"("jaar", "week");

-- CreateIndex
CREATE INDEX "Week_afgesloten_idx" ON "Week"("afgesloten");

-- CreateIndex
CREATE UNIQUE INDEX "Week_vestiging_jaar_week_key" ON "Week"("vestiging", "jaar", "week");

-- CreateIndex
CREATE INDEX "WeekTaak_weekId_idx" ON "WeekTaak"("weekId");

-- CreateIndex
CREATE INDEX "WeekTaak_categorie_idx" ON "WeekTaak"("categorie");

-- CreateIndex
CREATE INDEX "WeekTaak_voltooid_idx" ON "WeekTaak"("voltooid");

-- CreateIndex
CREATE INDEX "Medewerker_vestiging_idx" ON "Medewerker"("vestiging");

-- CreateIndex
CREATE INDEX "Medewerker_actief_idx" ON "Medewerker"("actief");

-- CreateIndex
CREATE INDEX "Medewerker_functie_idx" ON "Medewerker"("functie");

-- CreateIndex
CREATE INDEX "Beschikbaarheid_medewerkerId_idx" ON "Beschikbaarheid"("medewerkerId");

-- CreateIndex
CREATE INDEX "Dienst_datum_idx" ON "Dienst"("datum");

-- CreateIndex
CREATE INDEX "Dienst_vestiging_idx" ON "Dienst"("vestiging");

-- CreateIndex
CREATE INDEX "Dienst_medewerkerId_idx" ON "Dienst"("medewerkerId");

-- CreateIndex
CREATE UNIQUE INDEX "UurRegistratie_dienstId_key" ON "UurRegistratie"("dienstId");

-- CreateIndex
CREATE INDEX "UurRegistratie_medewerkerId_idx" ON "UurRegistratie"("medewerkerId");

-- AddForeignKey
ALTER TABLE "GebruikerRol" ADD CONSTRAINT "GebruikerRol_gebruikerId_fkey" FOREIGN KEY ("gebruikerId") REFERENCES "Gebruiker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GebruikerRol" ADD CONSTRAINT "GebruikerRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BestellingRegel" ADD CONSTRAINT "BestellingRegel_bestellingId_fkey" FOREIGN KEY ("bestellingId") REFERENCES "Bestelling"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekTaak" ADD CONSTRAINT "WeekTaak_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beschikbaarheid" ADD CONSTRAINT "Beschikbaarheid_medewerkerId_fkey" FOREIGN KEY ("medewerkerId") REFERENCES "Medewerker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dienst" ADD CONSTRAINT "Dienst_medewerkerId_fkey" FOREIGN KEY ("medewerkerId") REFERENCES "Medewerker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UurRegistratie" ADD CONSTRAINT "UurRegistratie_dienstId_fkey" FOREIGN KEY ("dienstId") REFERENCES "Dienst"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UurRegistratie" ADD CONSTRAINT "UurRegistratie_medewerkerId_fkey" FOREIGN KEY ("medewerkerId") REFERENCES "Medewerker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

