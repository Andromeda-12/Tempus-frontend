import { useEffect, useState } from 'react'
import { Link } from 'atomic-router-react'
import { Button } from '@/shared/ui'
import { workspacesRoute } from '@/shared/routing'

export const NotFoundPage = () => {
  const [isShowBread, setIsShowBread] = useState(false)

  useEffect(() => {
    const random = Math.random() < 0.1
    setIsShowBread(random)
  }, [])

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='text-center'>
        {isShowBread && (
          <img src='bread.jpg' alt='s' className='h-52 w-52 mb-5' />
        )}

        <div className='text-3xl mb-3'>Oops 😯</div>
        <div className='text-xl mb-5'>There is nothing here</div>

        <div className='mb-2 text-2xl'>👇</div>
        <Link to={workspacesRoute}>
          <Button accent>Go to dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
