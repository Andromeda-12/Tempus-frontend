export const formatTime = (seconds: number, withSeconds: boolean = false) => {
  const minutes = Math.floor(seconds / 60) % 60
  const hours = Math.floor(seconds / (60 * 60)) % 24

  if (!withSeconds)
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`

  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}