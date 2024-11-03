'use client';

import {
  Row,
  TableOptions,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';

import { cn } from '@/lib/utils';
import { Pagination } from '@/modules/entries/components/EntriesTable/Pagination';

import { TableSkeletonClient } from './TableSkeletonClient';

export type TableProps<Data extends Record<string, unknown>> = {
  data: TableOptions<Data>['data'];
  isLoading?: boolean;
  columns: TableOptions<Data>['columns'];
  emptyTableContent?: JSX.Element;
  onClickRow?: (rowProps: Row<Data>, event: MouseEvent<HTMLTableRowElement>) => void;
  filter?: JSX.Element;
  exportContent?: JSX.Element;
  tableContainerClassNames?: string;
  children?: ReactNode;
  theadClassNames?: string;
  tbodyClassNames?: string;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  isFetching?: boolean;
} & Omit<TableOptions<Data>, 'getCoreRowModel' | 'columns' | 'data'>;

export const Table = <Data extends Record<string, unknown>>({
  data = [],
  columns = [],
  isLoading = false,
  onClickRow = () => ({}),
  filter,
  exportContent,
  emptyTableContent,
  tableContainerClassNames,
  theadClassNames,
  tbodyClassNames,
  children,
  currentPage,
  setCurrentPage,
  isFetching,
  ...rest
}: TableProps<Data>) => {
  const table = useReactTable<Data>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...rest,
  });

  return (
    <div
      className={cn(
        'flex flex-col p-[13px] w-full rounded-2xl gap-4 bg-white',
        tableContainerClassNames,
      )}
    >
      <div className="flex gap-[6.99px] self-end pr-2">
        {filter}
        {exportContent}
      </div>

      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <table className="w-full h-fit mb-1">
          <thead className={cn('border border-y-[#fafafa] border-x-transparent ', theadClassNames)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left whitespace-nowrap text-primary-dark text-md font-bold p-3"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {data.length > 0 && !isLoading && (
            <tbody
              className={(cn('border border-y-[#fafafa] border-x-transparent'), tbodyClassNames)}
            >
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={(e) => onClickRow(row, e)}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap text-left text-sm text-gray-500 p-4"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {isLoading && <TableSkeletonClient />}

      {!data.length && !isLoading && (
        <div className="h-60 flex w-full justify-center items-center">
          {emptyTableContent ? emptyTableContent : <p>Não existem dados</p>}
        </div>
      )}

      {children}

      <Pagination
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isFetching={isFetching}
      />
    </div>
  );
};
