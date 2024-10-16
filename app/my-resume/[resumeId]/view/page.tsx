/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ResumePreview from '@/app/dashboard/resume/components/ResumePreview'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { ResumeInfoContextType, UserProfile } from '@/index'
import { GetSpecificDoc } from '@/service/GlobalApi'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RWebShare } from "react-web-share";

const View = () => {
    const [resumeInfo, setResumeInfo] = useState<UserProfile | null>(null)
    const { resumeId } = useParams()

    useEffect(() => {
        GetResumeInfo()
    }, [])

    const GetResumeInfo = async () => {
        try {
            const result = await GetSpecificDoc(resumeId as string)
            console.log(result.data)
            setResumeInfo(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const HandleDownload = async () => {
        window.print()
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36' id="no-print">
                <h2 className='text-center text-2xl font-medium '>Congrats! Your Resume is finished and ready to impress!</h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
                    resume url with your friends and family
                </p>
                <div className='flex justify-between px-44 py-10'>
                    <Button onClick={HandleDownload}>Download</Button>
                    <RWebShare
                        data={{
                            text: "Hello Everyone, This is my resume please open url to see",
                            url: process.env.NEXT_PUBLIC_BASE_URL + "my-resume" + resumeId + "/view",
                            title: resumeInfo?.firstName! + resumeInfo?.lastName! + "resume",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button>Share</Button>

                    </RWebShare>

                </div>
            </div>
            <div id='print-area' className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default View