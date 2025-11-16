import { useState } from 'react'

export type SingleSelectItem = {
  label: string
  isSelected: boolean
  Icon?: React.ComponentType<any>
}

export function useSingleSelectOption (items: SingleSelectItem[]) {
  const [options, setOptions] = useState<SingleSelectItem[]>(items)

  const selectByIndex = (index: number) => {
    setOptions(prev =>
      prev.map((option, i) => ({
        ...option,
        isSelected: i === index
      }))
    )
  }

  return { options, selectByIndex }
}
