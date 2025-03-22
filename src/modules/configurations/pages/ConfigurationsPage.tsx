import { Tabs, TabsList, TabsTrigger } from '@/components/ui';

import { CategoriesExpensesTab, PaymentsTab } from '../components';

export const ConfigurationsPage = () => (
  <Tabs defaultValue="expenses">
    <TabsList>
      <TabsTrigger value="expenses">Despesas</TabsTrigger>
      <TabsTrigger value="payments">Métodos de pagamento</TabsTrigger>
    </TabsList>
    <CategoriesExpensesTab />
    <PaymentsTab />
  </Tabs>
);
