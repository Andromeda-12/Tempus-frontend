import { UpdateUserForm } from '@/features/users/update-user'
import { UploadAvatar } from '@/features/users/upload-avatar'
import { ChangePasswordButton } from '@/features/auth/change-password'
import { ChangeEmailButton } from '@/features/users/change-email'
import { Card } from '@/shared/ui'

export const UserSettings = () => {
  return (
    <div className='pt-8 w-full flex justify-center h-full'>
      <Card className='max-w-xl w-full h-full px-4 sm:px-10 py-6 sm:py-12 !rounded-3xl'>
        <div className='flex justify-between'>
          <UploadAvatar size='xl' />
        </div>

        <div className='gap-4 mt-4 flex flex-wrap'>
          <ChangeEmailButton />

          <ChangePasswordButton />
        </div>

        <div className='mt-2'>
          <UpdateUserForm />
        </div>
      </Card>
    </div>
  )
}
