import { Controller, useForm } from 'react-hook-form'
import { useEvent } from 'effector-react'
import { workspaceModel } from '@/entities/workspace'
import { Button, FormField, Modal, ImageUpload } from '@/shared/ui'
import { MAX_COVER_SIZE } from '@/shared/config'
import { CreateProjectDto, CreateWorkspaceDto } from '@/shared/api'
import { projectModel } from '@/entities/project'

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
}

interface IFormData {
  workspaceTitle: string
  workspaceCover: File | string | null
}

const defaultValues = {
  workspaceTitle: '',
  workspaceCover: null
}

export const CreateProjectModal = ({
  isOpen,
  onClose
}: CreateWorkspaceModalProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IFormData>({
    defaultValues
  })

  const createProjectFn = useEvent(projectModel.createProject)

  const sendFormData = (formData: IFormData) => {
    // const createProjectDto: CreateProjectDto = {
    //   title: formData.workspaceTitle,

    // }

    // createProjectFn(createProjectDto)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    reset()
    onClose()
  }

  const getPreview = (value: string | File | null) => {
    if (typeof value === 'string') return value
    if (value instanceof File) return URL.createObjectURL(value)

    return value
  }

  return (
    <Modal
      className='w-full max-w-4xl'
      title='Create project'
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(sendFormData)} className='space-y-4'>
        <FormField
          placeholder='Title'
          name='workspaceTitle'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        />

        <div className='space-y-4'>
          <div>
            <div>Cover</div>
            <div className='text-xs'>(optional)</div>
          </div>

          <div>
            <Controller
              control={control}
              name='workspaceCover'
              rules={{
                validate: (file) => {
                  if (!file) return true
                  if ((file as File).size > MAX_COVER_SIZE)
                    return `The cover cannot be larger than ${
                      MAX_COVER_SIZE / 1024 / 1024
                    } mb`
                  return true
                }
              }}
              render={({ field: { onChange, value } }) => (
                <ImageUpload
                  className='h-[150px] sm:h-[280px]'
                  preview={getPreview(value)}
                  onChange={onChange}
                />
              )}
            />

            <div className='text-error'>{errors.workspaceCover?.message}</div>
          </div>
        </div>

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
