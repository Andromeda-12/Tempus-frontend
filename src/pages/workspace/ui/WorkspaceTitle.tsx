import { useUnit } from 'effector-react'
import { $currentWorkspace } from '../model'

export const WorkspaceTitle = () => {
  const currentWorkspace = useUnit($currentWorkspace)
  return <h2 className='text-xl font-bold'>{currentWorkspace?.title}</h2>
}
