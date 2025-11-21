import React, { useState } from 'react'
import InnerSection from './collapsible-inner-section'
import InputCard from './input-card'
import InputGroup from './input-group'
import Input from './input'
import Select from './select'
import { chargeTypes } from '@/utils/data'
import { CheckAddon } from './payment-section'
import Button from './button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Charge = {
  type: string
  amount: string
  taxable: boolean
  refundable: boolean
  isRemovable: boolean
}

type Props = {
  flowType: 'income' | 'outcome'
  selectable?: boolean
  
}
const ChargesSection = ({ flowType, selectable = false }: Props) => {
  const [charges, setCharges] = useState<Charge[]>([
    {
      type: '',
      amount: '',
      refundable: true,
      taxable: true,
      isRemovable: false
    }
  ])

  const handleTypeChange = (index: number, selectedType: string) => {
    const config = chargeTypes.find(t => t.type === selectedType)
    if (!config) return

    setCharges(prev => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        type: selectedType,
        taxable: config.taxable, // set true/false from type
        refundable: config.refundable // set true/false from type
      }
      return updated
    })
  }

  const handleRemoveCharge = (index: number) => {
    setCharges(prev => prev.filter((_, i) => i !== index))
  }

  const addCharge = () => {
    setCharges(prev => [
      ...prev,
      {
        type: chargeTypes[0].type,
        amount: '',
        taxable: true,
        refundable: false,
        isRemovable: true
      }
    ])
  }

  return (
    <InnerSection title='Charges' subtitle='Set up charges for this payment'>
      {charges.map((charge, index) => {
        const config = chargeTypes.find(t => t.type === charge.type)
        return (
          <InputCard onRemove={() => handleRemoveCharge(index)} isRemoveable={charge.isRemovable} key={index}>
            <InputGroup
              label={`Charge ${selectable ? 'Type' : 'Title'}`}
              className='w-45 sm:w-45 md:w-45 lg:w-80'
              isRequired
            >
              {selectable ? (
                <Select
                  label='Charge types'
                  defaultValue={chargeTypes[0].type}
                  placeholder='Select charge type'
                  className='bg-(--background-primary)'
                  items={chargeTypes.map(t => t.type)}
                  onValueChange={v => handleTypeChange(index, v)}
                  required
                />
              ) : (
                <Input
                  className='bg-(--background-primary)'
                  maxLength={30}
                  placeholder='Enter charge title'
                  required
                />
              )}
            </InputGroup>

            <InputGroup
              label='Amount'
              className='w-20 md:w-30 lg:w-80'
              isRequired
            >
              <Input
                className='bg-(--background-primary)'
                currency
                required
              />
            </InputGroup>

            {/* Conditionally render based on selected type */}
            {config?.taxable && flowType === 'income' && <CheckAddon label='Taxable (SST 8%)' />}

            {config?.refundable && flowType === 'income' && <CheckAddon label='Refundable' />}
          </InputCard>
        )
      })}

      <Button
        variant='secondary'
        icon={<Plus />}
        label='Add Charge'
        isResponsive={false}
        onClick={() => addCharge()}
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
  )
}

export default ChargesSection
