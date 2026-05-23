import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan disabled:pointer-events-none disabled:opacity-50 cursor-none data-cursor='button'",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 text-white border border-neon-cyan/30 hover:border-neon-cyan/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]",
        ghost: "text-text-secondary hover:bg-white/5 hover:text-text-primary",
        neon: "bg-neon-cyan text-void font-semibold hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:scale-105",
        outline:
          "outline-btn border border-white/20 bg-transparent text-text-primary hover:border-neon-cyan/50 hover:text-neon-cyan",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-cursor="button"
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
