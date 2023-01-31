import { useEffect } from 'react'
import { Cursor } from './Cursor'
import { useTypewriter } from './useTypewriter'

interface TypewriterProps {
  words: string[]
  className?: string
  loop?: number | boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
  cursorClasses?: string
}

export const Typewriter = ({
  className,
  words,
  loop,
  typeSpeed,
  deleteSpeed,
  delaySpeed,
  cursorClasses = ''
}: TypewriterProps) => {
  const [text] = useTypewriter({
    words,
    loop,
    typeSpeed,
    deleteSpeed,
    delaySpeed
  })

  return (
    <div className={className}>
      <span>{text}</span>
      <Cursor className={cursorClasses} />
    </div>
  )
}
