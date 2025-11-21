'use client'

import AddPageHead from '@/components/costume-ui/add-page-head'
import ChargesSection from '@/components/costume-ui/charges-section'
import InnerSection from '@/components/costume-ui/collapsible-inner-section'
import Combobox from '@/components/costume-ui/combobox'
import DatePicker from '@/components/costume-ui/date-picker'
import InputCard from '@/components/costume-ui/input-card'
import InputGroup from '@/components/costume-ui/input-group'
import RadioGroup from '@/components/costume-ui/radio-group'
import RecurringConfig from '@/components/costume-ui/recurring-config'
import Select from '@/components/costume-ui/select'
import TimePicker from '@/components/costume-ui/time-picker'
import UploadFile from '@/components/costume-ui/upload-file'
import { cn } from '@/lib/utils'
import { ComboBoxitemsType, PaymentType } from '@/types'
import {
  propertiesData,
  roomsData,
  tenantsData,
  paymentTypes
} from '@/utils/data'
import { useState } from 'react'

const AddPayment = () => {
  const tenantItems: ComboBoxitemsType[] = tenantsData.map(tenant => ({
    avatar: tenant.tenant_picture,
    label: tenant.tenant_name,
    subtitle: tenant.email
  }))
  const propertyItems: ComboBoxitemsType[] = propertiesData.map(p => ({
    label: p.code,
    subtitle: p.project
  }))
  const [showRoomSelect, setShowRoomSelect] = useState<boolean>(false)
  const Rooms: string[] = roomsData
    .filter(r => r.property === 'Ocean View')
    .map(r => r.title)
  const propertyOptions: string[] = [
    'Select the entire property',
    'Select a specific room'
  ]
  const typesOfPayment = paymentTypes.map(pt => pt.type)
  const [paymentType, setPaymentType] = useState<PaymentType>(paymentTypes[0])
  const selectable: boolean = paymentType === paymentTypes[0]
  const [isPaid, setIsPaid] = useState<boolean>(true)

  return (
    <div className='flex flex-col gap-5'>
      {/* Head section */}
      <AddPageHead
        crumb_items={[
          { label: 'Payments', href: '/payments' },
          { label: 'Add Payment' }
        ]}
        title='Add a payment'
        subtitle='Add a new invoice for tenants to pay'
        className='mb-7.5'
      />

      {/* Basic Details */}
      <InnerSection title='Basic Details' subtitle='Payment Basic Details'>
        {/* TODO: Configure the logic for when tenant is selected, then their room or property is immediately selected or limited to */}
        <div className='inputs-container'>
          <InputGroup label='Tenants' isRequired>
            <Combobox
              items={tenantItems}
              searchPlaceholder='Search tenants'
              variant='single'
              placeholder='Select tenants'
              showAvatar
            />
          </InputGroup>
          <InputGroup label='Property' isRequired>
            <Combobox
              items={propertyItems}
              variant='single'
              searchPlaceholder='Search properties'
              placeholder='Select a property'
            />
          </InputGroup>
        </div>
        <InputCard isRemoveable={false} className='h-auto!' asChild>
          <div
            className={cn(
              'flex flex-col',
              'transition-all duration-300',
              showRoomSelect ? 'gap-3' : 'gap-0'
            )}
          >
            <InputGroup label='This property has rooms'>
              <RadioGroup
                defaultOption={0}
                options={propertyOptions}
                onChange={(value: number) => {
                  if (value === 1) {
                    setShowRoomSelect(true)
                  } else {
                    setShowRoomSelect(false)
                  }
                }}
              />
            </InputGroup>

            <div
              className={cn(
                'transition-all duration-300 overflow-hidden',
                showRoomSelect ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              {/* If showRoomSelect is false, then clear room select */}
              <InputGroup label='Room'>
                <Select
                  label='Rooms'
                  items={Rooms}
                  placeholder='Select a room'
                  className='bg-(--background-primary)'
                  required={showRoomSelect}
                />
              </InputGroup>
            </div>
          </div>
        </InputCard>
        <div className='inputs-container'>
          <InputGroup label='Payment Type'>
            <Select
              items={typesOfPayment}
              label='Types'
              placeholder='Select a type'
              value={paymentType.type}
              onValueChange={value => {
                const type = paymentTypes.find(pt => pt.type === value)
                if (type) setPaymentType(type)
              }}
            />
          </InputGroup>
        </div>
      </InnerSection>

      {/* Charges Section */}
      <ChargesSection flowType='income' selectable={selectable} />

      {/* Payment Details */}
      <div className='flex flex-col gap-5'>
        <InputGroup label='Payment Status'>
          <RadioGroup
            defaultOption={0}
            options={['Paid', 'Not Paid']}
            onChange={(value: number) => {
              if (value === 0) {
                setIsPaid(true)
              } else {
                setIsPaid(false)
              }
            }}
          />
        </InputGroup>

        <div className={cn('flex')}>
          <InputGroup
            label='Payment Method'
            className={cn(isPaid ? 'max-w-full mr-3' : 'max-w-0! opacity-0')}
            isRequired
          >
            <Select
              items={['Cash', 'Bank Transfer']}
              label='Methods'
              placeholder='Select method'
            />
          </InputGroup>
          <InputGroup
            label={`${isPaid ? '' : 'Due'} Payment Date`}
            className='mr-3'
            isRequired
          >
            <DatePicker />
          </InputGroup>
          <InputGroup label={`${isPaid ? '' : 'Due'} Payment Time`} isRequired>
            <TimePicker required />
          </InputGroup>
        </div>
        <UploadFile />
      </div>

      {/* Recurring Pattern */}
      {paymentType.isRecurrable && <RecurringConfig />}
    </div>
  )
}

export default AddPayment
