import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
    return (
        <div className='flex justify-center my-20 items-center'>
            <SignIn />
        </div>
    )
}

export default SignInPage