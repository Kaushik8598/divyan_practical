# Divyan AI - Analytics Dashboard 🚀

A production-quality, highly optimized analytics dashboard built for Divyan AI. This project demonstrates advanced frontend architecture, fluid responsive design, and stringent performance optimization.

## 🛠 Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Core:** React.js, TypeScript
- **Styling:** Tailwind CSS v4 (Custom CSS-first configuration)
- **State Management:** Redux Toolkit (Global UI/Auth/Data), TanStack Query (Server State/Caching)
- **Visualizations:** Recharts
- **Testing:** Jest, React Testing Library

## 🏗 Architecture Decisions

This project strictly adheres to **Feature-Driven Architecture**. Instead of grouping files by type (e.g., all reducers in one folder), logic is grouped by domain inside the `src/features/` directory (e.g., `auth`, `projects`, `ui`). This heavily promotes scalability, modularity, and easier debugging as the application grows.

**State Management Strategy:**

1. **Redux Toolkit:** Used exclusively for global client state that requires synchronous access across disparate components (Authentication status, User Theme preferences, Sidebar toggle state, LocalStorage synchronization).
2. **TanStack Query:** Used exclusively for asynchronous server state (API fetching). It handles caching, deduplication, and background refetching far more efficiently than standard Redux thunks.

## ⚡ Performance Optimizations

- **Code Splitting:** Heavy charting libraries (Recharts) are dynamically imported via `next/dynamic` with `ssr: false` to vastly reduce the initial Javascript payload.
- **Memoization:** Utilized `useMemo` for complex client-side array filtering and `useCallback` for modal handlers to prevent unnecessary re-renders in the project grid.
- **Debouncing:** Implemented a custom `useDebounce` hook for the user search API to prevent rapid, consecutive network requests while typing.

## 🚀 Setup Instructions

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Run the test suite: `npm run test`
5. Open [http://localhost:3000](http://localhost:3000) with your browser.

_Note: Use any valid email format and a password of at least 6 characters to bypass the mock authentication._
