import { PreviewProps } from '@/index'
import { Capitalize, formatDate } from '@/lib/utils'
import React from 'react'

const ProfessionalExperiencePreview = ({ resumeInfo }: PreviewProps) => {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor || "#ff6666"
                }}
            >
                Professional Experience
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.experience?.map((exprerience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-lg font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}
                    >{exprerience.title}</h2>
                    <h2 className="text-sm flex justify-between my-1 font-semibold text-gray-400">
                        {Capitalize(exprerience.companyName)},
                        {exprerience.city},
                        {exprerience.state}
                        <span>{formatDate(exprerience.startDate)} - {exprerience.currentlyWorking ? 'Present' : formatDate(exprerience.endDate)}</span>
                    </h2>
                    {/* <p className='text-xs my-2'>{exprerience.workSummery}</p> */}
                    <div className="text-sm my-2 mt-3" dangerouslySetInnerHTML={{ __html: exprerience.workSummery }} />
                </div>
            ))}
        </div>
    )
}

export default ProfessionalExperiencePreview