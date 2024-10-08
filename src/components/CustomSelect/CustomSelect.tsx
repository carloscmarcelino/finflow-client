'use client';

import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
} from 'react-hook-form';
import Select from 'react-select';

type CustomSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options?: {
    label: string;
    value: Record<string, unknown> | string;
  }[];
  isLoading: boolean;
  error?: Merge<FieldError, FieldErrorsImpl> | FieldError;
};

export const CustomSelect = <T extends FieldValues>({
  label,
  name,
  control,
  options,
  isLoading,
  error,
}: CustomSelectProps<T>) => (
  <div>
    <label htmlFor={label} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <Select
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options={options as any}
          placeholder=""
          isLoading={isLoading}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          value={value}
          styles={{
            control: (styles) => ({
              ...styles,
              height: '42px',
            }),
          }}
        />
      )}
    />
    {error && (
      <span className="text-red-500 text-sm">
        {(error as unknown as { message: string })?.message}
      </span>
    )}
  </div>
);
