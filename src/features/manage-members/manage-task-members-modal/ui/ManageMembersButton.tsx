import { useUnit } from 'effector-react'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { Button } from '@/shared/ui'
import {
  $isLoading,
  manageTaskMembersModal,
  taskChangeParticipation
} from '../model'
import { ManageMembersModal } from '../../manage-members-modal'

export const ManageTaskMembersButton = () => {
  const isOpen = useUnit(manageTaskMembersModal.$isOpen)
  const openModal = useUnit(manageTaskMembersModal.openModal)
  const closeModal = useUnit(manageTaskMembersModal.closeModal)
  const taskChangeParticipationFn = useUnit(taskChangeParticipation)

  const projectMembers = useUnit(currentProjectModel.$members)
  const taskMembers = useUnit(currentTaskModel.$members)

  const isLoading = useUnit($isLoading)

  return (
    <>
      {isOpen && (
        <ManageMembersModal
          title='Assigned task members'
          isLoading={isLoading}
          allMembers={projectMembers!}
          assignedMembers={taskMembers!}
          onChangeMemberParticipation={taskChangeParticipationFn}
          onClose={closeModal}
        />
      )}

      <Button className='py-1' accent onClick={openModal}>
        Manage members
      </Button>
    </>
  )
}
