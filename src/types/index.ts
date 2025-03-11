export type DateRangeParams = {
  startDate?: string;
  endDate?: string;
};

export type PaginationParams = {
  limit?: number;
  page?: number;
  search?: string;
};

export type SearchQueryParams = DateRangeParams & PaginationParams;

export type ApiResponse<T> = {
  data: T;
  total: number;
};
