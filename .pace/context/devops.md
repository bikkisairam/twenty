## CI/CD

| Trigger | Workflow | Jobs |
|---------|----------|------|
| Pull request | ci-front.yaml | lint, typecheck, test, build, storybook:build, storybook:test (4 shards) |
| Pull request | ci-server.yaml | lint, typecheck, test, test:integration (10 shards), validation |
| Pull request | ci-*.yaml | Per-package CI (ui, shared, sdk, emails, zapier, docs, website) |
| Push to main | cd-deploy-main.yaml | Deploy main branch |
| Tag push | cd-deploy-tag.yaml | Release deployment |
| Manual | preview-env-dispatch.yaml | Ephemeral preview environments |

**Test Strategy:**
- Storybook tests run on static build (http-server on port 6006)
- Integration tests need PostgreSQL 18, Redis, ClickHouse 25.8.8 services
- Coverage: storybook tests generate istanbul coverage, checked with nyc

## Environment Variables

| Name | Required | Purpose |
|------|----------|---------|
| NODE_PORT | No (default 3000) | Server listen port |
| POSTGRES_USER, POSTGRES_PASSWORD | Yes | PostgreSQL connection |
| REDIS_HOST, REDIS_PORT | Yes | Redis connection |
| CLICKHOUSE_URL, CLICKHOUSE_PASSWORD | Yes (analytics) | ClickHouse connection |
| ACCESS_TOKEN_SECRET | Yes | JWT signing secret |
| STORAGE_TYPE | Yes | S3 or local file storage |
| AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY | If S3 | S3 credentials |
| IS_BILLING_ENABLED, BILLING_STRIPE_* | If billing | Stripe integration |
| SENTRY_DSN | No | Error tracking |
| NODE_ENV | Yes | production/development/test |

## Local Dev

1. Install Node.js