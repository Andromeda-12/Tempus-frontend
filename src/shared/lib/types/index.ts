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
  isOwned: boolean
}
