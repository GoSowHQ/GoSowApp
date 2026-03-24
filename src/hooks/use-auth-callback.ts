"use client";

import { useEffect, useEffectEvent, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export function useAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens, loadUser } = useAuthStore();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleCallback = useEffectEvent(async () => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken || !refreshToken) {
      setError('The sign-in link is incomplete. Please try again.');
      startTransition(() => {
        router.replace('/login');
      });
      return;
    }

    try {
      setTokens(accessToken, refreshToken);
      await loadUser();
      startTransition(() => {
        router.replace('/dashboard');
      });
    } catch {
      setError('We could not complete sign-in. Please try again.');
      startTransition(() => {
        router.replace('/login');
      });
    }
  });

  useEffect(() => {
    handleCallback();
  }, [searchParams]);

  return {
    error,
    isPending,
  };
}
