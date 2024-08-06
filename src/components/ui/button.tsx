import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@app/lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[calc(15px-4px)] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        dark: 'u-flex-center outline-none text-accent-6 hover:text-accent-7 bg-accent-6/10 size-7 rounded-[calc(15px-4px)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[calc(15px-4px)] px-3',
        lg: 'h-11 rounded-[calc(15px-4px)] px-8',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export interface ButtonToggleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
  open: boolean;
  selected: boolean;
  isDragOver?: boolean;

  btnText: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    'data-drag-over'?: boolean;
  };
  btnIcon: React.HTMLAttributes<HTMLButtonElement> & {
    hidden?: boolean;
  };
}

export const DubleButtonCollapse = ({
  btnIcon,
  btnText,
  open,
  selected,
  children,
  className,
  isDragOver,
  ref,
  ...more
}: ButtonToggleProps) => {
  const { className: btnIconCn, hidden = false, ...IconProps } = btnIcon;

  return (
    <div
      ref={ref}
      {...more}
      data-selected={selected}
      className={cn(
        'inline-flex relative gap-4 py-1 px-3 items-center data-[selected="true"]:text-accent-7 text-accent-5 hover:text-accent-8 transition-colors duration-300 ease-in-out rounded-[calc(15px-5px)]',
        className
      )}
    >
      {!hidden && (
        <button
          {...IconProps}
          className={cn(
            'outline-none data-[open="true"]:rotate-90 transition-transform duration-400 ease-in-out',
            btnIconCn
          )}
          data-open={open}
        >
          ▶
        </button>
      )}
      <button
        {...btnText}
        data-drag-over={btnText['data-drag-over'] || false}
        className={cn(
          'outline-none truncate animate-fade-in-blur relative',
          isDragOver &&
            'before:hidden hover:before:block before:absolute before:inset-x-0 before:h-[3px] before:w-full before:bg-accent-8 before:-bottom-[1px] before:rounded-[calc(15px-5px)] before:transition-transform before:duration-300 before:ease-in-out',
          btnText.className
        )}
      />
      {children}
    </div>
  );
};

DubleButtonCollapse.displayName = 'DubleButtonCollapse';
