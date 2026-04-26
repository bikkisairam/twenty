## Sensitive Data

| Data | Where Stored | Protection |
|------|--------------|------------|
| User passwords | PostgreSQL | bcrypt hashed (bcrypt@5.1.1) |
| OAuth tokens (Google, Microsoft) | PostgreSQL `connected-account` table | Encrypted at rest, rotated via refresh tokens |
| Session tokens | Redis | Signed JWT via express-session, httpOnly cookies |
| Stripe API keys | Environment variables | Not in code, loaded from `BILLING_STRIPE_*` env vars |
| Email credentials (IMAP) | PostgreSQL | Encrypted, per-workspace isolation |
| File uploads | S3 or local storage | Presigned URLs, access controlled via workspace auth |
| ClickHouse password | Environment variable | `CLICKHOUSE_PASSWORD` for analytics DB |

## Trust Boundaries

| Caller | Callee | Auth Method |
|--------|--------|-------------|
| Frontend | /graphql, /metadata | JWT in Authorization header, validated in `GraphQLHydrateRequestFromTokenMiddleware` |
| Frontend | /rest/* | JWT in Authorization header, validated in `RestCoreMiddleware` |
| External services | Webhook endpoints | Signature verification (Stripe webhook secret) |
| Queue worker | Redis + PostgreSQL | Internal service, no external auth |
| MCP clients | /mcp | Method guard via `McpMethodGuardMiddleware` |

**Workspace Isolation:**
- All data scoped by `workspaceId`
- `WorkspaceAuthContextMiddleware` enforces workspace membership
- TypeORM queries automatically filtered by workspace

## Security Requirements

- All GraphQL/REST endpoints require valid JWT except public routes
- SAML/OIDC support via passport-saml, openid-client
- 2FA via OTP (otplib@12.0.1)
- Workspace-level role-based access control (RBAC)
- File upload size limits enforced (`settings.storage.maxFileSize`)
- CORS enabled with explicit origin validation
- HTTPS required in production (SSL_KEY_PATH, SSL_CERT_PATH)
- SQL injection prevention via TypeORM parameterized queries
- XSS prevention via DOMPurify (dompurify@3.3.3)

## Security Checklist

- [ ] JWT secret rotation ca