# Sutaeru — S1PRONTO

> Your Personal Agent Soul-Cloud. AI-native platform with sovereign data architecture.

## Tech Stack

- **Frontend**: React 19 + Vite 7 + Tailwind CSS 4 + Radix UI
- **Backend**: Express + tRPC (end-to-end type safety)
- **Database**: PostgreSQL + Drizzle ORM
- **AI**: Claude Sonnet 4.6 (normal) / Claude Opus 4.6 (Max) / Kimi (docs) / Gemini / Sonar
- **Voice**: ElevenLabs WebSocket (Kemma Calls)
- **Payments**: Stripe
- **Storage**: AWS S3
- **Design System**: Opus OS (block-based UI)

## Quick Start (Development)

```bash
# Clone
git clone https://github.com/remyzardap/S1PRONTO.git
cd S1PRONTO

# Install
npm install

# Configure
cp .env.example .env
# Edit .env with your keys

# Run
npm run dev
```

App starts at `http://localhost:5000`

## Deploy with Coolify

### Option 1: Docker (Recommended)

1. **In Coolify** → New Resource → Docker Compose
2. **Source**: GitHub → `remyzardap/S1PRONTO`
3. **Compose file**: `docker-compose.yml`
4. **Environment variables**: Add all vars from `.env.example`
5. **Deploy**

### Option 2: Dockerfile

1. **In Coolify** → New Resource → Application
2. **Source**: GitHub → `remyzardap/S1PRONTO`
3. **Build Pack**: Dockerfile
4. **Port**: 3000
5. **Environment variables**: Add all vars from `.env.example`
6. **Deploy**

### Option 3: Nixpacks (Auto-detect)

1. **In Coolify** → New Resource → Application
2. **Source**: GitHub → `remyzardap/S1PRONTO`
3. **Build Pack**: Nixpacks
4. **Build command**: `npm run build`
5. **Start command**: `node --import tsx/esm server/migrate.ts && node dist/index.js`
6. **Port**: 3000
7. **Deploy**

## Environment Variables

See `.env.example` for the full list. Key categories:

| Category | Variables |
|----------|-----------|
| Core | `NODE_ENV`, `PORT`, `APP_URL`, `DATABASE_URL` |
| Auth | `JWT_SECRET`, `SESSION_SECRET` |
| AI Models | `ANTHROPIC_API_KEY`, `KIMI_API_KEY`, `GEMINI_API_KEY`, `SONAR_API_KEY` |
| Voice | `ELEVEN_LABS_API_KEY`, `ELEVEN_LABS_AGENT_ID`, `ELEVEN_LABS_VOICE_ID` |
| Storage | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET` |
| Payments | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |
| Email | `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (port 5000) |
| `npm run build` | Build for production |
| `npm run start` | Run migrations + start production server |
| `npm run db:push` | Generate + run DB migrations |
| `npm run seed` | Seed database |

## Architecture

```
S1PRONTO/
├── client/           # React frontend
│   ├── src/
│   │   ├── os/       # Opus OS design system
│   │   ├── pages/    # Route pages
│   │   ├── components/
│   │   └── styles/   # sutaeru-os.css + theme
│   └── public/       # PWA assets
├── server/           # Express + tRPC backend
│   ├── _core/        # Core infra (auth, env, vite)
│   ├── routers/      # 26 tRPC routers
│   ├── services/     # Business logic
│   ├── kemma/        # Kemma agent engine
│   └── routes/       # Express routes (SSE, webhooks)
├── drizzle/          # DB schema + migrations
├── shared/           # Shared types & constants
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## License

Proprietary — Sutaeru © 2026
