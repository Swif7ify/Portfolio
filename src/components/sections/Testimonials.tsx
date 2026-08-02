"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { scrollToSection } from "../../hooks/useSmoothScroll";

const AUTO_ADVANCE_MS = 6000;

export function Testimonials() {
	const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);
	const [paused, setPaused] = useState<boolean>(false);

	const paginate = useCallback((dir: number) => {
		if (testimonials.length === 0) return;
		setIndex(([i]) => [
			(i + dir + testimonials.length) % testimonials.length,
			dir,
		]);
	}, []);

	useEffect(() => {
		if (paused || testimonials.length <= 1) return;
		const interval = setInterval(() => paginate(1), AUTO_ADVANCE_MS);
		return () => clearInterval(interval);
	}, [paused, paginate]);

	if (testimonials.length === 0) {
		return (
			<section
				id="testimonials"
				className="relative w-full overflow-hidden border-t border-line bg-ink px-6 py-24 md:px-10 md:py-36"
				aria-label="Testimonials"
			>
				{/* oversized background word */}
				<span
					aria-hidden="true"
					className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] uppercase leading-none text-stroke opacity-40 md:text-[16vw]"
				>
					Praise
				</span>

				<div className="relative mx-auto max-w-4xl">
					<div className="mb-12 flex items-center justify-between md:mb-16">
						<p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
							(Testimonials) — Kind words
						</p>
						<span className="font-sans text-xs tabular-nums tracking-[0.2em] text-muted">
							00 / 00
						</span>
					</div>

					<div className="flex flex-col items-start py-8">
						<Quote
							size={32}
							className="mb-6 fill-accent/20 text-accent opacity-60"
							aria-hidden="true"
						/>
						<p className="font-serif text-2xl leading-[1.25] text-cream md:text-4xl">
							No testimonials shared yet. Have we worked together?
						</p>
						<p className="mt-4 font-sans text-sm text-muted">
							I am open for client reviews and project
							recommendations. Feel free to connect!
						</p>
						<button
							onClick={() => scrollToSection("#contact")}
							data-cursor="Contact"
							className="mt-8 flex items-center gap-3 rounded-full border border-line px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
						>
							Get In Touch
						</button>
					</div>
				</div>
			</section>
		);
	}

	const testimonial = testimonials[index];

	return (
		<section
			id="testimonials"
			className="relative w-full overflow-hidden border-t border-line bg-ink px-6 py-24 md:px-10 md:py-36"
			aria-label="Testimonials"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			{/* oversized background word */}
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] uppercase leading-none text-stroke opacity-40 md:text-[16vw]"
			>
				Praise
			</span>

			<div className="relative mx-auto max-w-4xl">
				<div className="mb-12 flex items-center justify-between md:mb-16">
					<p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
						(Testimonials) — Kind words
					</p>
					<span
						className="font-sans text-xs tabular-nums tracking-[0.2em] text-muted"
						aria-live="polite"
					>
						{String(index + 1).padStart(2, "0")} /{" "}
						{String(testimonials.length).padStart(2, "0")}
					</span>
				</div>

				<div className="relative min-h-[340px] md:min-h-[300px]">
					<AnimatePresence mode="wait" custom={direction}>
						<motion.blockquote
							key={testimonial.id}
							custom={direction}
							initial={{
								opacity: 0,
								x: direction * 60,
								filter: "blur(6px)",
							}}
							animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
							exit={{
								opacity: 0,
								x: direction * -60,
								filter: "blur(6px)",
							}}
							transition={{
								duration: 0.55,
								ease: [0.33, 1, 0.68, 1],
							}}
							className="flex flex-col items-start"
						>
							<Quote
								size={32}
								className="mb-6 fill-accent text-accent"
								aria-hidden="true"
							/>
							<p className="font-serif text-2xl leading-[1.25] text-cream md:text-4xl">
								{testimonial.quote}
							</p>
							<footer className="mt-8 flex items-center gap-4">
								<Image
									src={testimonial.avatar}
									alt={`Portrait of ${testimonial.name}`}
									width={48}
									height={48}
									className="h-12 w-12 rounded-full border border-line object-cover grayscale"
								/>
								<div>
									<cite className="block font-sans text-sm font-semibold not-italic text-cream">
										{testimonial.name}
									</cite>
									<span className="font-sans text-xs uppercase tracking-[0.15em] text-muted">
										{testimonial.role}
									</span>
								</div>
							</footer>
						</motion.blockquote>
					</AnimatePresence>
				</div>

				{testimonials.length > 1 && (
					<div className="mt-12 flex items-center justify-between border-t border-line pt-6">
						<div
							className="flex gap-2"
							role="tablist"
							aria-label="Testimonial navigation"
						>
							{testimonials.map((t, i) => (
								<button
									key={t.id}
									role="tab"
									aria-selected={i === index}
									aria-label={`Testimonial from ${t.name}`}
									onClick={() =>
										setIndex([i, i > index ? 1 : -1])
									}
									data-cursor
									className="group flex h-6 items-center"
								>
									<span
										className={`h-1 rounded-full transition-all duration-500 ${
											i === index
												? "w-10 bg-accent"
												: "w-4 bg-line group-hover:bg-muted"
										}`}
									/>
								</button>
							))}
						</div>
						<div className="flex gap-3">
							<button
								onClick={() => paginate(-1)}
								data-cursor
								aria-label="Previous testimonial"
								className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
							>
								<ArrowLeft size={16} aria-hidden="true" />
							</button>
							<button
								onClick={() => paginate(1)}
								data-cursor
								aria-label="Next testimonial"
								className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
							>
								<ArrowRight size={16} aria-hidden="true" />
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
