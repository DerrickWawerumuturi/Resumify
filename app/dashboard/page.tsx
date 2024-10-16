/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AddResume from './compenents/AddResume'
import { GetUserResume } from '@/service/GlobalApi'
import ResumeCartItem from './compenents/ResumeCartItem'
import { ResumeProps } from '@/index'

const Dashboard = () => {
    const { user, isLoaded, isSignedIn } = useUser()
    const [resumeList, setResumeList] = useState<ResumeProps[]>([])
    const router = useRouter()

    const GetResumesList = async () => {
        try {
            const lists = await GetUserResume(user?.primaryEmailAddress?.emailAddress!)
            console.log(lists.data)
            setResumeList(lists.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetResumesList()
    }, [user, GetResumesList])

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/sign-in")
        }
    }, [isLoaded, isSignedIn, router])

    return (
        <div className='p-10 md:px-20 lg:px-32'>
            <h2 className='font-bold text-3xl'>My Resume</h2>
            <p className='mb-5'>Start Creating AI resume for your next Job role </p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                <AddResume />
                {resumeList.length > 0 && resumeList.map((resume, index) => (
                    <ResumeCartItem resume={resume} key={index} refreshData={GetResumesList} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard