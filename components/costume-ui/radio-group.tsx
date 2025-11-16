import { useState } from 'react'

type Props = {
  defaultOption: number
  options: string[]
  onChange?: (value: number) => void
}
const RadioGroup = ({ defaultOption, options, onChange }: Props) => {
  const [selected, setSelected] = useState<number>(defaultOption)

  return (
    <div className='flex gap-3'>
      {options.map((option, index) => (
        <button
          key={index}
          type='button'
          onClick={() => {
            setSelected(index)
            onChange?.(index)
          }}
          className={`flex items-center gap-2 px-5 h-10 w-fit rounded-[5px] border transition-all duration-100 ${
            selected === index
              ? 'border-(--secondary-color) bg-(--secondary-color)/10'
              : 'border-neutral-400'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border transition-all duration-100 ${
              selected === index
                ? 'border-(--secondary-color) border-[3px] bg-(--background-primary)'
                : 'border-neutral-400'
            }`}
          />
          <span className='texts-body-small'>{option}</span>
        </button>
      ))}
    </div>
  )
}

export default RadioGroup
