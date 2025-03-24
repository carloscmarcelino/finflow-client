import { Tabs, TabsList, TabsTrigger } from '@/components/ui';

import { BanksTab, CategoriesExpensesTab, InvestmentsTypeTab, PaymentsTab } from '../components';

export const ConfigurationsPage = () => (
  <Tabs defaultValue="expenses">
    <TabsList>
      <TabsTrigger value="expenses">Despesas</TabsTrigger>
      <TabsTrigger value="payments">Métodos de pagamento</TabsTrigger>
      <TabsTrigger value="investmentsTypes">Tipos de investimento</TabsTrigger>
      <TabsTrigger value="banks">Bancos</TabsTrigger>
    </TabsList>
    <CategoriesExpensesTab />
    <PaymentsTab />
    <InvestmentsTypeTab />
    <BanksTab />
  </Tabs>
);
