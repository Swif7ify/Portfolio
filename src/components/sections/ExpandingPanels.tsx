"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRight, Globe } from "lucide-react";
import { projects } from "@/src/data/projects";
import { ChapterHeader } from "@/src/components/ChapterHeader";
import { getImagePath } from "@/src/utils/image";

function hasValidUrl(url?: string): url is string {
	return Boolean(url && url.trim() !== "" && url !== "#");
}

function GithubIcon() {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
}

/** Swipeable expanding panels showcasing all projects: select any spine to expand it while others stay collapsed. */
export function ExpandingPanels() {
	const [active, setActive] = useState<number>(0);
	const [canPrev, setCanPrev] = useState<boolean>(false);
	const [canNext, setCanNext] = useState<boolean>(true);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const trackRef = useRef<HTMLDivElement>(null);
	const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
	const dragRef = useRef({
		active: false,
		pointerId: -1,
		startX: 0,
		startScroll: 0,
		moved: false,
	});

	const syncBounds = useCallback(() => {
		const el = trackRef.current;
		if (!el) return;
		setCanPrev(el.scrollLeft > 4);
		setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
	}, []);

	useEffect(() => {
		syncBounds();
		window.addEventListener("resize", syncBounds, { passive: true });
		return () => window.removeEventListener("resize", syncBounds);
	}, [syncBounds]);

	const selectPanel = useCallback((index: number) => {
		setActive(index);
		const el = trackRef.current;
		if (!el) return;

		// Calculate the exact final resting scroll offset analytically to avoid mid-transition scrollIntoView jitter
		const vw = window.innerWidth;
		const collapsedW = vw >= 768 ? 84 : vw >= 640 ? 74 : 64;
		const expandedW =
			vw >= 768
				? Math.min(vw * 0.56, 780)
				: Math.min(vw * 0.86, 640);
		const gap = 8;

		const targetLeft = index * (collapsedW + gap);
		const centeredScroll = Math.max(
			0,
			targetLeft - (el.clientWidth - expandedW) / 2,
		);
		el.scrollTo({ left: centeredScroll, behavior: "smooth" });
	}, []);

	const slideBy = (dir: -1 | 1) => {
		const el = trackRef.current;
		if (!el) return;
		const step = Math.max(280, el.clientWidth * 0.55);
		el.scrollBy({ left: dir * step, behavior: "smooth" });
	};

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.pointerType !== "mouse" || e.button !== 0) return;
		const el = trackRef.current;
		if (!el) return;
		dragRef.current = {
			active: true,
			pointerId: e.pointerId,
			startX: e.clientX,
			startScroll: el.scrollLeft,
			moved: false,
		};
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		const d = dragRef.current;
		if (!d.active) return;
		const el = trackRef.current;
		if (!el) return;
		const dx = e.clientX - d.startX;
		if (!d.moved && Math.abs(dx) > 6) {
			d.moved = true;
			setIsDragging(true);
			if (!el.hasPointerCapture(d.pointerId)) {
				el.setPointerCapture(d.pointerId);
			}
		}
		if (d.moved) {
			el.scrollLeft = d.startScroll - dx;
		}
	};

	const endDrag = () => {
		const d = dragRef.current;
		const el = trackRef.current;
		if (d.active && el && d.pointerId >= 0 && el.hasPointerCapture(d.pointerId)) {
			el.releasePointerCapture(d.pointerId);
		}
		d.active = false;
		d.pointerId = -1;
		setIsDragging(false);
	};

	const onTrackClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
		if (dragRef.current.moved) {
			e.preventDefault();
			e.stopPropagation();
			dragRef.current.moved = false;
		}
	};

	return (
		<section
			id="work"
			aria-labelledby="panels-title"
			className="relative bg-bg px-4 py-32 md:px-6 md:py-40"
		>
			<div className="mx-auto max-w-[1440px]">
				<ChapterHeader
					id="panels-title"
					number="16"
					kicker="Selected Work & Engineering"
					title={
						<>
							What I build,
							<br />
							<span className="text-muted">
								one domain at a time.
							</span>
						</>
					}
					description="Swipe across all shipped projects—from agentic developer tools and full-stack platforms to robotics simulations, hardware, and open-source libraries."
				/>

				<div className="mt-12 flex items-center justify-between gap-4">
					<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted tabular-nums">
						{String(active + 1).padStart(2, "0")} /{" "}
						{String(projects.length).padStart(2, "0")} ·{" "}
						<span className="text-fg">
							{projects[active]?.category}
						</span>
					</p>

					<div className="flex items-center gap-1.5">
						<button
							type="button"
							onClick={() => slideBy(-1)}
							disabled={!canPrev}
							aria-label="Slide projects left"
							className="flex h-8 w-8 items-center justify-center rounded-full border border-hair text-fg transition-colors hover:border-fg disabled:opacity-30 disabled:hover:border-hair"
						>
							<ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden />
						</button>
						<button
							type="button"
							onClick={() => slideBy(1)}
							disabled={!canNext}
							aria-label="Slide projects right"
							className="flex h-8 w-8 items-center justify-center rounded-full border border-hair text-fg transition-colors hover:border-fg disabled:opacity-30 disabled:hover:border-hair"
						>
							<ArrowRightIcon className="h-3.5 w-3.5" aria-hidden />
						</button>
					</div>
				</div>

				<div
					ref={trackRef}
					role="tablist"
					aria-label="Projects"
					onScroll={syncBounds}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={endDrag}
					onPointerCancel={endDrag}
					onClickCapture={onTrackClickCapture}
					className={`mt-4 flex h-[74vh] min-h-[520px] flex-row gap-2 overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-[78vh] ${
						isDragging ? "cursor-grabbing" : "cursor-grab"
					}`}
					onKeyDown={(e) => {
						if (
							![
								"ArrowRight",
								"ArrowDown",
								"ArrowLeft",
								"ArrowUp",
							].includes(e.key)
						) {
							return;
						}
						e.preventDefault();
						const d =
							e.key === "ArrowRight" || e.key === "ArrowDown"
								? 1
								: -1;
						const next =
							(active + d + projects.length) % projects.length;
						selectPanel(next);
						panelRefs.current[next]?.focus();
					}}
				>
					{projects.map((project, i) => {
						const on = i === active;
						const liveUrl = hasValidUrl(project.liveUrl)
							? project.liveUrl
							: null;
						const repoUrl = hasValidUrl(project.repoUrl)
							? project.repoUrl
							: null;
						const displayTags = project.tags?.slice(0, 6) ?? [];

						return (
							<div
								key={project.id}
								ref={(el) => {
									panelRefs.current[i] = el;
								}}
								id={`project-panel-${i}`}
								role="tab"
								tabIndex={on ? 0 : -1}
								aria-selected={on}
								aria-label={project.title}
								onClick={() => {
									if (!on) selectPanel(i);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										selectPanel(i);
									}
								}}
								className={`relative h-full shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-surface transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [contain:layout_style_paint] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
									on
										? "w-[86vw] max-w-[640px] md:w-[56vw] md:max-w-[780px]"
										: "w-[64px] sm:w-[74px] md:w-[84px]"
								}`}
							>
								<div
									className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
										on ? "scale-100" : "scale-[1.12]"
									}`}
								>
									<Image
										src={getImagePath(project.image)}
										alt={`${project.title} — ${project.category}`}
										fill
										draggable={false}
										sizes="(max-width: 768px) 86vw, 780px"
										className="object-cover"
									/>
								</div>

								<div
									aria-hidden="true"
									className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
										on ? "opacity-35" : "opacity-65"
									}`}
								/>

								<div
									aria-hidden="true"
									className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-transparent transition-opacity duration-300 ${
										on ? "opacity-100" : "opacity-0"
									}`}
								/>

								<div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 font-mono text-[11px] tabular-nums text-white/75 md:left-5 md:top-5">
									<span>{String(i + 1).padStart(2, "0")}</span>
									<span
										className={`whitespace-nowrap uppercase tracking-[0.14em] text-white/60 transition-opacity duration-300 ${
											on
												? "opacity-100 delay-100"
												: "opacity-0"
										}`}
									>
										{project.category}
										{project.year ? ` · ${project.year}` : ""}
									</span>
								</div>

								<span
									aria-hidden={on}
									className={`pointer-events-none absolute bottom-6 left-1/2 max-h-[72%] -translate-x-1/2 rotate-180 truncate whitespace-nowrap font-display text-lg text-white transition-opacity duration-200 [writing-mode:vertical-rl] md:text-xl ${
										on
											? "opacity-0"
											: "opacity-100 delay-150"
									}`}
									style={{
										fontVariationSettings:
											"'wght' 650, 'wdth' 85",
									}}
								>
									{project.title}
								</span>

								<div
									aria-hidden={!on}
									className={`absolute inset-x-0 bottom-0 p-5 text-white transition-[opacity,transform] duration-300 ease-out md:p-8 ${
										on
											? "pointer-events-auto translate-y-0 opacity-100 delay-150"
											: "pointer-events-none translate-y-3 opacity-0"
									}`}
								>
									<h3
										className="text-balance font-display text-[clamp(1.65rem,3.4vw,3.4rem)] leading-[0.94] tracking-[-0.03em]"
										style={{
											fontVariationSettings:
												"'wght' 800, 'wdth' 74",
										}}
									>
										{project.title}
									</h3>
									<p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
										{project.description}
									</p>
									{displayTags.length > 0 && (
										<ul className="mt-4 flex flex-wrap gap-2">
											{displayTags.map((t) => (
												<li
													key={t}
													className="rounded-full border border-white/30 px-3 py-1 text-xs"
												>
													{t}
												</li>
											))}
										</ul>
									)}
									{(liveUrl || repoUrl) && (
										<div className="mt-5 flex flex-wrap items-center gap-2.5">
											{liveUrl && (
												<a
													href={liveUrl}
													target="_blank"
													rel="noopener noreferrer"
													tabIndex={on ? 0 : -1}
													onClick={(e) =>
														e.stopPropagation()
													}
													className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-colors hover:bg-accent hover:text-bg"
												>
													<Globe
														className="h-3.5 w-3.5"
														aria-hidden
													/>
													Live Demo
													<ArrowUpRight
														className="h-3.5 w-3.5"
														aria-hidden
													/>
												</a>
											)}
											{repoUrl && (
												<a
													href={repoUrl}
													target="_blank"
													rel="noopener noreferrer"
													tabIndex={on ? 0 : -1}
													onClick={(e) =>
														e.stopPropagation()
													}
													className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
												>
													<GithubIcon />
													Code
												</a>
											)}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
