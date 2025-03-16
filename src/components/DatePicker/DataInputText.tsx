import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { RangeDatePicker } from './RangeDatePicker';

type DataInputTextProps<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  name: Path<T>;
};

export const DataInputText = <T extends FieldValues>({
  label,
  control,
  name,
}: DataInputTextProps<T>) => (
  <div className="flex flex-col">
    <label htmlFor={label} className="text-subtitle text-gray">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => <RangeDatePicker value={field.value} onChange={field.onChange} />}
    />
  </div>
);
