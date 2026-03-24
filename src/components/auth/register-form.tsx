"use client";

import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useRegisterForm } from '@/hooks/use-register-form';

export default function RegisterForm() {
  const { form, isSubmitting, onSubmit, submitError } = useRegisterForm();
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
        <label className="block text-sm font-semibold text-gray-700">Your name</label>
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            {...register('name')}
            placeholder="Ada Lovelace"
            autoComplete="name"
            className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-sm text-gray-900 outline-none transition focus:border-[#7ED957] focus:ring-4 focus:ring-[#7ED957]/15"
          />
        </div>
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

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
          <span className="text-xs text-gray-400">Minimum 6 characters</span>
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            {...register('password')}
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-sm text-gray-900 outline-none transition focus:border-[#7ED957] focus:ring-4 focus:ring-[#7ED957]/15"
          />
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="rounded-2xl border border-[#dce9d8] bg-[#f3f8ef] px-4 py-3 text-sm text-gray-700">
        Create one account to launch projects, fund work you believe in, and join events.
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#17311d] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0f2214] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        Create GoSOW Account
      </button>
    </form>
  );
}
