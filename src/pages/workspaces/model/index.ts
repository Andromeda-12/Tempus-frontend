import { createEvent, sample } from 'effector'
import { createGate } from 'effector-react'
import { viewerModel } from '@/entities/viewer'
import { PageContext } from 'nextjs-effector'
import { workspaceModel } from '@/entities/workspace'

// export const workspacePageGate = createGate()

// sample({
//   clock: workspacePageGate.open,
//   target: viewerModel.loadViewer
// })

export const pageStarted = createEvent<PageContext>()

pageStarted.watch(() => console.log('started'))

sample({
  clock: pageStarted,
  target: workspaceModel.loadMoreWorkspaces
})
