import { Avatar, Card, ContentContainer, Icon, Tooltip } from '@/shared/ui'

export const Task = () => {
  return (
    <Card>
      <ContentContainer py={false} className='py-5'>
        <div>Task 1</div>
        <div className='text-sm mt-1 opacity-60'>
          Some description: you shoud get some work and do this bla bla...{' '}
        </div>

        <div className='flex -space-x-3 mb-2 mt-2'>
          <Tooltip text='Andrey Froshgaizer'>
            <Avatar className='ring-[2px] ring-gray-600' />
          </Tooltip>
          <Avatar className='ring-[2px] ring-gray-600' />
          <Avatar className='ring-[2px] ring-gray-600' />
        </div>

        <div>
          <div className='text-gray-300 dark:text-gray-500'>
            <div className='text-2xl text-center mt-2'>00:21:43</div>
            <div className='text-center'>
              <button className='cursor-pointer outline-none focus-visible:ring-4 rounded-full w-fit hover:bg-primary/15 duration-150'>
                <Icon name='play' className='w-8 h-8 relative -right-1' />
              </button>
              {/* <Icon name='pause' className='w-12 h-12' /> */}
            </div>
          </div>
        </div>
      </ContentContainer>
    </Card>
  )
}
