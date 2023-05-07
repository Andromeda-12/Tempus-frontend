import { useUnit } from 'effector-react'
import { TaskList } from '@/widgets/task-list'
import { TaskModal, taskModalModel } from '@/widgets/task-modal'
import { CreateTaskButton } from '@/features/task/create-task'
import { UpdateProjectButton } from '@/features/project/update-project'
import { DeleteProjectButton } from '@/features/project/delete-project'
import { ContentContainer, Input, Spinner } from '@/shared/ui'
import { TaskDto } from '@/shared/api'
import { WorkspaceCover } from './WorkspaceCover'
import { WorkspaceTitle } from './WorkspaceTitle'
import { ProjectTitle } from './ProjectTitle'
import { HasAccess } from './HasAccess'
import { ProjectMembers } from './ProjectMembers'
import { $isLoadingCurrentProject } from '../model'

export const ProjectPage = ({}) => {
  const isLoading = useUnit($isLoadingCurrentProject)
  const isTaskModalOpen = useUnit(taskModalModel.taskModal.$isOpen)

  const openTaskModal = (selectedTask: TaskDto) => {
    taskModalModel.openModal({ taskId: selectedTask.id })
  }

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
            <WorkspaceTitle />
          </div>

          <div className='mb-2 flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <ProjectTitle />

              <HasAccess>
                <UpdateProjectButton deleteButton={<DeleteProjectButton />} />
              </HasAccess>
            </div>

            <HasAccess>
              <CreateTaskButton />
            </HasAccess>
          </div>

          <div className='mb-7 flex justify-between items-center'>
            <ProjectMembers />

            <Input
              notAccent
              size='sm'
              placeholder='Search title'
              startIconName='search'
            />
          </div>

          <div className='py-0.5 mb-3 px-8 border rounded-xl w-fit'>
            Filters
          </div>

          <TaskList onSelectTask={openTaskModal} />

          {isTaskModalOpen && <TaskModal />}
        </ContentContainer>
      </div>
    </div>
  )
}
