import { createHistoryRouter } from 'atomic-router'
import { createRoutesView } from 'atomic-router-react'
import { createBrowserHistory } from 'history'
import { SignIn } from '@/pages/sign-in'
import { SignUp } from '@/pages/sign-up'
import { Workspaces } from '@/pages/workspaces'
import { Workspace } from '@/pages/workspace'
import { NotFound } from '@/pages/404'
import { AuthLayout, SidebarLayout } from '@/widgets/layouts'
import { controls } from '@/shared/routing'

const routes = [
  { path: '/signin', route: SignIn.route },
  { path: '/signup', route: SignUp.route },
  { path: '/workspaces', route: Workspaces.route },
  { path: '/workspaces/:workspaceId', route: Workspace.route },
  { path: '/404', route: NotFound.route }
]

const history = createBrowserHistory()

export const router = createHistoryRouter({
  routes,
  controls
})

router.setHistory(history)

export const RoutesView = createRoutesView({
  routes: [
    { route: SignIn.route, view: SignIn.view, layout: AuthLayout },
    { route: SignUp.route, view: SignUp.view, layout: AuthLayout },
    { route: Workspaces.route, view: Workspaces.view, layout: SidebarLayout },
    { route: Workspace.route, view: Workspace.view, layout: SidebarLayout },
    { route: NotFound.route, view: NotFound.view }
  ],
  otherwise() {
    return <NotFound.view />
  }
})
