# marksoper.me — Major Refactor Plan

**Date:** March 9, 2026
**Status:** In Progress

---

## 1. Goals & Requirements

### From the initial user brief:

1. **Code organization overhaul** — The current site is brittle, non-DRY static HTML. Move to a modern static site generator (Astro 5) while retaining all existing content.

2. **Content preservation & modern authoring** — Keep all existing content (blog posts, portfolio with screenshots/logos/visual history). Enable modern content authoring via MDX with custom publication dates (ability to backdate posts).

3. **Social integrations** — Retain and improve social tie-ins (LinkedIn, GitHub, Twitter/X). Explore automatic integration to pull recent posts/activity. Manage integrations via Terraform.

4. **New aesthetic & layout** — Start from scratch on design. Informed by the Claude.ai planning conversation (dark editorial terminal aesthetic) but not necessarily copying it. The user expressed uncertainty about the proposed dark-mode aesthetic.

5. **Modern deployment pipeline** — Move from GitHub Pages to Cloudflare Pages. Use Terraform for infrastructure configuration. Simple deploy script (no CI/CD pipeline required).

---

## 2. Current State Analysis

### Existing Site Structure
- **Hosting:** GitHub Pages (gh-pages branch)
- **Domain:** marksoper.me (CNAME file)
- **Build system:** None — raw static HTML files served directly
- **Stack:** HTML5, CSS3, vanilla JS (Google Analytics only)

### Content Inventory
- **1 main homepage** (index.html, 840 lines) — Bio, current work, contact, blog list, projects/roles, domain names
- **~23 blog posts** (individual HTML files) — Dates range from 2008 to 2017
- **77 image assets** (img/ and media/images/) — Company logos, project screenshots, profile photos, social icons
- **Total size:** ~34MB

### Blog Post Dates (extracted from HTML content)
| Post | Date |
|------|------|
| Phone number verification (AWS Lambda) | Sep 18, 2017 |
| Conway's Game of Life (React/Redux) | ~2017 |
| GraphQL and Data Fluency | Jan 22, 2016 |
| React Data Management (Flux/Redux/Relay) | ~2016 |
| Data-Focused UI Design | ~2016 |
| Value Investing & March Madness | ~2013 |
| Kids Game & Story Apps | ~2013 |
| Backbone Routing | ~2012 |
| Top 10 TED Talks 2011 | ~2011 |
| Node.js Runkeeper Client | ~2011 |
| Node.js Analytics | ~2011 |
| jQuery Mobile Pros/Cons | ~2011 |
| Requiem For A Startup | Apr 30, 2011 |
| Server-side DOM (JSDOM) | Apr 25, 2011 |
| New Blog Using Petrify | ~2011 |
| MIT Enterprise Forum | ~2010 |
| Quinn Amrich Soper Born | May 26, 2009 |
| OpenCalais RDF | ~2009 |
| Likematter Concept Clouds | ~2008 |
| Find News & Jobs with Likematter | ~2008 |

### Portfolio/Projects (from index.html)
| Company/Project | Years | Role |
|----------------|-------|------|
| Cockroach Labs | 2021–present | Product Manager |
| Microsoft Azure ML | 2018–2021 | Software Engineer |
| Rocket Insights/Brightcove | 2017–2018 | API Tech Lead (Contract) |
| GetHuman | 2015–2017 | Contract Engineer & Tech Lead |
| VMware | 2016 | Web UI Developer (Contract) |
| Scratch (E-commerce) | 2015 | Full-stack Development |
| FinMason | 2014–2015 | Web App UI Development |
| Invite Education | 2013–2014 | Product Management, Design, Dev |
| Harvard CATCH | 2013 | Javascript UI Developer |
| Oxfam America | 2013 | Python/Django Engineer |
| Aquto | 2012 | UI/UX Developer |
| Connected Sports | 2011–2012 | Co-Founder, Developer |
| Collaborate.com (Kibits) | 2011 | UI/UX & Node.js Developer |
| Fitgiver | 2011 | Part-time Developer |
| Swoop | 2011 | Javascript SDK Developer |
| Rally | 2009–2010 | Founder, CTO, Designer, Developer |
| Likematter | 2008–2009 | Founder, CTO, Designer, Developer |
| Bracketwise | 2013 | Developer (Side Project) |

### Social Links (existing)
- Twitter: @marksoper
- LinkedIn: /in/marksoper
- GitHub: /marksoper
- Google+ (defunct — to be removed)
- Email (encoded as image)

### Domain Names Listed (for sale)
30+ .ai and .io domains including schema.ai, database.ai, command.ai, etc.

---

## 3. Technical Architecture

### Stack Decision

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | **Astro 5** | Purpose-built for content sites. Zero JS by default. Built-in MDX, RSS, sitemap. |
| Styling | **Tailwind CSS 4** | Utility-first, configured via CSS @theme directives (no config file). |
| Content | **MDX in content collections** | Markdown with frontmatter for metadata. Custom pub dates. Astro Content Layer API with glob loader. |
| Syntax Highlighting | **Shiki** (Astro built-in) | Server-rendered, no client JS. Custom theme matching site palette. |
| Deployment | **Cloudflare Pages** | Global CDN, free tier sufficient, automatic builds possible. |
| Infrastructure | **Terraform** | Cloudflare Pages config, DNS, social integrations. |
| Analytics | **TBD** | Consider Plausible or Cloudflare Web Analytics (free, privacy-focused). |

### Project Structure
```
marksoper.me/
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── PostList.astro
│   │   ├── ProjectCard.astro
│   │   └── SocialLinks.astro
│   ├── content/
│   │   └── blog/          # MDX blog posts
│   ├── content.config.ts  # Content collection schema
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   └── rss.xml.ts
│   └── styles/
│       └── global.css      # Tailwind + CSS custom properties
├── public/
│   ├── img/                # Existing images (preserved)
│   ├── media/              # Existing media (preserved)
│   └── CNAME
├── infra/
│   ├── main.tf             # Cloudflare Pages, DNS
│   ├── variables.tf
│   └── terraform.tfvars.example
├── docs/
│   └── refactor_plan.md    # This document
├── astro.config.mjs
├── package.json
└── deploy.sh
```

### Content Collection Schema (MDX Frontmatter)
```yaml
---
title: "Post Title"
description: "Brief description"
date: 2017-09-18        # Publication date (freely settable)
tags: ["aws", "react", "microservices"]
draft: false
image: "/img/some-image.png"  # Optional hero/og image
originalUrl: "https://medium.com/..."  # Optional cross-post link
---
```

---

## 4. Design Direction

### Aesthetic Decisions
The Claude.ai planning conversation proposed a "dark, editorial, quietly technical" aesthetic (dark background, warm copper accent, DM Serif + DM Sans + JetBrains Mono type stack). The user expressed uncertainty about this direction.

**Decision:** Design a clean, warm editorial aesthetic that:
- Prioritizes readability and content
- Uses a refined typography pairing
- Feels professional without being corporate
- Works well for both portfolio and blog content
- Retains the visual history aspect (project screenshots, logos)
- Is mobile-responsive

### Site Pages
1. **/ (Home)** — Brief bio, recent blog posts, "Now" section, social links
2. **/blog** — All posts with tag filtering, grouped by year
3. **/blog/[slug]** — Individual blog post with full typography treatment
4. **/about** — Full bio, career timeline/portfolio with visual history, social links

### Key Design Elements
- Clean navigation (name + page links)
- Portfolio section retains company logos and project screenshots
- Blog posts with proper dates, tags, reading time
- Social links (LinkedIn, GitHub, Twitter/X)
- RSS feed
- Mobile-responsive throughout

---

## 5. Infrastructure & Deployment

### Cloudflare Pages Setup (Terraform)
- Cloudflare Pages project connected to GitHub repo
- Custom domain: marksoper.me
- DNS records managed via Terraform
- Build command: `npm run build`
- Output directory: `dist/`

### Deploy Script
Simple script that builds and pushes to trigger Cloudflare Pages deployment:
```bash
#!/bin/bash
npm run build
# Push to main branch triggers Cloudflare Pages build
git add -A && git commit -m "deploy" && git push
```

### Social Integrations (Terraform-managed where possible)
- LinkedIn profile link
- GitHub activity (can use GitHub API)
- Twitter/X profile link
- Potential: Pull recent LinkedIn posts via API (requires OAuth app — may Terraform the app registration)

---

## 6. Migration Plan

### Phase 1: Scaffold & Design System ← IN PROGRESS
- [x] Initialize Astro 5 project with dependencies
- [x] Create docs/refactor_plan.md
- [ ] Configure astro.config.mjs
- [ ] Set up Tailwind CSS 4 with design tokens
- [ ] Create Base layout, Nav, Footer components
- [ ] Establish typography and color system

### Phase 2: Content Migration
- [ ] Convert all blog posts from HTML to MDX
- [ ] Extract dates, titles, and content from existing HTML
- [ ] Migrate images (keep in public/img/ and public/media/)
- [ ] Set up content collection with proper schema
- [ ] Create blog index and individual post pages

### Phase 3: Portfolio & About
- [ ] Build portfolio/projects section with visual history
- [ ] Create about page with career narrative
- [ ] Preserve all company logos and screenshots
- [ ] Add social links component

### Phase 4: Homepage & Features
- [ ] Build homepage with bio, recent posts, "Now" section
- [ ] Add RSS feed generation
- [ ] Add sitemap
- [ ] Add meta tags / OpenGraph

### Phase 5: Infrastructure
- [ ] Terraform config for Cloudflare Pages
- [ ] DNS configuration
- [ ] Deploy script
- [ ] Social integration setup

### Phase 6: Polish & Launch
- [ ] Mobile responsiveness pass
- [ ] Accessibility review
- [ ] Performance optimization
- [ ] Remove old static HTML files
- [ ] Final deployment

---

## 7. Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-09 | Use Astro 5 | Best-in-class for content sites, zero JS default, built-in MDX/RSS |
| 2026-03-09 | Use Tailwind CSS 4 | Modern utility-first CSS, v4 uses Vite plugin + CSS config |
| 2026-03-09 | Cloudflare Pages over GitHub Pages | Better performance, modern deployment, Terraform-manageable |
| 2026-03-09 | Keep portfolio visual history | Important to retain screenshots, logos as part of career narrative |
| 2026-03-09 | All blog posts migrated (not just recent) | Preserve full content history, user can backdate as needed |
| 2026-03-09 | Terraform for infra | Manage Cloudflare Pages, DNS, and integrations as code |

---

## 8. Reference: Claude.ai Planning Conversation Summary

The planning conversation proposed:
- **Positioning:** "Product leader building at the intersection of infrastructure and AI"
- **Audiences:** (1) Hiring managers for Staff PM roles, (2) Observability/DevOps community, (3) Investors/collaborators
- **Design:** Dark mode, editorial, warm copper accent (#C4956A), DM Serif Display + DM Sans + JetBrains Mono
- **Pages:** Home (bio + posts), Blog, Blog Post, About
- **Features:** Newsletter signup, "Now" section, tag filtering, RSS, code blocks with Shiki
- **Reference sites:** leerob.com, linear.app/blog, rauno.me, paulgraham.com, andrewchen.com, gwern.net
- **Content strategy:** 3-5 initial posts establishing core themes (observability, AI infra, product management)

**User note:** "I'm not sure I really like the aesthetic of the proposed design, but please be informed by that."
