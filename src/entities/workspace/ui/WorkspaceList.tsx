import { useEffect } from 'react'
import { useEvent, useGate, useStore, useUnit } from 'effector-react'
import { Workspace } from './Workspace'
import {
  $isAllDataLoaded,
  $isLoading,
  $workspaces,
  loadMoreWorkspaces,
  workspaceGate
} from '../model'
import { Spinner } from '@/shared/ui'
import { useDebounce } from '@/shared/lib'
import { Link } from 'atomic-router-react'
import { workspaceRoute } from '@/shared/routing'

interface Workspace {
  id: number
  cover: string
  title: string
  projectsCount: number
  own: boolean
}

interface WorkspaceListProps {
  // workspaces: Workspace[]
}

export const WorkspaceList = ({}: WorkspaceListProps) => {
  useGate(workspaceGate)

  const isAllDataLoaded = useUnit($isAllDataLoaded)
  const workspaces = useUnit($workspaces)
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

  return (
    <div className='grid gap-6 grid-cols-[repeat(auto-fill,minmax(272px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]'>
      {workspaces.map((workspace) => (
        <Link
          to={workspaceRoute}
          params={{ id: workspace.id }}
          key={workspace.id}
        >
          <Workspace workspace={workspace} />
        </Link>
      ))}

      {isLoading && (
        <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
          <Spinner size='xl' className='border-4' />
        </div>
      )}

      {!isLoading && workspaces.length === 0 && (
        <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
          <h3>No workspaces</h3>
        </div>
      )}
    </div>
  )
}
