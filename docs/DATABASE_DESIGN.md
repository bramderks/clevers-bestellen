# Clevers Bestellen
## Database Ontwerp

**Versie:** 1.0  
**Status:** Ontwerp  
**Laatst bijgewerkt:** 4 augustus 2026

---

# Doel

De database moet niet alleen geschikt zijn voor de huidige vestiging(en), maar voor een professioneel softwareplatform dat tientallen vestigingen kan ondersteunen.

Belangrijkste uitgangspunten:

- schaalbaar
- veilig
- uitbreidbaar
- historisch inzicht
- minimale refactoring in de toekomst

---

# Architectuur

De database bestaat uit vier lagen.

## 1. Platform

Platformgegevens die slechts één keer bestaan.

Voorbeelden:

- gebruikers
- rollen
- rechten
- licenties
- instellingen
- logging

---

## 2. Vestigingen

Iedere vestiging krijgt een eigen administratie.

Iedere vestiging heeft straks:

- producten
- buffers
- bestellingen
- medewerkers
- weektaken
- planning
- historie

Alle gegevens zijn gekoppeld aan een Vestiging.

Geen losse vestigingsnamen meer als string.

---

## 3. Operationeel

Dagelijkse werkzaamheden.

Voorbeelden:

- tellingen
- bestellingen
- OCR
- PDF
- planning
- urenregistratie

---

## 4. Analyse

Historische gegevens.

Voorbeelden:

- trends
- KPI's
- voorspellingen
- dashboards
- AI

Deze gegevens worden nooit overschreven.

---

# Geplande hoofdtabellen

## Platform

Vestiging

Gebruiker

Rol

Recht

GebruikerRol

Instelling

AuditLog

Licentie

---

## Operationeel

Product

ProductBuffer

Bestelling

BestellingRegel

OCRImport

Week

WeekTaak

Planning

Dienst

UurRegistratie

---

## Medewerkers

Medewerker

Beschikbaarheid

Contract

Functie

---

## Analyse

Statistiek

Dashboard

Rapport

Voorspelling

---

# Belangrijk uitgangspunt

Vrijwel iedere tabel krijgt uiteindelijk:

- id
- vestigingId
- aangemaaktOp
- gewijzigdOp
- aangemaaktDoor
- gewijzigdDoor
- actief

Daardoor ontstaat automatisch:

- historie
- logging
- filtering
- audittrail

---

# Rollen

Voorlopig voorzien:

Platformbeheerder

Eigenaar

Franchisenemer

Vestigingsmanager

Floormanager

Medewerker

Lezen

De rechten worden niet hardcoded.

Iedere pagina controleert rechten via rollen.

---

# Logging

Iedere belangrijke actie wordt uiteindelijk geregistreerd.

Voorbeelden:

- product gewijzigd
- bestelling verwijderd
- buffer aangepast
- medewerker aangemaakt
- planning gewijzigd

---

# Historie

Gegevens worden bij voorkeur nooit verwijderd.

Gebruik:

- actief
- gearchiveerd
- verwijderdOp

in plaats van fysieke verwijdering.

---

# Multi-vestiging

Alle operationele gegevens zijn gekoppeld aan een Vestiging.

Hierdoor kan één installatie meerdere vestigingen beheren zonder codewijzigingen.

---

# Licenties

De software wordt ontwikkeld als proprietary software.

Per vestiging kan later een licentie worden gekoppeld.

Mogelijke gegevens:

- licentienummer
- type
- actief
- geldigTot

---

# Toekomst

Bij iedere uitbreiding geldt:

Niet kijken of iets nu werkt.

Kijken of het over vijf jaar nog steeds de juiste architectuur is.

---

© 2026 B. Derks Holding