# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains both a **landing page** and the **knowledge base** for the course **"IA para Médicos: Inteligência Artificial aplicada à prática clínica e gestão"**, a continuing education program by Hospital Israelita Albert Einstein.

## Repository Structure

```
LP_CursoIA/
├── index.html              # Landing page (entry point)
├── css/styles.css          # All styles (design system, responsive)
├── js/main.js              # Animations (particles, scroll reveal, accordion)
├── assets/
│   ├── images/             # Generated images (Nano Banana Pro), logos, OG
│   └── marketing/          # Existing Gemini-generated images
├── docs/                   # Reference documents (NOT served on the site)
│   ├── base_conhecimento_ia_para_medicos_expandida.md
│   ├── Cronograma_IA para Médicos.xlsx
│   ├── EINSTEIN_GuiadeMarca_Externo.pdf
│   └── Máscara_IA_para_Médicos.doc
└── CLAUDE.md
```

## Landing Page Tech Stack

- **Pure HTML/CSS/JS** — no build tools, no frameworks
- **Font:** Montserrat via Google Fonts CDN
- **Design:** Dark futuristic theme with Einstein blue palette (#00539A, #0096D2, #00DBFF)
- **Features:** Canvas particle animation, glassmorphism cards, scroll reveal, responsive
- **Deploy:** Open `index.html` in browser, or host on GitHub Pages / Netlify / Vercel

## Key Facts (from the knowledge base)

- **Target audience**: Physicians of all specialties, no programming required.
- **Format**: Online live classes, Tuesdays 19h–22h (Brasília time), 30h + 2 masterclasses.
- **Period**: 2025-04-28 to 2025-06-30.
- **Price**: R$ 6.900,00. Authorized coupon: **IAMEDICOS** (35% off).
- **Certificate**: Issued by Hospital Israelita Albert Einstein.
- **Enrollment link**: ensino.einstein.br/curso_gt_ia_para_medicos_p15153/p
- **Human support**: (11) 2151-3330 (phone/WhatsApp).

## Agent Policy Summary

The knowledge base defines strict rules for an AI agent that interacts with potential students:
- Only offer the **IAMEDICOS** coupon — never invent or negotiate other discounts.
- Escalate to human support for: custom discounts, group/institutional interest, billing questions, complaints, partnerships, or unconfirmed information.
- Collect lead data (name, specialty, city, interest) naturally when appropriate.
- Never give medical, legal, or financial advice; never promise professional/financial outcomes.

## Working in This Repo

### Landing Page (`index.html`, `css/`, `js/`)
- All visible text is in **Brazilian Portuguese**.
- CTAs link to the official enrollment page.
- Design tokens are in CSS custom properties (`:root` in `styles.css`).
- Animations are vanilla JS with Intersection Observer API.

### Knowledge Base (`docs/base_conhecimento_ia_para_medicos_expandida.md`)
- Maintain the existing markdown structure (headers, numbered FAQs, tool lists per module).
- Commercial terms (pricing, coupons, policies) must only be changed with explicit authorization.
- The 10-module structure covers: prompting, AI agents, ambient listening, diagnostic support, scientific research, content creation, clinic automation, no-code apps, privacy/LGPD, and financial intelligence.
