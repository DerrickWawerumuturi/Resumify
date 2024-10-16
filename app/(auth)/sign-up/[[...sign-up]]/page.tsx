import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <div className='flex justify-center my-20 items-center'>
            <SignUp />
        </div>
    )
}

export default SignUpPage