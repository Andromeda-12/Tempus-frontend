import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import { WorkspaceList } from '@/entities/workspace'
import { Button, Icon } from '@/shared/ui'
import { CreateWorkspaceButton } from '@/features/workspace/create-workspace'
import { useGate } from 'effector-react'
// import { workspacePageGate } from './model'

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

interface Props {}

const Popover = (props: Props) => {
  return (
    <div className='relative z-10 sm:z-50'>
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <Button>Click</Button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Content
          sideOffset={4}
          align='start'
          className={clsx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'rounded-lg p-4 shadow-md md:w-56',
            'bg-white dark:bg-neutral'
          )}
        >
          <PopoverPrimitive.Arrow className='fill-current text-white dark:text-gray-800' />
          <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
            Dimensions
          </h3>

          <PopoverPrimitive.Close
            className={clsx(
              'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <div className='h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400'>
              s
            </div>
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  )
}

export const WorkspacesPage = () => {
  // useGate(workspacePageGate)

  return (
    <div className='py-5'>
      <CreateWorkspaceButton />

      {/* экспориторовать только функцию открытия модалки, вся логика модалки внутри фичи */}

      <div>
        <Popover />
      </div>

      <div className='inline-flex text-sm items-center space-x-2'>
        <div className=''>Filter:</div>
        <div>
          <Select />
        </div>
      </div>

      <div className='scrollbar'>
        <WorkspaceList />
      </div>
    </div>
  )
}
