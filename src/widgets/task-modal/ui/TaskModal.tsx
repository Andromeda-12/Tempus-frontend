import { useUnit } from 'effector-react'
import { ToggleTaskState } from '@/features/task/toggle-task-state'
import { Timer } from '@/features/task/timer'
import { Button } from '@/shared/ui'
import { TaskTitle } from './TaskTitle'
import { TaskCreator } from './TaskCreator'
import { WorkersList } from './WorkersList'
import { TaskDescription } from './TaskDescription'
import { TaskModalContainer } from './TaskModalContainer'
import { $isAssignedOnTask } from '../model'

export const TaskModal = () => {
  const isAssignedOnTask = useUnit($isAssignedOnTask)

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

      <div className='flex items-start justify-between'>
        <span className='text-sm mr-5'>Assignee</span>

        <div className='h-[200px] w-[400px]'>
          <WorkersList />
        </div>
      </div>

      <div className='mt-4 flex justify-end space-x-3'>
        <Button>Edit</Button>
        <Button accent>Complete</Button>
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
