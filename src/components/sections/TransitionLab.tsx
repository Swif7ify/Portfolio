"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRight } from "lucide-react";
import { certificates } from "@/src/data/certificates";
import type { Certificate } from "@/src/data/certificates";
import { ChapterHeader } from "@/src/components/ChapterHeader";
import { PixelCurtain } from "@/src/components/transitions/PixelCurtain";
import { getImagePath } from "@/src/utils/image";

const EASE = [0.23, 1, 0.32, 1] as const;

function hasCredentialUrl(
	cert: Certificate,
): cert is Certificate & { credentialUrl: string } {
	return Boolean(
		cert.credentialUrl &&
		cert.credentialUrl.trim() !== "" &&
		cert.credentialUrl !== "#",
	);
}

/** Single-row swipeable certificates showcase with pixelated curtain view transitions. */
export function TransitionLab() {
	const [openId, setOpenId] = useState<string | null>(null);
	const [pixel, setPixel] = useState<"off" | "in" | "out">("off");
	const [busy, setBusy] = useState<boolean>(false);
	const [canPrev, setCanPrev] = useState<boolean>(false);
	const [canNext, setCanNext] = useState<boolean>(true);

	const trackRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef({
		active: false,
		pointerId: -1,
		startX: 0,
		startScroll: 0,
		moved: false,
	});
	const timers = useRef<number[]>([]);

	const later = useCallback((ms: number, fn: () => void) => {
		timers.current.push(window.setTimeout(fn, ms));
	}, []);

	useEffect(
		() => () => timers.current.forEach((t) => window.clearTimeout(t)),
		[],
	);

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

	const slideBy = (dir: -1 | 1) => {
		const el = trackRef.current;
		if (!el) return;
		const step = Math.max(260, el.clientWidth * 0.52);
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
	};

	const onTrackClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
		if (dragRef.current.moved) {
			e.preventDefault();
			e.stopPropagation();
			dragRef.current.moved = false;
		}
	};

	const runPixel = useCallback(
		(swap: () => void) => {
			setBusy(true);
			setPixel("in");
			later(440, () => {
				swap();
				setPixel("out");
			});
			later(900, () => {
				setPixel("off");
				setBusy(false);
			});
		},
		[later],
	);

	const open = (id: string) => {
		if (busy || dragRef.current.moved) {
			dragRef.current.moved = false;
			return;
		}
		runPixel(() => setOpenId(id));
	};

	const close = useCallback(() => {
		if (busy) return;
		runPixel(() => setOpenId(null));
	}, [busy, runPixel]);

	useEffect(() => {
		if (!openId) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [openId, close]);

	const activeCert = certificates.find((c) => c.id === openId) ?? null;

	return (
		<section
			id="certificates"
			aria-labelledby="certificates-title"
			className="relative bg-bg px-4 py-32 md:px-6 md:py-40"
		>
			<div className="mx-auto max-w-[1440px]">
				<ChapterHeader
					id="certificates-title"
					number="18"
					kicker="Verified Credentials & Honors"
					title={
						<>
							Certificates
							<br />
							<span className="text-muted">
								&amp; Credentials.
							</span>
						</>
					}
					description="Swipe through verified technical certifications, engineering foundations, and hackathon honors. Click any card to inspect the full credential."
				/>

				<div className="relative mt-12 h-[78vh] min-h-[520px] overflow-hidden ">
					<div className="flex h-full flex-col p-4 md:p-6">
						<div className="flex items-center justify-between gap-4">
							<p
								className="text-lg font-display"
								style={{
									fontVariationSettings:
										"'wght' 700, 'wdth' 85",
								}}
							>
							
							</p>

							<div className="flex items-center gap-3">
								<div className="flex items-center gap-1.5">
									<button
										type="button"
										onClick={() => slideBy(-1)}
										disabled={!canPrev}
										aria-label="Slide certificates left"
										className="flex h-8 w-8 items-center justify-center rounded-full border border-hair text-fg transition-colors hover:border-fg disabled:opacity-30 disabled:hover:border-hair"
									>
										<ArrowLeftIcon
											className="h-3.5 w-3.5"
											aria-hidden
										/>
									</button>
									<button
										type="button"
										onClick={() => slideBy(1)}
										disabled={!canNext}
										aria-label="Slide certificates right"
										className="flex h-8 w-8 items-center justify-center rounded-full border border-hair text-fg transition-colors hover:border-fg disabled:opacity-30 disabled:hover:border-hair"
									>
										<ArrowRightIcon
											className="h-3.5 w-3.5"
											aria-hidden
										/>
									</button>
								</div>
							</div>
						</div>

						<div
							ref={trackRef}
							onScroll={syncBounds}
							onPointerDown={onPointerDown}
							onPointerMove={onPointerMove}
							onPointerUp={endDrag}
							onPointerCancel={endDrag}
							onClickCapture={onTrackClickCapture}
							className="mt-4 flex min-h-0 flex-1 gap-3 overflow-x-auto select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-4"
						>
							{certificates.map((cert) => (
								<button
									key={cert.id}
									type="button"
									onClick={() => open(cert.id)}
									className="group flex h-full w-[78%] shrink-0 flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-[46%] lg:w-[calc((100%-3rem)/4)]"
									aria-label={`View certificate: ${cert.title} by ${cert.issuer}`}
								>
									<div className="relative h-full w-full overflow-hidden rounded-xl">
										<Image
											src={getImagePath(cert.image)}
											alt={`${cert.title} — ${cert.issuer}`}
											fill
											draggable={false}
											sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 25vw"
											className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
										/>
										<div
											aria-hidden="true"
											className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-300 group-hover:from-black/95"
										/>
										<div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4 md:p-5">
											<span className="font-mono text-[10px] uppercase tracking-[0.16em] tabular-nums text-white/75">
												{cert.year}
											</span>
											<span className="line-clamp-2 font-sans text-sm font-medium leading-snug text-white md:text-base">
												{cert.title}
											</span>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					<AnimatePresence>
						{activeCert && (
							<motion.div
								key={activeCert.id}
								className="absolute inset-0 z-20 bg-surface"
								initial={false}
								animate={{ opacity: 1 }}
								exit={{
									opacity: 0,
									transition: { duration: 0 },
								}}
							>
								<div className="absolute left-4 right-4 top-4 h-[45%] overflow-hidden rounded-xl bg-bg/50 md:bottom-6 md:left-6 md:right-auto md:top-6 md:h-auto md:w-[calc(50%-36px)]">
									<div className="relative h-full w-full">
										<Image
											src={getImagePath(activeCert.image)}
											alt={`Certificate: ${activeCert.title} issued by ${activeCert.issuer}`}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-contain p-2 md:p-4"
										/>
									</div>
								</div>

								<motion.div
									className="absolute bottom-4 left-4 right-4 top-[calc(45%+32px)] flex flex-col md:bottom-6 md:left-[calc(50%+12px)] md:right-6 md:top-6"
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.25,
										delay: 0.15,
										ease: EASE,
									}}
								>
									<button
										type="button"
										onClick={close}
										className="flex w-fit items-center gap-2 rounded-full border border-hair px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg transition-colors hover:border-fg"
									>
										<ArrowLeftIcon
											className="h-3.5 w-3.5"
											aria-hidden
										/>{" "}
										Back
									</button>

									<p className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
										{activeCert.issuer} · {activeCert.year}
									</p>
									<h3
										className="mt-3 text-balance text-[clamp(1.6rem,3.6vw,3.4rem)] leading-[0.96] tracking-[-0.03em]"
										style={{
											fontVariationSettings:
												"'wght' 800, 'wdth' 74",
										}}
									>
										{activeCert.title}
									</h3>

									{hasCredentialUrl(activeCert) && (
										<a
											href={activeCert.credentialUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-hair px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg transition-colors hover:border-accent hover:bg-accent hover:text-bg"
										>
											Verify Credential
											<ArrowUpRight
												className="h-3.5 w-3.5"
												aria-hidden
											/>
										</a>
									)}
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>

					{pixel !== "off" && <PixelCurtain phase={pixel} />}
				</div>
			</div>
		</section>
	);
}
