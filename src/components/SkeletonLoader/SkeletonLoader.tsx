import React from 'react';

import { Skeleton } from '../ui';

type SkeletonLoaderProps = {
  length?: number;
};

export const SkeletonLoader = ({ length = 5 }: SkeletonLoaderProps) =>
  Array.from({ length }).map((_, index) => <Skeleton key={index} className="h-6 w-full" />);
