import { createEffect, createEvent, createStore, sample } from 'effector'
import { GetRequestQuery, ProjectRequesParams } from '@/shared/lib'
import {
  ApiError,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectsService
} from '@/shared/api'

export const createProject = createEvent<CreateProjectDto>()
export const updateProject = createEvent<{
  params: ProjectRequesParams
  updateProjectDto: UpdateProjectDto
}>()
export const removeProject = createEvent<ProjectRequesParams>()
export const resetProjects = createEvent()

export const getAllProjectsFx = createEffect<
  {
    workspaceId: number
    query: GetRequestQuery
  },
  ProjectDto[],
  ApiError
>(
  async ({ workspaceId, query: { offset, limit, title } }) =>
    await ProjectsService.projectControllerGetAllProjects(
      workspaceId,
      offset,
      limit,
      title
      // isOwned
    )
)
export const getProjectsFx = createEffect<
  {
    workspaceId: number
    query: GetRequestQuery
  },
  ProjectDto[],
  ApiError
>(
  async ({ workspaceId, query: { offset, limit, title } }) =>
    await ProjectsService.projectControllerGetProjects(
      workspaceId,
      offset,
      limit,
      title
      // isOwned
    )
)
export const createProjectFx = createEffect<
  CreateProjectDto,
  ProjectDto,
  ApiError
>(
  async (createProjectDto) =>
    await ProjectsService.projectControllerCreate(1, createProjectDto)
)
export const updateProjectFx = createEffect<
  {
    params: ProjectRequesParams
    updateProjectDto: UpdateProjectDto
  },
  ProjectDto,
  ApiError
>(
  async ({ params: { projectId, workspaceId }, updateProjectDto }) =>
    await ProjectsService.projectControllerUpdate(
      projectId,
      workspaceId,
      updateProjectDto
    )
)
export const removeProjectFx = createEffect<
  ProjectRequesParams,
  ProjectDto,
  ApiError
>(
  async ({ projectId, workspaceId }) =>
    await ProjectsService.projectControllerRemove(projectId, workspaceId)
)

export const $projects = createStore<ProjectDto[]>([])
  .on(getProjectsFx.doneData, (_, projects) => [..._, ...projects])
  .on(getAllProjectsFx.doneData, (_, projects) => [..._, ...projects])
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
