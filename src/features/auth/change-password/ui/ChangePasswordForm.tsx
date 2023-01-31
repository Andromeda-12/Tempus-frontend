import { useEffect } from 'react'
import { useEvent, useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import { Button, Card, FormField } from '@/shared/ui'
import { $isLoading, changePassword, redirect } from '../model'

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: ''
}

interface ChangePasswordFormProps {
  email: string
}

export const ChangePasswordForm = ({ email }: ChangePasswordFormProps) => {
  const { handleSubmit, watch, control } = useForm({
    defaultValues
  })

  const pending = useUnit($isLoading)

  const changePasswordFn = useEvent(changePassword)

  // const router = useRouter()
  // const token = router.query.token as string

  const onSubmit = (data: { password: string; confirmPassword: string }) =>
    changePasswordFn({ ...data })
    // changePasswordFn({ ...data, token })

  // useEffect(() => {
  //   const unsub = redirect.watch(() => {
  //     router.push('/signin')
  //   })
  //   return unsub
  // })

  return (
    <>
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
              <Button accent disabled={pending} className='w-full'>
                Change password
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </>
  )
}
