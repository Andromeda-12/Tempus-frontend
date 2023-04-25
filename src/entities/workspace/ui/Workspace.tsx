import { ReactNode, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { viewerModel } from '@/entities/viewer'
import { Card, CardCover, IconButton, Show } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { WorkspaceDto } from '@/shared/api'
import { OwnMark } from './OwnMark'
import { WorkspacePopover } from './WorkspacePopover'

export interface WorkspaceProps {
  workspace: WorkspaceDto
  actions: ReactNode
}

export const Workspace = ({ workspace, actions }: WorkspaceProps) => {
  const { title, cover, owner, count } = workspace

  const viewer = useUnit(viewerModel.$viewer)

  let isViewerOwner = false
  if (viewer) isViewerOwner = owner.id === viewer.id

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => setIsPopoverOpen(false))

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPopoverOpen((isOpen) => !isOpen)
  }

  return (
    <div className='relative' ref={wrapperRef}>
      <Card className='relative' withHover>
        {isViewerOwner && <OwnMark />}

        <CardCover cover={getImageUrl(cover)} />

        <div className='px-5 py-2 flex justify-between'>
          <div>
            <div className='text-ellipsis font-medium overflow-hidden whitespace-nowrap h-[20px] mb-2'>
              {title}
            </div>

            <div className='font-light text-sm text-color-light/60 dark:text-color-dark/50'>
              Projects: {count.projects}
            </div>
          </div>

          <Show when={isViewerOwner}>
            <div
              className='flex items-start relative'
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <IconButton
                variant='text'
                icon='ellipsisHorizontal'
                onClick={handleClick}
              />
            </div>
          </Show>
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
