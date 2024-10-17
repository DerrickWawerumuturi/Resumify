'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { AiResponse, PersonalDetailProps, UserProfile } from '@/index'
import { UpdateResumeDetails } from '@/service/GlobalApi'
import { AIChatSession } from "@/service/AImodel"
import { Brain, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const prompt = 'Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format'
const Summery = ({ enabledNext }: PersonalDetailProps) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState<string>(resumeInfo?.summery!)
    const [loading, setLoading] = useState(false)
    const [AiGeneratedSummaryList, setAiGeneratedSummaryList] = useState<{ [key: string]: any } | null>(null);
    const params = useParams()

    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summery: summary
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const GenerateSumeryFromAI = async () => {
        setLoading(true)
        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle!)
            console.log(PROMPT)
            const result = await AIChatSession.sendMessage(PROMPT)

            // parsing the json
            const parsedData = JSON.parse(result.response.text());
            console.log(parsedData);

            // set the parsedData
            setAiGeneratedSummaryList(parsedData)
            setSummary(parsedData)
            console.log(result.response.text())

        } catch (error) {
            console.log("Error generating prompt", error)
        } finally {
            setLoading(false)
        }
    }

    const onSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            summery: summary
        }

        e.preventDefault()
        try {
            const result = await UpdateResumeDetails({ id: params?.resumeId, data })
            return result
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
        <div>
            <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p className='font-semibold text-gray-500'>Add Summary for your job title</p>
                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label className='text-gray-400'>Add Summary</label>
                        <Button type="button" variant="outline" className='border-primary text-primary flex gap-2' size="sm" onClick={() => GenerateSumeryFromAI()}>
                            <Brain className='h-4 w-4' />
                            Generate from AI
                        </Button>
                    </div>
                    <Textarea value={summary} required className='mt-5' onChange={(e) => setSummary(e.target.value)} rows={5} cols={30} />
                    <div className="mt-2 flex justify-end">
                        <Button disabled={loading} type='submit'>
                            {loading ? <Loader2 className='animate-spin' /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>

            {AiGeneratedSummaryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {AiGeneratedSummaryList?.map((item: any, index: number) => (
                    <div key={index}
                        onClick={() => setSummary(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:scale-105 transition-all hover:shadow-md'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Summery