'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { PersonalDetailProps, UserProfile } from '@/index'
import { UpdateResumeDetails } from '@/service/GlobalApi'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const PersonalDetail = ({ enabledNext }: PersonalDetailProps) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [formData, setFormData] = useState<UserProfile>({})
    const [loading, setLoading] = useState(false)
    const [isSaved, setIsSaved] = useState<number>(0)

    const params = useParams()
    useEffect(() => {
        // console.log(params)
    }, [params])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        enabledNext(false)
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    const onSave = async (e: FormEvent<HTMLFormElement>) => {
        const data = formData
        setLoading(true)
        setIsSaved(isSaved + 1)
        e.preventDefault()

        if (isSaved > 0) {
            enabledNext(true)
        }

        try {
            const result = await UpdateResumeDetails({ id: params?.resumeId, data })
            return result.data
        } catch (error) {
            setLoading(false)
            console.log("error saving resume", error)
        } finally {
            setLoading(false)
            enabledNext(true)
            toast("Details Updated!")
        }

    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get started with basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 gap-3 mt-5'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button disabled={loading} type='submit'>
                        {loading ? <Loader2 className='animate-spin' /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail