import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/shared/ui'
import { CreateWorkspaceModal } from './CreateWorkspaceModal'

interface CreateWorkspaceButtonProps {
  className?: string
}

export const CreateWorkspaceButton = ({
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
      <CreateWorkspaceModal isOpen={isShowModal} onClose={handleCloseModal} />

      <Button
        dense
        accent
        className={clsx('!rounded-full py-2 mb-7', className)}
        onClick={handleOpenModal}
      >
        Create workspace
      </Button>
    </>
  )
}
