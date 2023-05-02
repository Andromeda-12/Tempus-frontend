import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { UpdateTaskModal } from './UpdateTaskModal'
import { updateTaskModal } from '../model'

export const UpdateTaskButton = () => {
  const isOpen = useUnit(updateTaskModal.$isOpen)
  const openModal = useUnit(updateTaskModal.openModal)

  return (
    <>
      {isOpen && <UpdateTaskModal />}

      <IconButton icon='pencil' size='sm' variant='text' onClick={openModal} />
    </>
  )
}
