import { createEvent, createStore } from 'effector'

export const createModal = () => {
  const openModal = createEvent()
  const closeModal = createEvent()

  const $isOpen = createStore(false)
    .on(openModal, () => true)
    .on(closeModal, () => false)

  return {
    openModal,
    closeModal,
    $isOpen
  }
}
