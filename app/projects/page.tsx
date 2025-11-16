import { cn } from '@/lib/utils'
import React from 'react'
import SearchInput from '@/components/costume-ui/search-input'
import Button from '@/components/costume-ui/button'
import {
  AddButtonIcon,
  DeleteButtonIcon,
  ImportButtonIcon
} from '@/components/costume-ui/icon'
import ProjectsTable from '@/components/tables/ProjectsTable'
import Dialog from '@/components/costume-ui/dialog'
import AddProject from '@/components/add-project'

const Projects = () => {
  return (
    <div className={cn('flex flex-col gap-2.5', 'h-full')}>
      {/* Heading */}
      <div>
        <h1>Projects</h1>
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

          <Dialog
            openDialogButton={
              <Button
                icon={<AddButtonIcon className='text-neutral-300' />}
                label='Add Project'
                type='button'
              />
            }
            title='Add Project'
            saveButtonLabel='Save'
          >
            <AddProject />
          </Dialog>
        </div>
      </div>
      {/* Table */}
      <div>
        <ProjectsTable />
      </div>
    </div>
  )
}

export default Projects
