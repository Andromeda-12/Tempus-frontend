import { viewerModel } from '@/entities/viewer'
import { createEvent, Event, sample } from 'effector'
import { PreviewData } from 'next'
import {
  isClientPageContext,
  isServerPageContext,
  PageContext,
  StaticPageContext
} from 'nextjs-effector'
import { ParsedUrlQuery } from 'querystring'

export const appStarted = createEvent<PageContext>()
export const appStartedStatic = createEvent<StaticPageContext>()

export const setEntityByParamsId = (
  pageStarted: Event<StaticPageContext<ParsedUrlQuery, PreviewData>>,
  setEntity: Event<number>[]
) => {
  sample({
    clock: pageStarted,
    filter: ({ params }) => Boolean(params?.id),
    fn: ({ params }) => parseInt(params!.id as string, 10),
    target: [...setEntity]
  })
}

sample({
  source: appStarted,
  filter: isServerPageContext,
  target: viewerModel.loadViewer
})

sample({
  source: appStarted,
  filter: isClientPageContext,
  target: viewerModel.loadViewer
})
