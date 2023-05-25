import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { Timer } from '@/features/task/timer'
import { UpdateTaskButton } from '@/features/task/update-task'
import { DeleteTaskButton } from '@/features/task/delete-task'
import { CompleteTaskButton } from '@/features/task/complete-task'
import { MemberToggleCompleteButton } from '@/features/task/member-toggle-complete'
import { ManageTaskMembersButton } from '@/features/manage-members/manage-task-members-modal'
import { ToggleTaskState } from '@/features/task/toggle-task-state'
import { currentTaskModel } from '@/entities/current-task'
import { currentProjectModel } from '@/entities/current-project'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { Divider, Show } from '@/shared/ui'
import { TaskTitle } from './TaskTitle'
import { TaskCreator } from './TaskCreator'
import { TaskDescription } from './TaskDescription'
import { TaskMembersList } from './TaskMembersList'
import { TaskModalContainer } from './TaskModalContainer'
import { $isAssignedOnTask } from '../model'
import { CompleteMark } from './CompleteMark'

export const TaskModal = () => {
  const isAssignedOnTask = useUnit($isAssignedOnTask)
  const workspaceRole = useUnit(currentWorkspaceModel.$workspaceViewerRole)
  const projectRole = useUnit(currentProjectModel.$projectViewerRole)
  const currentTask = useUnit(currentTaskModel.$currentTask)
  const memberProgress = useUnit(currentTaskModel.$memberProgress)

  const isCanManage =
    workspaceRole === 'Owner' ||
    projectRole === 'Owner' ||
    projectRole === 'Manager'
  const isTaskCompleted = !!currentTask?.isComplete

  return (
    <TaskModalContainer>
      <div className='space-y-5'>
        <div className='flex items-center justify-between mt-2 '>
          <div className='flex items-center space-x-3'>
            <TaskTitle />

            <Show when={isTaskCompleted}>
              <CompleteMark />
            </Show>
          </div>

          <div className='flex items-center space-x-3'>
            <Timer disabled={!isAssignedOnTask || memberProgress?.isComplete} />
            <ToggleTaskState
              disabled={!isAssignedOnTask || memberProgress?.isComplete}
            />
          </div>
        </div>

        <TaskDescription />

        <Divider />

        <div className='flex justify-between'>
          <span className='text-xs sm:text-sm mr-14'>Creator</span>
          <TaskCreator />
        </div>

        <div className='flex items-start justify-between'>
          <span className='text-xs sm:text-sm mr-3'>Assignee</span>
          <TaskMembersList />
        </div>

        <Show when={isCanManage && !isTaskCompleted}>
          <div className='flex justify-end'>
            <ManageTaskMembersButton />
          </div>
        </Show>

        <div
          className={clsx(
            'flex',
            isCanManage ? 'justify-between' : 'justify-end'
          )}
        >
          <Show when={isCanManage}>
            <UpdateTaskButton deleteButton={<DeleteTaskButton />} />
          </Show>

          <Show when={!isTaskCompleted}>
            <div className='flex justify-end space-x-3'>
              <Show when={isAssignedOnTask}>
                <MemberToggleCompleteButton />
              </Show>

              <Show when={isCanManage}>
                <CompleteTaskButton />
              </Show>
            </div>
          </Show>
        </div>
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
