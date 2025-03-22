import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

import { InputWrapper } from '../InputWrapper';

type RangeDatePickerProps<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export const RangeDatePicker = <T extends FieldValues>({
  label,
  control,
  name,
  error,
}: RangeDatePickerProps<T>) => (
  <InputWrapper label={label} error={error}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="unstyled"
              className="text-subtitle text-gray w-full px-4 py-2 rounded-md shadow-md border border-purple focus:outline-none focus:ring-1 focus:ring-purple"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value?.from ? (
                field.value.to ? (
                  <>
                    {dayjs(field.value.from).format('DD/MM/YYYY')} -{' '}
                    {dayjs(field.value.to).format('DD/MM/YYYY')}
                  </>
                ) : (
                  dayjs(field.value.from).format('DD/MM/YYYY')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={field.value?.from}
              selected={field.value}
              onSelect={field.onChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  </InputWrapper>
);
