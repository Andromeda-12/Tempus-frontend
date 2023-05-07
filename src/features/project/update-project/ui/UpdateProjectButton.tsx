import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { UpdateProjectModal } from './UpdateProjectModal'
import { updateProjectModal } from '../model'
import { ReactNode } from 'react'

interface UpdateProjectButtonProps {
  deleteButton: ReactNode
}

export const UpdateProjectButton = ({
  deleteButton
}: UpdateProjectButtonProps) => {
  const isOpen = useUnit(updateProjectModal.$isOpen)
  const openModal = useUnit(updateProjectModal.openModal)

  return (
    <>
      {isOpen && <UpdateProjectModal deleteButton={deleteButton} />}

      <IconButton icon='pencil' size='sm' variant='text' onClick={openModal} />
    </>
  )
}
