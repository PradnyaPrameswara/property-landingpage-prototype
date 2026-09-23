# AGENTS.md — Aturan Wajib AI Agent (Property Landingpage Prototype)

> Berlaku untuk setiap sesi agent di repo ini. Inti: **migrasi landing-only Webflow → Astro**, tanpa backend. Kontrak visual di `MIGRATION_PLAN.md` — jangan ubah urutan/copy tanpa persetujuan manusia.

## 1. Stack + larangan keras

- Stack: **Astro + TypeScript (strict) + React islands + shadcn-style custom + Tailwind**. Sumber mentah read-only di `C:\projectweb\webflow\proforma-db.webflow.io\website-ed42221c-4714-4c78-8b3f-bc47a7e7c3a7\` — dilarang mengeditnya.
- **DILARANG**: legacy (`jquery`, `webflow.js`, class `w-*`, `data-w-id`, `data-wf-*`, CSS shared CDN sebagai stylesheet), `@radix-ui/*` dalam bentuk apa pun, dan `useEffect` (termasuk `useLayoutEffect`, efek tersembunyi di helper).
- Pengganti resmi: server-first Astro (`getStaticPaths`/`getCollection`/frontmatter), React hanya `useState`/`useMemo`/`useRef` + event handler + callback ref, animasi via CSS + satu `IntersectionObserver` di `<script>` Astro, FAQ via `<details>/<summary>`, komponen `ui/` headless custom ber-API shadcn.
- Setiap PR/commit yang melanggar → tolak. Validasi dengan `rg "useEffect|@radix-ui|jquery|webflow" src` dan `tsc --noEmit`.

## 2. Skill wajib (selalu dipakai, bukan opsional)

Muat via skill tool setiap sesi sebelum coding:

- `antislop` (+ `antislop-code`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-ui`) — dari https://github.com/miqdadbadjuber/anti-slop dan https://github.com/dmmulroy/anti-slop. Fungsi: cegah kode/copy generik; jaga kontras, keyboard, tap-target, responsivitas.
- `caveman` — dari https://github.com/JuliusBrussee/caveman. Fungsi: komunikasi ringkas saat eksekusi tiket.
- `lsp-ai` — dari https://github.com/SilasMarvin/lsp-ai. Fungsi: lihat §4 (LSP enforcement).
- `ponytail` — dari https://github.com/DietrichGebert/ponytail. Fungsi: verifikasi isi repo saat sesi pertama; jika tidak relevan dengan landing, catat dan abaikan dengan alasan.
- `playwright-mcp` — dari https://github.com/microsoft/playwright-mcp. Fungsi: QA visual + interaksi tiap section (screenshot vs referensi, klik FAQ/form/nav).
- `addyosmani/agent-skills` — dari https://github.com/addyosmani/agent-skills. Fungsi: praktik performa frontend (gambar responsif, font, bundle).
- `mattpocock` — HANYA `wayfinder`, `show-me`, `grill-me` dari https://github.com/mattpocock/skills. Gunakan skill global yang sudah ada, **dilarang install ulang**. `wayfinder`: kerja per tiket peta di `MIGRATION_PLAN.md §10`, maksimal 1 tiket per sesi (kecuali research). `grill-me`: tantang asumsi sebelum kunci keputusan. `show-me`: minta/tunjukkan bukti visual saat ragu.

## 3. MCP global wajib — codedb + lexa

- `codedb`: dipakai untuk setiap pencarian lintas-file (mapping `w-dyn-list → content`, cek link `/product|/project|/blog|/teams|/reviews`, audit `w-*` sisa). Dilarang mengganti dengan grep buta untuk pertanyaan arsitektur.
- `lexa`: dipakai untuk konteks tambahan yang tidak ada di working directory (referensi API Astro/Tailwind terbaru, verifikasi pola headless tanpa radix).
- Jika MCP tidak terekspos di sesi berjalan: catat di pesan (`MCP codedb/lexa tidak tersedia sesi ini, dipakai fallback read/grep`) dan tetap patuhi §1–§2. Jangan berpura-pura memanggil MCP.

## 4. LSP enforcement (lsp-ai)

- Sebelum setiap commit: pastikan tidak ada error/warning LSP pada file yang diubah (diagnostik TS + Astro). Jalankan `npx astro check` dan `npx tsc --noEmit` bila toolchain tersedia; bila belum terinstal, jalankan `rg` guard §1 dan nyatakan toolchain belum tersedia di pesan commit.
- Aturan TS: `strict: true`, tidak ada `any` tanpa alasan tertulis, props komponen di-`type` eksplisit, data landing di-`type` dari `src/content/landing.ts`.
- Aksesibilitas LSP-for-human: pertahankan `aria-label`, alt gambar, fokus visible, dan `prefers-reduced-motion`.

## 5. Cara kerja per sesi

1. Baca `MIGRATION_PLAN.md` §2–§7 untuk tiket aktif; jangan loncat urutan section.
2. Muat skill §2, pakai MCP §3, cek LSP §4.
3. Tulis kode baru bertipe aman; tiru token persis (§4 plan); animasi hanya via §5 plan.
4. Verifikasi: `astro check`, `tsc --noEmit`, guard `rg`, dan Playwright untuk section yang diubah.
5. Pesan ringkas gaya caveman: apa diubah, file:line, hasil verifikasi, tiket berikutnya.

## 6. Sumber rujukan yang sah

- Mentah: `C:\projectweb\webflow\proforma-db.webflow.io\website-ed42221c-4714-4c78-8b3f-bc47a7e7c3a7\index.html`, `style-guide.html`.
- Kontrak: `MIGRATION_PLAN.md`. File ini (`AGENTS.md`) untuk perilaku agent.
- Dilarang menambah dependensi tanpa persetujuan: terutama yang menyeret `radix`, `jquery`, atau runtime backend.
