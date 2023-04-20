import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui'
import { ProjectDto } from '@/shared/api'
import { ConfirmDeletionProjectModal } from './ConfirmDeletionProjectModal'
import { confirmModal, setCurrentProject } from '../model'

export const DeleteProjectButton = ({ project }: { project: ProjectDto }) => {
  const openConfirmModal = useUnit(confirmModal.openModal)
  const setCurrentProjectFn = useUnit(setCurrentProject)

  const handleClick = () => {
    setCurrentProjectFn(project)
    openConfirmModal()
  }

  return (
    <div onMouseDown={(e) => e.stopPropagation()} className='w-full'>
      <ConfirmDeletionProjectModal />

      <Button variant='text' className='z-50 w-full' onClick={handleClick}>
        Delete
      </Button>
    </div>
  )
}
