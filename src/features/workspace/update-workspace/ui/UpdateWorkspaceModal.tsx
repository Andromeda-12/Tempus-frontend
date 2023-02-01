import { workspaceModel } from '@/entities/workspace'
import { UpdateWorkspaceDto } from '@/shared/api'
import { MAX_COVER_SIZE } from '@/shared/config'
import { Button, FormField, Modal } from '@/shared/ui'
import { ImageUpload } from '@/shared/ui/ImageUpload'
import { useEvent, useUnit } from 'effector-react'
import { Controller, useForm } from 'react-hook-form'
import { updateWorkspaceModal } from '../model'

interface UpdateWorkspaceModalProps {}

interface IFormData {
  workspaceTitle: string
  workspaceCover: File | string | null
}

const defaultValues = {
  workspaceTitle: '',
  workspaceCover: null
}

export const UpdateWorkspaceModal = ({}: UpdateWorkspaceModalProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IFormData>({
    defaultValues
  })

  const isOpen = useUnit(updateWorkspaceModal.$isOpen)
  const closeModal = useUnit(updateWorkspaceModal.closeModal)

  const updateWorkspaceFn = useEvent(workspaceModel.updateWorkspace)

  const sendFormData = (formData: IFormData) => {
    const updateWorkspaceDto: UpdateWorkspaceDto = {
      title: formData.workspaceTitle,
      coverFile: formData.workspaceCover as File
    }

    const updateWorkspaceFormData = new FormData()

    Object.keys(updateWorkspaceDto).forEach((key) => {
      if (key === 'coverFile') return
      updateWorkspaceFormData.append(key, (updateWorkspaceDto as any)[key])
    })
    if (updateWorkspaceDto.coverFile)
      updateWorkspaceFormData.append('cover', updateWorkspaceDto.coverFile)

    updateWorkspaceFn(updateWorkspaceFormData)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  const getPreview = (value: string | File | null) => {
    if (typeof value === 'string') return value
    if (value instanceof File) return URL.createObjectURL(value)

    return value
  }

  return (
    <Modal
      className='w-full max-w-4xl'
      title='Update workspace'
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
