import { useUnit } from 'effector-react'
import { Modal } from '@/shared/ui'
import { ChangePasswordForm } from './ChangePasswordForm'
import { changePasswordModal } from '../model'

export const ChangePasswordModal = () => {
  const isOpen = useUnit(changePasswordModal.$isOpen)
  const closeModal = useUnit(changePasswordModal.closeModal)

  return (
    <Modal
      className='w-full max-w-xl'
      title='Change password'
      isOpen={isOpen}
      onClose={closeModal}
    >
      <ChangePasswordForm />
    </Modal>
  )
}
