import { ReactNode } from 'react'
import { useGate, useUnit } from 'effector-react'
import { Modal, Spinner } from '@/shared/ui'
import { MemberDto } from '@/shared/api'
import { SearchMember } from './SearchMember'
import { MembersList } from './MembersList'
import { $filteredMembers } from '../model'
import { MembersListAction } from '../lib'

interface ManageMembersModalProps {
  isLoading: boolean
  title: string
  manageInviteLinkButton: ReactNode
  onChangeMemberParticipation: (action: MembersListAction) => void
  onClose: () => void
}

export const ManageMembersModal = ({
  isLoading,
  title,
  manageInviteLinkButton,
  onChangeMemberParticipation,
  onClose
}: ManageMembersModalProps) => {
  const filteredMembers = useUnit($filteredMembers)
  return (
    <Modal
      isOpen
      className='w-full max-w-4xl overflow-hidden'
      title={title}
      onClose={onClose}
    >
      <div className='relative'>
        {isLoading && (
          <div className='absolute inset-0 bg-white/70 dark:bg-neutral/90 z-30 flex justify-center items-center'>
            <Spinner className='!w-10 !h-10 border-4' />
          </div>
        )}

        <div className='flex justify-end mb-5'>
          <SearchMember />
        </div>

        <div className='h-[200px]'>
          <MembersList
            allMembers={filteredMembers!}
            onChangeMemberParticipation={onChangeMemberParticipation}
          />
        </div>

        <div className='mt-3'>{manageInviteLinkButton}</div>
      </div>
    </Modal>
  )
}
