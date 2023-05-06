import { createEffect } from 'effector'
import { TaskRequestParams } from '@/shared/lib'
import { ApiError, TaskDto, TasksService } from '@/shared/api'

type TaskMembersParams = {
  params: TaskRequestParams
  userId: number
}

export const assignMemberFx = createEffect<
  TaskMembersParams,
  TaskDto,
  ApiError
>(
  async ({ params: { taskId, projectId, workspaceId }, userId }) =>
    await TasksService.taskControllerAssignUser(
      taskId,
      userId,
      projectId,
      workspaceId
    )
)
export const removeMemberFx = createEffect<
  TaskMembersParams,
  TaskDto,
  ApiError
>(
  async ({ params: { taskId, projectId, workspaceId }, userId }) =>
    await TasksService.taskControllerRemoveUser(
      taskId,
      userId,
      projectId,
      workspaceId
    )
)
