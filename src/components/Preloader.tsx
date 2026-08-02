"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
	onComplete: () => void;
}

const words = ["Hello", "Bonjour", "Hola", "こんにちは", "Ciao", "Olá"];

export function Preloader({ onComplete }: PreloaderProps) {
	const [count, setCount] = useState<number>(0);
	const [wordIndex, setWordIndex] = useState<number>(0);

	useEffect(() => {
		let current = 0;
		const interval = setInterval(() => {
			current += Math.floor(Math.random() * 12) + 4;
			if (current >= 100) {
				current = 100;
				clearInterval(interval);
				setTimeout(onComplete, 450);
			}
			setCount(current);
		}, 110);
		return () => clearInterval(interval);
	}, [onComplete]);

	useEffect(() => {
		const interval = setInterval(() => {
			setWordIndex((i) => (i + 1) % words.length);
		}, 320);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			className="fixed inset-0 z-[300] flex flex-col justify-between bg-ink p-6 md:p-10"
			initial={{ y: 0 }}
			exit={{
				y: "-100%",
				transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
			}}
			aria-label="Loading"
			role="status"
		>
			<div className="flex items-center gap-3">
				<span className="h-2 w-2 rounded-full bg-accent" />
				<motion.span
					key={wordIndex}
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					className="font-serif text-xl italic text-cream md:text-2xl"
				>
					{words[wordIndex]}
				</motion.span>
			</div>
			<div className="flex items-end justify-between">
				<p className="max-w-[200px] font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
					Portfolio
				</p>
				<span className="font-display text-[22vw] leading-[0.8] text-cream md:text-[14vw]">
					{count}%
				</span>
			</div>
		</motion.div>
	);
}
