import { createHistoryRouter } from 'atomic-router'
import { createRoutesView } from 'atomic-router-react'
import { createBrowserHistory } from 'history'
import { SignIn } from '@/pages/sign-in'
import { SignUp } from '@/pages/sign-up'
import { ForgetPassword } from '@/pages/forget-password'
import { RecoveryPassword } from '@/pages/recovery-password'
import { Workspaces } from '@/pages/workspaces'
import { Workspace } from '@/pages/workspace'
import { NotFound } from '@/pages/404'
import { AuthLayout, CenteredLayout, SidebarLayout } from '@/widgets/layouts'
import { controls } from '@/shared/routing'
import { Settings } from '@/pages/settings'
import { Project } from '@/pages/project'

const routes = [
  { path: '/signin', route: SignIn.route },
  { path: '/signup', route: SignUp.route },
  { path: '/forget-password', route: ForgetPassword.route },
  { path: '/recovery-password', route: RecoveryPassword.route },
  { path: '/recovery-password', route: RecoveryPassword.route },
  { path: '/workspaces', route: Workspaces.route },
  { path: '/workspaces/:workspaceId', route: Workspace.route },
  { path: '/projects/:projectId', route: Project.route },
  { path: '/settings/:settingSection', route: Settings.route },
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
    {
      route: ForgetPassword.route,
      view: ForgetPassword.view,
      layout: CenteredLayout
    },
    {
      route: RecoveryPassword.route,
      view: RecoveryPassword.view,
      layout: CenteredLayout
    },
    { route: Workspaces.route, view: Workspaces.view, layout: SidebarLayout },
    { route: Workspace.route, view: Workspace.view, layout: SidebarLayout },
    { route: Settings.route, view: Settings.view, layout: SidebarLayout },
    { route: Project.route, view: Project.view, layout: SidebarLayout },
    { route: NotFound.route, view: NotFound.view }
  ],
  otherwise() {
    return <NotFound.view />
  }
})
