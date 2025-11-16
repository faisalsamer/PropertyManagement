'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { UserAvatar } from './name-avatar'
import { ComboBoxitemsType } from '@/types'



type Props = {
  items: ComboBoxitemsType[]
  placeholder: string
  searchPlaceholder: string
  variant?: 'single' | 'multiple'
  NotFoundMessage?: string
  showAvatar?: boolean
  className?: string
}

export default function Combobox ({
  items,
  placeholder,
  searchPlaceholder,
  variant = 'single',
  NotFoundMessage = 'No items found.',
  showAvatar = false,
  className
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [singleValue, setSingleValue] = React.useState('')
  const [multipleValues, setMultipleValues] = React.useState<string[]>([])

  const isMultiple = variant === 'multiple'

  const handleSelect = (currentValue: string) => {
    if (isMultiple) {
      setMultipleValues(prev =>
        prev.includes(currentValue)
          ? prev.filter(item => item !== currentValue)
          : [...prev, currentValue]
      )
    } else {
      setSingleValue(currentValue === singleValue ? '' : currentValue)
      setOpen(false)
    }
  }

  const handleRemove = (itemToRemove: string) => {
    setMultipleValues(prev => prev.filter(item => item !== itemToRemove))
  }

  const getButtonLabel = () => {
    if (isMultiple) {
      return multipleValues.length > 0
        ? `${multipleValues.length} selected`
        : placeholder
    }
    return singleValue
      ? items.find(item => item.label === singleValue)?.label
      : placeholder
  }

  const isSelected = (label: string) => {
    return isMultiple ? multipleValues.includes(label) : singleValue === label
  }

  const renderAvatar = (item: ComboBoxitemsType) => {
    if (!item.avatar) {
      return <UserAvatar name={item.label} size={item.subtitle ? 25 : 20} className={item.subtitle ? 'text-[11px]!' : 'text-[9px]!'} />
    }

    if (typeof item.avatar === 'string') {
      return (
        <span className='w-5 h-5 relative rounded-full overflow-hidden'>
          <Image
            src={item.avatar}
            alt='Profile pic'
            fill
            className='object-cover'
          />
        </span>
      )
    }

    return <span className='w-5 h-5'>{item.avatar}</span>
  }

  return (
    <div className={cn('w-full space-y-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={cn(
              'flex justify-between',
              'w-full h-10!',
              'texts-body-medium',
              'rounded-[5]',
              className
            )}
          >
            {getButtonLabel()}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-(--radix-popover-trigger-width) p-0'
          align='start'
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} className='h-9' />
            <CommandList>
              <CommandEmpty>{NotFoundMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item, index) => {
                  const selected = isSelected(item.label)
                  return (
                    <CommandItem
                      key={index}
                      value={item.label}
                      onSelect={() => handleSelect(item.label)}
                      className='flex items-center gap-2'
                    >
                      {showAvatar && renderAvatar(item)}
                      <div className='flex-1 flex flex-col'>
                        <span>{item.label}</span>
                        {item.subtitle && (
                          <span className='text-xs text-(--text-secondary)'>
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          selected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected Items Tags - Only for multiple variant */}
      {isMultiple && multipleValues.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {multipleValues.map(selectedLabel => (
            <Badge
              key={selectedLabel}
              variant='secondary'
              className='flex items-center gap-1 pr-1'
            >
              <span>{selectedLabel}</span>
              <button
                onClick={() => handleRemove(selectedLabel)}
                className='ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5'
                aria-label={`Remove ${selectedLabel}`}
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}