import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { WorkspaceDto } from '@/shared/api'
import { ConfirmDeletionWorkspaceModal } from './ConfirmDeletionWorkspaceModal'
import { confirmModal, setCurrentWorkspace } from '../model'

export const DeleteWorkspaceButton = ({
  workspace
}: {
  workspace: WorkspaceDto
}) => {
  const openConfirmModal = useUnit(confirmModal.openModal)
  const setCurrentWorkspaceFn = useUnit(setCurrentWorkspace)

  const handleClick = () => {
    setCurrentWorkspaceFn(workspace)
    openConfirmModal()
  }

  return (
    <div onMouseDown={(e) => e.stopPropagation()} className='w-full'>
      <ConfirmDeletionWorkspaceModal />

      <Button variant='text' className='z-50 w-full' onClick={handleClick}>
        Delete
      </Button>
    </div>
  )
}
