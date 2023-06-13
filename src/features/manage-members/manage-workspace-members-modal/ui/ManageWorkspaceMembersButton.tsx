import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { ManageMembersModal } from './ManageMembersModal'
import { ConfirmDeletionMemberModal } from './ConfirmDeletionMemberModal'
import {
  $isLoading,
  manageWorkspaceMembersModal,
  workspaceChangeParticipation,
  memberDeletionConfirmeModal
} from '../model'

export const ManageWorkspaceMembersButton = ({
  manageInviteLinkButton
}: {
  manageInviteLinkButton: ReactNode
}) => {
  const isOpen = useUnit(manageWorkspaceMembersModal.$isOpen)
  const isConfirmModalOpen = useUnit(memberDeletionConfirmeModal.$isOpen)
  const openModal = useUnit(manageWorkspaceMembersModal.openModal)
  const closeModal = useUnit(manageWorkspaceMembersModal.closeModal)
  const workspaceChangeParticipationFn = useUnit(workspaceChangeParticipation)

  const isLoading = useUnit($isLoading)

  return (
    <>
      {isOpen && (
        <ManageMembersModal
          manageInviteLinkButton={manageInviteLinkButton}
          title='Workspace members'
          isLoading={isLoading}
          onChangeMemberParticipation={workspaceChangeParticipationFn}
          onClose={closeModal}
        />
      )}

      {isConfirmModalOpen && <ConfirmDeletionMemberModal />}

      <IconButton icon='pencil' size='sm' variant='text' onClick={openModal} />
    </>
  )
}
