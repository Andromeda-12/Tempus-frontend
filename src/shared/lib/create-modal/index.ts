import { createEvent, createStore } from 'effector'

export const createModal = () => {
  const openModal = createEvent()
  const closeModal = createEvent()

  const $isOpen = createStore(false)
    .on(openModal, () => true)
    .on(closeModal, () => false)

  $isOpen.watch((f) => console.log(f))

  return {
    openModal,
    closeModal,
    $isOpen
  }
}
