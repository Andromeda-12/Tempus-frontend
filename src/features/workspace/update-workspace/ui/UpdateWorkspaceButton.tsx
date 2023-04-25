import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { WorkspaceDto } from '@/shared/api'
import { UpdateWorkspaceModal } from './UpdateWorkspaceModal'
import { setCurrentWorkspace, updateWorkspaceModal } from '../model'

interface UpdateWorkspaceButtonProps {
  className?: string
  workspace: WorkspaceDto | null
  deleteButton: ReactNode
}

export const UpdateWorkspaceButton = ({
  className,
  workspace,
  deleteButton
}: UpdateWorkspaceButtonProps) => {
  const openModal = useUnit(updateWorkspaceModal.openModal)
  const setCurrentWorkspaceFn = useUnit(setCurrentWorkspace)

  const isOpen = useUnit(updateWorkspaceModal.$isOpen)

  const handleClick = () => {
    openModal()
    setCurrentWorkspaceFn(workspace)
  }

  return (
    <>
      {isOpen && <UpdateWorkspaceModal deleteButton={deleteButton} />}

      <IconButton
        icon='pencil'
        size='sm'
        variant='text'
        onClick={handleClick}
      />
    </>
  )
}
