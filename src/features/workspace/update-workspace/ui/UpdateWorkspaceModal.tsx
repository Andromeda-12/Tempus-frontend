import { useEvent, useUnit } from 'effector-react'
import { Controller, useForm } from 'react-hook-form'
import { Button, FormField, Modal, ImageUpload } from '@/shared/ui'
import { UpdateWorkspaceDto } from '@/shared/api'
import { getImageUrl } from '@/shared/lib'
import { MAX_COVER_SIZE } from '@/shared/config'
import {
  $currentWorkspace,
  updateWorkspace,
  updateWorkspaceModal
} from '../model'
import { ReactNode } from 'react'

interface UpdateWorkspaceModalProps {
  deleteButton: ReactNode
}

interface IFormData {
  workspaceTitle: string
  workspaceCover: File | string | null
}

export const UpdateWorkspaceModal = ({
  deleteButton
}: UpdateWorkspaceModalProps) => {
  const currentWorkspace = useUnit($currentWorkspace)

  const defaultValues = {
    workspaceTitle: currentWorkspace?.title,
    workspaceCover: currentWorkspace?.cover
  }

  const isOpen = useUnit(updateWorkspaceModal.$isOpen)
  const closeModal = useUnit(updateWorkspaceModal.closeModal)

  const updateWorkspaceFn = useEvent(updateWorkspace)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IFormData>({
    defaultValues
  })

  const sendFormData = (formData: IFormData) => {
    const updateWorkspaceDto: UpdateWorkspaceDto = {
      title: formData.workspaceTitle
    }

    if (formData.workspaceCover instanceof File) {
      updateWorkspaceDto.coverFile = formData.workspaceCover as File
    }

    updateWorkspaceFn(updateWorkspaceDto)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  const getPreview = (value: string | File | null) => {
    if (typeof value === 'string') return getImageUrl(value)
    if (value instanceof File) return URL.createObjectURL(value)

    return value
  }

  return (
    <Modal
      className='w-full max-w-6xl'
      title='Update workspace'
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <div className='md:flex space-x-5 sm:space-x-8 mb-4'>
        <form className='space-y-4  w-2/3'>
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
        </form>

        <div className='bg-red-500 w-1/3'>sdf</div>
      </div>

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
          <Button
            className='w-full'
            variant='text'
            type='button'
            onClick={handleCloseModal}
          >
            Cancel
          </Button>

          <Button
            className='w-full'
            accent
            onClick={handleSubmit(sendFormData)}
          >
            Edit
          </Button>
        </div>
      </div>
    </Modal>
  )
}
