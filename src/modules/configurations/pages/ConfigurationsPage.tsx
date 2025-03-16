import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ExpensesTab } from '../components/ExpensesTab';

export const ConfigurationsPage = () => (
  <Tabs defaultValue="expenses">
    <TabsList>
      <TabsTrigger value="expenses">Despesas</TabsTrigger>
      <TabsTrigger value="income">Receitas</TabsTrigger>
    </TabsList>
    <ExpensesTab />
  </Tabs>
);
