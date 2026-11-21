"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ ready }: HeroProps) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, "200px");
	const heroMetrics = useElementMetrics(ref);
	const lastPRef = useRef<number>(-1);

	const portraitY = useMotionValue(0);
	const contentY = useMotionValue(0);
	const opacity = useMotionValue(1);

	useAnimationFrame(() => {
		if (typeof window === "undefined") return;
		const h = Math.max(1, heroMetrics.current.height);
		const p = clamp(window.scrollY / h);
		if (Math.abs(p - lastPRef.current) < 0.0002) return;
		lastPRef.current = p;

		portraitY.set(p * 70);
		contentY.set(p * 40);
		opacity.set(1 - clamp(p / 0.85));
	}, inView);

	return (
		<section
			id="hero"
			ref={ref}
			className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#000000] px-6 pb-10 pt-28 sm:px-10 md:pb-14 lg:px-14"
			aria-label="Introduction"
		>
			{/* Ambient Cobalt/Electric Blue Spotlight Glows centered behind head */}
			<motion.div
				initial={{ opacity: 0, scale: 0.85 }}
				animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
				transition={{ duration: 1.4, ease: EASE }}
				className="pointer-events-none absolute left-1/2 top-[40%] h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[900px] sm:w-[900px] md:h-[1050px] md:w-[1050px]"
				style={{
					background:
						"radial-gradient(ellipse 70% 55% at 50% 48%, rgba(18, 98, 255, 0.58) 0%, rgba(10, 60, 200, 0.34) 36%, rgba(2, 14, 70, 0.08) 62%, transparent 80%)",
					filter: "blur(80px)",
				}}
				aria-hidden="true"
			/>

			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
				transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
				className="pointer-events-none absolute left-1/2 top-[36%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[480px] sm:w-[480px] md:h-[580px] md:w-[580px]"
				style={{
					background:
						"radial-gradient(circle, rgba(35, 130, 255, 0.78) 0%, rgba(16, 85, 240, 0.45) 42%, transparent 74%)",
					filter: "blur(48px)",
				}}
				aria-hidden="true"
			/>

			{/* Center Stage: Earl's Portrait — Close-Up Framing with Shoulders & Collar */}
			<motion.div
				style={{ y: portraitY }}
				initial={{ opacity: 0, y: 30, scale: 0.97 }}
				animate={
					ready
						? { opacity: 1, y: 0, scale: 1 }
						: { opacity: 0, y: 30, scale: 0.97 }
				}
				transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
				className="pointer-events-none absolute left-1/2 top-0 z-[2] flex h-screen w-[92vw] max-w-[800px] -translate-x-1/2 items-start justify-center sm:w-[78vw] md:w-[58vw] lg:w-[52vw]"
			>
				<div
					className="relative h-full w-full overflow-hidden"
					style={{
						WebkitMaskImage:
							"linear-gradient(to top, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.75) 24%, black 38%, black 100%)",
						maskImage:
							"linear-gradient(to top, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.75) 24%, black 38%, black 100%)",
					}}
				>
					<Image
						src={getImagePath("/earl-portrait-cutout.png")}
						alt="Earl Romeo Ordovez — Agentic Developer"
						fill
						priority
						sizes="(max-width: 768px) 92vw, 52vw"
						className="scale-[1.42] object-cover object-top origin-[center_18%]"
					/>
				</div>
			</motion.div>

			{/* Vignette fade at bottom to guarantee seamless blend with page flow */}
			<div
				className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-28 bg-gradient-to-t from-[#000000] via-[#000000]/85 to-transparent"
				aria-hidden="true"
			/>

			{/* Bottom Content Grid */}
			<motion.div
				style={{ y: contentY, opacity }}
				className="relative z-10 flex w-full flex-col justify-between gap-8 md:flex-row md:items-end md:gap-12"
			>
				{/* Left Block: Greeting, Huge Name & Title, Status Badge */}
				<div className="flex max-w-2xl flex-col">
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
						className="font-serif text-2xl italic tracking-tight text-[#edeae1] sm:text-3xl md:text-4xl"
					>
						Hi, I&apos;m
					</motion.span>

					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
						transition={{ duration: 0.85, delay: 0.55, ease: EASE }}
						className="mt-1 font-display font-black uppercase leading-[0.92] tracking-[-0.04em] text-white"
					>
						<span className="block text-[clamp(2.8rem,6.4vw,6.4rem)]">
							EARL,
						</span>
						<span className="block pl-6 text-[clamp(2rem,4.4vw,4.4rem)] text-white sm:pl-10 md:pl-14">
							AGENTIC DEVELOPER
						</span>
					</motion.h1>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
						transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
						className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-3.5"
					>
						<span className="font-serif text-xl italic text-[#cdc9b7] sm:text-2xl md:text-[26px]">
							Working at
						</span>
						<span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 font-sans text-xs font-bold tracking-tight text-black shadow-[0_4px_16px_rgba(255,255,255,0.18)] transition-transform duration-300 hover:scale-105 sm:text-sm">
							OneDev
						</span>
					</motion.div>
				</div>

				{/* Right Block: Editorial Bio Paragraph */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
					className="max-w-md pb-1 text-xs leading-relaxed text-[#8f9ea9] sm:text-sm md:text-[15px]"
				>
					<p>
						Logic showed me how things work; design showed me why
						they matter. Building scalable systems and intuitive
						digital experiences that balance clarity, function, and
						emotion.
					</p>
				</motion.div>
			</motion.div>
		</section>
	);
}
