import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/app/(frontend)/utils/utils'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        main: 'btnMainShadow bg-primary text-primary-foreground hover:scale-105 transform transitionAlt',
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-1 transform transition duration-200 hover:shadow-md',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'btnShadow bg-background hover:scale-105 transitionAlt ',
        secondary: 'bg-secondaryAlt text-foreground font-semibold text-white',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  arrow?: boolean
  href: string
}

const LinkButton = React.forwardRef<React.ElementRef<'a'>, ButtonProps>(
  ({ className, variant, href, size, arrow = false, children }, ref) => {
    return (
      <Link
        href={href}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), 'relative group')}
      >
        {children}
        {arrow && (
          <svg
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 transition-all overflow-visible duration-100 ease-in-out transform"
          >
            <g className="transition-all duration-100 ease-in-out transform group-hover:translate-x-[0.15rem]">
              <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" />
            </g>
            <g className="opacity-0 transition-all duration-100 ease-in-out transform scale-x-100 group-hover:opacity-100 group-hover:scale-x-[2.2]">
              <path d="M3.5 4.5H0" stroke="currentColor" />
            </g>
          </svg>
        )}
      </Link>
    )
  },
)

LinkButton.displayName = 'LinkButton'

export { LinkButton, buttonVariants }
