# Elysia Postgresql starter

<!--toc:start-->

- [Elysia Postgresql starter](#elysia-postgresql-starter)
  - [Tools](#tools)
  - [Features](#features)
  - [Better-Auth](#better-auth)
  - [Drizzle](#drizzle)
    - [Generate](#generate)
    - [Migrate](#migrate)
  - [Ref](#ref)

## Tools

- [x] Elysia
- [x] Bun
- [x] Typescript
- [x] Dirzzle
- [x] Postgresql
- [x] Biome
- [x] Logger
- [x] Commitlint
- [x] Lefthhok
- [x] Error Handler
- [x] Response Handler

## Features

- [x] drizzle-typebox
- [x] better-auth
- [x] Role-base

## Better-Auth

```bash
npx @better-auth/cli generate --config ./src/common/auth/auth.ts --output ./src/common/auth/auth-schema.ts
```

## Drizzle

### Generate

```bash
npx drizzle-kit generate
```

### Migrate

```bash
npx drizzle-kit migrate
```

## Ref

- [https://github.com/remuspoienar/bun-elysia-drizzle-sqlite](https://github.com/remuspoienar/bun-elysia-drizzle-sqlite)
- [bun-api-starter](https://github.com/cham11ng/bun-api-starter)
- cm_esc_back
