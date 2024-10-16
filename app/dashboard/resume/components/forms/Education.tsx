/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Education as edu, EducationEntry } from '@/index'
import { UpdateResumeDetails } from '@/service/GlobalApi'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const Education = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [educationalList, setEducationalList] = useState<edu[]>(resumeInfo?.education!)
    const [listSize, setListSize] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const params = useParams()


    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newEntries = educationalList.slice()
        const { name, value } = event.target
        newEntries[index][name] = value
        setEducationalList(newEntries)
    }


    const addNewEducation = () => {
        setListSize(prevListSize => prevListSize + 1)
        setEducationalList([...educationalList, {
            universityName: "",
            degree: "",
            major: "",
            startDate: '',
            endDate: "",
            description: ""
        }])
    }

    useEffect(() => {
        resumeInfo && setEducationalList(resumeInfo?.education!)
    }, [])

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList
        })
    }, [educationalList])

    const removeEducation = () => {
        setListSize(prevListSize => prevListSize - 1)
        setEducationalList(educationalList => educationalList.slice(0, -1))
    }

    const onSave = async () => {
        setLoading(true)

        const data = {
            education: educationalList.map(({ id, ...rest }) => rest)
        }

        try {
            const result = await UpdateResumeDetails({ id: params.resumeId, data })
            if (result) {
                setLoading(false)
                toast("Education Updated!")
            }
        } catch (error) {
            console.log("error adding education")
            toast("Server Error, Please try again")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your educational details</p>
            <div>
                {educationalList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University name</label>
                                <Input defaultValue={item.universityName} name="universityName" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input defaultValue={item.degree} name="degree" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input defaultValue={item.major} name="major" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input defaultValue={item.startDate} type="date" name="startDate" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input defaultValue={item.endDate} type="date" name="endDate" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea defaultValue={item.description} name="description" onChange={(e) => handleChange(index, e)} />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Button variant={"outline"} className='text-primary' onClick={addNewEducation}> <span className='text-lg mr-2 mb-1'>+</span> Add more Education</Button>
                                {listSize > 1 &&
                                    <Button variant={"outline"} className='text-primary' onClick={removeEducation}> <span className='text-lg mr-2 mb-1'>-</span> Remove</Button>

                                }

                            </div>
                            <Button disabled={loading} onClick={() => onSave()}>
                                {loading ? <Loader2 className='animate-spin' /> : "Save"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Education