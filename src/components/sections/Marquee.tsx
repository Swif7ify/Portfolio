"use client";

import { useRef } from "react";
import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
	const range = max - min;
	return ((((v - min) % range) + range) % range) + min;
}

interface MarqueeProps {
	children: React.ReactNode;
	baseVelocity?: number;
	className?: string;
}

/** Infinite marquee whose speed and direction react to scroll velocity. */
export function Marquee({
	children,
	baseVelocity = 2,
	className,
}: MarqueeProps) {
	const baseX = useMotionValue(0);
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
		clamp: false,
	});
	const directionFactor = useRef(1);

	const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

	useAnimationFrame((_, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
		const vf = velocityFactor.get();
		if (vf < 0) directionFactor.current = -1;
		else if (vf > 0) directionFactor.current = 1;
		moveBy += moveBy * Math.abs(vf);
		baseX.set(baseX.get() + moveBy);
	});

	return (
		<div
			className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}
			aria-hidden="true"
		>
			<motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
				{[0, 1, 2, 3].map((i) => (
					<div key={i} className="flex shrink-0 items-center">
						{children}
					</div>
				))}
			</motion.div>
		</div>
	);
}
