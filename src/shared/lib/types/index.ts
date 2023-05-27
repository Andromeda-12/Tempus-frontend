import { ReactNode } from 'react'

export interface PropsWithClassName {
  className?: string
}

export interface PropsWithChildren extends PropsWithClassName {
  children: ReactNode
}

export type GetRequestQuery = {
  offset: number
  limit: number
  title: string
  filter: string
}

export type GetTasksRequestQuery = {
  offset: number
  limit: number
  title: string
  assignFilter: string
  completedFilter: string
}

export type ProjectRequestParams = {
  workspaceId: number
  projectId: number
}

export type TaskRequestParams = {
  workspaceId: number
  projectId: number
  taskId: number
}
