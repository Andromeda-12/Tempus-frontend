import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { ConfirmCompleteTaskModal } from './ConfirmCompleteTaskModal'
import { $isCanComplete, confirmModal } from '../model'

export const CompleteTaskButton = () => {
  const isOpen = useUnit(confirmModal.$isOpen)
  const openModal = useUnit(confirmModal.openModal)
  const isCanComplete = useUnit($isCanComplete)

  return (
    <>
      {isOpen && <ConfirmCompleteTaskModal />}

      <Button
        onClick={openModal}
        variant='contained'
        disabled={!isCanComplete}
        accent
      >
        Complete task
      </Button>
    </>
  )
}
