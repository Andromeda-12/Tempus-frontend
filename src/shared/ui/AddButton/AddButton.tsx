import clsx from 'clsx'
import { Icon } from '../Icon'

interface AddIconButtonProps {
  className?: string
  text: string
  onClick?: () => void
}

export const AddButton = ({ className, text, onClick }: AddIconButtonProps) => {
  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <div className='text-lg font-bold'>{text}</div>
      <button
        className='text-accent rounded-full h-8 w-8 cursor-pointer duration-300 hover:scale-110 flex justify-center items-center'
        onClick={onClick}
      >
        <Icon name='plus' size='lg' />
      </button>
    </div>
  )
}
