'use client';

import { useQuery } from '@tanstack/react-query';

import { User } from '@/api/auth/types';
import { Table } from '@/components/Table';
import api from '@/lib/api';
import { ApiResponse } from '@/types';

import { usersColumns } from './usersColumns';

export const usersQueryKey = {
  get: 'get-users',
  delete: 'delete-user',
};

export const UsersPage = () => {
  const getUsers = async () => {
    const response = await api.authorized().get<ApiResponse<User>>('users');
    const data = await response.json();
    return data;
  };

  const useGetUsers = () =>
    useQuery({
      queryKey: [usersQueryKey.get],
      queryFn: getUsers,
    });

  const { data: usersData, isPending: isLoadingUsers } = useGetUsers();

  console.log(usersData);

  return (
    <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
      {/* <div className="flex flex-col rounded-xl bg-white shadow-2xl px-14 py-7 gap-10">
        <div className="flex justify-between">
          <div className="flex gap-10">
            <InputText
              label="Pesquisar"
              register={register('search')}
              error={errors.search?.message}
            />
            <RangeDatePicker
              label="Periodo"
              control={control}
              name="period"
              error={errors.period?.message}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                toast.success('Filtros limpos com sucesso!');
                reset();
              }}
            >
              <Filter className="text-white h-4 w-4" />
              Limpar filtros
            </Button>
            <Button
              onClick={() => {
                blobDownload({
                  endpoint: 'investments/export',
                  params: {
                    ...dateParams,
                  },
                  fileName: 'investments.xlsx',
                });
              }}
            >
              <Archive className="text-white h-4 w-4" />
              Gerar XLSX
            </Button>
            <div className="flex flex-col gap-2">
              <CreateInvestmentDialog />
              <SimulateInvestmentDialog />
            </div>
          </div>
        </div>
        <CardValue
          isLoading={isLoadingTotalInvestments}
          value={toBRL(totalData?.total ?? 0)}
          title="Total investido"
        />
      </div> */}
      <Table
        columns={usersColumns}
        data={usersData?.data ?? []}
        isLoading={isLoadingUsers}
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
        // isFetching={isFetchingInvestments}
      />
      {/* <div className="flex flex-col rounded-xl bg-white shadow-2xl px-14 py-7 gap-10">
        <InvestmentPerformanceChart investmentsData={investmentsData?.data} />
        <InvestmentPerformancePie investmentsData={investmentsData?.data} />
      </div> */}
    </main>
  );
};
