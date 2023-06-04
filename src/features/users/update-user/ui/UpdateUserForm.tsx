import { useForm } from 'react-hook-form'
import { useStore, useUnit } from 'effector-react'
import { viewerModel } from '@/entities/viewer'
import { Button, FormField } from '@/shared/ui'
import { UpdateUserDto } from '@/shared/api'
import { updateViewer } from '../model'

export const UpdateUserForm = () => {
  const viewer = useStore(viewerModel.$viewer)
  const updateViewerFn = useUnit(updateViewer)

  const defaultValues = {
    firstName: viewer!.firstName,
    lastName: viewer!.lastName
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = useForm({
    defaultValues
  })

  const onSubmit = (data: { firstName: string; lastName: string }) => {
    const updateUserDto: UpdateUserDto = {
      firstName: data.firstName,
      lastName: data.lastName
    }

    updateViewerFn(updateUserDto)
  }

  const resetForm = () =>
    reset({
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <FormField
        placeholder='Last name'
        name='lastName'
        control={control}
        rules={{
          required: 'Last name is required'
        }}
      />

      <FormField
        placeholder='First name'
        name='firstName'
        control={control}
        rules={{
          required: 'First name is required'
        }}
      />

      <div className='space-x-2 flex justify-end'>
        <Button variant='text' type='button' onClick={resetForm}>
          Reset
        </Button>

        <Button accent disabled={!isDirty}>
          Save
        </Button>
      </div>
    </form>
  )
}
