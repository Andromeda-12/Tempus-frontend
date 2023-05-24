import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import {
  $isLoading,
  manageProjectMembersModal,
  projectChangeParticipation
} from '../model'
import { ManageMembersModal } from '../../manage-members-modal'

export const ManageProjectMembersButton = () => {
  const isOpen = useUnit(manageProjectMembersModal.$isOpen)
  const openModal = useUnit(manageProjectMembersModal.openModal)
  const closeModal = useUnit(manageProjectMembersModal.closeModal)
  const projectChangeParticipationFn = useUnit(projectChangeParticipation)

  const isLoading = useUnit($isLoading)

  const workspaceMembers = useUnit(currentWorkspaceModel.$members)
  const projectMembers = useUnit(currentProjectModel.$members)

  return (
    <>
      {isOpen && (
        <ManageMembersModal
          title='Assigned project members'
          isLoading={isLoading}
          allMembers={workspaceMembers!}
          assignedMembers={projectMembers!}
          onChangeMemberParticipation={projectChangeParticipationFn}
          onClose={closeModal}
        />
      )}

      <Button className='py-1' accent onClick={openModal}>
        Manage members
      </Button>
    </>
  )
}
