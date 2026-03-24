"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/auth-store';

const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [submitError, setSubmitError] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError('');

    try {
      await login(values.email, values.password);
      startTransition(() => {
        router.replace('/dashboard');
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to sign in');
    }
  });

  return {
    form,
    isSubmitting: form.formState.isSubmitting || isPending,
    onSubmit,
    submitError,
  };
}
