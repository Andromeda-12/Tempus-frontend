import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { ManageTaskMembersModal } from './ManageTaskMembersModal'
import { manageTaskMembersModal } from '../model'

export const ManageTaskMembersButton = () => {
  const isOpen = useUnit(manageTaskMembersModal.$isOpen)
  const openModal = useUnit(manageTaskMembersModal.openModal)

  return (
    <>
      {isOpen && <ManageTaskMembersModal />}

      <Button className='py-1' accent onClick={openModal}>
        Manage members
      </Button>
    </>
  )
}
