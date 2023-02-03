import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import { WorkspaceList } from '@/widgets/workspace-list'
import { Icon, Input } from '@/shared/ui'
import { CreateWorkspaceButton } from '@/features/workspace/create-workspace'
import { UpdateWorkspaceButton } from '@/features/workspace/update-workspace'
import { UpdateWorkspaceModal } from '@/features/workspace/update-workspace'
import { WorkspaceFilter } from '@/features/filter/workspace-filter'
// import { workspacePageGate } from './model'
import * as PopoverPrimitive from '@radix-ui/react-popover'

const items = [
  {
    id: 'width',
    label: 'Width',
    defaultValue: '100%'
  },
  {
    id: 'max-width',
    label: 'Max. width',
    defaultValue: '300px'
  },
  {
    id: 'height',
    label: 'Height',
    defaultValue: '25px'
  },
  {
    id: 'max-height',
    label: 'Max. height',
    defaultValue: 'none'
  }
]

type SelectProps = {}

const Select = (props: SelectProps) => {
  return (
    <SelectPrimitive.Root defaultValue='blueberry'>
      <SelectPrimitive.Trigger aria-label='Food'>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className='ml-2'>
          <Icon name='eye' />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content className='bg-white dark:bg-gray-800 mt-8 p-2 w-[300px] rounded-lg shadow-lg'>
        <SelectPrimitive.ScrollUpButton className='flex items-center justify-center text-gray-700 dark:text-gray-300'>
          <Icon name='eye' />
        </SelectPrimitive.ScrollUpButton>

        {['Apple', 'Banana', 'Blueberry', 'Strawberry', 'Grapes'].map(
          (f, i) => (
            <SelectPrimitive.Item
              key={`${f}-${i}`}
              value={f.toLowerCase()}
              className={clsx(
                'relative cursor-pointer flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
                'radix-disabled:opacity-50',
                'focus:outline-none select-none'
              )}
            >
              <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                <Icon name='eye' />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          )
        )}
        <SelectPrimitive.ScrollDownButton className='flex items-center justify-center text-gray-700 dark:text-gray-300'>
          <Icon name='eye' />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export const WorkspacesPage = () => {
  return (
    <div className='py-5'>
      {/* экспориторовать только функцию открытия модалки, вся логика модалки внутри фичи */}
      <div>
        <CreateWorkspaceButton />
      </div>

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
