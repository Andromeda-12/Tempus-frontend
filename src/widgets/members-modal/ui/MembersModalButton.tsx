import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { MemberDto } from '@/shared/api'
import { MembersModal } from './MembersModal'
import { setcurrentWorkspaceMembers, membersModal } from '../model'

interface MembersModalButtonProps {
  className?: string
  members: MemberDto[]
}

export const MembersModalButton = ({ members }: MembersModalButtonProps) => {
  const setcurrentWorkspaceMembersFn = useUnit(setcurrentWorkspaceMembers)
  const openModal = useUnit(membersModal.openModal)

  const handleClick = () => {
    setcurrentWorkspaceMembersFn(members)
    openModal()
  }

  return (
    <>
      <MembersModal />

      <IconButton
        icon='pencil'
        size='sm'
        variant='text'
        onClick={handleClick}
      />
    </>
  )
}
