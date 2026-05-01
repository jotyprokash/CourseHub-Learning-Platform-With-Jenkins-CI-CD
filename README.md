# CourseHub

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red.svg)](https://www.jenkins.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Online learning platform used as the application workload for a Jenkins CI/CD pipeline demonstration. The focus of this repository is **infrastructure and deployment automation**, not the application itself.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│  PostgreSQL  │
│  Next.js    │     │  Express.js │     │     15       │
│  :3000      │     │  :5000      │     │  :5432       │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │
       └───────────────────┴────────────────────┘
                    Docker Compose
```

## Quick Start

```bash
cp .env.example .env
docker compose up --build -d
```

| Service    | URL                    |
|------------|------------------------|
| Frontend   | http://localhost:3000   |
| Backend    | http://localhost:5000   |
| PostgreSQL | localhost:5432          |

## Project Structure

```
├── backend/              # Express.js API (ESM, JWT auth, pg)
├── frontend/             # Next.js 15 (TypeScript, TailwindCSS)
├── database/
│   ├── schema.sql        # DDL — 5 normalized tables
│   └── seed.sql          # Demo data
├── docker-compose.yml    # Multi-service orchestration
├── Jenkinsfile           # CI/CD pipeline definition
└── .env.example          # Environment template
```

## CI/CD Pipeline

The `Jenkinsfile` defines a declarative pipeline with the following stages:

1. **Checkout** — Pull source from SCM
2. **Install Dependencies** — `npm install`
3. **Run Tests** — `npm test`
4. **Build Docker Image** — Multi-stage build
5. **Push to Registry** — Tag and push to Docker Hub
6. **Deploy** — Deployment trigger (configurable)

## Environment Variables

| Variable            | Default            | Description              |
|---------------------|--------------------|--------------------------|
| `POSTGRES_DB`       | `course_platform`  | Database name            |
| `POSTGRES_USER`     | `postgres`         | Database user            |
| `POSTGRES_PASSWORD` | `changeme`         | Database password        |
| `JWT_SECRET`        | `change-me`        | JWT signing secret       |

## License

MIT
