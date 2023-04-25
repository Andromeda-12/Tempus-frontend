import { useEffect } from 'react'
import { useEvent, useGate, useUnit } from 'effector-react'
import { Link } from 'atomic-router-react'
import { DeleteWorkspaceButton } from '@/features/workspace/delete-workspace'
import { Workspace } from '@/entities/workspace'
import { workspaceModel } from '@/entities/workspace'
import { workspaceRoute } from '@/shared/routing'
import { Spinner } from '@/shared/ui'
import {
  $isAllDataLoaded,
  $isLoading,
  loadMoreWorkspaces,
  workspaceGate
} from '../model'

export const WorkspaceList = () => {
  useGate(workspaceGate)

  const isAllDataLoaded = useUnit($isAllDataLoaded)
  const workspaces = useUnit(workspaceModel.$workspaces)
  const isLoading = useUnit($isLoading)

  const loadMoreWorkspacesFn = useEvent(loadMoreWorkspaces)

  const scrollHanlder = (e: Event) => {
    const document = e.target as Document

    if (
      !isAllDataLoaded &&
      document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.scrollHeight - 300
    )
      loadMoreWorkspacesFn()
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHanlder)

    return () => {
      document.removeEventListener('scroll', scrollHanlder)
    }
  }, [isAllDataLoaded]) // иначе не обновляется isAllDataLoaded в обработчике скролла

  if (isLoading)
    return (
      <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
        <Spinner className='border-4' />
      </div>
    )

  if (workspaces.length === 0)
    return (
      <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
        <h3>No workspaces</h3>
      </div>
    )

  return (
    <div className='grid gap-6 grid-cols-[repeat(auto-fill,minmax(272px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]'>
      {workspaces.map((workspace) => (
        <Link
          to={workspaceRoute}
          params={{ workspaceId: workspace.id }}
          key={workspace.id}
        >
          <Workspace
            workspace={workspace}
            actions={<DeleteWorkspaceButton workspace={workspace} />}
          />
        </Link>
      ))}
    </div>
  )
}
