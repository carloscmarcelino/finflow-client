import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type RangeDatePickerProps = {
  value?: DateRange;
  onChange: (date?: DateRange) => void;
};

export const RangeDatePicker = ({ value, onChange }: RangeDatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        id="date"
        variant="unstyled"
        className="text-subtitle text-gray w-full px-4 py-2 rounded-md shadow-md border border-purple focus:outline-none focus:ring-1 focus:ring-purple"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value?.from ? (
          value.to ? (
            <>
              {dayjs(value.from).format('DD/MM/YYYY')} - {dayjs(value.to).format('DD/MM/YYYY')}
            </>
          ) : (
            dayjs(value.from).format('DD/MM/YYYY')
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
        defaultMonth={value?.from}
        selected={value}
        onSelect={onChange}
        numberOfMonths={2}
      />
    </PopoverContent>
  </Popover>
);
