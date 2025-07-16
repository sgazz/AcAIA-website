# AcAIA Development Setup

## 🚀 Brzo pokretanje

### Opcija 1: Pokretanje oba servera istovremeno (preporučeno)
```bash
./start-both.command
```

### Opcija 2: Pokretanje pojedinačno

**Backend server:**
```bash
./start-backend.command
```

**Frontend server:**
```bash
./start-frontend.command
```

## 📋 Ručno pokretanje

### Backend
```bash
cd backend
npm install
npm run dev
```
Backend će biti dostupan na: http://localhost:3001

### Frontend
```bash
npm install
npm run dev
```
Frontend će biti dostupan na: http://localhost:3000

## 🔧 Konfiguracija

### Backend Environment
Kopirajte `backend/env.example` u `backend/.env` i popunite potrebne vrednosti:

```bash
cp backend/env.example backend/.env
```

### Portovi
- **Frontend:** 3000
- **Backend:** 3001

## 📁 Struktura projekta

```
AcAIA_website/
├── start-backend.command    # Pokretanje backend-a
├── start-frontend.command   # Pokretanje frontend-a
├── start-both.command       # Pokretanje oba servera
├── backend/                 # Backend aplikacija
│   ├── src/
│   ├── package.json
│   └── env.example
├── src/                     # Frontend aplikacija (Next.js)
├── package.json
└── README.md
```

## 🛠️ Development komande

### Backend
```bash
cd backend
npm run dev      # Development server
npm run build    # Build za produkciju
npm run start    # Pokretanje produkcije
npm run lint     # ESLint provera
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build za produkciju
npm run start    # Pokretanje produkcije
npm run lint     # ESLint provera
```

## 🐛 Troubleshooting

### Problem sa portovima
Ako su portovi zauzeti, možete ih promeniti:

**Backend:** Uredite `backend/src/index.ts`
**Frontend:** Uredite `package.json` scripts

### Problem sa dependencies
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
rm -rf node_modules package-lock.json
npm install
```

### Problem sa .env fajlom
Proverite da li postoji `backend/.env` fajl sa ispravnim vrednostima. 