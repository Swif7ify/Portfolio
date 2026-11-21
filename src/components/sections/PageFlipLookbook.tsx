"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { lookbookPages, type LookbookPage } from "@/src/data/portfolio";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import {
	calcSectionProgress,
	useElementMetrics,
} from "@/src/hooks/useElementMetrics";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";

const LEAVES = Math.floor(lookbookPages.length / 2);
const easeInOut = (t: number) =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

interface PageProps {
	page: LookbookPage;
	n: number;
	side: "left" | "right";
}

function Page({ page, n, side }: PageProps) {
	const pageNumber = String(n).padStart(2, "0");

	if (page.kind === "index") {
		return (
			<div className="flex h-full flex-col bg-[#f3efe6] p-[8%] text-[#161512]">
				<div className="flex items-center justify-between border-b border-black/15 pb-[4%]">
					<span className="font-mono text-[clamp(0.45rem,0.72vw,0.62rem)] uppercase tracking-[0.16em] text-black/50">
						{page.chapter}
					</span>
					<span className="font-mono text-[clamp(0.45rem,0.72vw,0.62rem)] uppercase tracking-[0.14em] text-[#d94814]">
						Index
					</span>
				</div>

				<p
					className="mt-[6%] font-display text-[clamp(1rem,2.4vw,2rem)] leading-[0.92] tracking-[-0.02em]"
					style={{ fontVariationSettings: "'wght' 780, 'wdth' 76" }}
				>
					{page.title}
				</p>

				<ol className="my-auto flex flex-col divide-y divide-black/10 py-[4%]">
					{page.summaryItems.map((item) => (
						<li
							key={item.num}
							className="py-[4.5%] first:pt-0 last:pb-0"
						>
							<div className="flex items-baseline justify-between gap-2">
								<div className="flex items-baseline gap-2">
									<span className="font-mono text-[clamp(0.45rem,0.7vw,0.62rem)] font-medium text-[#d94814]">
										{item.num}
									</span>
									<span
										className="font-display text-[clamp(0.72rem,1.4vw,1.15rem)] leading-none"
										style={{
											fontVariationSettings:
												"'wght' 740, 'wdth' 80",
										}}
									>
										{item.project}
									</span>
								</div>
								<span className="font-mono text-[clamp(0.42rem,0.68vw,0.58rem)] uppercase tracking-[0.1em] text-black/45">
									{item.pages}
								</span>
							</div>
							<p className="mt-1 hidden text-[clamp(0.5rem,0.8vw,0.72rem)] leading-snug text-black/65 sm:block">
								{item.takeaway}
							</p>
						</li>
					))}
				</ol>

				<div className="mt-auto flex items-center justify-between border-t border-black/10 pt-[4%]">
					<span
						className={`font-mono text-[clamp(0.48rem,0.75vw,0.62rem)] text-black/50 ${side === "left" ? "order-first" : "order-last"}`}
					>
						{pageNumber}
					</span>
					<span className="font-mono text-[clamp(0.45rem,0.72vw,0.62rem)] uppercase tracking-[0.12em] text-black/45">
						{page.caption}
					</span>
				</div>
			</div>
		);
	}

	const isContain = page.imageFit === "contain";

	return (
		<div className="flex h-full flex-col bg-[#f3efe6] p-[7%] text-[#161512]">
			<div className="mb-[4%] flex items-center justify-between">
				<span className="font-mono text-[clamp(0.45rem,0.72vw,0.62rem)] uppercase tracking-[0.15em] text-[#d94814]">
					{page.chapter}
				</span>
				<span className="font-mono text-[clamp(0.45rem,0.7vw,0.6rem)] uppercase tracking-[0.12em] text-black/40">
					{page.frameLabel}
				</span>
			</div>

			<div
				className={`relative aspect-[4/3] w-full overflow-hidden rounded-sm ${
					isContain ? "bg-[#161512]" : "bg-[#e5dfd3]"
				}`}
			>
				<Image
					src={getImagePath(page.image)}
					alt={`${page.chapter} — ${page.title}`}
					fill
					sizes="480px"
					className={
						isContain
							? "object-contain p-1.5"
							: "object-cover object-center"
					}
				/>
			</div>

			<div className="mt-[5%] flex flex-1 flex-col">
				<p
					className="font-display text-[clamp(0.9rem,2vw,1.7rem)] leading-none tracking-[-0.02em]"
					style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}
				>
					{page.title}
				</p>
				<p className="mt-1.5 hidden text-[clamp(0.5rem,0.82vw,0.74rem)] leading-snug text-black/65 sm:block">
					{page.note}
				</p>

				<div className="mt-auto flex items-center justify-between border-t border-black/10 pt-[4%]">
					<p className="font-mono text-[clamp(0.45rem,0.72vw,0.62rem)] uppercase tracking-[0.12em] text-black/50">
						{page.caption}
					</p>
					<span
						className={`font-mono text-[clamp(0.48rem,0.75vw,0.62rem)] text-black/50 ${
							side === "left" ? "order-first mr-auto" : "ml-auto"
						}`}
					>
						{pageNumber}
					</span>
				</div>
			</div>
		</div>
	);
}

/** A printed lookbook whose pages turn in 3D as you scroll — each leaf has a front and a back. */
export function PageFlipLookbook() {
	const sectionRef = useRef<HTMLElement>(null);
	const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
	const shadeFront = useRef<(HTMLSpanElement | null)[]>([]);
	const shadeBack = useRef<(HTMLSpanElement | null)[]>([]);
	const lastFRef = useRef<number>(-1);
	const inView = useInView(sectionRef, "200px");
	const sectionMetrics = useElementMetrics(sectionRef);

	useAnimationFrame(() => {
		if (typeof window === "undefined") return;
		const p = calcSectionProgress(sectionMetrics.current, window.scrollY);
		const f = clamp((p - 0.06) / 0.86) * LEAVES;
		if (Math.abs(f - lastFRef.current) < 0.0002) return;
		lastFRef.current = f;

		leafRefs.current.forEach((leaf, i) => {
			if (!leaf) return;
			const e = easeInOut(clamp(f - i));
			leaf.style.transform = `rotateY(${(-180 * e).toFixed(2)}deg)`;
			leaf.style.zIndex = String(e < 0.5 ? 20 - i : 20 + i);
			const sf = shadeFront.current[i];
			const sb = shadeBack.current[i];
			if (sf)
				sf.style.opacity = (Math.sin(e * Math.PI) * 0.45).toFixed(3);
			if (sb)
				sb.style.opacity = (Math.sin(e * Math.PI) * 0.35).toFixed(3);
		});
	}, inView);

	return (
		<section
			ref={sectionRef}
			id="lookbook"
			aria-labelledby="lookbook-title"
			className="relative h-[600vh] bg-bg"
		>
			<div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24">
				<div className="mb-6 text-center">
					<h2
						id="lookbook-title"
						className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-[0.92] tracking-[-0.03em]"
						style={{
							fontVariationSettings: "'wght' 760, 'wdth' 78",
						}}
					>
						Turning points, turned by scroll.
					</h2>
				</div>
				<div
					className="relative aspect-[2/1.35] w-[min(94vw,1000px,calc((100vh_-_14rem)*1.48))]"
					style={{ perspective: "2400px" }}
				>
					{/* Left cover */}
					<div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-md bg-[#efeadf] shadow-2xl">
						<div className="flex h-full flex-col justify-between p-[9%] text-[#161512]">
							<p className="font-mono text-[clamp(0.5rem,0.8vw,0.7rem)] uppercase tracking-[0.18em] text-black/50">
								Earl Ordovez
							</p>
							<p
								className="font-display text-[clamp(1.5rem,4.2vw,3.75rem)] leading-[0.88] tracking-[-0.03em]"
								style={{
									fontVariationSettings:
										"'wght' 820, 'wdth' 68",
								}}
							>
								Turning
								<br />
								Points
							</p>
							<p className="text-[clamp(0.55rem,0.9vw,0.8rem)] text-black/60">
								Hydrobot, DevPad PCB, and Project METRO. Three
								builds that shaped my craft.
							</p>
						</div>
					</div>

					{/* Right cover */}
					<div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-md bg-[#efeadf] shadow-2xl">
						<div className="flex h-full flex-col items-center justify-center p-[9%] text-center text-[#161512]">
							<p
								className="font-display text-[clamp(1.25rem,3vw,2.75rem)] leading-[0.9]"
								style={{
									fontVariationSettings:
										"'wght' 780, 'wdth' 72",
								}}
							>
								The Story Continues.
							</p>
							<p className="mt-3 text-[clamp(0.55rem,0.9vw,0.8rem)] text-black/60">
								Next chapter currently being written.
							</p>
						</div>
					</div>

					{/* Flipping leaves */}
					{Array.from({ length: LEAVES }).map((_, i) => (
						<div
							key={i}
							ref={(el) => {
								leafRefs.current[i] = el;
							}}
							className="absolute inset-y-0 left-1/2 w-1/2 will-change-transform"
							style={{
								transformOrigin: "left center",
								transformStyle: "preserve-3d",
								zIndex: 20 - i,
							}}
						>
							<div className="absolute inset-0 overflow-hidden rounded-r-md [backface-visibility:hidden]">
								<Page
									page={lookbookPages[i * 2]}
									n={i * 2 + 1}
									side="right"
								/>
								<span
									ref={(el) => {
										shadeFront.current[i] = el;
									}}
									className="pointer-events-none absolute inset-0 bg-black opacity-0"
								/>
							</div>
							<div
								className="absolute inset-0 overflow-hidden rounded-l-md [backface-visibility:hidden]"
								style={{ transform: "rotateY(180deg)" }}
							>
								<Page
									page={lookbookPages[i * 2 + 1]}
									n={i * 2 + 2}
									side="left"
								/>
								<span
									ref={(el) => {
										shadeBack.current[i] = el;
									}}
									className="pointer-events-none absolute inset-0 bg-black opacity-0"
								/>
							</div>
						</div>
					))}
					<span
						aria-hidden
						className="pointer-events-none absolute inset-y-0 left-1/2 z-50 w-px bg-black/20"
					/>
				</div>
			</div>
		</section>
	);
}
