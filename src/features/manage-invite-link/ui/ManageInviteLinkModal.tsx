import { Controller, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Button, Modal, Spinner } from '@/shared/ui'
import {
  $inviteLink,
  manageInviteLinkModal,
  generateInviteLink,
  removeInviteLink,
  copyLinkToClipboard,
  $isLoading
} from '../model'

export const ManageInviteLinkModal = () => {
  const isOpen = useUnit(manageInviteLinkModal.$isOpen)
  const closeModal = useUnit(manageInviteLinkModal.closeModal)
  const inviteLink = useUnit($inviteLink)
  const generateInviteLinkFn = useUnit(generateInviteLink)
  const removeInviteLinkFn = useUnit(removeInviteLink)
  const copyLinkToClipboardFn = useUnit(copyLinkToClipboard)
  const isLoading = useUnit($isLoading)

  if (isLoading)
    return (
      <Modal
        className='w-full max-w-xl'
        title='Manage invite link'
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div className='h-[92px] flex justify-center items-center'>
          <Spinner size='xl' />
        </div>
      </Modal>
    )

  return (
    <Modal
      className='w-full max-w-xl'
      title='Manage invite link'
      isOpen={isOpen}
      onClose={closeModal}
    >
      <div className='font-semibold text-sm mb-6'>
        {inviteLink ? (
          <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm: space-y-0'>
            <span>Invite link</span>
            <div
              className='text-secondary/80 text-base hover:text-secondary/50 duration-75 active:scale-[99%] cursor-pointer'
              onClick={copyLinkToClipboardFn}
            >
              <div>{inviteLink}</div>
            </div>
          </div>
        ) : (
          <div className='text-secondary/80'>
            You don't have an invitation link yet. Generate it!
          </div>
        )}
      </div>

      <div className='flex justify-end space-x-3'>
        <Button variant='text' onClick={removeInviteLinkFn}>
          Remove
        </Button>

        <Button accent onClick={generateInviteLinkFn}>
          Generate
        </Button>
      </div>
    </Modal>
  )
}
