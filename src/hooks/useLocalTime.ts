'use client';

import { useSyncExternalStore } from 'react';

function getFormattedTime(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
    }).format(new Date());
  } catch {
    return '12:00';
  }
}

/** Returns the local time formatted for the given time zone, updated every 15s via useSyncExternalStore. */
export function useLocalTime(timeZone: string): string {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const id = window.setInterval(callback, 15000);
      return () => window.clearInterval(id);
    },
    () => getFormattedTime(timeZone),
    () => '12:00'
  );
}
