import { useUnit } from 'effector-react'
import { Button, Modal } from '@/shared/ui'
import {
  $currentProject,
  confirmModal,
  projectDeletionConfirme
} from '../model'

export const ConfirmDeletionProjectModal = () => {
  const isOpen = useUnit(confirmModal.$isOpen)
  const closeModal = useUnit(confirmModal.closeModal)
  const currentProject = useUnit($currentProject)
  const projectDeletionConfirmeFn = useUnit(projectDeletionConfirme)

  const handleConfirm = () => {
    projectDeletionConfirmeFn()
    closeModal()
  }

  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <Modal className='w-full max-w-md' isOpen={isOpen} onClose={closeModal}>
        <div className='text-center text-lg mb-10'>
          Are you sure you want to delete the project{' '}
          <span className='text-accent font-bold'>{currentProject?.title}</span>
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
