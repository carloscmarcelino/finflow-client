import React from 'react';

import { Skeleton } from '../ui';

export const CardSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="w-24 h-6" />
    <Skeleton className="w-24 h-6" />
  </div>
);
