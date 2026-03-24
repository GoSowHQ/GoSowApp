"use client";

import { useEffect, useEffectEvent } from 'react';
import { useAuthStore } from '@/stores/auth-store';

export function useAuthInitialize() {
  const initialize = useAuthStore((state) => state.initialize);
  const runInitialize = useEffectEvent(() => {
    initialize();
  });

  useEffect(() => {
    runInitialize();
  }, []);
}
