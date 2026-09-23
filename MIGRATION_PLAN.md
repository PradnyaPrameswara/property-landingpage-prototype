# Migration Plan — ProForma Webflow → Astro (Landing-only, Pixel-Identical)

> Peta `wayfinder` + tajaman `grill-me`. Inti: **hanya migrasi landing page** (`index.html`), tanpa backend.
> Sumber mentah read-only: **folder ini** (`index.html` 103.214 char/137 baris, `style-guide.html`).
> Target: **Astro + TypeScript strict + React islands + shadcn-style custom + Tailwind**.
> Larangan keras: **no legacy** (`jquery`, `webflow.js`, class `w-*`, `data-w-id`, `data-wf-*`, CSS shared CDN), **no `@radix-ui/*`**, **no `useEffect`** (termasuk `useLayoutEffect`).

---

## 1. Wayfinder Map

### Destination

`src/pages/index.astro` me-render 12 section berurutan dengan copy, urutan, link, visual, animasi, dan aset yang sama persis dengan `index.html`; lolos acceptance §12; bundle bersih dari legacy/radix/`useEffect`.

### Notes

Skill tiap sesi: `antislop*`, `caveman`, `lsp-ai`, `ponytail`, `playwright-mcp`, `addyosmani/agent-skills`, `mattpocock/{wayfinder,show-me,grill-me}` (global, dilarang install ulang). MCP `codedb` (pencarian arsitektur) + `lexa` (referensi API); bila tak terekspos, catat fallback `read/grep`. Aturan perilaku di `AGENTS.md`.

### Decisions so far

- Scope = landing `index.html` saja; routes lain hanya jadi target `href` statis (§4).
- `w-dyn-list` → array statis di `src/content/landing.ts` (keputusan §5).
- Token dikunci §6 (`Black #0D0B0B`, bukan `#0D0D0E`).
- Satu pola reveal untuk 24 titik `opacity:0` (§7.1); FAQ = `<details>` (§7.6); marquee = 2 salinan CSS (§7.4); sticky = CSS (§7.5); kursor View = rAF di `<script>` Astro (§7.7); tanpa lightbox di home (§7.8).
- Form newsletter = static success tanpa backend (§9).
- Cart/checkout/ecommerce = drop (§10).

### Not yet specified (fog)

- Vendor gambar ke `public/images/` (tahap 2) vs hotlink CDN tahap 1 — diputuskan per §8: tahap 1 hotlink, tahap 2 vendor.
- Copy jawaban FAQ masih dummy `Nulla Lorem…` — butuh copy asli dari manusia (ditandai `TODO content`).

### Out of scope

- `/checkout`, `w-commerce cart`, Stripe Webflow, `database.commerceOrder`, backend form, halaman `instructions/changelog/licenses/privacy-policy` (kecuali link footer), custom cursor di luar area projects, lightbox (0 hit di home).

### Tickets (1 sesi = 1 tiket; research boleh paralel)

| # | Tipe | Nama tiket | Blokir oleh |
|---|---|---|---|
| T1 | task | Statiskan 39 card + 8 logo → `landing.ts` | — (frontier) |
| T2 | task | `tokens.css` + Tailwind theme | — (frontier) |
| T3 | task | `Base.astro` + Header/Footer/CTA + reveal script | T1, T2 |
| T4 | task | Hero + Services + Logos | T3 |
| T5 | task | Projects + Advantages + About gallery | T3 |
| T6 | task | FAQ + Team + Reviews | T3 |
| T7 | task | Blog + CTA + footer polish | T3 |
| T8 | task | QA Playwright + bundle guard + serah terima | T4–T7 |

---

## 2. Struktur `index.html` (12 section, urutan wajib)

1. `section.section.hero-section#hero > div.container > div.hero-wrapper > div.hero-left-content` — 1 kolom: `h1` + `div.text-m` + `div.button-wrapper > a.button-white-grey-hover[href=#CTA]` + `div.bg-about-us` (bg CSS only).
2. `section.section.no-bottom-mobile-padding > section.logos-wrapper > div.logos-relative-wrapper > div.logos-wrapper-three` — marquee: **4× identik** `div.logos-list-wrapper.w-dyn-list > div.logos-list > 8x div.logo-item` = 32 node.
3. `section.section.section-long-bottom-pading#services > div.container > div.autotabs-wrapper > div.autotabs-container` — `div.autotabs.w-dyn-list > div.collection-list > 5x div.collection-item > a.autotabs-tab` (img + `services-heder-wrapper > div.heading-m`) + `div.tabs-content-heading-wrapper-visible > div.services-wrapp` (teks 1 kolom).
4. `section.section.advantages > div.container > div.content-grid.mobile-flex` — 2 kolom: `div.column-sticky > div.column-left.gap-40` (h2 + text) + `div.column-right.column-right-flex` = 4× `div.column-card-advant.column-card-advant-white` (01–04).
5. `section.section.section-long-padding` (projects) `> div.container > div.projects-content > div.projects-content-cards` — `div.cursor` (View) + `div.progects-list-wrapper > div.projects-list` = 6× `div.projects-item > a.project-card` + tombol `Go to project → /projects`.
6. `section.section.about` — `div.gallery-scroll-distance` + 3× `div.gallery-item > div.gallery-item-sticky > div.gallery-item-inner.mobile-flex` (kartu `red/dark-red/burgundi-red` + img desktop + img `desktop-hidden` mobile).
7. `section.section.section-long-top-padding` (FAQ) `> div.container-vertical-flex` — `h2.heading` + `div.faq-wrapper` = 5× `div.dropdown[.top-line].w-dropdown`.
8. `section.section.section-long-bottom-pading.no-top-mobile-padding > div.container-inner > div.content-vertical-align-center` — `div.teams-content > h2` + `div.teams-grid-collection > div.teams-rail` = 5× `div.teams-item > a.teams-card`.
9. `section.section.reviews > div.container.container-relative > div.content-grid.mobile-flex` — 2 kolom: `div.div-block-10 > div.column-left` (h2 + text) + `div.column-right > div.reviews-list-wrapper.right-mobile-hidden > div.reviews-list` = 10× `div.collection-item-2 > a.column-grid > div.review-card` (+ list kedua 10 item di DOM, satu disembunyikan di mobile).
10. `section.section.section-long-padding` (blog) `> div.container > div.blog-content > div.blog-content-card > div.blog-posts-list-wrapper > div.blog-posts-list` = 3× `div.blog-posts-item > a.blog-post-card` + tombol `Go to blog → /blog`.
11. `section.section.cta#CTA > div.container.container-flex-center > div.cta-wrapper` — `div.cta-wrapper-flex` (h2 + text) + `div.form-block.w-form > form#email-form` + done/fail.
12. `footer.footer-dark > div.container` — `div.footer-wrapper` (brand + 4 kolom) + 2× `a.link-to-top[href=#hero]` + `div.footer-logo-wrapper` + `div.footer-divider` + `div.footer-wrapper.mobile-copiwrite` (3 kolom copyright).

---

## 3. Copy exact per section

- Hero: H1 `Elevate␣your living` (␣ = U+2028, normalisasi ke spasi di data) + `.text-m` tim expert + `Get in touch → #CTA`.
- Services: H2 `Our services` + footer teks statis `.text-services` (spaces stunning + fungsional).
- Projects: H2 `Our projects` (section ini **tanpa id**; `id=services` milik section services).
- Advantages: H2 `Elevate your living start decorating!` + `.text-s` inspirasi tiap sudut + `01 Expert guidance / 02 Contemporary style / 03 Unmatched customer service (heading-m) / 04 Strategic Innovation`.
- About: H2-1 `Our rule: quality and style`, H2-2 `Personalized solutions for every home` (+ `heading-s` tiap rumah unik), H2-3 `Convenience meets exceptional service` (S1 sofa/decor, S3 online shopping).
- FAQ: H2 `Frequently asked questions`; 5 Q exact: `Can you cancel a project at any time?` / `How often do we work without prepayment?` / `How to contact technical support?` / `What steps should you take if you encounter technical problems?` / `Where can I leave feedback about your services?`; 5 A identik dummy `Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit` → `TODO content`.
- Team: H2 `Our team of specialist`.
- Reviews: H2 `Our commitment: quality and style` + `.text-s` sofa/decor.
- Blog: H2 `ProForma blog insights` (heading blog, bukan h1).
- CTA: H2 `Got a project? Let's talk!` (’ = U+2019) + `.text-s` privacy.

---

## 4. Header, footer, meta (exact)

### Header

`div.header > div.container.container-header-inner > div.content-horizontal-flex-left.header-content`:
- `a.header-logo-black.w--current[href=/][aria-current=page][aria-label=logo-link] > div.logo-white > svg[140x22][viewBox 0 0 140 22]` 8× `path[fill=white]` tulisan PROFORMA → inline bersih tanpa `w-embed`.
- `nav.header-navigation > ul.header-list-black[role=list]`: 4× `li.header-item-black > a.nav-link[aria-label][data-w-id] > div.navigation-link > div.nav-link-text.mobile-menu-size + div.upper + div.lower` = `About → /about-us`, `Services → /#services`, `Projects → /projects`, `Blog → /blog`; + `li.header-button-wrapper.desktop-hidden > a.button-white.button-white-with-top-margin[href=/contact]` (Contact khusus menu mobile).
- `div.burger-wrapper.tablet-visible`: `button.burger[type=button][aria-label=open menu] > 3× span.burger-line(-top/-middle/-bottom)` + `button.burger-close[aria-label=close menu]` + `div.header-blur-background.hidden`. Perilaku (re-plika §7.9): ≤991px nav off-canvas; klik burger → nav tampil + blur tampil; klik close/blur/Esc → tutup. Implementasi: island React `useState open` + handler (tanpa `useEffect`), atau `<script>` Astro toggle class.
- `a.button-transparent.mobile-hidden[href=/contact]` (Contact desktop).
- **Drop**: `div.cart-flex-wrapper` (cart `rightSidebar`, count, dialog) + `Checkout now`.

### Footer

`footer.footer-dark`: brand `Curated living experiences`; kolom **Pages** (`Home /`, `About /about-us`, `Projects /projects`, `Blog /blog`, `Contact /contact`, ~~Checkout~~ — drop); kolom **CMS Pages** (`Blog post → /blog/the-future-of-architecture-trends-to-watch`, `Member page → /teams/customer-manager`, `Service page → /product/space-planning`, `Project page → /project/the-garden-initiative`); kolom **Utility** (`404 /404`, `Licenses /licenses`, `Style guide /style-guide`, `Changelog /changelog`, `Privacy Policy /privacy-policy`, `Instructions /instructions`); kolom **Contact** (`752 New South Headr Rd<br/>Triple Bay SWFW 3148, —<br/>New York` — mojibake em-dash dipertahankan sebagai `—`) + socials `LinkedIn https://www.linkedin.com/company/digitalbutlers/`, `Twitter https://twitter.com/Digital_Butlers`, `Facebook https://www.facebook.com/people/Digital-Butlers-Studio/100090264223869/` (target `_blank`, inline SVG); 2× `a.link-to-top[href=#hero]` (desktop + mobile, arrow `M11 6.5L6 1.5L1 6.5` 12×8); logo `pro` (`em.italic-text`) + `forma`; divider; copyright `Copyright © 2025 ProForma` + `Designed by Digital Butlers (https://digitalbutlers.team/?utm_source=proforma&utm_medium=template_footer&utm_campaign=webflow_template&utm_content=made_by_link)`; **drop** `Powered by Webflow`.
- Pola hover footer: `div.nav-link-text.upper.mobile-visible + div.lower` (18× `mobile-visible`) → replika CSS §7.3.

### Meta/head baru

`title`: samakan `ProForma DB - Webflow Ecommerce website template`? Tidak — tulis `ProForma — Curated living experiences`. `description/og:description`: `ProForma offers comprehensive solutions in architectural design, interior design, and space planning. Discover our stunning projects, client testimonials, an
...[truncated 17904 chars]