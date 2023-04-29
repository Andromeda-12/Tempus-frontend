import { useUnit } from 'effector-react'
import { currentProjectModel } from '@/entities/current-project';

export const ProjectTitle = () => {
  const currentProject = useUnit(currentProjectModel.$currentProject)
  return <h2 className='text-lg font-medium'>{currentProject?.title}</h2>
}
