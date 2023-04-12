import { useUnit } from 'effector-react'
import { ProjectsFilter } from '@/features/filter/projects-filter'
import { CreateProjectButton } from '@/features/project/create-project'
import { ProjectList } from '@/entities/project'
import { ContentContainer, Spinner, Input } from '@/shared/ui'
import { WorkspaceMembers } from './WorkspaceMembers'
import { WorkspaceCover } from './WorkspaceCover'
import { WorkspaceTitle } from './WorkspaceTitle'
import { UpdateWorkspace } from './UpdateWorkspaceButton'
import { $isLoadingCurrentWorkspace } from '../model'

export const WorkspacePage = () => {
  const isLoading = useUnit($isLoadingCurrentWorkspace)

  if (isLoading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spinner className='h-20 w-20 !border-4' />
      </div>
    )

  return (
    <div className='h-screen flex flex-col py-5 bg-cover bg-center relative'>
      <div className='h-full'>
        <WorkspaceCover />

        <ContentContainer className='mt-5'>
          <div className='flex justify-between'>
            <div className='mb-3 flex items-center space-x-2'>
              <WorkspaceTitle />
              <UpdateWorkspace />
            </div>
            <CreateProjectButton />
          </div>

          <div className='mb-3 flex justify-between items-center'>
            <WorkspaceMembers />
          </div>

          <div className='mb-7 flex items-center justify-between space-x-10'>
            <ProjectsFilter />

            <Input
              notAccent
              size='sm'
              placeholder='Search title'
              startIconName='search'
            />
          </div>

          <ProjectList />
        </ContentContainer>
      </div>
    </div>
  )
}
