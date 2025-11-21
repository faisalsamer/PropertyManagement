'use client'
import React, { useState } from 'react'
import Button from '@/components/costume-ui/button'
import CollapsibleSection from '@/components/costume-ui/collapsible-section'
import InputGroup from '@/components/costume-ui/input-group'
import Input from '@/components/costume-ui/input'
import Select from '@/components/costume-ui/select'
import { projectsData } from '@/utils/data'
import { House, Building, Store, Plus, Check } from 'lucide-react'
import Option from '@/components/costume-ui/option'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import InputCard from '@/components/costume-ui/input-card'
import InnerSection from '@/components/costume-ui/collapsible-inner-section'
import ReminderSection from '@/components/costume-ui/reminder-section'
import PaymentSection from '@/components/costume-ui/payment-section'
import { useSingleSelectOption } from '@/hooks/useSingleSelectOption'
import AddPageHead from '@/components/costume-ui/add-page-head'

// Main compoennt
const AddProperty = () => {
  const projectTitle: string[] = projectsData.map(project => project.name)
  const { options, selectByIndex } = useSingleSelectOption([
    {
      Icon: House,
      label: 'House',
      isSelected: true
    },
    {
      Icon: Building,
      label: 'Apartment',
      isSelected: false
    },
    {
      Icon: House,
      label: 'Studio',
      isSelected: false
    },
    {
      Icon: Store,
      label: 'Commercial Unit',
      isSelected: false
    }
  ])
  const [isPropertyReady, setIsPropertyReady] = useState<boolean>(false)

  return (
    <div className='flex flex-col gap-5'>
      {/* Head section */}
      <AddPageHead
        crumb_items={[
          { label: 'Properties', href: '/properties' },
          { label: 'Add Property' }
        ]}
        title='Add a property'
        subtitle='Add a new property to your management dashboard'
      />

      {/* Property Details Section */}
      <CollapsibleSection number={1} title='Property Details'>
        {/* Basic Details */}
        <InnerSection
          title='Basic Details'
          subtitle='Enter the property details'
        >
          <div className='inputs-container'>
            <InputGroup label='Code' isRequired>
              <Input placeholder='E.g. B-2-1' maxLength={20} required />
            </InputGroup>
            <InputGroup label='Project' isRequired>
              <Select
                items={projectTitle}
                label='Projects'
                placeholder='Select a project'
                required
              />
            </InputGroup>
          </div>
        </InnerSection>

        {/* Address */}
        <InnerSection title='Address' subtitle='Property location details'>
          <InputGroup label='Street Address' isRequired>
            <Input
              placeholder='E.g. 1234 West Pinecrest Avenue'
              maxLength={150}
              required
            />
          </InputGroup>
          <div className='inputs-container'>
            <InputGroup label='City' isRequired>
              <Input placeholder='E.g. Ayer Keroh' maxLength={100} required />
            </InputGroup>
            <InputGroup label='Postal Code' isRequired>
              <Input
                placeholder='E.g. 50450'
                maxLength={5}
                pattern='\d{5}'
                required
              />{' '}
            </InputGroup>
            <InputGroup label='State'>
              <Input
                defaultValue='Melaka'
                note='Automatically set based on project'
                disabled
              />
            </InputGroup>
            <InputGroup label='Country'>
              <Input defaultValue='Malaysia' disabled />{' '}
            </InputGroup>
          </div>
        </InnerSection>

        {/* Property Type */}
        <InnerSection
          title='Property Type'
          subtitle='Select the type of property'
        >
          <div className='inputs-container'>
            {options.map((option, index) => (
              <Option
                key={index}
                Icon={option.Icon}
                label={option.label}
                isSelected={option.isSelected}
                onClick={() => selectByIndex(index)}
              />
            ))}
          </div>
        </InnerSection>

        {/* Rooms */}
        <InnerSection title='Rooms' subtitle='Add individual rooms (optional)'>
          <InputCard>
            <InputGroup
              className='w-40 sm:w-50 md:w-60 lg:w-80'
              label='Room Title'
              isRequired
            >
              <Input
                className='bg-(--background-primary)'
                placeholder='E.g. Master'
                maxLength={20}
                required
              />
            </InputGroup>
            <div className='flex '>
              <div className='flex items-center gap-2.5 h-10 w-full'>
                <Checkbox className='h-5 w-5 border-(--border-strong) bg-(--background-primary)' />
                <span className='texts-body-medium'>Room is ready</span>
              </div>
            </div>
          </InputCard>
          <Button
            variant='secondary'
            icon={<Plus />}
            label='Add Room'
            isResponsive={false}
          />
        </InnerSection>

        {/* Status */}
        <InnerSection
          title='Status'
          subtitle='Set availability of the property'
        >
          <div className='relative border border-(--border-strong) rounded-md overflow-hidden'>
            <Checkbox
              checked={isPropertyReady}
              className={cn(
                'absolute top-1/2 left-3 -translate-y-1/2',
                'h-6 w-6 border-(--border-strong)'
              )}
            />
            <button
              onClick={() => setIsPropertyReady(prev => !prev)}
              className={cn(
                'flex flex-col justify-center gap-[3]',
                'hover:bg-neutral-50',
                'h-20 w-full px-5 pl-11',
                'cursor-pointer'
              )}
            >
              <div className='flex items-center gap-[5]'>
                <Check
                  size={17}
                  className={cn(
                    isPropertyReady
                      ? 'text-(--success-main)'
                      : 'text-neutral-400'
                  )}
                />
                <span className='texts-body-medium'>
                  Property is ready for occupancy
                </span>
              </div>
              <span className='texts-caption-large text-left text-(--text-secondary)'>
                Check this if the property is move-in ready
              </span>
            </button>
          </div>
        </InnerSection>
      </CollapsibleSection>

      {/* Default Payment Details */}
      <PaymentSection
        sectionNumber={2}
        title='Default Payment Details (Optional)'
      />

      {/* Default Reminder */}
      <ReminderSection sectionNumber={3} title='Default Reminders (Optional)' />
    </div>
  )
}

export default AddProperty
