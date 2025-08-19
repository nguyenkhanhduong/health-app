# React Health App

## Introduction

**Health App** is a modern healthcare web application built with React, TypeScript, Vite, TailwindCSS, and a suite of advanced UI libraries. The project architecture is designed for scalability, maintainability, and optimal user experience.

## Architecture & Technology

- **React 19** + **TypeScript**: Component-based, type-safe, and highly extensible.
- **Vite**: Ultra-fast dev server, HMR, and optimized production builds.
- **TailwindCSS**: Utility-first CSS framework, integrated with Prettier plugin for automatic class sorting.
- **React Router v7**: Dynamic routing, clear separation of pages/modules.
- **Recharts**: Data visualization for health metrics.
- **Radix UI**: Accessible, unstyled UI primitives.
- **ESLint + Prettier**: Consistent code style, CI/CD friendly.
- **Alias import**: `@` for `src/`, `#` for `src/shadcn` for concise, refactor-friendly imports.

## Folder Structure

```
react-app/
├── public/                # Static assets, favicon, icons
├── src/
│   ├── assets/            # Images, logos, icons, backgrounds
│   ├── components/        # Reusable UI components (icon, layout, error-page, ...)
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Page-level modules (home, column, record, ...)
│   ├── router/            # Router config, route mapping
│   ├── shadcn/            # UI components & lib from shadcn/ui
│   ├── styles/            # Global CSS (index.css)
│   ├── app.tsx            # Root App component
│   └── main.tsx           # Entry point, hydrate React app
├── index.html             # HTML template
├── vite.config.ts         # Vite config, alias, plugins
├── tsconfig*.json         # TypeScript config (app, node, base)
├── package.json           # Scripts, dependencies
└── README.md
```

## Scripts

- `pnpm dev`: Start local dev server with HMR.
- `pnpm build`: Production build with type checking.
- `pnpm preview`: Preview production build locally.
- `pnpm lint`: Lint code for style and errors.
- `pnpm format`: Format code with Prettier & ESLint.

## Coding Guidelines & Best Practices

- **Small, isolated, stateless components whenever possible.**
- **TypeScript strict mode** to minimize runtime bugs.
- **Alias imports** for shorter, refactorable paths.
- **Performance optimizations**: React.memo, lazy loading, code splitting.
- **Run ESLint & Prettier before every commit.**
- **Clear separation of UI, logic, and data fetching.**
- **Use hooks for reusable logic.**
- **Consistent, descriptive naming for files, variables, and functions.**

## Getting Started

```bash
# Requires Node.js >= 20.19.0, pnpm >= 8
pnpm install
pnpm dev
```

Visit: http://localhost:5173



