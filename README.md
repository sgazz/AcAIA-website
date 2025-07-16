# AcAIA Website

Moderan, responzivan website za AcAIA - AI asistent za učenje i razvoj.

## 🚀 Funkcije

- **Moderan dizajn** - Koristi Tailwind CSS sa gradijentima i animacijama
- **Dark/Light mode** - Automatsko prebacivanje između tema
- **Responzivan** - Optimizovan za sve uređaje
- **TypeScript** - Potpuno tipizovan kod
- **Next.js 14** - Najnovija verzija sa App Router-om
- **Komponente** - Modularne, ponovno upotrebljive komponente

## 📁 Struktura

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Početna stranica
│   ├── about/             # O nama stranica
│   ├── pricing/           # Cene stranica
│   ├── contact/           # Kontakt stranica
│   ├── layout.tsx         # Glavni layout
│   └── globals.css        # Globalni stilovi
├── components/            # React komponente
│   ├── ui/               # UI komponente (Button, Card, Badge)
│   ├── Navbar.tsx        # Navigacija
│   └── Footer.tsx        # Footer
└── lib/                  # Utility funkcije
    └── utils.ts          # Pomocne funkcije
```

## 🛠️ Tehnologije

- **Next.js 14** - React framework
- **TypeScript** - Tipizacija
- **Tailwind CSS** - Stilizovanje
- **Lucide React** - Ikone
- **Framer Motion** - Animacije
- **Radix UI** - Primitivi

## 🚀 Pokretanje

1. **Instalacija zavisnosti:**
   ```bash
   npm install
   ```

2. **Pokretanje development servera:**
   ```bash
   npm run dev
   ```

3. **Otvaranje u browseru:**
   ```
   http://localhost:3000
   ```

## 📱 Stranice

### Početna stranica (`/`)
- Hero sekcija sa call-to-action
- Funkcije platforme
- CTA sekcija

### O nama (`/about`)
- Informacije o misiji
- Naše vrednosti
- Tim sekcija

### Cene (`/pricing`)
- Tri plana (Besplatno, Pro, Enterprise)
- FAQ sekcija
- CTA sekcija

### Kontakt (`/contact`)
- Kontakt forma
- Kontakt informacije
- Radno vreme
- FAQ sekcija

## 🎨 Dizajn

### Boje
- **Primarne:** Plava i ljubičasta gradijent
- **Sekundarne:** Siva i bela
- **Akcent:** Zelena i narandžasta

### Tipografija
- **Font:** Inter (Google Fonts)
- **Veličine:** Responsive sa Tailwind klasama

### Komponente
- **Card** - Za sadržaj blokove
- **Button** - Sa različitim varijantama
- **Badge** - Za oznake
- **Navbar** - Sa mobilnom navigacijom
- **Footer** - Sa linkovima i informacijama

## 🔧 Konfiguracija

### Tailwind CSS
- Dark mode podrška
- Custom CSS varijable
- Responsive breakpoints

### Next.js
- App Router
- TypeScript
- ESLint konfiguracija

## 📦 Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## 🌐 Deployment

Website je spreman za deployment na:
- Vercel
- Netlify
- AWS Amplify
- Bilo koji statički hosting

## 🤝 Doprinosi

1. Fork repozitorijum
2. Kreiraj feature granu
3. Napravi promene
4. Push i kreiraj Pull Request

## 📄 Licenca

MIT License - pogledajte LICENSE fajl za detalje.

## 📞 Kontakt

- **Email:** info@acaia.com
- **Website:** https://acaia.com
- **GitHub:** https://github.com/acaia
