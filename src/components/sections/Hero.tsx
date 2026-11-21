"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
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

// Adjust the spacing between "EARL" and "ROMEO" here
const HERO_WORD_GAP = "clamp(5.25rem, 14.5vw, 2.75rem)";

interface SocialItem {
	label: string;
	href: string;
	external: boolean;
	icon: React.ReactNode;
}

const SOCIAL_ITEMS: SocialItem[] = [
	{
		label: "GitHub",
		href: "https://github.com/Swif7ify",
		external: true,
		icon: (
			<svg
				viewBox="0 0 24 24"
				className="h-3.5 w-3.5 fill-current"
				aria-hidden="true"
			>
				<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
			</svg>
		),
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/earl-romeo-ordovez-a73a36322",
		external: true,
		icon: (
			<svg
				viewBox="0 0 24 24"
				className="h-3.5 w-3.5 fill-current"
				aria-hidden="true"
			>
				<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
			</svg>
		),
	},
	{
		label: "Email",
		href: "mailto:earl.coding@gmail.com",
		external: false,
		icon: (
			<svg
				viewBox="0 0 24 24"
				className="h-3.5 w-3.5 fill-current"
				aria-hidden="true"
			>
				<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
			</svg>
		),
	},
];

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

		textY.set(p * 44);
		portraitY.set(p * 18);
		contentOpacity.set(1 - clamp(p / 0.92));
	}, inView);

	const revealTransition = (delay: number, duration = 0.9) =>
		reducedMotion ? { duration: 0.01 } : { duration, delay, ease: EASE };

	const displayTypeStyle: React.CSSProperties = {
		fontWeight: 740,
		fontStretch: "28%",
		fontVariationSettings: "'wght' 740, 'wdth' 28, 'opsz' 144",
		textShadow: "0 0 26px rgba(235, 233, 228, 0.14)",
	};

	return (
		<section
			id="hero"
			ref={ref}
			className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#050505] px-6 pb-8 pt-24 sm:px-10 md:pb-12 lg:px-14"
			aria-label="Introduction"
		>
			{/* Pure noir studio vignette + subtle hair-rim separation behind head */}
			<div
				className="pointer-events-none absolute inset-0 z-0"
				style={{
					background:
						"radial-gradient(ellipse 52% 48% at 50% 38%, rgba(44, 43, 40, 0.42) 0%, rgba(10, 10, 10, 0.9) 55%, rgb(5, 5, 5) 100%)",
				}}
				aria-hidden="true"
			/>

			<h1 className="sr-only">
				Earl Romeo Ordovez — Agentic &amp; Full-Stack Developer — OneDev
			</h1>

			{/* LAYER 1 (z-10): Centered EARL + ROMEO display type behind portrait */}
			{/* <motion.div
				style={{ y: textY, opacity: contentOpacity }}
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-[40%] z-10 -translate-y-1/2 select-none px-4 sm:top-[41%] sm:px-8 md:top-[42%] lg:px-12 will-change-transform"
			>
				<div
					className="mx-auto flex w-fit items-center justify-center"
					style={{ gap: HERO_WORD_GAP }}
				>
					<div className="-mx-4 -my-8 overflow-hidden px-4 py-8">
						<motion.span
							initial={{ y: "105%", opacity: 0 }}
							animate={
								ready
									? { y: "0%", opacity: 1 }
									: { y: "105%", opacity: 0 }
							}
							transition={revealTransition(0.16, 0.95)}
							className="block whitespace-nowrap font-display text-[clamp(3.9rem,18.4vw,19.2rem)] uppercase leading-[0.82] tracking-[0.005em] text-cream"
							style={displayTypeStyle}
						>
							EARL
						</motion.span>
					</div>

					<div className="-mx-4 -my-8 overflow-hidden px-4 py-8">
						<motion.span
							initial={{ y: "105%", opacity: 0 }}
							animate={
								ready
									? { y: "0%", opacity: 1 }
									: { y: "105%", opacity: 0 }
							}
							transition={revealTransition(0.24, 0.95)}
							className="block whitespace-nowrap font-display text-[clamp(3.9rem,18.4vw,19.2rem)] uppercase leading-[0.82] tracking-[0.005em] text-cream"
							style={displayTypeStyle}
						>
							ROMEO
						</motion.span>
					</div>
				</div>
			</motion.div> */}

			{/* LAYER 2 (z-20): Dead-center Cutout Portrait */}
			<motion.div
				style={{ y: portraitY, opacity: contentOpacity }}
				initial={{ opacity: 0, y: 24, scale: 0.98 }}
				animate={
					ready
						? { opacity: 1, y: 0, scale: 1 }
						: { opacity: 0, y: 24, scale: 0.98 }
				}
				transition={revealTransition(0.26, 1.05)}
				className="pointer-events-none absolute inset-x-0 top-[10svh] z-20 mx-auto h-[98svh] w-[96vw] max-w-[700px] sm:top-[6svh] sm:h-[108svh] md:top-[4svh] md:h-[112svh] will-change-transform"
			>
				<div
					className="relative h-full w-full"
					style={{
						WebkitMaskImage:
							"linear-gradient(to top, transparent 5%, rgba(0,0,0,0.45) 18%, black 36%, black 100%)",
						maskImage:
							"linear-gradient(to top, transparent 5%, rgba(0,0,0,0.45) 18%, black 36%, black 100%)",
					}}
				>
					<Image
						src={getImagePath("/earl-portrait-cutout.png")}
						alt="Earl Romeo Ordovez — Agentic & Full-Stack Developer"
						fill
						priority
						sizes="(max-width: 768px) 96vw, 700px"
						className="object-contain object-top"
					/>
				</div>
			</motion.div>

			{/* Smooth noir bottom transition into page bg (#0a0a0a) */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-44 bg-gradient-to-t from-bg via-[#050505]/85 to-transparent"
				aria-hidden="true"
			/>

			{/* LAYER 4 (z-30): Mobile Caption + Bottom Social Icons & Domain Link */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
				transition={revealTransition(0.52, 0.75)}
				className="relative z-30 mx-auto flex w-full max-w-[1440px] flex-col gap-5"
			>
				{/* Bottom corners row */}
				<div className="flex items-center justify-between gap-4">
					<div
						className="flex items-center gap-2.5"
						aria-label="Social links"
					>
						{SOCIAL_ITEMS.map((item) => (
							<a
								key={item.label}
								href={item.href}
								target={item.external ? "_blank" : undefined}
								rel={
									item.external
										? "noopener noreferrer"
										: undefined
								}
								aria-label={item.label}
								className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-[#050505] transition-colors duration-200 hover:bg-accent hover:text-cream"
							>
								{item.icon}
							</a>
						))}
					</div>

					<a
						href="#work"
						className="font-sans text-xs font-medium tracking-[0.04em] text-cream/85 transition-colors duration-200 hover:text-accent sm:text-sm"
					>
						Agentic &amp; Full-Stack Developer
					</a>
				</div>
			</motion.div>
		</section>
	);
}
