import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { ManageMembersModal } from './ManageMembersModal'
import { ConfirmDeletionMemberModal } from './ConfirmDeletionMemberModal'
import {
  $isLoading,
  manageProjectMembersModal,
  projectChangeParticipation,
  memberDeletionConfirmeModal
} from '../model'

export const ManageProjectMembersButton = ({
  addProjectMemberButton
}: {
  addProjectMemberButton: ReactNode
}) => {
  const isOpen = useUnit(manageProjectMembersModal.$isOpen)
  const isConfirmModalOpen = useUnit(memberDeletionConfirmeModal.$isOpen)
  const openModal = useUnit(manageProjectMembersModal.openModal)
  const closeModal = useUnit(manageProjectMembersModal.closeModal)
  const projectChangeParticipationFn = useUnit(projectChangeParticipation)

  const isLoading = useUnit($isLoading)

  return (
    <>
      {isOpen && (
        <ManageMembersModal
          addProjectMemberButton={addProjectMemberButton}
          title='Project members'
          isLoading={isLoading}
          onChangeMemberParticipation={projectChangeParticipationFn}
          onClose={closeModal}
        />
      )}

      {isConfirmModalOpen && <ConfirmDeletionMemberModal />}

      <IconButton icon='pencil' size='sm' variant='text' onClick={openModal} />
    </>
  )
}
