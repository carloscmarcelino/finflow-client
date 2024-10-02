import React from 'react';
import { FieldError } from 'react-hook-form';

type InputTextProps = {
  label: string;
  id: string;
  error?: FieldError;
};

export const InputText = ({ label, id, error, ...props }: InputTextProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={id}
      className={`mt-1 block w-full px-4 py-2 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
      {...props}
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);
