import { useState } from 'react'
import CollapsibleSection from './collapsible-section'
import InnerSection from './collapsible-inner-section'
import RadioGroup from './radio-group'
import InputGroup from './input-group'
import Input from './input'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  sectionNumber: number
}

const ReminderSection = ({ title = 'Reminders', sectionNumber }: Props) => {
  const [activate, setActivate] = useState<{
    expiry: boolean
    before: boolean
    after: boolean
  }>({
    expiry: false,
    before: false,
    after: false
  })
  const inputGroupEffect = (activate: boolean) => {
    return cn(
      'overflow-hidden transition-all duration-150 ease-out',
      activate ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
    )
  }

  return (
    <CollapsibleSection title={title} number={sectionNumber}>
      <InnerSection
        title='Reminders'
        subtitle='Set up automated reminders to keep everyone on track with key rental dates'
      >
        <div className='flex'>
          <InputGroup label='Lease expiry'>
            <RadioGroup
              defaultOption={1}
              options={['Yes', 'No']}
              onChange={value => {
                if (value === 0)
                  setActivate(prev => ({ ...prev, expiry: true }))
                else setActivate(prev => ({ ...prev, expiry: false }))
              }}
            />
          </InputGroup>

          <InputGroup
            label='Lease expiry reminder days before'
            className={inputGroupEffect(activate.expiry)}
          >
            <Input type='number' min={1} placeholder='E.g. 30' />
          </InputGroup>
        </div>
        <div className='flex'>
          <InputGroup label='Send rent reminders to tenants'>
            <RadioGroup
              defaultOption={1}
              options={['Yes', 'No']}
              onChange={value => {
                if (value === 0)
                  setActivate(prev => ({ ...prev, before: true }))
                else setActivate(prev => ({ ...prev, before: false }))
              }}
            />
          </InputGroup>
          <InputGroup
            label='Tenant rent reminder days before'
            className={inputGroupEffect(activate.before)}
          >
            <Input type='number' min={1} placeholder='E.g. 7' />
          </InputGroup>
        </div>
        <div className='flex'>
          <InputGroup label='Send rent overdue reminders to tenants'>
            <RadioGroup
              defaultOption={1}
              options={['Yes', 'No']}
              onChange={value => {
                if (value === 0)
                  setActivate(prev => ({ ...prev, after: true }))
                else setActivate(prev => ({ ...prev, after: false }))
              }}
            />
          </InputGroup>
          <InputGroup
            label='Tenant rent reminder days after'
            className={inputGroupEffect(activate.after)}
          >
            <Input type='number' min={1} placeholder='E.g. 3' />
          </InputGroup>
        </div>
      </InnerSection>
    </CollapsibleSection>
  )
}

export default ReminderSection
