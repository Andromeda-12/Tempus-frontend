import { querySync } from 'atomic-router'
import { controls, workspacesRoute } from '@/shared/routing'
import { createToggleFilter } from '@/shared/lib'

export type FilterValue = 'own' | 'others'

export const values: FilterValue[] = ['own', 'others']

export const workspaceFilter = createToggleFilter<FilterValue>()

querySync({
  source: { filter: workspaceFilter.currentValue },
  route: workspacesRoute,
  controls
})
