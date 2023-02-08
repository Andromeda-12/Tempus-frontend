import { useUnit } from 'effector-react'
import { Button, Modal } from '@/shared/ui'
import { $currentWorkspace, inviteMembersModal, inviteMember } from '../model'

export const ConfirmDeletionWorkspaceModal = () => {
  const isOpen = useUnit(inviteMembersModal.$isOpen)
  const closeModal = useUnit(inviteMembersModal.closeModal)

  const inviteMemberFn = useUnit(inviteMember)

  const handleConfirm = () => {
    inviteMemberFn()
    closeModal()
  }

  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <Modal
        title='Invite new member'
        className='w-full max-w-md'
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div className='text-center text-lg mb-10'>
          Are you sure you want to delete the workspace{' '}
          <span className='text-accent font-bold'>
            {currentWorkspace?.title}
          </span>
          ?
        </div>

        <div className='flex justify-center space-x-4'>
          <Button accent onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='text' onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
