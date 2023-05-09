import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { Modal, Spinner } from '@/shared/ui'
import { $isLoading, taskModal } from '../model'

interface TaskModalContainerProps {
  children: ReactNode
}

export const TaskModalContainer = ({ children }: TaskModalContainerProps) => {
  const isLoading = useUnit($isLoading)
  const isOpen = useUnit(taskModal.$isOpen)
  const closeModal = useUnit(taskModal.closeModal)

  return (
    <Modal
      className='w-full max-w-2xl overflow-hidden'
      isOpen={isOpen}
      onClose={closeModal}
    >
      {isLoading ? (
        <div className='flex h-full justify-center items-center min-h-[300px]'>
          <Spinner className='!w-14 !h-14 border-4' />
        </div>
      ) : (
        children
      )}
    </Modal>
  )
}
