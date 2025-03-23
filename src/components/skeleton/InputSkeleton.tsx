import React from 'react';

import { Skeleton } from '../ui';

export const InputSkeleton = () => (
  <div className="flex flex-col gap-1 w-[14.5625rem]">
    <Skeleton className="w-20 h-[1.3125rem]" />
    <Skeleton className="w-full h-[2.625rem]" />
  </div>
);
