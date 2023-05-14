import { sample } from 'effector'
import { pending } from 'patronum'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import {
  currentProjectModel,
  projectManagerModel
} from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { createModal } from '@/shared/lib'
import { manageMembersModel } from '../../manage-members-modal'

export const manageProjectMembersModal = createModal()

sample({
  clock: manageProjectMembersModal.closeModal,
  target: manageMembersModel.resetStores
})

export const $isLoading = pending({
  effects: [projectManagerModel.addMemberFx, projectManagerModel.removeMemberFx]
})

sample({
  clock: [
    projectManagerModel.addMemberFx.doneData,
    projectManagerModel.removeMemberFx.doneData
  ],
  target: currentProjectModel.setCurrentProject
})

sample({
  clock: manageMembersModel.changeParticipation,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: ({ currentWorkspace, currentProject, currentTask }, { action }) =>
    !!currentWorkspace &&
    !!currentProject &&
    !!currentTask &&
    action === 'assign',
  fn: ({ currentWorkspace, currentProject, currentTask }, { member }) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id,
      taskId: currentTask!.id
    },
    userId: member.id
  }),
  target: projectManagerModel.addMember
})
sample({
  clock: manageMembersModel.changeParticipation,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: ({ currentWorkspace, currentProject, currentTask }, { action }) =>
    !!currentWorkspace &&
    !!currentProject &&
    !!currentTask &&
    action === 'exclude',
  fn: ({ currentWorkspace, currentProject, currentTask }, { member }) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id,
      taskId: currentTask!.id
    },
    userId: member.id
  }),
  target: projectManagerModel.removeMember
})
