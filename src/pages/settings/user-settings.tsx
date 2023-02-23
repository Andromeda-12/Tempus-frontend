import { useState } from 'react'
import { useUnit } from 'effector-react'
import { UpdateUserForm } from '@/features/users/update-user'
import { UploadAvatar } from '@/features/users/upload-avatar'
import { ViewerAvatar, viewerModel } from '@/entities/viewer'
import { Button } from '@/shared/ui'

export const UserSettings = () => {
  const [isEditable, setIsEditable] = useState(false)

  return (
    <div className='py-8'>
      <div className='space-y-6'>
        <div className='flex justify-between'>
          <div>
            {!isEditable ? <ViewerAvatar size='xl' /> : <UploadAvatar />}

            <UserEmailInfo />

            <div className='mt-2'>
              {!isEditable ? <UserInfo /> : <UpdateUserForm />}
            </div>
          </div>

          <div>
            <Button accent onClick={() => setIsEditable(!isEditable)}>
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserEmailInfo = () => {
  const viewer = useUnit(viewerModel.$viewer)

  return (
    <div className='flex items-center mb-2 space-x-4'>
      <div className='md:text-xl'>{viewer?.email}</div>

      <Button variant='contained' accent>
        Change email
      </Button>
    </div>
  )
}

const UserInfo = () => {
  const viewer = useUnit(viewerModel.$viewer)

  return (
    <div className='max-w-md'>
      <div className='space-y-2 text-xl'>
        <div>{viewer?.firstName}</div>
        <div>{viewer?.lastName}</div>

        <Button accent className='w-full !mt-4'>
          Save
        </Button>
      </div>
    </div>
  )
}
