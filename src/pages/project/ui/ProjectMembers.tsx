import { useUnit } from 'effector-react'
import { AvatarGroup } from '@/features/users/avatar-group'
import { ManageProjectMembersButton } from '@/features/manage-members/manage-project-members-modal'
import { AddProjectMemberButton } from '@/features/manage-members/add-project-member-modal'
import { currentProjectModel } from '@/entities/current-project'
import { HasAccess } from './HasAccess'

export const ProjectMembers = () => {
  const currentProject = useUnit(currentProjectModel.$currentProject)

  return (
    <div className='flex items-center space-x-2 text-xs text-color-light dark:text-color-dark/50'>
      <div>{currentProject?.members.length} members</div>
      <AvatarGroup members={currentProject?.members || []} />

      <HasAccess>
        <ManageProjectMembersButton
          addProjectMemberButton={<AddProjectMemberButton />}
        />
      </HasAccess>
    </div>
  )
}
