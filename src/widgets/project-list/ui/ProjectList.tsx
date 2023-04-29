import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Link } from 'atomic-router-react'
import { Project, projectModel } from '@/entities/project'
import { projectRoute } from '@/shared/routing'
import { Spinner } from '@/shared/ui'
import { $isAllDataLoaded, $isLoading, loadMoreProjects } from '../model'

export const ProjectList = () => {
  const projects = useUnit(projectModel.$projects)

  const isAllDataLoaded = useUnit($isAllDataLoaded)
  const isLoading = useUnit($isLoading)
  const loadMoreProjectsFn = useUnit(loadMoreProjects)

  const scrollHanlder = (e: Event) => {
    const document = e.target as Document

    if (
      !isAllDataLoaded &&
      document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.scrollHeight - 300
    )
      loadMoreProjectsFn()
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHanlder)

    return () => {
      document.removeEventListener('scroll', scrollHanlder)
    }
  }, [isAllDataLoaded])

  if (isLoading)
    return (
      <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
        <Spinner className='border-4' />
      </div>
    )

  if (projects.length === 0)
    return (
      <div className='col-span-full justify-center flex flex-col space-y-3 items-center'>
        <h3>No projects</h3>
      </div>
    )

  return (
    <div className='grid gap-7 grid-cols-[repeat(auto-fill,minmax(272px,1fr))]'>
      {projects.map((project) => (
        <Link
          to={projectRoute}
          params={{ projectId: project.id, workspaceId: project.workspaceId }}
          key={project.id}
        >
          <Project project={project} />
        </Link>
      ))}
    </div>
  )
}
