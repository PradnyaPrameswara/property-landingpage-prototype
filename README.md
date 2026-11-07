# ProForma — Astro frontend

Static multi-page recreation of the ProForma DB architecture and design-studio template, migrated from the original Webflow export. The current app uses **Astro 6**, **React 19 islands**, **Tailwind CSS 4**, and **shadcn-compatible Base UI**, without Radix UI or the original Webflow runtime.

## Develop

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run guard
npm run check
npm run build
npm run guard -- --dist
npx playwright-core install chromium
npm run qa:browser
```

GitHub Actions runs those checks and uploads responsive screenshots at 390px, 768px, and 1440px. CI validates routing, layout overflow, navigation and basic interactions; screenshot comparison with the original design still requires visual review.

## Structure

- `src/pages/`: static and prerendered dynamic routes
- `src/components/`: Astro sections and React islands
- `src/content/`: structured local content
- `src/styles/global.css`: original design tokens, typography, layout and interactions
- `public/images/`: local image assets
- `components.json`: Base UI shadcn configuration

Original template: [ProForma DB by Digital Butlers](https://webflow.com/templates/html/proforma-db-website-template). The historical Webflow HTML remains available only in Git history, not the active source tree or production runtime.

This is a static presentation site. The newsletter currently acknowledges an email locally but does **not** transmit, store, or subscribe it. Cart, checkout, payment, and backend functionality are intentionally outside the migration's original scope.
