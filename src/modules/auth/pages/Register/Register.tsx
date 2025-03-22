'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateUser } from '@/api';
import { InputText } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { TOAST_ERROR_MESSAGE } from '@/config';

import { loginSchema, LoginType } from '../../validators';

export const RegisterPage = () => {
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

  const { mutate, isPending } = useCreateUser();

  const router = useRouter();

  const onSubmit = (data: LoginType) => {
    mutate(JSON.stringify(data), {
      onSuccess: () => {
        toast.success('conta criada com sucesso');
        router.push('/login');
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-title text-purple font-bold">Sign Up</h2>
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
            Cadastrar
          </Button>
        </form>
        <div className="flex flex-col items-center text-subtitle text-gray2">
          <p>Already have an account?</p>
          <Link href="/login">
            <p className="text-purple hover:underline">Sign in</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
