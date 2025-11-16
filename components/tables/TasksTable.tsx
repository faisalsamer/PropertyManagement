'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Task } from '@/types'
import { tasksData } from '@/utils/data'
import { cn } from '@/lib/utils'
import { UserAvatar } from '../costume-ui/name-avatar'
import Tooltip from '../costume-ui/tooltip'
import { formatTimestamp } from '@/utils/formatTime'

export const columns: ColumnDef<Task>[] = [
  //Checkbox
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'type',
    header: () => <div className='text-left'>Task</div>,
    cell: ({ row }) => {
      const { id, type } = row.original

      return (
        <div>
          <div className='text-left texts-table-cell-primary'>{'#' + id}</div>
          <div className='text-left texts-table-cell-secondary text-(--text-secondary)'>
            {type}
          </div>
        </div>
      )
    }
  },

  {
    accessorKey: 'title',
    header: () => <div className='text-left'>Details</div>,
    cell: ({ row }) => {
      const { title, description } = row.original

      return (
        <div>
          <span className='texts-table-cell-primary'>{title}</span>
          <Tooltip
            content={description}
            maxWidth='200px'
            className='texts-table-cell-secondary text-(--text-secondary)'
          >
            {description}
          </Tooltip>
        </div>
      )
    }
  },

  {
    accessorKey: 'property',
    header: () => <div className='text-left'>Property</div>,
    cell: ({ row }) => {
      const { property, room } = row.original

      return (
        <div>
          <div className='text-left texts-table-cell-primary'>{property}</div>
          <div className='text-left texts-table-cell-secondary'>{room}</div>
        </div>
      )
    }
  },

  {
    accessorKey: 'issued_by',
    header: () => {
      return <div className='text-left'>Issued by</div>
    },
    cell: ({ row }) => {
      const { issued_by, issuer_picture, issue_timestamp } = row.original
      return (
        <div className='flex items-end mt-2'>
          <div className={cn('flex items-center gap-[5]', 'text-left')}>
            <UserAvatar name={issued_by} size={30} />

            <div className='flex flex-col'>
              <span className='texts-table-cell-primary'>{issued_by}</span>
              <span className='texts-caption-large text-(--text-secondary)'>
                {formatTimestamp(issue_timestamp)}
              </span>
            </div>
          </div>
        </div>
      )
    }
  },

  {
    accessorKey: 'assignee_name',
    header: () => {
      return <div className='text-left'>Assigned to</div>
    },
    cell: ({ row }) => {
      const { assignee_name, assignee_picture, assignment_timestamp } = row.original

      if (!assignee_name) return <span className='text-left'>—</span>
      return (
        <div className='flex items-end mt-2'>
          <div className={cn('flex items-center gap-[5]', 'text-left')}>
            <UserAvatar name={assignee_name} size={30} />

            <div className='flex flex-col'>
              <span className='texts-table-cell-primary'>{assignee_name}</span>
              <span className='texts-caption-large text-(--text-secondary)'>
                {formatTimestamp(assignment_timestamp)}
              </span>
            </div>
          </div>
        </div>
      )
    }
  },

  {
    accessorKey: 'status',
    header: () => <div className='text-left'>Status</div>,
    cell: ({ row }) => {
      const { status } = row.original
      const rawStatus: Task['status'] = status // e.g., "Under Preparation"
      const statusKey = rawStatus.toLowerCase().replace(/\s/g, '-') // "under-preparation"

      return (
        <div className='text-left'>
          <div
            data-status={statusKey}
            className={cn(
              'status-styles',
              'data-[status=resolved]:bg-green-100 data-[status=resolved]:text-green-800',
              'data-[status=open]:bg-gray-100 data-[status=open]:text-gray-800',
              'data-[status=closed]:bg-blue-100 data-[status=closed]:text-blue-800',
              'data-[status=in-progress]:bg-yellow-100 data-[status=in-progress]:text-yellow-800',
              'data-[status=pending-review]:bg-orange-100 data-[status=pending-review]:text-orange-800'
            )}
          >
            {status}
          </div>
        </div>
      )
    }
  },

  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const property = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(property.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export default function OwnersTable () {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: tasksData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    }
  })

  return (
    <div className='w-full'>
      <div className='overflow-hidden rounded-xl border'>
        <Table>
          <TableHeader className='bg-(--background-secondary)'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
