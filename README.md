# Health App

## Overview

**Health App** is a modern healthcare web application built with React, TypeScript, Vite, TailwindCSS, and advanced UI libraries. The project is structured as a monorepo for scalability, maintainability, and optimal developer experience.

## Monorepo Structure

- **react-app/**: Main frontend application (React + Vite)
- **mock-server/**: Mock API server using json-server with auto-generated sample data

## Tech Stack

- **React 19**, **TypeScript**: Component-based, type-safe UI
- **Vite**: Ultra-fast dev server, HMR, optimized builds
- **TailwindCSS**: Utility-first CSS, integrated with Prettier plugin
- **React Router v7**: Dynamic routing, modular page separation
- **Recharts**: Data visualization
- **Radix UI**: Accessible UI primitives
- **ESLint + Prettier**: Consistent code style, CI/CD friendly
- **Alias import**: `@` for `src/`, `#` for `src/shadcn`

## Folder Structure

```
health-app/
├── react-app/
│   ├── src/
│   │   ├── assets/         # Images, icons, logos
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page modules (home, column, record, ...)
│   │   ├── router/         # Router config
│   │   ├── shadcn/         # UI components from shadcn/ui
│   │   ├── styles/         # Global CSS
│   │   ├── app.tsx         # Root App
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   ├── vite.config.ts      # Vite config
│   └── package.json
├── mock-server/
│   ├── db.json             # Sample data
│   ├── generate-db.js      # Data generation script
│   ├── server.js           # Custom json-server
│   └── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 20.19.0
- pnpm >= 8

### Install dependencies

```bash
pnpm install
```

### Start development (run both frontend & mock server)

```bash
pnpm dev
```

- Frontend: http://localhost:5173
- Mock API: http://localhost:3001

### Useful Scripts

- `pnpm --filter react-app dev`: Start frontend dev server
- `pnpm --filter mock-server json-server`: Start mock API server
- `pnpm --filter react-app build`: Build production
- `pnpm --filter react-app lint`: Lint code
- `pnpm --filter react-app format`: Format code


## UI Testing Guideline

- **Always test the UI at a screen width of 1280px**. The design is optimized for this breakpoint. Ensure all layouts, spacing, and components look correct at 1280px width for best results.

## Coding Guidelines

- Prefer small, stateless, testable components
- Strict TypeScript for minimal runtime bugs
- Use alias imports, clear naming conventions
- Performance: React.memo, lazy loading, code splitting
- Run lint & format before every commit
- Clear separation of UI, logic, and data fetching
- Use hooks for reusable logic

## Mock Server

- Powered by [json-server](https://github.com/typicode/json-server)
- Custom response transformation for REST API, supports query, pagination
- Sample data auto-generated with FakerJS (`generate-db.js`)
- Run `pnpm --filter mock-server seed` to reset sample data

## Contact

- Author: nguyenkhanhduong

---
