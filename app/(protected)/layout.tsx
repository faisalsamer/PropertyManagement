import { cookies } from "next/headers"
import { SidebarProvider } from '@/components/ui/sidebar'
import Sidebar from '@/components/app-sidebar'
import { cn } from '@/lib/utils'

export default async function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen} className='px-[15]'>
      <main className={cn('flex gap-2.5', 'h-screen w-full py-[15] ')}>
        <Sidebar />
        <div
          className={cn(
            'w-full p-7.5',
            'bg-(--background-primary) border border-(--border-default)',
            'rounded-[15] overflow-auto'
          )}
        >
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
