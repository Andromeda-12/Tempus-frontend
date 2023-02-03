import { Card, ContentContainer } from '@/shared/ui'

interface Project {
  title: string
  totalTasks: number
  assignedTask: number
}

interface ProjectProps {
  project: Project
}

export const Project = ({ project }: ProjectProps) => {
  const { title, totalTasks, assignedTask } = project

  return (
    <Card withHover>
      <ContentContainer>
        <div>{title}</div>

        {assignedTask > 0 && (
          <div className='text-sm mt-1 opacity-60'>
            {assignedTask} assigned to you
          </div>
        )}

        {assignedTask === 0 && (
          <div className='text-sm mt-1 opacity-60'>
            no assigned tasks
          </div>
        )}

        <div className='text-xs mt-1 opacity-60'>{totalTasks} total tasks</div>
      </ContentContainer>
    </Card>
  )
}
