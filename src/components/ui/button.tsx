import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/styles/theme';

type ButtonProps = {
  asChild?: boolean;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    if (isLoading) return <FaSpinner className="animate-spin mr-2" />;

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, type ButtonProps };
