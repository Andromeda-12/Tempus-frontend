import React from 'react'
import clsx from 'clsx'
import { UnstyledInput, InputProps } from './UnstyledInput'
import styles from './outlinedInput.module.css'

export const OutlinedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ notAccent, ...rest }, ref) => {
    return (
      <UnstyledInput
        ref={ref}
        {...rest}
        inputStyles={clsx(
          styles.input,
          (rest.type === 'password' || rest.endIconName) &&
            styles['input-with-end-icon'],
          rest.startIconName && styles['input-with-start-icon'],
          notAccent && styles['not-accent']
        )}
        containerStyles='rounded-xl'
        startIconStyles={clsx(styles['input-icon-start'], notAccent && styles['not-accent'])}
        endIconStyles={styles['input-icon-end']}
        iconWrapperStyles={clsx(styles['input-icon'], notAccent && styles['not-accent'])}
      />
    )
  }
)

OutlinedInput.displayName = 'OutlinedInput'
