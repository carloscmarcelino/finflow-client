import { Archive, Filter } from 'lucide-react';
import { Control, FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form';

import { useGetExpensesCategories } from '@/api';
import { CustomSelect, InputText, RangeDatePicker } from '@/components/Form';
import { Button } from '@/components/ui';
import { DateRangeParams } from '@/types';
import { blobDownload } from '@/utils';

import { CreateExpenseDialog } from '../../components';
import { ExpensesFilterType } from '../../validators';

type ExpensesTableFiltersProps = {
  register: UseFormRegister<ExpensesFilterType>;
  errors: FieldErrors<ExpensesFilterType>;
  control: Control<ExpensesFilterType>;
  reset: UseFormReset<ExpensesFilterType>;
  dateParams: DateRangeParams;
};

type Params = Record<string, string>;

export const ExpensesTableFilters = ({
  register,
  errors,
  control,
  reset,
  dateParams,
}: ExpensesTableFiltersProps) => {
  const { data: categoriesData, isPending: isLoadingCategories } = useGetExpensesCategories();

  const categoriesOptions = categoriesData?.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-5">
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
        <CustomSelect
          label="Categoria da despesa"
          name="expenseCategory"
          options={categoriesOptions}
          isLoading={isLoadingCategories}
          control={control}
          error={errors.expenseCategory?.message}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            reset();
          }}
        >
          <Filter className="text-white h-4 w-4" />
          Limpar filtros
        </Button>
        <Button
          onClick={() => {
            blobDownload({
              endpoint: 'expenses/export',
              params: dateParams,
              fileName: 'entries.xlsx',
            });
          }}
        >
          <Archive className="text-white h-4 w-4" />
          Gerar XLSX
        </Button>
        <CreateExpenseDialog />
      </div>
    </div>
  );
};
