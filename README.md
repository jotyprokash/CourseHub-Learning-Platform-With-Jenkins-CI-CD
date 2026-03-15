# CourseHub - Online Learning Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5+-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-green.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready online learning platform with course management, student enrollment, and progress tracking. Built with Next.js, Express.js, PostgreSQL, and containerized with Docker.

## Features

- **JWT Authentication** - Secure user registration and login with token-based auth
- **Role-Based Access Control** - Admin and student user roles with appropriate permissions
- **Course Management** - Admins can create and manage courses with lessons
- **Student Enrollment** - Students can browse and enroll in courses
- **Progress Tracking** - Track lesson completion and student progress
- **YouTube Integration** - Embed YouTube videos directly in lessons
- **Responsive Design** - Mobile-friendly interface with TailwindCSS
- **RESTful API** - Complete REST API for course management and enrollment
- **Docker Containerization** - Multi-service deployment with docker-compose
- **PostgreSQL Database** - Normalized schema with 5 tables and referential integrity

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose
- Git

### Using Docker (Recommended)

1. Clone the repository
   ```bash
   git clone https://github.com/jotyprokash/Jenkins-CI-CD-Pipeline-Setup.git
   cd Jenkins-CI-CD-Pipeline-Setup
   ```

2. Configure environment
   ```bash
   cp .env.example .env
   ```

3. Deploy with Docker Compose
   ```bash
   docker compose up --build
   ```

4. Access the application
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000/api
   - **Database:** localhost:5432

### Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**Student Accounts:**
- Email: `student1@example.com` | Password: `student123`
- Email: `student2@example.com` | Password: `student123`
## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT token)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course with lessons
- `POST /api/courses` - Create course (Admin only)

### Lessons
- `GET /api/courses/:id/lessons` - Get lessons for a course
- `POST /api/lessons` - Create lesson (Admin only)

### Enrollment
- `POST /api/enrollment` - Enroll student in course
- `GET /api/enrollment` - Get student enrollments

### Progress
- `GET /api/progress` - Get student progress
- `POST /api/progress` - Mark lesson as completed

## Tech Stack

### Frontend
- **Framework:** Next.js 15.5 with App Router
- **Language:** TypeScript with strict mode
- **Styling:** TailwindCSS 3.3
- **HTTP Client:** Axios with JWT interceptor
- **Validation:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js 18 (Alpine)
- **Framework:** Express.js 4.18
- **Authentication:** JWT Token-based
- **Password Hashing:** bcryptjs
- **Database Client:** pg (PostgreSQL)

### Database
- **Engine:** PostgreSQL 15
- **Normalization:** 5 normalized tables
- **Relationships:** Foreign keys with referential integrity
- **Constraints:** UNIQUE constraints on enrollments and progress

### Infrastructure
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Development:** Multi-stage builds, Alpine base images

## Project Structure

```
├── backend/                 # Express API server
│   ├── server.js           # Main server file
│   ├── db.js               # PostgreSQL connection
│   ├── middleware/         # Auth middleware
│   └── routes/             # API endpoints
├── frontend/               # Next.js web app
│   ├── app/                # Next.js App Router
│   ├── components/         # React components
│   ├── lib/                # Utilities (api, auth)
│   └── public/             # Static assets
├── database/               # Database setup
│   ├── schema.sql          # Table definitions
│   └── seed.sql            # Demo data
├── docker-compose.yml      # Multi-service orchestration
└── README.md               # This file
```

## Getting Started with Development

### Backend Development
```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Database Setup
Ensure PostgreSQL 15 is running, then:
```bash
psql -U postgres -d course_platform < database/schema.sql
psql -U postgres -d course_platform < database/seed.sql
```

## Security Features

- **JWT Authentication** - Token-based stateless auth
- **Password Hashing** - bcryptjs with $2a$ format
- **Role-Based Access** - Admin and student roles
- **CORS Enabled** - Cross-origin requests configured
- **Environment Variables** - Sensitive config in .env
- **Input Validation** - Server-side validation on all endpoints

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
