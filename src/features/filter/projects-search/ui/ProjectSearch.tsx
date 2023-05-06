import { useUnit } from 'effector-react'
import { Input } from '@/shared/ui'
import { $searchProjectTitle, setSearchProjectTitle } from '../model'

export const ProjectSearch = () => {
  const searchProjectTitle = useUnit($searchProjectTitle)
  const setSearchProjectTitleFn = useUnit(setSearchProjectTitle)

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
