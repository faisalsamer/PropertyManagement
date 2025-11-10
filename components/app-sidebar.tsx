'use client'
// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuSubButton,
  SidebarGroupLabel,
  useSidebar
} from '@/components/ui/sidebar'
// import { IoIosArrowForward } from "react-icons/io";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import {
  GaugeIcon,
  ProjectIcon,
  HouseIcon,
  TransactionsIcon,
  PoepleIcon,
  ScreeningIcon,
  ClipboardIcon,
  NoticesIcon,
  ReportsIcon,
  SupportIcon,
  SettingsIcon
} from './costume-ui/Icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AppSidebar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sidebarHovered, setSidebarHovered] = useState<boolean>(false)
  const { open: isSidebarOpen } = useSidebar()
  const pathname = usePathname()

  type menuItemContentType = {
    icon: any
    label: string
    width?: string
    href?: string
    subMenu?: {
      label: string
      href?: string
    }[]
  }

  const menuItemContent: menuItemContentType[] = [
    {
      icon: GaugeIcon,
      label: 'Dashboard',
      width: 'w-6!'
    },
    {
      icon: ProjectIcon,
      label: 'Projects',
      width: 'w-6!',
      href: '/projects'
    },
    {
      icon: HouseIcon,
      label: 'Properties',
      width: 'w-5.5!',
      subMenu: [
        { label: 'Properties', href: '/properties' },
        { label: 'Rooms' }
      ]
    },
    {
      icon: TransactionsIcon,
      label: 'Transactions',
      width: 'w-6!'
    },
    {
      icon: PoepleIcon,
      label: 'People',
      width: 'w-5.5!'
    },
    {
      icon: ScreeningIcon,
      label: 'Tenant Screening',
      width: 'w-5!'
    },
    {
      icon: ClipboardIcon,
      label: 'Work Operations',
      width: 'w-5!'
    },
    {
      icon: NoticesIcon,
      label: 'Notices',
      width: 'w-5!'
    },
    {
      icon: ReportsIcon,
      label: 'Staff',
      width: 'w-5!'
    }
  ]

  const helpItemContent: menuItemContentType[] = [
    {
      icon: SupportIcon,
      label: 'Support',
      width: 'w-5!'
    },
    {
      icon: SettingsIcon,
      label: 'Settings',
      width: 'w-5!'
    }
  ]

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarHovered(false)
    }
  }, [isSidebarOpen])

  return (
    <Sidebar
      className={cn(
        'relative!',
        'h-full min-h-100 max-h-300 px-2.5!',
        'border-none',
        'select-none'
      )}
      variant='sidebar'
      onMouseEnter={() => {
        !isSidebarOpen && setSidebarHovered(true)
      }}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      {/* bg-(--background-secondary) */}
      <SidebarHeader
        className={cn(
          'relative flex flex-row items-center justify-between overflow-hidden',
          !isSidebarOpen && 'justify-between!',
          'px-2 py-4 pb-5 h-[85px] mb-7.5',
          'border-b border-(--border-strong)'
        )}
      >
        <div
          className={cn(
            'flex items-center  w-full pl-2.5 transition-opacity duration-0 opacity-100 gap-2',
            !isSidebarOpen && sidebarHovered && 'opacity-0'
          )}
        >
          <Image src='/icons/logo.png' width={20} height={20} alt='logo' />
          {/* <img src={logo} className='w-10 h-10' alt='logo' /> */}
          <div
            className='overflow-hidden transition-all duration-200'
            style={{ maxWidth: isSidebarOpen ? '200px' : '0px' }}
          >
            <h2 className='texts-heading-h2 opacity-100 transition-opacity duration-200'>
              EzyRoom
            </h2>
          </div>
        </div>

        {!isSidebarOpen && (
          <SidebarTrigger
            className={cn(
              'absolute! top-1/2 left-1/2 -translate-1/2 transition-opacity duration-0',
              sidebarHovered ? 'opacity-100' : 'opacity-0',
              'h-10! w-10!',
              'hover:bg-neutral-200/70 active:bg-neutral-200 text-neutral-100!',
              'rounded-[10px]! cursor-e-resize'
            )}
          />
        )}
        <div
          className={cn(
            'absolute left-0',
            'flex items-center justify-end',
            'w-60 h-fit pr-1',
            !isSidebarOpen && '-z-50'
          )}
        >
          <SidebarTrigger
            className={cn(
              'h-10! w-10!',
              'hover:bg-neutral-200/70 active:bg-neutral-200 text-neutral-100!',
              'rounded-[10px]! cursor-e-resize'
            )}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className='gap-4!'>
        {/* Menu */}
        <SidebarGroup className='p-0 gap-2.5!'>
          <SidebarGroupLabel
            className={cn('texts-label-small text-neutral-500', 'p-0 h-auto')}
          >
            MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-2.5'>
              {menuItemContent.map((item, index) => {
                const hasSubMenu = item.subMenu && item.subMenu.length > 0
                const hasActiveSubItem =
                  hasSubMenu &&
                  item.subMenu?.some(subItem => pathname === subItem.href)

                if (hasSubMenu) {
                  return (
                    <Collapsible
                      key={item.label}
                      open={isMenuOpen}
                      onOpenChange={setIsMenuOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            `${
                              hasActiveSubItem
                                ? 'border border-(--border-strong) bg-(--background-primary) shadows-sm duration-0'
                                : 'hover:bg-neutral-200/50 active:bg-neutral-200/90 cursor-pointer duration-100'
                            }`,
                            !isSidebarOpen && index === 0 && 'mt-1',
                            'text-neutral-600!',
                            'transition-colors',
                            'texts-body-medium-medium leading-none',
                            'h-11! px-4',
                            'rounded-lg',
                            'justify-between'
                          )}
                        >
                          <span className='flex items-center gap-3'>
                            <item.icon
                              className={cn(item.width, 'flex-shrink-0')}
                            />
                            {item.label}
                          </span>
                          <svg
                            className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              isMenuOpen && 'rotate-90'
                            )}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5l7 7-7 7'
                            />
                          </svg>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='mt-1 ml-4 space-y-1'>
                        {item.subMenu?.map(subItem => {
                          const isSubItemActive = pathname === subItem.href
                          return (
                            <SidebarMenuButton key={subItem.label} asChild>
                              <Link
                                href={subItem.href || '/'}
                                onClick={e => {
                                  e.stopPropagation() // Prevent bubbling to CollapsibleTrigger
                                }}
                                className={cn(
                                  `${
                                    isSubItemActive
                                      ? 'bg-neutral-200/70 text-neutral-900 font-medium'
                                      : 'hover:bg-neutral-200/50 active:bg-neutral-200/90'
                                  }`,
                                  'cursor-pointer',
                                  'text-neutral-600!',
                                  'texts-body-medium-medium',
                                  'h-10! pl-8 pr-4',
                                  'rounded-lg',
                                  'transition-colors'
                                )}
                              >
                                {subItem.label}
                              </Link>
                            </SidebarMenuButton>
                          )
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  )
                }

                // Regular menu item
                const isActive = pathname === item?.href

                return (
                  <SidebarMenuItem key={item.label} className='px-0!'>
                    <SidebarMenuButton
                      className={cn(
                        `${
                          isActive
                            ? 'border border-(--border-strong) bg-(--background-primary) shadows-sm duration-0'
                            : 'hover:bg-neutral-200/50 active:bg-neutral-200/90 cursor-pointer duration-100'
                        }`,
                        !isSidebarOpen && index === 0 && 'mt-1',
                        'text-neutral-600!',
                        'transition-colors ',
                        'texts-body-medium-medium leading-none',
                        'h-11! px-4',
                        'rounded-lg'
                      )}
                      asChild
                    >
                      <Link
                        className={cn(
                          'flex items-center gap-2!',
                          'w-[30px] h-[30px]'
                        )}
                        href={item.href || '/'}
                      >
                        <div
                          className={cn(
                            'flex justify-center items-center',
                            'w-6 h-auto'
                          )}
                        >
                          <item.icon
                            className={`text-neutral-600 ${item.width} h-auto!`}
                          />
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Help & Support */}
        <SidebarGroup className='px-0 gap-2.5!'>
          <SidebarGroupLabel
            className={cn('texts-label-small text-neutral-500', 'p-0 h-auto')}
          >
            HELP & SUPPORT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-2.5'>
              {helpItemContent.map(item => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.label} className='px-0!'>
                    <SidebarMenuButton
                      className={cn(
                        `${
                          isActive
                            ? 'border border-(--border-strong) bg-(--background-primary) shadows-sm duration-0'
                            : 'hover:bg-neutral-200/50 active:bg-neutral-200/90 cursor-pointer duration-100'
                        }`,
                        'text-neutral-600!',
                        'transition-colors ',
                        'texts-body-medium-medium leading-none',
                        'h-11! px-4',
                        'rounded-lg'
                      )}
                      asChild
                    >
                      <a
                        className={cn(
                          'flex items-center gap-2!',
                          'w-[30px] h-[30px]'
                        )}
                      >
                        <div
                          className={cn(
                            'flex justify-center items-center',
                            'w-6 h-auto'
                          )}
                        >
                          <item.icon
                            className={`text-neutral-600 ${item.width} h-auto!`}
                          />
                        </div>
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter
          className={cn(
            'flex flex-row items-center',
            'h-[70px] px-10',
            'texts-body-large-semibold',
            'hover:bg-neutral-200/50 text-(--text-secondary) border-(--border-strong)',
            'border-t cursor-pointer'
          )}
        >
          <Icon name='logout' size={24} color='' />
          <span>Logout</span>
        </SidebarFooter> */}
    </Sidebar>
  )
}
