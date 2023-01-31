import { appStarted } from '@/shared/routing'
import { sample, createEffect, createStore } from 'effector'
import { createEvent } from 'effector'

export type Theme = 'light' | 'dark'

export const $theme = createStore<Theme>('light')
export const toggleTheme = createEvent()

const getThemeFx = createEffect<void, Theme, Error>(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
    return 'dark'

  return 'light'
})

const saveThemeToLSFx = createEffect<Theme, void, Error>((theme) => {
  localStorage.setItem('theme', theme)
})

const setThemeClassFx = createEffect<Theme, void, Error>((theme) => {
  if (theme === 'dark') document.documentElement.classList.add('dark')
  if (theme === 'light') document.documentElement.classList.remove('dark')
})

sample({
  clock: appStarted,
  target: getThemeFx
})

sample({
  clock: getThemeFx.doneData,
  target: $theme
})

sample({
  clock: toggleTheme,
  source: $theme,
  fn: (theme) => {
    if (theme === 'light') return 'dark'
    return 'light'
  },
  target: $theme
})

sample({
  clock: $theme,
  target: [saveThemeToLSFx, setThemeClassFx]
})
