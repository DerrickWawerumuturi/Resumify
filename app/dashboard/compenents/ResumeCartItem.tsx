'use client'

import { ResumeCartItemProps } from '@/index'
import { Loader2, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useRouter } from 'next/navigation'
import { DeleteDoc } from '@/service/GlobalApi'
import { toast } from 'sonner'
import { loadBindings } from 'next/dist/build/swc'



const ResumeCartItem = ({ resume, refreshData }: ResumeCartItemProps) => {
    const router = useRouter()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = (url: string) => {
        router.push(url)
    }

    const onDelete = async () => {
        setLoading(true)
        try {
            const killDoc = await DeleteDoc(resume.documentId!)
            console.log(killDoc)
            toast("Resume Delete")
            refreshData()
        } catch (error) {
            setLoading(false)
            console.log(error)
        } finally {
            setLoading(false)
            setOpenAlert(false)
        }
    }

    return (
        <div className='hover:scale-105 transition-all '>
            <Link href={`/dashboard/resume/${resume.documentId}/edit`}>
                <div className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200
            flex items-center justify-center h-[280px] 
            border-t-4 border-destructive
             rounded-t-lg 
            hover:shadow-md shadow-primary'>
                    {/* <Notebook /> */}
                    <Image
                        src={"/images/cv.png"}
                        alt="notebook"
                        width={80}
                        height={80}
                    />
                </div>
            </Link>
            <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
                style={{
                    background: resume?.themeColor || "#ff6666"
                }}>
                <h2 className='text-center my-1'>{resume.title}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className='h-4 w-4 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={openAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={loading} onClick={onDelete}>{loading ? <Loader2 className='animate-spin' /> : "Delete"}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>



            </div>
        </div>
    )
}

export default ResumeCartItem