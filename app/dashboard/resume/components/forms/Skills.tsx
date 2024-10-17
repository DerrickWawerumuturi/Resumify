/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Input } from '@/components/ui/input'
import { Skill } from '@/index'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { toast } from 'sonner'
import { UpdateResumeDetails } from '@/service/GlobalApi'
import { useParams } from 'next/navigation'

const Skills = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listSize, setListSize] = useState<number>(1)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [skillsList, setSkillsLists] = useState<Skill[]>(resumeInfo?.skills!)

    const { resumeId } = useParams()

    const addNewSkills = () => {
        setListSize(prevListSize => prevListSize + 1)
        setSkillsLists([...skillsList,
        {
            name: "",
            rating: 0,
        }])
    }

    const removeSkills = () => {
        setListSize(prevListSize => prevListSize - 1)
        setSkillsLists(skillsList => skillsList.slice(0, -1))
    }


    const handleChange = (value: string | number, name: string, index: number) => {
        const newEntries = skillsList.slice()
        newEntries[index][name] = value
        setSkillsLists(newEntries)
    }


    const onSave = async () => {
        setLoading(true)

        const data = {
            skills: skillsList.map(({ id, ...rest }) => rest),
        }
        try {
            const result = await UpdateResumeDetails({ id: resumeId, data })
            if (result) {
                setLoading(false)
            }
        } catch (error) {
            console.log("error saving skills", error)
            setLoading(false)
            toast("Sever Error, Try again!")

        } finally {
            setLoading(false)
            toast("Skills Updated!")
        }
    }

    useEffect(() => (
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList,
        })
    ), [skillsList])

    useEffect(() => {
        resumeInfo && setSkillsLists(resumeInfo?.skills!)
    }, [])

    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p className='font-semibold'>Add Your Top Professional  key skills</p>
            <div className='my-5'>
                {skillsList.map((skill, index) => (
                    <div key={index} className='flex justify-between border rounded-lg p-3 mb-2'>
                        <div className=''>
                            <label className='text-xs pb-4'>Name</label>
                            <Input defaultValue={skill.name} className='w-full' onChange={(e) => handleChange(e.target.value, 'name', index)} />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={skill.rating} onChange={(v: number) => handleChange(v, "rating", index)} />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant={"outline"} className='text-primary' onClick={addNewSkills}> <span className='text-lg mr-2 mb-1'>+</span> Add {skillsList.length > 0 ? "more Skills" : "a Skill"}</Button>
                    {listSize > 1 &&
                        <Button variant={"outline"} className='text-primary' onClick={removeSkills}> <span className='text-lg mr-2 mb-1'>-</span> Remove</Button>

                    }

                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <Loader2 className='animate-spin' /> : "Save"}
                </Button>
            </div>
        </div>
    )
}

export default Skills