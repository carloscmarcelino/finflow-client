import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/cn';

type DatePickerProps = {
  value?: Date;
  onChange: (date?: Date) => void;
};

export const DatePicker = ({ value, onChange }: DatePickerProps) => (
  <div>
    <p className="block text-sm font-medium text-gray-700">Data</p>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            <>
              {dayjs(value).format('MMM')} - {dayjs(value).format('DD/MM/YYYY')}
            </>
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  </div>
);
