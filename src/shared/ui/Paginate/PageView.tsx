import React, { ReactNode } from 'react'

interface PageViewProps {
  pageSelectedHandler: () => void
  selected: boolean
  pageClassName: string
  pageLinkClassName: string
  activeClassName: string
  activeLinkClassName: string
  extraAriaContext: string
  href: string
  ariaLabel: string
  page: number
  getEventListener: () => object
  pageLabelBuilder: (page: number) => ReactNode
  rel: string
}

export const PageView = ({
  page,
  selected,
  activeClassName = '',
  activeLinkClassName = '',
  getEventListener,
  pageSelectedHandler,
  href,
  extraAriaContext,
  pageLabelBuilder,
  rel,
  pageClassName = '',
  pageLinkClassName = '',
  ariaLabel: ariaLabelFromProps
}: PageViewProps) => {
  let ariaLabel =
    ariaLabelFromProps ||
    'Page ' + page + (extraAriaContext ? ' ' + extraAriaContext : '')
  let ariaCurrent = null

  if (selected) {
    ariaCurrent = 'page'

    ariaLabel = ariaLabel || 'Page ' + page + ' is your current page'

    if (!pageClassName) {
      pageClassName = pageClassName + ' ' + activeClassName
    } else {
      pageClassName = activeClassName
    }

    if (!pageLinkClassName) {
      if (!activeLinkClassName) {
        pageLinkClassName = pageLinkClassName + ' ' + activeLinkClassName
      }
    } else {
      pageLinkClassName = activeLinkClassName
    }
  }

  return (
    <li className={pageClassName}>
      <a
        rel={rel}
        role={!href ? 'button' : undefined}
        className={pageLinkClassName}
        href={href}
        tabIndex={selected ? -1 : 0}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onKeyDown={pageSelectedHandler}
        {...getEventListener(pageSelectedHandler)}
      >
        {pageLabelBuilder(page)}
      </a>
    </li>
  )
}
