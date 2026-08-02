"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
	const [isFinePointer, setIsFinePointer] = useState<boolean>(false);
	const [hovering, setHovering] = useState<boolean>(false);
	const [label, setLabel] = useState<string | null>(null);

	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 });
	const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 });

	useEffect(() => {
		const mq = window.matchMedia("(pointer: fine)");

		if (mq.matches) {
			requestAnimationFrame(() => {
				setIsFinePointer(true);
			});
		}

		const onMediaChange = (e: MediaQueryListEvent) => {
			setIsFinePointer(e.matches);
		};
		mq.addEventListener("change", onMediaChange);

		if (!mq.matches) {
			return () => {
				mq.removeEventListener("change", onMediaChange);
			};
		}

		document.documentElement.classList.add("custom-cursor-active");

		const onMove = (e: MouseEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};
		const onOver = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest<HTMLElement>(
				"[data-cursor]",
			);
			if (target) {
				setHovering(true);
				setLabel(target.dataset.cursor || null);
			} else {
				setHovering(false);
				setLabel(null);
			}
		};

		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseover", onOver);
		return () => {
			document.documentElement.classList.remove("custom-cursor-active");
			mq.removeEventListener("change", onMediaChange);
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseover", onOver);
		};
	}, [x, y]);

	if (!isFinePointer) return null;

	const hasLabel = hovering && !!label;

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center"
			style={{
				x: springX,
				y: springY,
				translateX: "-50%",
				translateY: "-50%",
			}}
		>
			<motion.div
				className={`flex items-center justify-center rounded-full ${
					hasLabel ? "bg-accent" : "bg-cream mix-blend-difference"
				}`}
				animate={{
					width: hasLabel ? 88 : hovering ? 56 : 12,
					height: hasLabel ? 88 : hovering ? 56 : 12,
				}}
				transition={{ type: "spring", stiffness: 350, damping: 28 }}
			>
				{hasLabel && (
					<span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ink">
						{label}
					</span>
				)}
			</motion.div>
		</motion.div>
	);
}
