import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

import { InputWrapper } from '../InputWrapper';

type DatePickerProps<T extends FieldValues> = {
  label: string;
  error?: string;
  control: Control<T>;
  name: Path<T>;
};

export const DatePicker = <T extends FieldValues>({
  label,
  error,
  name,
  control,
}: DatePickerProps<T>) => (
  <InputWrapper label={label} error={error}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="unstyled"
              className="text-subtitle text-gray w-full px-4 py-2 rounded-md shadow-md border border-purple focus:outline-none focus:ring-1 focus:ring-purple"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                <>
                  {dayjs(field.value).format('MMM')} - {dayjs(field.value).format('DD/MM/YYYY')}
                </>
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
          </PopoverContent>
        </Popover>
      )}
    />
  </InputWrapper>
);
