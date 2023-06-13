import { createEffect, createEvent, sample } from 'effector'
import { ProjectRequestParams } from '@/shared/lib'
import { ApiError, ProjectDto, ProjectsService, Role } from '@/shared/api'

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
    await ProjectsService.projectControllerAddMember(projectId, workspaceId, {
      userId
    })
)
export const removeMemberFx = createEffect<
  ProjectMembersParams,
  ProjectDto,
  ApiError
>(
  async ({ params: { projectId, workspaceId }, userId }) =>
    await ProjectsService.projectControllerRemoveMember(
      projectId,
      workspaceId,
      { userId }
    )
)

export const changeMemberRoleFx = createEffect<
  {
    projectId: number
    workspaceId: number
    memberId: number
    role: Role
  },
  ProjectDto,
  ApiError
>(
  async ({ projectId, workspaceId, memberId, role }) =>
    await ProjectsService.projectControllerChangeProjectRole(
      projectId,
      workspaceId,
      {
        role,
        memberId
      }
    )
)

sample({
  clock: addMember,
  target: addMemberFx
})
sample({
  clock: removeMember,
  target: removeMemberFx
})
