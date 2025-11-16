import * as React from 'react'

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  items: string[]
  placeholder: string
  className?: string
} & React.ComponentProps<typeof ShadcnSelect>
export default function Select ({
  label,
  items,
  placeholder,
  className,
  ...props
}: Props) {
  return (
    <ShadcnSelect {...props}>
      <SelectTrigger
        className={cn(
          'w-full h-10!',
          'hover:bg-neutral-100',
          'texts-body-medium',
          'transition-colors duration-200',
          'rounded-[5]',
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadcnSelect>
  )
}
