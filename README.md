<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<h1 align="center">🌿 RICHY EXPORTS</h1>

<p align="center">
  <strong>Premium Indian Herbal Products — From India's Soil to the World's Shelf</strong>
</p>

<p align="center">
  A stunning, production-ready website for an international herbal products export company based in Chennai, India.<br/>
  Built with a dark luxury aesthetic, cinematic animations, and seamless user experience.
</p>

---

## ✨ Features

### 🎬 Cinematic Hero
- Parallax background with real product photography
- Word-by-word 3D text reveal animation
- Floating gold particle effects
- Animated botanical SVG illustrations

### 📦 Interactive Product Catalog
- **9 premium products** with professional photography (Turmeric, Ashwagandha, Moringa, Cumin, Fenugreek, Holy Basil, Ginger, Neem, Senna)
- **Click-to-expand product detail modals** with:
  - Rich introductory text (history, medicinal use, sourcing)
  - Origin, Shelf Life, Packaging & MOQ info
  - Quality specifications (curcumin %, moisture, heavy metals, etc.)
  - Direct **"Request Quote"** and **"WhatsApp Inquiry"** CTAs

### 🏗️ Full-Page Sections
| Section | Description |
|---------|-------------|
| **Hero** | Cinematic intro with parallax & text reveal |
| **About** | Company story, animated stat counters (7+ years, 40+ countries, 5000+ MT) |
| **Products** | 9-card grid with images, specs, click-to-detail modals |
| **Process** | 6-step farm-to-export supply chain visualization |
| **Why Us** | Key differentiators with animated cards |
| **Certifications** | ISO 9001:2015, FSSAI, APEDA, GMP, USDA Organic, Halal |
| **Testimonials** | Client quotes from global buyers |
| **Global Reach** | Animated world map with 40+ country coverage |
| **Contact** | Inquiry form with business hours display |
| **Footer** | 4-column layout with nav, products, certs, contact |

### 🎨 Design
- **Dark luxury aesthetic** — premium color palette with gold accents
- **Smooth animations** — Framer Motion throughout with `AnimatePresence`
- **Responsive design** — optimized for mobile, tablet, and desktop
- **Custom loading screen** — animated leaf + progress bar
- **Hover micro-interactions** — scale, glow, parallax on cards and buttons

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/JanSteve/richy-exports.git

# Navigate to the project
cd richy-exports

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Project Structure

```
richy-exports/
├── index.html                 # Entry HTML with SEO meta tags & structured data
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.cjs        # Tailwind theme (custom colors, fonts, animations)
├── postcss.config.cjs         # PostCSS plugins
├── vercel.json                # Vercel deployment configuration
├── .env.example               # Environment variables template
├── .gitignore
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Main app with lazy loading + section observer
    ├── index.css              # Global styles, CSS variables, custom utilities
    └── components/
        ├── Loader.jsx         # Animated loading screen
        ├── Navbar.jsx         # Sticky navbar with scroll-aware active states
        ├── Hero.jsx           # Parallax hero with word-by-word text reveal
        ├── Marquee.jsx        # Scrolling trust badges marquee
        ├── About.jsx          # Company story + animated stat counters
        ├── Products.jsx       # Product grid + click-to-detail modals
        ├── Process.jsx        # 6-step supply chain process visualization
        ├── WhyUs.jsx          # Differentiators section
        ├── Certifications.jsx # Certification badges display
        ├── Testimonials.jsx   # Client testimonials carousel
        ├── GlobalReach.jsx    # Animated SVG world map
        ├── Contact.jsx        # Inquiry form + business hours
        └── Footer.jsx         # 4-column footer with navigation
```

---

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-dark` | `#0A0C0A` | Primary background |
| `--bg-mid` | `#111411` | Section alt background |
| `--bg-card` | `#161A16` | Card backgrounds |
| `--gold` | `#C8A96E` | Accent / CTAs |
| `--gold-light` | `#D4BA82` | Hover states |
| `--lime` | `#A3B18A` | Secondary accent |
| `--cream` | `#F5F0E8` | Headings |

### Typography
| Role | Font |
|------|------|
| Display (headings) | Playfair Display |
| Body text | Inter |
| Quotes / Latin names | Lora (italic) |

---

## 🌐 Deploy to Vercel

This project is **Vercel-ready** out of the box.

### Option 1: One-Click Deploy
1. Push this repo to your GitHub account
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel will auto-detect Vite — just click **Deploy**
5. Done! 🎉

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Vercel Configuration
The included `vercel.json` handles everything:
```json
{
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "framework": "vite",
    "rewrites": [
        { "source": "/(.*)", "destination": "/index.html" }
    ]
}
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev/) | 18.3 | UI framework |
| [Vite](https://vitejs.dev/) | 5.4 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11.18 | Animations & transitions |
| [Lucide React](https://lucide.dev/) | 0.469 | Icon library |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, stacked sections |
| Tablet | 640-1024px | 2-column grids |
| Desktop | > 1024px | Full 3-column product grid, side-by-side layouts |

---

## ⚡ Performance

- **Lazy-loaded** sections with `React.lazy()` + `Suspense`
- **Intersection Observer** for viewport-based section rendering
- **Image lazy loading** via `loading="lazy"` attribute
- **Code splitting** — each section is a separate chunk
- **Optimized animations** — `will-change-transform`, GPU-accelerated

---

## 📄 Environment Variables

Copy `.env.example` to `.env` for any custom configuration:

```bash
cp .env.example .env
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>RICHY EXPORTS</strong> · Since 2019 · Chennai, India 🇮🇳
  <br/>
  <sub>Built with ❤️ using React, Vite, Tailwind CSS & Framer Motion</sub>
</p>
