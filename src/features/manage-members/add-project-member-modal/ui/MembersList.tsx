import { useUnit } from 'effector-react'
import { Member } from './Member'
import { $unassignedMembers } from '../model'

export const MembersList = () => {
  const unassignedMembers = useUnit($unassignedMembers)

  return (
    <div className='border-2 dark:border-secondary/50 rounded-lg flex flex-col p-3 pr-1 h-full w-full'>
      <div className='scrollbar scrollbar-dense overflow-y-auto overflow-x-auto h-full overflow-hidden pr-2'>
        {unassignedMembers.length === 0 && (
          <div className='text-center opacity-50'>
            unassigned members not found
          </div>
        )}
        {unassignedMembers.map((member) => (
          <Member key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
