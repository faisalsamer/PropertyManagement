import { useState } from 'react'
import CollapsibleSection from './collapsible-section'
import InnerSection from './collapsible-inner-section'
import RadioGroup from './radio-group'
import InputGroup from './input-group'
import Input from './input'
import { cn } from '@/lib/utils'
import InputCard from './input-card'
import Select from './select'
import Button from './button'
import { Plus } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

// Sub component: CheckAddon
const CheckAddon = ({ label }: { label: string }) => {
  return (
    <>
      <div className='flex items-center gap-2.5 h-10'>
        <Checkbox className='h-5 w-5 border-(--border-strong) bg-(--background-primary)' />
        <span className='texts-body-medium'>{label}</span>
      </div>
    </>
  )
}

type Props = {
  sectionNumber: number
  title?: string
}

const PaymentSection = ({
  sectionNumber,
  title = 'Payment Details'
}: Props) => {
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const daysOfMonth: number[] = Array.from({ length: 28 }, (_, i) => i + 1)
  type chargeTypesType = {
    type: string
    taxable?: boolean
    refundable?: boolean
  }
  const chargeTypes: chargeTypesType[] = [
    { type: 'First Month Rental', taxable: true },
    { type: 'Earnest Deposit', refundable: true },
    { type: 'Security Deposit', refundable: true },
    { type: 'Utility Deposit', refundable: true },
    { type: 'Legal Fees' }
  ]
  return (
    <CollapsibleSection number={sectionNumber} title={title}>
      <InnerSection
        title='Initial Charges'
        subtitle='Set up one-time charges at lease signing'
      >
        <InputCard isRemoveable={false}>
          <InputGroup
            label='Charge Name'
            className='w-45 sm:w-45 md:w-45 lg:w-80'
          >
            <Select
              label='Charge types'
              defaultValue='First Month Rental'
              placeholder='Select charge type'
              className='bg-(--background-primary)'
              items={chargeTypes.map(t => t.type)}
              value={chargeTypes[0].type}
              required
              disabled
            />
          </InputGroup>

          <InputGroup
            label='Amount'
            className='w-20 md:w-30 lg:w-80'
            isRequired
          >
            <Input
              className='bg-(--background-primary)'
              maxLength={20}
              currency
              required
            />
          </InputGroup>

          <CheckAddon label='Taxable (SST 8%)' />
          <CheckAddon label='Refundable' />
        </InputCard>
        <Button
          variant='secondary'
          icon={<Plus />}
          label='Add Charge'
          isResponsive={false}
        />

        <div
          className={cn(
            'flex justify-end',
            'w-full pt-5',
            'border-t border-(--border-strong)'
          )}
        >
          <div className={cn('flex flex-col gap-2.5', 'w-75 px-2.5')}>
            <div className='flex justify-between'>
              <span className='texts-body-medium text-(--text-secondary)'>
                Subtotal:
              </span>
              <span className='texts-body-medium-medium text-right'>
                RM 1200.00
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='texts-body-medium text-(--text-secondary)'>
                Tax (SST 8%):
              </span>
              <span className='texts-body-medium-medium text-right'>
                RM 96.00
              </span>
            </div>
            <div className='flex justify-between pt-3 border-t border-(--border-strong)'>
              <span className='texts-body-large text-(--text-secondary)'>
                Total Charges:
              </span>
              <span className='texts-body-large-medium text-right'>
                RM 1296.00
              </span>
            </div>
          </div>
        </div>
      </InnerSection>
      <InnerSection>
        <InputGroup
          label='Subsequent Monthly Rental Payment'
          className='w-40 sm:w-75'
          isRequired
        >
          <Input maxLength={20} currency required />
        </InputGroup>

        <InputGroup label='Payment Day' className='w-30'>
          <Select
            label='Day'
            defaultValue='First Month Rental'
            placeholder='Select payment day'
            items={daysOfMonth.map(String)}
            value={String(selectedDay)} // controlled selected value
            onValueChange={val => setSelectedDay(Number(val))}
            required
          />
        </InputGroup>
      </InnerSection>
      <InnerSection
        title='Late Payment Charges'
        subtitle='Set up charges for late payments by tenants'
      >
        <InputCard isRemoveable={false}>
          <InputGroup
            label='Charge Name'
            className='w-45 sm:w-45 md:w-45 lg:w-80'
          >
            <Select
              label='Days After Due Payment'
              defaultValue='First Month Rental'
              placeholder='Select charge type'
              className='bg-(--background-primary)'
              items={daysOfMonth.map(String)}
              value={String(selectedDay)} // controlled selected value
              onValueChange={val => setSelectedDay(Number(val))}
              required
            />
          </InputGroup>

          <InputGroup
            label='Amount'
            className='w-20 md:w-30 lg:w-80'
            isRequired
          >
            <Input
              className='bg-(--background-primary)'
              maxLength={20}
              currency
              required
            />
          </InputGroup>
        </InputCard>
        <Button
          variant='secondary'
          icon={<Plus />}
          label='Add Charge'
          isResponsive={false}
        />
      </InnerSection>
    </CollapsibleSection>
  )
}

export default PaymentSection
