import { UpdateUserForm } from '@/features/users/update-user'
import { UploadAvatar } from '@/features/users/upload-avatar'
import { ChangePasswordButton } from '@/features/auth/change-password'
import { ChangeEmailButton } from '@/features/users/change-email'
import { Card } from '@/shared/ui'
import { useUnit } from 'effector-react'
import { viewerModel } from '@/entities/viewer'

export const UserSettings = () => {
  const viewer = useUnit(viewerModel.$viewer)
  return (
    <div className='pt-8 w-full flex justify-center h-full'>
      <Card className='max-w-xl w-full h-full px-4 sm:px-10 py-6 sm:py-12 !rounded-3xl space-y-4'>
        <UploadAvatar size='xl' className='hidden sm:block' />
        <UploadAvatar size='lg' className='sm:hidden' />

        <div className='flex flex-wrap space-y-1'>
          <div className='flex items-center'>
            <div className='mr-2'>{viewer?.email}</div>
            <ChangeEmailButton />
          </div>
          <ChangePasswordButton />
        </div>

        {/* <div>{viewer?.email}</div> */}

        <UpdateUserForm />
      </Card>
    </div>
  )
}
