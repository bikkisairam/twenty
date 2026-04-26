## Vision

**Purpose:** The #1 open-source CRM — an affordable, extensible, community-driven alternative to locked-in proprietary CRMs  
**Users:** Sales teams, customer success teams, agencies, and companies needing customizable customer relationship management

## Target Personas

| Persona | Pain Point | Goal |
|---------|------------|------|
| Sales teams | Expensive CRMs lock in data and force vendor dependence | Affordable, flexible CRM with data portability |
| Product teams | Legacy CRMs lack modern UX patterns (like Notion, Airtable) | Fresh UX with filters, kanban, table views, workflows |
| Developers | Closed-source CRMs limit customization and integrations | Open-source platform with plugin system and API-first architecture |
| Self-hosters | Vendor-hosted CRMs create privacy/compliance concerns | Self-hostable with Docker Compose |

## MVP Scope

**In Scope:**
- Customizable objects and fields (data model)
- Multiple views: table, kanban, filters, sort, group by
- Custom roles and permissions
- Workflow automation (triggers and actions)
- Email sync, calendar events, file attachments
- GraphQL + REST API
- Zapier integration for 3000+ apps
- Self-hosting via Docker Compose

**Out of Scope:**
- Native mobile apps (web-first)
- Offline-first operation
- Advanced AI/ML features beyond basic LLM integrations
- Built-in telephony/call recording

## Strategic Constraints

| Constraint | Reason |
|------------|--------|
| Open-source (AGPL-3.0) | Core mission is community-driven, vendor lock-in prevention |
| TypeScript monorepo | Full-stack consistency, type safety, shared code reuse |
| API-first architecture | Enable ecosystem growth, integrations, plugin development |
| PostgreSQL + Redis required | OLTP reliability, caching layer, queue backend |
| Plugin system roadmap | Extensibility is strategic differentiator vs. closed CRMs |