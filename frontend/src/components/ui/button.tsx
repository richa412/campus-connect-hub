import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl hover:scale-105",
        destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg hover:shadow-xl hover:scale-105",
        outline: "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30 hover:scale-105",
        secondary: "bg-white/10 text-white hover:bg-white/20 hover:scale-105",
        ghost: "text-gray-400 hover:bg-white/10 hover:text-white",
        link: "text-indigo-400 underline-offset-4 hover:underline",
        hero: "bg-indigo-500 text-white shadow-xl hover:bg-indigo-600 hover:scale-105 hover:shadow-indigo-500/25",
        "hero-outline": "border border-white/20 text-white bg-transparent hover:bg-white/10 hover:scale-105",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4",
        lg: "h-14 rounded-2xl px-10 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
