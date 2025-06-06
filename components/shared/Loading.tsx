import React from 'react'
import { LoaderCircle } from 'lucide-react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <LoaderCircle className='w-12 h-12 animate-spin'/>
    </div>
  )
}

export default Loading