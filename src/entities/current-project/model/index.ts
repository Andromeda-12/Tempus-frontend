import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample
} from 'effector'
import { ProjectRequestParams } from '@/shared/lib'
import { ApiError, ProjectDto, ProjectsService, Role } from '@/shared/api'
import { addMemberFx, removeMemberFx } from './projectManagerModel'

export const setCurrentProject = createEvent<ProjectDto | null>()
export const resetCurrentProject = createEvent()

export const getCurrentProjectFx = createEffect<
  {
    projects: ProjectDto[]
    param: ProjectRequestParams
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
    projectsId,
    workspaceId
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

export const $currentProject = restore<ProjectDto | null>(
  setCurrentProject,
  null
).reset(resetCurrentProject)
export const $projectViewerRole = createStore<Role | null>(null).reset(
  resetCurrentProject
)
export const $members = $currentProject.map((p) => p?.members)

sample({
  clock: getCurrentProjectFx.doneData,
  filter: Boolean,
  target: $currentProject
})
sample({
  clock: getProjectRoleFx.doneData,
  target: $projectViewerRole
})
sample({
  clock: setCurrentProject,
  target: $currentProject
})
sample({
  clock: [addMemberFx.doneData, removeMemberFx.doneData],
  target: setCurrentProject
})
