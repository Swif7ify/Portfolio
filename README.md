# Earl Romeo Ordovez — Portfolio (OneDev PH)

An award-caliber, dark-mode portfolio built with **Next.js 16+**, **React 19**, **TypeScript**, and **Framer Motion**. Designed around precision typography, smooth scroll physics, and immersive micro-interactions.

---

## 🚀 Tech Stack & Core Libraries

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (`Anton`, `Instrument Serif`, `Inter`) via `next/font/google`

---

## ✨ Features & Design Highlights

- **Custom Physics Cursor**: Smooth follower cursor with spring dynamics and contextual `data-cursor` label states.
- **Magnetic Micro-Interactions**: Magnetic hover effects on action buttons, links, and navigation logo.
- **Velocity Ticker Marquee**: Infinite marquee ticker whose speed and scroll direction react dynamically to user scrolling velocity.
- **Animated Preloader**: Intro preloader with multi-language greeting cycling and numerical count exit slide.
- **Multidisciplinary Capabilities**:
  - `01 / Web Development` (Next.js, React, Node.js, TypeScript, TailwindCSS)
  - `02 / Game Development` (Unity, Unreal Engine, C#, C++, Gameplay Systems)
  - `03 / 3D Modeling & Art` (Blender, Texturing, Shader Graph, Environment Design)
  - `04 / Circuit Design & IoT` (PCB Layout, Microcontrollers, C/C++, Arduino)
- **Testimonial Engine**: Carousel slider with blur transitions, pagination controls, auto-advance, and graceful empty-state fallbacks.
- **SEO & Performance Optimized**: Pre-rendered static pages with Next.js Turbopack compiler.

---

## 📁 Project Structure

```text
earl-portfolio/
├── app/
│   ├── globals.css         # Tailwind v4 @theme design tokens & custom utilities
│   ├── layout.tsx          # Root layout with Google Fonts & metadata
│   └── page.tsx            # Main portfolio homepage
├── public/                 # Image assets and static files
└── src/
    ├── components/
    │   ├── Cursor.tsx      # Hydration-safe follower cursor
    │   ├── Magnetic.tsx    # Magnetic interaction wrapper
    │   ├── Navbar.tsx      # Navigation header with live Asia/Manila clock
    │   ├── Preloader.tsx   # Loading screen state
    │   ├── RevealText.tsx  # Masked word reveal on scroll
    │   └── sections/
    │       ├── Hero.tsx         # Parallax hero header
    │       ├── Marquee.tsx      # Velocity scroll ticker
    │       ├── Work.tsx         # Projects grid with expandable view
    │       ├── About.tsx        # Bio, stats, and portrait parallax
    │       ├── Services.tsx     # Capabilities accordion
    │       ├── Testimonials.tsx # Review carousel & empty state fallback
    │       └── Contact.tsx      # Magnetic email CTA & social links
    ├── data/
    │   ├── projects.ts     # Projects & services data
    │   └── testimonials.ts # Testimonials data
    └── hooks/
        └── useSmoothScroll.ts # Lenis smooth scroll hook
```

---

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## ⚙️ Available Scripts

- `npm run dev` — Launch Next.js dev server with Turbopack.
- `npm run build` — Build optimized production application.
- `npm run start` — Start production server.
- `npm run lint` — Run ESLint check.
- `npx tsc --noEmit` — Run TypeScript type checking.

---

## 📄 License

Designed & built by **Earl Romeo Ordovez (OneDev PH)**. All rights reserved.
