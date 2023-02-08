export * from './settings'


import { workspaceRoute } from '@/shared/routing'
import { WorkspacePage } from './ui'

export const Workspace = {
  view: WorkspacePage,
  route: workspaceRoute
}
