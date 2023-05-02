import { Controller, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { currentProjectModel } from '@/entities/current-project'
import { Button, Checkbox, FormField, Modal } from '@/shared/ui'
import { UpdateProjectDto } from '@/shared/api'
import { updateProjectModal, updateProject } from '../model'

interface IFormData {
  projectTitle: string
  isHidden: boolean
}

export const UpdateProjectModal = () => {
  const isOpen = useUnit(updateProjectModal.$isOpen)
  const closeModal = useUnit(updateProjectModal.closeModal)
  const updateProjectFn = useUnit(updateProject)
  const currentProject = useUnit(currentProjectModel.$currentProject)

  const defaultValues = {
    projectTitle: currentProject?.title,
    isHidden: currentProject?.isHidden
  }

  const { handleSubmit, control, reset } = useForm<IFormData>({
    defaultValues
  })

  const sendFormData = (formData: IFormData) => {
    const createProjectDto: UpdateProjectDto = {
      title: formData.projectTitle,
      isHidden: formData.isHidden
    }

    updateProjectFn(createProjectDto)

    handleCloseModal()
  }

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  return (
    <Modal
      className='w-full max-w-xl'
      title='Update project'
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

        <Controller
          name='isHidden'
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} label='Hide project' {...field} />
          )}
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
              Update
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
