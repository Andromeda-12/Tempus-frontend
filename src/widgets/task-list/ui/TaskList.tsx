import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Task, taskModel } from '@/entities/task'
import { Spinner } from '@/shared/ui'
import { TaskDto } from '@/shared/api'
import { $isAllDataLoaded, $isLoading, loadMoreTasks } from '../model'

interface TaskListProps {
  onSelectTask: (selectedTask: TaskDto) => void
}

export const TaskList = ({ onSelectTask }: TaskListProps) => {
  const tasks = useUnit(taskModel.$reversedTasks)

  const isAllDataLoaded = useUnit($isAllDataLoaded)
  const isLoading = useUnit($isLoading)
  const loadMoreTasksFn = useUnit(loadMoreTasks)

  const scrollHanlder = (e: Event) => {
    const document = e.target as Document

    if (
      !isAllDataLoaded &&
      document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.scrollHeight - 300
    )
      loadMoreTasksFn()
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHanlder)

    return () => {
      document.removeEventListener('scroll', scrollHanlder)
    }
  }, [isAllDataLoaded])

  if (isLoading)
    return (
      <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
        <Spinner className='border-4' />
      </div>
    )

  if (tasks.length === 0)
    return (
      <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
        <h3>No tasks</h3>
      </div>
    )

  return (
    <div className='grid gap-6 grid-cols-[repeat(auto-fill,minmax(272px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]'>
      {tasks.map((task) => (
        <div key={task.id} onClick={() => onSelectTask(task)}>
          <Task task={task} />
        </div>
      ))}
    </div>
  )
}
