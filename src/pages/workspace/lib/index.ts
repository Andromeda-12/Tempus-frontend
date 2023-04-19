export const hasAccess = (
  role: 'Owner' | 'Manager' | 'Member',
  requiredRole: 'Owner' | 'Manager' | 'Member'
) => {
  if (role === 'Owner') return true
  if (role === 'Manager' && requiredRole !== 'Owner') return true
  if (role === 'Member' && requiredRole === 'Member') return true
  return false
}
