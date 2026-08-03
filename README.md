# Clevers Bestelsysteem

Interne bedrijfsapp voor Clevers.

## Functionaliteiten

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

## Techniek

- Next.js 16
- React 19
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS v4
- Resend
- jsPDF
- pdf-lib

---

## Installatie

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

## Database

```bash
npx prisma generate

npx prisma db push
```

---

## Development

```bash
npm run dev
```

Applicatie:

```
http://localhost:3000
```

---

## Build

```bash
npm run build

npm start
```

---

## Projectstructuur

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

## Ontwikkelregels

- TypeScript strict
- Geen `any`
- Herbruikbare componenten
- Businesslogica in `lib`
- Componenten zo klein mogelijk
- Eén verantwoordelijkheid per bestand

---

## Auteur

Clevers Bestelsysteem
2026