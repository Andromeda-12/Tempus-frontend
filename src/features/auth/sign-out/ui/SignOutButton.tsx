import { useEvent } from 'effector-react'
import { Button } from '@/shared/ui'
import { signOut } from '../model'

interface SignOutButtonProps {
  className?: string
}

export const SignOutButton = ({ className }: SignOutButtonProps) => {
  const signOutFn = useEvent(signOut)
  return (
    <Button variant='text' className={className} onClick={signOutFn}>
      Sign out
    </Button>
  )
}
