import { querySync } from 'atomic-router'
import { controls, projectRoute } from '@/shared/routing'
import { createToggleFilter } from '@/shared/lib'

export type FilterValue = 'all' | 'assigned' | 'unassigned'

export const values: FilterValue[] = ['all', 'assigned', 'unassigned']

export const taskFilter = createToggleFilter<FilterValue>()

querySync({
  source: { filter: taskFilter.currentValue },
  route: projectRoute,
  controls
})
