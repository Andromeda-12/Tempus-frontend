import { useState, forwardRef } from 'react'
import clsx from 'clsx'

interface TextareaProps extends React.ComponentProps<'textarea'> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div
        className={clsx(
          'rounded-xl border border-primary/60 dark:border-secondary/90 overflow-hidden px-1 focus:ring focus:ring-primary dark:focus:ring-secondary focus:ring-offset-[5px] dark:focus:ring-offset-neutral',
          isFocused &&
            'border-primary dark:border-secondary shadow-input-shadow'
        )}
        tabIndex={0}
      >
        <textarea
          ref={ref}
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='block outline-none px-3 py-3 overflow-y-auto test scrollbar scrollbar-dense resize-none w-full bg-transparent'
        />
      </div>
    )
  }
)
