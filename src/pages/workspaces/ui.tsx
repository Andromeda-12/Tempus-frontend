import { WorkspaceList } from '@/widgets/workspace-list'
import { WorkspaceFilter } from '@/features/filter/workspace-filter'
import { WorkspaceSearch } from '@/features/filter/workspace-search'
import { CreateWorkspaceButton } from '@/features/workspace/create-workspace'

export const WorkspacesPage = () => {
  return (
    <div className='py-10'>
      <CreateWorkspaceButton />

      <div className='flex'></div>
      <div className='mb-7 flex items-center justify-between space-x-10'>
        <WorkspaceFilter />

        <WorkspaceSearch />
      </div>

      <div className='scrollbar'>
        <WorkspaceList />
      </div>
    </div>
  )
}
