import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { projectModel } from '@/entities/project'
import { createModal } from '@/shared/lib'
import { UpdateProjectDto } from '@/shared/api'

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
  clock: projectModel.updateProjectFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Update project error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
