import { Link } from 'atomic-router-react'
import { useEvent, useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import { Button, Card, FormField } from '@/shared/ui'
import { emailRegexp } from '@/shared/lib'
import { signinRoute } from '@/shared/routing'
import { $isLoading, signUp } from '../model'

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

export const SignupForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues
  })

  const pending = useUnit($isLoading)
  const signUpFn = useEvent(signUp)

  const onSubmit = (data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => signUpFn(data)

  return (
    <Card className='px-5 sm:px-8 pb-10 pt-7 max-w-sm w-full transition-all duration-300'>
      <h3 className='text-center font-medium text-2xl mb-5'>Sign up</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <div className='flex gap-5'>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div className='mb-2 mt-5'>
            <Button disabled={pending} accent className='w-full'>
              Sign up
            </Button>
          </div>

          <div className='text-center'>
            <span className='text-sm'>
              Already have an account? <Link to={signinRoute}>Sign in</Link>
            </span>
          </div>
        </div>
      </form>
    </Card>
  )
}
