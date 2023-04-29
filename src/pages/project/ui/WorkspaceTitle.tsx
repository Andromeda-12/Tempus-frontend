import { useUnit } from 'effector-react'
import { Link } from 'atomic-router-react'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { workspaceRoute } from '@/shared/routing'

export const WorkspaceTitle = () => {
  const currentWorkspace = useUnit(currentWorkspaceModel.$currentWorkspace)

  if (!currentWorkspace) return <div></div>

  return (
    <Link className='hover:text-color-light/60 dark:hover:text-color-dark/60 duration-150' to={workspaceRoute} params={{ workspaceId: currentWorkspace.id }}>
      <h2 className='text-xl font-bold'>{currentWorkspace.title}</h2>
    </Link>
  )
}
