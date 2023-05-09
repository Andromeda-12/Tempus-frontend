import { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Button, FormField, Modal, Textarea } from '@/shared/ui'
import { UpdateTaskDto } from '@/shared/api'
import { updateTask, updateTaskModal } from '../model'
import { currentTaskModel } from '@/entities/current-task'

interface UpdateTaskModalProps {
  deleteButton: ReactNode
}

interface IFormData {
  taskTitle: string
  taskDescription: string
}

export const UpdateTaskModal = ({ deleteButton }: UpdateTaskModalProps) => {
  const isOpen = useUnit(updateTaskModal.$isOpen)
  const closeModal = useUnit(updateTaskModal.closeModal)
  const updateTaskFn = useUnit(updateTask)
  const currentTask = useUnit(currentTaskModel.$currentTask)

  const defaultValues = {
    taskTitle: currentTask?.title,
    taskDescription: currentTask?.description
  }

  const { handleSubmit, control, reset } = useForm<IFormData>({
    defaultValues
  })

  const sendFormData = (formData: IFormData) => {
    const updateTaskDto: UpdateTaskDto = {
      title: formData.taskTitle,
      description: formData.taskDescription
    }

    updateTaskFn(updateTaskDto)

    handleCloseModal()
  }

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  return (
    <Modal
      className='w-full max-w-xl'
      title='Update task'
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(sendFormData)} className='space-y-4'>
        <FormField
          placeholder='Title'
          name='taskTitle'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        />

        <Controller
          control={control}
          name='taskDescription'
          render={({ field }) => (
            <Textarea placeholder='Desctiption' rows={6} {...field} />
          )}
        />

        <div className='flex justify-between'>
          <div
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            {deleteButton}
          </div>

          <div className='sm:w-2/5 flex space-x-3'>
            <div className='sm:w-2/5 flex space-x-3'>
              <Button
                className='w-full'
                variant='text'
                type='button'
                onClick={handleCloseModal}
              >
                Cancel
              </Button>

              <Button className='w-full' accent>
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}
