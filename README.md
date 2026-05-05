# NextAuth App

A small Next.js app demonstrating authentication and basic training content using NextAuth-style patterns and a lightweight SQLite-backed auth (`lucia` + `better-sqlite3`). This repo is a learning/example project used in the accompanying course materials.

## Features

- Next.js app (App Router)
- Email/password or local-style auth powered by `lucia` and `better-sqlite3`
- Simple training pages under the `(auth)/training` route
- Minimal API and helper utilities in `lib/`

## Requirements

- Node.js 18+ (recommended)
- npm or pnpm

## Install

Install dependencies:

```bash
npm install
```

## Project layout (important files)

- `app/` — Next.js App Router pages and layouts
- `app/(auth)/` — authenticated area and auth-related routes
- `components/` — UI components such as `auth-form.tsx`
- `lib/` — auth helpers, DB helpers, training utilities
- `db.ts` — database initialization helpers
- `public/` — static assets

## Notes on auth

This project uses `lucia` + `@lucia-auth/adapter-sqlite` and `better-sqlite3` for a lightweight local auth database. See `lib/auth.ts` and `db.ts` for setup details and adapters.

## Running locally

Start the dev server:

```bash
npm run dev
```


## Screenshots

![Home Page](https://github.com/user-attachments/assets/87b7c73e-0ca4-4160-9f29-3f2b02fde97e)



## Notes

- This is an **educational/demo** project. .
- Good for learning: App Router, server components, server actions, dynamic routes, loading/error/not-found UI, and form handling with a local database.

---

## License

This project is provided for learning purposes.
