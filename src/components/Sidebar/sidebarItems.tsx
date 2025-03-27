import { Coins, Goal, HomeIcon, Package, Settings, Users, Wallet } from 'lucide-react';

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

export const sidebarItems = [
  {
    icon: HomeIcon,
    label: 'Home',
    href: '/',
  },
  {
    icon: Wallet,
    label: 'Entradas',
    href: '/entradas',
  },
  {
    icon: Package,
    label: 'Despesas',
    href: '/despesas',
  },
  {
    icon: Goal,
    label: 'Metas',
    href: '/metas',
  },
  {
    icon: Coins,
    label: 'Investimentos',
    href: '/investimentos',
  },
  {
    icon: Users,
    label: 'Usuarios',
    href: '/usuarios',
  },
  {
    icon: Settings,
    label: 'Configurações',
    href: '/configuracoes',
  },
];
