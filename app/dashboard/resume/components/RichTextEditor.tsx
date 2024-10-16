'use client'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { AiResponse, RichTextEditorProps } from '@/index'
import { AIChatSession } from '@/service/AImodel'
import { Brain, Loader2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from "react-simple-wysiwyg"
import { toast } from 'sonner'

const prompt = `
  Position title: {positionTitle}.
  Based on the position title, generate 5-7 bullet points for my experience that would be included in a resume.
  It is very important that the response is NOT in JSON format or any kind of data structure—ONLY return HTML list items (<li>) without any "experience" labels or references to "experience level."
  Each bullet point should be wrapped in <li> tags, and the result should be ready for display inside an unordered list (<ul>).
  Do not include any extra text, just the <li> tags.
`;


const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }: RichTextEditorProps) => {
    const [value, setValue] = useState<string>(defaultValue)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)

    const GenerateSummeryFromAI = async () => {

        if (!resumeInfo?.experience || !resumeInfo?.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
        setLoading(true)
        const PROMPT = prompt.replace('{positionTitle}', resumeInfo?.experience[index].title);
        const result = await AIChatSession.sendMessage(PROMPT)
        console.log(result.response.text());
        const resp = result.response.text()
        setValue(resp.replace('[', '').replace(']', ''));
        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={GenerateSummeryFromAI}
                    className='flex gap-2 border-primary text-primary'>
                    {loading ? <Loader2 className='animate-spin' /> : (
                        <>
                            <Brain className='h-4 w-4' />
                            Generate with AI
                        </>
                    )}

                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value)
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor