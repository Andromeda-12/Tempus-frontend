import { Button, Card, ContentContainer, PageCover, Spinner } from '@/shared/ui'
import { useUnit } from 'effector-react'
import { $invitedWorkspace, $isLoading, acceptWorkspaceInvite } from '../model'
import { getImageUrl } from '@/shared/lib'

export const InvitePage = () => {
  const isLoading = useUnit($isLoading)
  const invitedWorkspace = useUnit($invitedWorkspace)
  const acceptWorkspaceInviteFn = useUnit(acceptWorkspaceInvite)

  if (isLoading)
    return (
      <div className='absolute inset-0'>
        <Spinner size='xl' />
      </div>
    )

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-full flex justify-center relative max-w-[700px]'>
        <PageCover
          className=' flex-grow'
          cover={getImageUrl(invitedWorkspace?.cover)}
        />

        {/* <div className='absolute inset-0 bg-neutral/70 flex items-end'>
          <span className='text-accent text-xl  font-semibold ml-3 mb-3'>
            {invitedWorkspace?.title}
          </span>
        </div> */}
      </div>

      <div className='flex justify-center mt-7'>
        <Card className='max-w-lg text-center'>
          <ContentContainer className='py-7' py={false}>
            <div className='mb-3'>
              You have been invited to the workspace{' '}
              <span className='text-accent font-semibold'>
                {invitedWorkspace?.title}
              </span>
            </div>
            <div className='mb-6'>Do you want to accept the invitation?</div>

            <div className='flex justify-center'>
              <Button accent dense onClick={acceptWorkspaceInviteFn}>
                Accept invitation
              </Button>
            </div>
          </ContentContainer>
        </Card>
      </div>
    </div>
    // <div className='text-center space-y-5'>
    //   <div className='text-2xl'>Link is not valid</div>
    //   <div className='text-5xl'>🤨</div>
    //   <div>
    //     <Button accent>Go to sign in</Button>
    //   </div>
    // </div>
  )
}
