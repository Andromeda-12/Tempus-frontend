import { createEffect, createEvent, sample } from 'effector'
import { ProjectRequestParams } from '@/shared/lib'
import { ApiError, ProjectDto, ProjectsService } from '@/shared/api'

type ProjectMembersParams = {
  params: ProjectRequestParams
  userId: number
}

export const addMember = createEvent<ProjectMembersParams>()
export const removeMember = createEvent<ProjectMembersParams>()

export const addMemberFx = createEffect<
  ProjectMembersParams,
  ProjectDto,
  ApiError
>(
  async ({ params: { projectId, workspaceId }, userId }) =>
    await ProjectsService.projectControllerAddMember(projectId, workspaceId)
)
export const removeMemberFx = createEffect<
  ProjectMembersParams,
  ProjectDto,
  ApiError
>(
  async ({ params: { projectId, workspaceId }, userId }) =>
    await ProjectsService.projectControllerRemoveMember(projectId, workspaceId)
)

sample({
  clock: addMember,
  target: addMemberFx
})
sample({
  clock: removeMember,
  target: removeMemberFx
})
