"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import type {
	Dispatch,
	MutableRefObject,
	ReactNode,
	SetStateAction,
} from "react";
import type Lenis from "lenis";
import type { PhysicsSettings, ScrollMetrics, ThemeId } from "../types/kinetic";

export const defaultSettings: PhysicsSettings = {
	stiffness: 220,
	damping: 22,
	aberration: 0,
	grid: 0.3,
	smoothness: 0.1,
};

interface KineticValue {
	theme: ThemeId;
	setTheme: (t: ThemeId) => void;
	settings: PhysicsSettings;
	settingsRef: MutableRefObject<PhysicsSettings>;
	updateSetting: <K extends keyof PhysicsSettings>(
		key: K,
		value: PhysicsSettings[K],
	) => void;
	resetSettings: () => void;
	paletteOpen: boolean;
	setPaletteOpen: Dispatch<SetStateAction<boolean>>;
	metrics: MutableRefObject<ScrollMetrics>;
	lenisRef: MutableRefObject<Lenis | null>;
	scrollToId: (id: string) => void;
	reducedMotion: boolean;
}

const KineticContext = createContext<KineticValue | null>(null);

interface KineticProviderProps {
	initialTheme?: ThemeId;
	children: ReactNode;
}

function subscribeReducedMotion(onStoreChange: () => void): () => void {
	if (typeof window === "undefined") return () => {};
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
	return false;
}

export function KineticProvider({
	initialTheme = "cyber",
	children,
}: KineticProviderProps) {
	const [theme, setThemeState] = useState<ThemeId>(initialTheme);
	const [settings, setSettings] = useState<PhysicsSettings>(() =>
		initialTheme === "swiss"
			? { ...defaultSettings, grid: 0.8 }
			: defaultSettings,
	);
	const [paletteOpen, setPaletteOpen] = useState(false);
	const reducedMotion = useSyncExternalStore(
		subscribeReducedMotion,
		getReducedMotionSnapshot,
		getReducedMotionServerSnapshot,
	);

	const settingsRef = useRef(settings);
	useEffect(() => {
		settingsRef.current = settings;
	}, [settings]);

	const metrics = useRef<ScrollMetrics>({
		scroll: 0,
		velocity: 0,
		progress: 0,
		limit: 1,
	});
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.dataset.theme = theme;
		}
	}, [theme]);

	const setTheme = useCallback((t: ThemeId) => {
		setThemeState(t);
		if (t === "swiss")
			setSettings((s) => ({ ...s, grid: Math.max(s.grid, 0.8) }));
	}, []);

	const updateSetting = useCallback(
		<K extends keyof PhysicsSettings>(key: K, value: PhysicsSettings[K]) =>
			setSettings((s) => ({ ...s, [key]: value })),
		[],
	);

	const resetSettings = useCallback(() => setSettings(defaultSettings), []);

	const scrollToId = useCallback((id: string) => {
		if (typeof document === "undefined") return;
		const cleanId = id.startsWith("#") ? id.slice(1) : id;
		const el = document.getElementById(cleanId);
		if (!el) return;
		const lenis = lenisRef.current;
		if (lenis) {
			lenis.scrollTo(el, { duration: 1.4 });
		} else {
			el.scrollIntoView({ behavior: "smooth" });
		}
	}, []);

	const value = useMemo<KineticValue>(
		() => ({
			theme,
			setTheme,
			settings,
			settingsRef,
			updateSetting,
			resetSettings,
			paletteOpen,
			setPaletteOpen,
			metrics,
			lenisRef,
			scrollToId,
			reducedMotion,
		}),
		[
			theme,
			setTheme,
			settings,
			updateSetting,
			resetSettings,
			paletteOpen,
			scrollToId,
			reducedMotion,
		],
	);

	return (
		<KineticContext.Provider value={value}>
			{children}
		</KineticContext.Provider>
	);
}

export function useKinetic() {
	const ctx = useContext(KineticContext);
	if (!ctx) throw new Error("useKinetic must be used inside KineticProvider");
	return ctx;
}
