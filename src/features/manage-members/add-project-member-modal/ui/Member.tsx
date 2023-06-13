import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { Avatar, IconButton, Tooltip } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { MemberDto } from '@/shared/api'
import { assignToProject } from '../model'

interface MemberProps {
  member: MemberDto
}

export const Member = ({ member }: MemberProps) => {
  const { avatar, firstName, lastName, email, role, id: memberId } = member
  const workspaceViewerRole = useUnit(
    currentWorkspaceModel.$workspaceViewerRole
  )
  const assignToProjectFn = useUnit(assignToProject)

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
          {isCanManage && <div className='text-center'>{role}</div>}
        </div>

        <IconButton
          icon='regularPlus'
          className='h-[32px] w-[32px] min-w-[32px] p-0'
          size='sm'
          variant='text'
          disabled={!isCanManage}
          onClick={() => assignToProjectFn({ memberId })}
        />
      </div>
    </div>
  )
}

const Column = ({ className, text }: { className?: string; text: string }) => (
  <div className={clsx(className, 'w-full')}>
    <Tooltip text={text}>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap h-[20px]'>
        {text}
      </div>
    </Tooltip>
  </div>
)
