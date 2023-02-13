import { ViewerAvatar, viewerModel } from '@/entities/viewer'
import { Button, FormField, ImageUpload } from '@/shared/ui'
import { UploadAvatar } from '@/shared/ui/UploadAvatar'
import { useStore } from 'effector-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const UserSettings = () => {
  const [isEditable, setIsEditable] = useState(false)

  const viewer = useStore(viewerModel.$viewer)

  const defaultValues = {
    firstName: viewer!.firstName,
    lastName: viewer!.lastName
  }

  const { handleSubmit, control } = useForm({
    defaultValues
  })

  const onSubmit = (data: { firstName: string; lastName: string }) => {}

  return (
    <div className='py-8'>
      <div className='space-y-6'>
        <div className='flex justify-between'>
          <ViewerAvatar upload={isEditable} size='xl' />

          <div>
            <Button accent onClick={() => setIsEditable(!isEditable)}>
              Edit
            </Button>
          </div>
        </div>

        {/* <ImageUpload preview={viewer.avatar} onChange={() => {}} /> */}

        <div className='max-w-md'>
          {/* <div className='flex space-x-2 md:text-2xl font-medium'>
            <div>{viewer?.firstName}</div>

            <div>{viewer?.lastName}</div>
          </div> */}

          <div className='flex items-center mb-2 space-x-4'>
            <div className='md:text-xl'>{viewer?.email}</div>

            {isEditable && (
              <Button variant='contained' accent>
                Change email
              </Button>
            )}
          </div>

          <form className='space-y-2 text-xl' onSubmit={handleSubmit(onSubmit)}>
            {isEditable ? (
              <FormField
                placeholder='First name'
                name='firstName'
                control={control}
                rules={{
                  required: 'First name is required'
                }}
              />
            ) : (
              <div>{viewer?.firstName}</div>
            )}

            {isEditable ? (
              <FormField
                placeholder='Last name'
                name='lastName'
                control={control}
                rules={{
                  required: 'Last name is required'
                }}
              />
            ) : (
              <div>{viewer?.lastName}</div>
            )}

            {isEditable && (
              <Button accent className='w-full !mt-4'>
                Save
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
