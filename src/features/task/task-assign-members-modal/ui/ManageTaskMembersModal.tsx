import { useUnit } from 'effector-react'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { Modal, Spinner } from '@/shared/ui'
import { MembersList } from './MembersList'
import { $isTaskManagePending, changeMemberParticipation, manageTaskMembersModal } from '../model'

export const ManageTaskMembersModal = () => {
  const projectMembers = useUnit(currentProjectModel.$members)
  const taskMembers = useUnit(currentTaskModel.$members)
  const changeMemberParticipationFn = useUnit(changeMemberParticipation)

  const isLoading = !projectMembers || !taskMembers
  const isTaskManagePending = useUnit($isTaskManagePending)

  const isOpen = useUnit(manageTaskMembersModal.$isOpen)
  const closeModal = useUnit(manageTaskMembersModal.closeModal)

  return (
    <Modal
      className='w-full max-w-3xl'
      title='Assigned project members'
      isOpen={isOpen}
      onClose={closeModal}
    >
      {isLoading ? (
        <div className='flex h-full justify-center items-center min-h-[450px]'>
          <Spinner className='!w-14 !h-14 border-4' />
        </div>
      ) : (
        <div className='h-[200px] relative'>
          {isTaskManagePending && (
            <div className='absolute inset-0 bg-neutral/90 z-20  flex justify-center items-center'>
              <Spinner className='!w-10 !h-10 border-4' />
            </div>
          )}
          <MembersList
            allMembers={projectMembers}
            assignedMembers={taskMembers}
            onChangeMemberParticipation={changeMemberParticipationFn}
          />
        </div>
      )}
    </Modal>
  )
}
