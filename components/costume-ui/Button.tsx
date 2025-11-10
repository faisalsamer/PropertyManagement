'use client'
import { cn } from '@/lib/utils'

type ButtonType = {
  variant?: 'primary' | 'secondary'
  className?: string
  labelStyles?: string
  icon?: React.ReactNode
  label?: string
}
const Button = ({
  className = '',
  labelStyles = '',
  icon,
  label,
  variant
}: ButtonType) => {
  if (variant === 'secondary') {
    return (
      <button
        className={cn(
          'bg-(--background-primary)! border border-(--border-strong)!',
          'h-10 px-3',
          'flex items-center justify-center gap-1.5 lg:gap-2.5',
          'shadows-xs rounded-lg',
          'hover:bg-neutral-50! cursor-pointer',
          className
        )}
      >
        <div
          className={cn('w-5 h-auto p-0.5', 'flex items-center justify-center')}
        >
          {icon}
        </div>
        <span
          className={cn(
            'texts-button-primary text-(--text-primary)',
            labelStyles
          )}
        >
          <span className='hidden lg:inline'>{label}</span>
          <span className='inline lg:hidden'>{label?.split(' ')[0]}</span>
        </span>
      </button>
    )
  }

  return (
    <button
      className={cn(
        'bg-(--primary-color)',
        'h-10 px-3',
        'flex items-center justify-center gap-1.5 lg:gap-2.5',
        'shadows-sm rounded-lg',
        'hover:opacity-90 cursor-pointer',
        className
      )}
    >
      <div
        className={cn('w-5 h-auto p-0.5', 'flex items-center justify-center')}
      >
        {icon}
      </div>
      <span
        className={cn(
          'texts-button-primary text-(--text-inverse)',
          labelStyles
        )}
      >
        <span className='hidden lg:inline'>{label}</span>
        <span className='inline lg:hidden'>{label?.split(' ')[0]}</span>
      </span>
    </button>
  )
}

export default Button
