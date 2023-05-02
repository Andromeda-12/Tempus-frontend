import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { ConfirmDeletionProjectModal } from './ConfirmDeletionProjectModal'
import { confirmModal } from '../model'

export const DeleteProjectButton = () => {
  const openModal = useUnit(confirmModal.openModal)

  return (
    <div onMouseDown={(e) => e.stopPropagation()} className='w-full'>
      <ConfirmDeletionProjectModal />

      <Button variant='text' className='z-50 w-full' onClick={openModal}>
        Delete
      </Button>
    </div>
  )
}
