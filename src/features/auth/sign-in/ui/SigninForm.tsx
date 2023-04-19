import { Link } from 'atomic-router-react'
import { useEvent, useUnit } from 'effector-react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Checkbox, FormField } from '@/shared/ui'
import { emailRegexp } from '@/shared/lib'
import { forgetPasswordRoute, signupRoute } from '@/shared/routing'
import { $isLoading, signIn } from '../model'
import { notificationModel } from '@/features/notification'

const defaultValues = {
  email: '',
  password: '',
  rememberMe: false
}

export const SigninForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues
  })

  const pending = useUnit($isLoading)
  const signInFn = useEvent(signIn)

  const onSubmit = (data: {
    email: string
    password: string
    rememberMe: boolean
  }) => signInFn(data)

  return (
    <>
      <Card className='px-7 pb-10 pt-7 max-w-sm w-full'>
        <h3 className='text-center font-medium text-2xl mb-5'>Sign in</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-4'>
            <FormField
              placeholder='Email'
              name='email'
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: emailRegexp,
                  message: 'Email is not valid'
                }
              }}
            />

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

            <div className='flex justify-between items-center'>
              <Controller
                name='rememberMe'
                control={control}
                render={({ field }) => (
                  <Checkbox label='Remember me' {...field} />
                )}
              />

              <Link to={forgetPasswordRoute}>Forgot Password?</Link>
            </div>

            <div className='mb-2'>
              <Button accent disabled={pending} className='w-full'>
                Sign in
              </Button>
            </div>

            <div className='text-center'>
              <span className='text-sm'>
                Don&apos;t have an account?{' '}
                <Link to={signupRoute}>Sign up</Link>
              </span>
            </div>
          </div>
        </form>
      </Card>
    </>
  )
}
