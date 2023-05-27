import { useUnit } from 'effector-react'
import { Button, Modal } from '@/shared/ui'
import {
  memberDeletionConfirmeModal,
  confirmMemberDeletion,
  $removedMember
} from '../model'

export const ConfirmDeletionMemberModal = () => {
  const isOpen = useUnit(memberDeletionConfirmeModal.$isOpen)
  const closeModal = useUnit(memberDeletionConfirmeModal.closeModal)
  const removedMember = useUnit($removedMember)
  const confirmMemberDeletionFn = useUnit(confirmMemberDeletion)

  const handleConfirm = () => {
    confirmMemberDeletionFn()
    closeModal()
  }

  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <Modal className='w-full max-w-md' isOpen={isOpen} onClose={closeModal}>
        <div className='text-center text-lg mb-10'>
          Are you sure you want to exclude the workspace participant {' '}
          <span className='text-accent font-bold'>{`${removedMember?.firstName} ${removedMember?.lastName}`}</span>
          ?
        </div>

        <div className='flex justify-center space-x-4'>
          <Button accent onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='text' onClick={handleConfirm}>
            Exclude
          </Button>
        </div>
      </Modal>
    </div>
  )
}
