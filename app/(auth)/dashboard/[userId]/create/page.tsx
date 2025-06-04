import CreateHustleForm from '@/components/forms/CreateHustleForm'
import React from 'react'


const create = ({params}: ParamProps) => {
    const userId = params.userId
  return (
    <div className="py-8">
        <CreateHustleForm userId={userId}/>
    </div>
  )
}

export default create