import { useForm } from 'react-hook-form'
import { Link } from 'atomic-router-react'
import { useEvent, useUnit } from 'effector-react'
import { Button, Card, FormField } from '@/shared/ui'
import { signinRoute } from '@/shared/routing'
import {
  $isPasswordSending,
  $isPasswordChanged,
  recoveryPassword
} from '../model'

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: ''
}

interface ChangePasswordFormProps {
  email: string
}

export const ForgetPasswordForm = ({ email }: ChangePasswordFormProps) => {
  const { handleSubmit, watch, control } = useForm({
    defaultValues
  })

  const isPasswordSending = useUnit($isPasswordSending)
  const isPasswordChanged = useUnit($isPasswordChanged)
  const recoveryPasswordFn = useEvent(recoveryPassword)

  const onSubmit = ({
    password
  }: {
    password: string
    confirmPassword: string
  }) => recoveryPasswordFn({ password })

  if (isPasswordChanged)
    return (
      <Card className='p-7 sm:p-10 max-w-lg w-full'>
        <h3 className='text-center font-medium text-2xl mb-7'>
          Password has been successfully changed 🎉
        </h3>

        <Link to={signinRoute}>
          <Button className='w-full' accent>
            Go to sign in
          </Button>
        </Link>
      </Card>
    )

  return (
    <Card className='p-7 sm:p-10 max-w-lg w-full'>
      <h3 className='text-center font-medium text-2xl mb-7'>
        Change password for {email}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col '>
          <FormField
            placeholder='Password'
            password
            name='password'
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
            placeholder='Confirm password'
            password
            name='confirmPassword'
            control={control}
            rules={{
              required: 'Confirm password is required',
              minLength: {
                value: 6,
                message: 'Minimum password length 6 characters'
              },
              validate: (val: string) => {
                if (watch('password') != val) {
                  return "Password confirmation doesn't match the password"
                }
              }
            }}
          />

          <div className='mt-7'>
            <Button
              accent
              disabled={isPasswordSending}
              loading={isPasswordSending}
              className='w-full'
            >
              Change password
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
