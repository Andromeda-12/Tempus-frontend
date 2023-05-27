import { useUnit } from 'effector-react'
import { TaskList } from '@/widgets/task-list'
import { TaskModal, taskModalModel } from '@/widgets/task-modal'
import { UpdateProjectButton } from '@/features/project/update-project'
import { DeleteProjectButton } from '@/features/project/delete-project'
import { TaskSearch } from '@/features/filter/task-search'
import { AssignTaskFilter } from '@/features/filter/assign-task-filter'
import { CompleteTaskFilter } from '@/features/filter/complete-task-filter'
import { CreateTaskButton } from '@/features/task/create-task'
import { ContentContainer, Spinner } from '@/shared/ui'
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
          </div>

          <div className='mb-3 flex justify-between items-center'>
            <ProjectMembers />

            <HasAccess>
              <CreateTaskButton />
            </HasAccess>
          </div>

          <div className='mb-5 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:items-center'>
            <div className='flex flex-col sm:flex-row sm:space-x-5 space-y-3 sm:space-y-0 '>
              <AssignTaskFilter />
              <CompleteTaskFilter />
            </div>

            <TaskSearch />
          </div>

          <TaskList onSelectTask={openTaskModal} />

          {isTaskModalOpen && <TaskModal />}
        </ContentContainer>
      </div>
    </div>
  )
}
