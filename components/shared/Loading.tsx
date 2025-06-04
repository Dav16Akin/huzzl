import React from 'react'
import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <Loader className='w-12 h-12 animate-spin'/>
    </div>
  )
}

export default Loading