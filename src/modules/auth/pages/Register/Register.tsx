'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateUser } from '@/api/auth';
import { InputText } from '@/components/InputText';
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
  });

  const { mutate, isPending } = useCreateUser();

  const router = useRouter();

  const onSubmit = (data: LoginType) => {
    mutate(data, {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText label="Username" error={errors.username} register={register('username')} />

          <InputText label="Password" error={errors.password} register={register('password')} />

          <Button type="submit" className="self-center bg-blue w-32" isLoading={isPending}>
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
};
