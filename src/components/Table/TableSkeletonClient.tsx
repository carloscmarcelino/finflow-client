import { Skeleton } from '../ui/skeleton';

export const TableSkeleton = () => (
  <div className="flex flex-col gap-4 bg-white rounded-lg w-full p-4">
    <Skeleton className="w-1/4 h-10 rounded-sm self-end" />
    <Skeleton className="w-full h-10 rounded-sm" />
    <Skeleton className="w-full h-10 rounded-sm" />
    <Skeleton className="w-full h-10 rounded-sm" />
    <Skeleton className="w-full h-10 rounded-sm" />
    <Skeleton className="w-full h-10 rounded-sm" />
  </div>
);

export const TableSkeletonClient = () => (
  <div className="flex flex-col gap-4 bg-white rounded-lg w-full p-4">
    <Skeleton className="w-full h-10 rounded-sm" />
    <Skeleton className="w-full h-10 rounded-sm" />
    <Skeleton className="w-full h-10 rounded-sm" />
    <Skeleton className="w-full h-10 rounded-sm" />
  </div>
);
