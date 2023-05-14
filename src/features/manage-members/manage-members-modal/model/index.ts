import { createEvent, createStore, restore, sample } from 'effector'
import { debounce } from 'patronum'
import { createGate } from 'effector-react'
import { MemberDto } from '@/shared/api'
import { MembersListAction } from '../lib'

export const setSearchedName = createEvent<string>()
export const debouncedSearchedName = debounce({
  source: setSearchedName,
  timeout: 300
})
export const resetStores = createEvent()
export const changeParticipation = createEvent<MembersListAction>()

export const gate = createGate<{
  allMembers: MemberDto[]
  assignedMembers: MemberDto[]
}>()

const $allMembers = createStore<MemberDto[]>([]).reset(resetStores)
export const $filteredMembers = createStore<MemberDto[]>([]).reset(resetStores)
export const $searchedName = restore<string>(setSearchedName, '').reset(
  resetStores
)

sample({
  clock: gate.open,
  fn: ({ allMembers }) => allMembers,
  target: [$allMembers, $filteredMembers]
})

sample({
  clock: $searchedName,
  source: $allMembers,
  fn: (members, searchedName) =>
    members.filter((member) =>
      member.firstName.toLowerCase().includes(searchedName.toLowerCase())
    ),
  target: $filteredMembers
})
