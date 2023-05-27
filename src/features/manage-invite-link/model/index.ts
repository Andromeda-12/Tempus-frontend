import { createEffect, createEvent, restore, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import {
  currentWorkspaceModel,
  workspaceManagerModel
} from '@/entities/current-workspace'
import { createModal } from '@/shared/lib'

const copyLinkToClipboardFx = createEffect<string, void>(async (link) =>
  navigator.clipboard.writeText(link)
)

export const generateInviteLink = createEvent()
export const removeInviteLink = createEvent()
export const copyLinkToClipboard = createEvent()
const setLink = createEvent<string>()
const resetLink = createEvent()

export const $inviteLink = restore(setLink, null).reset(resetLink)
export const $isLoading = workspaceManagerModel.getInviteLinkFx.pending

export const manageInviteLinkModal = createModal()

sample({
  clock: manageInviteLinkModal.openModal,
  source: currentWorkspaceModel.$currentWorkspace,
  filter: (currentWorkspace) => !!currentWorkspace,
  fn: (currentWorkspace) => ({
    workspaceId: currentWorkspace!.id
  }),
  target: workspaceManagerModel.getInviteLinkFx
})
sample({
  clock: manageInviteLinkModal.closeModal,
  target: resetLink
})

sample({
  clock: generateInviteLink,
  source: currentWorkspaceModel.$currentWorkspace,
  filter: (currentWorkspace) => !!currentWorkspace,
  fn: (currentWorkspace) => ({
    workspaceId: currentWorkspace!.id
  }),
  target: workspaceManagerModel.generateInviteLinkFx
})
sample({
  clock: [
    workspaceManagerModel.getInviteLinkFx.doneData,
    workspaceManagerModel.generateInviteLinkFx.doneData
  ],
  target: setLink
})

sample({
  clock: removeInviteLink,
  source: currentWorkspaceModel.$currentWorkspace,
  filter: (currentWorkspace) => !!currentWorkspace,
  fn: (currentWorkspace) => ({
    workspaceId: currentWorkspace!.id
  }),
  target: workspaceManagerModel.removeInviteLinkFx
})
sample({
  clock: workspaceManagerModel.removeInviteLinkFx.done,
  target: resetLink
})

sample({
  clock: copyLinkToClipboard,
  source: $inviteLink,
  filter: Boolean,
  target: copyLinkToClipboardFx
})

sample({
  clock: copyLinkToClipboardFx.done,
  fn: () =>
    notificationModel.createNotificationBody({
      type: 'success',
      message: 'Link copied',
      autoHideDuration: 3000
    }),
  target: notificationModel.createNotification
})
