import { createEffect, createEvent, restore, sample } from 'effector'
import {
  AuthUserDto,
  UserDto,
  CreateUserDto,
  AuthService,
  UserService,
  ApiError,
  UpdateUserDto
} from '@/shared/api'

export const setViewer = createEvent<UserDto | null>()
export const signOutViewer = createEvent()

export const loadViewerFx = createEffect<string | void, UserDto, ApiError>(
  async () => await UserService.userControllerGetCurrentUser()
)

export const signUpFx = createEffect<CreateUserDto, UserDto, ApiError>(
  async (createUserDto) => await AuthService.authControllerSignUp(createUserDto)
)

export const signInFx = createEffect<AuthUserDto, UserDto, ApiError>(
  async (authUserDto) => await AuthService.authControllerSignIn(authUserDto)
)

export const signOut = createEffect<void, void, ApiError>(
  async () => await AuthService.authControllerSignOut()
)

export const refresh = createEffect<void, void, ApiError>(async () => {
  await AuthService.authControllerRefresh()
})

export const updateViewerFx = createEffect<UpdateUserDto, UserDto, ApiError>(
  async (updateUserDto) => await UserService.userControllerUpdate(updateUserDto)
)

export const $viewer = restore<UserDto | null>(setViewer, null).reset(
  signOutViewer
)

sample({
  clock: loadViewerFx.doneData,
  target: setViewer
})
