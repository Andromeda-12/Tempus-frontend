import { useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Button, FormField, Modal } from '@/shared/ui'
import { CreateProjectDto } from '@/shared/api'
import { createProjectModal, createProject } from '../model'
import { currentWorkspaceModel } from '@/entities/current-workspace'

interface IFormData {
  projectTitle: string
}

const defaultValues = {
  projectTitle: ''
}

export const CreateProjectModal = () => {
  const { handleSubmit, control, reset } = useForm<IFormData>({
    defaultValues
  })

  const currentWorkspace = useUnit(currentWorkspaceModel.$currentWorkspace)
  const isOpen = useUnit(createProjectModal.$isOpen)
  const closeModal = useUnit(createProjectModal.closeModal)
  const createProjectFn = useUnit(createProject)

  const sendFormData = (formData: IFormData) => {
    if (!currentWorkspace) return

    const createProjectDto: CreateProjectDto = {
      title: formData.projectTitle
    }

    createProjectFn(createProjectDto)

    handleCloseModal()
  }

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  return (
    <Modal
      className='w-full max-w-xl'
      title='Create project'
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(sendFormData)} className='space-y-4'>
        <FormField
          placeholder='Title'
          name='projectTitle'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        />

        <div className='flex justify-end'>
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
              Create
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
