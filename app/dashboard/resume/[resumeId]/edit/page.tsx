'use client'
import { useParams } from 'next/navigation'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { ResumeInfoContextType, UserProfile } from '@/index'
import { GetSpecificDoc } from '@/service/GlobalApi'


const EditResume = () => {
    const { resumeId } = useParams()
    const [resumeInfo, setResumeInfo] = useState<UserProfile | null>(null)

    useEffect(() => {
        const GetResumeInfo = async () => {
            try {
                const result = await GetSpecificDoc(resumeId as string)
                console.log(result.data)
                if (!result.data) {
                    throw new Error("Resume not found")
                }
                setResumeInfo(result.data)
            } catch (error) {
                console.log("Error fetching resume", error)
            }
        }
        GetResumeInfo()
    }, [resumeId])



    return (
        <ResumeInfoContext.Provider value={{ resumeInfo: resumeInfo as UserProfile, setResumeInfo: setResumeInfo }}>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* Form Section */}
                <FormSection />
                {/* Preview Section */}
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume