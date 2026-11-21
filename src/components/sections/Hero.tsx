"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import type { MotionValue, Transition } from "framer-motion";
import { useKinetic } from "../../contexts/KineticContext";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { useElementMetrics } from "../../hooks/useElementMetrics";
import { useInView } from "../../hooks/useInView";
import { getImagePath } from "../../utils/image";
import { clamp } from "../../utils/math";

interface HeroProps {
	ready: boolean;
}

export const heroRotatingWords = [
	"digital experiences",
	"scalable systems",
	"modern interfaces",
	"creative web apps",
	"interactive worlds",
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HERO_NAME = "Earl Ordovez";

interface SocialLink {
	label: string;
	href: string;
	external: boolean;
}

const SOCIAL_LINKS: SocialLink[] = [
	{ label: "GitHub", href: "https://github.com/Swif7ify", external: true },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/earl-romeo-ordovez-a73a36322",
		external: true,
	},
	{ label: "Email", href: "mailto:earl.coding@gmail.com", external: false },
];

const nameStyle: React.CSSProperties = {
	fontWeight: 540,
	fontVariationSettings: "'wght' 540, 'wdth' 102, 'opsz' 144",
};

interface NameLayerProps {
	ready: boolean;
	y: MotionValue<number>;
	opacity: MotionValue<number>;
	className: string;
	transition: Transition;
	blendFront?: boolean;
}

/** Oversized neo-grotesk name spanning edge-to-edge; solid behind portrait, silver-blend veil in front. */
function NameLayer({
	ready,
	y,
	opacity,
	className,
	transition,
	blendFront = false,
}: NameLayerProps) {
	return (
		<div
			aria-hidden="true"
			className={`pointer-events-none absolute left-0 top-[47%] select-none sm:top-[44%] md:top-[41%] ${className}`}
		>
			<motion.div style={{ y, opacity }} className="will-change-transform">
				<div className="overflow-hidden pb-[0.08em]">
					<motion.span
						initial={{ y: "105%" }}
						animate={{ y: ready ? "0%" : "105%" }}
						transition={transition}
						className={`-ml-[0.03em] block whitespace-nowrap font-sans text-[clamp(5.4rem,21vw,22rem)] leading-[0.86] tracking-[-0.045em] text-cream ${
							blendFront ? "opacity-65 mix-blend-difference" : ""
						}`}
						style={nameStyle}
					>
						{HERO_NAME}
					</motion.span>
				</div>
			</motion.div>
		</div>
	);
}

export function Hero({ ready }: HeroProps) {
	const { reducedMotion } = useKinetic();
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, "200px");
	const heroMetrics = useElementMetrics(ref);
	const lastPRef = useRef<number>(-1);

	const textY = useMotionValue(0);
	const portraitY = useMotionValue(0);
	const contentOpacity = useMotionValue(1);

	useAnimationFrame(() => {
		if (typeof window === "undefined") return;
		if (reducedMotion) {
			if (lastPRef.current !== 0) {
				lastPRef.current = 0;
				textY.set(0);
				portraitY.set(0);
				contentOpacity.set(1);
			}
			return;
		}
		const h = Math.max(1, heroMetrics.current.height);
		const p = clamp(window.scrollY / h);
		if (Math.abs(p - lastPRef.current) < 0.0002) return;
		lastPRef.current = p;

		textY.set(p * -52);
		portraitY.set(p * 36);
		contentOpacity.set(1 - clamp(p / 0.9));
	}, inView);

	const revealTransition = (delay: number, duration = 0.9): Transition =>
		reducedMotion ? { duration: 0.01 } : { duration, delay, ease: EASE };

	return (
		<section
			id="hero"
			ref={ref}
			className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#090909] px-5 pb-6 pt-24 text-cream sm:px-8 md:pb-8 lg:px-10"
			aria-label="Introduction"
		>
			<h1 className="sr-only">
				Earl Romeo Ordovez — Full-Stack Developer, Agentic Systems &amp; Motion
			</h1>

			{/* Back name layer (solid cream behind portrait) */}
			<NameLayer
				ready={ready}
				y={textY}
				opacity={contentOpacity}
				className="z-10"
				transition={revealTransition(0.15, 1.05)}
			/>

			{/* Dramatic close-up monochrome B&W face portrait melting into darkness */}
			<motion.div
				style={{ y: portraitY, opacity: contentOpacity }}
				initial={{ opacity: 0, scale: 1.04 }}
				animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
				transition={revealTransition(0.05, 1.25)}
				className="pointer-events-none absolute left-1/2 top-[-6svh] z-20 aspect-[1365/2048] h-[155svh] -ml-[calc(155svh*1365/2048/2)] will-change-transform sm:top-[-8svh] sm:h-[195svh] sm:-ml-[calc(195svh*1365/2048/2)]"
			>
				<div
					className="relative h-full w-full"
					style={{
						WebkitMaskImage:
							"linear-gradient(to bottom, black 0%, black 27%, rgba(0,0,0,0.4) 35%, transparent 55%)",
						maskImage:
							"linear-gradient(to bottom, black 0%, black 27%, rgba(0,0,0,0.4) 35%, transparent 55%)",
					}}
				>
					<Image
						src={getImagePath("/earl-portrait-cutout.png")}
						alt="Portrait of Earl Romeo Ordovez"
						fill
						priority
						sizes="(max-width: 768px) 170vw, 1300px"
						className="object-cover object-top grayscale contrast-[1.18] brightness-[0.82]"
					/>
				</div>
			</motion.div>

			{/* Soft noir vignette to blend edges seamlessly into page bg */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-[21]"
				style={{
					background:
						"radial-gradient(ellipse 68% 72% at 50% 34%, transparent 38%, rgba(9,9,9,0.82) 100%)",
				}}
			/>

			{/* Front blend layer — gives the face-through-letter silver optical sheen */}
			<NameLayer
				ready={ready}
				y={textY}
				opacity={contentOpacity}
				className="z-30"
				transition={revealTransition(0.15, 1.05)}
				blendFront
			/>

			{/* Bottom editorial metadata row */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
				transition={revealTransition(0.5, 0.8)}
				className="relative z-40 flex w-full flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6"
			>
				<div className="flex flex-col gap-1.5">
					<ul className="flex items-center gap-4" aria-label="Social links">
						{SOCIAL_LINKS.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={
										link.external
											? "noopener noreferrer"
											: undefined
									}
									className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/75 transition-colors duration-200 hover:text-accent sm:text-[11px]"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>

				<p
					className="self-end text-right font-sans text-[clamp(1.25rem,2.6vw,2.55rem)] leading-[1.06] tracking-[-0.025em] text-cream/95"
					style={{ fontWeight: 420, fontVariationSettings: "'wght' 420, 'wdth' 100" }}
				>
					Full-Stack Developer
					<br />
					Agentic Systems &amp; Motion
				</p>
			</motion.div>
		</section>
	);
}
