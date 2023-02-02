import { ReactNode, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { viewerModel } from '@/entities/viewer'
import { Card, CardCover, SquareButton } from '@/shared/ui'
import { WorkspaceDto } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { getImageUrl } from '@/shared/lib'

export interface WorkspaceProps {
  workspace: WorkspaceDto
  actions: ReactNode
}

export const Workspace = ({ workspace, actions }: WorkspaceProps) => {
  const { title, cover, owner } = workspace

  const viewer = useUnit(viewerModel.$viewer)

  let own = false
  if (viewer) own = owner.id === viewer.id

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => setIsPopoverOpen(false))

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPopoverOpen((isOpen) => !isOpen)
  }

  return (
    <div className='relative' ref={wrapperRef}>
      <Card className='relative' withHover>
        {own && <OwnMark />}

        <CardCover cover={getImageUrl(cover)} />

        <div className='px-5 py-2 flex justify-between'>
          <div>
            <div className='text-ellipsis font-medium overflow-hidden whitespace-nowrap h-[20px] mb-2'>
              {title}
            </div>

            <div className='font-light text-sm text-color-light/60 dark:text-color-dark/50'>
              {/* Projects: {projects?.length} */}
              Projects: {0}
            </div>
          </div>

          <div
            className='flex items-start relative'
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <SquareButton
              variant='text'
              icon='ellipsisHorizontal'
              onClick={handleClick}
            />
          </div>
        </div>
      </Card>

      {isPopoverOpen && <WorkspacePopover actions={actions} />}
    </div>
  )
}

function useOutsideAlerter(ref: any, cb: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

const WorkspacePopover = ({ actions }: { actions: ReactNode }) => {
  return (
    <div
      className={clsx(
        'rounded-lg flex overflow-hidden shadow-lg shadow-background-dark/20 dark:shadow-background-dark',
        'bg-white dark:bg-neutral',
        'absolute -bottom-11 right-0 z-50 w-32'
      )}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      {actions}
    </div>
  )
}

const OwnMark = () => (
  <div className='absolute right-2 top-2 bg-background-light/60 dark:bg-background-dark/40 py-1 px-2 text-xs rounded-full'>
    own
  </div>
)
