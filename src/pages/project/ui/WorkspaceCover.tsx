import { useUnit } from 'effector-react'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { getImageUrl } from '@/shared/lib'
import { PageCover } from '@/shared/ui'

export const WorkspaceCover = () => {
  const currentWorkspace = useUnit(currentWorkspaceModel.$currentWorkspace)
  return <PageCover cover={getImageUrl(currentWorkspace?.cover)} />
}
