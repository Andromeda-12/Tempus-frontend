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

  const { handleSubmit, control } = useForm({
    defaultValues
  })

  const onSubmit = (data: { firstName: string; lastName: string }) => {
    const updateUserDto: UpdateUserDto = {
      firstName: data.firstName,
      lastName: data.lastName
    }

    updateViewerFn(updateUserDto)
  }

  return (
    <form className='space-y-2 text-xl' onSubmit={handleSubmit(onSubmit)}>
      <FormField
        placeholder='First name'
        name='firstName'
        control={control}
        rules={{
          required: 'First name is required'
        }}
      />

      <FormField
        placeholder='Last name'
        name='lastName'
        control={control}
        rules={{
          required: 'Last name is required'
        }}
      />

      <Button accent className='w-full !mt-4'>
        Save
      </Button>
    </form>
  )
}
