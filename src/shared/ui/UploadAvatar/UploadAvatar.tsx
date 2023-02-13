import { ImageUpload } from '../ImageUpload'

interface UploadAvatarProps {
  className?: string
  preview: string | null | undefined
  onChange?: (files: File) => void
}

export const UploadAvatar = ({ preview, onChange }: UploadAvatarProps) => {
  return <ImageUpload className='rounded-full' preview={preview} onChange={onChange} />
}


// <ImageUpload
// title='Upload your avatar'
// className={clsx(
//   'h-full w-full px-5 text-center',
//   {
//     ['circle']: '!rounded-full',
//     ['rounded']: 'rounded'
//   }[variant]
// )}
// preview={undefined}
// />