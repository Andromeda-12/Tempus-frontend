import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { ConfirmDeletionTaskModal } from './ConfirmDeletionTaskModal'
import { confirmModal } from '../model'

export const DeleteTaskButton = () => {
  const openModal = useUnit(confirmModal.openModal)

  return (
    <div onMouseDown={(e) => e.stopPropagation()} className='w-full'>
      <ConfirmDeletionTaskModal />

      <Button variant='text' className='z-50 w-full' onClick={openModal}>
        Delete
      </Button>
    </div>
  )
}
