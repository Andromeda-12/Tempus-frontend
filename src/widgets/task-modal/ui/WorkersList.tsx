import { ViewerAvatar } from '@/entities/viewer'
import { Checkbox, Tooltip } from '@/shared/ui'
import clsx from 'clsx'
import { ReactNode } from 'react'

export const WorkersList = () => {
  return (
    <div className='border border-primary dark:border-secondary rounded-lg overflow-hidden h-full w-full flex pr-2 py-2'>
      <div className='scrollbar scrollbar-dense overflow-y-auto overflow-x-auto w-full pr-1'>
        <Worker />
        <Worker1 />
        <Worker />
        <Worker1 />
        <Worker />
      </div>
    </div>
  )
}

const Worker = () => {
  return (
    <div className='flex items-center py-1.5 px-4 text-xs md:text-sm space-x-5 w-full'>
      <div className='w-1/12'>
        <ViewerAvatar />
      </div>

      <Column
        className='w-8/12 max-w-[65%] min-w-[65%]'
        text='Fronshaizer Andrei'
      />

      <div className='w-1/12 flex justify-center'>12:51</div>

      <div className='w-1/12 flex justify-center'>
        <Checkbox />
      </div>
    </div>
  )
}

const Column = ({ className, text }: { className?: string; text: string }) => (
  <div className={clsx(className, 'w-full')}>
    <Tooltip text={text}>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap h-[20px]'>
        {text}
      </div>
    </Tooltip>
  </div>
)

const Worker1 = () => {
  return (
    <div className='flex items-center py-1.5 px-4 text-xs md:text-sm space-x-5 w-full'>
      <div className='w-1/12'>
        <ViewerAvatar />
      </div>

      <Column
        className='w-8/12 max-w-[65%] min-w-[65%]'
        text='Fronshaizer Andrei'
      />

      <div className='w-1/12 flex justify-center'>12:51</div>

      <div className='w-1/12 flex justify-center'>
        <Checkbox />
      </div>
    </div>
  )
}
