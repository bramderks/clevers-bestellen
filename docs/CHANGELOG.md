# Changelog

Alle belangrijke wijzigingen aan Clevers Bestellen worden in dit document bijgehouden.

Het doel is om de ontwikkelgeschiedenis inzichtelijk te houden voor onderhoud, ondersteuning en toekomstige uitbreidingen.

---

# [0.1.0] - 2026-08-04

## Eerste stabiele versie

### Toegevoegd

- Fundament op basis van Next.js 16, React 19 en TypeScript.
- Prisma met PostgreSQL.
- Centrale productdatabase.
- Automatische bestelengine.
- OCR-verwerking en productnormalisatie.
- PDF-generatie.
- Dashboard.
- Medewerkersmodule (basis).
- Weektaken.
- Historie (basis).
- Centrale applicatieconfiguratie (`lib/config/app.ts`).
- Footer met auteursrecht.
- Proprietary LICENSE.
- `robots.txt`.
- `humans.txt`.
- Security headers.
- Middleware.
- Architectuurdocumentatie.

### Verbeterd

- Projectstructuur opgeschoond.
- Dubbele businesslogica verwijderd.
- API's vereenvoudigd.
- TypeScript-structuur gestandaardiseerd.
- Componenten verder gemodulariseerd.
- Metadata centraal beheerd.

### Beveiliging

- Verwijdering `X-Powered-By`.
- Basis security headers.
- Centrale copyrightvermelding.
- Proprietary licentie toegevoegd.

---

## Volgende release (0.2.0)

Gepland:

- Historie uitbreiden.
- Productbeheer.
- Rollen en rechten.
- Medewerkersplanning.
- Multi-vestiging voorbereiden.