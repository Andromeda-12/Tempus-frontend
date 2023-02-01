import { viewerModel } from '@/entities/viewer'
import { WorkspaceDto } from '@/shared/api'
import { Card, CardCover, Icon, SquareButton } from '@/shared/ui'
import { useUnit } from 'effector-react'

export interface WorkspaceProps {
  workspace: WorkspaceDto
}

export const Workspace = ({ workspace }: WorkspaceProps) => {
  const { title, cover, owner } = workspace
  // projects
  const viewer = useUnit(viewerModel.$viewer)

  let own = false
  if (viewer) own = owner.id === viewer.id

  return (
    <Card className='relative' withHover>
      {own && <OwnMark />}
      <CardCover cover={cover} />

      <div className='px-5 py-2  flex justify-between'>
        <div className=' '>
          <div className='text-ellipsis font-medium overflow-hidden whitespace-nowrap h-[20px] mb-2'>
            {title}
          </div>

          <div className='font-light text-sm text-color-light/60 dark:text-color-dark/50'>
            {/* Projects: {projects?.length} */}
            Projects: {0}
          </div>
        </div>

        <div className='flex items-start'>
          <SquareButton
            className=''
            variant='text'
            icon='ellipsisHorizontal'
            onClick={(e) => e.preventDefault()}
          />
        </div>

      </div>
    </Card>
  )
}

const OwnMark = () => (
  <div className='absolute right-2 top-2 bg-background-light/60 dark:bg-background-dark/40 py-1 px-2 text-xs rounded-full'>
    own
  </div>
)
