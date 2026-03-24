"use client";

import { Mail, Lock, Loader2 } from 'lucide-react';
import { useLoginForm } from '@/hooks/use-login-form';

export default function LoginForm() {
  const { form, isSubmitting, onSubmit, submitError } = useLoginForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {submitError && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-sm text-gray-900 outline-none transition focus:border-[#7ED957] focus:ring-4 focus:ring-[#7ED957]/15"
          />
        </div>
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <span className="text-xs text-gray-400">Use the same account across builder and backer flows</span>
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            {...register('password')}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-sm text-gray-900 outline-none transition focus:border-[#7ED957] focus:ring-4 focus:ring-[#7ED957]/15"
          />
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="rounded-2xl border border-[#dce9d8] bg-[#f3f8ef] px-4 py-3 text-sm text-gray-700">
        Sign in to manage campaigns, track pledges, and pick up where you left off.
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#17311d] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0f2214] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        Sign In to GoSOW
      </button>
    </form>
  );
}
