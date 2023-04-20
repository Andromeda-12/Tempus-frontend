import { Roles } from "@/shared/api"

export const hasAccess = (
  role: Roles,
  requiredRole: Roles
) => {
  if (role === 'Owner') return true
  if (role === 'Manager' && requiredRole !== 'Owner') return true
  if (role === 'Member' && requiredRole === 'Member') return true
  return false
}
