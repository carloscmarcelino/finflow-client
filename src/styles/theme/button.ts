import { cva, VariantProps } from 'class-variance-authority';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default: 'bg-purple text-description text-white gap-2',
        unstyled: 'bg-transparent text-description text-gray gap-2',
        'rounded-red': 'bg-[#CC1F59] text-description text-white gap-2',
      },
      size: {
        default: 'w-32 h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
