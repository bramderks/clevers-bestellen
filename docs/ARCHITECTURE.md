# Clevers Bestellen
## Architectuurdocument

**Versie:** 0.1.0  
**Status:** Actief  
**Laatst bijgewerkt:** 4 augustus 2026

---

# Doel

Clevers Bestellen is een professioneel softwareplatform voor voorraadbeheer, bestellingen en operationele ondersteuning van ambachtelijke ijssalons.

De applicatie wordt ontwikkeld als schaalbaar platform voor meerdere vestigingen en is ontworpen om in de toekomst uitgebreid te kunnen worden met aanvullende modules zonder fundamentele wijzigingen aan de architectuur.

---

# Architectuurprincipes

Tijdens iedere ontwikkeling gelden onderstaande uitgangspunten.

## 1. Configuratie boven hardcoding

Vestigingen, producten, buffers en instellingen worden geconfigureerd.

Geen logica op basis van vaste namen.

---

## 2. Eén bron van waarheid

Gegevens bestaan slechts op één plaats.

Duplicatie wordt voorkomen.

---

## 3. Businesslogica centraal

Alle berekeningen bevinden zich in `lib`.

Pagina's bevatten uitsluitend presentatie.

---

## 4. Componenten

Componenten hebben één verantwoordelijkheid.

Grote componenten worden opgesplitst.

---

## 5. Typeveiligheid

TypeScript strict.

Geen `any`.

Sterke interfaces.

---

## 6. Database

Prisma vormt de enige toegang tot de database.

Geen SQL in pagina's.

---

## 7. Schaalbaarheid

De software wordt ontwikkeld voor meerdere vestigingen.

Nieuwe vestigingen mogen uitsluitend configuratie vereisen.

---

## 8. Veiligheid

Alle toekomstige modules worden ontwikkeld met:

- authenticatie
- autorisatie
- rollen
- logging
- audittrail

als uitgangspunt.

---

# Roadmap

## Fase 1

✔ Fundament

✔ Bestelengine

✔ OCR

✔ PDF

✔ Stabilisatie

---

## Fase 2

- Historie
- Productbeheer
- Medewerkers
- Vestigingen

---

## Fase 3

- Rollen
- Rechten
- Notificaties
- Logging

---

## Fase 4

- Analytics
- KPI's
- AI-ondersteuning
- Voorspellende analyses

---

# Intellectueel eigendom

Deze software is eigendom van:

**B. Derks Holding**

Alle rechten voorbehouden.

Gebruik is uitsluitend toegestaan onder een geldige schriftelijke licentie.

Ongeautoriseerd kopiëren, verspreiden, wijzigen of commercieel gebruik is verboden.

---

© 2026 B. Derks Holding