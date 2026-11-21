"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useKinetic } from "@/src/contexts/KineticContext";
import { memoryFrames } from "@/src/data/memories";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import {
	calcSectionProgress,
	useElementMetrics,
} from "@/src/hooks/useElementMetrics";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";

const PERSPECTIVE = 920;
const COUNT = memoryFrames.length;
const FLIGHT_END = 0.86;
const WINDOW_SIZE = 0.15;
const STEP = COUNT > 1 ? (FLIGHT_END - WINDOW_SIZE) / (COUNT - 1) : 1;

/** 3D Z-axis memory flight: 15 photo frames fly past "The Memories" one by one, settling on a closing beat. */
export function DepthTunnel() {
	const { reducedMotion } = useKinetic();
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const finaleRef = useRef<HTMLDivElement>(null);
	const counterRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const lastPRef = useRef<number>(-1);
	const activeIdxRef = useRef<number>(0);
	const inView = useInView(sectionRef, "200px");
	const sectionMetrics = useElementMetrics(sectionRef);

	useAnimationFrame(() => {
		if (typeof window === "undefined") return;
		const p = reducedMotion
			? 0.95
			: calcSectionProgress(sectionMetrics.current, window.scrollY);
		if (Math.abs(p - lastPRef.current) < 0.0001) return;
		lastPRef.current = p;

		const titleEl = titleRef.current;
		if (titleEl) {
			const tz = -120 + clamp(p / FLIGHT_END) * 260;
			const titleOpacity =
				clamp((p + 0.08) / 0.12) * (1 - clamp((p - 0.77) / 0.08));
			titleEl.style.transform = `translate3d(0, 0, ${tz.toFixed(1)}px)`;
			titleEl.style.opacity = titleOpacity.toFixed(3);
			titleEl.style.visibility =
				titleOpacity <= 0.002 ? "hidden" : "visible";
		}

		// Closing beat emerges as the final memory clears and stays anchored until scroll exits
		const finaleEl = finaleRef.current;
		if (finaleEl) {
			const f = clamp((p - 0.83) / 0.1);
			const easedF = f * f * (3 - 2 * f);
			const fz = -180 + easedF * 180;
			finaleEl.style.transform = `translate3d(0, ${((1 - easedF) * 20).toFixed(1)}px, ${fz.toFixed(1)}px)`;
			finaleEl.style.opacity = easedF.toFixed(3);
			finaleEl.style.visibility = easedF <= 0.002 ? "hidden" : "visible";
		}

		const counterEl = counterRef.current;
		if (counterEl) {
			const cOp = 1 - clamp((p - 0.8) / 0.08);
			counterEl.style.opacity = cOp.toFixed(3);
		}

		let closestIdx = 0;
		let bestDist = Infinity;

		for (let i = 0; i < COUNT; i++) {
			const el = cardRefs.current[i];
			if (!el) continue;
			const frame = memoryFrames[i];
			const start = i * STEP;
			const local = (p - start) / WINDOW_SIZE;

			if (local <= 0 || local >= 1) {
				if (el.style.visibility !== "hidden") {
					el.style.opacity = "0";
					el.style.visibility = "hidden";
				}
				continue;
			}

			// Accelerate naturally as the frame approaches the camera lens
			const eased = Math.pow(local, 1.18);
			const z = -1450 + eased * 2280;
			const fadeIn = clamp(local / 0.22);
			const fadeOut = 1 - clamp((local - 0.78) / 0.22);
			const opacity = fadeIn * fadeOut;

			el.style.transform = `translate3d(-50%, -50%, ${z.toFixed(1)}px) rotate(${frame.rotate}deg)`;
			el.style.opacity = opacity.toFixed(3);
			el.style.visibility = opacity <= 0.002 ? "hidden" : "visible";

			const distFromPeak = Math.abs(local - 0.55);
			if (distFromPeak < bestDist) {
				bestDist = distFromPeak;
				closestIdx = i;
			}
		}

		if (closestIdx !== activeIdxRef.current) {
			activeIdxRef.current = closestIdx;
		}
	}, inView);

	return (
		<section
			ref={sectionRef}
			id="tunnel"
			aria-labelledby="tunnel-title"
			className="relative h-[720vh] bg-bg"
		>
			<div
				className="sticky top-0 h-screen overflow-hidden"
				style={{ perspective: `${PERSPECTIVE}px` }}
			>
				{/* Subtle depth vignette */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-0"
					style={{
						background:
							"radial-gradient(ellipse 65% 60% at 50% 50%, rgba(255, 77, 0, 0.04) 0%, transparent 62%)",
					}}
				/>

				{/* Centerpiece title */}
				<div
					ref={titleRef}
					className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center will-change-transform"
				>
					<h2
						id="tunnel-title"
						className="mt-3 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.035em] text-fg"
						style={{
							fontVariationSettings: "'wght' 820, 'wdth' 74",
						}}
					>
						The Memories
					</h2>
				</div>

				{/* 15 floating 3D memory frames flying past one by one */}
				{memoryFrames.map((frame, i) => (
					<div
						key={frame.id}
						ref={(el) => {
							cardRefs.current[i] = el;
						}}
						style={{
							left: `calc(50% + ${frame.x}vw)`,
							top: `calc(50% + ${frame.y}vh)`,
							opacity: 0,
							visibility: "hidden",
						}}
						className="pointer-events-none absolute z-20 w-[clamp(160px,24vw,330px)] will-change-[transform,opacity]"
					>
						<figure className="overflow-hidden rounded-2xl border border-hair bg-surface shadow-2xl">
							<div className={`relative w-full ${frame.aspect}`}>
								<Image
									src={getImagePath(frame.image)}
									alt={`${frame.label} (${frame.year})`}
									fill
									sizes="(max-width: 768px) 48vw, 330px"
									className="object-cover"
								/>
							</div>
						</figure>
					</div>
				))}

				{/* Closing anchor beat — stays visible at the end of the flight */}
				<div
					ref={finaleRef}
					style={{ opacity: 0, visibility: "hidden" }}
					className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center will-change-[transform,opacity]"
				>
					<p
						className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.5rem,6.5vw,5.75rem)] leading-[0.92] tracking-[-0.03em] text-fg"
						style={{
							fontVariationSettings: "'wght' 780, 'wdth' 76",
						}}
					>
						And this is only
						<br />
						<span className="text-muted">the beginning.</span>
					</p>
					<span
						aria-hidden="true"
						className="mt-8 block h-px w-16 bg-hair"
					/>
				</div>
			</div>
		</section>
	);
}
