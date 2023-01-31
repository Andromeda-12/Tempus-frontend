import { NextPage } from 'next'
import { AppProps as NextAppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type CustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  isNotFoundPage?: boolean
  isSidebarOpen?: boolean
}

export type CustomAppProps = NextAppProps & {
  Component: CustomPage
}
