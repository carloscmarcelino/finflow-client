'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { InputText } from '@/components/Form';
import { Button } from '@/components/ui/button';

import { loginSchema, LoginType } from '../../validators';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'carloscmarcelino',
      password: '123carlos',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginType) => {
    startTransition(() => {
      signIn('credentials', {
        ...data,
        redirect: true,
        redirectTo: '/',
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-title text-purple font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-6 gap-4">
          <div className="flex flex-col gap-2">
            <InputText
              label="Username"
              error={errors.username?.message}
              register={register('username')}
            />
            <InputText
              label="Password"
              error={errors.password?.message}
              register={register('password')}
            />
          </div>
          <Button type="submit" className="self-center" isLoading={isPending}>
            Login
          </Button>
        </form>
        <div className="flex flex-col items-center text-subtitle text-gray2">
          <p>Dont have an account?</p>
          <Link href="/cadastro">
            <p className="text-purple hover:underline">Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
