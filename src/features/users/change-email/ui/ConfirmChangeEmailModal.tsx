import { useUnit } from 'effector-react'
import { Button, Modal } from '@/shared/ui'
import { confirmModal, sendChangeEmailMail } from '../model'

export const ConfirmChangeEmailModal = () => {
  const isOpen = useUnit(confirmModal.$isOpen)
  const closeModal = useUnit(confirmModal.closeModal)

  const sendChangeEmailMailFn = useUnit(sendChangeEmailMail)

  return (
    <Modal className='w-full max-w-xl' isOpen={isOpen} onClose={closeModal}>
      <div className='text-center text-lg mb-8'>
        <div>
          We will send you an email with instructions on how to change your
          mail.
        </div>
        <div>Are you sure you want to change your email?</div>
      </div>

      <div className='flex justify-center space-x-4'>
        <Button accent onClick={closeModal}>
          Cancel
        </Button>
        <Button variant='text' onClick={sendChangeEmailMailFn}>
          Change email
        </Button>
      </div>
    </Modal>
  )
}
