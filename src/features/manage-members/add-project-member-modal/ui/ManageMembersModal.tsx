import { useUnit } from 'effector-react'
import { Modal, Spinner } from '@/shared/ui'
import { MembersList } from './MembersList'
import { $isLoading } from '../model'

interface ManageMembersModalProps {
  onClose: () => void
}

export const ManageMembersModal = ({ onClose }: ManageMembersModalProps) => {
  const isLoading = useUnit($isLoading)

  return (
    <Modal
      isOpen
      className='w-full max-w-4xl overflow-hidden'
      title='Unassigned workspace members'
      onClose={onClose}
    >
      <div className='relative'>
        {isLoading && (
          <div className='absolute inset-0 bg-white/70 dark:bg-neutral/90 z-30 flex justify-center items-center'>
            <Spinner className='!w-10 !h-10 border-4' />
          </div>
        )}

        <div className='h-[200px]'>
          <MembersList />
        </div>
      </div>
    </Modal>
  )
}
