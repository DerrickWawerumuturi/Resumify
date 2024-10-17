
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Experience as ExperienceProps, FormFieldProps } from '@/index'
import { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { UpdateResumeDetails } from '@/service/GlobalApi'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const formField: ExperienceProps = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
}

const Experience = () => {
    const [listSize, setListSize] = useState<number>(1)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [experienceList, setExperienceList] = useState<ExperienceProps[]>(resumeInfo?.experience!)
    const [loading, setLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        resumeInfo && setExperienceList(resumeInfo?.experience!)
    }, [resumeInfo])

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newEntries = experienceList.slice()
        const { name, value } = event.target
        newEntries[index][name] = value
        setExperienceList(newEntries)
    }

    const addNewExperience = () => {
        setListSize(prevListSize => prevListSize + 1)
        setExperienceList([...experienceList, formField])
    }
    const removeExperience = () => {
        setListSize(prevListSize => prevListSize - 1)
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleRichTextEditor = (event: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
        const newEntries = experienceList.slice()
        newEntries[index][name] = event.target.value
        setExperienceList(newEntries)
    }
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [experienceList])

    const onSave = async () => {
        setLoading(true)
        try {
            const data = {
                experience: experienceList.map(({ id, ...rest }) => rest)
            }

            const result = await UpdateResumeDetails({ id: params?.resumeId, data })
            if (result) {
                toast("Experience Updated!")
            }
            setLoading(false)
        } catch (error) {
            console.log("could not update experience", error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>
            <div className='my-5'>
                {experienceList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <label className='text-xs'>Position Title</label>
                                <Input name="title" defaultValue={item.title} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className='text-xs'>Company name</label>
                                <Input name="companyName" defaultValue={item.companyName} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className='text-xs'>City</label>
                                <Input name="city" defaultValue={item.city} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className='text-xs'>State</label>
                                <Input name="state" defaultValue={item.state} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className='text-xs'>Start Date</label>
                                <Input type='date' name="startDate" defaultValue={item.startDate} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className='text-xs'>End Date</label>
                                <Input type="date" name="endDate" defaultValue={item.endDate} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div className='col-span-2'>
                                <RichTextEditor defaultValue={item.workSummery} index={index} onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant={"outline"} className='text-primary' onClick={addNewExperience}> <span className='text-lg mr-2 mb-1'>+</span> Add more Experience</Button>
                    {listSize > 1 &&
                        <Button variant={"outline"} className='text-primary' onClick={removeExperience}> <span className='text-lg mr-2 mb-1'>-</span> Remove</Button>

                    }

                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <Loader2 className='animate-spin' /> : "Save"}
                </Button>
            </div>
        </div>

    )
}

export default Experience