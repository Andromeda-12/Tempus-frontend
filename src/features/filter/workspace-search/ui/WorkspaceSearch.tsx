import { useUnit } from 'effector-react'
import { Input } from '@/shared/ui'
import { $searchWorkspaceTitle, setSearchWorkspaceTitle } from '../model'

export const WorkspaceSearch = () => {
  const searchWorkspaceTitle = useUnit($searchWorkspaceTitle)
  const setSearchWorkspaceTitleFn = useUnit(setSearchWorkspaceTitle)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWorkspaceTitleFn(e.target.value)
  }

  return (
    <Input
      value={searchWorkspaceTitle || ''}
      onChange={handleInput}
      notAccent
      size='sm'
      placeholder='Search title'
      startIconName='search'
    />
  )
}
