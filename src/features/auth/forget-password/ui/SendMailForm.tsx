import { useEvent, useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import { Button, Card, FormField } from '@/shared/ui'
import { emailRegexp } from '@/shared/lib'
import { sendEmail, $isEmailSending, $isEmailSended } from '../model'
import { Link } from 'atomic-router-react'
import { signinRoute } from '@/shared/routing'

const defaultValues = {
  email: ''
}

export const SendMailForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm({
    defaultValues
  })

  const isEmailSending = useUnit($isEmailSending)
  const isEmailSended = useUnit($isEmailSended)
  const sendEmailFn = useEvent(sendEmail)

  const onSubmit = (data: { email: string }) => sendEmailFn(data)

  if (isEmailSended)
    return (
      <Card className='p-7 sm:p-10 max-w-lg w-full'>
        <h2 className='font-bold text-lg text-center mb-3'>
          Letter sent to your mail
        </h2>

        <h3 className='font-medium text-sm mb-5'>
          If your mail exists in our system, a letter will be sent to it. Check
          your email for a link to reset your password. If it doesnt&apos;t
          appear within a few minutes, check your spam folder
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
            <Button
              accent
              disabled={isEmailSending || !isValid}
              className='w-full'
            >
              {isEmailSending ? 'Loading...' : 'Send email'}
            </Button>

            <div className='text-center mt-3'>
              <Link to={signinRoute}>
                <span>Go to sign in page</span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Card>
  )
}
