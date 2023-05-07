import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { projectModel } from '@/entities/project'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { createModal } from '@/shared/lib'
import { UpdateProjectDto } from '@/shared/api'
import { workspaceRoute } from '@/shared/routing'

export const updateProject = createEvent<UpdateProjectDto>()

export const updateProjectModal = createModal()

sample({
  clock: updateProject,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject
  },
  filter: ({ currentWorkspace, currentProject }) =>
    !!currentWorkspace && !!currentProject,
  fn: ({ currentWorkspace, currentProject }, updateProjectDto) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id
    },
    updateProjectDto
  }),
  target: projectModel.updateProject
})

sample({
  clock: projectModel.updateProjectFx.doneData,
  target: currentProjectModel.setCurrentProject
})

sample({
  clock: projectModel.removeProjectFx.doneData,
  target: updateProjectModal.closeModal
})

redirect({
  clock: projectModel.removeProjectFx.doneData,
  params: ({ workspaceId }) => ({
    workspaceId
  }),
  route: workspaceRoute
})

sample({
  clock: projectModel.updateProjectFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Update project error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
