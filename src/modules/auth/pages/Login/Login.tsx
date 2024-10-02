'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@admin.com',
      password: 'admin123',
    },
  });

  const router = useRouter();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);

    router.push('/despesas');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <InputText label="E-mail" error={errors.email} register={register('email')} />

          <InputText label="Password" error={errors.password} register={register('password')} />

          <Button type="submit" className="self-center bg-blue w-32">
            Login
          </Button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Dont have an account?{' '}
          <Link href="">
            <p className="text-blue-600 hover:underline">Sign up</p>
          </Link>
        </p>
      </div>
    </div>
  );
};
