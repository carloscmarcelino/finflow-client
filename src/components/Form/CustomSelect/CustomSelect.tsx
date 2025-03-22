'use client';

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Select from 'react-select';

import { InputWrapper } from '../InputWrapper';

type CustomSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options?: {
    label: string;
    value: Record<string, unknown> | string;
  }[];
  isLoading: boolean;
  error?: string;
};

export const CustomSelect = <T extends FieldValues>({
  label,
  name,
  control,
  options,
  isLoading,
  error,
}: CustomSelectProps<T>) => (
  <InputWrapper label={label} error={error}>
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
              borderColor: error ? '#ef4444 ' : '#6523E9',
            }),
          }}
        />
      )}
    />
  </InputWrapper>
);
