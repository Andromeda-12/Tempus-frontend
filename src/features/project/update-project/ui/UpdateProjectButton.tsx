import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { UpdateProjectModal } from './UpdateProjectModal'
import { updateProjectModal } from '../model'

export const UpdateProjectButton = () => {
  const isOpen = useUnit(updateProjectModal.$isOpen)
  const openModal = useUnit(updateProjectModal.openModal)

  return (
    <>
      {isOpen && <UpdateProjectModal />}

      <IconButton icon='pencil' size='sm' variant='text' onClick={openModal} />
    </>
  )
}
