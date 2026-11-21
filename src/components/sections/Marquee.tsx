"use client";

import { useRef } from "react";
import { useKinetic } from "@/src/contexts/KineticContext";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";

function wrap(min: number, max: number, v: number) {
	const range = max - min;
	return ((((v - min) % range) + range) % range) + min;
}

interface MarqueeProps {
	children: React.ReactNode;
	baseVelocity?: number;
	className?: string;
}

/** Infinite marquee whose speed and direction react to scroll velocity via the unified RAF ticker. */
export function Marquee({
	children,
	baseVelocity = 2,
	className,
}: MarqueeProps) {
	const { metrics } = useKinetic();
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const inView = useInView(containerRef, "200px");
	const baseXRef = useRef(0);
	const smoothVelRef = useRef(0);
	const directionFactor = useRef(1);

	useAnimationFrame((dt) => {
		const track = trackRef.current;
		if (!track) return;

		smoothVelRef.current += (metrics.current.velocity - smoothVelRef.current) * 0.12;
		const vf = smoothVelRef.current * 0.08;
		if (vf < -0.01) directionFactor.current = -1;
		else if (vf > 0.01) directionFactor.current = 1;

		let moveBy = directionFactor.current * baseVelocity * dt;
		moveBy += moveBy * Math.min(4, Math.abs(vf));
		baseXRef.current = wrap(-25, 0, baseXRef.current + moveBy);
		track.style.transform = `translate3d(${baseXRef.current.toFixed(3)}%, 0, 0)`;
	}, inView);

	return (
		<div
			ref={containerRef}
			className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}
			aria-hidden="true"
		>
			<div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
				{[0, 1, 2, 3].map((i) => (
					<div key={i} className="flex shrink-0 items-center">
						{children}
					</div>
				))}
			</div>
		</div>
	);
}
