import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { Button, Modal } from '@/shared/ui'
import { confirmModal, taskCompleteConfirme } from '../model'

export const ConfirmCompleteTaskModal = () => {
  const isOpen = useUnit(confirmModal.$isOpen)
  const closeModal = useUnit(confirmModal.closeModal)
  const currentTask = useUnit(currentTaskModel.$currentTask)
  const taskCompleteConfirmeFn = useUnit(taskCompleteConfirme)

  const handleConfirm = () => {
    taskCompleteConfirmeFn()
    closeModal()
  }

  return (
    <Modal className='w-full max-w-md' isOpen={isOpen} onClose={closeModal}>
      <div className='text-center text-lg mb-10'>
        Are you sure you want to complete the task{' '}
        <span className='text-accent font-bold'>{currentTask?.title}</span>?
      </div>

      <div className='flex justify-center space-x-4'>
        <Button accent onClick={closeModal}>
          Cancel
        </Button>
        <Button variant='text' onClick={handleConfirm}>
          Complete
        </Button>
      </div>
    </Modal>
  )
}
