import { Role } from "@/shared/api"

export const hasAccess = (
  role: Role,
  requiredRole: Role
) => {
  if (role === 'Owner') return true
  if (role === 'Manager' && requiredRole !== 'Owner') return true
  if (role === 'Member' && requiredRole === 'Member') return true
  return false
}
