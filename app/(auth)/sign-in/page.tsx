import SignInForm from '@/components/forms/SignInForm'
import React from 'react'

export default async function page () {

  return (
    <div className='w-full flex flex-col p-4 pt-14  gap-4 items-center lg:pt-14'>
        <SignInForm/>
    </div>
  )
}
