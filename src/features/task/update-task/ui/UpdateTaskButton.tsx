import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { UpdateTaskModal } from './UpdateTaskModal'
import { updateTaskModal } from '../model'

interface UpdateTaskButtonProps {
  deleteButton: ReactNode
}

export const UpdateTaskButton = ({ deleteButton }: UpdateTaskButtonProps) => {
  const isOpen = useUnit(updateTaskModal.$isOpen)
  const openModal = useUnit(updateTaskModal.openModal)

  return (
    <>
      {isOpen && <UpdateTaskModal deleteButton={deleteButton} />}

      <Button variant='text' onClick={openModal}>Edit</Button>
    </>
  )
}
