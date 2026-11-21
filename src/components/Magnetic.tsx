"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
	children: React.ReactNode;
	strength?: number;
	className?: string;
}

export function Magnetic({
	children,
	strength = 0.35,
	className,
}: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);
	const rectRef = useRef<{ cx: number; cy: number }>({ cx: 0, cy: 0 });
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
	const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

	const handleMouseEnter = () => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		rectRef.current = {
			cx: rect.left + rect.width / 2,
			cy: rect.top + rect.height / 2,
		};
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { cx, cy } = rectRef.current;
		x.set((e.clientX - cx) * strength);
		y.set((e.clientY - cy) * strength);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			className={className}
			style={{ x: springX, y: springY, display: "inline-block" }}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</motion.div>
	);
}
