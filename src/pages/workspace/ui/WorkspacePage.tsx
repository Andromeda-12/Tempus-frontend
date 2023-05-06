import { useUnit } from 'effector-react'
import { ProjectList } from '@/widgets/project-list'
import { CreateProjectButton } from '@/features/project/create-project'
import { ContentContainer, Spinner, Input } from '@/shared/ui'
import { WorkspaceMembers } from './WorkspaceMembers'
import { WorkspaceCover } from './WorkspaceCover'
import { WorkspaceTitle } from './WorkspaceTitle'
import { UpdateWorkspace } from './UpdateWorkspaceButton'
import { HasAccess } from './HasAccess'
import { $isLoadingCurrentWorkspace } from '../model'
import { ProjectSearch } from '@/features/filter/projects-search'

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
          <div className='mb-5 flex justify-between'>
            <div className='flex items-center space-x-2'>
              <WorkspaceTitle />

              <HasAccess>
                <UpdateWorkspace />
              </HasAccess>
            </div>

            <HasAccess>
              <CreateProjectButton />
            </HasAccess>
          </div>

          <div className='mb-7 flex justify-between items-center'>
            <WorkspaceMembers />

            <ProjectSearch />
          </div>

          <ProjectList />
        </ContentContainer>
      </div>
    </div>
  )
}
