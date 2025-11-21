import { useState } from 'react'
import InnerSection from './collapsible-inner-section'
import RadioGroup from './radio-group'
import Input from './input'
import Select from './select'
import { cn } from '@/lib/utils'

// Sub component: unit
const Unit = ({
  value,
  onSelect
}: {
  value: string
  onSelect?: (isSelected: boolean) => void
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  return (
    <button
      onClick={() => {
        setIsSelected(prev => {
          const next = !prev
          onSelect?.(next)
          return next
        })
      }}
      className={cn(
        'flex items-center justify-center',
        'h-9.5 w-9.5',
        'transition-colors duration-100',
        isSelected
          ? 'bg-(--secondary-color)! text-(--text-inverse)!'
          : 'border border-(--border-default) hover:bg-neutral-100',
        'texts-body-medium',
        'select-none cursor-pointer rounded-full'
      )}
    >
      {value}
    </button>
  )
}

const RecurringConfig = () => {
  const options: string[] = ['Enable', 'Disable']
  const [disableRecurring, setDisableRecurring] = useState<boolean>(true)
  const timeUnits: string[] = ['Day', 'Week', 'Month', 'Year']
  const [show, setShow] = useState<{ weekDays: boolean; monthDays: boolean }>({
    weekDays: false,
    monthDays: false
  })
  const weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthDays = Array.from({ length: 28 }, (_, i) => i + 1)

  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const handleSelect = (day: string, isSelected: boolean) => {
    setSelectedDays(prev =>
      isSelected ? [...prev, day] : prev.filter(d => d !== day)
    )
  }
  return (
    <InnerSection
      title='Recurring Pattern'
      subtitle='Set how often this notice repeats'
    >
      <RadioGroup
        defaultOption={1}
        options={options}
        onChange={(value: number) => {
          if (value === 1) {
            setDisableRecurring(true)
          } else {
            setDisableRecurring(false)
          }
        }}
      />

      <div
        className={cn(
          'flex flex-col gap-5',
          'transition-all duration-200 overflow-hidden',
          disableRecurring ? 'max-h-0 opacity-0' : `${show.weekDays ? 'max-h-26' : 'max-h-61'} opacity-100`
        )}
      >
        <div className='flex items-center'>
          <span className='texts-body-medium w-13'>Every</span>
          <div className='flex gap-3'>
            <Input type='number' defaultValue={1} min={1} className='w-24' />
            <Select
              defaultValue={timeUnits[0]}
              items={timeUnits}
              label='Time Units'
              className='w-24'
              placeholder='Select a time unit'
              onChange={(value: string) => {
                if (value === timeUnits[1]) {
                  setShow({
                    weekDays: true,
                    monthDays: false
                  })
                } else if (value === timeUnits[2]) {
                  setShow({
                    weekDays: false,
                    monthDays: true
                  })
                } else {
                  setShow({
                    weekDays: false,
                    monthDays: false
                  })
                }
              }}
            />
          </div>
        </div>

        <div
          className={cn(
            'flex items-start',
            'transition-all duration-300',
            show.weekDays || show.monthDays
              ? `${show.weekDays ? 'max-h-10' : 'max-h-60'} opacity-100`
              : 'max-h-0 opacity-0'
          )}
        >
          <span className='flex items-center texts-body-medium w-13 h-9.5'>On</span>
          <div className='grid grid-cols-8 gap-2.5'>
            {show.weekDays &&
              weekDays.map((wd, index) => {
                return <Unit key={index} value={wd} />
              })}
            {show.monthDays &&
              monthDays.map((md, index) => {
                return <Unit key={index} value={String(md)} />
              })}
          </div>
        </div>
      </div>
    </InnerSection>
  )
}

export default RecurringConfig
