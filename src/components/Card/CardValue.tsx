import React from 'react';

import { Skeleton } from '../ui';

type CardValueProps = {
  isLoading: boolean;
  value: string;
  title: string;
};

export const CardValue = ({ isLoading, value, title }: CardValueProps) => (
  <div className="flex flex-col gap-2">
    {isLoading ? <Skeleton className="w-28 h-6" /> : <p className="text-description">{title}</p>}
    {isLoading ? (
      <Skeleton className="w-28 h-6" />
    ) : (
      <p className="text-title font-bold text-purple">{value}</p>
    )}
  </div>
);
