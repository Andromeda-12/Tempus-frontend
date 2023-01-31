import { ViewerAvatar } from '@/entities/viewer'
import { Button, Card, ContentContainer, Icon } from '@/shared/ui'
// import { OutlinedInput } from '@/shared/ui/Input2/OutlinedInput'
import clsx from 'clsx'
import { ReactNode } from 'react'

// export const TaskListContainer = ({
//   children,
//   className
// }: {
//   children: ReactNode
//   className?: string
// }) => <div className={clsx('px-10 py-3', className)}>{children}</div>

// export const TaskSearch = () => {
//   return (
//     <OutlinedInput
//       placeholder='Search'
//       className='rounded-3xl pl-8'
//       size='sm'
//       startIconName='search'
//       startIconStyles='text-black'
//     />
//   )
// }

export const TaskListHeader = () => {
  return (
    <div className='border-b border-primary dark:border-background-dark'>
      <ContentContainer className='flex justify-between'>
        <Button startIcon='+' dense accent className='py-1.5'>
          New Task
        </Button>

        <div className='px-2 flex items-center'>Filters</div>

        {/* <TaskSearch /> */}
      </ContentContainer>
    </div>
  )
}

export const Task = () => {
  return (
    <div
      className={clsx(
        'duration-100 hover:bg-primary/10 dark:hover:bg-gray-600/30'
      )}
    >
      <ContentContainer py={false} className='flex justify-between py-2'>
        <div className='flex items-center'>
          <ViewerAvatar className='mr-4' />
          <div>Task name</div>
        </div>

        <div className='flex items-center'>
          <div className='mr-4'>00:00:00</div>
          <button className='cursor-pointer rounded-full w-fit hover:bg-primary/15 dark:hover:bg-neutral duration-150'>
            <Icon name='play' className='w-9 h-9 relative -right-0.5' />
          </button>
        </div>
      </ContentContainer>
    </div>
  )
}

export const List = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('h-full', className)}>
      <Task />
      <Task />
      <Task />
    </div>
  )
}

export const Drawer = ({ className }: { className?: string }) => {
  return <div className={clsx('bg-green-500 h-full', className)}>s</div>
}

export const TaskList = () => {
  return (
    <Card className='h-full'>
      <TaskListHeader />

      <List className='w-full' />

      {/* <Drawer className='w-2/6' /> */}
    </Card>
  )
}
