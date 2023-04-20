import { Button, Card, ContentContainer, Icon, Tooltip } from '@/shared/ui'
import { WorkspaceList } from '@/entities/workspace'
import { Avatar } from '@/shared/ui'

const workspaces = {
  id: 1,
  cover: 'photo.jpg',
  title: 'My first workspace',
  projectsCount: 1,
  own: true
}

export const ProjectPage = ({}) => {
  return (
    <div className='h-screen flex flex-col py-5 bg-cover bg-center relative'>
      <div className='h-full !bg-neutral/0'>
        <div
          className='h-44 md:h-64 bg-cover bg-center rounded-xl'
          style={{ backgroundImage: `url(/${workspaces.cover})` }}
        ></div>
        <ContentContainer className='mt-1'>
          <h2 className='text-xl mb-2'>{workspaces.title}</h2>
          <h3 className='text-sm '>Project 1</h3>

          <div className='mb-7 mt-2 text-xs'>3 members</div>

          <div className='py-0.5 mb-3 px-8 border rounded-xl w-fit'>
            Filters
          </div>

          <div className='grid gap-7 grid-cols-[repeat(auto-fill,minmax(272px,1fr))]'>
            <Card>
              <ContentContainer py={false} className='py-5'>
                <div>Task 1</div>
                <div className='text-sm mt-1 opacity-60'>
                  Some description: you shoud get some work and do this bla
                  bla...{' '}
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
                        <Icon
                          name='play'
                          className='w-8 h-8 relative -right-1'
                        />
                      </button>
                      {/* <Icon name='pause' className='w-12 h-12' /> */}
                    </div>
                  </div>
                </div>
              </ContentContainer>
            </Card>

            <Card>
              <ContentContainer py={false} className='py-5'>
                <div>Task 1</div>
                <div className='text-sm mt-1 opacity-60'>
                  Some description: you shoud get some work and do this bla
                  bla...{' '}
                </div>

                <div className='flex gap-1 mb-2 mt-2'>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </div>

                <div>
                  <div className='text-gray-300 dark:text-gray-500'>
                    <div className='text-2xl text-center mt-2'>00:21:43</div>
                    <div className='text-center'>
                      <button className='cursor-pointer outline-none focus-visible:ring-4 rounded-full w-fit hover:bg-primary/15 duration-150'>
                        <Icon
                          name='play'
                          className='w-8 h-8 relative -right-1'
                        />
                      </button>
                      {/* <Icon name='pause' className='w-12 h-12' /> */}
                    </div>
                  </div>
                </div>
              </ContentContainer>
            </Card>

            <Card>
              <ContentContainer py={false} className='py-5'>
                <div>Task 1</div>
                <div className='text-sm mt-1 opacity-60'>
                  Some description: you shoud get some work and do this bla
                  bla...{' '}
                </div>

                <div className='flex gap-1 mb-2 mt-2'>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </div>

                <div>
                  <div className='text-gray-300 dark:text-gray-500'>
                    <div className='text-2xl text-center mt-2'>00:21:43</div>
                    <div className='text-center'>
                      <button className='cursor-pointer outline-none focus-visible:ring-4 rounded-full w-fit hover:bg-primary/15 duration-150'>
                        <Icon
                          name='play'
                          className='w-8 h-8 relative -right-1'
                        />
                      </button>
                      {/* <Icon name='pause' className='w-12 h-12' /> */}
                    </div>
                  </div>
                </div>
              </ContentContainer>
            </Card>

            <Card>
              <ContentContainer py={false} className='py-5'>
                <div>Task 1</div>
                <div className='text-sm mt-1 opacity-60'>
                  Some description: you shoud get some work and do this bla
                  bla...{' '}
                </div>

                <div className='flex gap-1 mb-2 mt-2'>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </div>

                <div>
                  <div className='text-gray-300 dark:text-gray-500'>
                    <div className='text-2xl text-center mt-2'>00:21:43</div>
                    <div className='text-center'>
                      <button className='cursor-pointer outline-none focus-visible:ring-4 rounded-full w-fit hover:bg-primary/15 duration-150'>
                        <Icon
                          name='play'
                          className='w-8 h-8 relative -right-1'
                        />
                      </button>
                      {/* <Icon name='pause' className='w-12 h-12' /> */}
                    </div>
                  </div>
                </div>
              </ContentContainer>
            </Card>
          </div>

          {/* <div className='grid gap-7 grid-cols-[repeat(auto-fill,minmax(272px,1fr))]'>
            <Card>
              <ContentContainer>
                <div>Project 1</div>
                <div className='text-sm mt-1 opacity-60'>5 assigned to you</div>
                <div className='text-xs mt-1 opacity-60'>21 active tasks</div>
              </ContentContainer>
            </Card>

            <Card>
              <ContentContainer>
                <div>Project 1 (21 tasks)</div>
                <div className='text-sm mt-1 opacity-60'>5 assigned to you</div>
              </ContentContainer>
            </Card>

            <Card>
              <ContentContainer>
                <div>Project 1</div>
                <div className='text-sm mt-1 opacity-60'>5 assigned to you</div>
                <div className='text-xs mt-1 opacity-60'>21 active tasks</div>
              </ContentContainer>
            </Card>

            <Card>
              <ContentContainer>
                <div>Project 1</div>
                <div className='text-sm mt-1 opacity-60'>5 assigned to you</div>
                <div className='text-xs mt-1 opacity-60'>21 active tasks</div>
              </ContentContainer>
            </Card>

            <Card>
              <ContentContainer>
                <div>Project 1</div>
                <div className='text-sm mt-1 opacity-60'>5 assigned to you</div>
                <div className='text-xs mt-1 opacity-60'>21 active tasks</div>
              </ContentContainer>
            </Card>
          </div> */}
        </ContentContainer>
      </div>
    </div>
  )
}
