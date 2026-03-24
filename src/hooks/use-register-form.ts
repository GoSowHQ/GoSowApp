"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/auth-store';

const registerSchema = z.object({
  name: z.string().min(2, 'Tell us your name'),
  email: z.email('Enter a valid email address'),
  password: z.string().min(6, 'Use at least 6 characters'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [submitError, setSubmitError] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError('');

    try {
      await register(values.email, values.password, values.name);
      startTransition(() => {
        router.replace('/dashboard');
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to create your account');
    }
  });

  return {
    form,
    isSubmitting: form.formState.isSubmitting || isPending,
    onSubmit,
    submitError,
  };
}
