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
import Tooltip from '../costume-ui/tooltip'
import { Payment } from '@/types'
import { paymentsData } from '@/utils/data'
import { cn } from '@/lib/utils'
import { formatDate, formatTimestamp } from '@/utils/formatTime'
import { Repeat } from 'lucide-react'
import { formatCurrency } from '@/utils/formatCurrency'
import { Progress } from '../ui/progress'
import Image from 'next/image'
import { UserAvatar } from '@/components/costume-ui/name-avatar'
import { Table as CostumTable } from '../costume-ui/table'

type Props = {
  showPropertyColumn?: boolean
  className?: string
}

export default function PaymentsTable ({ showPropertyColumn, className = '' }: Props) {
  const columns: ColumnDef<Payment>[] = [
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
      header: () => <div className='text-left'>Transaction</div>,
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
    ...(showPropertyColumn
      ? ([
          {
            accessorKey: 'property',
            header: () => <div className='text-left'>Property</div>,
            cell: ({ row }) => {
              const { property, room } = row.original
              return (
                <div>
                  <div className='text-left texts-table-cell-primary'>
                    {property}
                  </div>
                  <div className='text-left texts-table-cell-secondary'>
                    {room}
                  </div>
                </div>
              )
            }
          } as ColumnDef<Payment>
        ] as ColumnDef<Payment>[])
      : []),

    {
      accessorKey: 'due_date',
      header: () => <div className='text-left'>Due Date</div>,
      cell: ({ row }) => {
        const { due_date, recurring_pattern, recurring_pattern_description } =
          row.original
        const rawPattern: Payment['recurring_pattern'] = recurring_pattern
        const patternKey = rawPattern.toLowerCase().replace(/\s/g, '-')

        return (
          <>
            <div className='text-left mb-1'>{formatDate(due_date)}</div>
            <div
              data-pattern={patternKey}
              className={cn(
                'flex items-center gap-[5]',
                'text-left texts-table-cell-secondary',
                'data-[pattern=one-time]:bg-neutral-100 data-[pattern=one-time]:text-(--text-secondary)',
                'data-[pattern=recurring]:bg-(--info-light) data-[pattern=recurring]:text-(--info-main)',
                'py-[3px] px-2 w-fit',
                'rounded-full select-none'
              )}
            >
              {patternKey === 'recurring' ? (
                <>
                  <Tooltip
                    variant='description'
                    content={recurring_pattern_description}
                    className='flex items-center gap-[5]'
                  >
                    <Repeat strokeWidth={2} size={12} />
                    {recurring_pattern}
                  </Tooltip>
                </>
              ) : (
                recurring_pattern
              )}
            </div>
          </>
        )
      }
    },

    {
      accessorKey: 'amount',
      header: () => <div className='text-left'>Amount</div>,
      cell: ({ row }) => {
        const { amount, status } = row.original
        const rawStatus: Payment['status'] = status // e.g., "Under Preparation"
        const statusKey = rawStatus.toLowerCase().replace(/\s/g, '-') // "under-preparation"

        return (
          <>
            <div className='texts-body-large-medium text-left mb-1'>
              {amount}
            </div>
            <div className='texts-table-cell-primary text-left'>
              <div
                data-status={statusKey}
                className={cn(
                  'status-styles',
                  'data-[status=paid]:bg-green-100 data-[status=paid]:text-green-800',
                  'data-[status=paid-late]:bg-yellow-100 data-[status=paid-late]:text-yellow-800',
                  'data-[status=pending]:bg-gray-100 data-[status=pending]:text-gray-800',
                  'data-[status=overdue]:bg-red-100 data-[status=overdue]:text-red-800'
                )}
              >
                {status}
              </div>
            </div>
          </>
        )
      }
    },

    {
      accessorKey: 'payment_percentage',
      header: () => <div className='text-left'>Payment & Tenant</div>,
      cell: ({ row }) => {
        const {
          amount,
          payment_percentage,
          tenant_name,
          tenant_picture,
          latest_payment_timestamp
        } = row.original
        const remaindingAmount = amount * (payment_percentage / 100)

        return (
          <div>
            <>
              <>
                <div className='flex items-center justify-between mb-1'>
                  <div className='text-left texts-caption-large mr-4'>
                    {payment_percentage}% Paid
                  </div>
                  <div className='text-left texts-caption-small text-(--text-secondary)'>
                    {formatCurrency(remaindingAmount)} remaining
                  </div>
                </div>
                <Progress value={payment_percentage} />
              </>
            </>
            <div className='flex items-end mt-2'>
              <div className={cn('flex items-center gap-[5]', 'text-left')}>
                <UserAvatar name={tenant_name} size={30} />

                <div className='flex flex-col'>
                  <span className='texts-table-cell-primary'>
                    {tenant_name}
                  </span>
                  <span className='texts-caption-large text-(--text-secondary)'>
                    {formatTimestamp(latest_payment_timestamp)}
                  </span>
                </div>
              </div>
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

  return <CostumTable columns={columns} className={className} />
}

// export default function PaymentsTable () {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [rowSelection, setRowSelection] = React.useState({})

//   const table = useReactTable({
//     data: paymentsData,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       rowSelection
//     }
//   })

//   return (
//     <div className='w-full'>
//       <div className='overflow-hidden rounded-xl border'>
//         <Table>
//           <TableHeader className='bg-(--background-secondary)'>
//             {table.getHeaderGroups().map(headerGroup => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map(header => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map(row => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && 'selected'}
//                 >
//                   {row.getVisibleCells().map(cell => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className='h-24 text-center'
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className='flex items-center justify-end space-x-2 py-4'>
//         <div className='text-muted-foreground flex-1 text-sm'>
//           {table.getFilteredSelectedRowModel().rows.length} of{' '}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className='space-x-2'>
//           <Button
//             variant='outline'
//             size='sm'
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant='outline'
//             size='sm'
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
