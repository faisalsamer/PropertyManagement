import { cn } from '@/lib/utils'
import SearchInput from '@/components/costume-ui/SearchInput'
import Button from '@/components/costume-ui/Button'
import {
  AddButtonIcon,
  DeleteButtonIcon
} from '@/components/costume-ui/Icons'
import RoomsTable from '@/components/tables/RoomsTable'


const Properties = () => {
  return (
    <div className={cn('flex flex-col gap-2.5', 'h-full')}>
      {/* Heading */}
      <div>
        <h1>Rooms</h1>
      </div>
      {/* Actions */}
      <div className={cn('flex justify-between items-center', 'w-full')}>
        <SearchInput placeholder='Search rooms' />
        {/* Buttons */}
        <div className={cn('flex items-center gap-2.5', 'py-5')}>
          <Button
            icon={<DeleteButtonIcon />}
            label='Delete'
            className='bg-(--error-main)!'
          />

          <Button
            icon={<AddButtonIcon className='text-neutral-300' />}
            label='Add Room'
          />
        </div>
      </div>
      {/* Table */}
      <div>
        <RoomsTable />
      </div>
    </div>
  )
}

export default Properties
