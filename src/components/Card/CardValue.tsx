import React from 'react';

import { CardSkeleton } from '../skeleton/CardSkeleton';

type CardValueProps = {
  isLoading?: boolean;
  value: string;
  title: string;
};

export const CardValue = ({ isLoading, value, title }: CardValueProps) =>
  isLoading ? (
    <CardSkeleton />
  ) : (
    <div className="flex flex-col gap-2">
      <p className="text-description">{title}</p>
      <p className="text-title font-bold text-purple">{value}</p>
    </div>
  );
