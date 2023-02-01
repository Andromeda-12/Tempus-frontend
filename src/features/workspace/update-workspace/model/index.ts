import { createModal } from '@/shared/lib'
import { createEvent, createStore, sample } from 'effector'

export const handleClick = createEvent()

export const updateWorkspaceModal = createModal()

sample({
  clock: handleClick,
  target: updateWorkspaceModal.openModal
})
