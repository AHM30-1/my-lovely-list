import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent text-foreground transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary",
        ghost: "border-transparent bg-secondary/50 focus-visible:bg-card focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring",
        elegant: "border-border bg-card shadow-soft focus-visible:shadow-lifted focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20",
      },
      inputSize: {
        default: "h-11 px-4 py-2 text-base",
        sm: "h-9 px-3 py-1 text-sm",
        lg: "h-14 px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
