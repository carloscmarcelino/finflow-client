import React, { ChangeEvent } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/lib/cn';
import { MaskFormatter } from '@/utils/mask';

type InputTextProps = {
  label: string;
  error?: FieldError;
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
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor={label} className="text-subtitle text-gray">
          {label}
        </label>
        <input
          id={label}
          type={label}
          className={cn(
            'text-subtitle text-gray w-full px-4 py-2 rounded-md shadow-md border border-purple focus:outline-none focus:ring-1 focus:ring-purple',
            {
              'focus:ring-red-500 border-red-500': error,
            },
          )}
          {...register}
          onChangeCapture={handleChangeInputValue}
        />
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};
