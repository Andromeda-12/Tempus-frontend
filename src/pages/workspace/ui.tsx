import { useUnit } from 'effector-react'
import { UpdateWorkspaceButton } from '@/features/workspace/update-workspace'
import { ProjectList } from '@/entities/project'
import {
  Button,
  ContentContainer,
  Spinner,
  PageCover,
  Input,
  SquareButton
} from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { $currentWorkspace, $isLoadingCurrentWorkspace } from './model'
import { ProjectsFilter } from '@/features/filter/projects-filter'

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
          <div className='flex justify-between items-center'>
            <div className='flex space-x-2'>
              <h2 className='text-xl'>{currentWorkspace?.title}</h2>
              {/* <SquareButton size='xs' icon='chevronDown' /> */}
            </div>

            <UpdateWorkspaceButton />
          </div>

          <div className='mb-2 mt-2 text-xs'>
            {currentWorkspace?.members.length} members
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
