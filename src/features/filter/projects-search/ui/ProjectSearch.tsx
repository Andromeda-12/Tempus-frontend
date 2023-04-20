import { useUnit } from 'effector-react'
import { Input } from '@/shared/ui'
import { $searchProjectTitle, setSearchProjectTitle } from '../model'

export const ProjectSearch = () => {
  const setSearchProjectTitleFn = useUnit(setSearchProjectTitle)
  const searchProjectTitle = useUnit($searchProjectTitle)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProjectTitleFn(e.target.value)
  }

  return (
    <Input
      value={searchProjectTitle || ''}
      onChange={handleInput}
      notAccent
      size='sm'
      placeholder='Search title'
      startIconName='search'
    />
  )
}
