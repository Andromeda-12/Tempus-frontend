import { API_URL } from '@/shared/config'

export const getImageUrl = (image: string | undefined) =>
  image ? `${API_URL}/api/images/${image}` : undefined
