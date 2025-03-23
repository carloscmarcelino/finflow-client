import { Coins, HomeIcon, Package, Settings, Users, Wallet } from 'lucide-react';

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
