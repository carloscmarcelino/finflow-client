import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';

type PaginationProps = {
  data?: unknown[];
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number | undefined>>;
  isFetching?: boolean;
};

export const Pagination = ({ data, currentPage, setCurrentPage, isFetching }: PaginationProps) => {
  const handleNextPage = () => {
    setCurrentPage?.((prevPage) => prevPage && prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage ?? 0 > 1) {
      setCurrentPage?.((prevPage) => prevPage && prevPage - 1);
    }
  };

  return (
    <div className="flex items-center mx-auto mt-4 gap-10">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1 || isFetching}
        variant="ghost"
      >
        <ArrowLeft />
      </Button>
      <p>{currentPage}</p>
      <Button
        onClick={handleNextPage}
        disabled={!data || isFetching || data?.length < 5}
        variant="ghost"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};
