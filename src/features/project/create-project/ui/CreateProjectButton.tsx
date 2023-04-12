import { useState } from 'react'
import { AddButton } from '@/shared/ui'
import { CreateProjectModal } from './CreateProjectModal'

interface CreateWorkspaceButtonProps {
  className?: string
}

export const CreateProjectButton = ({
  className
}: CreateWorkspaceButtonProps) => {
  const [isShowModal, setIsShowModal] = useState(false)

  const handleOpenModal = () => {
    setIsShowModal(true)
  }

  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  return (
    <>
      <CreateProjectModal isOpen={isShowModal} onClose={handleCloseModal} />
      <AddButton text='Project' onClick={handleOpenModal} />
    </>
  )
}
