'use client'
import React, { useState } from 'react'
import { Loader2, PlusSquare } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuid4 } from 'uuid'
import { createNewResume } from '@/service/GlobalApi'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ResumeProps } from '@/index'

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState('')
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onCreate = () => {
        setLoading(true)
        const uuid = uuid4()
        const data: ResumeProps = {
            title: resumeTitle,
            resumeId: uuid,
            userEmail: user?.primaryEmailAddress?.emailAddress!,
            userName: user?.fullName!
        }
        createNewResume(data).then(res => {
            console.log(res.data.documentId)
            if (res) {
                setLoading(false)
                router.push(`/dashboard/resume/${res.data.documentId}/edit`)
            }
        }, (err) => {
            setLoading(false)
        });
    }

    return (
        <div>
            <div
                onClick={() => setOpenDialog(true)}
                className='p-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md hover:cursor-pointer border-dashed'>
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume</p>
                            <Input
                                className='my-2'
                                placeholder='Ex.Full stack resume'
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setOpenDialog(false)} variant={"ghost"}>Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={() => onCreate()}
                            >
                                {loading ?
                                    (
                                        <Loader2 className='animate-spin' />
                                    )
                                    : 'Create'
                                }
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume