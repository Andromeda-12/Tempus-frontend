import { Button, Card, ContentContainer, Icon } from '@/shared/ui'
import { WorkspaceList } from '@/entities/workspace'
import { Avatar } from '@/shared/ui'
import { PageCover } from '@/shared/ui/PageCover/PageCover'
import { ProjectList } from '@/entities/project'

const workspaces = {
  id: 1,
  cover: 'photo.jpg',
  title: 'My first workspace',
  projectsCount: 1,
  own: true
}

export const WorkspacePage = ({}) => {
  return (
    <div className='h-screen flex flex-col py-5 bg-cover bg-center relative'>
      <div className='h-full'>
        <PageCover cover='' />

        <ContentContainer className='mt-1'>
          <h2 className='text-xl mb-2'>{workspaces.title}</h2>

          <div className='mb-7 mt-2 text-xs'>21 members</div>

          <Button variant='text' dense className='w-24 mb-4'>
            Filters
          </Button>

          <ProjectList />
        </ContentContainer>
      </div>
    </div>
  )
}
