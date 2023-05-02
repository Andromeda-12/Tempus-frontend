import { Role } from '@/shared/api'

const checkWorkspaceOwnerRole = (workspaceRole: Role) =>
  workspaceRole === 'Owner'

const checkProjectRole = (projectRole: Role) =>
  projectRole === 'Owner' || projectRole === 'Manager'

export const hasProjectAccess = (workspaceRole: Role, projectRole: Role) => {
  const isWorkspaceOwner = checkWorkspaceOwnerRole(workspaceRole)
  const isProjectOwnerOrProjectManager = checkProjectRole(projectRole)

  if (isWorkspaceOwner || isProjectOwnerOrProjectManager) return true

  return false
}

export const hasWorkspaceAccess = (workspaceRole: Role) =>
  workspaceRole === 'Owner' || workspaceRole === 'Manager'
