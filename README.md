# Clevers Bestellen

Interne bedrijfsapp voor het standaardiseren van voorraadbeheer, bestellingen en operationele processen binnen Clevers-vestigingen.

> **Vertrouwelijk**  
> Deze software is uitsluitend bestemd voor geautoriseerde gebruikers en vestigingen waarvoor een geldige licentie is verstrekt. Ongeautoriseerd gebruik, kopiëren, verspreiden of wijzigen is niet toegestaan.

---

# Functionaliteiten

- 🍦 Voorraad tellen
- 📦 Automatisch besteladvies
- 📄 PDF-generatie
- 📧 Bestellingen per e-mail verzenden
- 📚 Bestelhistorie
- ✅ Weektaken
- 👥 Medewerkersbeheer
- 📅 Planning
- 📊 Dashboard

---

# Techniek

- Next.js 16
- React 19
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS v4
- Resend
- OpenAI
- jsPDF
- pdf-lib

---

# Installatie

```bash
npm install
```

Maak vervolgens een `.env` bestand aan met minimaal:

```env
DATABASE_URL=

RESEND_API_KEY=

OPENAI_API_KEY=
```

---

# Database

```bash
npx prisma generate

npx prisma db push
```

---

# Development

```bash
npm run dev
```

Applicatie:

```
http://localhost:3000
```

---

# Build

```bash
npm run build

npm start
```

---

# Projectstructuur

```
app/
components/
data/
lib/
prisma/
public/
types/
```

---

# Ontwikkelprincipes

- TypeScript strict
- Geen `any`
- Herbruikbare componenten
- Businesslogica uitsluitend in `lib`
- Componenten met één verantwoordelijkheid
- Schaalbaar voor meerdere vestigingen
- Configuratie boven hardcoded logica
- Veiligheid en rechten vanaf de basis
- Performance boven complexiteit

---

# Intellectueel Eigendom

Deze software, inclusief broncode, architectuur, databaseontwerp, bedrijfslogica, documentatie en alle toekomstige uitbreidingen, is intellectueel eigendom van **Bram Derks Holding B.V.**, tenzij schriftelijk anders is overeengekomen.

Gebruik van deze software is uitsluitend toegestaan onder een geldige schriftelijke licentie. Het is niet toegestaan de software geheel of gedeeltelijk te kopiëren, wijzigen, verspreiden, reverse engineeren of commercieel te exploiteren zonder voorafgaande schriftelijke toestemming.

Zie het bestand **LICENSE** voor de volledige licentievoorwaarden.

---

© 2026 B. Derks Holding B.V. – Alle rechten voorbehouden.