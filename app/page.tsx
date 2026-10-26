"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PixelGridBackground } from '../src/components/pixel/PixelGridBackground';
import { PixelCursor } from '../src/components/pixel/PixelCursor';
import { PixelTransition, type WipePhase } from '../src/components/pixel/PixelTransition';
import { SiteNav } from '../src/components/SiteNav';
import { Hero } from '../src/components/Hero';
import { WorkSection } from '../src/components/work/WorkSection';
import { ToolsMarquee } from '../src/components/ToolsMarquee';
import { AboutSection } from '../src/components/AboutSection';
import { CapabilitiesSection } from '../src/components/CapabilitiesSection';
import { CertificatesSection } from '../src/components/CertificatesSection';
import { ProcessSection } from '../src/components/process/ProcessSection';
import { ContactSection } from '../src/components/ContactSection';
import { ProjectDetail } from '../src/components/ProjectDetail';
import { projects } from '../src/data/projects';
import { KineticProvider } from '../src/contexts/KineticContext';
import { SmoothScroll } from '../src/components/SmoothScroll';

type PointerLike = { clientX: number; clientY: number } | null;

export default function Home() {
  const [accent, setAccent] = useState<'ember' | 'lime' | 'cobalt'>('ember');
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<WipePhase>('hold');
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.5 });
  const [openId, setOpenId] = useState<string | null>(null);

  // Derive effective phase during render instead of triggering cascading renders in effects
  const effectivePhase: WipePhase = reduce ? 'idle' : phase;

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  useEffect(() => {
    if (reduce) return;
    const t1 = window.setTimeout(() => setPhase('reveal'), 900);
    const t2 = window.setTimeout(() => setPhase('idle'), 1400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduce]);

  const wipe = useCallback(
    (e: PointerLike, swap: () => void) => {
      if (reduce) {
        swap();
        return;
      }
      setOrigin(
        e && (e.clientX || e.clientY)
          ? { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
          : { x: 0.5, y: 0.5 }
      );
      setPhase('cover');
      window.setTimeout(() => {
        swap();
        setPhase('reveal');
        window.setTimeout(() => setPhase('idle'), 480);
      }, 460);
    },
    [reduce]
  );

  const openProject = useCallback(
    (id: string, e: PointerLike) => wipe(e, () => setOpenId(id)),
    [wipe]
  );
  const closeProject = useCallback(
    (e: PointerLike) => wipe(e, () => setOpenId(null)),
    [wipe]
  );

  const index = projects.findIndex((p) => p.id === openId);
  const project = index >= 0 ? projects[index] : null;
  const nextProject = project ? projects[(index + 1) % projects.length] : null;

  return (
    <KineticProvider initialTheme="swiss">
      <SmoothScroll />
      <div
        data-accent={accent}
        className="relative min-h-screen w-full bg-paper font-sans text-ink selection:bg-accent selection:text-accent-ink transition-colors duration-200"
      >
        <a
          href="#work"
          className="pixel-corners fixed left-4 top-4 z-[150] -translate-y-24 bg-ink px-4 py-2 font-mono text-sm text-paper focus:translate-y-0 transition-transform"
        >
          Skip to work
        </a>

        <PixelGridBackground enabled={true} accent={accent} />
        <PixelCursor />
        <SiteNav accent={accent} onAccentChange={setAccent} />

        <main className="relative z-10">
          <Hero accent={accent} ready={effectivePhase !== 'hold'} />
          <WorkSection onOpen={openProject} />
          <ToolsMarquee />
          <AboutSection />
          <CapabilitiesSection />
          <CertificatesSection />
          <ProcessSection />
          <ContactSection />
        </main>

        {project && nextProject && (
          <ProjectDetail
            key={project.id}
            project={project}
            nextProject={nextProject}
            position={index + 1}
            total={projects.length}
            onClose={closeProject}
            onNext={(e: React.MouseEvent<HTMLElement>) => openProject(nextProject.id, e)}
          />
        )}

        <PixelTransition phase={effectivePhase} origin={origin} />
      </div>
    </KineticProvider>
  );
}
