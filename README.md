# squid.in 🌎

**squid.in** is a modern SaaS platform for collaborative project and team management. Built as a monorepo using Turborepo, it integrates authentication, RBAC, billing, and permission systems to support scalable and secure team collaboration.

The architecture is modular and shared between frontend and backend — with type-safe packages, shared envs, and access logic using CASL.

## Monorepo Structure 🧩

This project uses [`Turborepo`](https://turbo.build/repo) to manage a monorepo with shared packages for:

- Auth & Permissions using [`CASL`](https://casl.js.org/)
- Shared environment variables using `dotenv-cli`
- Unified types and configurations across backend and frontend

## Tech's and Tool's 🔧

### Back-end
- `Node.js` - JavaScript runtime
- `TypeScript` - Type safety
- `Fastify` - Fast backend framework
- `Prisma ORM` - Typed database queries
- `Zod` - Schema validation
- `Swagger` - API docs
- `Faker` - Realistic fake data generation for seed scripts
- `bcryptjs` - Password hashing
- `dotenv-cli` - Loads `.env` variables
- `tsx` - TypeScript runtime for dev scripts
- `Biome` - Formatter/linter

### Front-end
- `React 19` - Component library
- `Next.js 15` - Full-stack React framework
- `TypeScript` - Typed frontend code
- `TailwindCSS` - Utility CSS
- `Shadcn/UI` - Component library
- `Zod` - Schema sharing
- `Lucide Icons` - Open-source icon set
- `React Hook Form` - Form management
- `React Query` - Data fetching with caching
- `next-themes` - Theme toggle and system preference support
- `clsx` - Utility for conditional class names
- `dotenv-cli` - Frontend .env loading in build/dev

### Database
- `PostgreSQL` - SQL database

### Tooling
- `Docker` - Containerization
- `VS Code` - IDE
- `Insomnia` - API debugging
- `DBeaver` - Database interface
- `Warp` - Terminal

## Features 🚀

### Authentication
- Email & password
- GitHub OAuth
- Password reset
- Signup w/ validation

### Authorization
- `CASL` for granular, attribute-based permissions
- Centralized role logic via RBAC + ABAC pattern

### Organizations
- Create / update / delete
- View all user organizations
- Shutdown & transfer ownership

### Invitations
- Invite members by email + role
- Accept or revoke invites

### Members
- List & manage team members
- Update or change roles

### Projects
- Create / update / delete
- View all organization projects

### Billing
- View billing by org
- Pricing: $20/project, $10/member (except billing role)

### RBAC
- Role-based access for:
  - Owner
  - Administrator
  - Member
  - Billing
  - Anonymous

#### Permissions Matrix

| Permission                    | Admin | Member | Billing | Anonymous |
|------------------------------|:-----:|:------:|:-------:|:---------:|
| Update/Delete Organization   | ✅    | ❌     | ❌      | ❌        |
| Invite/Revoke Members        | ✅    | ❌     | ❌      | ❌        |
| List Members                 | ✅    | ✅     | ✅      | ❌        |
| Transfer Ownership           | ⚠️    | ❌     | ❌      | ❌        |
| Manage Member Roles          | ✅    | ❌     | ❌      | ❌        |
| List/Create/Update Projects  | ✅    | ✅ ⚠️  | ❌      | ❌        |
| View Billing Info            | ✅    | ❌     | ✅      | ❌        |

> ⚠️ With conditions (e.g., members only edit their projects)

## How to run the project in local? 🧐

### Prerequisites
- [Node.js](https://nodejs.org/pt)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VScode](https://code.visualstudio.com/download) or your favorite code editor

## License 📝
This project is licensed under the [MIT License](https://github.com/LFeli/squd.in/blob/main/LICENSE).

--- 
<br />
<br />
<div align="center">
  Made with 💙 by <a href="https://github.com/LFeli" target="_blank">LFeli</a>
</div>