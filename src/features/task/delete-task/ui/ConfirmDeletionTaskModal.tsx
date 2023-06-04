import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { Button, Modal } from '@/shared/ui'
import { confirmModal, taskDeletionConfirme } from '../model'

export const ConfirmDeletionTaskModal = () => {
  const isOpen = useUnit(confirmModal.$isOpen)
  const closeModal = useUnit(confirmModal.closeModal)
  const currentTask = useUnit(currentTaskModel.$currentTask)
  const projectDeletionConfirmeFn = useUnit(taskDeletionConfirme)

  const handleConfirm = () => {
    projectDeletionConfirmeFn()
    closeModal()
  }

  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <Modal className='w-full max-w-md' isOpen={isOpen} onClose={closeModal}>
        <div className='text-center text-lg mb-10'>
          Are you sure you want to delete the task{' '}
          <span className='text-accent font-bold'>{currentTask?.title}</span>?
        </div>

        <div className='flex justify-center space-x-4'>
          <Button variant='text' onClick={closeModal}>
            Cancel
          </Button>
          <Button accent onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
