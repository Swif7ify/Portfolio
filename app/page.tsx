"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KineticProvider } from "@/src/contexts/KineticContext";
import { SmoothScroll } from "@/src/components/SmoothScroll";
import { Cursor } from "@/src/components/Cursor";
import { Preloader } from "@/src/components/Preloader";
import { Navbar } from "@/src/components/Navbar";
import { Hero } from "@/src/components/sections/Hero";
import { Marquee } from "@/src/components/sections/Marquee";
import { InlineStatement } from "@/src/components/sections/InlineStatement";
import { DepthTunnel } from "@/src/components/sections/DepthTunnel";
import { MaskReveal } from "@/src/components/sections/MaskReveal";
import { ComicCamera } from "@/src/components/sections/ComicCamera";
import { PageFlipLookbook } from "@/src/components/sections/PageFlipLookbook";
import { ProcessPath } from "@/src/components/sections/ProcessPath";
import { ZoomOutGrid } from "@/src/components/sections/ZoomOutGrid";
import { VariableSpecimen } from "@/src/components/sections/VariableSpecimen";
import { CylinderCarousel } from "@/src/components/sections/CylinderCarousel";
import { StackingCards } from "@/src/components/sections/StackingCards";
import { BlindsTransition } from "@/src/components/sections/BlindsTransition";
import { ElasticGrid } from "@/src/components/sections/ElasticGrid";
import { Work } from "@/src/components/sections/Work";
import { ExpandingPanels } from "@/src/components/sections/ExpandingPanels";
import { InfiniteCanvas } from "@/src/components/sections/InfiniteCanvas";
import { NativeScrollCSS } from "@/src/components/sections/NativeScrollCSS";
import { TransitionLab } from "@/src/components/sections/TransitionLab";
import { Certificates } from "@/src/components/sections/Certificates";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { CurtainFooter } from "@/src/components/CurtainFooter";

const marqueeItems = [
  "Biography",
  "Creative Engineering",
  "Design Systems",
  "Spring Physics",
  "Full-Stack",
  "WebGL & Motion"
];

export default function Home() {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <KineticProvider initialTheme="cyber">
      <SmoothScroll />
      <div className="relative min-h-screen w-full bg-bg text-fg">
        <div className="noise-overlay" aria-hidden="true" />
        <Cursor />

        <AnimatePresence mode="wait">
          {!loaded && (
            <Preloader
              key="preloader"
              onComplete={() => setLoaded(true)}
            />
          )}
        </AnimatePresence>

        <Navbar ready={loaded} />

        <main className="relative z-10 w-full">
          {/* Chapter 00: Prologue & Hero */}
          <Hero ready={loaded} />

          <div className="border-y border-hair bg-surface/60 backdrop-blur-[4px] py-6 md:py-8">
            <Marquee baseVelocity={2.5}>
              {marqueeItems.map((item) => (
                <span
                  key={item}
                  className="mx-6 flex items-center gap-12 font-display text-4xl uppercase text-fg md:text-6xl"
                  style={{ fontVariationSettings: "'wght' 700, 'wdth' 75" }}
                >
                  {item}
                  <motion.span
                    className="text-accent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ✳
                  </motion.span>
                </span>
              ))}
            </Marquee>
          </div>

          {/* Chapter 01: The Creed & Statement */}
          <InlineStatement />

          {/* Chapter 02: 3D Depth Flight */}
          <DepthTunnel />

          {/* Chapter 03: The Aperture Zoom */}
          <MaskReveal />

          {/* Chapter 04-07: The Life Story & Visual Biography */}
          <ComicCamera />
          <PageFlipLookbook />
          <ProcessPath />
          <ZoomOutGrid />

          {/* Chapter 08-09: Interactive Typography & 3D Spatial Carousel */}
          <VariableSpecimen />
          <CylinderCarousel />

          {/* Chapter 10-14: Flagship Works & Capabilities */}
          <StackingCards />
          <BlindsTransition />
          <ElasticGrid />
          <Work />
          <ExpandingPanels />

          {/* Chapter 15-17: Platform Engineering & Labs */}
          <InfiniteCanvas />
          <NativeScrollCSS />
          <TransitionLab />

          {/* Chapter 18: Credentials & Testimonials */}
          <Certificates />
          <Testimonials />

          {/* Finale & Contact */}
          <CurtainFooter />
        </main>
      </div>
    </KineticProvider>
  );
}
