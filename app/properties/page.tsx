import { cn } from '@/lib/utils'
import React from 'react'
import SearchInput from '@/components/costume-ui/SearchInput'
import Button from '@/components/costume-ui/Button'
import {
  AddButtonIcon,
  DeleteButtonIcon,
  ImportButtonIcon
} from '@/components/costume-ui/Icons'
import PropertiesTable from '@/components/tables/PropertiesTable'


const Properties = () => {
  return (
    <div className={cn('flex flex-col gap-2.5', 'h-full')}>
      {/* Heading */}
      <div>
        <h1>Properties</h1>
      </div>
      {/* Actions */}
      <div className={cn('flex justify-between items-center', 'w-full')}>
        <SearchInput placeholder='Search projects' />
        {/* Buttons */}
        <div className={cn('flex items-center gap-2.5', 'py-5')}>
          <Button
            variant='secondary'
            icon={<ImportButtonIcon className='text-neutral-400' />}
            label='Import'
          />

          <Button
            icon={<DeleteButtonIcon />}
            label='Delete'
            className='bg-(--error-main)!'
          />

          <Button
            icon={<AddButtonIcon className='text-neutral-300' />}
            label='Add Property'
          />
        </div>
      </div>
      {/* Table */}
      <div>
        <PropertiesTable />
      </div>
    </div>
  )
}

export default Properties
