'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/costume-ui/button'
import { SaveButtonIcon } from '@/components/costume-ui/icon'
import CollapsibleSection from '@/components/costume-ui/collapsible-section'
import InputGroup from '@/components/costume-ui/input-group'
import Input from '@/components/costume-ui/input'
import Select from '@/components/costume-ui/select'
import { propertiesData } from '@/utils/data'
import { Plus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import InputCard from '@/components/costume-ui/input-card'
import InnerSection from '@/components/costume-ui/collapsible-inner-section'
import ReminderSection from '@/components/costume-ui/reminder-section'
import PaymentSection from '@/components/costume-ui/payment-section'



// Main compoennt
const AddRoom = () => {
  const styles = {
    inputsContainer: 'grid grid-cols-2 gap-5 items-start'
  }
  const propertyCode: string[] = propertiesData.map(property => property.code)
  const [isRoomReady, setIsRoomReady] = useState<boolean>(false)



  return (
    <div className='flex flex-col gap-5'>
      {/* Head section */}
      <section className='flex flex-col gap-2.5'>
        <div className='flex gap-[5] texts-body-small text-(--text-secondary)'>
          <Link href={'/rooms'} className='hover:underline '>
            Rooms
          </Link>
          <span>/</span>
          <span className='text-(--text-primary)'>Add Room</span>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <h2>Add a room</h2>
            <span className='texts-body-medium text-(--text-secondary)'>
              Add a new room under an existing property
            </span>
          </div>
          <Button icon={<SaveButtonIcon />} label='Save' />
        </div>
      </section>

      {/* Rooms Details Section */}
      <CollapsibleSection number={1} title='Room Details'>
        {/* Basic Details */}
        <InnerSection
          title='Basic Details'
          subtitle='Enter the room details'
        >
          <div className={styles.inputsContainer}>
            <InputGroup label='Title' isRequired>
              <Input placeholder='E.g. Master' maxLength={20} required />
            </InputGroup>
            <InputGroup label='Property' isRequired>
              <Select
                items={propertyCode}
                label='Properties'
                placeholder='Select a property'
              />
            </InputGroup>
          </div>
        </InnerSection>

        {/* Status */}
        <InnerSection
          title='Status'
          subtitle='Set availability of the room'
        >
          <div className='relative border border-(--border-strong) rounded-md overflow-hidden'>
            <Checkbox
              checked={isRoomReady}
              className={cn(
                'absolute top-1/2 left-3 -translate-y-1/2',
                'h-6 w-6 border-(--border-strong)'
              )}
            />
            <button
              onClick={() => setIsRoomReady(prev => !prev)}
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
                    isRoomReady
                      ? 'text-(--success-main)'
                      : 'text-neutral-400'
                  )}
                />
                <span className='texts-body-medium'>
                  Room is ready for occupancy
                </span>
              </div>
              <span className='texts-caption-large text-left text-(--text-secondary)'>
                Check this if the room is move-in ready
              </span>
            </button>
          </div>
        </InnerSection>
      </CollapsibleSection>

      {/* Default Payment Details */}
      <PaymentSection sectionNumber={2} title='Default Payment Details (Optional)' />

      {/* Default Reminder */}
      <ReminderSection sectionNumber={3} title='Default Reminders (Optional)' />
    </div>
  )
}

export default AddRoom
