import { PreviewProps } from '@/index'
import { formatDate } from '@/lib/utils'
import React from 'react'

const EducationPreview = ({ resumeInfo }: PreviewProps) => {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-lg mb-2'
                style={{
                    color: resumeInfo?.themeColor || "#ff6666"
                }}
            >
                Education
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.education?.map((education, index) => (
                <div key={index} className='my-5'>
                    <h2 className='font-bold text-lg'
                        style={{
                            color: resumeInfo?.themeColor
                        }}
                    >{education.universityName}</h2>
                    <h2 className='text-sm flex justify-between font-semibold text-gray-400'>{education.degree} {education.major && "in"} {education.major && education.major}
                        <span>{formatDate(education.startDate)} - {formatDate(education.endDate)}</span>
                    </h2>
                    <p className='my-2 text-sm'>{education.description}</p>
                </div>
            ))}
        </div>
    )
}

export default EducationPreview