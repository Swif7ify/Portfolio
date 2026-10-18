"use client";

import { useEffect, useRef } from "react";

interface FlowFieldBackgroundProps {
	/**
	 * Primary accent color in RGB format e.g. "255, 77, 0" or hex "#ff4d00".
	 * Defaults to Earl's electric blaze orange: "255, 77, 0".
	 */
	accent?: string;
	className?: string;
}

interface Particle {
	x: number;
	y: number;
	px: number;
	py: number;
	vx: number;
	vy: number;
	life: number;
	max: number;
	kind: "cream" | "muted" | "accent" | "amber";
}

function parseRgb(color: string): string {
	if (color.startsWith("#")) {
		const hex = color.replace("#", "");
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return `${r}, ${g}, ${b}`;
	}
	return color.replace(/\s+/g, ", ").replace(/,+/g, ",");
}

export function FlowFieldBackground({
	accent = "255, 77, 0",
	className = "",
}: FlowFieldBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const rgbAccent = parseRgb(accent);
		let w = 0;
		let h = 0;
		let raf = 0;
		let particles: Particle[] = [];
		const mouse = { x: -9999, y: -9999 };
		let lastScroll = window.scrollY;
		let boost = 0;
		let clock = 0;

		const createParticle = (): Particle => {
			const x = Math.random() * w;
			const y = Math.random() * h;
			const rand = Math.random();

			let kind: Particle["kind"] = "cream";
			if (rand < 0.11) {
				kind = "accent"; // electric blaze #ff4d00
			} else if (rand < 0.16) {
				kind = "amber"; // warm glowing amber/ember secondary highlight
			} else if (rand < 0.32) {
				kind = "muted"; // subtle graphite gray
			} else {
				kind = "cream"; // warm cream paper tone
			}

			return {
				x,
				y,
				px: x,
				py: y,
				vx: 0,
				vy: 0,
				life: 0,
				max: 160 + Math.random() * 320,
				kind,
			};
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// Deep ink canvas background
			ctx.fillStyle = "#0a0a0a";
			ctx.fillRect(0, 0, w, h);

			const count = Math.max(300, Math.min(1000, Math.floor((w * h) / 1600)));
			particles = Array.from({ length: count }, createParticle);
		};

		const step = (dt: number) => {
			clock += dt;
			const time = clock * 0.00008;
			const sy = window.scrollY;
			const ds = Math.abs(sy - lastScroll);
			lastScroll = sy;
			boost += (Math.min(ds * 0.08, 4) - boost) * 0.06;
			const scrollTwist = sy * 0.0007;

			// Fade previous frame lines into the ink background for ethereal stream trails
			ctx.fillStyle = "rgba(10, 10, 10, 0.085)";
			ctx.fillRect(0, 0, w, h);

			for (const p of particles) {
				p.px = p.x;
				p.py = p.y;

				const angle =
					(Math.sin(p.x * 0.0018 + time * 4) +
						Math.cos(p.y * 0.0022 - time * 3) +
						Math.sin((p.x - p.y) * 0.0009 + time * 2)) *
						Math.PI *
						0.75 +
					scrollTwist;

				p.vx += Math.cos(angle) * 0.12;
				p.vy += Math.sin(angle) * 0.12;

				// Cursor fluid interaction: deflection & vortex swirl
				const dx = p.x - mouse.x;
				const dy = p.y - mouse.y;
				const d2 = dx * dx + dy * dy;
				if (d2 < 32400) {
					// 180px radius interaction zone
					const d = Math.sqrt(d2) || 1;
					const f = (1 - d / 180) * 1.35;
					p.vx += (dx / d) * f - (dy / d) * f * 0.7;
					p.vy += (dy / d) * f + (dx / d) * f * 0.7;
				}

				p.vx *= 0.92;
				p.vy *= 0.92;
				const s = 1 + boost;
				p.x += p.vx * s;
				p.y += p.vy * s;
				p.life += 1;

				if (
					p.life > p.max ||
					p.x < -10 ||
					p.x > w + 10 ||
					p.y < -10 ||
					p.y > h + 10
				) {
					Object.assign(p, createParticle());
				}
			}

			// Group and batch paths by color for maximum rendering performance
			ctx.lineCap = "round";

			// 1. Muted graphite lines (pairs with --color-muted: #8a8880)
			ctx.lineWidth = 0.9;
			ctx.strokeStyle = "rgba(138, 136, 128, 0.12)";
			ctx.beginPath();
			for (const p of particles) {
				if (p.kind === "muted") {
					ctx.moveTo(p.px, p.py);
					ctx.lineTo(p.x, p.y);
				}
			}
			ctx.stroke();

			// 2. Cream stream lines (pairs with --color-cream: #ebe9e4)
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgba(235, 233, 228, 0.18)";
			ctx.beginPath();
			for (const p of particles) {
				if (p.kind === "cream") {
					ctx.moveTo(p.px, p.py);
					ctx.lineTo(p.x, p.y);
				}
			}
			ctx.stroke();

			// 3. Warm amber highlight lines (pairs and transitions toward accent)
			ctx.lineWidth = 1.25;
			ctx.strokeStyle = "rgba(255, 140, 50, 0.65)";
			ctx.beginPath();
			for (const p of particles) {
				if (p.kind === "amber") {
					ctx.moveTo(p.px, p.py);
					ctx.lineTo(p.x, p.y);
				}
			}
			ctx.stroke();

			// 4. Hot electric blaze accent lines (pairs with --color-accent: #ff4d00)
			ctx.lineWidth = 1.45;
			ctx.strokeStyle = `rgba(${rgbAccent}, 0.85)`;
			ctx.beginPath();
			for (const p of particles) {
				if (p.kind === "accent") {
					ctx.moveTo(p.px, p.py);
					ctx.lineTo(p.x, p.y);
				}
			}
			ctx.stroke();
		};

		let last = performance.now();
		const loop = (now: number) => {
			const dt = Math.min(now - last, 50);
			last = now;
			step(dt);
			raf = requestAnimationFrame(loop);
		};

		const onMove = (e: PointerEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
		const onLeave = () => {
			mouse.x = -9999;
			mouse.y = -9999;
		};
		const onVisibility = () => {
			if (document.hidden) {
				cancelAnimationFrame(raf);
			} else if (!reduce) {
				last = performance.now();
				raf = requestAnimationFrame(loop);
			}
		};

		resize();
		window.addEventListener("resize", resize);

		if (reduce) {
			for (let i = 0; i < 180; i += 1) step(16);
		} else {
			window.addEventListener("pointermove", onMove);
			window.addEventListener("pointerup", onLeave);
			window.addEventListener("pointercancel", onLeave);
			document.documentElement.addEventListener("pointerleave", onLeave);
			document.addEventListener("visibilitychange", onVisibility);
			raf = requestAnimationFrame(loop);
		}

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onLeave);
			window.removeEventListener("pointercancel", onLeave);
			document.documentElement.removeEventListener("pointerleave", onLeave);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, [accent]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80 ${className}`}
		/>
	);
}
