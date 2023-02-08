import { createEvent, restore, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { workspaceModel } from '@/entities/workspace'
import { WorkspaceDto } from '@/shared/api'
import { createModal } from '@/shared/lib'

export const inviteMember = createEvent()
export const setCurrentWorkspace = createEvent<WorkspaceDto>()

const deleteWorkspace = createEvent()

export const inviteMembersModal = createModal()

export const $currentWorkspace = restore(setCurrentWorkspace, null).reset(
  inviteMembersModal.closeModal
)

//  sample({
//   clock: inviteMember,
//   target: inviteMemberFx
// })

// sample({
//   clock: deleteWorkspace,
//   source: $currentWorkspace,
//   filter: Boolean,
//   fn: (currentWorkspace) => currentWorkspace.id,
//   target: workspaceModel.removeWorkspace
// })

// sample({
//   clock: workspaceModel.removeWorkspaceFx.failData,
//   fn: (error) =>
//     notificationModel.createNotificationBody({
//       type: 'error',
//       title: 'Delete workspace error',
//       message: error.body.message
//     }),
//   target: notificationModel.createNotification
// })

// sample({
//   clock: workspaceModel.removeWorkspaceFx.finally,
//   target: inviteMembersModal.closeModal
// })
