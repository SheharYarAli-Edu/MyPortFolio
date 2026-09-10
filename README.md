# SheharYar Ali — Aspiring Web Developer Portfolio

A production-ready, dark-themed portfolio for an Aspiring Web Developer & CS Graduate.

**🔗 Live Demo:** [sheharyar-portfolio.vercel.app](https://sheharyar-portfolio.vercel.app/)

![Portfolio Preview](docs/preview.png)

---

## Tech Stack

| | |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 11 |
| Icons | Lucide React + React Icons |
| Deployment | Vercel |

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/SheharYarAli-Edu/sheharyar-portfolio.git
cd sheharyar-portfolio

# 2. Install
npm install

# 3. Dev server
npm run dev        # http://localhost:5173

# 4. Production build
npm run build      # outputs to dist/
```

---

## Editing Content

All personal content lives in `src/data/` — no component changes needed:

| File | Controls |
|---|---|
| `src/data/about.js` | Name, tagline, bio, stats, social links |
| `src/data/projects.js` | Project cards |
| `src/data/skills.js` | Skill categories |
| `src/data/experience.js` | Experience cards |
| `src/data/certifications.js` | Certificate cards + verify links |
| `src/data/workflow.js` | ML pipeline steps |

---

## Key Assets

| Asset | Path |
|---|---|
| Profile photo | `src/assets/SheharYar Ali.jpg` |
| SA logo | `src/assets/sa-logo.png` |
| Resume PDF | `public/resume/resume.pdf` |
| Favicon | `public/favicon.svg` |
| Preview screenshot | `docs/preview.png` (used in this README) |

---

## Deploy to Vercel

### Option A — GitHub integration (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Vercel auto-detects Vite — click **Deploy**

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Vercel settings (auto-detected, no manual config needed)

| Setting | Value |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## Environment Variables

If using EmailJS contact form, add these in Vercel dashboard → Settings → Environment Variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Connect

- **Portfolio:** [sheharyar-portfolio.vercel.app](https://sheharyar-portfolio.vercel.app/)
- **GitHub:** [@SheharYarAli-Edu](https://github.com/SheharYarAli-Edu)
- **LinkedIn:** [sheharyar-ali-a78877422](https://linkedin.com/in/sheharyar-ali-a78877422)
