import { Link } from 'atomic-router-react'
import { Project } from './Project'
import { projectRoute } from '@/shared/routing'

const projects = [
  {
    id: 0,
    title: 'Project 1',
    totalTasks: 21,
    assignedTask: 3
  },
  {
    id: 1,
    title: 'Project 2',
    totalTasks: 7,
    assignedTask: 0
  },
  {
    id: 3,
    title: 'Project 3',
    totalTasks: 15,
    assignedTask: 2
  },
  {
    id: 4,
    title: 'Project 4',
    totalTasks: 15,
    assignedTask: 2
  },
  {
    id: 5,
    title: 'Project 5',
    totalTasks: 15,
    assignedTask: 6
  }
]

export const ProjectList = () => {
  return (
    <div className='grid gap-7 grid-cols-[repeat(auto-fill,minmax(272px,1fr))]'>
      {projects.map((project) => (
        // href={`/project/${1}/dashboard`}
        <Link to={projectRoute} params={1} key={project.id}>
          <a>
            <Project project={project} />
          </a>
        </Link>
      ))}
    </div>
  )
}
