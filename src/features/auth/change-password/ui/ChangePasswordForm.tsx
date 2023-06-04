import { useEvent, useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import { Button, FormField } from '@/shared/ui'
import { ChangeUserPasswordDto } from '@/shared/api'
import { $isPending, changePassword } from '../model'

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
}

export const ChangePasswordForm = () => {
  const { handleSubmit, watch, control } = useForm({
    defaultValues
  })

  const pending = useUnit($isPending)

  const changePasswordFn = useEvent(changePassword)

  const onSubmit = (data: ChangeUserPasswordDto) =>
    changePasswordFn({ ...data })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col space-y-5'>
        <FormField
          placeholder='Current password'
          password
          name='currentPassword'
          control={control}
          rules={{
            required: 'Current password is required',
            minLength: {
              value: 6,
              message: 'Minimum password length 6 characters'
            }
          }}
        />

        <FormField
          placeholder='New password'
          password
          name='newPassword'
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Minimum password length 6 characters'
            }
          }}
        />

        <FormField
          placeholder='Confirm new password'
          password
          name='confirmNewPassword'
          control={control}
          rules={{
            required: 'Confirm password is required',
            minLength: {
              value: 6,
              message: 'Minimum password length 6 characters'
            },
            validate: (val: string) => {
              if (watch('newPassword') != val) {
                return "Password confirmation doesn't match the password"
              }
            }
          }}
        />

        <div className='mt-7'>
          <Button accent disabled={pending} className='w-full'>
            Change password
          </Button>
        </div>
      </div>
    </form>
  )
}
