# Portfolio — Deepak SG

Personal site for a security researcher & AI engineer. Built with Next.js (App Router), TypeScript and Tailwind CSS v4, implemented from the `Portfolio.dc.html` design.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script                 | What it does               |
| ---------------------- | -------------------------- |
| `npm run dev`          | Dev server                 |
| `npm run build`        | Production build           |
| `npm start`            | Serve the production build |
| `npm run lint`         | ESLint                     |
| `npm run typecheck`    | `tsc --noEmit`             |
| `npm run format`       | Prettier write             |
| `npm run format:check` | Prettier check             |

### Environment

Copy `.env.example` to `.env.local`. Both variables are optional:

- `GROQ_API_KEY` — enables the "Ask the site" assistant and the "Explain this" popover, served by Groq (`llama-3.3-70b-versatile`). Without it, both still render and reply with a clear "not configured" message; nothing else on the site is affected.
- `NEXT_PUBLIC_SITE_URL` — absolute origin used for canonical URLs, Open Graph and `sitemap.xml`. Defaults to the production Vercel URL.

On Vercel, set the same variables under **Settings → Environment Variables**. `GROQ_API_KEY` must **not** be prefixed `NEXT_PUBLIC_` — that would ship the secret to the browser.

`/api/chat` applies a per-IP rate limit, a request-size cap and an upstream timeout, but the limiter is in-memory and therefore per-instance. It deters a casual abuse loop; it is not a hard quota guarantee.

## Where to edit content

**All copy lives in `src/data`.** Changing content should never require touching JSX — every section maps over a typed array.

| File              | Contains                                                                   |
| ----------------- | -------------------------------------------------------------------------- |
| `site.ts`         | Name, wordmark, tagline, contact links, nav sections, per-page header copy |
| `about.ts`        | Bio paragraphs, education                                                  |
| `skills.ts`       | Six skill categories                                                       |
| `experience.ts`   | Roles                                                                      |
| `projects.ts`     | Case studies (problem / approach / stack / results)                        |
| `repos.ts`        | Repository cards                                                           |
| `posts.ts`        | Articles — each `id` becomes the `/blog/<id>` route                        |
| `publications.ts` | Papers                                                                     |
| `soc.ts`          | SOC & DFIR areas                                                           |
| `honors.ts`       | Awards                                                                     |

Every shape is defined in `src/types/index.ts`, so a mistyped or missing field fails the build rather than rendering blank.

Two conventions worth knowing:

- A project's `live` link renders only when the field is present — omit it and the button disappears. Same for an honor's `amount`.
- The contact address is stored split in `site.ts` (`emailParts`) and joined in the browser after hydration, so the full address never appears in the served HTML.

### Adding a blog post

Append an entry to `posts` in `src/data/posts.ts`. The route, static params, metadata and "Keep reading" links are all derived — no new files needed.

## Structure

```
src/
  app/                  # Routes; one folder per section, plus blog/[slug] and api/chat
  components/
    ui/                 # Primitives: Container, Section, SplitRow, Tag, Eyebrow, Reveal, …
    sections/           # Page sections: Hero, Navbar, Projects, Contact, ChatDock, …
  data/                 # All content (above)
  lib/                  # utils, theme, hooks, email, metadata, assistant client, knowledge base
  styles/globals.css    # Design tokens, keyframes, base layer
  types/                # Shared types
```

The design's single-page SPA became real routes (`/about`, `/projects`, `/blog/[slug]`, …). Everything prerenders statically except `/api/chat`.

### Design tokens

The palette is defined once as CSS custom properties in `src/styles/globals.css` and mapped into Tailwind with `@theme inline`, so utilities like `bg-bg`, `text-dim` and `border-line` follow the active theme. The light theme overrides the same variables under `:root[data-theme="light"]`; a small pre-paint script in the root layout applies the stored choice before first render to avoid a flash.

To reskin the site, edit those two variable blocks — nothing else references a raw colour.

### Notes on a few decisions

- **Server Components by default.** Only genuinely interactive pieces are `"use client"`: navbar, repo explorer, contact form, theme/sound toggles, chat, scroll effects.
- **`useSyncExternalStore` over `useEffect`** for theme, reduced-motion and mount detection. The DOM/media query is the source of truth React subscribes to, which avoids the cascading-render pattern React 19's linter rejects.
- **No images.** The design is entirely CSS — gradients, an inline-SVG grain filter, and type. There is nothing for `next/image` to optimise until real imagery (portrait, project screenshots) is added; use `next/image` when it is.
- **Fonts** are self-hosted at build time via `next/font/google`, so there are no runtime requests to Google and no layout shift.
- **Motion** respects `prefers-reduced-motion` throughout — the loader is skipped, reveals render visible, parallax and the magnetic CTA are disabled.

## Before deploying

- Set `NEXT_PUBLIC_SITE_URL`.
- Replace the sample values carried over from the design: repository star/fork/issue counts (`repos.ts`), and publication `link`/`doi` fields, which are placeholders (`10.0000/…`, `#`).
- Add an Open Graph image if you want link previews to show artwork.
