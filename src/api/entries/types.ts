import { DateRangeParams, PaginatedSearchParams } from '@/types';

export type Entry = {
  value: number;
  date: string;
  id: string;
  description: string;
};

export type TotalEntries = {
  total: number;
};

export type GetEntriesParams = PaginatedSearchParams;

export type GetTotalEntriesParams = DateRangeParams;

export type GetExitsParams = PaginatedSearchParams;
