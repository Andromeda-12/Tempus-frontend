import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { Show } from '@/shared/ui'
import { $workspaceViewerRole } from '../model'
import { hasAccess } from '../lib'

interface HasAccessProps {
  children: ReactNode
  role: 'Owner' | 'Manager' | 'Member'
}

export const HasAccess = ({ children, role }: HasAccessProps) => {
  const workspaceViewerRole = useUnit($workspaceViewerRole)

  console.log(workspaceViewerRole);
  

  if (!workspaceViewerRole) return null

  const isHasAccess = hasAccess(workspaceViewerRole, role)

  return <Show when={isHasAccess}>{children}</Show>
}
