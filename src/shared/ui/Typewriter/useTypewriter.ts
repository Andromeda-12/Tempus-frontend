import { useCallback, useEffect, useRef } from 'react'
import { useEvent, useUnit } from 'effector-react'
import {
  $count,
  $isDeleting,
  $speed,
  $text,
  setCount as setCountEvent,
  setDelete as setDeleteEvent,
  setSpeed as setSpeedEvent,
  setType as setTypeEvent
} from './model'

interface TypewriterProps {
  words: string[]
  loop?: number | boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
}

export const useTypewriter = ({
  words = ['Test', '2 test'],
  loop = 1,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500
}: TypewriterProps) => {
  const text = useUnit($text)
  const count = useUnit($count)
  const isDeleting = useUnit($isDeleting)
  const speed = useUnit($speed)

  const setType = useEvent(setTypeEvent)
  const setSpeed = useEvent(setSpeedEvent)
  const setDelete = useEvent(setDeleteEvent)
  const setCount = useEvent(setCountEvent)

  const isDone = useRef(false)
  const loops = useRef(0)

  const handleTyping = useCallback(() => {
    const index = count % words.length
    const fullWord = words[index]

    if (!isDeleting) {
      setType({ text: fullWord, speed: typeSpeed })

      if (text === fullWord) {
        setSpeed(delaySpeed)

        if (loop > 0) {
          loops.current += 1
          if (loops.current / words.length === loop) isDone.current = true
        }
      }
    } else {
      setDelete({ text: fullWord, speed: deleteSpeed })

      if (text === '') setCount()
    }
  }, [
    count,
    words,
    isDeleting,
    setType,
    typeSpeed,
    text,
    setSpeed,
    delaySpeed,
    loop,
    setDelete,
    deleteSpeed,
    setCount
  ])

  useEffect(() => {
    const typing = setTimeout(handleTyping, speed)

    if (isDone.current) {
      clearTimeout(typing)
    }

    return () => clearTimeout(typing)
  }, [handleTyping, speed])

  return [text, count + 1]
}
