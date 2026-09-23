# Migration Plan — ProForma Webflow → Astro (Landing-only, Pixel-Identical)

> Hasil skill `wayfinder` (map) + `grill-me` (penajaman). Inti pekerjaan: **hanya migrasi landing page**, tanpa integrasi backend.
> Sumber mentah read-only: `C:\projectweb\webflow\proforma-db.webflow.io\website-ed42221c-4714-4c78-8b3f-bc47a7e7c3a7\index.html` (+ `style-guide.html` untuk token).
> Target stack: **Astro + TypeScript + React + shadcn-style custom + Tailwind**. Larangan keras: **no legacy, no radix, no useEffect**.

## 1. Destination (Wayfinder)

Landing `index.html` termigrasi 1:1 tampilan, animasi, dan aset ke stack baru. 12 section tag (11 logis — `logos-wrapper` nested dalam `no-bottom-mobile-padding` kosong) dengan copy, urutan, link, dan visual yang sama persis. Semua `w-dyn-list` distatiskan jadi data lokal. Form newsletter jadi static-success tanpa backend. Cart/checkout Webflow dibuang.

## 2. Inventory section (urutan wajib, jangan diubah)

| # | Section `class#id` | H1/H2 exact | Subcopy / isi | CTA / link | Dinamis → statis | Aset |
|---|---|---|---|---|---|---|
| 1 | `hero-section#hero` | H1 `Elevate your living` | `.text-m`: tim expert bantu pilih solusi sesuai selera | `Get in touch → #CTA` (`button-white-grey-hover`) | statis, 0 list | 0 `<img>`, bg `.bg-about-us` CSS only → replika gradient/bg di Tailwind |
| 2 | `section-long-bottom-pading#services` | H2 `Our services` | footer statis `.text-services`: spaces stunning + fungsional | 5 cards → `/product/decoration`, `/product/exterior-design`, `/product/space-planning`, `/product/architecture-design`, `/product/interior-design` | `autotabs` 1 list / 5 item | card1 `686d2c8efa574682f32fb3b7_s002.webp` (`Decoration`), tanpa srcset |
| 3 | `logos-wrapper` (nested) | — | — | — | 4 lists / 32 item = 8 unik ×4 loop marquee | `687de82a3f56baf1deef079f_acme.webp` + focalpoint, nietzsche, global bank, catalog, capsule, sisyphus, layers; `loading=eager`, tanpa srcset |
| 4 | `section-long-padding` (`Our projects`, tanpa id — `id=services` milik No.2) | H2 `Our projects` | excerpt card `.text-s` per project | 6 cards → `/project/the-garden-initiative`, `/project/the-eco-haven`, `/project/the-urban-oasis`, `/project/the-art-district`, `/project/the-digital-library`, `/project/the-smart-city-hub` + `Go to project → /projects` | `progects-list-wrapper` 1 list / 6 item | `686ce805ecfafe3123fe5efc_011 (1).webp` (`The Garden Initiative`) |
| 5 | `advantages` | H2 `Elevate your living start decorating!` | `.text-s`: inspirasi tiap sudut rumah | — (4 statis) | statis | 0 `<img>`: `01 Expert guidance, 02 Contemporary style, 03 Unmatched customer service, 04 Strategic Innovation` |
| 6 | `about` slide 2 | H2 `Personalized solutions for every home` | `.heading-s` + `.text-s`: tiap rumah unik, solusi personal | — | bagian sticky gallery | `686779bd54c1bb3b8dafa9d1_slide2.webp` (Red and White house, 640, duplikat mobile/desktop) |
| 7 | `about` 3 slides | H2-1 `Our rule: quality and style` / H2-3 `Convenience meets exceptional service` | S1 curated sofa/decor; S3 seamless online shopping | — | 3× `.gallery-item` sticky | S1 `68677980c047367187d9033e_slide1.webp`, S3 `686779e608de9968fddd8cae_slide3.webp` |
| 8 | `section-long-top-padding` FAQ | H2 `Frequently asked questions` | — | 5× `.w-dropdown` toggle only | statis | 0 `<img>`. Q: cancel, prepayment, contact, steps, feedback. A semua dummy `Nulla Lorem mollit…` → migrasi struktur, tandai `TODO content` |
| 9 | `section-long-bottom-pading.no-top-mobile-padding` team | H2 `Our team of specialist` | role `.text-s` per card | 5 cards → `/teams/interior-director`, `/teams/furniture-specialist`, `/teams/customer-manager`, `/teams/marketing-brand-strategist`, `/teams/product-sourcing-coordinator` | `teams-grid-collection` 1 list / 5 item | card1 `686cba759671962810e71156_t001.webp` (Alexandra Turner / Interior design director); card2+ srcset `t002-p-500 500w, p-800 800w, t002 840w, sizes 100vw` |
| 10 | `reviews` | H2 `Our commitment: quality and style` | `.text-s`: sofa/decor standar style+durability | 20 cards → `/reviews/california-coffee`, `/reviews/vonami`, `/reviews/arhimarket`, … (`delicious-food-truck` ×2) | 2 lists / 20 item | semua `676433a45b6dfabc13bb625d_stars.png`; card1 `Highly recommend… / Brendan` |
| 11 | `section-long-padding` blog | H2 `ProForma blog insights` | meta `.text-s`: `November 20, 2024 / 5 min to read` | 3 cards → `/blog/innovative-materials-in-architecture`, `/blog/urban-gardens-a-green-future`, `/blog/the-future-of-modular-architecture` + `Go to blog → /blog` | 1 list / 3 item | `6874b21e2f8c8e53bbed046c_0011.webp` srcset `p-500/800/1080/1600/2000 + 2464w, sizes (max-width:1919px)100vw,2496px` |
| 12 | `cta#CTA` | H2 `Got a project? Let's talk!` (U+2019) | `.text-s`: privacy, hanya info penting | `form#email-form` submit (tanpa `<a>`) | statis | 0 `<img>` |

Catatan encoding: H1/H2 mengandung `U+2028 LINE SEPARATOR` dan `’` — normalisasi ke spasi/apostrof standar di data, bukan di layout.

## 3. Global (header / footer / form)

- Header `nav.header-navigation ul.header-list-black`: `About → /about-us`, `Services → /#services` (anchor ke section No.2), `Projects → /projects`, `Blog → /blog`, `Contact → /contact` (2 varian: `button-white desktop-hidden` + `button-transparent mobile-hidden`), burger `tablet-visible`. **Drop**: `cart-flex-wrapper`, `services-cart`, `Checkout now → /checkout`.
- Footer `footer.footer-dark`: brand `Curated living experiences`, logo `pro forma`, `link-to-top → #hero` ×2; `Pages`: Home `/`, About, Projects, Blog, Contact (**drop Checkout**); `CMS Pages`: blog post `/blog/the-future-of-architecture-trends-to-watch`, member `/teams/customer-manager`, service `/product/space-planning`, project `/project/the-garden-initiative`; `Utility`: `/404`, `/licenses`, `/style-guide`, `/changelog`, `/privacy-policy`, `/instructions`; `Contact`: `752 New South Headr Rd Triple Bay SWFW 3148, New York` + LinkedIn/Twitter/Facebook Digital Butlers; `Copyright © 2025 ProForma / Designed by Digital Butlers`. **Drop** `Powered by Webflow`.
- Form `form#email-form[name=email-form][method=get]`: `input#Email-3[name=Email][type=email][placeholder=Email][required][maxlength=256]` + `button.cta-round-btn > input.cta-btn[type=submit][value=""][data-wait=Please wait...]` + arrow svg. `w-form-done`: `Thank you! Your submission has been received!`; `w-form-fail`: `Oops! Something went wrong…`. Migrasi: `preventDefault` + static success, tanpa backend.

## 4. Tampilan identik — token (dari style-guide.html)

- Warna (kunci `Black #0D0B0B`, bukan `#0D0D0E` card): Gray300 `#5C5C5C`, Gray200 `#BDBDBD`, Gray100 `#DBDBDB`, Gray50 `#EFEFEF`, Black `#0D0B0B`, White `#FFFFFF`, Accent Red `#E72323`; tambahan `--palette-3--black-default #0d0b0b`, `grey-transparent #efefef80`, `dark-red #b91c1c`, `burgundi #8b1515`, `black-light-50/20/30`, `white-20/40/50/70/80`. Implementasi: `src/styles/tokens.css` CSS vars + Tailwind theme extend.
- Tipografi: Inter 300–700 body (`text-m 1.13rem/160%/-.03em`, `text-s 1rem/160%/-.03em`); Poppins 300–700 headings (H1 `clamp(3rem,2.194rem+4.03vw,6.88rem)/95%/-.08em`, H2 `2.5rem → 3.5/4.375rem breakpoint/110%/-.06em`, `heading-m 1.75→2.25rem/110%/-.04em`, `heading-s 1.5rem/120%/-.04em`). Load via Google Fonts `<link>`, **bukan** `WebFont.load`.
- Buttons: `button-white` pill `6.25rem` + `btn-text upper/lower` swap; `round-button-grey` lingkaran `3.88rem → 3.13rem radius` (team/blog cards, 8×); `cta-round-btn` `3.875rem` radius `100px`. Inputs: `text-field` transparan, border 1px black, `pl-1.5rem`, placeholder `text-s`.
- Layout: `.container max 81.25rem px-4.375rem`; `.section py 5rem` + varian ejaan asli (`section-long-bottom-pading` typo dipertahankan sebagai nama mapping saja, class baru bersih).

## 5. Animasi identik — mapping tanpa useEffect

| Webflow asli | Replika stack baru |
|---|---|
| `data-w-id` fade `opacity:0 → 1` di hampir semua H2/card (116× di index) + `visibility:hidden` anti-FOUC | CSS `@keyframes fade-up` + class `.reveal` di-observe satu `IntersectionObserver` dalam `<script>` Astro layout (bukan React). Initial state via CSS, bukan inline `opacity:0` |
| `btn-text upper/lower` swap saat hover (nav, button-white, footer) | CSS murni: wrapper `overflow:hidden`, `translateY` on `:hover`, durasi `.3s` |
| `round-button-grey`, `cta-round-btn` hover bg/color `.3s linear` | Tailwind `transition-colors duration-300` |
| Logos marquee (4 lists × 8 unik) | CSS `@keyframes marquee` + duplikasi array di render (aria-hidden untuk salinan), `prefers-reduced-motion` matikan animasi |
| About sticky gallery 3 slides | CSS `position: sticky` per slide, tanpa JS; gambar ganda mobile/desktop digabung satu `<img>` responsif |
| FAQ `w-dropdown` (5 item) | `<details>/<summary>` + CSS plus-icon (`line-static`/`line-vertical` → rotasi), tanpa JS; island React hanya jika butuh single-open → pakai `useState` + handler, tanpa `useEffect` |
| Custom cursor `View` di blog/projects + lightbox `w-lightbox`/`w-json` | Tahap landing: **drop custom cursor** (tidak ada di kontrak identik prioritas); lightbox hanya untuk routes detail (di luar scope file ini) |
| `link-to-top → #hero` | anchor native + `scroll-behavior: smooth` + `scroll-margin` |

React islands yang diizinkan: `NewsletterForm` (state `idle|done|error` + `onSubmit`), `Faq` (opsional single-open), `LogosMarquee` (statis, tanpa state). Hanya `useState/useMemo/useRef` + event handler + callback ref. **Tidak ada `useEffect`, tidak ada `@radix-ui/*`.**

## 6. Aset identik — strategi

- Tahap 1 (kontrak ini): hotlink CDN `https://cdn.prod.website-files.com/...` dengan `src/srcset/sizes` exact per tabel section 2. Hero/advantages/FAQ/CTA tanpa gambar (CSS only) — jangan tambah gambar stok.
- Tahap 2: vendor ke `public/images/{services,logos,projects,team,reviews,blog}/` + `astro:image` (`widths [500,800,1080,1600,2000]`, `sizes` sesuai asli). Logo SVG footer (`pro forma` paths) di-inline bersih tanpa `w-embed`. Favicon/webclip + `og:image Home.png` dipertahankan path-nya.
- Dilarang menambah/mengganti foto. `stars.png` dipakai ulang apa adanya (tandai dummy).

## 7. Pemetaan komponen → file

```
src/layouts/Base.astro          Header + Footer + CTA + fonts + tokens + reveal script
src/pages/index.astro           12 section berurutan, data dari src/content/landing.ts
src/content/landing.ts          services[5], logos[8], projects[6], advantages[4], gallery[3], faq[5], team[5], reviews[20], blog[3]
src/components/ Hero, Services, LogosMarquee, Projects, Advantages, AboutGallery,
  Faq, TeamGrid, Reviews, BlogPreview, CTASection, NewsletterForm,
  ProjectCard, BlogCard, TeamCard, ReviewCard, ServiceCard
src/components/ui/ button.tsx, input.tsx, card.tsx, accordion.tsx (API gaya shadcn, headless custom, tanpa radix)
src/styles/tokens.css + tailwind.config.mjs theme extend
```

## 8. Blacklist legacy (dilarang masuk bundle)

Scripts: `jquery-3.5.1`, `webflow.schunk.*` ×3, `webfont.js` loader, `w-mod-js/touch` snippet, `__WEBFLOW_CURRENCY_SETTINGS`, `.w-webflow-badge` style, `gsap/ScrollTrigger/SplitText` CDN.
Atribut: `data-w-id`, `data-wf-*`, `data-node-type`, `data-wf-bindings`, `w-node-* ids`, `data-w-cloak`, `data-nav-menu-open`, `data-delay/data-hover`.
Kelas `w-*`: `w-inline-block`, `w-embed`, `w-form/w-input/w-button/w-form-done/w-form-fail`, `w-list-unstyled`, `w-dyn-list/w-dyn-items/w-dyn-item`, `w-commerce-*` (32×), `w-node-*`, `w--current`, `w-mod-*`, `w-dropdown/w-dropdown-toggle/w-dropdown-list`, `w-container/w-row/w-col`, `w-slider/w-nav/w-tabs/w-lightbox`, `w-icon-*`, `w-select/w-radio/w-widget/w-richtext/w-background-video/w-file-upload`.
Komponen: cart/ecommerce, `Designed by/Powered by Webflow` badge (kecuali atribusi teks footer yang dikontrak).

## 9. Acceptance criteria

- [ ] 12 section urutan + copy exact, 5+8+6+5+20+3 item, 39 card links valid tanpa 404 internal
- [ ] Visual: warna/tipografi/spasi/button/input/container sesuai token §4 (uji Playwright screenshot vs referensi)
- [ ] Animasi §5 bekerja tanpa `useEffect`, hormati `prefers-reduced-motion`
- [ ] Bundle: tidak ada `jquery`, `webflow.js`, `@radix-ui`, `useEffect` (`rg` check di CI)
- [ ] Form newsletter static success/fail, tidak ada request backend
- [ ] `astro check` + `tsc --noEmit` hijau

## 10. Wayfinder tickets berikutnya

1. `task: statiskan dyn-list` → `src/content/landing.ts` (bisa 1 sesi)
2. `task: tokens.css + tailwind theme` (1 sesi)
3. `task: Base layout + Header/Footer/CTA` (1 sesi)
4. `task × N: 12 section` bertahap (hero+services+logos → projects+advantages+about → faq+team+reviews → blog+cta)
5. `task: QA Playwright + bundle guard` lalu serah terima
