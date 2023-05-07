import { useUnit } from 'effector-react'
import { Input } from '@/shared/ui'
import { $searchTaskTitle, setSearchTaskTitle } from '../model'

export const TaskSearch = () => {
  const searchTaskTitle = useUnit($searchTaskTitle)
  const setSearchTaskTitleFn = useUnit(setSearchTaskTitle)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTaskTitleFn(e.target.value)
  }

  return (
    <Input
      value={searchTaskTitle || ''}
      onChange={handleInput}
      notAccent
      size='sm'
      placeholder='Search title'
      startIconName='search'
    />
  )
}
