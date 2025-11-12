# Cybersecurity Training Platform

## Overview

SecureLearn is a gamified cybersecurity training platform that provides interactive learning modules, quizzes, and knowledge articles to help users master cybersecurity fundamentals. The platform features progress tracking, course management, and a modern, approachable UI designed to reduce the intimidation often associated with cybersecurity education.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching
- Tailwind CSS for utility-first styling with custom design system

**Component Library:**
- shadcn/ui component library built on Radix UI primitives
- Custom design system following Material Design principles combined with e-learning platform patterns (Duolingo, Khan Academy, Udemy)
- Typography: Inter for headings/UI, DM Sans for body text
- Standardized spacing system using Tailwind units (2, 4, 6, 8, 12, 16)

**State Management:**
- React Query handles all server state with configured defaults (no refetch on window focus, infinite stale time)
- Local component state for UI interactions
- Query client configured with custom fetch wrapper for error handling

**Routing Structure:**
- `/` - Landing/home page
- `/dashboard` - User dashboard with progress overview
- `/courses` - Course catalog with filtering
- `/courses/:id` - Individual course details with module list
- `/courses/:courseId/modules/:moduleId` - Module content and quiz interface
- `/knowledge` - Knowledge base with searchable articles

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- Custom middleware for request logging and JSON parsing
- Vite middleware integration for development HMR

**Data Layer:**
- Currently using in-memory storage (MemStorage class) with seed data
- Designed to support PostgreSQL via Drizzle ORM
- Database schema defined with Drizzle's pgTable API
- UUID-based primary keys with automatic generation

**API Design:**
- RESTful endpoints following resource-based patterns
- GET `/api/courses` - List all courses
- GET `/api/courses/:id` - Get course details
- POST `/api/courses` - Create new course
- GET `/api/courses/:courseId/modules` - List modules for a course
- GET `/api/courses/:courseId/modules/:moduleId` - Get module details
- GET `/api/modules/:moduleId/quiz` - Get quiz for a module
- GET `/api/progress` - Get user progress data
- POST `/api/progress/complete` - Mark module as complete
- GET `/api/knowledge` - List knowledge articles

**Data Validation:**
- Zod schemas generated from Drizzle table definitions
- Runtime validation on POST/PUT endpoints
- Type-safe request/response handling

### Database Schema

**Tables:**

1. **courses** - Course catalog
   - id (UUID, primary key)
   - title, description, category
   - difficulty level
   - duration (minutes)
   - icon identifier

2. **modules** - Learning modules within courses
   - id (UUID, primary key)
   - courseId (foreign key)
   - title, content
   - order (sequence number)

3. **quizzes** - Assessments for modules
   - id (UUID, primary key)
   - moduleId (foreign key)
   - title
   - questions (JSONB array of question objects)

4. **progress** - User progress tracking
   - id (UUID, primary key)
   - userId
   - courseId
   - completedModules (JSONB array)
   - quizScores (JSONB object)

5. **knowledge_articles** - Educational content library
   - id (UUID, primary key)
   - title, content, category
   - readTime (estimated minutes)

**Storage Implementation:**
- IStorage interface defines contract for data operations
- MemStorage provides in-memory implementation for development
- Designed for easy migration to Drizzle ORM with PostgreSQL/Neon database

### Build and Deployment

**Development:**
- `npm run dev` - Starts Express server with Vite middleware
- HMR enabled for instant feedback
- TypeScript compilation via tsx (no emit, type checking only)

**Production Build:**
- `npm run build` - Vite builds client to dist/public, esbuild bundles server
- `npm start` - Runs production server from dist/index.js
- ESM module format throughout

**Type Safety:**
- Shared types between client and server via `shared/schema.ts`
- Path aliases: `@/` for client, `@shared/` for shared code
- Strict TypeScript configuration

## External Dependencies

**Database:**
- Neon Serverless PostgreSQL (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries
- Drizzle Kit for schema migrations
- Currently configured but not actively used (in-memory storage in use)

**UI Components:**
- Radix UI primitives for accessible headless components
- All major component types (dialogs, dropdowns, accordions, etc.)
- Built with composability and accessibility in mind

**Styling:**
- Tailwind CSS with custom configuration
- CSS variables for theme customization
- Custom border radius, color system, and spacing
- PostCSS with Autoprefixer

**Development Tools:**
- Replit-specific plugins for error overlay, cartographer, and dev banner
- Vite plugins for React and development experience
- Source map support for debugging

**Fonts:**
- Google Fonts: Inter (400, 500, 600, 700) and DM Sans (400, 500)
- Loaded via HTML link tags

**Session Management:**
- connect-pg-simple for PostgreSQL session storage (configured but not actively used)