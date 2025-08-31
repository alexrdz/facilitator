# CareerSync

## Overview

CareerSync is a private, local-first web application designed to empower engineers to take control of their career development and performance conversations. The application transforms unproductive one-on-ones into strategic meetings by providing tools for preparation, achievement tracking, and reflection. Built as a full-stack TypeScript application with React frontend and Express backend, it features three core modules: 1:1 Prep for creating meeting agendas, Hype Docs for tracking career accomplishments, and Reflection for post-meeting analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client uses a modern React setup with TypeScript and Vite as the build tool. The UI is built with shadcn/ui components and Radix UI primitives, styled using Tailwind CSS with a custom design system. The application follows a component-based architecture with three main modules (PrepModule, HypeDocsModule, ReflectionModule) and uses Wouter for client-side routing. State management is handled through React hooks and TanStack Query for server state management.

### Backend Architecture
The server is built with Express.js and TypeScript, following a REST API pattern. Currently implements in-memory storage through a MemStorage class that implements the IStorage interface, providing CRUD operations for users and career data. The architecture is designed to be modular with separate route registration and storage abstraction layers. The server includes middleware for request logging and error handling.

### Data Storage Solutions
The application currently uses two storage strategies:
- **Client-side**: localStorage for persistent data storage of achievements, prep agendas, and reflections
- **Server-side**: In-memory storage (MemStorage class) with interfaces designed for future database integration

Database schema is defined using Drizzle ORM with PostgreSQL as the target database, though not yet implemented. The schema includes comprehensive types for achievements, prep agendas, and reflections with proper validation using Zod schemas.

### Authentication and Authorization
Basic user schema is defined in the shared schema with fields for user identification, but no authentication system is currently implemented. The storage interface includes user CRUD operations prepared for future authentication integration.

### Design System and Styling
Uses a comprehensive design system with CSS custom properties for theming, including support for light/dark modes. The styling approach combines Tailwind CSS utility classes with shadcn/ui component library, providing consistent spacing, colors, typography, and component variants throughout the application.

## External Dependencies

### UI Framework and Components
- **React 18** with TypeScript for the frontend framework
- **Radix UI** primitives for accessible, unstyled UI components
- **shadcn/ui** component library built on Radix UI
- **Tailwind CSS** for utility-first styling with custom design tokens

### Development and Build Tools
- **Vite** for fast development and optimized production builds
- **TypeScript** for type safety across the entire codebase
- **ESBuild** for server-side bundling in production

### State Management and Data Fetching
- **TanStack React Query** for server state management and caching
- **React Hook Form** with Zod resolvers for form management and validation

### Database and ORM
- **Drizzle ORM** configured for PostgreSQL with migration support
- **Neon Database** serverless PostgreSQL integration ready for implementation
- **Zod** for runtime type validation and schema definition

### Routing and Navigation
- **Wouter** as a lightweight client-side routing solution

### Utility Libraries
- **date-fns** for date manipulation and formatting
- **clsx** and **tailwind-merge** for conditional CSS class handling
- **class-variance-authority** for component variant management

### Development Environment
- **Replit-specific** plugins and configurations for development environment integration
- **PostCSS** with Autoprefixer for CSS processing