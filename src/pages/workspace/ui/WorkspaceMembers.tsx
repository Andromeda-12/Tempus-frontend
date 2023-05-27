import { useUnit } from 'effector-react'
import { AvatarGroup } from '@/features/users/avatar-group'
import { ManageInviteLinkButton } from '@/features/manage-invite-link'
import { ManageWorkspaceMembersButton } from '@/features/manage-members/manage-workspace-members-modal'
import { HasAccess } from './HasAccess'
import { $currentWorkspace } from '../model'

export const WorkspaceMembers = () => {
  const currentWorkspace = useUnit($currentWorkspace)

  return (
    <div className='flex items-center space-x-2 text-xs text-color-light/60 dark:text-color-dark/50'>
      <div>{currentWorkspace?.members.length} members</div>
      <AvatarGroup members={currentWorkspace?.members || []} />

      <HasAccess>
        <ManageWorkspaceMembersButton
          manageInviteLinkButton={<ManageInviteLinkButton />}
        />
      </HasAccess>
    </div>
  )
}
