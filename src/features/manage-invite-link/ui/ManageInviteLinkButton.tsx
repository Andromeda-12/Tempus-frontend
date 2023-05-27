import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { ManageInviteLinkModal } from './ManageInviteLinkModal'
import { manageInviteLinkModal } from '../model'

export const ManageInviteLinkButton = () => {
  const isOpen = useUnit(manageInviteLinkModal.$isOpen)
  const openModal = useUnit(manageInviteLinkModal.openModal)

  return (
    <>
      {isOpen && <ManageInviteLinkModal />}

      <Button accent dense onClick={openModal}>
        Manage invite link
      </Button>
    </>
  )
}
