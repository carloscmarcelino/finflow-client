export type DateRangeParams = {
  startDate?: string;
  endDate?: string;
};

export type PaginationParams = {
  limit: number;
  page: number;
  search?: string;
};

export type PaginatedSearchParams = DateRangeParams & PaginationParams;

export type PaginationResponse<T> = {
  data: T[];
  total: number;
};
