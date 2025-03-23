import React from 'react';

import { cn } from '@/lib/cn';

import { CardSkeleton } from '../skeleton/CardSkeleton';

type CardValueProps = {
  isLoading?: boolean;
  value: string;
  title: string;
  className?: string;
};

export const CardValue = ({ isLoading, value, title, className }: CardValueProps) =>
  isLoading ? (
    <CardSkeleton />
  ) : (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className="text-description">{title}</p>
      <p className="text-title font-bold text-purple">{value}</p>
    </div>
  );
