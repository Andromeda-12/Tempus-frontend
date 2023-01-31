import { ReactNode } from 'react'
import { clsx } from 'clsx'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { SquareButton } from '../SquareButton'
import { Card } from '../Card'

interface ModalProps {
  children: ReactNode
  className?: string
  title?: string
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({
  children,
  className,
  title,
  isOpen,
  onClose
}: ModalProps) => {
  return (
    <DialogPrimitive.Root open={isOpen} modal onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='fixed inset-0 backdrop-blur-sm z-[1000] bg-black/50' />

        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={clsx(
            'fixed z-[1001] outline-none p-2',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            className
          )}
        >
          <Card className='p-5 sm:p-8'>
            <div className='flex justify-between'>
              <DialogPrimitive.DialogTitle asChild> 
                <h3 className='text-2xl font-bold mb-10'>Create workspace</h3>
              </DialogPrimitive.DialogTitle>

              <DialogPrimitive.Close
                asChild
                className={clsx(
                  'inline-flex items-start justify-center outline-none'
                )}
              >
                <SquareButton icon='close' size='sm' variant='text' />
              </DialogPrimitive.Close>
            </div>

            {children}
          </Card>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
