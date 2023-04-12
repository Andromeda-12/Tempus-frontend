import { createEffect, createEvent, createStore, sample } from 'effector'
import {
  ApiError,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectsService
} from '@/shared/api'
import { GetRequestQuery } from '@/shared/lib'

export const createProject = createEvent<CreateProjectDto>()
export const updateProject = createEvent<{
  id: number
  updateProjectDto: UpdateProjectDto
}>()
export const removeProject = createEvent<number>()

export const resetProjects = createEvent()

export const getProjectsFx = createEffect<
  GetRequestQuery,
  ProjectDto[],
  ApiError
>(
  async ({ offset, limit, title, isOwned }) =>
    await ProjectsService.projectControllerFindAll(
      offset,
      limit,
      title
      // isOwned
    )
)

export const getCurrentProjectFx = createEffect<
  {
    projects: ProjectDto[]
    param: number
  },
  ProjectDto | null,
  ApiError
>(async ({ projects, param }) => {
  const projectId = Number(param)
  if (isNaN(projectId)) return null

  const currentProject = projects.find((project) => project.id === projectId)

  if (currentProject) return currentProject

  const data = await ProjectsService.projectControllerFindOne(projectId)

  if (data) return data

  return null
})

export const createProjectFx = createEffect<
  CreateProjectDto,
  ProjectDto,
  ApiError
>(
  async (createProjectDto) =>
    await ProjectsService.projectControllerCreate(createProjectDto)
)

export const updateProjectFx = createEffect<
  {
    id: number
    updateProjectDto: UpdateProjectDto
  },
  ProjectDto,
  ApiError
>(
  async ({ id, updateProjectDto }) =>
    await ProjectsService.projectControllerUpdate(id, updateProjectDto)
)

export const removeProjectFx = createEffect<number, ProjectDto, ApiError>(
  async (id) => await ProjectsService.projectControllerRemove(id)
)

export const $projects= createStore<ProjectDto[]>([])
  .on(getProjectsFx.doneData, (_, projects) => [..._, ...projects])
  .on(createProjectFx.doneData, (_, project) => [..._, project])
  .on(removeProjectFx.doneData, (_, project) => [
    ..._.filter((p) => p.id !== project.id)
  ])
  .reset(resetProjects)

sample({
  clock: createProject,
  target: createProjectFx
})

sample({
  clock: updateProject,
  target: updateProjectFx
})

sample({
  clock: removeProject,
  target: removeProjectFx
})
