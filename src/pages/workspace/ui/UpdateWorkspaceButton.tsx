import { useUnit } from 'effector-react'
import { UpdateWorkspaceButton } from '@/features/workspace/update-workspace'
import { DeleteWorkspaceButton } from '@/features/workspace/delete-workspace'
import { $currentWorkspace } from '../model'

export const UpdateWorkspace = () => {
  const currentWorkspace = useUnit($currentWorkspace)
  return (
    <UpdateWorkspaceButton
      workspace={currentWorkspace}
      deleteButton={<DeleteWorkspaceButton workspace={currentWorkspace!} />}
    />
  )
}
