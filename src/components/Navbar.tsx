"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { scrollToSection } from "../hooks/useSmoothScroll";

const links = [
	{ label: "Work", target: "#work" },
	{ label: "About", target: "#about" },
	{ label: "Services", target: "#services" },
	{ label: "Contact", target: "#contact" },
];

interface NavbarProps {
	ready: boolean;
}

export function Navbar({ ready }: NavbarProps) {
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const update = () =>
			setTime(
				new Date().toLocaleTimeString("en-US", {
					timeZone: "Asia/Manila",
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				}),
			);
		update();
		const interval = setInterval(update, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.header
			className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
			initial={{ y: -60, opacity: 0 }}
			animate={ready ? { y: 0, opacity: 1 } : {}}
			transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
		>
			<nav
				className="flex items-center justify-between px-6 py-5 md:px-10"
				aria-label="Primary navigation"
			>
				<Magnetic strength={0.25}>
					<button
						onClick={() => scrollToSection("#hero")}
						data-cursor
						className="font-display text-lg uppercase tracking-wide text-cream"
						aria-label="Back to top"
					>
						OneDev<span className="text-accent">.</span>
					</button>
				</Magnetic>

				<div className="hidden items-center gap-8 md:flex">
					{links.map((link) => (
						<Magnetic key={link.label} strength={0.3}>
							<button
								onClick={() => scrollToSection(link.target)}
								data-cursor
								className="group relative font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream"
							>
								{link.label}
								<span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-cream transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
							</button>
						</Magnetic>
					))}
				</div>

				<div className="flex items-center gap-2 font-sans text-xs tracking-widest text-cream">
					<span className="hidden sm:inline text-muted">
						Zambales, PH
					</span>
					<span className="tabular-nums">{time}</span>
				</div>
			</nav>
		</motion.header>
	);
}
