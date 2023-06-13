import { useUnit } from "effector-react"
import { Input } from "@/shared/ui"
import { $searchedName, setSearchedName } from "../model"

export const SearchMember = () => {
  const searchedName = useUnit($searchedName)
  const setSearchedNameFn = useUnit(setSearchedName)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedNameFn(e.target.value)
  }

  return (
    <Input
      value={searchedName}
      onChange={handleInput}
      className="w-full sm:w-fit"
      notAccent
      size='sm'
      placeholder='Search by surname'
      startIconName='search'
    />
  )
}
