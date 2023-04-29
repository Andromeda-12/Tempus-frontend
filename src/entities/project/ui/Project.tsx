import { Card, ContentContainer } from '@/shared/ui'
import { ProjectDto } from '@/shared/api'

interface ProjectProps {
  project: ProjectDto
}

export const Project = ({ project }: ProjectProps) => {
  const { title } = project
  const totalTasks = 0
  const assignedTask = 0

  return (
    <Card withHover>
      <ContentContainer>
        <div>{title}</div>

        <AssignedTaskText assignedTask={assignedTask} />

        <div className='text-xs mt-1 opacity-60'>{totalTasks} total tasks</div>
      </ContentContainer>
    </Card>
  )
}

const AssignedTaskText = ({ assignedTask }: { assignedTask: number }) => {
  if (assignedTask === 0)
    return <div className='text-sm mt-1 opacity-60'>no assigned tasks</div>

  return (
    <div className='text-sm mt-1 opacity-60'>
      {assignedTask} assigned to you
    </div>
  )
}
