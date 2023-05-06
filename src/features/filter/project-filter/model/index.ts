import { querySync } from 'atomic-router'
import { controls, workspaceRoute } from '@/shared/routing'
import { createToggleFilter } from '@/shared/lib'

export type FilterValue = 'showHidden'

export const values: FilterValue[] = ['showHidden']

export const projectFilter = createToggleFilter<FilterValue>()

querySync({
  source: { filter: projectFilter.currentValue },
  route: workspaceRoute, 
  controls
})
