import clsx from 'clsx'
import { UnstyledInput, InputProps } from './UnstyledInput'
import styles from './standardInput.module.css'

const sizeMap = {
  sm: 'pt-1',
  md: 'pt-3',
  xl: 'pt-6'
}

export const StandardInput = ({ ...rest }: InputProps) => {
  return (
    <UnstyledInput
      {...rest}
      inputStyles={clsx(
        styles.input,
        (rest.type === 'password' || rest.endIconName) &&
          styles['input-with-end-icon'],
        rest.startIconName && styles['input-with-start-icon']
      )}
      containerStyles='border-b border-primary/40 focus-within:border-primary focus-within:!shadow-standard-input-shadow dark:border-secondary'
      startIconStyles={styles['input-icon-start']}
      endIconStyles={styles['input-icon-end']}
      iconWrapperStyles={styles['input-icon']}
    />
  )
}
