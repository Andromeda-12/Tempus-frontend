import { useUnit } from 'effector-react'
import { Select } from '@/shared/ui'
import { Role } from '@/shared/api'
import { changeMemberRole } from '../model'

export const SelectMemberRole = ({
  memberId,
  role
}: {
  memberId: number
  role: Role
}) => {
  const changeMemberRoleFn = useUnit(changeMemberRole)

  const handleChangeRole = (role: string) => {
    changeMemberRoleFn({
      memberId,
      role: role as Role
    })
  }

  return (
    <Select
      values={['Manager', 'Member']}
      value={role}
      onValueChange={handleChangeRole}
    />
  )
}
