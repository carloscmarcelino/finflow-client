'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';

import { loginSchema, LoginType } from '../../validators';

import { loginAction } from './action';

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
      loginAction(data);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <InputText label="Username" error={errors.username} register={register('username')} />

          <InputText label="Password" error={errors.password} register={register('password')} />

          <Button type="submit" className="self-center bg-blue w-32" isLoading={isPending}>
            Login
          </Button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Dont have an account?{' '}
          <Link href="/cadastro">
            <p className="text-blue-600 hover:underline">Sign up</p>
          </Link>
        </p>
      </div>
    </div>
  );
};
