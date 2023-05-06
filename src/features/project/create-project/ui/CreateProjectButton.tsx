import { useUnit } from 'effector-react'
import { AddButton } from '@/shared/ui'
import { CreateProjectModal } from './CreateProjectModal'
import { createProjectModal } from '../model'

export const CreateProjectButton = () => {
  const openModal = useUnit(createProjectModal.openModal)

  return (
    <>
      <CreateProjectModal />

      <AddButton text='Project' onClick={openModal} />
    </>
  )
}
