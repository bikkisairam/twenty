---
language: typescript
package_manager: yarn
test_runner: jest
test_command: npx nx test
test_file_pattern: "**/*.{test,spec}.{ts,tsx}"
require_tests: true
---

## Module Map

| Directory | Language | Purpose |
|-----------|----------|---------|
| packages/twenty-server | TypeScript + NestJS | Backend GraphQL/REST API, NestJS modules, database |
| packages/twenty-front | TypeScript + React | Frontend SPA, Vite build, React 18 |
| packages/twenty-ui | TypeScript + React | Shared UI component library |
| packages/twenty-shared | TypeScript | Shared utilities between front/server |
| packages/twenty-emails | TypeScript + React Email | Email templates |
| packages/twenty-sdk | TypeScript | SDK for Twenty API integration |
| packages/twenty-cli | TypeScript | CLI tool (deprecated, use SDK) |
| packages/twenty-zapier | TypeScript | Zapier integration |
| packages/create-twenty-app | TypeScript | CLI scaffolding tool |
| packages/twenty-docs | TypeScript + Mintlify | Documentation site |
| packages/twenty-website | Next.js | Marketing website |
| packages/twenty-e2e-testing | TypeScript | E2E test suite |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | Nx 22.5.4, Yarn 4.13 |
| Frontend | React 18, Vite 7, Apollo Client, Jotai state, Linaria CSS |
| Backend | NestJS 11, GraphQL Yoga, TypeORM 0.3.20 |
| Database | PostgreSQL 18, Redis, ClickHouse 25.8.8 |
| Queue | BullMQ 5.40 |
| Testing | Jest 29.7, Vitest 4, Playwright, Storybook 10.3 |
| Bundler | Vite 7 (front), esbuild (server) |
| i18n | Lingui 5.1.2 |
| Observability | Sentry, OpenTelemetry |

## System Architecture

| Component | Role | Communication |
|-----------|------|---------------|
| twenty-front | SPA client | GraphQL over HTTP → twenty-server |
| twenty-server | Main API | Serves /graphql, /metadata, /rest endpoints |
| twenty-server worker | Queue processor | Reads BullMQ jobs from Redis |
| PostgreSQL | OLTP store | TypeORM entities, migrations |
| ClickHouse | Analytics store | Event logging, metrics |
| Redis | Cache + Queue | Session storage, BullMQ backend |
| S3 | File storage | File uploads via AWS SDK |

**Modules Architecture:**
- `packages/twenty-server/src/modules/`: Domain modules (messaging, calendar, workflow, etc.)
- `packages/twenty-server/src/engine/`: Core engine (auth, API, ORM, metadata)
- `packages/twenty-front/src/modules/`: Feature modules (object-record, settings, workflow, etc.)

## Key Interfaces & Contracts

**GraphQL Endpoints:**
- `/graphql` → Core API (data queries/mutations)
- `/metadata` → Metadata API (schema management)

**REST API:**
- `/rest/*` → REST API endpoints via `RestApiModule`

**Environment Variables (server):**
- `NODE_PORT` → Server port
- `POSTGRES_*` → DB connection
- `REDIS_*` → Cache/queue connection
- `CLICKHOUSE_URL`, `CLICKHOUSE_PASSWORD` → Analytics DB
- `STORAGE_*` → File storage config
- `IS_BILLING_ENABLED`, `BILLING_STRIPE_*` → Stripe integration

**Frontend Config Injection:**
- Server generates `pa