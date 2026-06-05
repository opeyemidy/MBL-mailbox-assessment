# Mail Inbox App

A full-stack mail inbox application built with Next.js, Prisma, PostgreSQL, and React Query.

## Stack

- **Frontend**: Next.js 16 (App Router), React Query
- **Backend**: Next.js API Routes
- **ORM**: Prisma
- **Database**: PostgreSQL

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mail_inbox"
```

### 3. Set up the database

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to DB
npm run db:seed       # Seed Jim's user and 10 messages
```

### 4. Run the app

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## API Reference

Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) or see `openapi.yaml` for the full OpenAPI specification.

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| GET    | `/api/messages/summary`  | Unread count + total for Jim |
| GET    | `/api/messages`          | List all messages            |
| GET    | `/api/messages/:id`      | Get single message           |
| PATCH  | `/api/messages/:id/read` | Mark message as read         |

## Project Structure

```
├── app/
│   ├── api/messages/        # API routes
│   ├── inbox/               # Inbox page
│   ├── messages/[id]/       # Message detail page
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout + TopBar
│   └── globals.css          # Global styles
├── components/
│   ├── Providers.tsx        # React Query provider
│   └── TopBar.tsx           # Persistent top bar
├── lib/
│   ├── prisma.ts            # Prisma singleton
│   └── queryKeys.ts         # React Query key constants
├── prisma/
│   ├── schema.prisma        # DB schema
│   └── seed.ts              # Seed data
├── types/index.ts           # Shared TypeScript types
└── openapi.yaml             # API specification
```
