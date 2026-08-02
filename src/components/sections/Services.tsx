"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { services } from "../../data/projects";

export function Services() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section
			id="services"
			className="relative w-full bg-ink px-6 py-24 md:px-10 md:py-36"
			aria-label="Services"
		>
			<div className="mb-16 md:mb-24">
				<p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-accent">
					(Services) — What I do best
				</p>
				<h2 className="font-display text-[13vw] uppercase leading-none text-cream md:text-[8vw]">
					Capabil<span className="text-stroke">ities</span>
				</h2>
			</div>

			<div role="list">
				{services.map((service, i) => {
					const isOpen = openIndex === i;
					return (
						<div
							key={service.number}
							role="listitem"
							className="border-t border-line last:border-b"
						>
							<button
								onClick={() => setOpenIndex(isOpen ? null : i)}
								data-cursor
								aria-expanded={isOpen}
								aria-controls={`service-panel-${i}`}
								className="group flex w-full items-center justify-between gap-6 py-8 text-left md:py-10"
							>
								<div className="flex items-baseline gap-6 md:gap-12">
									<span className="font-sans text-xs tracking-[0.2em] text-muted">
										/{service.number}
									</span>
									<span
										className={`font-display text-3xl uppercase transition-colors duration-300 md:text-6xl ${
											isOpen
												? "text-accent"
												: "text-cream group-hover:text-accent"
										}`}
									>
										{service.title}
									</span>
								</div>
								<motion.span
									animate={{ rotate: isOpen ? 45 : 0 }}
									transition={{
										duration: 0.35,
										ease: [0.33, 1, 0.68, 1],
									}}
									className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-cream md:h-12 md:w-12"
									aria-hidden="true"
								>
									<Plus size={18} />
								</motion.span>
							</button>

							<AnimatePresence initial={false}>
								{isOpen && (
									<motion.div
										id={`service-panel-${i}`}
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{
											duration: 0.5,
											ease: [0.33, 1, 0.68, 1],
										}}
										className="overflow-hidden"
									>
										<div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:pl-[7.5rem]">
											<p className="max-w-xl font-sans text-base leading-relaxed text-muted md:col-span-8">
												{service.description}
											</p>
											<ul
												className="flex flex-wrap content-start gap-2 md:col-span-4"
												aria-label={`${service.title} skills`}
											>
												{service.tags.map((tag) => (
													<li
														key={tag}
														className="rounded-full border border-line px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.15em] text-cream"
													>
														{tag}
													</li>
												))}
											</ul>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>
		</section>
	);
}
