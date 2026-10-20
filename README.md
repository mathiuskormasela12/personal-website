# My Personal Website

Portfolio frontend built with [Next.js](https://nextjs.org/) 16 (Pages Router), React 19, TypeScript, styled-components and Redux Toolkit. Project data comes from the separate [personal-website-api](http://192.168.8.6:3000/mathius.kormasela.dev/personal-website-api) backend.

## Requirements

- Node.js 22 or newer
- Yarn 1 (`yarn.lock` is committed)

## Setup

```bash
yarn install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend URL, e.g. `http://localhost:9000`.
The value is inlined into the browser bundle at build time, so rebuild after changing it. Project images served from that host are optimized by `next/image`.

## Run

```bash
yarn dev                  # development server
yarn build && yarn start  # production
```

Both commands listen on `0.0.0.0` and read the port from `PORT`. If `PORT` is not set they use `8081`:

```bash
PORT=3000 yarn start
```

## Quality checks

```bash
yarn test            # Jest + Testing Library unit tests
yarn test:coverage   # same, with a coverage report in coverage/
yarn lint            # ESLint (eslint-config-next, flat config)
yarn typecheck       # TypeScript, no emit
```

Tests live in `__tests__/` (never under `pages/`, or Next would treat them as routes). `__tests__/test-utils.tsx` provides `renderWithStore`, which renders a component with a Redux store and the same styled-components prop filter the app uses.
