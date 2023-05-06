import { useUnit } from 'effector-react'
import { Task, taskModel } from '@/entities/task'
import { TaskDto } from '@/shared/api'

interface TaskListProps {
  onSelectTask: (selectedTask: TaskDto) => void
}

export const TaskList = ({ onSelectTask }: TaskListProps) => {
  const tasks = useUnit(taskModel.$tasks)

  return (
    <div className='grid gap-6 grid-cols-[repeat(auto-fill,minmax(272px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]'>
      {[1, 2, 3, 4, 5].map((task) => (
        <div key={task} onClick={() => onSelectTask(task)}>
          <Task task={task} />
        </div>
      ))}
    </div>
  )
}
