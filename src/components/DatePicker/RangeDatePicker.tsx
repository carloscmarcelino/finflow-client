import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type RangeDatePickerProps = {
  value?: DateRange;
  onChange: (date?: DateRange) => void;
};

export const RangeDatePicker = ({ value, onChange }: RangeDatePickerProps) => (
  <div className={cn('grid gap-2')}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-[300px] h-[42px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
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
      <PopoverContent className="w-auto p-0" align="start">
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
  </div>
);
