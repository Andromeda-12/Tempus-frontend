import { createEffect, createEvent, createStore, sample } from 'effector'
import { GetRequestQuery, ProjectRequestParams } from '@/shared/lib'
import {
  ApiError,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectsService
} from '@/shared/api'

export const createProject = createEvent<{
  workspaceId: number
  createProjectDto: CreateProjectDto
}>()
export const updateProject = createEvent<{
  params: ProjectRequestParams
  updateProjectDto: UpdateProjectDto
}>()
export const removeProject = createEvent<ProjectRequestParams>()
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
export const getMemberProjectsFx = createEffect<
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
  {
    workspaceId: number
    createProjectDto: CreateProjectDto
  },
  ProjectDto,
  ApiError
>(
  async ({ workspaceId, createProjectDto }) =>
    await ProjectsService.projectControllerCreate(workspaceId, createProjectDto)
)
export const updateProjectFx = createEffect<
  {
    params: ProjectRequestParams
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
  ProjectRequestParams,
  ProjectDto,
  ApiError
>(
  async ({ projectId, workspaceId }) =>
    await ProjectsService.projectControllerRemove(projectId, workspaceId)
)

export const $projects = createStore<ProjectDto[]>([])
  .on(getMemberProjectsFx.doneData, (_, projects) => [..._, ...projects])
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
