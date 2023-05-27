import { useEvent, useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import { Button, Card, FormField } from '@/shared/ui'
import { emailRegexp } from '@/shared/lib'
import { sendChangeEmailLetter, $isPending } from '../model'
import { viewerModel } from '@/entities/viewer'

const defaultValues = {
  email: ''
}

export const SendLetterForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const isPending = useUnit($isPending)
  const viewer = useUnit(viewerModel.$viewer)
  const sendChangeEmailLetterFn = useEvent(sendChangeEmailLetter)

  const onSubmit = (data: { email: string }) => sendChangeEmailLetterFn(data)

  const checkEmail = (email: string) => {
    if (viewer?.email === email)
      return 'The email entered cannot match the email that is already associated with the account.'
  }

  return (
    <>
      <h3 className='font-medium text-sm mb-5'>
        Enter the email address you want to link your account to. We will send
        an email to it with a link to change email
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
              },
              validate: checkEmail
            }}
          />

          <Button
            accent
            disabled={isPending || !isValid}
            className='w-full mt-5'
          >
            {isPending ? 'Sending...' : 'Send mail'}
          </Button>
        </div>
      </form>
    </>
  )
}
