import React, { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/lib/cn';
import { MaskFormatter } from '@/utils/mask';

import { InputWrapper } from '../InputWrapper';

type InputTextProps = {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  mask?: MaskFormatter;
};

export const InputText = ({ label, error, register, mask }: InputTextProps) => {
  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      return (event.currentTarget.value = mask(event.currentTarget.value, { event }));
    }
  };

  return (
    <InputWrapper label={label} error={error}>
      <input
        id={label}
        type={label}
        className={cn(
          'text-subtitle text-gray w-full px-4 py-2 rounded-md shadow-md border border-purple focus:outline-none focus:ring-1 focus:ring-purple',
          {
            'focus:ring-red-500 border-red-500': error,
          },
        )}
        placeholder="Pesquisar..."
        {...register}
        onChangeCapture={handleChangeInputValue}
      />
    </InputWrapper>
  );
};
