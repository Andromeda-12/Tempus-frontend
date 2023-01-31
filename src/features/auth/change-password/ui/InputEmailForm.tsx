import { useEvent, useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import { emailRegexp } from '@/shared/lib'
import { Button, Card, FormField } from '@/shared/ui'
import { sendEmail, $isLoading, $isEmailSenden } from '../model'

const defaultValues = {
  email: ''
}

export const InputEmailForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm({
    defaultValues
  })

  const pending = useUnit($isLoading)
  const isEmailSenden = useUnit($isEmailSenden)
  const sendEmailFn = useEvent(sendEmail)

  const onSubmit = (data: { email: string }) => sendEmailFn(data)

  if (isEmailSenden)
    return (
      <Card className='p-7 sm:p-10 max-w-lg w-full'>
        <h3 className='font-medium text-sm mb-5'>
          Check your email for a link to reset your password. If it
          doesnt&apos;t appear within a few minutes, check your spam folder
        </h3>

        <div className='mt-5'>
          <a href='/signin'>
            <Button accent className='w-full'>
              Return to sign in
            </Button>
          </a>
        </div>
      </Card>
    )

  return (
    <Card className='p-7 sm:p-10 max-w-lg w-full'>
      <h3 className='font-medium text-sm mb-5'>
        Enter your user account&apos;s verified email address and we will send
        you a password reset link.
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <FormField
            placeholder='Email'
            name='email'
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: emailRegexp,
                message: 'Email is not valid'
              }
            }}
          />

          <div className='mt-5'>
            <Button accent disabled={pending || !isValid} className='w-full'>
              Send email
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
