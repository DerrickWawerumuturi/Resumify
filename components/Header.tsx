'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

const Header = () => {
    const { user, isSignedIn } = useUser()
    return (
        <div className='flex justify-between shadow-md p-3 px-5' id="no-print">
            <Link href={"/"} className='flex gap-2'>
                <Image
                    src={"/icons/logo.svg"}
                    alt='logo'
                    width={30}
                    height={30}
                />
                <h1 className='text-xl font-bold mt-1'>Resumify</h1>
            </Link>
            {isSignedIn ? (
                <div className='flex gap-2 items-center'>
                    <Link href={"/dashboard"}>
                        <Button variant={"outline"}>Dashboard</Button>
                    </Link>
                    <UserButton />
                </div>
            ) : (
                <Link href={"/sign-in"}>
                    <Button>
                        Get Started
                    </Button>
                </Link>
            )}

        </div>
    )
}

export default Header