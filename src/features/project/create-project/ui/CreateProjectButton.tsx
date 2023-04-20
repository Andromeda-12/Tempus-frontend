import { useUnit } from 'effector-react'
import { AddButton } from '@/shared/ui'
import { WorkspaceDto } from '@/shared/api'
import { CreateProjectModal } from './CreateProjectModal'
import { createProjectModal, setCurrentWorkspace } from '../model'

interface CreateWorkspaceButtonProps {
  workspace: WorkspaceDto | null
}

export const CreateProjectButton = ({
  workspace
}: CreateWorkspaceButtonProps) => {
  const openModal = useUnit(createProjectModal.openModal)
  const setCurrentWorkspaceFn = useUnit(setCurrentWorkspace)

  const handleClick = () => {
    setCurrentWorkspaceFn(workspace)
    openModal()
  }

  return (
    <>
      <CreateProjectModal />

      <AddButton text='Project' onClick={handleClick} />
    </>
  )
}
