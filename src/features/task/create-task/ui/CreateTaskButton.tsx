import { useUnit } from 'effector-react'
import { AddButton } from '@/shared/ui'
import { CreateTaskModal } from './CreateTaskModal'
import { createTaskModal } from '../model'

export const CreateTaskButton = () => {
  const isOpen = useUnit(createTaskModal.$isOpen)
  const openModal = useUnit(createTaskModal.openModal)

  return (
    <>
      {isOpen && <CreateTaskModal />}

      <AddButton text='Task' onClick={openModal} />
    </>
  )
}
