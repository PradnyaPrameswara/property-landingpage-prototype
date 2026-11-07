# Project agent rules

This repository is an Astro-first static recreation of the ProForma DB architecture-studio website. Preserve existing page content and the original visual treatment unless the task explicitly requests a change.

## Framework and UI
- Astro 6, TypeScript strict, React 19 islands, Tailwind CSS 4.
- shadcn-compatible components use Base UI (`components.json` style `base-nova`) and `src/lib/utils.ts`. Keep the existing ProForma design tokens and CSS classes where fidelity depends on them.
- Prefer Astro for static pages and native HTML for simple interactions. Do not add a component or package solely for completeness.
- Do not import Radix UI, jQuery, Webflow scripts/styles, or call `useEffect` / `useLayoutEffect`; no old `data-w-id`, `data-wf-*`, `w-richtext-*`, `w-dyn-*`, or legacy runtime in source or rendered output.

## Visual and content contract
- Keep the hero, logos, services, advantages, projects, gallery, FAQ, team, testimonials, blog, CTA, and shared header/footer in their established order.
- Keep the ProForma palette, Inter and Poppins typography, original image files, copy, breakpoints at 991 / 767 / 479px, and keyboard-reachable interactions.
- The original Webflow export is not part of the current working tree; the historical baseline is available in Git history (e.g. commit `1a2797f7bac05b5352415c668bfce891d5aa8c99`). Do not reintroduce it as application code.
- `MIGRATION_PLAN.md` is the historical migration record, not an up-to-date executable runbook.
- The newsletter intentionally has no backend; do not represent its local success message as a real subscription.

## Verification and delivery
- Run `npm ci`, `npm run guard`, `npm run check`, `npm run build`, and `npm run guard -- --dist` when modifying frontend sources.
- For visual or interaction changes, also run `npx playwright-core install chromium` and `npm run qa:browser`; compare screenshots with an authentic original reference before claiming visual identity.
- Keep commits narrowly scoped and use sequential stacked PRs. Don't merge, deploy, delete external data, or alter the original historical reference without explicit approval.
- Report changed files, verification results, and unresolved deviations briefly; never call a static success form production-ready.
