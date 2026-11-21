"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface PreloaderProps {
	onComplete: () => void;
}

const LINE_1 = ["E", "a", "r", "l"];
const LINE_2 = ["O", "r", "d", "o", "v", "e", "z"];

export function Preloader({ onComplete }: PreloaderProps) {
	const brandRef = useRef<HTMLDivElement>(null);
	const onCompleteRef = useRef<() => void>(onComplete);

	useEffect(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);

	useEffect(() => {
		const brandEl = brandRef.current;
		if (!brandEl) return;

		const ctx = gsap.context(() => {
			const dot1 = brandEl.querySelector<HTMLElement>(".preloader-dot-1");
			const dot2 = brandEl.querySelector<HTMLElement>(".preloader-dot-2");
			const chars = brandEl.querySelectorAll<HTMLElement>(".preloader-char");

			// 1. Initial setup
			gsap.set(brandEl, { opacity: 1 });
			if (dot1 && dot2) {
				gsap.set([dot1, dot2], { opacity: 0 });
				gsap.set(dot1, { x: 14 });
				gsap.set(dot2, { x: -14 });
			}
			gsap.set(chars, { y: 24, clipPath: "inset(100% 0 0 0)" });

			// 2. Main timeline — let Framer Motion AnimatePresence handle the single exit fade
			const tl = gsap.timeline({
				onComplete: () => {
					onCompleteRef.current();
				},
			});

			// 3. Two parallelogram dots glide together from opposing sides
			if (dot1 && dot2) {
				tl.to([dot1, dot2], {
					opacity: 1,
					x: 0,
					duration: 0.6,
					ease: "power2.out",
					delay: 0.4,
				});
			}

			// 4. Staggered letter upward slice reveal
			tl.to(
				chars,
				{
					y: 0,
					clipPath: "inset(0% 0 0 0)",
					duration: 1.0,
					stagger: 0.03,
					ease: "power2.out",
				},
				"-=0.2"
			);

			// 5. Hold fully assembled before Framer Motion exit fades out smoothly
			tl.to({}, { duration: 0.45 });
		}, brandRef);

		return () => ctx.revert();
	}, []);

	return (
		<motion.div
			className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0a0a0a] text-[#f6f4e8] select-none cursor-default"
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
			}}
			aria-label="Loading portfolio"
			role="status"
		>
			<div
				ref={brandRef}
				className="relative w-auto max-w-[calc(100%-32px)] opacity-0 flex flex-col font-sans select-none tracking-[-0.04em] font-bold text-[48px] sm:text-[56px] md:text-[64px] leading-[0.92]"
			>
				{/* Line 1: Earl. */}
				<div className="flex items-baseline overflow-hidden pb-1">
					{LINE_1.map((char, i) => (
						<span
							key={`l1-${i}`}
							className="preloader-char inline-block will-change-transform"
						>
							{char}
						</span>
					))}
					<span
						className="preloader-dot-1 inline-block w-[9px] h-[7px] md:w-[11px] md:h-[8px] bg-[#f6f4e8] -skew-x-[20deg] ml-1.5 mb-1 will-change-transform"
						aria-hidden="true"
					/>
				</div>

				{/* Line 2: Ordovez. */}
				<div className="flex items-baseline overflow-hidden pb-1">
					{LINE_2.map((char, i) => (
						<span
							key={`l2-${i}`}
							className="preloader-char inline-block will-change-transform"
						>
							{char}
						</span>
					))}
					<span
						className="preloader-dot-2 inline-block w-[9px] h-[7px] md:w-[11px] md:h-[8px] bg-[#f6f4e8] -skew-x-[20deg] ml-1.5 mb-1 will-change-transform"
						aria-hidden="true"
					/>
				</div>
			</div>
		</motion.div>
	);
}
