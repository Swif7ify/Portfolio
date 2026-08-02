"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "../Magnetic";

const socials = [
	{ label: "GitHub", href: "https://github.com/Swif7ify" },
	{ label: "Sponsor", href: "https://github.com/sponsors/Swif7ify" },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/earl-romeo-ordovez-a73a36322",
	},
];

export function Contact() {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});
	const y = useTransform(scrollYProgress, [0, 1], [-120, 0]);

	return (
		<footer
			id="contact"
			ref={ref}
			className="relative w-full overflow-hidden border-t border-line bg-panel px-6 pb-8 pt-24 md:px-10 md:pt-36"
			aria-label="Contact"
		>
			<motion.div
				style={{ y }}
				className="flex flex-col items-center text-center"
			>
				<p className="mb-6 font-serif text-2xl italic text-muted md:text-3xl">
					Have an idea worth building?
				</p>
				<Magnetic strength={0.15}>
					<a
						href="mailto:weareonedev@gmail.com"
						data-cursor="Say hi"
						className="group block font-display text-[13vw] uppercase leading-[0.9] text-cream transition-colors duration-300 hover:text-accent md:text-[9vw]"
					>
						Let&apos;s Talk
						<ArrowUpRight
							className="ml-2 inline-block h-[8vw] w-[8vw] text-accent transition-transform duration-300 group-hover:rotate-45 md:h-[5vw] md:w-[5vw]"
							aria-hidden="true"
						/>
					</a>
				</Magnetic>
				<p className="mt-6 font-sans text-sm text-muted">
					weareonedev@gmail.com
				</p>
			</motion.div>

			<div className="mt-24 flex flex-col gap-8 border-t border-line pt-8 md:mt-32 md:flex-row md:items-center md:justify-between">
				<ul
					className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:justify-start"
					aria-label="Social links"
				>
					{socials.map((social) => (
						<li key={social.label}>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								data-cursor
								className="group relative font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-cream"
							>
								{social.label}
								<span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-cream transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
							</a>
						</li>
					))}
				</ul>
				<p className="text-center font-sans text-[11px] uppercase tracking-[0.2em] text-muted md:text-right">
					© 2026 Earl Ordovez — Designed & built with obsession
				</p>
			</div>
		</footer>
	);
}
