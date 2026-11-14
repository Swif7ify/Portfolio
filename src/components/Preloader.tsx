"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
	onComplete: () => void;
}

const LINE_1 = "earl ordovez";
const LINE_2 = "creative developer";

// Parallelogram accent dot matching the exact geometric cut from the reference video
function AccentMark({ direction }: { direction: "left" | "right" }) {
	return (
		<svg
			width="10"
			height="6"
			viewBox="0 0 10 6"
			fill="currentColor"
			className="block text-[#f6f4e8]"
			aria-hidden="true"
		>
			<path d="M7 0H0L3 6H10L7 0Z" />
		</svg>
	);
}

export function Preloader({ onComplete }: PreloaderProps) {
	const [dotsActive, setDotsActive] = useState<boolean>(false);
	const [textActive, setTextActive] = useState<boolean>(false);

	const handleSkip = useCallback(() => {
		onComplete();
	}, [onComplete]);

	useEffect(() => {
		// Keyboard shortcut to skip intro immediately
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
				handleSkip();
			}
		};
		window.addEventListener("keydown", onKeyDown);

		// Sequence timing matching reference video
		// 1. Initial dark delay -> dots glide together
		const dotsTimer = setTimeout(() => {
			setDotsActive(true);
		}, 350);

		// 2. Letters slice up in staggered cascade
		const textTimer = setTimeout(() => {
			setTextActive(true);
		}, 650);

		// 3. Complete hold & trigger site entrance
		const exitTimer = setTimeout(() => {
			onComplete();
		}, 2600);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			clearTimeout(dotsTimer);
			clearTimeout(textTimer);
			clearTimeout(exitTimer);
		};
	}, [onComplete, handleSkip]);

	let globalCharIndex = 0;

	return (
		<motion.div
			className="fixed inset-0 z-[300] flex items-center justify-center bg-[#141412] text-[#f6f4e8] select-none cursor-pointer"
			initial={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
			}}
			onClick={handleSkip}
			aria-label="Loading intro"
			role="status"
		>
			<div className="relative flex flex-col items-start px-6">
				{/* Line 1: earl ordovez */}
				<div className="relative flex items-baseline font-sans text-[clamp(1.75rem,5.5vw,2.75rem)] font-normal tracking-[-0.035em] leading-[1.08] lowercase text-[#f6f4e8]">
					{LINE_1.split("").map((char, i) => {
						const charIdx = globalCharIndex++;
						const isSpace = char === " ";

						if (isSpace) {
							return (
								<span key={i} className="inline-block w-[0.28em]">
									&nbsp;
								</span>
							);
						}

						const isLeftDotAnchor = i === 3; // 'l' in "earl"
						const isRightDotAnchor = i === LINE_1.length - 1; // 'z' in "ordovez"

						return (
							<span key={i} className="relative inline-block">
								<motion.span
									className="inline-block"
									initial={{
										y: 20,
										clipPath: "inset(100% 0% 0% 0%)",
										opacity: 0,
									}}
									animate={
										textActive
											? {
													y: 0,
													clipPath: "inset(0% 0% 0% 0%)",
													opacity: 1,
												}
											: {}
									}
									transition={{
										duration: 0.85,
										ease: [0.16, 1, 0.3, 1],
										delay: charIdx * 0.026,
									}}
								>
									{char}
								</motion.span>

								{/* Left accent dot anchored at the foot of 'l' */}
								{isLeftDotAnchor && (
									<motion.span
										className="absolute -bottom-[2px] right-0 pointer-events-none"
										initial={{ opacity: 0, x: 14 }}
										animate={dotsActive ? { opacity: 1, x: 0 } : {}}
										transition={{
											duration: 0.6,
											ease: [0.16, 1, 0.3, 1],
										}}
									>
										<AccentMark direction="left" />
									</motion.span>
								)}

								{/* Right accent dot anchored at the foot of 'z' */}
								{isRightDotAnchor && (
									<motion.span
										className="absolute -bottom-[2px] right-0 pointer-events-none"
										initial={{ opacity: 0, x: -14 }}
										animate={dotsActive ? { opacity: 1, x: 0 } : {}}
										transition={{
											duration: 0.6,
											ease: [0.16, 1, 0.3, 1],
										}}
									>
										<AccentMark direction="right" />
									</motion.span>
								)}
							</span>
						);
					})}
				</div>

				{/* Line 2: creative developer */}
				<div className="relative flex items-baseline font-sans text-[clamp(1.75rem,5.5vw,2.75rem)] font-normal tracking-[-0.035em] leading-[1.08] lowercase text-[#f6f4e8] mt-0.5">
					{LINE_2.split("").map((char, i) => {
						const charIdx = globalCharIndex++;
						const isSpace = char === " ";

						if (isSpace) {
							return (
								<span key={i} className="inline-block w-[0.28em]">
									&nbsp;
								</span>
							);
						}

						return (
							<span key={i} className="relative inline-block">
								<motion.span
									className="inline-block"
									initial={{
										y: 20,
										clipPath: "inset(100% 0% 0% 0%)",
										opacity: 0,
									}}
									animate={
										textActive
											? {
													y: 0,
													clipPath: "inset(0% 0% 0% 0%)",
													opacity: 1,
												}
											: {}
									}
									transition={{
										duration: 0.85,
										ease: [0.16, 1, 0.3, 1],
										delay: charIdx * 0.026,
									}}
								>
									{char}
								</motion.span>
							</span>
						);
					})}
				</div>
			</div>
		</motion.div>
	);
}
