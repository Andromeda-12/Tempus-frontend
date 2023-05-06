import { useUnit } from 'effector-react'
import {
  Avatar,
  Card,
  ContentContainer,
  Icon,
  Input,
  Spinner,
  Tooltip
} from '@/shared/ui'
import { WorkspaceCover } from './WorkspaceCover'
import { $isLoadingCurrentProject } from '../model'
import { WorkspaceTitle } from './WorkspaceTitle'
import { ProjectTitle } from './ProjectTitle'
import { HasAccess } from './HasAccess'
import { ProjectMembers } from './ProjectMembers'
import { UpdateProjectButton } from '@/features/project/update-project'
import { CreateProjectButton } from '@/features/project/create-project'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { TaskList } from '@/widgets/task-list'
import { TaskDto } from '@/shared/api'
import { TaskModal, taskModalModel } from '@/widgets/task-modal'

const workspaces = {
  id: 1,
  cover: 'photo.jpg',
  title: 'My first workspace',
  projectsCount: 1,
  own: true
}

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

            {/* <HasAccess> */}
            {/* <CreateTaskButton workspace={currentWorkspace} /> */}
            {/* </HasAccess> */}
          </div>

          <div className='mb-2 flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <ProjectTitle />

              <HasAccess>
                <UpdateProjectButton />
              </HasAccess>
            </div>

            <HasAccess>
              <CreateProjectButton />
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
