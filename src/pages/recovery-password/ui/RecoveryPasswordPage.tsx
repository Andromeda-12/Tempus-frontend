import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { ForgetPasswordForm } from '@/features/auth/forget-password'
import { Button, Spinner } from '@/shared/ui'
import { signinRoute } from '@/shared/routing'
import { $email, $isLoading, $isTokenValid } from '../model'

export const RecoveryPasswordPage = () => {
  const isLoading = useUnit($isLoading)
  const isTokenValid = useUnit($isTokenValid)
  const email = useUnit($email)

  if (isLoading) return <Spinner size='xl' />

  if (isTokenValid) return <ForgetPasswordForm email={email} />

  return (
    <div className='text-center space-y-5'>
      <div className='text-2xl'>Link is not valid</div>
      <div className='text-5xl'>🤨</div>
      <div>
        <Link to={signinRoute}>
          <Button accent>Go to sign in</Button>
        </Link>
      </div>
    </div>
  )
}
