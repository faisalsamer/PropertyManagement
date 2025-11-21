'use client'

import AddPageHead from '@/components/costume-ui/add-page-head'
import ChargesSection from '@/components/costume-ui/charges-section'
import InnerSection from '@/components/costume-ui/collapsible-inner-section'
import Combobox from '@/components/costume-ui/combobox'
import InputGroup from '@/components/costume-ui/input-group'
import Option from '@/components/costume-ui/option'
import RecurringConfig from '@/components/costume-ui/recurring-config'
import Select from '@/components/costume-ui/select'
import { useSingleSelectOption } from '@/hooks/useSingleSelectOption'
import { ComboBoxitemsType, PaymentType } from '@/types'
import {
  propertiesData,
  propertyExpenseTypes,
  contractExpenseTypes,
  companyExpenseTypes,
  ownersData
} from '@/utils/data'
import { House, FileText, User, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const AddExpense = () => {
  const { options, selectByIndex, selectedIndex } = useSingleSelectOption([
    {
      Icon: House,
      label: 'Property Related',
      isSelected: true
    },
    {
      Icon: FileText,
      label: 'Contract Related',
      isSelected: false
    },
    // {
    //   Icon: User,
    //   label: 'Staff Related',
    //   isSelected: false
    // },
    {
      Icon: Building2,
      label: 'Company Related',
      isSelected: false
    }
  ])
  const propertyItems: ComboBoxitemsType[] = propertiesData.map(p => ({
    label: p.code,
    subtitle: p.project
  }))
  const ownerItems: ComboBoxitemsType[] = ownersData.map(o => ({
    avatar: o.owner_picture,
    label: o.owner_name,
    subtitle: o.phone_no
  }))
  const expenseTypes =
    selectedIndex === 0
      ? propertyExpenseTypes
      : selectedIndex === 1
      ? contractExpenseTypes
      : companyExpenseTypes
  const typesOfExpense = expenseTypes.map(et => et.type)
  const [expenseType, setExpenseType] = useState<PaymentType>(expenseTypes[0])
  const selectable: boolean =
    expenseType === expenseTypes[0] && selectedIndex === 1

  useEffect(() => {
    setExpenseType(expenseTypes[0])
  }, [selectedIndex])
  return (
    <div className='flex flex-col gap-5'>
      <AddPageHead
        crumb_items={[
          { label: 'Expenses', href: '/expenses' },
          { label: 'Add Expense' }
        ]}
        title='Add a expense'
        subtitle='Add a new expense you have covered'
        className='mb-7.5'
      />
      <InnerSection title='Basic Details' subtitle='Expense Basic Details'>
        <div className='inputs-container'>
          {options.map((option, index) => (
            <Option
              key={index}
              Icon={option.Icon}
              label={option.label}
              isSelected={option.isSelected}
              onClick={() => {
                selectByIndex(index)
              }}
            />
          ))}
        </div>

        <div className='inputs-container'>
          {selectedIndex === 1 && (
            <InputGroup label='Owner' isRequired>
              <Combobox
                items={ownerItems}
                variant='single'
                searchPlaceholder='Search owners'
                placeholder='Select an owner'
                showAvatar
              />
            </InputGroup>
          )}
          {selectedIndex !== 2 && (
            <InputGroup label='Property' isRequired>
              <Combobox
                items={propertyItems}
                variant='single'
                searchPlaceholder='Search properties'
                placeholder='Select a property'
              />
            </InputGroup>
          )}
          <InputGroup label='Expense Type'>
            <Select
              items={typesOfExpense}
              label='Types'
              placeholder='Select a type'
              value={expenseType.type}
              onValueChange={value => {
                const type = expenseTypes.find(et => et.type === value)
                if (type) setExpenseType(type)
              }}
            />
          </InputGroup>
        </div>
      </InnerSection>
      {/* Charges Section */}
      <ChargesSection flowType='outcome' selectable={selectable} />

      {/* Recurring Pattern */}
      {expenseType.isRecurrable && <RecurringConfig />}
    </div>
  )
}

export default AddExpense
