import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Button, Spinner } from '@/shared/ui'
import { settingRoute, signinRoute } from '@/shared/routing'
import { $isLoading, $isMailLinked } from '../model'

export const ConfirmChangeMailPage = () => {
  const isLoading = useUnit($isLoading)
  const isMailLinked = useUnit($isMailLinked)

  if (isLoading) return <Spinner size='xl' />

  if (isMailLinked)
    return (
      <div className='text-center space-y-5'>
        <div className='text-2xl'>Email linked successfully</div>
        <div className='text-5xl'>🎉</div>
        <div>
          <Link to={settingRoute} params={{ settingSection: 'user' }}>
            <Button accent>Go to profile</Button>
          </Link>
        </div>
      </div>
    )

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
