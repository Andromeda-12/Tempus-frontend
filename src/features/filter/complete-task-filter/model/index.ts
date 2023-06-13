import { querySync } from 'atomic-router'
import { controls, projectRoute } from '@/shared/routing'
import { createToggleFilter } from '@/shared/lib'

export type FilterValue = 'completed' | 'uncompleted'

export const values: FilterValue[] = ['completed', 'uncompleted']

export const completeTaskFilter = createToggleFilter<FilterValue>('uncompleted')

querySync({
  source: { completeFilter: completeTaskFilter.currentValue },
  route: projectRoute,
  controls
})
