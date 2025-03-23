import React from 'react';

import { TableSkeletonClient } from '../Table';
import { Skeleton } from '../ui';

import { CardSkeleton } from './CardSkeleton';
import { InputSkeleton } from './InputSkeleton';

export const ContentSkeleton = () => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <div className="flex flex-col rounded-xl bg-white shadow-2xl px-14 py-7 gap-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <InputSkeleton />
          <InputSkeleton />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-32 h-10" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-32 h-10" />
          </div>
        </div>
      </div>
      <CardSkeleton />
    </div>
    <TableSkeletonClient />
  </main>
);
