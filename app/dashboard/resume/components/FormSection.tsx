'use client'

import React, { use, useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ThemeColor from './ThemeColor'

const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(1)
    const [enableNext, setEnableNext] = useState(true)
    const router = useRouter()
    const { resumeId } = useParams()


    const renderForm = () => {
        switch (activeFormIndex) {
            case 1:
                return <PersonalDetail enabledNext={(v: boolean) => setEnableNext(v)} />;
            case 2:
                return <Summery enabledNext={(v: boolean) => setEnableNext(v)} />;
            case 3:
                return <Experience />;
            case 4:
                return <Education />;
            case 5:
                return <Skills />;
            case 6:
                router.push(`/my-resume/${resumeId}/view`);
                return null;
            default:
                return null;
        }
    };

    return (

        <div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5'>
                    <Link href="/dashboard" className={buttonVariants({ variant: "default" })}><Home /></Link>
                    <ThemeColor />
                </div>
                <div className='flex gap-2'>
                    {activeFormIndex > 1
                        &&
                        <Button size={"sm"}
                            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                        >
                            <ArrowLeft />
                        </Button>
                    }
                    <Button
                        disabled={!enableNext}
                        size="sm"
                        className='flex gap-2'
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                    >
                        Next
                        <ArrowRight />
                    </Button>
                </div>
            </div>
            {renderForm()}

        </div>
    )
}

export default FormSection