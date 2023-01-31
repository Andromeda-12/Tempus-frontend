import { NextPageContext } from 'next'

export const getSidebarStateServerSide = (context: NextPageContext) => {
  let isSidebarOpen = false
  const cookie = context.req?.headers.cookie?.split(';')
  cookie?.forEach((c) => {
    if (c.includes('isSidebarOpen')) {
      isSidebarOpen = JSON.parse(c.split('=')[1])
    }
  })

  return isSidebarOpen
}
