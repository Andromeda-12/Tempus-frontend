import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { LetterSentMessageModal } from './LetterSentMessageModal'
import { letterSentMessageModal } from '../model'

export const ChangeEmailButton = () => {
  const openModal = useUnit(letterSentMessageModal.openModal)

  return (
    <>
      <LetterSentMessageModal />

      <Button dense accent size='sm' onClick={openModal}>
        Change email
      </Button>
    </>
  )
}
