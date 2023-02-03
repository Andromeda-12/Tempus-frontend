import { ReactNode } from 'react'
import { clsx } from 'clsx'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { SquareButton } from '../SquareButton'
import { Card } from '../Card'

interface ModalProps {
  children: ReactNode
  className?: string
  cardClassName?: string
  title?: string
  z?: '1' | '2'
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({
  children,
  className,
  cardClassName,
  title,
  z = '1',
  isOpen,
  onClose
}: ModalProps) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={clsx(
            'fixed inset-0 backdrop-blur-sm bg-black/50',
            z === '1' && 'z-[300]',
            z === '2' && 'z-[500]'
          )}
        />

        <DialogPrimitive.Content
          onClick={(e) => e.stopPropagation()}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={clsx(
            'fixed outline-none p-2',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            z === '1' && 'z-[350]',
            z === '2' && 'z-[550]',
            className
          )}
        >
          <Card className={clsx('p-5 sm:p-8', cardClassName)}>
            <div
              className={clsx(
                'flex',
                !title && 'justify-end',
                title && 'justify-between mb-7'
              )}
            >
              {title && (
                <DialogPrimitive.DialogTitle asChild>
                  <h3 className='text-2xl font-bold'>{title}</h3>
                </DialogPrimitive.DialogTitle>
              )}

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
