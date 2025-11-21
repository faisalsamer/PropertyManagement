'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
} & React.ComponentProps<'button'>

export default function DatePicker ({ className, ...props }: Props) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          id='date-picker'
          className={cn(
            'flex items-center justify-between',
            'w-full h-10!',
            'hover:bg-neutral-100',
            'texts-body-medium',
            !date && 'text-(--text-secondary)',
            'transition-colors duration-200',
            'rounded-[5]',
            className
          )}
          {...props}
        >
          {date ? date.toLocaleDateString() : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          captionLayout='dropdown'
          onSelect={date => {
            setDate(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
