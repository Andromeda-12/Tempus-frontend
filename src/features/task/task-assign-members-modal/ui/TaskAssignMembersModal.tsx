import { useUnit } from 'effector-react'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { Modal, Spinner } from '@/shared/ui'
import { MembersList } from './MembersList'
import { changeMemberParticipation, taskAssignMembersModal } from '../model'

export const TaskAssignMembersModal = () => {
  const projectMembers = useUnit(currentProjectModel.$members)
  const taskMembers = useUnit(currentTaskModel.$members)
  const changeMemberParticipationFn = useUnit(changeMemberParticipation)

  const isLoading = !projectMembers || !taskMembers

  const isOpen = useUnit(taskAssignMembersModal.$isOpen)
  const closeModal = useUnit(taskAssignMembersModal.closeModal)

  return (
    <Modal className='w-full max-w-3xl' isOpen={isOpen} onClose={closeModal}>
      {isLoading ? (
        <div className='flex h-full justify-center items-center min-h-[450px]'>
          <Spinner className='!w-14 !h-14 border-4' />
        </div>
      ) : (
        <MembersList
          allMembers={projectMembers}
          assignedMembers={taskMembers}
          onChangeMemberParticipation={changeMemberParticipationFn}
        />
      )}
    </Modal>
  )
}
