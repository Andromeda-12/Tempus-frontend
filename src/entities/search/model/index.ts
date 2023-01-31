import { createEffect, createEvent, createStore, restore } from 'effector'

export const changeSearchText = createEvent<string>()

export const $searchText = restore(changeSearchText, '')

// export const getResultBySearch = createEffect<
//   string,
//   GetLeaguesResponse['response'],
//   Error
// >(async (query) => {
//   const { response } = await rapidApi.searchApi.searchLeagues(query)
//   return response
// })

// export const $searchLoading = getResultBySearch.pending
