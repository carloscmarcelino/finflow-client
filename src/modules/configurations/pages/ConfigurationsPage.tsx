import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CategoriesExpensesTab } from '../components';

export const ConfigurationsPage = () => (
  <Tabs defaultValue="expenses">
    <TabsList>
      <TabsTrigger value="expenses">Despesas</TabsTrigger>
    </TabsList>
    <CategoriesExpensesTab />
  </Tabs>
);
