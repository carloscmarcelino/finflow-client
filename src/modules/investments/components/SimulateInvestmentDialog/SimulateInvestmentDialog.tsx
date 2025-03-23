'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMoneyBill } from 'react-icons/fa';

import { CardValue } from '@/components/Card';
import { InputText } from '@/components/Form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { cn } from '@/lib/cn';
import { Mask } from '@/utils';

import { useSimulateInvestment } from '../../hooks';
import {
  simulateInvestmentSchema,
  SimulateInvestmentType,
} from '../../validators/simulateInvestmentSchema';

type Result = {
  totalValue: string;
  totalInvested: string;
  totalInterest: string;
};

export const SimulateInvestmentDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SimulateInvestmentType>({
    resolver: zodResolver(simulateInvestmentSchema),
    defaultValues: {
      initialValue: 'R$ 30.000,00',
      monthlyValue: 'R$ 3.000,00',
      interestRate: '11%',
      period: '10',
    },
  });

  const [result, setResult] = useState<Result>();

  const { handleCalculate } = useSimulateInvestment();

  const onSubmit = (values: SimulateInvestmentType) => {
    const { totalValue, totalInvested, totalInterest } = handleCalculate(values);

    setResult({
      totalValue,
      totalInvested,
      totalInterest,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <DialogTrigger>
        <Button>
          <FaMoneyBill className="text-white h-4 w-4" />
          Simular
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[32rem] max-w-max">
        <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-8')}>
          <DialogHeader className="gap-4">
            <DialogTitle>Simular investimento</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-4">
            <InputText
              label="Valor inicial"
              register={register('initialValue')}
              error={errors.initialValue?.message}
              mask={Mask.brl}
            />
            <InputText
              label="Valor mensal"
              register={register('monthlyValue')}
              error={errors.monthlyValue?.message}
              mask={Mask.brl}
            />
            <InputText
              label="Taxa de juros (ano)"
              register={register('interestRate')}
              error={errors.interestRate?.message}
              mask={Mask.rate}
            />
            <InputText
              label="Período (ano)"
              register={register('period')}
              error={errors.period?.message}
              mask={Mask.period}
            />
            {result && (
              <div className="flex gap-10">
                <CardValue title="Valor total final" value={result.totalValue} />
                <CardValue title="Valor total investido" value={result.totalInvested} />
                <CardValue title="Total em juros" value={result.totalInterest} />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="rounded-red"
              onClick={() => {
                onClose();
                setResult(undefined);
              }}
              type="button"
            >
              Cancelar
            </Button>
            <Button type="submit">Simular</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
