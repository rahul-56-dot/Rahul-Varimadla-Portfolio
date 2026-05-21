# Rahul Varimadla Portfolio

A modern, visually stunning personal portfolio built with **Next.js 14**, **TypeScript**, **React**, and **Framer Motion**. It showcases my projects, skills, certifications, and provides a sleek UI with glassmorphism, neon accents, and interactive 3D hero section.

---

## ✨ Features
- **Dynamic Hero Section** with three‑dimensional scene (Three.js) and animated gradients.
- **Responsive design** – mobile‑first layout with smooth micro‑animations.
- **Skill cards** with animated icons and proficiency bars.
- **Projects** showcase with hover effects and external links.
- **Certificates** displayed with custom color tags.
- **Contact form** smooth scroll navigation.
- **Custom favicon** (your personal "R" icon) for branding.
- **SEO ready** – meta tags, Open Graph, and structured data.

---

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router) 
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with custom utilities for neon/glass effects)
- **Animations:** Framer Motion, GSAP
- **3D:** Three.js (dynamic Hero scene)
- **Icons:** Lucide‑react, custom SVGs
- **Deployment:** Vercel (recommended) – zero‑config CI/CD

---

## 📁 Project Structure
```
Rahul-Varimadla-Portfolio/
├─ public/                # Static assets (images, favicon, etc.)
│   └─ my‑icon.png       # Custom favicon
├─ src/
│   ├─ app/               # Next.js App Router
│   │   ├─ layout.tsx      # Root layout with metadata (title, description, icons)
│   │   └─ page.tsx        # Home page entry point
│   ├─ components/        # Reusable UI components
│   │   ├─ sections/       # Page sections (Hero, About, Skills, Projects…)
│   │   └─ ui/             # UI primitives (Button, MagneticButton…)
│   ├─ data/               # Portfolio data (personalInfo, projects, skills, etc.)
│   └─ styles/            # Global CSS (globals.css)
├─ .gitignore
├─ package.json
├─ next.config.ts
├─ tsconfig.json
└─ README.md              # ← **This file**
```

---

## 🚀 Getting Started
1. **Clone the repository**
   ```bash
   git clone https://github.com/your‑username/rahul-varimadla-portfolio.git
   cd rahul-varimadla-portfolio
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev   # http://localhost:3000
   ```
4. **Build for production**
   ```bash
   npm run build && npm start
   ```

---

## 📦 Deploy to Vercel (recommended)
1. Sign in to **[Vercel](https://vercel.com)** with your GitHub account.
2. Click **"New Project"** → import the repository.
3. Vercel will detect the Next.js framework automatically.
4. Set any environment variables if needed (none required for this demo).
5. Deploy! Your site will be live at `https://<project-name>.vercel.app`.

*Alternatively, you can deploy to Netlify, Railway, or any platform that supports Node.js.*

---

## 📤 Push to GitHub
```bash
# After making changes locally
git add .
git commit -m "Initial commit – portfolio with custom favicon"
git branch -M main
git remote add origin https://github.com/your‑username/rahul-varimadla-portfolio.git
git push -u origin main
```

---

## 🎨 Customization
- **Favicon** – replace `public/my‑icon.png` with your own 256×256 PNG.
- **Colors & Fonts** – edit the Tailwind config in `tailwind.config.ts` and the Google Font imports in `layout.tsx`.
- **Content** – update `src/data/portfolio.ts` to change personal info, projects, skills, and certificates.

---

## 📝 License
This project is open‑source. Feel free to fork and use it for your own portfolio.

---

*Built with love by **Rahul Varimadla** – let’s connect on [GitHub](https://github.com/rahul-56-dot) and [LinkedIn](https://linkedin.com/in/rahul-varimadla).*
