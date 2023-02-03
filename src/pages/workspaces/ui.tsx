import { WorkspaceList } from '@/widgets/workspace-list'
import { Input } from '@/shared/ui'
import { CreateWorkspaceButton } from '@/features/workspace/create-workspace'
import { WorkspaceFilter } from '@/features/filter/workspace-filter'

export const WorkspacesPage = () => {
  return (
    <div className='py-10'>
      <CreateWorkspaceButton />

      <div className='flex'></div>
      <div className='mb-7 flex items-center justify-between space-x-10'>
        <WorkspaceFilter />

        <Input
          notAccent
          size='sm'
          placeholder='Search title'
          startIconName='search'
        />
      </div>

      <div className='scrollbar'>
        <WorkspaceList />
      </div>
    </div>
  )
}
