import { useUnit } from 'effector-react'
import { Modal } from '@/shared/ui'
import { SendLetterForm } from './SendLetterForm'
import { LetterSentMessage } from './LetterSentMessage'
import { letterSentMessageModal, $isLetterSent } from '../model'

export const LetterSentMessageModal = () => {
  const isOpen = useUnit(letterSentMessageModal.$isOpen)
  const closeModal = useUnit(letterSentMessageModal.closeModal)
  const isLetterSent = useUnit($isLetterSent)

  return (
    <Modal className='w-full max-w-xl' isOpen={isOpen} onClose={closeModal}>
      {!isLetterSent ? <SendLetterForm /> : <LetterSentMessage />}
    </Modal>
  )
}
