import * as React from 'react'
import { cn } from '@/utils/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          id={id}
          placeholder=" "
          className={cn('peer', 'placeholder-transparent', 'focus:placeholder-gray-300', className)}
          ref={ref}
          {...props}
        />
        <Label
          htmlFor={id}
          className={cn(
            'absolute left-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform',
            'bg-transparent px-2 text-sm text-secondaryAlt/75 duration-300 font-normal',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
            'peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2',
            'peer-focus:text-secondaryAlt',
            'dark:bg-transparent',
          )}
        >
          {label}
        </Label>
      </div>
    )
  },
)

FloatingLabelInput.displayName = 'FloatingLabelInput'

export { FloatingLabelInput }
