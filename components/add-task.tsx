'use client'
import Combobox from './costume-ui/combobox'
import Input from './costume-ui/input'
import InputGroup from './costume-ui/input-group'
import { staffData } from '@/utils/data'
import Select from './costume-ui/select'
import { ComboBoxitemsType } from '@/types'
import { propertiesData, roomsData, taskTypes } from '@/utils/data'
import InputCard from './costume-ui/input-card'
import RadioGroup from './costume-ui/radio-group'
import { useState } from 'react'
import TextArea from './costume-ui/text-area'
import { cn } from '@/lib/utils'

const styles = {
  inputsContainer: 'grid grid-cols-2 items-start gap-5'
}

const AddTask = () => {
  const [showRoomSelect, setShowRoomSelect] = useState<boolean>(false)
  const Rooms: string[] = roomsData
    .filter(r => r.property === 'Ocean View')
    .map(r => r.title)
  const propertyOptions: string[] = [
    'Select the entire property',
    'Select a specific room'
  ]
  const propertyItems: ComboBoxitemsType[] = propertiesData.map(p => ({
    label: p.code,
    subtitle: p.project
  }))
  const staffItems: ComboBoxitemsType[] = staffData.map(staff => ({
    avatar: staff.staff_picture,
    label: staff.staff_name,
    subtitle: staff.email
  }))

  return (
    <div className='flex flex-col gap-7.5'>
      <InputGroup label='Property' isRequired>
        <Combobox
          items={propertyItems}
          variant='single'
          searchPlaceholder='Search properties'
          placeholder='Select a property'
        />
      </InputGroup>
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
      <div className={styles.inputsContainer}>
        <InputGroup label='Title' isRequired>
          <Input
            placeholder='E.g. Check Kitchen Sink Leaking'
            maxLength={50}
            required
          />
        </InputGroup>
        <InputGroup label='Type' isRequired>
          <Select
            label='Types'
            items={taskTypes}
            placeholder='Select type'
            required
          />
        </InputGroup>
      </div>
      <InputGroup label='Description' isRequired>
        <TextArea placeholder='Type description here' />
      </InputGroup>
      <InputGroup label='Staff' isRequired>
        <Combobox
          items={staffItems}
          searchPlaceholder='Search staff'
          variant='multiple'
          placeholder='Assign staff'
          showAvatar
        />
      </InputGroup>
    </div>
  )
}

export default AddTask
