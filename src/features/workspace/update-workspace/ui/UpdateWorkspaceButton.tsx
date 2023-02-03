import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { Button } from '@/shared/ui'
import { UpdateWorkspaceModal } from './UpdateWorkspaceModal'
import { handleClick } from '../model'

interface UpdateWorkspaceButtonProps {
  className?: string
}

export const UpdateWorkspaceButton = ({
  className
}: UpdateWorkspaceButtonProps) => {
  const handleClickFn = useUnit(handleClick)

  return (
    <>
      <UpdateWorkspaceModal />

      <Button
        dense
        variant='text'
        className={clsx('py-2', className)}
        onClick={handleClickFn}
      >
        Update workspace
      </Button>
    </>
  )
}
