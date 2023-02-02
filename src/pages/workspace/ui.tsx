import { useUnit } from 'effector-react'
import { UpdateWorkspaceButton } from '@/features/workspace/update-workspace'
import { ProjectList } from '@/entities/project'
import { Button, ContentContainer, Spinner, PageCover } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { $currentWorkspace, $isLoadingCurrentWorkspace } from './model'

export const WorkspacePage = () => {
  const isLoading = useUnit($isLoadingCurrentWorkspace)

  const currentWorkspace = useUnit($currentWorkspace)

  if (isLoading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spinner className='h-20 w-20 !border-4' />
      </div>
    )

  return (
    <div className='h-screen flex flex-col py-5 bg-cover bg-center relative'>
      <div className='h-full'>
        <PageCover cover={getImageUrl(currentWorkspace?.cover)} />

        <ContentContainer className='mt-5'>
          <div className='flex justify-between'>
            <h2 className='text-xl mb-2'>{currentWorkspace?.title}</h2>
            <UpdateWorkspaceButton />
          </div>

          <div className='mb-7 mt-2 text-xs'>
            {currentWorkspace?.members.length} members
          </div>

          <Button variant='text' dense className='w-24 mb-4'>
            Filters
          </Button>

          <ProjectList />
        </ContentContainer>
      </div>
    </div>
  )
}
