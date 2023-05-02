import { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { Show } from '@/shared/ui'
import { $workspaceViewerRole } from '../model'
import { hasWorkspaceAccess } from '@/shared/lib'

interface HasAccessProps {
  children: ReactNode
}

export const HasAccess = ({ children }: HasAccessProps) => {
  const workspaceViewerRole = useUnit($workspaceViewerRole)

  if (!workspaceViewerRole) return null

  const isHasAccess = hasWorkspaceAccess(workspaceViewerRole)

  return <Show when={isHasAccess}>{children}</Show>
}
