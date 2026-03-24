"use client";

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuthCallback } from '@/hooks/use-auth-callback';

function CallbackHandler() {
  const { error } = useAuthCallback();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(126,217,87,0.2),_transparent_32%),linear-gradient(180deg,_#f7f6f2_0%,_#ffffff_100%)] px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-[#dce9d8] bg-white/90 p-8 text-center shadow-[0_24px_80px_rgba(23,49,29,0.12)] backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17311d]">
          <Loader2 size={28} className="animate-spin text-[#7ED957]" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7ED957]">
          GoSOW
        </p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-gray-900">
          Finishing sign-in
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          We&apos;re attaching your account and preparing your dashboard.
        </p>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f6f2]">
          <Loader2 size={32} className="animate-spin text-[#7ED957]" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
