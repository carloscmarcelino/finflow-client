import React, { ChangeEvent } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { MaskFormatter } from '@/utils/functions/mask';

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
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={label}
        type={label}
        className={`mt-1 block w-full px-4 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        {...register}
        onChangeCapture={handleChangeInputValue}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};
