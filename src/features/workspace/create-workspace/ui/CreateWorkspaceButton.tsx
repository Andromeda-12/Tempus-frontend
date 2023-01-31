import { useState } from 'react'
import { Button } from '@/shared/ui'
import { CreateWorkspaceModal } from './CreateWorkspaceModal'
import clsx from 'clsx'

interface CreateWorkspaceButtonProps {
  className?: string
}

export const CreateWorkspaceButton = ({
  className
}: CreateWorkspaceButtonProps) => {
  const [isShowCreateModal, setIsShowCreateModal] = useState(false)

  const handleCloseModal = () => {
    setIsShowCreateModal(false)
  }

  return (
    <>
      <CreateWorkspaceModal
        isOpen={isShowCreateModal}
        onClose={handleCloseModal}
      />

      <Button
        dense
        className={clsx('bg-neutral !rounded-full py-2 mb-7', className)}
        onClick={() => setIsShowCreateModal(true)}
      >
        Create workspace
      </Button>
    </>
  )
}
