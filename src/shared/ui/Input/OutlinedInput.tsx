import React from 'react'
import clsx from 'clsx'
import { UnstyledInput, InputProps } from './UnstyledInput'
import styles from './outlinedInput.module.css'

export const OutlinedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    return (
      <UnstyledInput
        ref={ref}
        {...rest}
        inputStyles={clsx(
          styles.input,
          (rest.type === 'password' || rest.endIconName) &&
            styles['input-with-end-icon'],
          rest.startIconName && styles['input-with-start-icon']
        )}
        containerStyles='rounded-xl'
        startIconStyles={styles['input-icon-start']}
        endIconStyles={styles['input-icon-end']}
        iconWrapperStyles={styles['input-icon']}
      />
    )
  }
)

OutlinedInput.displayName = 'OutlinedInput'
