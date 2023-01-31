// import { Avatar } from '@/entities/viewer/ui/ViewerAvatar'
import { Button, Card, ContentContainer, Divider, Icon } from '@/shared/ui'
import { TaskList } from '@/widgets/task-list'

export const Dashboard = () => {
  return (
    <div className='w-full h-screen flex flex-col py-5'>
      <h3 className='text-3xl mb-5 text-black dark:text-color-dark px-1'>
        My Task
      </h3>

      <div className='grid grid-cols-6 gap-5 overflow-hidden h-full pb-2 px-1'>
        <div className='col-span-6 lg:col-span-4 flex flex-col'>
          <TaskList />
        </div>

        <Card className='hidden lg:flex col-span-2 flex-col'>
          <ContentContainer className='h-full flex flex-col'>
            <h4 className='mb-5 text-[#2b2d31]'>Current task</h4>

            <div className='text-gray-300 dark:text-gray-500'>
              <div className='text-4xl text-center mb-2'>00:00:00</div>
              <div className='text-center mb-5'>
                <button className='cursor-pointer outline-none focus-visible:ring-4 rounded-full w-fit hover:bg-primary/15 duration-150'>
                  <Icon name='play' className='w-12 h-12 relative -right-1' />
                </button>
                {/* <Icon name='pause' className='w-12 h-12' /> */}
              </div>
            </div>

            {false && (
              <div className='text-center mt-4'>
                <h2 className='text-lg'>Task not selected</h2>
                <div className='text-2xl'>🙃</div>
              </div>
            )}

            {true && (
              <>
                <Divider />

                <div className='mt-5 flex flex-col flex-grow overflow-hidden'>
                  <div className='mb-3'>Task name</div>

                  <div className='mb-3'>
                    <div className='mb-2'>Assigned</div>
                    <div className='flex space-x-1'>
                      {/* <Avatar />
                      <Avatar />
                      <Avatar /> */}
                    </div>
                  </div>
                  {/* flex-grow h-full flex flex-col  */}
                  <div className='mb-4 flex flex-col overflow-hidden'>
                    <div className='mb-2'>Description</div>
                    <div className='text-sm overflow-y-scroll pr-2 flex-1 scrollbar scrollbar-dense '>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      voluptatibus incidunt odit laudantium saepe corrupti sint
                      voluptatibus incidunt odit laudantium saepe corrupti sint
                      voluptatibus incidunt odit laudantium saepe corrupti sint
                      voluptatibus incidunt odit laudantium saepe corrupti sint
                      voluptatibus incidunt odit laudantium saepe corrupti sint
                      voluptatibus incidunt odit laudantium saepe corrupti sint
                      voluptatibus incidunt odit laudantium saepe corrupti sint
                      placeat neque. Repudiandae distinctio rem recusandae, a
                      nihil ad minima atque quos, illo eligendi doloribus
                      doloremque!
                    </div>
                  </div>
                  {/* 
                  <div className='flex justify-evenly'>
                    <Button accent className='py-2 px-10 !rounded-full'>
                      Save
                    </Button>
                    <Button className='py-2 px-10 !rounded-full'>Cancel</Button>
                  </div> */}
                </div>
              </>
            )}
          </ContentContainer>
        </Card>
      </div>
    </div>
  )
}
