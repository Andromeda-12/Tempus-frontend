import { useUnit } from 'effector-react'
import { TaskModalContainer } from './TaskModalContainer'
import { taskModal } from '../model'
import { TaskCreator } from './TaskCreator'
import { WorkersList } from './WorkersList'

export const TaskModal = () => {

  return <TaskModalContainer>
    <div className='flex'>
      <div className='w-3/4'>

      </div>

      <div className='w-1/4'>
        <TaskCreator />
        <WorkersList />
      </div>

      <div>
        <Button>
          Complete
        </Button>
      </div>
    </div>
  </TaskModalContainer>
}
