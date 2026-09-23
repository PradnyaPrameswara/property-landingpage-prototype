# Migration Plan — ProForma Webflow → Astro (Landing-only, Pixel-Identical)

> Peta `wayfinder` + tajaman `grill-me`. Inti: **hanya migrasi landing page** (`index.html`), tanpa backend.
> Sumber mentah read-only: **folder ini** (`index.html` 103.214 char, `style-guide.html`).
> Target: **Astro + TypeScript strict + React islands + shadcn-style custom + Tailwind**.
> Larangan keras: **no legacy** (`jquery`, `webflow.js`, class `w-*`, `data-w-id`, `data-wf-*`, CSS shared CDN), **no `@radix-ui/*`**, **no `useEffect`**.

---

## 1. Wayfinder Map

### Destination

`src/pages/index.astro` me-render 12 section berurutan dengan copy, urutan, link, visual, animasi, dan aset yang sama persis dengan `index.html`; lolos acceptance §12; bundle bersih dari legacy/radix/`useEffect`.

### Notes

Skill tiap sesi: `antislop*`, `caveman`, `lsp-ai`, `ponytail`, `playwright-mcp`, `addyosmani/agent-skills`, `mattpocock/{wayfinder,show-me,grill-me}` (global, dilarang install ulang). MCP `codedb` + `lexa`; bila tak terekspos, catat fallback `read/grep`. Aturan perilaku di `AGENTS.md`.

### Decisions so far

- Scope = landing `index.html` + halaman statis + rute detail (checkout dikecualikan).
- `w-dyn-list` → array statis di `src/content/landing.ts`; body artikel → `src/content/generated/*.json`.
- Token dikunci §6 (`Black #0D0B0B`).
- Satu pola reveal untuk 24 titik `opacity:0`; FAQ = `<details>`; marquee = 2 salinan CSS; sticky = CSS; kursor View = rAF di `<script>` Astro; tanpa lightbox di home.
- Form newsletter = static success tanpa backend.
- Cart/checkout/ecommerce = drop.
- Tahap 2 selesai: 66 aset di `public/images/`, 0 referensi CDN di `dist` (kecuali font).

### Not yet specified (fog)

- Copy jawaban FAQ masih dummy `Nulla Lorem…` — butuh copy asli dari manusia (`TODO content`).

### Out of scope

- `/checkout`, `w-commerce cart`, Stripe Webflow, `database.commerceOrder`, backend form.

### Tickets

| # | Tipe | Nama tiket | Status |
|---|---|---|---|
| T1 | task | Statiskan 39 card + 8 logo → `landing.ts` | done |
| T2 | task | `tokens.css` + Tailwind theme | done |
| T3 | task | `Base.astro` + Header/Footer/CTA + reveal script | done |
| T4–T7 | task | 12 section bertahap | done |
| T8 | task | Halaman statis + rute detail (61 pages) | done |
| T9 | task | Utility pages + vendor images + style-guide | done |
| T10 | task | QA visual Playwright + gerbang akhir | blocked (tanpa browser/MCP) |

---

## 2. Struktur `index.html` (12 section, urutan wajib)

1. `section.section.hero-section#hero` — 1 kolom: `h1` + `div.text-m` + `a.button-white-grey-hover[href=#CTA]` + `div.bg-about-us` (bg CSS only).
2. `section.section.no-bottom-mobile-padding > section.logos-wrapper` — marquee: **4× identik** `div.logos-list-wrapper.w-dyn-list > div.logos-list > 8x div.logo-item` = 32 node.
3. `section.section.section-long-bottom-pading#services` — `div.autotabs.w-dyn-list > 5x a.autotabs-tab[href=/product/*]` (img + `heading-m`) + teks statis `services-wrapp`.
4. `section.section.advantages > div.content-grid.mobile-flex` — 2 kolom: `div.column-sticky` (h2 + text) + 4× `div.column-card-advant-white` (01–04).
5. `section.section.section-long-padding` (projects, tanpa id) — `div.cursor` (View) + 6× `a.project-card[href=/project/*]` + `Go to project → /projects`.
6. `section.section.about` — 3× `div.gallery-item > div.gallery-item-sticky` (kartu `red/dark-red/burgundi-red` + img desktop + img `desktop-hidden`).
7. `section.section.section-long-top-padding` (FAQ) — `h2` + 5× `div.dropdown[.top-line].w-dropdown`.
8. `section.section.section-long-bottom-pading.no-top-mobile-padding` — `h2` + 5× `a.teams-card[href=/teams/*]`.
9. `section.section.reviews` — 2 kolom: h2 + text kiri; kanan 2 lists × 10 `a.column-grid > div.review-card` (satu list `right-mobile-hidden`).
10. `section.section.section-long-padding` (blog) — 3× `a.blog-post-card[href=/blog/*]` + `Go to blog → /blog`.
11. `section.section.cta#CTA` — h2 + `form#email-form` + done/fail.
12. `footer.footer-dark` — brand + 4 kolom + 2× `link-to-top[href=#hero]` + logo + divider + copyright 3 kolom.

---

## 3. Copy exact per section

- Hero: H1 `Elevate␣your living` (U+2028 → spasi di data) + body tim expert + `Get in touch → #CTA`.
- Services: H2 `Our services` + teks statis spaces stunning + fungsional (2 paragraf).
- Projects: H2 `Our projects`.
- Advantages: H2 `Elevate your living start decorating!` + subcopy inspirasi + 4 kartu bernomor (03 pakai `heading-m`).
- About: H2-1 `Our rule: quality and style` / H2-2 `Personalized solutions for every home` / H2-3 `Convenience meets exceptional service`.
- FAQ: H2 `Frequently asked questions`; 5 Q (cancel, prepayment, contact support, steps, feedback); 5 A dummy identik → `TODO content`.
- Team: H2 `Our team of specialist`.
- Reviews: H2 `Our commitment: quality and style` + subcopy sofa/decor.
- Blog: H2 `ProForma blog insights`.
- CTA: H2 `Got a project? Let's talk!` (U+2019) + teks privacy.

---

## 4. Header, footer, meta (exact)

### Header

`div.header > div.container.container-header-inner`: logo PROFORMA (SVG 140×22 putih → teks Poppins 600), `nav.header-navigation` (About `/about-us`, Services `/#services`, Projects `/projects`, Blog `/blog`, tiap link triple `mobile-menu-size/upper/lower`), Contact ganda (`button-white desktop-hidden` dalam menu + `button-transparent mobile-hidden` desktop), `div.burger-wrapper.tablet-visible` (burger + close + `header-blur-background.hidden`). Perilaku ≤991px: nav off-canvas, klik burger tampil, klik close/blur/Esc tutup (islandless `<script>` Astro). **Drop** cart `rightSidebar` + Checkout.

### Footer

`footer.footer-dark`: brand `Curated living experiences`; **Pages** (Home, About, Projects, Blog, Contact — Checkout drop); **CMS Pages** (Blog post, Member page, Service page, Project page); **Utility** (404, Licenses, Style guide, Changelog, Privacy Policy, Instructions); **Contact** (alamat New York + LinkedIn/Twitter/Facebook); 2× `link-to-top → #hero`; logo `pro`+`forma`; divider; `Copyright © 2025 ProForma` + `Designed by Digital Butlers`; **drop** `Powered by Webflow`. Hover footer = swap `upper.mobile-visible/lower` (18×).

### Meta/head baru

Title `ProForma — Curated living experiences`; description/og asli; `og:image Home.png` (lokal); favicon + webclip (lokal); font via Google Fonts `<link>` (bukan `WebFont.load`).

## 5. Data inventory (semua di `src/content/landing.ts` + `generated/*.json`)

Root CDN lama: `https://cdn.prod.website-files.com/{676011e38753f7d22eefbfdf,67409478e7d06cee556594cb}` → kini `/images/` (66 file, tahap 2 done).

### Services (5, `autotabs-tab`, tanpa srcset, alt semua `Arhitecture Design` sic)

| slug | image |
|---|---|
| decoration | `686d2c8efa574682f32fb3b7_s002.webp` |
| exterior-design | `686fa9f9101af483ddc5a31d_serv.webp` |
| space-planning | `686d2d0ac763b9a66974b84a_s003.webp` |
| architecture-design | `686d2d50c769c3204481eb6d_s005.webp` |
| interior-design | `6876331b304d792127198c62_s001.webp` |

Harga (detail): decoration $300, exterior $900, space-planning $500, architecture $2000, interior $400.

### Logos (8 unik, `loading=eager`, tanpa srcset)

`687de82a3f56baf1deef079f_acme` / `687dea90437a9e8a0006d900_focalpoint` / `687dea815150bcad630d91fc_nietzsche` / `687dea71fa30cf1ba0673e02_global%20bank` / `687dea15960ffe37fccd8263_catalog` / `687de9d75f11f7410c3e85c1_capsule` / `687de90f6e9601058d4379e7_sisyphus` / `687de80da5e6fa0028d62dd6_layers` (+`.webp`).

### Projects (6 home + 16 total, tanpa srcset di home)

| slug | image | service (untuk tab filter) |
|---|---|---|
| the-garden-initiative | `686ce805ecfafe3123fe5efc_011%20(1).webp` | Urban Agriculture |
| the-eco-haven | `686ce92f749222f9928a6814_019p.webp` | Environmental Design |
| the-urban-oasis | `686ceac6ecfafe31230155e3_012p.webp` | Landscape Architecture |
| the-art-district | `686cecd6fd33a1ac9396afed_013p.webp` | Cultural Planning |
| the-digital-library | `686cedc9cd9072af7488eebd_014p.webp` | Civic Design |
| the-smart-city-hub | `686cee81230cd9cdedb8c418_015p.webp` | Commercial Design |

10 lainnya: ecosphere-pavilion, line-living, line-tower, skyline-tower, the-floating-city, the-green-bridge, the-green-bridge-urban, the-vertical-forest, the-wave-residence, urban-oasis. Meta detail per proyek (client/budget/date/location/service) terekstrak di `projects.json`.

### Team (5, t001 tanpa srcset, t002–t005 srcset `p-500/p-800/full-840w`, `sizes 100vw`)

Alexandra Turner (Interior design director, `686cba759671962810e71156_t001`) / Jonathan Harris (`..._t002`) / Emil Rodriguez (`..._t003`) / Olivia Foster (`..._t004`) / Daniel Carter (`..._t005`). Email/tel terekstrak di `teams.json`.

### Reviews (20, stars `676433a45b6dfabc13bb625d_stars.png` sama semua, tanpa srcset)

List A (10): california-coffee/Brendan, vonami/Daniel R., arhimarket/Liana M., top-italian-men/`Danie, 22 years` (sic), luxury-stake/John 28, brewery-toun-tour/Michele 31 (sic `toun`), live-music-avenue/M. White, kavin-t-media/Kavin T., best-coffee-shop-in-sity/Emma B. 35 (sic `sity`), delicious-food-truck/Daniel Harris. List B (10, kolom `right-mobile-hidden`): delicious-food-truck duplikat, live-music-venue/Jessica White, art-gallery-exhibition/Chris Taylor, scenic-hiking-trail/Laura Martinez, cozy-bookstore-cafe/David Lee 36, family-friendly-amusement-park/Sarah Wilson 41 (quote terpotong tanpa titik), local-brewery-tour/Michael Brown 31, luxury-hotel-stay/Emily Johnson 28, top-italian-restaurant/Daniel W. 24, best-coffee-shop-2023/Emma Y. 31 (tanpa titik). Rute detail: 19 slug unik.

### Blog (3 home + 6 total, `sizes (max-width:1919px) 100vw, 2496px`)

| slug | date | read | image base |
|---|---|---|---|
| innovative-materials-in-architecture | Nov 20 2024 | 5 min | `6874b21e2f8c8e53bbed046c_0011` (max 2464w) |
| urban-gardens-a-green-future | Dec 5 2024 | 9 min | `6874b2995ed7074873d575a3_0041` (2464w) |
| the-future-of-modular-architecture | Jul 30 2024 | 5 min | `6874b2745001139fbf8e5b4b_0031` (2496w sic) |
| the-future-of-architecture-trends-to-watch | Oct 30 2024 | 5 min | `6874b1f87d199e1c9937c4d7_0021` (tanpa srcset) |
| 3d-printing-in-architecture | Aug 19 2024 | 5 min | `68763f07a8769168f2894756_00111` (2464w) |
| biophilic-design-in-modern-architecture | Aug 30 2024 | 5 min | `6874b32a60dd7413c3d21e87_0061` (2464w) |

Srcset varian: `p-500/800/1080/1600/2000 + full`. Author/cover/body di `blog.json`.

## 6. Token + breakpoint

- Warna: Gray300 `#5C5C5C`, Gray200 `#BDBDBD`, Gray100 `#DBDBDB`, Gray50 `#EFEFEF`, Black `#0D0B0B` (kunci), White `#FFF`, Accent `#E72323` + transparan/burgundi.
- Tipografi: Inter body (text-m 1.13rem/160%, text-s 1rem/160%), Poppins headings (H1 `clamp(3rem,2.194rem+4.03vw,6.88rem)/95%/−.08em`; H2 2.5→3.5/4.375rem/110%/−.06em; heading-m 1.75→2.25rem; heading-s 1.5rem).
- Buttons: `button-white` pill 6.25rem + swap upper/lower; `round-button-grey` 3.88rem; `cta-round-btn` 3.875rem/100px. Input `text-field` transparan border black.
- Layout: container max 81.25rem px-4.375rem (mobile 1.25rem); section py 5rem (mobile 2.5rem + `no-*-mobile-padding` killers).
- Breakpoint Webflow terkonfirmasi: **991 / 767 / 479**. Kelas responsif (15): `tablet-visible` (burger), `mobile-hidden` (Contact desktop), `desktop-hidden` (Contact menu, gallery mobile, link-top mobile), `mobile-visible` (footer swap, 18×), `right-mobile-hidden` (reviews list B ≤767), `mobile-flex` (grid→1 kolom), `mobile-copiwrite` (sic).

## 7. Animasi (mapping tanpa useEffect/radix)

- 24 titik `opacity:0` + 116 `data-w-id` (69 unik): hero stagger 3, h2 scroll, judul tab ×5, advantages kiri, tombol, kartu sticky (3 heading + 3 body), reviews kiri, blog. Replika: `.reveal` + satu `IntersectionObserver` (`threshold .15`, once) di `<script>` Astro; hero stagger via `transition-delay`; konten visible tanpa JS (class `js` gate + `<noscript>`).
- `upper/lower` swap (27×): CSS grid tumpuk + `translateY` hover/focus `.35s`.
- `round-button` (8×) + `cta-round-btn`: `transition-colors .3s`; arrow `translateX(4px)`.
- Marquee: 4 list identik → 2 track (satu `aria-hidden`), `@keyframes marquee 28s linear`, pause on hover/focus.
- Gallery: `gallery-scroll-distance` spacer + `gallery-item-sticky` → `position:sticky top-0 min-h-100svh`; mobile 1 gambar (`<picture>` nanti, kini img tunggal).
- FAQ `w-dropdown[data-delay=300][data-hover=false]` ×5 → `<details name>` + grid-rows animation + plus rotasi; varian React `ui/accordion.tsx` (useState) tersedia.
- Kursor View: 1 node di projects → `div.cursor-view` + rAF lerp di `<script>` Astro; hanya `(hover:hover) and (pointer:fine)`.
- Lightbox: 0 hit di home → tidak ada; bila perlu pakai `<dialog>` native.
- Anti-FOUC Webflow (`w-mod-js` + `visibility:hidden`) → **jangan tiru**; default visible.
- Menu mobile: toggle class + `aria-expanded` + Esc + blur (skrip Astro biasa).
- GSAP 3.15/SplitText/ScrollTrigger hanya di-load, nol pemakaian inline → buang semua.
- H1 hero split kata di frontmatter (`--i` stagger 120ms).

## 8. Aset (tahap 2 done)

66 file di `public/images/` (29 full + 38 varian srcset + stars + favicon/og/webclip). Satu basename dipakai dua body (file identik, aman). `dist/index.html`: 106 ref `/images/`, 0 CDN (kecuali font Google). Aturan: jangan tambah/ganti foto; `stars.png` dummy apa adanya.

## 9. Form + drop

`form#email-form`: input Email required + submit arrow; island `NewsletterForm` (`idle/done/error`, regex validasi); pesan done/fail exact. Drop: cart, checkout, Stripe Webflow, `__WEBFLOW_CURRENCY_SETTINGS`, badge.

## 10. Blacklist (guard `rg`)

`jquery`, `webflow.schunk.*`, `webfont.js` loader, `w-mod-*` snippet, `gsap/*`, `data-w-id`, `data-wf-*`, `data-node-type`, `w-node-*`, `w-*` (inline-block, embed, form/input/button/done/fail, list-unstyled, dyn-*, commerce-*, --current, dropdown, container/row/col, slider/nav/tabs/lightbox, icon-*, richtext, bg-video), `useEffect/useLayoutEffect`, `@radix-ui/*`. Guard menemukan pola hanya di source regex sanitizer + data mentah (di-strip saat render; 0 di `dist`).

## 11. Alur migrasi + pohon file

Fase: audit → data (`landing.ts`, `generated/*.json` via ekstraksi regex terverifikasi) → token → `Base` + Header/Footer/CTA → 12 section → halaman statis (about/projects/blog/contact/404/licenses/privacy/changelog/instructions/style-guide) → rute detail (`blog|project|product|teams|reviews/[slug]`, bodies `set:html` + `.richtext`) → vendor gambar → QA.

```
src/layouts/Base.astro
src/pages/index.astro, about-us.astro, projects.astro, blog.astro, contact.astro,
  404.astro, licenses.astro, privacy-policy.astro, changelog.astro,
  instructions.astro, style-guide.astro,
  blog|project|product|teams|reviews/[slug].astro
src/content/landing.ts, generated.ts, generated/{blog,projects,teams,services,utility}.json
src/components/{Hero,Services,LogosMarquee,Projects,Advantages,AboutGallery,Faq,
  TeamGrid,Reviews,BlogPreview,CTASection,Header,Footer}.astro
src/components/islands/NewsletterForm.tsx
src/components/ui/{button,input,card,accordion}.tsx
src/styles/tokens.css (+ tokens.tailwind.js)
public/images/ (66)
```

Gerbang tiap fase: `astro check` + `tsc --noEmit` + guard `rg` + `astro build` + cek `dist` (0 legacy, href valid).

## 12. Acceptance (status akhir)

- [x] 12 section urutan + copy exact, 39 card + 8 logo, link valid (61 pages build).
- [x] Token §6 teraplikasi; screenshot vs referensi → **pending browser** (tanpa Playwright MCP).
- [x] Animasi §7 tanpa `useEffect`, hormati `prefers-reduced-motion`.
- [x] Bundle bersih legacy/radix/`useEffect` (0 di `dist`).
- [x] Newsletter static success/fail, tanpa backend.
- [x] `astro check` + `tsc --noEmit` hijau.

Eskalasi jujur: QA klik visual perlu browser (skipped, verifikasi DOM+build); FAQ answers dummy (`TODO content`, butuh manusia); gambar hotlink→lokal done; `checkout` drop permanen per kontrak.
