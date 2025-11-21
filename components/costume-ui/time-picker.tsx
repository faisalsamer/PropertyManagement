'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
} & React.ComponentProps<'input'>

export default function TimePicker ({ className, ...props }: Props) {
  return (
    <Input
      type='time'
      id='time-picker'
      step='1'
      defaultValue='10:30:00'
      className={cn(
        'w-full h-10!',
        'hover:bg-neutral-100',
        'texts-body-medium',
        'transition-colors duration-200',
        'rounded-[5]',
        className
      )}
      {...props}
    />
  )
}
