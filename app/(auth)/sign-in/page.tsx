import SignInForm from '@/components/forms/SignInForm'
import React from 'react'

export default async function page () {

  return (
    <div className='w-full flex flex-col gap-4 items-center pt-14'>
        <SignInForm/>
    </div>
  )
}
