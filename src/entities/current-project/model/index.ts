import { createEffect, createStore, sample } from 'effector'
import { ProjectRequesParams } from '@/shared/lib'
import { ApiError, ProjectDto, ProjectsService, Role } from '@/shared/api'

export const getCurrentProjectFx = createEffect<
  {
    projects: ProjectDto[]
    param: ProjectRequesParams
  },
  ProjectDto | null,
  ApiError
>(async ({ projects, param }) => {
  const projectsId = Number(param.projectId)
  const workspaceId = Number(param.workspaceId)

  if (isNaN(projectsId) || isNaN(workspaceId)) return null

  const currentProject = projects.find((project) => project.id === projectsId)

  if (currentProject) return currentProject

  const data = await ProjectsService.projectControllerFindOne(
    workspaceId,
    projectsId
  )

  if (data) return data

  return null
})

export const getProjectRoleFx = createEffect<
  {
    projectId: number
    workspaceId: number
  },
  Role,
  ApiError
>(async ({ projectId, workspaceId }) => {
  const { role } = await ProjectsService.projectControllerGetRole(
    projectId,
    workspaceId
  )
  return role
})

export const $currentProject = createStore<ProjectDto | null>(null)
export const $projectViewerRole = createStore<Role | null>(null)

sample({
  clock: getCurrentProjectFx.doneData,
  filter: Boolean,
  target: $currentProject
})

sample({
  clock: getProjectRoleFx.doneData,
  target: $projectViewerRole
})
