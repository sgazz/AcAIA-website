# AcAIA Backend API

Backend API za AcAIA - AI asistenta za učenje i razvoj.

## 🚀 Funkcionalnosti

- **Autentifikacija i autorizacija** - JWT tokeni, registracija, login
- **AI Chat Assistant** - Inteligentni razgovor sa AI-om
- **Problem Generation** - AI generisanje edukativnih problema
- **Exam Simulations** - Simulacije ispita sa AI-om
- **Career Guidance** - Karijerni saveti i planovi učenja
- **User Management** - Upravljanje korisnicima i profilima
- **Progress Tracking** - Praćenje napretka u učenju

## 🛠️ Tehnologije

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM za MongoDB
- **JWT** - Autentifikacija
- **OpenAI API** - AI funkcionalnosti
- **Redis** - Caching i rate limiting
- **Joi** - Validacija podataka

## 📋 Preduzeti

### Instalacija zavisnosti

```bash
cd backend
npm install
```

### Konfiguracija environment varijabli

Kopirajte `env.example` u `.env` i popunite potrebne vrednosti:

```bash
cp env.example .env
```

Potrebne varijable:
- `MONGODB_URI` - MongoDB konekcija
- `JWT_SECRET` - Tajni ključ za JWT
- `OPENAI_API_KEY` - OpenAI API ključ
- `REDIS_URL` - Redis konekcija (opciono)

### Pokretanje u development modu

```bash
npm run dev
```

### Build za produkciju

```bash
npm run build
npm start
```

## 📚 API Endpoints

### Autentifikacija
- `POST /api/auth/register` - Registracija korisnika
- `POST /api/auth/login` - Prijavljivanje
- `GET /api/auth/me` - Trenutni korisnik
- `PUT /api/auth/profile` - Ažuriranje profila
- `PUT /api/auth/password` - Promena lozinke

### AI Chat
- `POST /api/chat` - Kreiranje novog chat-a
- `GET /api/chat` - Lista chat-ova
- `GET /api/chat/:id` - Dohvatanje chat-a
- `POST /api/chat/:id/messages` - Slanje poruke
- `DELETE /api/chat/:id` - Brisanje chat-a

### Problemi
- `POST /api/problems/generate` - AI generisanje problema
- `GET /api/problems` - Lista problema
- `GET /api/problems/:id` - Dohvatanje problema
- `POST /api/problems/:id/solve` - Rešavanje problema
- `POST /api/problems/:id/rate` - Ocena problema

### Simulacije ispita
- `POST /api/exams/generate` - AI generisanje ispita
- `GET /api/exams` - Lista ispita
- `GET /api/exams/:id` - Dohvatanje ispita
- `POST /api/exams/:id/submit` - Predavanje ispita
- `GET /api/exams/:id/results` - Rezultati ispita

### Karijerni saveti
- `POST /api/career/advice` - Generisanje karijernog saveta
- `GET /api/career/paths` - Karijerni putovi
- `POST /api/career/assessment` - Procena veština

## 🗄️ Baza podataka

### Modeli

#### User
- Osnovni podaci korisnika
- Preferencije (jezik, tema, notifikacije)
- Napredak u učenju
- Role-based pristup

#### Chat
- AI chat sesije
- Poruke sa metadata
- Kontekst učenja

#### Problem
- Edukativni problemi
- AI generisani sadržaj
- Statistike rešavanja

#### Exam
- Simulacije ispita
- Pitanja i odgovori
- Rezultati i analitika

## 🔒 Sigurnost

- **Helmet** - Sigurnosni headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Ograničavanje zahteva
- **Input Validation** - Validacija ulaznih podataka
- **JWT Authentication** - Token-based autentifikacija
- **Password Hashing** - Bcrypt enkripcija

## 🧪 Testiranje

```bash
npm test
```

## 📊 Monitoring

- **Morgan** - HTTP request logging
- **Health Check** - `/health` endpoint
- **Error Handling** - Centralizovano rukovanje greškama

## 🚀 Deployment

### Docker

```bash
docker build -t acaia-backend .
docker run -p 5000:5000 acaia-backend
```

### Environment Variables

Za produkciju postavite:
- `NODE_ENV=production`
- `MONGODB_URI_PROD` - Produkcijska MongoDB
- `JWT_SECRET` - Snažan tajni ključ
- `CORS_ORIGIN` - Frontend URL

## 🤝 Doprinosi

1. Fork repozitorijuma
2. Kreirajte feature granu (`git checkout -b feature/amazing-feature`)
3. Commit promene (`git commit -m 'Add amazing feature'`)
4. Push na granu (`git push origin feature/amazing-feature`)
5. Otvorite Pull Request

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje. 