import { ChangePasswordForm } from '@/features/auth/change-password'
import { useGate, useUnit } from 'effector-react'
import { $email, $isLoading, $isTokenValid, gate } from '../model'
import { Spinner } from '@/shared/ui'
import { useRouter } from 'next/router'

export const ChangePassword = () => {
  const isLoading = useUnit($isLoading)
  const isTokenValid = useUnit($isTokenValid)
  const email = useUnit($email)

  const router = useRouter()
  const token = router.query.token as string

  useGate(gate, token)

  if (isLoading) return <Spinner size='xl' />

  if (isTokenValid) return <ChangePasswordForm email={email} />

  return (
    <div className='text-center space-y-6'>
      <div className='text-2xl'>Link is not valid</div>
      <div className='text-5xl'>🤨</div>
    </div>
  )
}
