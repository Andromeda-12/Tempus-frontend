import { useUnit } from 'effector-react'
import { Button, Modal, Icon, IconButton, AddButton, Avatar } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { $currentWorkspaceMembers, membersModal } from '../model'

interface UpdateWorkspaceModalProps {}

export const MembersModal = ({}: UpdateWorkspaceModalProps) => {
  const members = useUnit($currentWorkspaceMembers)

  const isOpen = useUnit(membersModal.$isOpen)
  const closeModal = useUnit(membersModal.closeModal)

  return (
    <Modal
      className='w-full max-w-4xl'
      title='Members'
      isOpen={isOpen}
      onClose={closeModal}
    >
      <div className='w-full'>
        <div className='max-h-[400px] h-[400px] flex-1 mb-3 bg-gray-100/60 dark:bg-background-dark/50 rounded-xl overflow-hidden divide-y-[1px] dark:divide-color-dark/20 '>
          {members.map((member) => (
            <>
            <div className='duration-150 hover:bg-gray-200 dark:hover:bg-color-dark/10 flex justify-between space-x-2 py-3 px-3 text-sm'>
              <div className='flex flex-col sm:flex-row sm:space-x-4 sm:items-center w-full text-xs'>
                <Avatar src={getImageUrl(member.avatar)} />
                <div className='sm:w-3/12 overflow-hidden text-ellipsis whitespace-nowrap'>
                  {member.lastName} {member.firstName}
                </div>
                <div className='sm:w-5/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                  {member.email}
                </div>
                <div className='sm:w-2/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                {member.role}
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <IconButton
                  icon='close'
                  size='xs'
                  variant='text'
                  className='!text-secondary/60'
                />
              </div>
            </div>
            <div className='duration-150 hover:bg-gray-200 dark:hover:bg-color-dark/10 flex justify-between space-x-2 py-3 px-3 text-sm'>
              <div className='flex flex-col sm:flex-row sm:space-x-4 sm:items-center w-full text-xs'>
                <Avatar src={getImageUrl(member.avatar)} />
                <div className='sm:w-3/12 overflow-hidden text-ellipsis whitespace-nowrap'>
                  {member.lastName} {member.firstName}
                </div>
                <div className='sm:w-5/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                  {member.email}
                </div>
                <div className='sm:w-2/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                {member.role}
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <IconButton
                  icon='close'
                  size='xs'
                  variant='text'
                  className='!text-secondary/60'
                />
              </div>
            </div>
            <div className='duration-150 hover:bg-gray-200 dark:hover:bg-color-dark/10 flex justify-between space-x-2 py-3 px-3 text-sm'>
              <div className='flex flex-col sm:flex-row sm:space-x-4 sm:items-center w-full text-xs'>
                <Avatar src={getImageUrl(member.avatar)} />
                <div className='sm:w-3/12 overflow-hidden text-ellipsis whitespace-nowrap'>
                  {member.lastName} {member.firstName}
                </div>
                <div className='sm:w-5/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                  {member.email}
                </div>
                <div className='sm:w-2/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                {member.role}
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <IconButton
                  icon='close'
                  size='xs'
                  variant='text'
                  className='!text-secondary/60'
                />
              </div>
            </div>
            <div className='duration-150 hover:bg-gray-200 dark:hover:bg-color-dark/10 flex justify-between space-x-2 py-3 px-3 text-sm'>
              <div className='flex flex-col sm:flex-row sm:space-x-4 sm:items-center w-full text-xs'>
                <Avatar src={getImageUrl(member.avatar)} />
                <div className='sm:w-3/12 overflow-hidden text-ellipsis whitespace-nowrap'>
                  {member.lastName} {member.firstName}
                </div>
                <div className='sm:w-5/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                  {member.email}
                </div>
                <div className='sm:w-2/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                {member.role}
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <IconButton
                  icon='close'
                  size='xs'
                  variant='text'
                  className='!text-secondary/60'
                />
              </div>
            </div>
            <div className='duration-150 hover:bg-gray-200 dark:hover:bg-color-dark/10 flex justify-between space-x-2 py-3 px-3 text-sm'>
              <div className='flex flex-col sm:flex-row sm:space-x-4 sm:items-center w-full text-xs'>
                <Avatar src={getImageUrl(member.avatar)} />
                <div className='sm:w-3/12 overflow-hidden text-ellipsis whitespace-nowrap'>
                  {member.lastName} {member.firstName}
                </div>
                <div className='sm:w-5/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                  {member.email}
                </div>
                <div className='sm:w-2/12 overflow-hidden text-ellipsis dark:text-color-dark/60'>
                {member.role}
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <IconButton
                  icon='close'
                  size='xs'
                  variant='text'
                  className='!text-secondary/60'
                />
              </div>
            </div></>
          ))}
        </div>
      </div>

      <div className='flex justify-end space-x-3'>
        <Button variant='text' type='button' onClick={closeModal}>
          Cancel
        </Button>

        <Button accent variant='contained' onClick={closeModal}>
          Invite
        </Button>

        {/* <AddButton text='Member' /> */}
      </div>
    </Modal>
  )
}
