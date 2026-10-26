"use client";

import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ProcessScroller } from './ProcessScroller';
import { ProcessList } from './ProcessList';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function ProcessSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduce = useReducedMotion();
  return isDesktop && !reduce ? <ProcessScroller /> : <ProcessList />;
}
