import clsx from 'clsx'
import { Avatar, Checkbox, IconButton, Tooltip } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { MemberDto } from '@/shared/api'
import { MembersListAction } from '../lib'
import { SelectMemberRole } from './SelectMemberRole'
import { useUnit } from 'effector-react'
import { viewerModel } from '@/entities/viewer'
import { currentWorkspaceModel } from '@/entities/current-workspace'

interface MemberProps {
  member: MemberDto
  onChangeMemberParticipation: (action: MembersListAction) => void
}

export const Member = ({
  member,
  onChangeMemberParticipation
}: MemberProps) => {
  const { avatar, firstName, lastName, email, role, id } = member
  const workspaceViewerRole = useUnit(
    currentWorkspaceModel.$workspaceViewerRole
  )

  const removeWorkspaceMember = () => {
    onChangeMemberParticipation({
      member,
      action: 'exclude'
    })
  }

  const isCanManage =
    role === 'Member' || (role === 'Manager' && workspaceViewerRole === 'Owner')

  return (
    <div
      className={clsx(
        'flex items-center py-2 px-4 text-sm space-x-5 hover:bg-secondary dark:hover:bg-secondary/10 duration-75'
      )}
    >
      <div>
        <Avatar
          src={getImageUrl(avatar)}
          fallback={`${firstName[0]}${lastName[0]}`}
        />
      </div>

      <div className='flex justify-between items-center w-full'>
        <Column
          className='w-[170px] min-w-[170px] mr-2'
          text={`${lastName} ${firstName}`}
        />

        <Column className='w-[250px] min-w-[250px] mr-2' text={email} />

        <div className='w-[115px] min-w-[115px] mr-2'>
          {isCanManage ? (
            <SelectMemberRole memberId={id} role={role} />
          ) : (
            <div className='text-center'>{role}</div>
          )}
        </div>

        <IconButton
          icon='trash'
          className='h-[32px] w-[32px] min-w-[32px] p-0'
          size='sm'
          disabled={!isCanManage}
          onClick={removeWorkspaceMember}
        />
      </div>
    </div>
  )
}

// const Member = ({ memberInfo }: { memberInfo: MembersInfo }) => {
//   const { member, workTime, isComplete } = memberInfo
//   const { avatar, firstName, lastName } = member
//   return (
//     <div className='flex items-center py-1.5 text-xs md:text-sm w-full'>
//       <div className='flex justify-center items-center mr-3'>
//         <Avatar size='sm' src={getImageUrl(avatar)} />
//       </div>

//       <Column
//         className='w-[160px] min-w-[160px] mr-2'
//         text={`${lastName} ${firstName}`}
//       />

//       <div className='w-[40px] flex justify-end mr-3'>
//         {formatTime(workTime)}
//       </div>

//       <div className='w-[20px] flex justify-end'>
//         <Checkbox checked={isComplete} checkboxClassName='cursor-default' />
//       </div>
//     </div>
//   )
// }

const Column = ({ className, text }: { className?: string; text: string }) => (
  <div className={clsx(className, 'w-full')}>
    <Tooltip text={text}>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap h-[20px]'>
        {text}
      </div>
    </Tooltip>
  </div>
)
