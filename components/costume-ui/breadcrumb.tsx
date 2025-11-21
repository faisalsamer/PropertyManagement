import Link from 'next/link'
import { Crumb } from '@/types'

type Props = {
  items: Crumb[]
}

export default function Breadcrumb({ items }: Props) {
  return (
    <div className='flex gap-2 texts-body-small text-(--text-secondary)'>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className='flex items-center gap-2'>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className='hover:underline'
              >
                {item.label}
              </Link>
            ) : (
              <span className='text-(--text-primary)'>{item.label}</span>
            )}

            {!isLast && <span>/</span>}
          </div>
        )
      })}
    </div>
  )
}
