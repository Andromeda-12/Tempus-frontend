import { Button } from '@/shared/ui'
import { ConfirmChangeEmailModal } from './ConfirmChangeEmailModal'
import { useUnit } from 'effector-react'
import { confirmModal } from '../model'

export const ChangeEmailButton = () => {
  const openModal = useUnit(confirmModal.openModal)

  return (
    <>
      <ConfirmChangeEmailModal />

      <Button dense accent size='sm' onClick={openModal}>
        Change email
      </Button>
    </>
  )
}
