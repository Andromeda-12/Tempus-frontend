import { createEvent, createStore, sample } from 'effector'

export const createModal = () => {
  const openModal = createEvent()
  const closeModal = createEvent()

  const $isOpen = createStore(false)

  sample({
    clock: openModal,
    fn: () => true,
    target: $isOpen
  })

  sample({
    clock: closeModal,
    fn: () => false,
    target: $isOpen
  })

  return {
    openModal,
    closeModal,
    $isOpen
  }
}
