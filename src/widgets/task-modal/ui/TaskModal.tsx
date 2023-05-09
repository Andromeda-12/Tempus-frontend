import { useUnit } from 'effector-react'
import { Timer } from '@/features/task/timer'
import { ToggleTaskState } from '@/features/task/toggle-task-state'
import { ManageTaskMembersButton } from '@/features/task/task-assign-members-modal'
import { Button } from '@/shared/ui'
import { TaskTitle } from './TaskTitle'
import { TaskCreator } from './TaskCreator'
import { TaskMembersList } from './TaskMembersList'
import { TaskDescription } from './TaskDescription'
import { TaskModalContainer } from './TaskModalContainer'
import { $isAssignedOnTask } from '../model'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { UpdateTaskButton } from '@/features/task/update-task'
import { DeleteTaskButton } from '@/features/task/delete-task'

export const TaskModal = () => {
  const isAssignedOnTask = useUnit($isAssignedOnTask)
  const workspaceRole = useUnit(currentWorkspaceModel.$workspaceViewerRole)
  const projectRole = useUnit(currentProjectModel.$projectViewerRole)

  const isCanManage =
    workspaceRole === 'Owner' ||
    projectRole === 'Owner' ||
    projectRole === 'Manager'

  return (
    <TaskModalContainer>
      <div className='flex items-center justify-between mb-5 mt-2'>
        <TaskTitle />

        <div className='flex items-center space-x-3 '>
          <Timer disabled={!isAssignedOnTask} />
          <ToggleTaskState disabled={!isAssignedOnTask} />
        </div>
      </div>

      <TaskDescription className='mb-5' />

      <div className='flex justify-between'>
        <span className='text-sm mr-14'>Creator</span>
        <TaskCreator className='mb-5' />
      </div>

      <div className='flex items-start justify-between mb-4'>
        <span className='text-sm '>Assignee</span>
        <TaskMembersList />
      </div>

      {isCanManage && (
        <div className='flex justify-end mb-4'>
          <ManageTaskMembersButton />
        </div>
      )}

      <div className='flex justify-end space-x-3'>
        {isCanManage && (
          <UpdateTaskButton deleteButton={<DeleteTaskButton />} />
        )}

        {isCanManage ? (
          <Button accent>Complete</Button>
        ) : (
          <Button accent>Complete</Button>
        )}
      </div>
    </TaskModalContainer>
  )
}

{
  /* <TaskModalContainer>
<div className='flex space-x-10 h-[300px]'>
  <div className='w-7/12 flex flex-col'>
    <div className='mb-5'>
      <TaskTitle />
    </div>

    <TaskDescription className='mb-2' />

    <div className='flex flex-col items-center justify-end relative top-0'>
      <div className='flex items-center space-x-5 '>
        <div className='text-4xl font-semibold'>13:41</div>
        <IconButton
          icon='play'
          size='xl'
          variant='outline'
          className='!h-[80px] !w-[80px] !text-lg'
        />
      </div>
    </div>
  </div>

  <div className='w-5/12'>
    <div className='w-full flex'>
      <div className='w-3/12'>
        <span className='text-sm mr-5'>Creator</span>
      </div>

      <div className='w-9/12'>
        <TaskCreator className='mb-5' />
      </div>
    </div>

    <div className='w-full flex'>
      <div className='w-3/12'>
        <div className='text-sm'>Assignee</div>
      </div>

      <div className='w-9/12'>
        <WorkersList />
      </div>
    </div>
  </div>
</div>

<div className='flex justify-end space-x-3'>
  <Button>Edit</Button>
  <Button accent>Complete</Button>
</div>
</TaskModalContainer> */
}
