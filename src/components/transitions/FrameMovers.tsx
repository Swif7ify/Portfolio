'use client';

import React from "react";
import { motion } from "framer-motion";

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface FrameMoversProps {
  image: string;
  rects: Rect[];
}

/** Copies of the clicked image flash along a sine path from the card to the detail frame. */
export function FrameMovers({ image, rects }: FrameMoversProps) {
  const last = rects.length - 1;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
      {rects.map((r, i) => (
        <motion.img
          key={i}
          src={image}
          alt=""
          className="absolute rounded-xl object-cover shadow-2xl"
          style={{
            left: r.x,
            top: r.y,
            width: r.w,
            height: r.h,
            rotate: i === 0 || i === last ? 0 : ((i * 37) % 13) - 6
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === last ? [0, 1] : [0, 1, 1, 0] }}
          transition={{
            duration: i === last ? 0.12 : 0.3,
            delay: i * 0.05,
            times: i === last ? undefined : [0, 0.15, 0.6, 1],
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
