import { useUnit } from 'effector-react'
import { PageCover } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { $currentWorkspace } from '../model'

export const WorkspaceCover = () => {
  const currentWorkspace = useUnit($currentWorkspace)
  return <PageCover cover={getImageUrl(currentWorkspace?.cover)} />
}
