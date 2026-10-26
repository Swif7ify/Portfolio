"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { getImagePath } from '../../utils/image';

type PixelImageProps = {
  src: string;
  alt: string;
  active: boolean;
  restingBlock?: number;
  className?: string;
};

const STEP_MS = 42;

export function PixelImage({
  src,
  alt,
  active,
  restingBlock = 28,
  className = '',
}: PixelImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const levelRef = useRef(0);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const resolvedSrc = getImagePath(src);
  const loaded = loadedSrc === resolvedSrc;
  const reduce = useReducedMotion();
  const levels = useMemo(() => buildLevels(restingBlock), [restingBlock]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = w / h;
    let sw: number;
    let sh: number;
    if (ir > cr) {
      sh = img.naturalHeight;
      sw = sh * cr;
    } else {
      sw = img.naturalWidth;
      sh = sw / cr;
    }
    const sx = (img.naturalWidth - sw) / 2;
    const sy = (img.naturalHeight - sh) / 2;

    const block = levels[levelRef.current] * dpr;
    ctx.clearRect(0, 0, w, h);
    if (block <= dpr) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      return;
    }
    const tw = Math.max(1, Math.ceil(w / block));
    const th = Math.max(1, Math.ceil(h / block));
    const buffer = bufferRef.current ?? document.createElement('canvas');
    bufferRef.current = buffer;
    buffer.width = tw;
    buffer.height = th;
    const bctx = buffer.getContext('2d');
    if (!bctx) return;
    bctx.imageSmoothingEnabled = true;
    bctx.drawImage(img, sx, sy, sw, sh, 0, 0, tw, th);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buffer, 0, 0, tw, th, 0, 0, tw * block, th * block);
  }, [levels]);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (cancelled) return;
      imageRef.current = img;
      setLoadedSrc(resolvedSrc);
    };
    img.src = resolvedSrc;
    return () => {
      cancelled = true;
    };
  }, [resolvedSrc]);

  useEffect(() => {
    if (!loaded) return;
    draw();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [loaded, draw]);

  useEffect(() => {
    if (!loaded) return;
    const target = active ? levels.length - 1 : 0;
    if (reduce) {
      levelRef.current = target;
      draw();
      return;
    }
    let timer = 0;
    const step = () => {
      if (levelRef.current === target) return;
      levelRef.current += levelRef.current < target ? 1 : -1;
      draw();
      timer = window.setTimeout(step, STEP_MS);
    };
    timer = window.setTimeout(step, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, loaded, levels, reduce, draw]);

  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      <canvas ref={canvasRef} role="img" aria-label={alt} className="absolute inset-0 h-full w-full" />
      {!loaded && <div className="absolute inset-0 animate-pulse bg-ink/5" aria-hidden />}
    </div>
  );
}

function buildLevels(resting: number): number[] {
  const raw = [1, 0.68, 0.46, 0.3, 0.18, 0.09].map((m) => Math.max(2, Math.round(resting * m)));
  const unique = raw.filter((v, i) => raw.indexOf(v) === i);
  return [...unique, 1];
}
