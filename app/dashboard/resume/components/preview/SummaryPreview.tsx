import { PreviewProps } from '@/index'
import React from 'react'

const SummaryPreview = ({ resumeInfo }: PreviewProps) => {
    return (
        <p className='text-sm'>
            {resumeInfo?.summery}
        </p>
    )
}

export default SummaryPreview
