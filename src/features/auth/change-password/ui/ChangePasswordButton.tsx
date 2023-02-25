import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { ChangePasswordModal } from './ChangePasswordModal'
import { changePasswordModal } from '../model'

interface ChangePasswordButtonProps {
  className?: string
}

export const ChangePasswordButton = ({
  className
}: ChangePasswordButtonProps) => {
  const openModal = useUnit(changePasswordModal.openModal)

  return (
    <>
      <ChangePasswordModal />

      <Button dense accent className={clsx(className)} onClick={openModal}>
        Change password
      </Button>
    </>
  )
}
