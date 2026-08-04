# Historie - Functioneel Ontwerp

**Versie:** 1.0  
**Status:** Goedgekeurd  
**Module:** Historie

---

# Doel

De historiemodule geeft volledig inzicht in alle uitgevoerde tellingen en bestellingen.

Het systeem moet niet alleen tonen wat besteld is, maar ook waarom.

Historie vormt de basis voor:

- controle
- analyses
- optimalisatie
- forecasting
- AI

Historische gegevens worden nooit verwijderd.

---

# Gebruikers

## Medewerker

Mag:

- eigen telling bekijken
- bestelling openen
- PDF opnieuw downloaden

Mag niet:

- verwijderen
- wijzigen

---

## Vestigingsmanager

Mag:

- alles bekijken
- zoeken
- vergelijken
- opmerkingen toevoegen
- opnieuw bestellen

---

## Eigenaar

Mag:

- alle vestigingen bekijken
- analyses uitvoeren
- exports maken
- statistieken bekijken

---

# Overzicht

Per bestelling tonen:

- datum
- tijd
- vestiging
- medewerker
- type bestelling
- aantal producten
- totaal besteld
- opmerkingen
- status

---

# Zoeken

Zoeken op:

- datum
- medewerker
- product
- vestiging
- besteltype

---

# Filters

- vandaag
- gisteren
- deze week
- vorige week
- deze maand
- vorig jaar

Daarnaast:

- vestiging
- medewerker
- type

---

# Detailpagina

Toont:

Algemene gegevens

Productregels

Geteld

Buffer

Besteld

Opmerking

PDF downloaden

---

# Vergelijken

Vergelijk twee bestellingen.

Toon verschillen.

Bijvoorbeeld:

Vanille

Maandag:
3

Dinsdag:
7

Verschil:
+4

---

# Herhalen

Manager kan kiezen:

"Gebruik als basis"

De bestelling wordt opnieuw geladen.

---

# Opmerkingen

Managers kunnen achteraf opmerkingen toevoegen.

Bijvoorbeeld:

"Hittegolf"

"Evenement"

"Machine storing"

Deze informatie wordt later gebruikt voor analyses.

---

# Historische data

Per bestelling bewaren:

- datum
- tijd
- gebruiker
- vestiging
- buildnummer
- databaseversie
- appversie

Hierdoor weten we altijd met welke software de bestelling gemaakt is.

---

# Toekomstige uitbreidingen

- verschillen t.o.v. vorige bestelling
- verschillen t.o.v. vorig jaar
- weersinformatie
- omzet
- AI-verklaring
- voorspelling volgende bestelling

---

# Ontwerpregels

Historische gegevens worden nooit aangepast.

Correcties worden als nieuwe records opgeslagen.

Zo blijft de historie volledig betrouwbaar.

---

© 2026 B. Derks Holding