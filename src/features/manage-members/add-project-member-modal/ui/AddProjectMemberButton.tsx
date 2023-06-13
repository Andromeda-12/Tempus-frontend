import { useUnit } from 'effector-react'
import { Button, IconButton } from '@/shared/ui'
import { ManageMembersModal } from './ManageMembersModal'
import { manageProjectMembersModal } from '../model'

export const AddProjectMemberButton = () => {
  const isOpen = useUnit(manageProjectMembersModal.$isOpen)
  const openModal = useUnit(manageProjectMembersModal.openModal)
  const closeModal = useUnit(manageProjectMembersModal.closeModal)

  return (
    <>
      {isOpen && <ManageMembersModal onClose={closeModal} />}

      <Button accent dense onClick={openModal}>
        Assign members
      </Button>
    </>
  )
}
