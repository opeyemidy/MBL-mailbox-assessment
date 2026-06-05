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
│   ├── (app-layout)/
│   │   └── inbox/page.tsx           # Inbox page
│   │   └── messages/[id]/page.tsx   # Message detail page
│   │   └── layout.tsx               # Layout wrapper for mailbox pages  + TopBar
│   │   └── page.tsx                 # Landing / home page
│   ├── api/
│   │   ├── messages/
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts         # Get single message
│   │   │   │   └── read/route.ts    # Mark message as read
│   │   │   ├── route.ts             # List all messages
│   │   │   └── summary/route.ts     # Unread + total counts
│   │   └── test-db/route.ts         # DB health/test route
│   ├── api-docs/
│   │   ├── openapi-spec.json       # Generated OpenAPI JSON
│   │   ├── page.tsx                # API docs page
│   │   └── SwaggerUiComponent.tsx  # Swagger UI wrapper
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root app layout
├── components/
│   ├── Providers.tsx               # React Query + app providers
│   └── TopBar.tsx                  # Persistent top bar
├── lib/
│   ├── constant.ts                 # App constants
│   ├── prisma.ts                   # Prisma client singleton
│   ├── queryKeys.ts                # React Query key constants
│   └── generated/prisma/           # Prisma client generated output
├── prisma/
│   ├── schema.prisma               # DB schema
│   ├── seed.ts                     # Seed data script
│   └── migrations/                 # Prisma migration history
├── types/index.ts                  # Shared TypeScript types
├── openapi.yaml                    # API specification
├── next.config.js                  # Next.js config
├── package.json                    # Project scripts + dependencies
├── prisma.config.ts                # Prisma config
├── tsconfig.json                   # TypeScript config
└── next-env.d.ts                   # Next.js env types
```
